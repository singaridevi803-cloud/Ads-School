import { useState, ReactNode } from 'react';
import { Home, Trophy, BookOpen, Map as MapIcon, ChevronRight, Award, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LevelMap from './components/LevelMap';
import QuizZone from './components/QuizZone';
import Leaderboard from './components/Leaderboard';
import DailyFacts from './components/DailyFacts';
import Dashboard from './components/Dashboard';

export type ViewState = 'dashboard' | 'levels' | 'quiz' | 'leaderboard' | 'facts';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<number>(1);

  const startLevel = (level: number) => {
    setSelectedLevel(level);
    setCurrentView('quiz');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 bg-slate-900/50 backdrop-blur-md">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setCurrentView('dashboard')}
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-indigo-400">
            Ads School: <span className="text-white font-medium hidden sm:inline">जहाँ पढ़ाई एक खेल है</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400 h-full">
          <NavButton 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
            label="होम"
          />
          <NavButton 
            active={currentView === 'levels'} 
            onClick={() => setCurrentView('levels')}
            label="लेवल्स"
          />
          <NavButton 
            active={currentView === 'quiz'} 
            onClick={() => setCurrentView('quiz')}
            label="क्विज़ जोन"
          />
          <NavButton 
            active={currentView === 'facts'} 
            onClick={() => setCurrentView('facts')}
            label="डेली फैक्ट्स"
          />
          <NavButton 
            active={currentView === 'leaderboard'} 
            onClick={() => setCurrentView('leaderboard')}
            label="लीडरबोर्ड"
          />
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:px-8 pb-24 md:pb-8 relative min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Dashboard onPlayClick={() => setCurrentView('levels')} />
            </motion.div>
          )}
          {currentView === 'levels' && (
            <motion.div key="levels" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <LevelMap onSelectLevel={startLevel} unlockedLevels={unlockedLevels} />
            </motion.div>
          )}
          {currentView === 'quiz' && selectedLevel !== null && (
            <motion.div key={`quiz-${selectedLevel}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <QuizZone 
                level={selectedLevel} 
                onComplete={() => setCurrentView('levels')} 
                onNextLevel={(next) => {
                  setUnlockedLevels(prev => Math.max(prev, next));
                  setSelectedLevel(next);
                }}
              />
            </motion.div>
          )}
          {currentView === 'leaderboard' && (
            <motion.div key="leaderboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Leaderboard />
            </motion.div>
          )}
          {currentView === 'facts' && (
            <motion.div key="facts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DailyFacts />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 padding-safe pb-safe">
        <nav className="flex items-center justify-around p-2">
          <MobileNavButton 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
            icon={<Home className="w-5 h-5" />}
            label="होम"
          />
          <MobileNavButton 
            active={currentView === 'levels'} 
            onClick={() => setCurrentView('levels')}
            icon={<MapIcon className="w-5 h-5" />}
            label="लेवल्स"
          />
          <MobileNavButton 
            active={currentView === 'leaderboard'} 
            onClick={() => setCurrentView('leaderboard')}
            icon={<Trophy className="w-5 h-5" />}
            label="रैंक"
          />
          <MobileNavButton 
            active={currentView === 'facts'} 
            onClick={() => setCurrentView('facts')}
            icon={<BookOpen className="w-5 h-5" />}
            label="फैक्ट्स"
          />
        </nav>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`h-full border-b-2 flex items-center transition-colors ${
        active ? 'text-white border-indigo-500' : 'border-transparent hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 min-w-[70px] transition-colors ${
        active ? 'text-indigo-400' : 'text-slate-500'
      }`}
    >
      <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-indigo-500/20' : 'bg-transparent'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
