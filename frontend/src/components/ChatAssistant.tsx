import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { chatAPI } from '../services/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Olá! Sou seu assistente de IA. Como posso ajudar você hoje? 🤖",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await chatAPI.sendMessage(userMsg.text, { moduleId: 'current-context' }); // Context logic can be improved
        
        if (response.success) {
          const aiMsg: Message = {
            id: Date.now().toString() + '_ai',
            text: response.data.message,
            sender: 'ai',
            timestamp: new Date(response.data.timestamp)
          };
          setMessages(prev => [...prev, aiMsg]);
        }
      } else {
        // Fallback for demo without login
        setTimeout(() => {
          const aiMsg: Message = {
            id: Date.now().toString() + '_ai',
            text: "Para eu te responder melhor, você precisa fazer login! 🔐",
            sender: 'ai',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMsg]);
        }, 1000);
      }
    } catch (error) {
      console.error("Chat error", error);
      const errorMsg: Message = {
        id: Date.now().toString() + '_error',
        text: "Ops! Tive um probleminha de conexão. Tente de novo! 🔌",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-assistant-container">
      {/* Floating Button */}
      {!isOpen && (
        <button className="chat-fab" onClick={() => setIsOpen(true)}>
          <span className="fab-icon">💬</span>
          <span className="fab-text">Ajuda I.A.</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <div className="ai-avatar">🤖</div>
              <div>
                <h3>Assistente I.A.</h3>
                <span className="status-indicator">Online</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="message ai typing">
                <div className="typing-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida..."
              disabled={isTyping}
            />
            <button type="submit" disabled={!inputText.trim() || isTyping}>
              ➤
            </button>
          </form>
        </div>
      )}

      <style>{`
        .chat-assistant-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .chat-fab {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          font-weight: bold;
          font-size: 1rem;
        }

        .chat-fab:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6);
        }

        .fab-icon {
          font-size: 1.2rem;
        }

        .chat-window {
          width: 350px;
          height: 500px;
          background: #1e293b;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #475569;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-header {
          background: #0f172a;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #334155;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .header-info h3 {
          margin: 0;
          color: white;
          font-size: 1rem;
        }

        .status-indicator {
          font-size: 0.75rem;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-indicator::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .close-btn:hover {
          color: white;
        }

        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #1e293b;
        }

        .message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .message.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .message.ai {
          align-self: flex-start;
          align-items: flex-start;
        }

        .message-bubble {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .message.user .message-bubble {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 2px;
        }

        .message.ai .message-bubble {
          background: #334155;
          color: #e2e8f0;
          border-bottom-left-radius: 2px;
        }

        .message-time {
          font-size: 0.7rem;
          color: #94a3b8;
          margin-top: 4px;
        }

        .chat-input-area {
          padding: 15px;
          background: #0f172a;
          border-top: 1px solid #334155;
          display: flex;
          gap: 10px;
        }

        .chat-input-area input {
          flex: 1;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 20px;
          padding: 10px 15px;
          color: white;
          outline: none;
        }

        .chat-input-area input:focus {
          border-color: #3b82f6;
        }

        .chat-input-area button {
          background: #3b82f6;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .chat-input-area button:hover:not(:disabled) {
          background: #2563eb;
        }

        .chat-input-area button:disabled {
          background: #475569;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
          padding: 8px 12px;
          background: #334155;
          border-radius: 12px;
          border-bottom-left-radius: 2px;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: #94a3b8;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ChatAssistant;
