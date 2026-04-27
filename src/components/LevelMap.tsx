import { motion } from 'motion/react';
import { Lock, Star, Play } from 'lucide-react';

export default function LevelMap({ onSelectLevel, unlockedLevels }: { onSelectLevel: (level: number) => void, unlockedLevels: number }) {

  const renderLevels = (start: number, end: number, theme: {active: string, done: string}, title: string, icon: string) => {
    const levels = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    
    return (
      <div className="mb-12 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase rounded-full tracking-widest mb-3 inline-block">कक्षा {start === 1 ? '1 - 3' : start === 34 ? '4 - 6' : '7 - 9'}</span>
            <div className="flex items-center gap-3">
              <div className="text-3xl">{icon}</div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {levels.map((level) => {
            const isUnlocked = level <= unlockedLevels;
            const isCurrent = level === unlockedLevels;
            
            return (
              <motion.button
                key={level}
                onClick={() => isUnlocked && onSelectLevel(level)}
                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                className={`relative aspect-square rounded-full border-2 flex items-center justify-center transition-all ${
                  isCurrent
                    ? theme.active
                    : isUnlocked
                    ? theme.done
                    : 'border-slate-800 bg-slate-900 text-slate-700 cursor-not-allowed font-bold text-sm'
                }`}
              >
                {isUnlocked && level < unlockedLevels ? (
                  <span className="font-bold text-sm">✓</span>
                ) : (
                  <span className={`font-bold ${isCurrent ? 'text-lg' : 'text-sm'}`}>{level}</span>
                )}
                
                {isCurrent && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-900">
                    <Play className="w-2.5 h-2.5 text-white fill-current ml-0.5" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const themes = {
    junior: { active: 'border-green-500 bg-green-500/20 text-white ring-4 ring-green-500/10', done: 'border-green-500 bg-green-500/10 text-green-400 shadow-inner' },
    middle: { active: 'border-indigo-500 bg-indigo-500/20 text-white ring-4 ring-indigo-500/10', done: 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-inner' },
    senior: { active: 'border-amber-500 bg-amber-500/20 text-white ring-4 ring-amber-500/10', done: 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-inner' },
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-center text-slate-200">
        <h1 className="text-3xl font-bold mb-2">लेवल मैप (Level Map)</h1>
        <p className="text-slate-400 text-lg">अपना सफ़र शुरू करें! सवाल सुलझाएं और आगे बढ़ें।</p>
      </div>

      {renderLevels(1, 33, themes.junior, 'जूनियर चैंप्स', '🏆')}
      {renderLevels(34, 66, themes.middle, 'मिडिल वारियर्स', '⚔️')}
      {renderLevels(67, 100, themes.senior, 'सीनियर लेजेंड्स', '🔥')}
    </div>
  );
}
