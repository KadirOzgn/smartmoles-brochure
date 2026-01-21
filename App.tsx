
import React, { useState, useEffect, useRef } from 'react';
import { 
  Droplets, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  ChevronDown,
  Waves, 
  MessageSquare,
  Search,
  X,
  Loader2,
  ExternalLink,
  Wind,
  Settings2,
  Database,
  Target,
  Layers,
  Zap,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Bileşenler ---

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-24 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<{text: string, sources: any[]} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDepthRange, setActiveDepthRange] = useState('12-19 cm');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAiQuery = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const activeQuery = customQuery || query;
    if (!activeQuery.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setIsChatOpen(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Sen bir SmartMoles uzmanısın. Kullanıcı sorusu: "${activeQuery}". SmartMoles'un patentli dikey analiz teknolojisi, leaching (yıkanma) tespiti ve %30 gübre tasarrufu gibi konularda teknik bilgi ver.`,
        config: { tools: [{ googleSearch: {} }] },
      });
      setAiResponse({ text: response.text || "", sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] });
    } catch (error) {
      setAiResponse({ text: "Bir hata oluştu.", sources: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const products = [
    { title: 'SmartMoles Sensörü', desc: 'Gübrenin boşa gitmesini önleyen patentli dikey analiz.', img: 'https://smartmoles.com/assets/images/product/smartmoles-com-smartmoles-sensor-urun-gorseli-01.webp', color: 'bg-green-600', url: 'https://smartmoles.com/urunlerimiz/smartmoles-sensoru' },
    { title: 'AirMoles İstasyonu', desc: 'İklimsel verilerle enerji maliyetlerini minimize edin.', img: 'https://smartmoles.com/assets/images/product/smartmoles-com-airmoles-urun-gorseli-01.webp', color: 'bg-blue-600', url: 'https://smartmoles.com/urunlerimiz/airmoles' },
    { title: 'SmartValves Vana', desc: 'Bitki su stresine girmeden otonom sulama kontrolü.', img: 'https://smartmoles.com/assets/images/product/smartmoles-com-smart-valves-urun-gorseli-01.webp', color: 'bg-orange-600', url: 'https://smartmoles.com/urunlerimiz/smartvalves' },
    { title: 'SpaceMoles Uydu', desc: 'Uzaydan tarlanızı anlık olarak sağlık taramasından geçirin.', img: 'https://smartmoles.com/uploads/1768378719649_smartmoles-com-spacemoles-urun-gorseli.webp', color: 'bg-indigo-600', url: 'https://smartmoles.com/urunlerimiz/spacemoles' }
  ];

  return (
    <div className="min-h-screen selection:bg-green-100 selection:text-green-900 bg-white">
      {/* Navigasyon */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <img src="https://smartmoles.com/assets/logo/smartmoles-logo.png" alt="SmartMoles" className={`h-9 w-auto ${isScrolled ? '' : 'brightness-0 invert'}`} />
          <a href="https://smartfarm.shop/auth/login" target="_blank" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-700 shadow-lg shadow-green-600/10 flex items-center gap-2">Canlı Veri <ExternalLink size={14} /></a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="Tarla" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-white"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 mb-8 backdrop-blur-md">
            <Database size={16} /> <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Tarım Teknolojileri Lideri</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">Tarımsal Kârlılığı <br/> <span className="text-green-400">Şansa Bırakmayın.</span></h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">Hassas mühendislik ile topraktan buluta tam entegre çözümler.</p>
          <div className="flex justify-center">
            <button className="bg-white text-green-900 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-3">
              Yolculuğa Başlayın <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* 1. Bölüm: NEDEN? */}
      <Section id="neden" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200" className="relative rounded-[2rem] shadow-2xl z-10 border border-slate-100" alt="Mühendislik" />
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl z-20 border border-green-500/30 max-w-xs text-sm italic">"Gerçek kazanç, tarlaya ne kadar çok attığınızla değil, bitkinin ne kadarını alabildiğiyle ilgilidir."</div>
          </div>
          <div className="lg:pl-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"><Target size={14} /> Amacı Keşfedin</div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Tarımsal Kârlılığınızı <br/><span className="text-green-600">Hassas Ölçümle Koruyun.</span></h2>
            <div className="space-y-6 text-slate-600 text-lg">
              <p>Biz, tarımın sadece bir gelenek değil, <strong>hassas bir mühendislik işi</strong> olduğuna inanıyoruz. Kaynaklarınızı israf etme lüksünüz yok.</p>
              <p>Amacımız, üretim maliyetlerinizi düşürürken toprağınızın potansiyelini maksimuma çıkarmaktır.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Bölüm: NASIL? (Röntgen & Toprak Altı Görsel) */}
      <Section id="nasil" className="bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"><Layers size={14} /> Süreç ve Farklılaşma</div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Toprağın Altını <br/><span className="text-blue-600">Dijital Röntgenle İzleyin.</span></h2>
            <div className="space-y-6 text-slate-700 text-lg mb-10">
              <p>Patentli dikey analiz teknolojimizle, suyun kök bölgesinde kalıp kalmadığını veya gübrenin köklerin altına inip kaybolup kaybolmadığını <strong>(Yıkanma / Leaching)</strong> anında tespit ediyoruz.</p>
              <p>Böylece bitkinin anlık <strong>alım kapasitesini</strong> görerek verimliliği %30 artırıyoruz.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-6 bg-white rounded-3xl border border-slate-200 flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><CheckCircle2 size={24} /></div>
                  <div className="text-sm font-bold text-slate-800 uppercase">Kök Bölgesi <br/>Hassas Analizi</div>
               </div>
               <div className="p-6 bg-white rounded-3xl border border-slate-200 flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Waves size={24} /></div>
                  <div className="text-sm font-bold text-slate-800 uppercase">Kapiler Su <br/>Hareketi Takibi</div>
               </div>
            </div>
          </div>

          {/* TOPRAK İÇİ RÖNTGEN GÖRSELİ */}
          <div className="order-1 lg:order-2 relative group perspective-1000">
            <div className="relative w-full max-w-[550px] aspect-[16/11] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center brightness-50"></div>
              
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-[85%] h-[90%] bg-[#0c1b3d]/90 backdrop-blur-md rounded-[2rem] border border-white/20 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(12,27,61,0.8)]">
                  
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase">SmartMoles Dijital Röntgen</span>
                    <CheckCircle2 size={14} className="text-green-500" />
                  </div>

                  <div className="flex-1 flex relative">
                    <div className="w-12 h-full flex flex-col justify-between py-6 px-2 border-r border-white/5 text-[8px] font-bold text-white/30 uppercase">
                       <span>5 cm</span>
                       <span className="text-blue-400">10 cm</span>
                       <span>15 cm</span>
                       <span className="text-blue-400">20 cm</span>
                       <span>25 cm</span>
                       <span className="text-red-400">30 cm</span>
                    </div>

                    <div className="flex-grow relative bg-[#0c2452]/50">
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                      
                      <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 p-2">
                        {Array.from({ length: 60 }).map((_, i) => (
                          <div key={i} className="flex items-center justify-center opacity-30">
                            <div className={`w-3 h-[1px] bg-blue-300 origin-left ${Math.random() > 0.5 ? 'rotate-[-45deg]' : 'rotate-0'}`}></div>
                          </div>
                        ))}
                      </div>

                      <div className="absolute inset-x-0 h-[30%] bg-green-500/10 border-y border-green-500/20 top-[35%] flex items-center justify-center">
                        <span className="text-[7px] font-black text-green-400 uppercase tracking-widest animate-pulse">Optimum Kök Bölgesi</span>
                      </div>
                    </div>

                    <div className="w-24 bg-black/40 p-2 flex flex-col gap-1.5 border-l border-white/5">
                      {['2-12 cm', '12-19 cm', '19-26 cm', '26-33 cm'].map((range) => (
                        <div key={range} className={`p-3 rounded-lg text-[8px] font-black text-center cursor-pointer transition-all ${activeDepthRange === range ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-white/30'}`} onClick={() => setActiveDepthRange(range)}>
                          {range}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-10 flex border-t border-white/10 text-[8px] font-black text-center uppercase">
                    <div className="flex-1 flex items-center justify-center bg-[#a3c9e6] text-[#0c1b3d]">Zayıf</div>
                    <div className="flex-1 flex items-center justify-center bg-[#649cc7] text-[#0c1b3d]">Az</div>
                    <div className="flex-1 flex items-center justify-center bg-[#2b6ba3] text-white">Orta</div>
                    <div className="flex-1 flex items-center justify-center bg-[#153e6e] text-white border-b-2 border-green-400">İyi</div>
                    <div className="flex-1 flex items-center justify-center bg-[#0a2342] text-white">Sınır</div>
                  </div>
                </div>
              </div>

              <img 
                src="https://smartmoles.com/assets/images/product/smartmoles-com-smartmoles-sensor-urun-gorseli-01.webp" 
                className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none mix-blend-screen"
                alt="Sensör Silüet"
              />
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30">
               <TrendingUp className="text-green-600" size={20} />
               <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">Verimlilik Artışı: +%30</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Bölüm: Ürünler */}
      <Section id="ne">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"><Zap size={14} /> Ürün Ekosistemi</div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Geleceğin Çiftliği <span className="text-green-600">Burada Başlıyor.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <a key={p.title} href={p.url} target="_blank" className="bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group p-8 flex flex-col hover:-translate-y-1">
              <div className="h-40 flex items-center justify-center mb-6"><img src={p.img} alt={p.title} className="max-h-full group-hover:scale-110 transition-transform" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">{p.desc}</p>
              <div className="mt-auto text-[10px] font-black text-slate-400 group-hover:text-slate-900 flex items-center gap-2 uppercase">Detayları Gör <ArrowRight size={14} /></div>
            </a>
          ))}
        </div>
        <div className="mt-20 bg-green-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 relative z-10 leading-tight">Verimi tarlada, kazancı cebinizde hissedin.</h2>
          <div className="flex justify-center relative z-10">
            <a href="https://smartmoles.com/iletisim" target="_blank" className="bg-white text-green-900 px-12 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all">İletişime Geçin</a>
          </div>
        </div>
      </Section>

      {/* AI Asistan */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-[100] transform transition-transform duration-700 ease-out border-l border-slate-100 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600 text-white rounded-2xl"><Cpu size={24} /></div>
              <div><h3 className="font-bold text-slate-900">SmartMoles AI</h3><p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Teknik Danışman</p></div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all"><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            {!aiResponse && !isLoading ? (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-slate-200 mb-6" />
                <h4 className="font-bold text-slate-800">Hangi konuda bilgi istersiniz?</h4>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center py-24"><Loader2 size={48} className="animate-spin text-green-600 mb-6" /></div>
            ) : aiResponse && (
              <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 text-sm">{aiResponse.text}</div>
            )}
          </div>
          <div className="p-8 border-t">
            <form onSubmit={handleAiQuery} className="relative">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Soru sorun..." className="w-full bg-slate-100 rounded-2xl px-6 py-4 text-sm outline-none focus:border-green-500 border-2 border-transparent transition-all" />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-3 rounded-xl shadow-lg"><ArrowRight size={20} /></button>
            </form>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-green-600 text-white rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <MessageSquare size={32} />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <img src="https://smartmoles.com/assets/logo/smartmoles-logo.png" alt="Logo" className="h-8 mb-6 brightness-0 invert mx-auto md:mx-0" />
            <p className="text-xs">Sürdürülebilir tarım tarlada başlar.</p>
          </div>
          <div><h4 className="text-white font-bold text-xs uppercase mb-6">Hızlı Linkler</h4><ul className="space-y-3 text-xs"><li><a href="https://smartmoles.com/urunlerimiz/smartmoles-sensoru" className="hover:text-green-500">SmartMoles Sensörü</a></li><li><a href="https://smartmoles.com/urunlerimiz/airmoles" className="hover:text-green-500">AirMoles İstasyonu</a></li></ul></div>
          <div><h4 className="text-white font-bold text-xs uppercase mb-6">Kurumsal</h4><ul className="space-y-3 text-xs"><li><a href="https://smartmoles.com/kurumsal/hakkimizda" target="_blank" className="hover:text-green-500">Hakkımızda</a></li><li><a href="https://smartmoles.com/iletisim" target="_blank" className="hover:text-green-500">İletişim</a></li></ul></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
