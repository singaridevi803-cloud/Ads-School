import { Trophy, Medal, Award } from 'lucide-react';
import { leaderboardData } from '../data';
import { motion } from 'motion/react';

export default function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-center text-slate-200">
        <Trophy className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">हॉल ऑफ फेम (Leaderboard)</h1>
        <p className="text-slate-400 text-lg">इन चैंपियंस ने सबसे ज़्यादा सही जवाब दिए हैं!</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                <th className="p-4 pl-6 font-medium">रैंक</th>
                <th className="p-4 font-medium">नाम</th>
                <th className="p-4 font-medium">बैज / टाइटल</th>
                <th className="p-4 pr-6 text-right font-medium">स्कोर (Points)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => {
                const isTop3 = index < 3;
                return (
                  <motion.tr 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={user.rank} 
                    className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4 pl-6">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-600 bg-slate-800 font-bold">
                        {index === 0 && <span className="text-yellow-400 text-lg">🥇</span>}
                        {index === 1 && <span className="text-slate-300 text-lg">🥈</span>}
                        {index === 2 && <span className="text-amber-600 text-lg">🥉</span>}
                        {index > 2 && <span className="text-slate-400 text-sm">{user.rank}</span>}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-lg">
                      <span className={isTop3 ? 'text-white' : 'text-slate-300'}>{user.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">
                        {user.badge === 'Master Mind' && <Award className="w-3.5 h-3.5" />}
                        {user.badge === 'Brainy Ninja' && <Medal className="w-3.5 h-3.5" />}
                        {user.badge === 'Little Star' && <span className="text-yellow-400 text-xs">★</span>}
                        {user.badge}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right font-bold font-mono text-indigo-400">
                      {user.points.toLocaleString()} <span className="text-slate-500 text-xs font-normal">XP</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
