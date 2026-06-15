import React, { useState, useEffect } from "react";
import { Beaker, Sun, Droplets, Wind, HelpCircle, Compass, CheckCircle } from "lucide-react";

export default function VirtualLabView() {
  const [activeSimulation, setActiveSimulation] = useState<"fotosintesis" | "adaptasi">("fotosintesis");

  // Fotosintesis parameters
  const [lightIntensity, setLightIntensity] = useState(50);
  const [waterAmount, setWaterAmount] = useState(60);
  const [co2Level, setCo2Level] = useState(40);

  // Dynamic simulation calculations
  const [glucoseProduction, setGlucoseProduction] = useState(0);
  const [oxygenProduction, setOxygenProduction] = useState(0);
  const [bubbles, setBubbles] = useState<{ id: number; bottom: number; left: number; speed: number }[]>([]);

  // Calculate outputs based on biological logic
  useEffect(() => {
    // Photosynthesis limit factors: output is constrained by the minimum of water, light, CO2
    const baseOutput = Math.min(lightIntensity, waterAmount, co2Level) * 1.5;
    const efficiency = 0.8;
    const glucose = parseFloat((baseOutput * efficiency).toFixed(1));
    const oxygen = parseFloat((baseOutput * 1.2 * efficiency).toFixed(1));

    setGlucoseProduction(glucose);
    setOxygenProduction(oxygen);
  }, [lightIntensity, waterAmount, co2Level]);

  // Bubbles generator and animator for Hydrilla simulator
  useEffect(() => {
    let interval: any;
    // Speed of bubble generation based on oxygen amount
    const bubbleDelay = Math.max(200, 2000 - oxygenProduction * 15);
    
    interval = setInterval(() => {
      if (oxygenProduction > 5) {
        setBubbles((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            bottom: 30,
            left: Math.floor(Math.random() * 50) + 75, // around plant leaves
            speed: Math.random() * 2 + 1,
          },
        ]);
      }
    }, bubbleDelay);

    return () => clearInterval(interval);
  }, [oxygenProduction]);

  // Handle bubbles moving up
  useEffect(() => {
    const timer = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((b) => ({ ...b, bottom: b.bottom + b.speed }))
          .filter((b) => b.bottom < 110) // discard when reached top of beaker water level
      );
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Adaptasi parameters
  const [selectedHabitat, setSelectedHabitat] = useState<"gurun" | "hutan" | "pegunungan">("gurun");

  const habitatDetails = {
    gurun: {
      name: "Habitat Gurun (Xerofit)",
      plant: "Kaktus (Cactaceae)",
      quran: "QS. Al-A'raf: 58 (Tanah buruk menghasilkan tanaman merana kerdil seadanya)",
      leaf: "Duri (Mereduksi penguapan secara esensial)",
      stem: "Batang Tebal Sukulen (Dilapisi parenkim air tebal & klorofil batang)",
      root: "Akar Menyebar Luas Dangkal (Pemanen kelembaban hujan sporadis singkat)",
      explanation: "Kaktus meregulasi fiksasi CO2 menggunakan jalur metabolisme CAM (Crassulacean Acid Metabolism) di mana stomata hanya dibuka pada malam hari demi mencegah dehidrasi ekstrem dari kekeringan udara siang hari."
    },
    hutan: {
      name: "Habitat Hutan Hujan / Rawa (Hidrofit)",
      plant: "Teratai (Nymphaeaceae)",
      quran: "QS. Al-An'am: 99 (Allah keluarkan dari air hujan tumbuh-tumbuhan hijau rindang)",
      leaf: "Lebar Tipis (Memaksimalkan penangkapan foton matahari & mempermudah transpirasi)",
      stem: "Batang Berongga Udara / Aerenkim (Keluarnya udara bernapas agar tidak busuk)",
      root: "Akar Pendek Jangkar (Mencegah tanaman hanyut arus rawa ringan)",
      explanation: "Tumbuhan hidrofit beradaptasi dengan mengembangkan anyaman aerenkim pneumatis luas di dalam jaringan tangkai daun dan helai akarnya agar tetap mengapung serta mengantarkan oksigen murni ke kutub bawah."
    },
    pegunungan: {
      name: "Habitat Pegunungan (Conifer)",
      plant: "Pohon Pinus (Pinaceae)",
      quran: "QS. Ibrahim: 24 (Cabang daun pohon menjulang tegak lurus menyerap awan)",
      leaf: "Jarum Tebal Berlapis Lilin (Kuat menahan salju & menepis kedinginan beku)",
      stem: "Batang Lurus Kokoh & Mengandung Aras Resin (Kekebalan dari patah & beku)",
      root: "Akar Tunggang Masif (Cengkeraman membelah batuan pegunungan terjal)",
      explanation: "Tumbuhan berbiji terbuka (Gymnospermae) pinus mengandalkan adaptasi bentuk daun runcing jarum (needle-like) demi mengurangi hambatan mekanis timbunan salju serta memelihara klorofil tetap aktif di segala musim."
    }
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-3xl shadow-xl w-full">
      {/* Simulation Selector Tab */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Beaker className="w-6 h-6" />
          </span>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-amber-200">
            Laboratorium Botani Virtual (Virtual Lab)
          </h2>
        </div>
        
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSimulation("fotosintesis")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeSimulation === "fotosintesis" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🍂 Simulasi Fotosintesis
          </button>
          <button
            onClick={() => setActiveSimulation("adaptasi")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeSimulation === "adaptasi" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🌵 Simulasi Adaptasi
          </button>
        </div>
      </div>

      {activeSimulation === "fotosintesis" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5 bg-slate-950/30 p-5 rounded-2xl border border-slate-800/80">
            <h4 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-2 flex items-center space-x-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Manipulasi Variabel Fisiologis</span>
            </h4>

            {/* Light Intensity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center space-x-1.5 font-medium">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Intensitas Cahaya (Cahaya Matahari)</span>
                </span>
                <span className="font-bold font-mono text-amber-400">{lightIntensity} W/m²</span>
              </div>
              <input
                id="intensity-slider"
                type="range"
                min="0"
                max="100"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Water Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center space-x-1.5 font-medium">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  <span>Kandungan Air (Hidrasi Tanah)</span>
                </span>
                <span className="font-bold font-mono text-sky-300">{waterAmount}% rH</span>
              </div>
              <input
                id="water-slider"
                type="range"
                min="0"
                max="100"
                value={waterAmount}
                onChange={(e) => setWaterAmount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* CO2 Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center space-x-1.5 font-medium">
                  <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kadar Karbon Dioksida (CO2)</span>
                </span>
                <span className="font-bold font-mono text-emerald-400">{co2Level} ppm</span>
              </div>
              <input
                id="co2-slider"
                type="range"
                min="10"
                max="100"
                value={co2Level}
                onChange={(e) => setCo2Level(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Outcome panel */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Hasil Produksi Sel Secara Real-Time:</span>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Glukosa (Energi Kimiawi):</span>
                <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-xs">{glucoseProduction} mg/menit</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Gas Oksigen (O2 Reaksi Terang):</span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{oxygenProduction} mL/menit</span>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded text-xs text-slate-400 italic">
                Sesuai QS Yasin: 80, sisa fiksasi klorofil menyimpan energi matahari di dalam rantaian kayu selulosa tersebut.
              </div>
            </div>
          </div>

          {/* Interactive Beaker & Plant Animation Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950/40 rounded-2xl border border-slate-800/80 min-h-[350px]">
            <span className="text-xs text-amber-500 font-bold mb-4 font-mono">ANIMASI REAL-TIME: Hydrilla verticillata dalam Beaker Kaca</span>
            
            <div className="relative w-64 h-72 border-r-4 border-l-4 border-b-4 border-slate-300/40 rounded-b-3xl bg-sky-950/20 overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Beaker Water level background indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-sky-500/10 to-teal-500/10 border-t border-sky-400/20"></div>

              {/* Biological Water Plant (Hydrilla) drawn via SVG */}
              <svg className="absolute bottom-2 w-40 h-48 text-emerald-500" viewBox="0 0 100 120" fill="none">
                {/* Main Stem */}
                <path d="M50,110 Q45,60 55,10" stroke="#047857" strokeWidth="3" />
                {/* Lateral leaves clusters */}
                <path d="M47,90 Q20,80 15,75 M53,95 Q80,85 85,80" stroke="#10B981" strokeWidth="2.5" />
                <path d="M48,60 Q25,50 18,45 M52,65 Q75,55 82,50" stroke="#10B981" strokeWidth="2.5" />
                <path d="M49,30 Q30,22 25,18 M51,32 Q70,24 75,20" stroke="#10B981" strokeWidth="2" />
                
                {/* Leaves details */}
                <circle cx="15" cy="75" r="3" fill="#059669" />
                <circle cx="85" cy="80" r="3" fill="#059669" />
                <circle cx="18" cy="45" r="3" fill="#059669" />
                <circle cx="82" cy="50" r="3" fill="#059669" />
              </svg>

              {/* Dynamic Rising Bubbles (Oxygen) */}
              {bubbles.map((b) => (
                <div
                  key={b.id}
                  style={{
                    bottom: `${b.bottom}%`,
                    left: `${b.left}px`,
                  }}
                  className="absolute w-3 h-3 bg-cyan-200/40 border border-cyan-100 rounded-full animate-pulse"
                ></div>
              ))}

              {/* Sun Light Effect beam display based on slider */}
              <div
                style={{ opacity: lightIntensity / 180 }}
                className="absolute inset-0 bg-gradient-to-br from-amber-300/20 via-transparent to-transparent pointer-events-none transition-opacity"
              ></div>
            </div>

            <div className="mt-4 text-center max-w-sm">
              <p className="text-xs text-slate-400">
                Laju terbentuknya gelembung menggambarkan kecepatan <strong className="text-slate-200">fotolisis air</strong> melepaskan molekul gas O2 yang diubah secara konversi murni oleh radiasi foton.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Habitat Selector buttons */}
          <div className="grid grid-cols-3 gap-3 bg-slate-950/60 p-1 rounded-2xl border border-slate-800">
            {(["gurun", "hutan", "pegunungan"] as const).map((habitat) => (
              <button
                key={habitat}
                onClick={() => setSelectedHabitat(habitat)}
                className={`py-3 text-sm font-bold rounded-xl transition cursor-pointer capitalize ${
                  selectedHabitat === habitat ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {habitat === "gurun" && "🐪 "}
                {habitat === "hutan" && "🌸 "}
                {habitat === "pegunungan" && "🌲 "}
                <span>{habitat}</span>
              </button>
            ))}
          </div>

          {/* Interactive display card representing adaptations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-950/30 p-6 rounded-2xl border border-slate-800">
            {/* Morphological diagram representation */}
            <div className="flex flex-col items-center bg-slate-950 p-5 rounded-xl border border-slate-800/80 min-h-[250px] justify-center text-center">
              <span className="text-xs text-emerald-400 font-bold mb-4 uppercase tracking-widest font-mono">Modifikasi Anatomi {habitatDetails[selectedHabitat].plant}</span>
              
              {selectedHabitat === "gurun" && (
                <svg className="w-48 h-48" viewBox="0 0 120 120">
                  {/* Cactus body */}
                  <rect x="50" y="20" width="20" height="80" rx="10" fill="#047857" stroke="#10B981" strokeWidth="2" />
                  <rect x="30" y="40" width="15" height="40" rx="7" fill="#047857" stroke="#10B981" strokeWidth="2" />
                  <rect x="75" y="50" width="15" height="35" rx="7" fill="#047857" stroke="#10B981" strokeWidth="2" />
                  {/* Spine thorn representations */}
                  <line x1="50" y1="30" x2="40" y2="30" stroke="#FBBF24" strokeWidth="1.5" />
                  <line x1="70" y1="40" x2="80" y2="40" stroke="#FBBF24" strokeWidth="1.5" />
                  <line x1="45" y1="50" x2="35" y2="45" stroke="#FBBF24" strokeWidth="1.5" />
                  <line x1="55" y1="70" x2="55" y2="60" stroke="#FBBF24" strokeWidth="1.5" />
                  <text x="60" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">CAM Fisiologi • Kutikula Tebal</text>
                </svg>
              )}

              {selectedHabitat === "hutan" && (
                <svg className="w-48 h-48" viewBox="0 0 120 120">
                  {/* Lotus floating leaf */}
                  <ellipse cx="60" cy="80" rx="50" ry="8" fill="#10B981" opacity="0.8" />
                  <line x1="60" y1="80" x2="60" y2="120" stroke="#047857" strokeWidth="2.5" />
                  {/* Floating pink flower */}
                  <circle cx="60" cy="65" r="10" fill="#ED64A6" />
                  <path d="M60,45 C55,55 45,55 60,65 C75,55 65,55 60,45" fill="#F472B6" />
                  <text x="60" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">Aerenkim Tangkai • Stomata Atas</text>
                </svg>
              )}

              {selectedHabitat === "pegunungan" && (
                <svg className="w-48 h-48" viewBox="0 0 120 120">
                  {/* Conifer Spruce trunk */}
                  <line x1="60" y1="10" x2="60" y2="110" stroke="#78350F" strokeWidth="5" />
                  {/* Spikes branches */}
                  <polygon points="60,15 30,55 90,55" fill="#065F46" stroke="#047857" strokeWidth="2" />
                  <polygon points="60,40 20,85 100,85" fill="#065F46" stroke="#047857" strokeWidth="2" />
                  <text x="60" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">Daun Jarum Lilin • Kebal Salju</text>
                </svg>
              )}
            </div>

            {/* Technical analysis details */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-100">{habitatDetails[selectedHabitat].name}</h3>
              
              <div className="bg-emerald-950/20 border border-emerald-500/10 px-4 py-2.5 rounded-xl">
                <span className="text-xs text-amber-500 font-bold uppercase tracking-wider block">Spesimen Utama:</span>
                <span className="text-sm font-bold text-slate-100 block mt-0.5">{habitatDetails[selectedHabitat].plant}</span>
                <span className="text-[11px] text-slate-400 italic block mt-0.5">{habitatDetails[selectedHabitat].quran}</span>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                  <strong className="text-slate-200">Adaptasi Daun:</strong>
                  <p className="text-slate-400 mt-0.5">{habitatDetails[selectedHabitat].leaf}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                  <strong className="text-slate-200">Adaptasi Batang:</strong>
                  <p className="text-slate-400 mt-0.5">{habitatDetails[selectedHabitat].stem}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                  <strong className="text-slate-200">Adaptasi Akar:</strong>
                  <p className="text-slate-400 mt-0.5">{habitatDetails[selectedHabitat].root}</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">{habitatDetails[selectedHabitat].explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
