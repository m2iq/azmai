import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Dumbbell } from 'lucide-react';
import { exercisesBase } from '../data/exercisesData';
import { Link } from 'react-router-dom';

export const Exercises: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('الكل');

  const muscles = ['الكل', 'الصدر', 'الظهر', 'الأكتاف', 'الذراع', 'الأرجل', 'البطن'];

  const filteredExercises = exercisesBase.filter((ex) => {
    const matchesSearch = ex.nameAr.includes(searchTerm) || ex.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'الكل' || ex.targetMuscle.includes(activeFilter as any);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2">مكتبة التمارين</h1>
          <p className="text-gray-400">تصفح أقوى التمارين لبناء العضلات وفق أسس علمية.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="ابحث عن تمرين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-2xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {muscles.map((muscle) => (
          <button
            key={muscle}
            onClick={() => setActiveFilter(muscle)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border
              ${activeFilter === muscle 
                ? 'bg-brand-orange text-black border-brand-orange shadow-[0_0_15px_rgba(255,107,0,0.3)]' 
                : 'bg-[#111] text-gray-400 border-white/5 hover:bg-white/5'}`}
          >
            {muscle}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <AnimatePresence mode="popLayout">
          {filteredExercises.map((ex, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={ex.id}
            >
              <Link to={`/exercises/${ex.id}`}>
                <div className="glass-card rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer h-full flex flex-col">
                  {/* Image Placeholder or Actual Image */}
                  <div className="h-48 relative overflow-hidden bg-[#151515]">
                    {ex.imageUrl ? (
                      <img 
                        src={ex.imageUrl} 
                        alt={ex.nameAr}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a]">
                        <Dumbbell className="w-16 h-16 text-white/5 group-hover:text-brand-orange/20 transition-colors duration-500" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md backdrop-blur-md border
                        ${ex.difficulty === 'مبتدئ' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                          ex.difficulty === 'متوسط' ? 'bg-brand-blue/20 text-brand-blue border-brand-blue/30' : 
                          'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                        {ex.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-brand-orange transition-colors">{ex.nameAr}</h3>
                    <p className="text-xs text-gray-500 mb-4 font-mono">{ex.nameEn}</p>
                    
                    <div className="flex gap-2 mb-4 mt-auto">
                      {ex.targetMuscle.slice(0, 2).map((m) => (
                        <span key={m} className="text-xs px-2 py-1 bg-white/5 rounded-md text-gray-300">
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="w-full h-px bg-white/5 mb-4"></div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                      <div className="flex items-center gap-1">
                        <span className="text-white">{ex.defaultSets}</span> جلسات
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-white">{ex.defaultReps}</span> تكرار
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredExercises.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="col-span-full py-16 text-center text-gray-500"
          >
            <Dumbbell className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">لم نعثر على تمارين مطابقة لبحثك.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
