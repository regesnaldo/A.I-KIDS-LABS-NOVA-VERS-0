
import React from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  onNavigate: (page: string) => void;
  activePage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, activePage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-card border-none bg-opacity-70">
      <div className="flex items-center space-x-8">
        <div 
          className="text-2xl font-black font-orbitron tracking-tighter text-neon-cyan cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          NEO<span className="text-neon-magenta">AI</span>
        </div>
        
        <ul className="hidden md:flex space-x-6 text-sm font-semibold uppercase tracking-wider">
          {['home', 'lab', 'family'].map((page) => (
            <li 
              key={page}
              onClick={() => onNavigate(page)}
              className={`cursor-pointer transition-all duration-300 hover:text-neon-cyan ${activePage === page ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-gray-400'}`}
            >
              {page === 'home' ? 'Início' : page === 'lab' ? 'Laboratório' : 'Família'}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-bold text-neon-magenta uppercase tracking-widest">Nível {user.level}</span>
          <div className="w-24 h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-neon-magenta" style={{ width: `${(user.xp % 100)}%` }}></div>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full border-2 border-neon-cyan overflow-hidden hover:scale-110 transition-transform"
        >
          <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
