export type Difficulty = 'مبتدئ' | 'متوسط' | 'متقدم';
export type MuscleGroup = 'الصدر' | 'الظهر' | 'الأكتاف' | 'الذراع' | 'الأرجل' | 'البطن' | 'الكارديو' | 'الجسم كامل';
export type Equipment = 'وزن الجسم' | 'دمبل' | 'بار' | 'أجهزة' | 'مقاومة';

export interface ExerciseStep {
  title: string;
  description: string;
}

export interface UserProfile {
  isComplete: boolean;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  goal: string;
  location: string;
  equipment: string;
  injuries: string;
}

export interface Exercise {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  targetMuscle: MuscleGroup[];
  difficulty: Difficulty;
  commonMistakes: string[];
  executionSteps: ExerciseStep[];
  warnings: string[];
  defaultSets: number;
  defaultReps: string;
  restDurationSeconds: number;
  proTips: string[];
  alternatives: string[]; // IDs of other exercises
  similar: string[]; // IDs
  equipment: Equipment[];
  isHomeFriendly: boolean;
  estimatedCalories: number;
  specialNotes: string;
  imageUrl?: string;
  imageStartUrl?: string;
  imageMidUrl?: string;
  imageMistakeUrl?: string;
  imageMuscleUrl?: string;
  videoUrl?: string;
}

export interface NutritionPlan {
  id: string;
  title: string;
  type: 'مبتدئ' | 'متوسط';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: {
    name: string;
    items: string[];
    time: string;
    calories: number;
    imageUrl?: string;
  }[];
}

export interface MeasurementRecord {
  id: string;
  date: string;
  chest: number;
  waist: number;
  arm: number;
}

export interface WeightRecord {
  id: string;
  date: string;
  weight: number;
}

export interface ExerciseSetRecord {
  reps: number;
  weight: number;
}

export interface ExerciseRecord {
  id: string;
  date: string;
  exerciseId: string;
  exerciseName: string;
  sets: ExerciseSetRecord[];
}

export interface UserStats {
  xp: number;
  level: number;
  dailyStreak: number;
  lastWorkoutDate: string | null;
  workoutsCompleted: number;
  weight: number;
  targetWeight: number;
  achievements: string[];
  weightHistory: WeightRecord[];
  measurementHistory: MeasurementRecord[];
  exerciseHistory: ExerciseRecord[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string; // lucide icon name
  condition: (stats: UserStats) => boolean;
}
