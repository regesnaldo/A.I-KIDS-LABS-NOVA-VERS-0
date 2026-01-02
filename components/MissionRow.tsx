import React from 'react';
export const MissionRow = ({ title, missions }: any) => (
  <div className="mb-8 px-4">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h2>
    <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
      {missions.map((m: any) => (
        <div key={m.id} className="flex-none w-64 h-36 bg-gray-800 rounded-lg border border-purple-500/50 hover:scale-105 transition transform cursor-pointer overflow-hidden">
          <div className="p-4 h-full flex items-end bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-bold">{m.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
