import React, { useEffect, useState } from 'react';
import VideoCard, { MissionModule } from './VideoCard';
import { recommendationsAPI } from '../services/api';

const Recommendations = ({ onPlay }: { onPlay: (m: MissionModule) => void }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await recommendationsAPI.getRecommendations();
        // Mapeia os dados da API para o formato do VideoCard
        // Se a API retornar estrutura diferente, ajustamos aqui
        const mappedData = data.map((item: any) => ({
            id: item.id || item.video?.id,
            title: item.title || item.video?.title,
            description: item.reason || item.video?.description, // Usa a razão como descrição no card de rec
            thumbnailUrl: item.thumbnailUrl || item.video?.thumbnail,
            videoUrl: item.videoUrl || item.video?.videoUrl,
            seasonId: 'season-01', // Fallback
            difficulty: 'medium',
            duration: 'Sugestão',
            category: 'Recomendado',
            state: 'available'
        }));
        setRecommendations(mappedData);
      } catch (error) {
        console.error("Falha ao carregar recomendações", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div style={{ color: '#666', padding: '20px' }}>Carregando sugestões da IA...</div>;
  if (recommendations.length === 0) return null;

  return (
    <div className="season-row">
      <h2 className="season-title" style={{ color: '#00e5ff' }}>🤖 IA Sugere para Você</h2>
      <div className="row-container">
        {recommendations.map((rec, index) => (
          <VideoCard 
            key={index} 
            module={rec} 
            onPlay={onPlay} 
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
