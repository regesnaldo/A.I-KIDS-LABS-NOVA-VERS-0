import React from 'react';

interface Mission {
  id: number;
  title: string;
  thumbnail: string;
}

interface MissionRowProps {
  title: string;
  missions: Mission[];
}

export const MissionRow: React.FC<MissionRowProps> = ({ title, missions }) => {
  return (
    <div className="py-6">
      <h2 className="px-6 sm:px-12 text-xl font-orbitron font-bold mb-4 text-white uppercase tracking-wider">{title}</h2>
      <div className="px-6 sm:px-12 flex space-x-4 overflow-x-auto pb-6 scrollbar-hide">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="flex-none w-64 sm:w-80 group cursor-pointer relative"
          >
            <div className="aspect-video rounded-xl overflow-hidden relative border border-transparent group-hover:border-neon-cyan transition-all duration-300 shadow-xl group-hover:shadow-neon-cyan/20">
              <img
                src={mission.thumbnail}
                alt={mission.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-bold group-hover:text-neon-cyan transition-colors line-clamp-1 uppercase tracking-tight">
                {mission.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
