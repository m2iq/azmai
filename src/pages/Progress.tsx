import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Target, TrendingUp, Trophy, Calendar, Check, X, Plus } from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

export const Progress: React.FC = () => {
  const { stats, updateWeight, addMeasurement } = useAppContext();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logType, setLogType] = useState<'weight' | 'measurements'>('weight');

  // Form states
  const [weightInput, setWeightInput] = useState(stats.weight.toString());
  const [chestInput, setChestInput] = useState('');
  const [waistInput, setWaistInput] = useState('');
  const [armInput, setArmInput] = useState('');

  const progressPercentage = Math.min(100, Math.max(0, ((stats.weight - 60) / (stats.targetWeight - 60)) * 100));

  const weightData = useMemo(() => {
    return (stats.weightHistory || []).map(r => {
      const dateObj = new Date(r.date);
      return {
        date: `${dateObj.getDate()}/${dateObj.getMonth() + 1}`,
        weight: r.weight
      }
    });
  }, [stats.weightHistory]);

  const measurementData = useMemo(() => {
    return (stats.measurementHistory || []).map(r => {
      const dateObj = new Date(r.date);
      return {
        date: `${dateObj.getDate()}/${dateObj.getMonth() + 1}`,
        chest: r.chest,
        waist: r.waist,
        arm: r.arm
      }
    });
  }, [stats.measurementHistory]);

  const handleSaveLog = () => {
    if (logType === 'weight') {
      const num = parseFloat(weightInput);
      if (!isNaN(num) && num > 0) {
        updateWeight(num);
      }
    } else {
      const c = parseFloat(chestInput);
      const w = parseFloat(waistInput);
      const a = parseFloat(armInput);
      if (!isNaN(c) && !isNaN(w) && !isNaN(a)) {
        addMeasurement(c, w, a);
      }
    }
    setIsLogModalOpen(false);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-xl border border-white/10 text-sm">
          <p className="font-bold text-gray-300 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-white">{entry.name}: {entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-4xl font-black mb-2 tracking-tight text-white">لوحة التقدم</h1>
        <p className="text-gray-400">تابع مسارك نحو بناء جسم أقوى.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl flex flex-col items-center justify-center text-center">
           <Trophy className="w-8 h-8 text-yellow-500 mb-2 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
           <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">المستوى</p>
           <h3 className="text-3xl font-black">{stats.level}</h3>
        </div>
        
        <div className="glass-card p-5 rounded-3xl flex flex-col items-center justify-center text-center">
           <TrendingUp className="w-8 h-8 text-brand-orange mb-2 drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" />
           <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">XP</p>
           <h3 className="text-3xl font-black">{stats.xp}</h3>
        </div>

        <div className="glass-card p-5 rounded-3xl flex flex-col items-center justify-center text-center">
           <Target className="w-8 h-8 text-brand-blue mb-2 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
           <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">التمارين</p>
           <h3 className="text-3xl font-black">{stats.workoutsCompleted}</h3>
        </div>

        <div className="gradient-card p-5 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 blur-xl rounded-full"></div>
           <Calendar className="w-8 h-8 text-brand-orange mb-2 relative z-10 drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" />
           <p className="text-[10px] text-gray-300 mb-1 font-bold tracking-widest uppercase relative z-10">الاستمرارية</p>
           <h3 className="text-3xl font-black text-white relative z-10">{stats.dailyStreak}</h3>
        </div>
      </div>

      {/* Weight Tracking */}
      <section className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange/5 blur-3xl rounded-full -z-10"></div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-2xl font-black">الوزن الحالي</h2>
          <button 
            onClick={() => { setLogType('weight'); setIsLogModalOpen(true); }}
            className="bg-brand-orange/10 text-brand-orange border border-brand-orange/30 hover:bg-brand-orange hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            تحديث
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8 relative z-10">
          <div className="md:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="96" cy="96" r="88" className="stroke-[#0a0a0c]" strokeWidth="8" fill="none" />
                 <circle 
                    cx="96" cy="96" r="88" 
                    className="stroke-brand-orange drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" 
                    strokeWidth="8" fill="none" 
                    strokeDasharray="552.92" 
                    strokeDashoffset={552.92 - (552.92 * progressPercentage) / 100} 
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
               </svg>
               <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-black">{stats.weight}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">كجم</span>
               </div>
            </div>
            <div className="w-full mt-6 space-y-3">
               <div className="flex justify-between items-center bg-brand-orange/10 p-4 rounded-xl border border-brand-orange/30">
                  <span className="text-brand-orange font-bold text-sm">الهدف</span>
                  <span className="font-black text-xl text-white">{stats.targetWeight} كجم</span>
               </div>
            </div>
          </div>
          
          <div className="md:w-2/3 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff6b00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="weight" name="الوزن" stroke="#ff6b00" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Body Measurements */}
      <section className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 blur-3xl rounded-full -z-10"></div>
         <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-2xl font-black">قياسات الجسم</h2>
          <button 
            onClick={() => { setLogType('measurements'); setIsLogModalOpen(true); }}
            className="bg-brand-blue/10 text-brand-blue border border-brand-blue/30 hover:bg-brand-blue hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة سجل
          </button>
        </div>

        {(stats.measurementHistory || []).length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={measurementData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="chest" name="الصدر" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="waist" name="الخصر" stroke="#eab308" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="arm" name="الذراع" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
            <Target className="w-12 h-12 text-gray-600 mb-3" />
            <p className="text-gray-400 mb-1 font-bold">لا توجد قياسات مسجلة بعد</p>
            <p className="text-xs text-gray-500 mb-4">أضف أول قياساتك لتتبع نموك العضلي</p>
            <button 
              onClick={() => { setLogType('measurements'); setIsLogModalOpen(true); }}
              className="px-6 py-2 bg-white text-black font-bold rounded-xl text-sm hover:scale-105 transition-transform"
            >
              ابدأ التتبع
            </button>
          </div>
        )}
      </section>

      {/* Exercise History */}
      <section className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-3xl rounded-full -z-10"></div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-2xl font-black">سجل التمارين</h2>
        </div>
        
        {(stats.exerciseHistory || []).length > 0 ? (
          <div className="space-y-4">
            {(stats.exerciseHistory || []).slice().reverse().map((record) => {
              const dateObj = new Date(record.date);
              return (
                <div key={record.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white mb-1">{record.exerciseName}</h3>
                    <p className="text-xs text-gray-500">
                      {dateObj.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {record.sets.map((set, idx) => (
                      <div key={idx} className="bg-bg-nav border border-white/5 px-3 py-2 rounded-xl text-center">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">جولة {idx + 1}</div>
                        <div className="font-bold text-brand-orange">{set.weight} كجم × {set.reps}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
            <Trophy className="w-12 h-12 text-gray-600 mb-3" />
            <p className="text-gray-400 mb-1 font-bold">لا يوجد سجل تمارين</p>
            <p className="text-xs text-gray-500">قم بإنهاء تمارين وتسجيل أوزانك لترى تقدمك هنا</p>
          </div>
        )}
      </section>

      {/* Modal for Logging */}
      <AnimatePresence>
        {isLogModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsLogModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass-card border border-white/10 rounded-3xl p-6 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {logType === 'weight' ? 'تحديث الوزن' : 'تسجيل القياسات'}
                </h3>
                <button 
                  onClick={() => setIsLogModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {logType === 'weight' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">الوزن الحالي (كجم)</label>
                    <input 
                      type="number" 
                      value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)}
                      className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white text-lg font-bold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                      placeholder="مثال: 70"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">الصدر (سم)</label>
                    <input 
                      type="number" 
                      value={chestInput}
                      onChange={(e) => setChestInput(e.target.value)}
                      className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white text-lg font-bold focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                      placeholder="مثال: 100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">الخصر (سم)</label>
                    <input 
                      type="number" 
                      value={waistInput}
                      onChange={(e) => setWaistInput(e.target.value)}
                      className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white text-lg font-bold focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                      placeholder="مثال: 80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">الذراع (سم)</label>
                    <input 
                      type="number" 
                      value={armInput}
                      onChange={(e) => setArmInput(e.target.value)}
                      className="w-full bg-bg-nav border border-white/10 rounded-xl p-4 text-white text-lg font-bold focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      placeholder="مثال: 35"
                    />
                  </div>
                </div>
              )}

              <button 
                onClick={handleSaveLog}
                className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                  logType === 'weight' ? 'bg-brand-orange text-white shadow-[0_0_15px_rgba(255,107,0,0.3)]' : 'bg-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                }`}
              >
                <Check className="w-5 h-5" />
                حفظ السجل
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
