import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, AlertTriangle, AlertCircle, Info, Clock, Repeat, Target, Flame, Check, Plus, Trash2, Flag } from 'lucide-react';
import { exercisesBase } from '../data/exercisesData';
import { useAppContext } from '../context/AppContext';

export const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logExerciseProgress, addXP, completeWorkout } = useAppContext();
  
  const exercise = exercisesBase.find(e => e.id === id);

  const [isLogging, setIsLogging] = useState(false);
  const [sets, setSets] = useState<{ reps: number; weight: number }[]>([{ reps: 0, weight: 0 }]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!exercise) return <div className="text-center py-20">تمرين غير موجود</div>;

  const handleAddSet = () => {
    const lastSet = sets[sets.length - 1];
    setSets([...sets, { ...lastSet }]);
  };

  const handleUpdateSet = (index: number, field: 'reps' | 'weight', value: number) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleRemoveSet = (index: number) => {
    if (sets.length > 1) {
      const newSets = [...sets];
      newSets.splice(index, 1);
      setSets(newSets);
    }
  };

  const handleFinishLogging = () => {
    logExerciseProgress(exercise.id, exercise.nameAr, sets);
    addXP(50);
    completeWorkout();
    setIsLogging(false);
    // Could show a toast here
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header / Nav */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-black">{exercise.nameAr}</h1>
          <p className="text-gray-400 font-mono text-sm">{exercise.nameEn}</p>
        </div>
      </div>

      {/* Hero Media Section (Static Cover) */}
      <div id="exercise-hero-container" className="w-full rounded-4xl overflow-hidden glass-card relative aspect-video md:aspect-21/9 bg-[#111] group">
        {exercise.imageUrl ? (
          <img 
            src={exercise.imageUrl} 
            alt={exercise.nameAr}
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-[4s]"
            referrerPolicy="no-referrer"
          />
        ) : exercise.imageStartUrl ? (
          <img 
            src={exercise.imageStartUrl} 
            alt={exercise.nameAr}
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-[4s]"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-tr from-[#111] to-[#222] flex items-center justify-center">
             <Target className="w-24 h-24 text-white/5" />
          </div>
        )}
        
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
          <span className="text-xs font-bold text-white tracking-widest uppercase">التكنيك التفصيلي</span>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
             <Target className="w-4 h-4 text-brand-orange" />
             <span className="text-sm font-bold">{exercise.targetMuscle.join('، ')}</span>
          </div>
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
             <Flame className="w-4 h-4 text-red-500" />
             <span className="text-sm font-bold">~{exercise.estimatedCalories} سعرة</span>
          </div>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Execution & Details */}
        <div className="lg:col-span-2 space-y-6">
          <section className="glass-card p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-black mb-4">الوصف</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{exercise.description}</p>
          </section>

          <section className="glass-card p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Play className="w-6 h-6 text-brand-orange" />
              طريقة الأداء الصحيحة
            </h2>

            {/* Side-by-Side Body Postures Gallery */}
            {(exercise.imageStartUrl || exercise.imageMidUrl) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {exercise.imageStartUrl && (
                  <div className="bg-bg-nav border border-white/5 rounded-2xl overflow-hidden group">
                    <div className="aspect-video relative overflow-hidden bg-black/40">
                      <img 
                        src={exercise.imageStartUrl} 
                        alt="وضعية البداية" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 right-3 bg-brand-orange/90 text-black text-xs font-black px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1">
                        وضعية البداية <Flag className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="p-4 bg-white/1">
                      <p className="text-xs text-gray-400">حافظ على تركيزك وثبات الكور واستعد للمدى الحركي الكامل.</p>
                    </div>
                  </div>
                )}

                {exercise.imageMidUrl ? (
                  <div className="bg-bg-nav border border-white/5 rounded-2xl overflow-hidden group">
                    <div className="aspect-video relative overflow-hidden bg-black/40">
                      <img 
                        src={exercise.imageMidUrl} 
                        alt="وضعية منتصف الحركة" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 right-3 bg-brand-blue/90 text-white text-xs font-black px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1">
                        منتصف الحركة والعصر العضلي <Flame className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="p-4 bg-white/1">
                      <p className="text-xs text-gray-400">اعصر العضلة المستهدفة بقوة في ذروة الانقباض لمدة ثانية كاملة.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-bg-nav border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <Target className="w-12 h-12 text-brand-orange/20 mb-2 animate-bounce" />
                    <h4 className="font-bold text-gray-300">أداء متحكم ومدروس</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-50">انزل بالسرعة المطلوبة وادفع بقوة للقمة.</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-6">
              {exercise.executionSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange font-black flex items-center justify-center border border-brand-orange/50">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-3xl border border-red-500/20 relative overflow-hidden flex flex-col md:flex-row shadow-[0_4px_20px_rgba(239,68,68,0.05)]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -z-10"></div>
             <div className="p-6 md:p-8 flex-1">
               <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-red-400">
                 <AlertTriangle className="w-6 h-6" />
                 أخطاء شائعة (تجنبها)
               </h2>
               <ul className="space-y-3">
                 {exercise.commonMistakes.map((mistake, idx) => (
                   <li key={idx} className="flex items-start gap-3">
                     <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                     <span className="text-gray-300">{mistake}</span>
                   </li>
                 ))}
               </ul>
             </div>
             {exercise.imageMistakeUrl && (
               <div className="md:w-1/3 bg-red-500/5 relative border-t md:border-t-0 md:border-r border-red-500/20 min-h-50">
                 <img src={exercise.imageMistakeUrl} alt="طريقة خاطئة" className="w-full h-full object-cover object-center absolute inset-0 opacity-80 mix-blend-screen" />
                 <div className="absolute top-3 right-3 bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-1 border border-red-500/30 rounded backdrop-blur-md flex items-center gap-1">تجنب هذا <Check className="w-3 h-3" /></div>
               </div>
             )}
          </section>

          {exercise.imageMuscleUrl && (
            <section className="glass-card rounded-3xl relative overflow-hidden flex flex-col md:flex-row shadow-[0_4px_20px_rgba(255,107,0,0.05)] border border-brand-orange/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
              <div className="md:w-1/3 bg-bg-nav relative border-b md:border-b-0 md:border-l border-white/5 min-h-62.5">
                <img src={exercise.imageMuscleUrl} alt="العضلات المستهدفة" className="w-full h-full object-cover object-center absolute inset-0 opacity-90 mix-blend-screen" />
              </div>
              <div className="p-6 md:p-8 flex-1">
                <h2 className="text-2xl font-black mb-4 flex items-center gap-2 text-brand-orange">
                  <Target className="w-6 h-6" />
                  العضلات المستهدفة
                </h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exercise.targetMuscle.map((tm, idx) => (
                    <span key={idx} className="bg-brand-orange/10 border border-brand-orange/30 text-brand-orange px-4 py-2 rounded-xl font-bold">{tm}</span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Col - Stats & Params */}
        <div className="space-y-6">
          <section className="glass-card p-6 rounded-3xl">
            <h3 className="font-black text-xl mb-6">إعدادات التمرين (المقترحة)</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Repeat className="w-5 h-5 text-gray-400" />
                  <span className="font-bold">الجلسات</span>
                </div>
                <span className="text-xl font-black">{exercise.defaultSets}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <span className="font-bold">التكرارات</span>
                </div>
                <span className="text-xl font-black">{exercise.defaultReps}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="font-bold">الراحة</span>
                </div>
                <span className="text-xl font-black">{exercise.restDurationSeconds} ث.</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isLogging ? (
                <motion.button 
                  key="start-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsLogging(true)}
                  className="w-full mt-6 bg-brand-orange hover:bg-brand-orange-dark text-black font-black text-lg py-4 rounded-full transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                >
                  بدء التمرين الآن
                </motion.button>
              ) : (
                <motion.div 
                  key="logging-ui"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className="bg-bg-nav border border-white/5 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-brand-orange">تسجيل الجولات</h4>
                      <button 
                        onClick={handleAddSet}
                        className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> جولة جديدة
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {sets.map((set, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                          <div className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 flex-1">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1 block">الوزن (كجم)</span>
                              <input 
                                type="number" 
                                value={set.weight || ''}
                                onChange={(e) => handleUpdateSet(idx, 'weight', parseFloat(e.target.value) || 0)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-center focus:outline-none focus:border-brand-orange"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1 block">التكرارات</span>
                              <input 
                                type="number" 
                                value={set.reps || ''}
                                onChange={(e) => handleUpdateSet(idx, 'reps', parseInt(e.target.value) || 0)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-center focus:outline-none focus:border-brand-orange"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => handleRemoveSet(idx)}
                            disabled={sets.length === 1}
                            className={`p-2 rounded-lg shrink-0 transition-colors ${sets.length === 1 ? 'opacity-30 cursor-not-allowed' : 'text-gray-500 hover:bg-red-500/20 hover:text-red-500'}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsLogging(false)}
                      className="flex-1 py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      إلغاء
                    </button>
                    <button 
                      onClick={handleFinishLogging}
                      className="flex-2 py-3 rounded-xl font-bold bg-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      حفظ السجل
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="glass-card p-6 rounded-3xl">
            <h3 className="font-black text-xl mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-brand-blue" />
              نصيحة الكابتن
            </h3>
            <div className="space-y-3">
              {exercise.proTips.map((tip, idx) => (
                <div key={idx} className="bg-brand-blue/5 border border-brand-blue/20 p-4 rounded-2xl text-sm text-brand-blue">
                  {tip}
                </div>
              ))}
            </div>
          </section>

          {exercise.warnings.length > 0 && (
            <section className="glass-panel p-6 rounded-3xl border-orange-500/30">
              <h3 className="font-bold text-lg mb-2 text-orange-400 flex items-center gap-2">
                 <Info className="w-4 h-4" /> تحذيرات
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {exercise.warnings[0]}
              </p>
            </section>
          )}
        </div>

      </div>
    </div>
  );
};
