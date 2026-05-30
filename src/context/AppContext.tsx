import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, WeightRecord, MeasurementRecord, ExerciseRecord, UserProfile } from '../types';

interface AppContextType {
  stats: UserStats;
  profile: UserProfile;
  addXP: (amount: number) => void;
  completeWorkout: () => void;
  updateWeight: (weight: number) => void;
  addMeasurement: (chest: number, waist: number, arm: number) => void;
  logExerciseProgress: (exerciseId: string, exerciseName: string, sets: { reps: number; weight: number }[]) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  isComplete: false,
  name: '',
  age: 25,
  gender: 'ذكر',
  weight: 65,
  height: 170,
  goal: 'بناء العضلات',
  location: 'المنزل',
  equipment: 'وزن الجسم',
  injuries: ''
};

const defaultStats: UserStats = {
  xp: 0,
  level: 1,
  dailyStreak: 0,
  lastWorkoutDate: null,
  workoutsCompleted: 0,
  weight: 65,
  targetWeight: 80,
  achievements: [],
  weightHistory: [{ id: 'init', date: new Date().toISOString(), weight: 65 }],
  measurementHistory: [],
  exerciseHistory: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('fitness_app_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultStats,
          ...parsed,
          weightHistory: parsed.weightHistory || defaultStats.weightHistory,
          measurementHistory: parsed.measurementHistory || defaultStats.measurementHistory,
          exerciseHistory: parsed.exerciseHistory || defaultStats.exerciseHistory,
        };
      }
    } catch {
      localStorage.removeItem('fitness_app_stats');
    }
    return defaultStats;
  });

  const [profile, setProfileState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('fitness_app_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      localStorage.removeItem('fitness_app_profile');
      return defaultProfile;
    }
  });

  useEffect(() => {
    localStorage.setItem('fitness_app_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('fitness_app_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfileState((prev) => ({ ...prev, ...data }));
  };

  const addXP = (amount: number) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 1000) + 1; // 1000 XP per level
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  const completeWorkout = () => {
    const today = new Date().toISOString().split('T')[0];
    setStats((prev) => {
      let newStreak = prev.dailyStreak;
      if (prev.lastWorkoutDate) {
        const lastDate = prev.lastWorkoutDate;
        if (lastDate === today) {
          // Already trained today, keep streak
        } else {
          const todayMs = new Date(today).getTime();
          const lastMs = new Date(lastDate).getTime();
          const diffDays = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        }
      } else {
        newStreak = 1;
      }

      return {
        ...prev,
        lastWorkoutDate: today,
        workoutsCompleted: prev.workoutsCompleted + 1,
        dailyStreak: newStreak,
      };
    });
    addXP(150); // Reward for completing a workout
  };

  const updateWeight = (weight: number) => {
    const today = new Date().toISOString();
    setStats((prev) => {
      const newWeightHistory = [...prev.weightHistory, { id: Date.now().toString(), date: today, weight }];
      return { ...prev, weight, weightHistory: newWeightHistory };
    });
  };

  const addMeasurement = (chest: number, waist: number, arm: number) => {
    const today = new Date().toISOString();
    setStats((prev) => {
      const newMeasurementHistory = [...prev.measurementHistory, { id: Date.now().toString(), date: today, chest, waist, arm }];
      return { ...prev, measurementHistory: newMeasurementHistory };
    });
  };

  const logExerciseProgress = (exerciseId: string, exerciseName: string, sets: { reps: number; weight: number }[]) => {
    const today = new Date().toISOString();
    setStats((prev) => {
      const newExerciseHistory = [...prev.exerciseHistory, { id: Date.now().toString(), date: today, exerciseId, exerciseName, sets }];
      return { ...prev, exerciseHistory: newExerciseHistory };
    });
  };

  return (
    <AppContext.Provider value={{ stats, profile, addXP, completeWorkout, updateWeight, addMeasurement, logExerciseProgress, updateProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
