import { Exercise } from '../types';

import imgPushupStart from '../assets/images/pushup_start_new_1780106213706.png';
import imgPushupMid from '../assets/images/pushup_mid_1780099318253.png';
import imgPushupMuscles from '../assets/images/pushup_muscles_1780099332628.png';
import imgPushupMistake from '../assets/images/pushup_mistake_1780099348036.png';
import imgCurlStart from '../assets/images/curl_start_1780104125856.png';
import imgCurlMid from '../assets/images/curl_mid_1780104142288.png';
import imgCurlMuscle from '../assets/images/curl_muscle_1780104159291.png';
import imgCurlMistake from '../assets/images/curl_mistake_1780104176679.png';
import imgSquatStart from '../assets/images/squat_start_1780105142703.png';
import imgPullUpStart from '../assets/images/pull_up_start_1780105160791.png';
import imgPlankStart from '../assets/images/plank_start_1780105176567.png';
import imgDeadliftStart from '../assets/images/deadlift_start_1780105205617.png';
import imgShoulderPress from '../assets/images/shoulder_press_1780105232875.png';

export const exercisesBase: Exercise[] = [
  {
    id: 'push-up',
    nameAr: 'تمرين الضغط',
    nameEn: 'Push-Up',
    description: 'تمرين كلاسيكي بوزن الجسم يستهدف الصدر والأكتاف والترايسبس، ممتاز لبناء القوة الأساسية للمبتدئين.',
    targetMuscle: ['الصدر', 'الأكتاف', 'الذراع'],
    difficulty: 'مبتدئ',
    commonMistakes: [
      'تدلي الحوض لأسفل (تقوس الظهر)',
      'فتح الكوعين للخارج بشكل مبالغ فيه',
      'عدم النزول لمدى حركي كامل'
    ],
    executionSteps: [
      { title: 'وضعية البداية', description: 'ضع يديك على الأرض بعرض الكتفين أو أوسع قليلاً، حافظ على استقامة الظهر.' },
      { title: 'النزول', description: 'انزل ببطء حتى يقترب صدرك من الأرض، مع إبقاء الكوعين قريبين من الجسم (زاوية 45 درجة).' },
      { title: 'الدفع', description: 'ادفع جسمك للأعلى بقوة للعودة لوضعية البداية.' }
    ],
    warnings: ['تجنب التمرين إذا كنت تعاني من آلام حادة في مفصل الكتف أو الرسغ.'],
    defaultSets: 3,
    defaultReps: '8-12',
    restDurationSeconds: 60,
    proTips: ['شد عضلات البطن والأرداف طوال التمرين للحفاظ على استقامة الجسم.'],
    alternatives: ['knee-push-up', 'incline-push-up'],
    similar: ['bench-press'],
    equipment: ['وزن الجسم'],
    isHomeFriendly: true,
    estimatedCalories: 50,
    specialNotes: 'يمكن تسهيل التمرين بأدائه على الركبتين.',
    imageUrl: imgPushupStart,
    imageStartUrl: imgPushupStart,
    imageMidUrl: imgPushupMid,
    imageMuscleUrl: imgPushupMuscles,
    imageMistakeUrl: imgPushupMistake
  },
  {
    id: 'dumbbell-curl',
    nameAr: 'مرجحة البايسبس بالدمبل',
    nameEn: 'Dumbbell Bicep Curl',
    description: 'تمرين عزل يستهدف عضلة البايسبس (ذات الرأسين) لبناء كتلة عضلية وتكوير الذراع.',
    targetMuscle: ['الذراع'],
    difficulty: 'مبتدئ',
    commonMistakes: [
      'استخدام مرجحة الظهر لرفع الوزن',
      'تحريك الكوع للأمام أثناء الرفع',
      'النزول السريع دون تحكم'
    ],
    executionSteps: [
      { title: 'وضعية البداية', description: 'قف مستقيماً ممسكاً بدمبل في كل يد، الكفان يواجهان فخذيك.' },
      { title: 'الرفع', description: 'اثنِ كوعك لرفع الوزن نحو كتفك مع تدوير المعصم ليواجه كفك الأعلى.' },
      { title: 'النزول', description: 'انزل الوزن ببطء وتحكم للعودة لوضعية البداية.' }
    ],
    warnings: ['لا تستخدم وزن ثقيل جداً يؤدي لكسر وضعية الظهر السليمة.'],
    defaultSets: 3,
    defaultReps: '10-15',
    restDurationSeconds: 60,
    proTips: ['ركز على العصر العضلي في أعلى نقطة لمدة ثانية.'],
    alternatives: ['barbell-curl', 'cable-curl'],
    similar: ['hammer-curl'],
    equipment: ['دمبل'],
    isHomeFriendly: true,
    estimatedCalories: 30,
    specialNotes: 'يمكن أداؤه بالتبادل (يد ثم يد) أو كلتا اليدين معاً.',
    imageUrl: imgCurlStart,
    imageStartUrl: imgCurlStart,
    imageMidUrl: imgCurlMid,
    imageMuscleUrl: imgCurlMuscle,
    imageMistakeUrl: imgCurlMistake
  },
  {
    id: 'squat',
    nameAr: 'السكوات (القرفصاء)',
    nameEn: 'Squat',
    description: 'ملك تمارين الأرجل، يستهدف الفخذ الأمامي، الخلفي، والأرداف، ويبني قوة الجسم السفلية بالكامل.',
    targetMuscle: ['الأرجل'],
    difficulty: 'متوسط',
    commonMistakes: [
      'تقوس الظهر أثناء النزول',
      'دخول الركبتين للداخل',
      'رفع الكعبين عن الأرض'
    ],
    executionSteps: [
      { title: 'وضعية البداية', description: 'قف والمباعدة بين قدميك بعرض الكتفين، أصابع القدمين تشير للخارج قليلاً.' },
      { title: 'النزول', description: 'ادفع حوضك للخلف ولأسفل وكأنك تجلس على كرسي، مع الحفاظ على استقامة ظهرك.' },
      { title: 'الصعود', description: 'ادفع الأرض بقدميك للعودة لوضعية الوقوف مع عصر الأرداف قليلاً.' }
    ],
    warnings: ['يجب الإحماء جيداً لمفاصل الركبة والحوض. لا تتجاوز المدى الحركي المريح لك.'],
    defaultSets: 4,
    defaultReps: '8-12',
    restDurationSeconds: 90,
    proTips: ['انظر للأمام ولا ترفع رأسك لأعلى بشكل مبالغ فيه. خذ نفساً عميقاً قبل النزول.'],
    alternatives: ['leg-press', 'lunges'],
    similar: ['goblet-squat'],
    equipment: ['وزن الجسم', 'بار'],
    isHomeFriendly: true,
    estimatedCalories: 80,
    specialNotes: 'يعتبر تمرين مركب يحفز إفراز هرمون التستوستيرون الطبيعي.',
    imageUrl: imgSquatStart,
    imageStartUrl: imgSquatStart
  },
  {
    id: 'pull-up',
    nameAr: 'العقلة',
    nameEn: 'Pull-Up',
    description: 'تمرين يعتمد على وزن الجسم لبناء عرض وقوة الظهر، والتركيز على عضلة المجنص (Lats).',
    targetMuscle: ['الظهر', 'الذراع'],
    difficulty: 'متقدم',
    commonMistakes: [
      'عدم النزول بصورة كاملة',
      'استخدام الزخم (التأرجح) لرفع الجسم',
      'سحب الجسم بالبايسبس بدل تركيز السحب من الظهر'
    ],
    executionSteps: [
      { title: 'وضعية البداية', description: 'تعلق بالبار بقبضة أعرض من الكتفين بقليل، اليدين تواجهان الخارج.' },
      { title: 'السحب', description: 'اسحب جسمك للأعلى من خلال سحب كوعيك للأسفل وللخلف حتى يتجاوز ذقنك البار.' },
      { title: 'النزول', description: 'انزل جسمك ببطء وبتحكم كامل للعودة لوضعية التعلق.' }
    ],
    warnings: ['قد يكون صعباً جداً للمبتدئين أو أصحاب الأوزان الثقيلة، يفضل البدء بأشرطة المقاومة المساعدة.'],
    defaultSets: 3,
    defaultReps: 'حتى الفشل (أو 5-10)',
    restDurationSeconds: 120,
    proTips: ['حاول إبقاء صدرك مرفوعاً للأعلى لزيادة تفعيل عضلة المجنص.'],
    alternatives: ['lat-pulldown', 'assisted-pull-up'],
    similar: ['chin-up'],
    equipment: ['وزن الجسم', 'أجهزة'],
    isHomeFriendly: false,
    estimatedCalories: 60,
    specialNotes: 'مقياس حقيقي لقوة الجزء العلوي من الجسم.',
    imageUrl: imgPullUpStart,
    imageStartUrl: imgPullUpStart
  },
  {
    id: 'plank',
    nameAr: 'البلانك (الثبات)',
    nameEn: 'Plank',
    description: 'تمرين ثبات ممتاز لبناء قوة الكور (عضلات البطن والمركز) وتحمل العضلات.',
    targetMuscle: ['البطن'],
    difficulty: 'مبتدئ',
    commonMistakes: [
      'رفع الحوض للأعلى (شكل الخيمة)',
      'سقوط الحوض للأسفل وتقوس الظهر',
      'كتم الأنفاس (نسيان التنفس)'
    ],
    executionSteps: [
      { title: 'الوضعية', description: 'استند على ساعديك وأصابع قدميك. يجب أن يكون الكوعان تحت الكتفين مباشرة.' },
      { title: 'الثبات', description: 'حافظ على جسمك في خط مستقيم من الرأس حتى الكعبين، وشد عضلات البطن والأرداف.' }
    ],
    warnings: ['توقف فوراً إذا شعرت بألم في أسفل الظهر.'],
    defaultSets: 3,
    defaultReps: '30-60 ثانية',
    restDurationSeconds: 45,
    proTips: ['ادفع الأرض بساعديك لتجنب سقوط الصدر بين الكتفين.'],
    alternatives: ['crunches', 'leg-raises'],
    similar: ['side-plank'],
    equipment: ['وزن الجسم'],
    isHomeFriendly: true,
    estimatedCalories: 20,
    specialNotes: 'التركيز على شكل الجسم الصحيح أهم من مدة الثبات.',
    imageUrl: imgPlankStart,
    imageStartUrl: imgPlankStart
  },
  {
    id: 'deadlift',
    nameAr: 'الرفعة المميتة',
    nameEn: 'Deadlift',
    description: 'أقوى تمرين مركب لبناء القوة والكتلة، يستهدف السلسلة الخلفية بأكملها (ظهر، أرداف، أرجل خلفية).',
    targetMuscle: ['الظهر', 'الأرجل', 'الجسم كامل'],
    difficulty: 'متقدم',
    commonMistakes: [
      'تقوس الظهر أثناء الرفع الجد خطير',
      'بعد البار عن الساقين',
      'رفع الوركين قبل الأكتاف'
    ],
    executionSteps: [
      { title: 'وضعية البداية', description: 'قف والبار فوق منتصف القدم. انزل وامسك البار مع إبقاء ظهرك مستقيماً وصدرك مرفوعاً.' },
      { title: 'الرفع', description: 'ادفع الأرض بقدميك واسحب البار على امتداد ساقيك حتى تقف مستقيماً.' },
      { title: 'النزول', description: 'ادفع حوضك للخلف وأنزل البار بتحكم بنفس مسار الصعود.' }
    ],
    warnings: ['تمرين يتطلب تكنيك مثالي. التكنيك الخاطئ قد يسبب إصابات خطيرة بأسفل الظهر.'],
    defaultSets: 4,
    defaultReps: '5-8',
    restDurationSeconds: 180,
    proTips: ['تخيل أنك تدفع الأرض بقدميك للأسفل بدلاً من سحب البار للأعلى.'],
    alternatives: ['romanian-deadlift', 'sumo-deadlift'],
    similar: ['clean-and-jerk'],
    equipment: ['بار'],
    isHomeFriendly: false,
    estimatedCalories: 100,
    specialNotes: 'ينصح بتصوير نفسك للتحقق من استقامة الظهر.',
    imageUrl: imgDeadliftStart,
    imageStartUrl: imgDeadliftStart
  },
  {
    id: 'shoulder-press',
    nameAr: 'ضغط الكتف (بالدمبل)',
    nameEn: 'Dumbbell Shoulder Press',
    description: 'تمرين أساسي لبناء عضلات الأكتاف الأمامية والجانبية وزيادة عرض وعمق الكتف.',
    targetMuscle: ['الأكتاف'],
    difficulty: 'متوسط',
    commonMistakes: [
      'تقوس الظهر بشكل مفرط',
      'عدم النزول للأسفل بشكل كافٍ',
      'طقطقة الأوزان في الأعلى وفقدان الشد العضلي'
    ],
    executionSteps: [
      { title: 'وضعية البداية', description: 'اجلس على كرسي بظهر مستقيم. ارفع الدمبلز لمستوى الأكتاف.' },
      { title: 'الدفع', description: 'ادفع الأوزان بقوة للأعلى حتى تكاد تستقيم ذراعاك.' },
      { title: 'النزول', description: 'انزل ببطء وتحكم لمستوى الأكتاف مجدداً.' }
    ],
    warnings: ['احذر من الأوزان الثقيلة جداً لتجنب إصابات مفصل الكتف المعقد.'],
    defaultSets: 3,
    defaultReps: '10-12',
    restDurationSeconds: 60,
    proTips: ['حافظ على مرفقيك للداخل قليلاً (ليس بزاوية 90 تماماً) لحماية المفاصل.'],
    alternatives: ['barbell-overhead-press', 'arnold-press'],
    similar: ['lateral-raise'],
    equipment: ['دمبل'],
    isHomeFriendly: true,
    estimatedCalories: 45,
    specialNotes: 'يمكن أداؤه واقفاً لزيادة تفعيل عضلات المركز (البطن).',
    imageUrl: imgShoulderPress,
    imageStartUrl: imgShoulderPress
  }
];
