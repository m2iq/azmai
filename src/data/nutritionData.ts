import { NutritionPlan } from '../types';

import imgBreakfast from '../assets/images/meal_breakfast_1780104191657.png';
import imgLunch from '../assets/images/meal_lunch_1780104213129.png';
import imgSnack from '../assets/images/meal_snack_1780104229815.png';

export const nutritionPlans: NutritionPlan[] = [
  {
    id: 'bulk-beginner',
    title: 'خطة زيادة الوزن - مبتدئ (تضخيم نظيف)',
    type: 'مبتدئ',
    calories: 2800,
    protein: 150,
    carbs: 350,
    fats: 90,
    meals: [
      {
        name: 'الفطور',
        time: '8:00 صباحاً',
        calories: 650,
        imageUrl: imgBreakfast,
        items: [
          '4 بيضات كاملة مقلية بقليل من زيت الزيتون',
          '3 شرائح خبز توست أسمر',
          'كوب حليب كامل الدسم',
          'موزة'
        ]
      },
      {
        name: 'وجبة خفيفة (سناك)',
        time: '11:00 صباحاً',
        calories: 400,
        imageUrl: imgSnack,
        items: [
          'شوفان (50 جم) مع حليب',
          'ملعقة كبيرة زبدة فول سوداني',
          'حفنة لوز'
        ]
      },
      {
        name: 'الغداء',
        time: '2:30 مساءً',
        calories: 850,
        imageUrl: imgLunch,
        items: [
          '200 جم صدر دجاج مشوي أو تكة',
          '250 جم رز (تمن) أبيض أو برغل',
          'صحن سلطة خضراء كبير بزيت الزيتون',
          'كوب لبن أو عيران'
        ]
      },
      {
        name: 'وجبة قبل التمرين',
        time: '5:30 مساءً',
        calories: 300,
        imageUrl: imgSnack,
        items: [
          'تفاحة أو تمرتين',
          'كوب قهوة سادة (اختياري)',
          'شريحة توست مع زبدة الفول السوداني'
        ]
      },
      {
        name: 'العشاء (بعد التمرين)',
        time: '8:30 مساءً',
        calories: 600,
        imageUrl: imgLunch,
        items: [
          '150 جم لحم بقري مفروم أو سمك مشوي',
          'حبتين بطاطا مشوية أو مسلوقة',
          'صحن سلطة تشكيلة مع ليمون'
        ]
      }
    ]
  },
  {
    id: 'bulk-intermediate',
    title: 'خطة التضخيم المتقدمة (بروتين عالي)',
    type: 'متوسط',
    calories: 3200,
    protein: 180,
    carbs: 400,
    fats: 100,
    meals: [
      {
        name: 'الفطور',
        time: '7:30 صباحاً',
        calories: 750,
        items: [
          'عجة (أومليت) بـ 5 بيضات مع جبن شيدر وسبانخ',
          'وعاء شوفان بـ 100 جم شوفان وحليب كامل الدسم',
          'عسل ومكسرات للتزيين'
        ]
      },
      {
        name: 'الغداء',
        time: '1:00 مساءً',
        calories: 900,
        items: [
          '250 جم لحم عجل (ستيك أو كباب شوي)',
          '300 جم معكرونة بالصلصة أو رز مندي',
          'زبدية لوز وحمص'
        ]
      },
      {
        name: 'قبل التمرين مسحوق مكسب وزن',
        time: '4:30 مساءً',
        calories: 500,
        items: [
          'سكوب بروتين واي أو جينر',
          'حليب كامل الدسم مع موزة وثلج (سموذي)'
        ]
      },
      {
        name: 'العشاء (تغذية العضلات)',
        time: '8:00 مساءً',
        calories: 850,
        items: [
          '250 جم سمك سلمون أو دجاج مسحب',
          'بطاطا حلوة مهروسة 250 جم',
          'سلطة أفوكادو وخضروات'
        ]
      },
      {
        name: 'سناك قبل النوم',
        time: '11:00 مساءً',
        calories: 200,
        items: [
          '150 جم جبن قريش (Cottage) الغني بالكازين البطيء الامتصاص',
          'حفنة جوز (عين الجمل)'
        ]
      }
    ]
  }
];
