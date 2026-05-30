import React, { useState } from 'react';
import { motion } from 'motion/react';
import { nutritionPlans } from '../data/nutritionData';
import { Utensils, Flame, Scissors, Beef } from 'lucide-react';

export const Nutrition: React.FC = () => {
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const plan = nutritionPlans[activePlanIdx];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black mb-2 tracking-tight text-white">التغذية الصحية</h1>
        <p className="text-gray-400">خطط أكل مدروسة لزيادة الوزن العضلي (التضخيم النظيف).</p>
      </div>

      {/* Plan Selector */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar hide-scrollbar">
        {nutritionPlans.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActivePlanIdx(idx)}
            className={`min-w-50 text-right p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden
              ${activePlanIdx === idx 
                ? 'gradient-card border-brand-orange/50 shadow-[0_0_20px_rgba(255,107,0,0.2)] ring-1 ring-brand-orange' 
                : 'bg-bg-panel border-white/5 hover:bg-white/10'}`}
          >
            {activePlanIdx === idx && <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/20 blur-xl rounded-full"></div>}
            <h3 className="font-bold text-lg mb-1 relative z-10">{p.title}</h3>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border relative z-10 ${p.type === 'مبتدئ' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-brand-blue border-brand-blue/30 bg-brand-blue/10'}`}>
              {p.type}
            </span>
          </button>
        ))}
      </div>

      {/* Macros Overview */}
      <motion.div 
        key={plan.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-3xl relative overflow-hidden border border-white/5"
      >
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-orange/5 blur-3xl rounded-full"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="text-center md:text-right">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">الهدف اليومي</h2>
            <div className="text-5xl font-black text-white drop-shadow-md flex items-baseline gap-2">
              <span className="text-transparent bg-clip-text bg-linear-to-l from-brand-orange to-brand-orange-dark drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">{plan.calories}</span> 
              <span className="text-sm font-bold text-gray-500">KCAL</span>
            </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 bg-bg-panel p-4 rounded-2xl text-center border border-white/5 relative overflow-hidden group hover:border-brand-blue/30 transition-colors">
              <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-brand-blue mb-1 flex justify-center drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"><Beef className="w-5 h-5"/></div>
              <div className="text-xl font-bold">{plan.protein}g</div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-1">بروتين</div>
            </div>
            <div className="flex-1 bg-bg-panel p-4 rounded-2xl text-center border border-white/5 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
              <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="text-yellow-500 mb-1 flex justify-center drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"><Scissors className="w-5 h-5 rotate-90"/></div>
              <div className="text-xl font-bold">{plan.carbs}g</div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-1">كارب</div>
            </div>
            <div className="flex-1 bg-bg-panel p-4 rounded-2xl text-center border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-colors">
              <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-red-500 mb-1 flex justify-center drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"><Flame className="w-5 h-5"/></div>
              <div className="text-xl font-bold">{plan.fats}g</div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-1">دهون</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Meals List */}
      <div className="space-y-6">
        <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-gray-200">وجبات اليوم</h3>
        {plan.meals.map((meal, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-4 md:p-6 rounded-3xl flex flex-col md:flex-row gap-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-linear-to-b from-brand-orange to-brand-orange-dark shadow-[0_0_10px_rgba(255,107,0,0.5)]"></div>
            <div className="absolute top-1/2 -right-10 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full -translate-y-1/2"></div>
            
            {meal.imageUrl && (
              <div className="w-full h-48 md:w-64 md:h-auto shrink-0 relative rounded-2xl overflow-hidden border border-white/5 order-first md:order-last">
                <img 
                  src={meal.imageUrl} 
                  alt={meal.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              </div>
            )}

            <div className="flex-1 flex flex-col md:flex-row gap-6 relative z-10 p-2 md:p-0">
              <div className="md:w-1/3 border-b md:border-b-0 md:border-l border-white/5 pb-4 md:pb-0 md:pl-6">
                <h4 className="text-xl font-bold text-white mb-2">{meal.name}</h4>
                <div className="text-xs text-brand-orange font-bold font-mono bg-brand-orange/10 inline-block px-3 py-1 rounded-lg border border-brand-orange/20">
                  {meal.time}
                </div>
                <div className="mt-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
                  {meal.calories} سعرة
                </div>
              </div>
              
              <div className="md:w-2/3 flex items-center">
                <ul className="space-y-3">
                  {meal.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Utensils className="w-4 h-4 mt-1 shrink-0 text-white/20 group-hover:text-brand-orange/50 transition-colors" />
                      <span className="text-gray-300 text-sm md:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
