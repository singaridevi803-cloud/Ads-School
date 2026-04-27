import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, Award } from 'lucide-react';
import { juniorQuestions, middleQuestions, seniorQuestions } from '../data';

export default function QuizZone({ level, onComplete, onNextLevel }: { level: number, onComplete: () => void, onNextLevel?: (level: number) => void }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [level]);

  // Decide which set of questions to use
  let tierName = '';
  let tierIcon = '';
  let badgeName = '';
  let questions = [];
  
  if (level <= 33) {
    tierName = 'जूनियर चैंप्स';
    tierIcon = '🏆';
    badgeName = 'Little Star';
    questions = juniorQuestions;
  } else if (level <= 66) {
    tierName = 'मिडिल वारियर्स';
    tierIcon = '⚔️';
    badgeName = 'Brainy Ninja';
    questions = middleQuestions;
  } else {
    tierName = 'सीनियर लेजेंड्स';
    tierIcon = '🔥';
    badgeName = 'Master Mind';
    questions = seniorQuestions;
  }

  // Get a pseudo-random question based on level
  const questionIndex = (level - 1) % questions.length;
  const questionData = questions[questionIndex];

  const isCorrect = selectedOption === questionData.answer;

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (isCorrect && level < 100 && onNextLevel) {
      onNextLevel(level + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={onComplete}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        वापस जाएँ
      </button>

      <div className="mb-6 flex justify-between items-end">
        <div>
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase rounded-full tracking-widest inline-block mb-3">
            {tierName}
          </span>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            लेवल {level} {tierIcon}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-slate-500 uppercase tracking-widest">रिवॉर्ड</span>
          <span className="text-sm font-bold text-indigo-400 flex items-center gap-1">
            <Award className="w-4 h-4" /> {badgeName}
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-6 pointer-events-none">
           <div className="text-4xl font-black text-slate-800/50 uppercase">Q.{level}</div>
        </div>

        {/* Question */}
        <h3 className="text-xl md:text-2xl leading-relaxed text-slate-200 mb-8 font-medium max-w-2xl">
          {questionData.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {questionData.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === questionData.answer;
            
            let buttonClass = 'bg-slate-800 border-slate-700 hover:bg-indigo-600 hover:border-indigo-400 text-slate-300';
            
            if (isAnswered) {
              if (isCorrectOption) {
                buttonClass = 'bg-green-500/20 border-green-500 text-green-300';
              } else if (isSelected) {
                buttonClass = 'bg-red-500/20 border-red-500 text-red-300';
              } else {
                buttonClass = 'bg-slate-800 border-slate-700 text-slate-500 opacity-50';
              }
            } else if (isSelected) {
               buttonClass = 'bg-indigo-600 border-indigo-400 text-white';
            }

            return (
              <motion.button
                key={idx}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
                className={`relative overflow-hidden p-6 rounded-2xl border text-left flex flex-col justify-center transition-all group ${buttonClass}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className={`text-xs block mb-1 transition-colors ${!isAnswered ? 'text-slate-500 group-hover:text-indigo-200' : 'opacity-70'}`}>विकल्प {String.fromCharCode(65 + idx)}</span>
                    <span className="text-lg font-bold">{option}</span>
                  </div>
                  {isAnswered && isCorrectOption && <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 text-red-400 shrink-0" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Result Area */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              className={`p-6 rounded-2xl border ${
                isCorrect 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}
            >
              <h4 className={`text-xl font-bold mb-2 flex items-center gap-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? (
                  <>🎉 बहुत बढ़िया! सही जवाब!</>
                ) : (
                  <>😅 ओह! कोई बात नहीं!</>
                )}
              </h4>
              <p className="text-slate-300 mb-6">{questionData.explanation}</p>
              
              <button 
                onClick={handleNext}
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
              >
                {isCorrect && level < 100 ? 'अगला लेवल (Next Level)' : 'वापस जाएँ (Back)'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
