import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, User, CornerDownLeft } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am Prateek's AI Portfolio Assistant. Ask me about Prateek's machine learning projects, engineering stack, roles at IIC PMEC, or hackathon achievements!`,
      timestamp: 'Now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleQuery = (queryText: string) => {
    const q = queryText.toLowerCase().trim();
    if (!q) return;

    soundFx.playSelect();

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";

      if (q.includes('project') || q.includes('build') || q.includes('work')) {
        reply = `Prateek has engineered three core signature platforms:\n\n1. NeedSense AI — AI-powered community intelligence platform for complaint clustering, urgency detection, and NGO volunteer coordination.\n2. SkillGapRadar — AI career intelligence system forecasting market trends and skill gaps.\n3. LexiLab — Interactive compiler learning platform with real-time lexical token analysis.`;
      } else if (q.includes('needsense')) {
        reply = `NeedSense AI is an AI-powered platform addressing fragmented community complaint reporting. It uses NLP & clustering algorithms to identify urgency hotspots and dispatch volunteers efficiently.`;
      } else if (q.includes('skillgap') || q.includes('radar')) {
        reply = `SkillGapRadar analyzes the gap between student competencies and evolving industry job market demands, recommending personalized curriculum pathways with radar metrics.`;
      } else if (q.includes('lexilab') || q.includes('compiler')) {
        reply = `LexiLab is a web-based educational lexical analyzer where students write code and visualize lexical tokens, symbol tables, and compiler front-end stages in real time.`;
      } else if (q.includes('skill') || q.includes('tech stack') || q.includes('technolog') || q.includes('language')) {
        reply = `Prateek's tech stack spans 4 main branches:\n• AI & ML: Python, Machine Learning, NumPy, Pandas, Matplotlib, Seaborn\n• Web Dev: HTML, CSS, JavaScript, Tailwind CSS, React\n• Programming: Java, C, Python\n• Design: Figma, Canva, Adobe Illustrator, Social Media Design.`;
      } else if (q.includes('experience') || q.includes('iic') || q.includes('intern') || q.includes('pmec')) {
        reply = `Prateek is currently the Event Management Head and former Social Media Designer at Idea & Innovation Cell (IIC), PMEC. He also completed industrial internships at Central Tool Room & Training Centre (CTTC) Odisha and ApexPlanet Software Pvt. Ltd.`;
      } else if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('year')) {
        reply = `Prateek is in his 3rd Year of B.Tech specializing in Artificial Intelligence and Machine Learning at Parala Maharaja Engineering College (PMEC), Odisha, India.`;
      } else if (q.includes('achievement') || q.includes('hackathon') || q.includes('sih') || q.includes('osfic') || q.includes('prize')) {
        reply = `Prateek has participated in the Smart India Hackathon (SIH), the Odisha Seva First Innovation Challenge (OSFIC), and secured multiple awards in college technical club events.`;
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
        reply = `You can reach Prateek directly at prateekmohanty2006@gmail.com, or connect on GitHub (@prateek-mohanty11) and LinkedIn!`;
      } else {
        reply = `Prateek Mohanty is a 3rd-year B.Tech AI & ML student, creative developer, and UI/UX designer from Odisha, India. His focus is on combining AI systems with thoughtful design to build practical solutions like NeedSense AI and SkillGapRadar.`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      soundFx.playHover();
    }, 600);
  };

  const samplePrompts = [
    "Tell me about NeedSense AI",
    "What is Prateek's tech stack?",
    "Experience at IIC PMEC?",
    "How to contact him?"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#08090D]/85 backdrop-blur-lg"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-xl h-[600px] max-h-[90vh] rounded-3xl bg-[#10121A] border border-[#00D9FF]/40 shadow-[0_0_50px_rgba(0,217,255,0.15)] flex flex-col overflow-hidden z-20"
          >
            {/* Header bar */}
            <div className="px-6 py-4 bg-[#151824] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-sm text-[#F5F5FA]">
                      Prateek's AI Assistant
                    </h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-[#A3A8B8]">
                    v2.0 • Antigravity Intelligent Agent
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#A3A8B8] hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm bg-[#0C0E15]"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-[#00D9FF]/15 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 leading-relaxed whitespace-pre-line ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#9B5CFF] to-[#7B2CBF] text-white rounded-tr-sm'
                        : 'bg-[#151824] border border-white/10 text-[#F5F5FA] rounded-tl-sm'
                    }`}
                  >
                    {m.text}
                    <span className="block text-[9px] font-mono text-white/50 text-right mt-1.5">
                      {m.timestamp}
                    </span>
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-[#9B5CFF]/20 border border-[#9B5CFF]/40 flex items-center justify-center text-[#9B5CFF] flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#00D9FF] p-2 bg-[#151824] rounded-xl w-32 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-[#A3A8B8]">Processing</span>
                </div>
              )}
            </div>

            {/* Quick Sample Prompts */}
            <div className="px-4 py-2 bg-[#10121A] border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {samplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleQuery(p)}
                  className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#151824] border border-white/5 text-[#A3A8B8] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 flex-shrink-0 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery(input);
              }}
              className="p-4 bg-[#151824] border-t border-white/10 flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI projects, skills, education..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#10121A] border border-white/10 text-xs sm:text-sm text-[#F5F5FA] placeholder-[#A3A8B8]/50 focus:outline-none focus:border-[#00D9FF] transition-all"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] text-black font-bold hover:opacity-90 transition-opacity"
                aria-label="Send query"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
