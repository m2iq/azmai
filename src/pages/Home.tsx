import React from 'react';
import { motion } from 'motion/react';
import { Play, TrendingUp, Award, Zap, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { exercisesBase } from '../data/exercisesData';

export const Home: React.FC = () => {
  const { stats, profile } = useAppContext();

  const goalToExerciseId: Record<string, string> = {
    'بناء العضلات': 'push-up',
    'خسارة الوزن وتنشيف': 'plank',
    'رفع اللياقة العامة': 'squat',
    'زيادة الوزن والقوة': 'deadlift',
  };
  const targetId = goalToExerciseId[profile.goal] || 'push-up';
  const highlightExercise = exercisesBase.find(e => e.id === targetId) || exercisesBase[0];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative w-full rounded-[40px] overflow-hidden min-h-100 flex items-end p-6 md:p-12 gradient-card border border-white/10 group">
        <div className="absolute inset-0 hero-bg mix-blend-overlay opacity-30"></div>
        <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-transparent to-transparent"></div>
        <div className="relative z-10 w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 bg-brand-orange text-black text-[10px] font-black rounded-full mb-4">
              تمارين اليوم
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-xl">
              لا وقت <span className="text-brand-orange drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">للأعذار</span><br/>
              حان وقت البناء
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mb-8 leading-relaxed">
              تابع تمرينك اليومي واكتسب المزيد من الكتلة العضلية مع خطة مخصصة لك. هذه الخطة مصممة لزيادة الوزن وبناء كتلة عضلية صافية.
            </p>
            
            <Link to="/exercises" className="bg-white hover:bg-brand-orange text-black hover:text-white transition-all transform hover:scale-105 active:scale-95 duration-300 font-bold text-lg px-8 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center">
              <Play fill="currentColor" className="w-5 h-5" />
              <span>ابدأ تمرين اليوم</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Widgets */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-brand-orange/50 transition-colors"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-orange/10 blur-3xl rounded-full"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-10 h-10 bg-brand-orange/20 rounded-xl flex items-center justify-center text-brand-orange">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">الاستمرارية</p>
              <h3 className="text-2xl font-black">{stats.dailyStreak} <span className="text-sm font-medium text-gray-500">أيام</span></h3>
            </div>
          </div>
          <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden border border-white/5 relative z-10">
            <div
              className="bg-linear-to-l from-brand-orange to-brand-orange-dark h-full rounded-full drop-shadow-[0_0_8px_rgba(255,107,0,0.5)] transition-all duration-1000"
              style={{ width: `${Math.min(100, (stats.dailyStreak / 30) * 100)}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-brand-blue/50 transition-colors"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-blue/10 blur-3xl rounded-full"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-10 h-10 bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">التمارين المنجزة</p>
              <h3 className="text-2xl font-black">{stats.workoutsCompleted} <span className="text-sm font-medium text-gray-500">تمرين</span></h3>
            </div>
          </div>
          <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden border border-white/5 relative z-10">
            <div
              className="bg-linear-to-l from-brand-blue to-cyan-400 h-full rounded-full drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000"
              style={{ width: `${Math.min(100, (stats.workoutsCompleted / 50) * 100)}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 rounded-3xl flex items-center justify-between group hover:border-yellow-500/50 transition-colors"
        >
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">الهدف القادم</p>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              مقاتل حديدي
            </h3>
            <p className="text-xs text-brand-orange mt-2">متبقي {1000 - (stats.xp % 1000)} XP</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-linear-to-tr from-brand-orange to-brand-orange-dark p-0.5">
             <div className="w-full h-full rounded-full bg-bg-nav flex items-center justify-center font-bold text-xl drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">
               {stats.level}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Suggested Exercise Module */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-200">تمرين مقترح لك</h2>
          <Link to="/exercises" className="text-brand-orange hover:text-white font-bold text-xs transition-colors cursor-pointer">
            عرض الكل
          </Link>
        </div>
        
        <Link to={`/exercises/${highlightExercise.id}`}>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-3xl overflow-hidden glass-card relative group flex flex-col md:flex-row h-auto md:h-64 border border-white/5 hover:border-white/10"
          >
            {/* Image section */}
            <div className="md:w-1/3 aspect-video md:aspect-auto relative bg-bg-nav overflow-hidden">
              {highlightExercise.imageUrl ? (
                <img 
                  src={highlightExercise.imageUrl} 
                  alt={highlightExercise.nameAr}
                  className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-bg-nav flex items-center justify-center">
                  <Play className="w-16 h-16 text-white/5" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-bg-dark md:bg-linear-to-l md:from-bg-dark to-transparent"></div>
            </div>

            {/* Content section */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-gray-400">
                  {highlightExercise.nameEn} • {highlightExercise.targetMuscle.join('، ')}
                </span>
                <div className="flex gap-0.5 ml-2">
                  <div className="w-1 h-2 bg-brand-orange rounded-full"></div>
                  <div className={`w-1 h-2 rounded-full ${highlightExercise.difficulty === 'مبتدئ' ? 'bg-white/20' : 'bg-brand-orange'}`}></div>
                  <div className={`w-1 h-2 rounded-full ${highlightExercise.difficulty === 'متقدم' ? 'bg-brand-orange' : 'bg-white/20'}`}></div>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-tighter">{highlightExercise.difficulty}</span>
              </div>
              <h3 className="text-2xl font-black mb-2 text-gray-200 group-hover:text-white transition-colors">
                {highlightExercise.nameAr}
              </h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                {highlightExercise.description}
              </p>
              
              <div className="flex gap-6 mt-auto">
                <div className="bg-white/5 rounded-2xl px-4 py-2 flex text-center flex-col">
                  <span className="text-[10px] text-gray-500 mb-1 font-bold">جلسات</span>
                  <span className="font-bold">{highlightExercise.defaultSets}</span>
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-2 flex text-center flex-col">
                  <span className="text-[10px] text-gray-500 mb-1 font-bold">تكرارات</span>
                  <span className="font-bold">{highlightExercise.defaultReps}</span>
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-2 flex text-center flex-col">
                  <span className="text-[10px] text-gray-500 mb-1 font-bold">راحة</span>
                  <span className="font-bold">{highlightExercise.restDurationSeconds} ث</span>
                </div>
              </div>
            </div>
            
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 items-center justify-center text-gray-500 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] transition-all duration-300 hidden md:flex">
               <ChevronLeft className="w-5 h-5" />
            </div>
          </motion.div>
        </Link>
      </section>

    </div>
  );
};

