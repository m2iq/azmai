import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Utensils, Flame, Dumbbell, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { exercisesBase } from '../data/exercisesData';
import { nutritionPlans } from '../data/nutritionData';
import { Link } from 'react-router-dom';

const renderRichMessage = (text: string) => {
  // Extract custom tags
  const mealRegex = /\[MEAL_CARD\]([\s\S]*?)\[\/MEAL_CARD\]/g;
  const exerciseRegex = /\[EXERCISE_CARD\]([\s\S]*?)\[\/EXERCISE_CARD\]/g;

  let elements: React.ReactNode[] = [];
  let lastIndex = 0;

  // Let's find all tags. It's tricky to interleave multiple regexes simply,
  // so let's do a master regex
  const combinedRegex = /\[(MEAL_CARD|EXERCISE_CARD)\]([\s\S]*?)\[\/\1\]/g;
  
  let match;
  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={lastIndex} className="block mb-4">{text.substring(lastIndex, match.index)}</span>);
    }

    const type = match[1];
    const jsonStr = match[2].trim();
    
    try {
      const data = JSON.parse(jsonStr);

      if (type === 'MEAL_CARD') {
         elements.push(
            <div key={match.index} className="flex flex-col gap-3 my-4">
              {data.meals.map((m: any, i: number) => (
                <div key={i} className="bg-bg-panel border border-brand-blue/20 rounded-2xl p-4 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-xl -z-10 group-hover:bg-brand-blue/10 transition-colors"></div>
                  {m.imageUrl && (
                     <div className="w-full h-32 mb-4 rounded-xl overflow-hidden border border-white/5">
                        <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                     </div>
                  )}
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold flex items-center gap-2 text-brand-blue">
                      <Utensils className="w-4 h-4" />
                      {m.name}
                    </h4>
                    {m.calories && <span className="text-xs font-bold bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-md">{m.calories} kcal</span>}
                  </div>
                  <ul className="space-y-1 mb-2">
                    {m.items.map((item: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
         );
      } else if (type === 'EXERCISE_CARD') {
         const exercise = exercisesBase.find(e => e.id === data.id);
         if (exercise) {
           elements.push(
              <Link key={match.index} to={`/exercises/${exercise.id}`} className="block border border-brand-orange/30 bg-bg-panel rounded-3xl overflow-hidden my-4 group hover:shadow-[0_0_20px_rgba(255,107,0,0.15)] transition-all">
                <div className="h-40 w-full relative overflow-hidden">
                  {exercise.imageStartUrl ? (
                    <img src={exercise.imageStartUrl} alt={exercise.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : exercise.imageUrl ? (
                    <img src={exercise.imageUrl} alt={exercise.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center bg-white/5"><Dumbbell className="w-10 h-10 text-white/20"/></div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-bg-panel to-transparent"></div>
                  <div className="absolute bottom-3 right-4 flex items-center gap-2">
                     <span className="bg-brand-orange text-black text-xs font-black px-2 py-1 rounded-md">عرض التمرين</span>
                  </div>
                </div>
                <div className="p-4 relative">
                  <h4 className="font-bold text-lg mb-1">{exercise.nameAr}</h4>
                  <div className="flex gap-2 text-[10px] uppercase font-bold text-gray-400">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-red-500"/> {exercise.estimatedCalories} سعرة</span>
                    <span className="flex items-center gap-1"><Target className="w-3 h-3 text-brand-orange"/> {exercise.targetMuscle[0]}</span>
                  </div>
                </div>
              </Link>
           );
         }
      }

    } catch (e) {
       console.error("Failed to parse card JSON", jsonStr);
       // Exclude broken tag
    }

    lastIndex = combinedRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(<span key={lastIndex} className="block mt-2">{text.substring(lastIndex)}</span>);
  }

  return <div>{elements}</div>;
};

export const AICoach: React.FC = () => {
  const { profile, stats } = useAppContext();
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
    { role: 'ai', content: `أهلاً بك يا ${profile.name || 'بطل'}! أنا كابتن عزم، مدربك الشخصي الذكي. رأيت أن هدفك هو ${profile.goal} وأنك تتمرن في ${profile.location}. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن خطة تمارين أو نظام غذائي مناسب.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input.trim() } as const];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          profile,
          history: messages,
          appData: {
             stats,
             exercises: exercisesBase,
             nutrition: nutritionPlans
          }
        })
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      setMessages([...newMessages, { role: 'ai', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'ai', content: 'عذراً، أواجه مشكلة في الاتصال بالشبكة حالياً. يرجى المحاولة مرة أخرى لاحقاً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] flex flex-col relative w-full max-w-4xl mx-auto rounded-3xl glass-card border border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-3xl rounded-full -z-10"></div>
      
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-bg-nav/80 backdrop-blur-md flex items-center gap-4 z-10">
        <div className="w-12 h-12 rounded-full bg-brand-orange/20 border-2 border-brand-orange flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6 text-brand-orange" />
        </div>
        <div>
          <h2 className="font-black text-xl text-white tracking-tight">كابتن عزم</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <span className="text-xs font-bold text-gray-400">متصل ويقرأ بياناتك</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col gap-1 max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className={`p-4 rounded-3xl ${msg.role === 'user' ? 'bg-[#1a1a20] border border-white/10 text-white rounded-tr-none' : 'bg-transparent text-gray-200'} text-sm md:text-base leading-relaxed wrap-break-word w-full`}>
                {msg.role === 'ai' ? renderRichMessage(msg.content) : msg.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col gap-1 max-w-[80%] mr-auto items-start"
            >
               <div className="px-5 py-4 rounded-3xl bg-transparent flex gap-2 items-center">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                  <span className="text-xs text-brand-orange font-bold uppercase tracking-widest mr-2">يحلل المعطيات...</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-bg-nav/80 backdrop-blur-md border-t border-white/5 z-10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3 relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="اسأل كابتن عزم... (مثال: عطني تمرين للصدر، أو شنو وجباتي اليوم؟)"
            className="flex-1 bg-bg-panel border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-gray-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 bg-brand-orange text-black rounded-full flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(255,107,0,0.3)]"
          >
            <Send className="w-6 h-6 -ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

