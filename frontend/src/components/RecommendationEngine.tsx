import React, { useState, useEffect } from 'react';
// @ts-ignore
import { modulesAPI } from '../services/api';

interface Recommendation {
  type: 'continue_watching' | 'next_up' | 'starter';
  reason: string;
  aiMessage?: string;
  module: any;
  stoppedAt?: number;
}

const RecommendationEngine: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Check if user is logged in (has token)
        const token = localStorage.getItem('token');
        if (token) {
          const response = await modulesAPI.getRecommendations();
          if (response.success) {
            setRecommendations(response.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch recommendations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading || recommendations.length === 0) return null;

  const primaryRec = recommendations[0];

  return (
    <section className="recommendation-engine">
      <div className="ai-mentor-container">
        <div className="ai-avatar">
          🤖
        </div>
        <div className="ai-message-bubble">
          <h3>Sugestão da I.A.</h3>
          <p className="ai-text">"{primaryRec.aiMessage || primaryRec.reason}"</p>
        </div>
      </div>

      <div className="recommended-module-card">
        <div className="rec-badge">{primaryRec.type === 'continue_watching' ? '▶ Continuar' : '★ Recomendado'}</div>
        <div className="rec-content">
          <h4>{primaryRec.module.title}</h4>
          <p>{primaryRec.module.description}</p>
          <div className="rec-meta">
            <span className="difficulty">{primaryRec.module.difficulty}</span>
            <span className="duration">{primaryRec.module.duration}</span>
          </div>
          <button className="btn-start-rec">
            {primaryRec.type === 'continue_watching' ? 'Retomar' : 'Começar Agora'}
          </button>
        </div>
      </div>

      <style>{`
        .recommendation-engine {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          border: 1px solid #3b82f6;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
          display: flex;
          gap: 24px;
          align-items: center;
          flex-wrap: wrap;
        }

        .ai-mentor-container {
          flex: 1;
          min-width: 250px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .ai-avatar {
          font-size: 3rem;
          background: rgba(59, 130, 246, 0.2);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #3b82f6;
          animation: float 3s ease-in-out infinite;
        }

        .ai-message-bubble {
          background: rgba(255, 255, 255, 0.1);
          padding: 16px;
          border-radius: 12px;
          border-top-left-radius: 0;
          position: relative;
        }

        .ai-message-bubble h3 {
          color: #60a5fa;
          margin: 0 0 8px 0;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .ai-text {
          color: #e2e8f0;
          font-size: 1.1rem;
          font-style: italic;
          margin: 0;
          line-height: 1.5;
        }

        .recommended-module-card {
          flex: 2;
          min-width: 300px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .rec-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #3b82f6;
          color: white;
          padding: 4px 12px;
          font-size: 0.8rem;
          font-weight: bold;
          border-bottom-left-radius: 12px;
        }

        .rec-content h4 {
          color: white;
          margin: 0 0 8px 0;
          font-size: 1.2rem;
        }

        .rec-content p {
          color: #94a3b8;
          font-size: 0.9rem;
          margin-bottom: 16px;
        }

        .rec-meta {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .rec-meta span {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          color: #cbd5e1;
          text-transform: capitalize;
        }

        .btn-start-rec {
          background: #10b981;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
          align-self: flex-start;
        }

        .btn-start-rec:hover {
          background: #059669;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default RecommendationEngine;
