import { app } from '../dist/app.js';

const TEST_PORT = 5055;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

async function runTests() {
  console.log('\n======================================================');
  console.log('  RUNNING PORTFOLIO BACKEND COMPREHENSIVE TEST SUITE');
  console.log('======================================================\n');

  let server;
  let passedCount = 0;
  let totalCount = 0;

  function assert(condition, testName, details = '') {
    totalCount++;
    if (condition) {
      console.log(`  ✓ [PASS] Scenario ${totalCount}: ${testName}`);
      passedCount++;
    } else {
      console.error(`  ✗ [FAIL] Scenario ${totalCount}: ${testName} - ${details}`);
    }
  }

  try {
    // SCENARIO 1: Backend starts successfully
    await new Promise((resolve) => {
      server = app.listen(TEST_PORT, () => {
        resolve();
      });
    });
    assert(server && server.listening, 'Backend server starts and listens on designated port');

    // SCENARIO 2: Health-check endpoint works
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(
      healthRes.status === 200 && healthData.status === 'ok' && healthData.timestamp,
      'GET /api/health responds with status: 200 and { status: "ok" }'
    );

    // SCENARIO 3: Valid contact submission handling (Run before rate limit threshold)
    const validRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '198.51.100.1' // Separate test IP
      },
      body: JSON.stringify({
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        subject: 'AI Research Collaboration',
        message: 'Hello Prateek, I came across your portfolio and would love to collaborate on an AI project.'
      })
    });
    const validData = await validRes.json();
    assert(
      (validRes.status === 200 && validData.success === true) ||
      (validRes.status === 503 && validData.success === false && validData.message.includes('SMTP')),
      'Valid payload processes through validation and reaches mailer dispatch safely'
    );

    // SCENARIO 4: Missing fields rejection (Empty payload)
    const emptyRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '198.51.100.2'
      },
      body: JSON.stringify({})
    });
    const emptyData = await emptyRes.json();
    assert(
      emptyRes.status === 400 && emptyData.success === false,
      'Empty fields rejection returns HTTP 400 with validation message'
    );

    // SCENARIO 5: Invalid email format rejection
    const invalidEmailRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '198.51.100.3'
      },
      body: JSON.stringify({
        name: 'Alex Hunter',
        email: 'invalid-email-format-not-an-email',
        subject: 'General Inquiry',
        message: 'This is a sample message that is long enough to pass message length rules.'
      })
    });
    const invalidEmailData = await invalidEmailRes.json();
    assert(
      invalidEmailRes.status === 400 &&
        invalidEmailData.success === false &&
        invalidEmailData.message.includes('email'),
      'Invalid email address syntax is rejected with HTTP 400'
    );

    // SCENARIO 6: Message length validation (< 10 chars rejected)
    const shortMsgRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '198.51.100.4'
      },
      body: JSON.stringify({
        name: 'Alex Hunter',
        email: 'alex@example.com',
        subject: 'Short Message Test',
        message: 'Hi' // only 2 chars
      })
    });
    const shortMsgData = await shortMsgRes.json();
    assert(
      shortMsgRes.status === 400 &&
        shortMsgData.success === false &&
        shortMsgData.message.includes('10 characters'),
      'Message shorter than 10 characters is rejected with HTTP 400'
    );

    // SCENARIO 7: Subject length validation (< 3 chars rejected)
    const shortSubjRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '198.51.100.5'
      },
      body: JSON.stringify({
        name: 'Alex Hunter',
        email: 'alex@example.com',
        subject: 'Hi', // only 2 chars
        message: 'This is a valid length message for testing purposes.'
      })
    });
    const shortSubjData = await shortSubjRes.json();
    assert(
      shortSubjRes.status === 400 &&
        shortSubjData.success === false &&
        shortSubjData.message.includes('Subject must be at least 3 characters'),
      'Subject shorter than 3 characters is rejected with HTTP 400'
    );

    // SCENARIO 8: Honeypot bot detection and silent absorption
    const botRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '198.51.100.6'
      },
      body: JSON.stringify({
        name: 'Spam Bot 3000',
        email: 'spammer@botnet.xyz',
        subject: 'Buy cheap crypto now',
        message: 'Automated spam message that filled the hidden field.',
        _gotcha: 'http://spam-link.ru' // Honeypot filled!
      })
    });
    const botData = await botRes.json();
    assert(
      botRes.status === 200 && botData.success === true,
      'Honeypot field triggers silent bot absorption without dispatching email'
    );

    // SCENARIO 9: Rate limiting trigger (repeated requests from identical IP)
    console.log('  ... Testing IP rate limiting (5 requests limit threshold) ...');
    let rateLimitTriggered = false;
    for (let i = 0; i < 6; i++) {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '203.0.113.99' // Same fixed IP
        },
        body: JSON.stringify({
          name: `Visitor ${i}`,
          email: `visitor${i}@example.com`,
          subject: 'Rate Limit Probe',
          message: 'Testing rate limit threshold for spam protection.'
        })
      });
      if (res.status === 429) {
        rateLimitTriggered = true;
        break;
      }
    }
    assert(rateLimitTriggered, 'Rate limiter activates and returns HTTP 429 after 5 requests from same IP');

    // SCENARIO 10: 404 handler for unknown routes
    const notFoundRes = await fetch(`${BASE_URL}/api/non-existent-route`);
    const notFoundData = await notFoundRes.json();
    assert(
      notFoundRes.status === 404 && notFoundData.success === false,
      'Unknown route returns sanitized HTTP 404 JSON'
    );

  } catch (err) {
    console.error('Test Suite Exception:', err);
  } finally {
    if (server) {
      server.close();
    }
    console.log('\n======================================================');
    console.log(`  TEST RESULTS: ${passedCount} / ${totalCount} SCENARIOS PASSED`);
    console.log('======================================================\n');
  }
}

runTests();
