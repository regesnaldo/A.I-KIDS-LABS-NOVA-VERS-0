
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ContentRow from './components/ContentRow';
import { MissionRow } from './components/MissionRow';
import AITutor from './components/AITutor';
import ParentDashboard from './components/ParentDashboard';
import { MOCK_CONTENT, CATEGORIES } from './constants';
import { UserProfile, ContentItem } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [user, setUser] = useState<UserProfile>({
    name: 'Leo',
    avatar: 'https://picsum.photos/seed/user123/200',
    role: 'child',
    xp: 450,
    level: 5
  });

  const renderContent = () => {
    if (activePage === 'lab') return <AITutor />;
    if (activePage === 'family') return <ParentDashboard />;
    
    return (
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-6 sm:px-12 mb-12 relative overflow-hidden group">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden relative shadow-2xl border border-white/5">
            <img 
              src="https://picsum.photos/seed/hero/1600/900" 
              alt="Hero" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050112] via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-2xl">
              <span className="text-neon-cyan font-bold text-xs uppercase tracking-[0.3em] mb-4">Original NeoAI</span>
              <h1 className="text-4xl sm:text-6xl font-black font-orbitron mb-6 leading-tight">
                EXPLORE A <span className="text-neon-magenta">FRONTEIRA</span> DA INTELIGÊNCIA
              </h1>
              <p className="text-gray-300 text-lg mb-8 line-clamp-2 sm:line-clamp-3">
                Embarque em uma jornada épica para entender como as máquinas aprendem, pensam e criam o nosso futuro. Do zero ao mestre de IA.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-neon-cyan transition-all uppercase text-sm tracking-widest flex items-center">
                  Começar Agora
                </button>
                <button className="glass-card text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all uppercase text-sm tracking-widest">
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Rows */}
        {CATEGORIES.map(category => (
          <ContentRow 
            key={category}
            title={category}
            items={MOCK_CONTENT.filter(item => item.category === category)}
            onSelect={(item) => setSelectedContent(item)}
          />
        ))}

        {/* Mission Row */}
        <MissionRow
          title="Space Missions"
          missions={[
            { id: 101, title: 'Mars Exploration', thumbnail: 'https://picsum.photos/seed/mars/600/400' },
            { id: 102, title: 'Secret Code', thumbnail: 'https://picsum.photos/seed/code/600/400' },
            { id: 103, title: 'Robot Friend', thumbnail: 'https://picsum.photos/seed/robot/600/400' }
          ]}
        />

        {/* Call to Action Footer */}
        <div className="mt-20 px-12 text-center py-20 bg-neon-cyan/5 rounded-[4rem] mx-6">
          <h2 className="text-3xl font-orbitron font-black mb-6">PRONTO PARA O PRÓXIMO NÍVEL?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto uppercase text-sm font-bold tracking-widest">Desbloqueie conquistas exclusivas e aprenda com o Neo no laboratório interativo.</p>
          <button 
            onClick={() => setActivePage('lab')}
            className="bg-neon-cyan text-black font-black px-12 py-5 rounded-full hover:scale-110 shadow-lg shadow-neon-cyan/20 transition-all uppercase tracking-widest"
          >
            Entrar no Laboratório
          </button>
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-[#050112] text-white">
      <Navbar 
        user={user} 
        activePage={activePage} 
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo(0, 0);
        }} 
      />
      
      {renderContent()}

      {/* Content Modal (Overlay) */}
      {selectedContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="glass-card w-full max-w-3xl rounded-3xl overflow-hidden relative border-neon-cyan/30">
            <button 
              onClick={() => setSelectedContent(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-neon-magenta transition-colors"
            >
              ✕
            </button>
            <div className="aspect-video">
              <img src={selectedContent.thumbnail} alt={selectedContent.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-neon-cyan font-bold text-xs uppercase">{selectedContent.category}</span>
                <span className="text-gray-500 text-xs font-bold uppercase">{selectedContent.duration}</span>
                <span className="bg-neon-magenta/20 text-neon-magenta text-[10px] font-bold px-2 py-1 rounded">{selectedContent.ageRating}</span>
              </div>
              <h2 className="text-3xl font-orbitron font-bold mb-4 uppercase">{selectedContent.title}</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">{selectedContent.description}</p>
              <div className="flex space-x-4">
                <button className="flex-1 bg-neon-cyan text-black font-black py-4 rounded-xl uppercase tracking-widest hover:scale-105 transition-all">
                  Assistir Agora
                </button>
                <button className="px-6 py-4 glass-card rounded-xl hover:bg-white/10">
                  ★
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/5 py-12 px-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-bold uppercase tracking-widest">
        <p>© 2024 NEOAI ACADEMY. TODOS OS DIREITOS RESERVADOS.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-neon-cyan transition-colors">Termos</a>
          <a href="#" className="hover:text-neon-cyan transition-colors">Privacidade</a>
          <a href="#" className="hover:text-neon-cyan transition-colors">Segurança Parental</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
