import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Smile, Home, Dumbbell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Onboarding: React.FC = () => {
  const { profile, updateProfile } = useAppContext();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age,
    weight: profile.weight,
    height: profile.height,
    goal: profile.goal,
    location: profile.location,
    equipment: profile.equipment,
    injuries: profile.injuries
  });

  if (profile.isComplete) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      updateProfile({ ...formData, isComplete: true });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-100 bg-bg-dark flex flex-col items-center justify-center p-6 text-white text-right" dir="rtl">
      <div className="absolute top-0 right-0 w-full h-1 bg-white/10">
        <motion.div 
          className="h-full bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.5)]" 
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="w-full max-w-lg glass-card p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-3xl rounded-full -z-10"></div>
        
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black mb-2 tracking-tight flex items-center gap-3">أهلاً بك يا بطل! <Smile className="w-8 h-8 text-brand-orange" /></h2>
            <p className="text-gray-400 mb-8">دعنا نتعرف عليك لنصمم لك خطة مخصصة بالذكاء الاصطناعي.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">اسمك الأول</label>
                <input 
                  type="text" name="name" 
                  value={formData.name} onChange={handleChange}
                  className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white font-bold focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/20"
                  placeholder="محمد..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">العمر</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-orange text-center font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">الوزن (كجم)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-orange text-center font-bold" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black mb-2 tracking-tight">ما هو هدفك الأساسي؟</h2>
            <p className="text-gray-400 mb-8">اختار الهدف الأقرب لطموحك.</p>
            
            <div className="space-y-3">
              {['بناء العضلات', 'خسارة الوزن وتنشيف', 'رفع اللياقة العامة', 'زيادة الوزن والقوة'].map(g => (
                <button
                  key={g}
                  onClick={() => setFormData({ ...formData, goal: g })}
                  className={`w-full p-4 rounded-xl text-right font-bold transition-all border ${formData.goal === g ? 'bg-brand-orange/10 border-brand-orange text-brand-orange' : 'bg-bg-nav border-white/10 text-gray-400 hover:bg-white/5'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black mb-2 tracking-tight">أين تفضل التمرين؟</h2>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
               <button
                  onClick={() => setFormData({ ...formData, location: 'المنزل' })}
                  className={`p-6 rounded-2xl text-center font-bold transition-all border ${formData.location === 'المنزل' ? 'bg-brand-blue/10 border-brand-blue text-brand-blue' : 'bg-bg-nav border-white/10 text-gray-400 hover:bg-white/5'}`}
                >
                  <div className="mb-2 flex justify-center"><Home className="w-8 h-8" /></div>
                  في المنزل
               </button>
               <button
                  onClick={() => setFormData({ ...formData, location: 'الجيم' })}
                  className={`p-6 rounded-2xl text-center font-bold transition-all border ${formData.location === 'الجيم' ? 'bg-brand-orange/10 border-brand-orange text-brand-orange' : 'bg-bg-nav border-white/10 text-gray-400 hover:bg-white/5'}`}
                >
                  <div className="mb-2 flex justify-center"><Dumbbell className="w-8 h-8" /></div>
                  في الجيم
               </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black mb-2 tracking-tight">ما هي المعدات المتاحة لك؟</h2>
            <div className="space-y-3 mt-8">
              {['وزن الجسم فقط', 'دمبلز بسيطة', 'بار وأوزان الحرة', 'أجهزة النادي الكاملة'].map(eq => (
                <button
                  key={eq}
                  onClick={() => setFormData({ ...formData, equipment: eq })}
                  className={`w-full p-4 rounded-xl text-right font-bold transition-all border ${formData.equipment === eq ? 'bg-white text-black border-white' : 'bg-bg-nav border-white/10 text-gray-400 hover:bg-white/5'}`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black mb-2 tracking-tight">أي إصابات أو ملاحظات؟</h2>
            <p className="text-gray-400 mb-8">يساعدنا هذا في منع التمارين المؤذية لك.</p>
            
            <textarea 
              name="injuries" 
              value={formData.injuries} 
              onChange={(e: any) => handleChange(e)}
              className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-orange h-32 resize-none"
              placeholder="مثال: ألم في أسفل الظهر، إصابة سابقة في الكتف... (أو اتركها فارغة إذا كنت سليماً)"
            ></textarea>
          </div>
        )}

        <div className="mt-10 flex justify-between">
           {step > 1 ? (
             <button onClick={handlePrev} className="p-3 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                <ChevronRight className="w-6 h-6" />
             </button>
           ) : <div/>}

           <button 
             onClick={handleNext} 
             disabled={step === 1 && !formData.name}
             className="px-8 py-3 bg-brand-orange text-black font-black rounded-xl hover:bg-brand-orange-dark transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,107,0,0.3)] disabled:opacity-50 disabled:shadow-none"
           >
             {step === 5 ? 'ابدأ الآن' : 'التالي'}
             <ArrowLeft className="w-5 h-5" />
           </button>
        </div>
      </motion.div>
    </div>
  );
};
