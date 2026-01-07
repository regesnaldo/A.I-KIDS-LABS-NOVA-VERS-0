import { Season, MissionModule } from '../types';
import LabCard from './LabCard';

interface SeasonRowProps {
  season: Season;
  modules: MissionModule[];
  onPlay: (m: MissionModule) => void;
}

const SeasonRow = ({ season, modules, onPlay }: SeasonRowProps) => {
  // Determine UX Level based on age range
  let level: 'kids' | 'teens' | 'adults' = 'kids';
  if (season.ageRange === '6+' || season.ageRange === '7+' || season.ageRange === '8+') {
    level = 'kids';
  } else if (season.ageRange === '9+' || season.ageRange === '12+') {
    level = 'teens';
  } else {
    level = 'adults';
  }
  
  return (
    <section className="season-container" style={{ position: 'relative', zIndex: 5, marginTop: '20px', marginBottom: '40px' }}>
      <h2 className="season-title" style={{ marginLeft: '4%', marginBottom: '10px', fontSize: '1.4vw', color: '#e5e5e5' }}>{season.title}</h2>
      <div className="season-row" style={{ paddingLeft: '4%', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px' }}>
        {modules.map(module => (
          <LabCard key={module.id} module={module} level={level} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
};

export default SeasonRow;
