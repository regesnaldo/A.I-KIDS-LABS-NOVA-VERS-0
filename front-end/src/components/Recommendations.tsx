import { useEffect, useState } from 'react';
import { recommendationsAPI } from '../services/api';
import LabCard from './LabCard';
import { MissionModule } from '../types';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<MissionModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const rows = await recommendationsAPI.getRecommendations();
        setRecommendations(
          rows.map((row) => ({
            id: row.id,
            titulo: row.titulo,
            description: row.description,
            thumb: row.thumb ?? undefined,
            state: row.locked ? 'locked' : 'unlocked',
            seasonId: row.season_id,
          }))
        );
      } catch {
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div style={{ color: 'white', padding: '20px' }}>Carregando recomendações...</div>;
  if (recommendations.length === 0) return null;

  return (
    <div className="recommendations-section" style={{ padding: '20px 4%' }}>
      <h2 style={{ 
        color: '#e5e5e5', 
        marginBottom: '20px',
        fontSize: '1.4vw',
        fontWeight: 'bold'
      }}>
        Recomendados para Você
      </h2>
      <div className="recommendations-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {recommendations.map((module: MissionModule) => (
          <LabCard 
            key={module.id} 
            module={{
              id: module.id,
              titulo: module.title || module.titulo,
              title: module.title,
              description: module.description || '',
              thumbnailUrl: module.thumbnailUrl,
              videoUrl: module.videoUrl,
              video_url: module.video_url || module.videoUrl,
              duration: module.duration, 
              difficulty: module.difficulty || 'easy',
              state: module.state || 'locked', 
              seasonId: module.seasonId || 'rec',
              category: module.category || 'ia'
            }} 
            onPlay={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
