
import React from 'react';
import { ContentItem } from '../types';

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onSelect }) => {
  return (
    <div className="py-6">
      <h2 className="px-6 sm:px-12 text-xl font-orbitron font-bold mb-4 text-white uppercase tracking-wider">{title}</h2>
      <div className="px-6 sm:px-12 flex space-x-4 overflow-x-auto pb-6 scrollbar-hide">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelect(item)}
            className="flex-none w-64 sm:w-80 group cursor-pointer relative"
          >
            <div className="aspect-video rounded-xl overflow-hidden relative border border-transparent group-hover:border-neon-cyan transition-all duration-300 shadow-xl group-hover:shadow-neon-cyan/20">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              
              {item.progress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div className="h-full bg-neon-cyan" style={{ width: `${item.progress}%` }}></div>
                </div>
              )}

              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-bold bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-neon-magenta border border-neon-magenta/30">
                  {item.ageRating}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <h3 className="text-sm font-bold group-hover:text-neon-cyan transition-colors line-clamp-1 uppercase tracking-tight">
                {item.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-[10px] text-gray-400 font-semibold">{item.duration}</span>
                <span className="text-[10px] text-neon-cyan font-bold uppercase">{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
