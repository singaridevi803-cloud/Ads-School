import { Play, Trophy, Star, Target } from 'lucide-react';
import { weeklyWinner } from '../data';
import { motion } from 'motion/react';

export default function Dashboard({ onPlayClick }: { onPlayClick: () => void }) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Target className="w-64 h-64 text-slate-300" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight text-white">
            पढ़ाई को बनाओ <br/>
            <span className="text-indigo-400">एक शानदार खेल!</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            कक्षा 1 से 9 तक के बच्चों के लिए 100 मज़ेदार लेवल्स। सवालों के जवाब दें, बैज जीतें और लीडरबोर्ड पर छा जाएं।
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayClick}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            गेम शुरू करें
          </motion.button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weekly Winner Widget */}
        <section className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-900/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-1">इस हफ्ते का विजेता</div>
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">
              Ads School Winner
            </h3>
            
            <div className="flex items-center gap-6 bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
              <div className="text-5xl shrink-0">⭐</div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">{weeklyWinner.name}</h4>
                <p className="text-indigo-200 font-medium mb-1 tracking-wide">{weeklyWinner.class}</p>
                <p className="text-white opacity-90 text-sm">{weeklyWinner.achievement}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories / Stats */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-center">
          <h4 className="text-sm font-bold text-slate-300 mb-6 text-center">लेवल्स की जानकारी</h4>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl">
              <div className="text-2xl shrink-0">
                🏆
              </div>
              <div>
                <p className="font-bold text-sm text-slate-200">जूनियर चैंप्स</p>
                <p className="text-xs text-slate-500 font-medium">कक्षा 1 - 3 (लेवल 1-33)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl">
              <div className="text-2xl shrink-0">
                ⚔️
              </div>
              <div>
                <p className="font-bold text-sm text-slate-200">मिडिल वारियर्स</p>
                <p className="text-xs text-slate-500 font-medium">कक्षा 4 - 6 (लेवल 34-66)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl">
              <div className="text-2xl shrink-0">
                🔥
              </div>
              <div>
                <p className="font-bold text-sm text-slate-200">सीनियर लेजेंड्स</p>
                <p className="text-xs text-slate-500 font-medium">कक्षा 7 - 9 (लेवल 67-100)</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
