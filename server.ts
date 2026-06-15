import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI SDK safely
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("GoogleGenAI initialized successfully with API key shadow-check.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured or in placeholder mode. AI Tutor will operate in educational offline fallback mode.");
}

app.use(express.json());

// API endpoint for PlantQuran AI Tutor
app.post("/api/chat", async (req, res) => {
  const { messages, context } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array format" });
  }

  const promptMessage = messages[messages.length - 1]?.content || "";

  // Set up high-quality educational fallback logic if AI is unconfigured or errors
  const fallbackResponse = (prompt: string) => {
    const text = prompt.toLowerCase();
    if (text.includes("akar") || text.includes("root")) {
      return "Hubungan Akar dan Al-Qur'an terdapat dalam QS. Ibrahim: 24. Akar tumbuhan kokoh menancap di tanah untuk mengikat air dan nutrisi, mencerminkan keteguhan kalimat Thayyibah dan fondasi iman yang kuat dalam Islam.";
    }
    if (text.includes("fotosintesis") || text.includes("cahaya") || text.includes("daun")) {
      return "Klorofil dan fotosintesis disebutkan secara implisit dalam QS. Yasin: 80 (mengeluarkan api dari kayu yang hijau). Daun hijau menyerap energi matahari untuk menghasilkan makanan (glukosa) dan oksigen, menunjukkan kebesaran Allah tentang transformasi energi di alam semesta.";
    }
    if (text.includes("adaptasi") || text.includes("gurun") || text.includes("hutan")) {
      return "Tumbuhan beradaptasi dengan lingkungan unik (QS. Al-A'raf: 58). Tumbuhan gurun seperti kaktus memiliki daun berbentuk duri untuk mengurangi penguapan, membuktikan ketelitian Allah (Al-Khaliq) dalam mendesain setiap makhluk agar bertahan sesuai takdir habitatnya.";
    }
    if (text.includes("reproduksi") || text.includes("kawin") || text.includes("penyerbukan")) {
      return "QS. Taha: 53 dan QS. Luqman: 10 menyebutkan bahwa Allah menumbuhkan tumbuhan berpasang-pasangan. Proses penyerbukan (dibantu angin/hewan) mendasari reproduksi generatif tumbuhan, membuktikan harmoni penciptaan berpasangan.";
    }
    return `Maa Syaa Allah, pertanyaan luar biasa! Tumbuhan (Plantae) adalah bukti nyata keagungan penciptaan Allah (QS. Al-An'am: 99). Sebagai PlantQuran AI Tutor, saya siap mendampingi Anda belajar Biologi tumbuhan yang terintegrasi nilai Al-Qur'an. Apakah ada materi klorofil, akar, fotosintesis, atau LKPD PBL tentang Plantae yang ingin ditanyakan secara mendalam?`;
  };

  if (!ai) {
    return res.json({ response: fallbackResponse(promptMessage) + " [Offline Mode]" });
  }

  try {
    const systemInstruction = `Anda adalah "PlantQuran AI", asisten tutor sains biologi interaktif berbasis Problem Based Learning (PBL) untuk siswa SMA kelas X.
Tugas utama Anda:
1. Menjelaskan materi tumbuhan (Plantae) secara ilmiah (sesuai kurikulum merdeka biologi SMA) terintegrasi dengan nilai-nilai ayat suci Al-Qur'an (misal QS. Al-An'am: 99, QS. Yasin: 80, QS. Ibrahim: 24).
2. Membimbing siswa menyelesaikan Lembar Kerja Peserta Didik (LKPD) berbasis PBL dengan cara memberikan petunjuk yang merangsang cara berpikir kritis, jangan langsung memberikan jawaban akhir secara penuh.
3. Menjawab pertanyaan seputar fotosintesis, organ tumbuhan, klasifikasi Plantae, adaptasi, dan manfaat tumbuhan bagi manusia & ekosistem.
Gunayakan bahasa Indonesia yang santun, mendidik, menginspirasi rasa syukur kepada Allah SWT (Rabb Al-Alamin), dan mudah dipahami siswa SMA kelas X.`;

    // Map conversation payload format to GoogleGenAI expected input formats
    // We can concatenate messages or use generateContent
    let contextPrompt = "";
    if (context) {
      contextPrompt = `[Konteks pembelajaran saat ini: ${context}]\n\n`;
    }

    const conversationHistory = messages.slice(-5).map(m => `${m.role === "user" ? "Siswa" : "PlantQuran AI"}: ${m.content}`).join("\n");
    const fullPrompt = `${contextPrompt}${conversationHistory}\nSiswa: ${promptMessage}\nPlantQuran AI:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const aiText = response.text || "Mohon maaf, terjadi hambatan sistem dalam merangkai tanggapan. Silakan ulangi pertanyaan Anda.";
    return res.json({ response: aiText });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    return res.json({ response: fallbackResponse(promptMessage) + " (Koneksi lokal aktif - silakan teruskan pembelajaran)" });
  }
});

// Setup Vite or Static serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production build from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
