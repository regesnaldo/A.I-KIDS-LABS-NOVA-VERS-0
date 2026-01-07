
import React, { useState, useRef, useEffect } from 'react';
import { askAITutor } from '../services/geminiService';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Olá! Eu sou o Neo, seu guia no futuro. O que você quer aprender sobre inteligência artificial hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await askAITutor(userMsg, 'child'); // Defaulting to child for educational purposes
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[70vh] flex flex-col glass-card rounded-3xl overflow-hidden mt-20 shadow-2xl">
      <div className="p-4 bg-neon-cyan/10 border-b border-neon-cyan/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse"></div>
          <span className="font-orbitron font-bold text-neon-cyan">LABORATÓRIO NEO</span>
        </div>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Protocolo de Aprendizagem Ativo</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-neon-magenta text-white rounded-tr-none' 
                : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-5 py-3 rounded-2xl rounded-tl-none animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 flex space-x-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte qualquer coisa sobre IA..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-neon-cyan transition-colors"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-neon-cyan text-black font-bold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all text-sm uppercase"
        >
          {loading ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
};

export default AITutor;
