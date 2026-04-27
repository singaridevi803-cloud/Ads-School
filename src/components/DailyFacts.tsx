import { Lightbulb, Sparkles } from 'lucide-react';
import { dailyFacts } from '../data';
import { motion } from 'motion/react';

export default function DailyFacts() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Lightbulb className="w-48 h-48 text-indigo-300" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-10 h-10 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">क्या आप जानते हैं?</h1>
            <p className="text-slate-400 text-lg">
              हर दिन कुछ नया শিখें! यह रहे आज के कुछ मज़ेदार और हैरान करने वाले फैक्ट्स।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {dailyFacts.map((fact, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-800/50 transition-colors group shadow-md"
          >
            <div className="font-bold text-4xl text-slate-800 mb-4 group-hover:text-indigo-500 transition-colors">
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <p className="text-lg text-slate-200 leading-relaxed font-medium">
              {fact}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
