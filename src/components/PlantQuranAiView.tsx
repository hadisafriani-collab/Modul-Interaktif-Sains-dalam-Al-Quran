import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Trash2, X, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PlantQuranAiProps {
  currentContext: string;
}

export default function PlantQuranAiView({ currentContext }: PlantQuranAiProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Assalamu'alaikum! Selamat datang di **PlantQuran AI Tutor**. Saya adalah bimbingan asisten cerdas Anda dalam mengasah materi Tumbuhan (Plantae) terintegrasi nilai-nilai Al-Qur'an dan model belajar PBL.\n\nApakah ada konsep fotosintesis, organ akar (QS. Ibrahim: 24), adaptasi xerofit, atau langkah pengisian LKPD PBL yang ingin Anda tanyakan?`
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsgText = inputText.trim();
    setInputText("");

    const newMessages = [...messages, { role: "user" as const, content: userMsgText }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          context: currentContext
        })
      });

      if (!response.ok) {
        throw new Error("Koneksi server terputus");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("AI chat assistant error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Mohon maaf, jaringan asisten PlantQuran AI sedang terpadat. Mari lanjutkan diskusi terkait adaptasi kaktus xerofit (QS. Al-A'raf: 58) atau organ akar kokoh penopang yang menancap mantap kencang."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (confirm("Ingin memulai ulang obrolan diskusi baru dengan PlantQuran AI?")) {
      setMessages([
        {
          role: "assistant",
          content: "Assalamu'alaikum! Senang berdiskusi kembali. Ajukan pertanyaan biologi atau penafsiran ilmiah Al-Qur'an tentang Plantae sesuka hati-mu."
        }
      ]);
    }
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px] w-full">
      {/* Branded chat header */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl relative">
            <Bot className="w-5 h-5" />
            <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900"></span>
          </span>
          <div>
            <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase block font-mono">Asisten AI Tutor</span>
            <h4 className="font-bold text-slate-100 text-sm flex items-center space-x-1.5">
              <span>PlantQuran AI</span>
              <Sparkles className="w-4.5 h-4.5 text-amber-400 animate-pulse shrink-0" />
            </h4>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400 transition"
          title="Bersihkan Obrolan"
        >
          <Trash2 className="w-4" />
        </button>
      </div>

      {/* Messages Thread list */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/20 text-xs md:text-sm">
        {messages.map((msg, index) => {
          const isAi = msg.role === "assistant";
          return (
            <div
              key={index}
              className={`flex items-start gap-2.5 max-w-[85%] ${isAi ? "mr-auto" : "ml-auto flex-row-reverse"}`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${isAi ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-850 text-slate-300"}`}>
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              
              <div className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                isAi 
                  ? "bg-slate-900/90 text-slate-200 border border-slate-850 rounded-tl-none" 
                  : "bg-emerald-500 text-slate-950 font-semibold rounded-tr-none"
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-2.5 max-w-[80%] mr-auto">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-900 border border-slate-850 rounded-2xl rounded-tl-none text-slate-400 italic">
              PlantQuran AI sedang merangkai dalil & penjelasan ilmiah...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input panel form console */}
      <form onSubmit={handleSendMessage} className="bg-slate-950 p-3 border-t border-slate-850/80 flex gap-2">
        <input
          id="chat-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Tanya PlantQuran AI di halaman ${currentContext}...`}
          className="flex-1 bg-slate-900 text-slate-100 border border-slate-810/80 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
        />
        
        <button
          id="submit-chat-btn"
          type="submit"
          className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
