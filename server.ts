import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  const PORT = 3000;

  // Simple in-memory rate limiter: max 20 requests per minute per IP
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  const rateLimit = (req: any, res: any, next: any) => {
    const ip = (req.ip || req.connection?.remoteAddress || 'unknown') as string;
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 20;
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    if (entry.count >= maxRequests) {
      return res.status(429).json({ error: 'طلبات كثيرة جداً، الرجاء الانتظار دقيقة.' });
    }
    entry.count++;
    next();
  };

  let ai: GoogleGenAI | null = null;
  try {
    if (process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
  } catch (e) {
    console.warn("Failed to initialize Gemini Client. Check API Key.", e);
  }

  // API Routes
  app.post("/api/coach", rateLimit, async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
      }

      const { message, profile, history, appData } = req.body;

      const systemInstruction = `أنت مدرب شخصي ذكي ومحترف جداً في تطبيق "Azm AI". اسمك "كابتن عزم".
تتحدث العربية بطلاقة (ويمكنك استخدام مصطلحات من اللهجة العراقية بشكل خفيف ومحبب إذا لزم الأمر).

بيانات المتدرب الحقيقية (اقرأها واستخدمها كمرجع لردك):
الاسم: ${profile.name || "مجهول"}
الهدف: ${profile.goal || "غير محدد"}
الوزن الحالي: ${appData.stats.weight} كجم
التجهيزات المتاحة: ${profile.equipment || "غير محدد"}
الإصابات: ${profile.injuries || "لا يوجد"}

البيانات داخل التطبيق (جداول التمارين والأكل، استخدم الوجبات والتمارين الموجودة فيها فعلياً):
${JSON.stringify(appData.nutrition, null, 2)}
${JSON.stringify(appData.exercises.map((e: any) => ({id: e.id, nameAr: e.nameAr, targetMuscle: e.targetMuscle, estimatedCalories: e.estimatedCalories})), null, 2)}

دورك:
يجب أن تعتمد بردودك على هذه البيانات حصرياً ولا تخترع بيانات من خارج التطبيق إذا كانت متوفرة.
إذا طلب المستخدم التمارين، استخدم أرقام واسماء التمارين الموجودة في النظام لتسهيل الوصول إليها.

**تنسيقات عرض البيانات (مهم جدًا جدًا):**
عندما تريد عرض بطاقة طعام، استخدم التنسيق التالي في نص رسالتك:
[MEAL_CARD] {"meals": [{"name": "فطور", "items": ["بيض", "شوفان"], "calories": 400, "imageUrl": "/src/assets/images/meal_breakfast_1780104191657.png"}]} [/MEAL_CARD]
ملاحظة: خذ الصورة من البيانات المرفقة لك (imageUrl) ولا تخترعها.

عندما تريد عرض تمرين، استخدم هذا التنسيق ليقوم التطبيق بعرض صورة ومحتوى غني:
[EXERCISE_CARD] {"id": "push-up"} [/EXERCISE_CARD]

ردودك يجب أن تكون جميلة وملهمة وتشرح سبب اختيار التمارين أو الأكل وليس فقط عرضها.
`;

      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const contents = [...formattedHistory, { role: "user", parts: [{ text: message }] }];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: { systemInstruction }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Coach Error:", error);
      res.status(500).json({ error: "حدث خطأ أثناء التواصل مع الكابتن الذكي." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
