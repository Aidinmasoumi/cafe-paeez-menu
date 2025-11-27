"use client";
import React, { useState, useEffect } from "react";
import { Info, Plus, X, MapPin, Instagram, Phone, Wifi, Search, ImageOff, Flame, Copy, Check, Navigation, Clock } from "lucide-react";


const DATA = [
  // --- بار گرم (قهوه اسپرسو) ---
  { id: 101, title: "اسپرسو تک", en: "Single Espresso", price: "۷۳,۰۰۰", cat: "warm", desc: "۱۰۰٪ عربیکا", img: "/menu/101.jpg" },
  { id: 102, title: "اسپرسو دبل", en: "Double Espresso", price: "۸۵,۰۰۰", cat: "warm", desc: "۱۰۰٪ عربیکا - غلظت بالا", img: "/menu/102.jpg", badge: "پرفروش 🔥" },
  { id: 103, title: "آمریکانو", en: "Americano", price: "۹۱,۰۰۰", cat: "warm", desc: "اسپرسو + آب داغ", img: "/menu/103.jpg" },
  { id: 104, title: "لاته", en: "Latte", price: "۱۱۲,۰۰۰", cat: "warm", desc: "اسپرسو + شیر فوم گرفته شده", img: "/menu/104.jpg", badge: "محبوب ❤️" },
  { id: 105, title: "کاپوچینو", en: "Cappuccino", price: "۸۹,۰۰۰", cat: "warm", desc: "کف شیر غلیظ + اسپرسو", img: "/menu/105.jpg" },
  { id: 106, title: "موکا", en: "Mocha", price: "۱۲۹,۰۰۰", cat: "warm", desc: "اسپرسو + شیر + شکلات", img: "/menu/106.jpg" },
  { id: 107, title: "کارامل ماکیاتو", en: "Caramel Macchiato", price: "۱۱۷,۰۰۰", cat: "warm", desc: "شیر + کارامل + اسپرسو", img: "/menu/107.jpg" },
  { id: 108, title: "آفوگاتو", en: "Affogato", price: "۱۱۳,۰۰۰", cat: "warm", desc: "اسپرسو + بستنی وانیل", img: "/menu/108.jpg" },

  // --- بار گرم (چای و دمنوش) ---
  { id: 120, title: "هات چاکلت", en: "Hot Chocolate", price: "۱۲۹,۰۰۰", cat: "warm", desc: "شکلات داغ غلیظ", img: "/menu/120.jpg" },
  { id: 121, title: "چای ماسالا", en: "Masala Chai", price: "۹۶,۰۰۰", cat: "warm", desc: "چای ادویه‌دار هندی", img: "/menu/121.jpg" },
  { id: 122, title: "چای سیاه", en: "Black Tea", price: "۵۶,۰۰۰", cat: "warm", desc: "چای سیاه دمی (لیوانی)", img: "/menu/122.jpg" },
  { id: 123, title: "دمنوش مخصوص پاییز", en: "Special Herbal Tea", price: "۶۳,۰۰۰", cat: "warm", desc: "ترکیب آرام‌بخش ویژه", img: "/menu/123.jpg" },
  { id: 124, title: "وایت چاکلت", en: "White Chocolate", price: "۱۱۹,۰۰۰", cat: "warm", desc: "شکلات سفید گرم", img: "/menu/124.jpg" },

  // --- بار سرد ---
  { id: 201, title: "آیس آمریکانو", en: "Iced Americano", price: "۹۶,۰۰۰", cat: "cold", desc: "اسپرسو + آب سرد + یخ", img: "/menu/201.jpg" },
  { id: 202, title: "آیس لاته", en: "Iced Latte", price: "۱۱۹,۰۰۰", cat: "cold", desc: "اسپرسو + شیر سرد + یخ", img: "/menu/202.jpg" },
  { id: 221, title: "موهیتو", en: "Mojito", price: "۱۳۹,۰۰۰", cat: "cold", desc: "نعنا + لیمو + سودا", img: "/menu/221.jpg", badge: "خنک ❄️" },
  { id: 224, title: "معجون مخصوص", en: "Special Majoon", price: "۲۱۰,۰۰۰", cat: "cold", desc: "انبه + خرما + انجیر + اسپرسو", img: "/menu/224.jpg", badge: "انرژی‌زا 💪" },

  // --- غذا ---
  { id: 301, title: "پاستا چیکن آلفردو", en: "Chicken Alfredo", price: "۳۰۲,۰۰۰", cat: "food", desc: "۱۵۰ گرم فیله مرغ + پنه + سس آلفردو", img: "/menu/301.jpg", badge: "پیشنهاد سرآشپز 👨‍🍳" },
  { id: 302, title: "مک اند چیز", en: "Mac & Cheese", price: "۲۰۱,۰۰۰", cat: "food", desc: "۱۵۰ گرم مرغ + سس مخصوص + پنیر پیتزا", img: "/menu/302.jpg" },
  { id: 303, title: "سالاد سزار", en: "Caesar Salad", price: "۲۴۶,۰۰۰", cat: "food", desc: "کاهو + مرغ گریل + نان سیر + پارمزان", img: "/menu/303.jpg" },
  { id: 304, title: "اسنک پاییز", en: "Paeez Snack", price: "۱۳۴,۰۰۰", cat: "food", desc: "ژامبون مرغ و گوشت + قارچ و پنیر", img: "/menu/304.jpg" },
  { id: 305, title: "بشقاب سوخاری", en: "Fried Plate", price: "۲۹۰,۰۰۰", cat: "food", desc: "سه تیکه فیله + سیب‌زمینی", img: "/menu/305.jpg" },
  { id: 306, title: "سیب‌زمینی با سس آلفردو", en: "Fries with Alfredo", price: "۲۲۳,۰۰۰", cat: "food", desc: "سیب زمینی سرخ کرده + سس قارچ و خامه", img: "/menu/306.jpg" },

  // --- صبحانه ---
  { id: 401, title: "املت گوجه", en: "Classic Omelette", price: "۱۰۳,۰۰۰", cat: "breakfast", desc: "تخم مرغ + گوجه فرنگی تازه", img: "/menu/401.jpg" },
  { id: 402, title: "املت مخصوص", en: "Special Omelette", price: "۲۰۱,۰۰۰", cat: "breakfast", desc: "تخم مرغ + قارچ + پنیر + مخلفات", img: "/menu/402.jpg" },
  { id: 403, title: "صبحانه ایرانی (۲ نفره)", en: "Persian Breakfast", price: "۲۹۳,۰۰۰", cat: "breakfast", desc: "نان، پنیر، گردو، خیار، گوجه، چای شیرین", img: "/menu/403.jpg" },
  { id: 404, title: "صبحانه انگلیسی (۲ نفره)", en: "English Breakfast", price: "۳۲۹,۰۰۰", cat: "breakfast", desc: "لوبیا، سوسیس، تخم مرغ، قارچ، بیکن", img: "/menu/404.jpg", badge: "ویژه 🔥" },
  { id: 405, title: "پنکیک نوتلا", en: "Nutella Pancake", price: "۲۴۳,۰۰۰", cat: "breakfast", desc: "تاپینگ نوتلا و میوه فصل", img: "/menu/405.jpg" },
  { id: 406, title: "وافل نوتلا", en: "Nutella Waffle", price: "۲۳۶,۰۰۰", cat: "breakfast", desc: "وافل ترد + نوتلا + میوه", img: "/menu/406.jpg", badge: "جدید 🆕" },

  // --- قلیان ---
  { 
    id: 501, 
    title: "سرویس قلیان (۲ نفره)", 
    en: "Hookah Service", 
    price: "۱۸۰,۰۰۰", 
    cat: "hookah", 
    desc: "همراه با سرویس چای. طعم‌ها: شب‌های مسکو، بلوبری نعنا، لاو، یخ شراب، پرتقال نعنا، آدامس، لیمو نعنا، هلو، دوسیب آلبالو...", 
    img: "/menu/501.jpg",
    badge: "محبوب 💨"
  },
];

const CATEGORIES = [
  { id: "warm", label: "بار گرم" },
  { id: "cold", label: "بار سرد" },
  { id: "food", label: "غذا و عصرانه" },
  { id: "breakfast", label: "صبحانه" },
  { id: "hookah", label: "قلیان" },
];

export default function Page() {
  const [filter, setFilter] = useState("warm");
  const [search, setSearch] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 8 && hour < 24) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  const copyWifi = () => {
    navigator.clipboard.writeText("PaeezGuest");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredData = DATA.filter(item => {
    if (search.length > 0) {
      return item.title.includes(search) || item.en.toLowerCase().includes(search.toLowerCase());
    }
    return item.cat === filter;
  });

  return (
    <div className="min-h-screen pb-24 bg-dark font-sans relative select-none">
      
      {/* --- هدر --- */}
      <header className="sticky top-0 z-40 bg-dark/95 backdrop-blur border-b border-white/5 px-5 h-16 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-gold tracking-wide font-serif">CAFE PAEEZ</h1>
          <div className="flex items-center gap-1 mt-0.5">
             <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
             <p className="text-[9px] text-gray-400 tracking-wide uppercase">
               {isOpen ? "Open Now" : "Closed"}
             </p>
          </div>
        </div>
        <button onClick={() => setShowInfo(true)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/5 active:scale-95 transition-transform hover:bg-gold hover:text-dark">
          <Info size={20} />
        </button>
      </header>

      {/* --- باکس جستجو --- */}
      <div className="px-5 mt-4">
        <div className="relative group">
            <input 
                type="text" 
                placeholder="جستجو (مثلا: پاستا)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1E1E1E] text-white text-sm rounded-2xl py-3 pr-10 pl-4 border border-white/5 focus:border-gold/50 focus:outline-none transition-all placeholder:text-gray-600 group-focus-within:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
            />
            <Search className="absolute right-3 top-3 text-gray-500 group-focus-within:text-gold transition-colors" size={18} />
            {search && (
                <button onClick={() => setSearch("")} className="absolute left-3 top-3 text-gray-500 hover:text-white">
                    <X size={18} />
                </button>
            )}
        </div>
      </div>

      {/* --- تب‌های دسته‌بندی --- */}
      {!search && (
        <div className="sticky top-16 z-30 bg-dark/98 py-4 border-b border-white/5 shadow-md mt-2">
            <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
                <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                    filter === cat.id ? "bg-gold text-dark border-gold scale-105 shadow-md" : "bg-[#1A1A1A] text-gray-400 border-transparent"
                }`}
                >
                {cat.label}
                </button>
            ))}
            </div>
        </div>
      )}

      {/* --- لیست کارت‌ها --- */}
      <main className="px-5 mt-6 space-y-5 min-h-[50vh]">
        {filteredData.length > 0 ? (
            filteredData.map((item) => (
            <div key={item.id} className="group bg-[#1E1E1E] p-3 rounded-3xl flex items-center gap-4 border border-white/5 shadow-lg animate-in slide-in-from-bottom-4 duration-500 hover:border-gold/20 transition-colors">
                
                <div className="w-28 h-28 bg-gray-800 rounded-2xl overflow-hidden shrink-0 relative shadow-inner flex items-center justify-center">
                    <img 
                        src={item.img} 
                        alt={item.title}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('show-fallback');
                        }}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 z-10 relative" 
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 z-0">
                        <ImageOff size={24} className="mb-1 opacity-50" />
                    </div>
                    {item.badge && (
                        <div className="absolute top-0 right-0 bg-gold text-dark text-[9px] font-bold px-2 py-1 rounded-bl-xl rounded-tr-xl z-20 shadow-md flex items-center gap-1">
                           {item.badge.includes("پرفروش") && <Flame size={10} />}
                           {item.badge}
                        </div>
                    )}
                </div>
                
                <div className="flex-1 h-28 flex flex-col justify-between py-1">
                <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                    <p className="text-[10px] text-gold uppercase mt-1 font-light">{item.en}</p>
                    <p className="text-[11px] text-gray-500 mt-2 line-clamp-2">{item.desc}</p>
                </div>
                <div className="flex justify-between items-end">
                    <span className="text-gold font-bold text-lg">{item.price} <span className="text-[10px] text-gray-500">تومان</span></span>
                    <button className="w-9 h-9 bg-[#2A2A2A] text-gold rounded-xl flex items-center justify-center active:scale-90 transition-transform hover:bg-gold hover:text-dark"><Plus size={18} /></button>
                </div>
                </div>
            </div>
            ))
        ) : (
            <div className="text-center text-gray-500 mt-10">
                <Search size={40} className="mx-auto mb-2 opacity-50" />
                <p>موردی پیدا نشد :(</p>
            </div>
        )}
      </main>

      {/* --- فوتر (فقط مالیات) --- */}
      <div className="text-center mt-10 mb-6 px-10">
        <p className="text-[10px] text-gray-600 leading-relaxed">
            به تمامی قیمت‌ها ۱۰٪ مالیات بر ارزش افزوده اضافه می‌شود.
        </p>
      </div>

      {/* --- مودال اطلاعات --- */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowInfo(false)}></div>
          
          <div className="bg-[#181818] w-full max-w-[430px] rounded-[2.5rem] p-6 relative z-10 border border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-300">
            
            <button onClick={() => setShowInfo(false)} className="absolute top-5 left-5 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white"><X size={20} /></button>
            
            {/* عنوان */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gold font-serif">CAFE PAEEZ</h2>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] mt-2 font-bold ${isOpen ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {isOpen ? (
                        <><Clock size={10} /> همین الان باز است</>
                    ) : (
                        <><Clock size={10} /> بسته است (ساعت کاری ۸ تا ۲۴)</>
                    )}
                </div>
            </div>

            <div className="space-y-3">
               
               {/* مسیریابی (نشان و گوگل) */}
               <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gold/10 text-gold rounded-full flex items-center justify-center"><MapPin size={16}/></div>
                      <p className="text-sm text-white">رفسنجان، خیابان فرشته</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                      <a href="https://neshan.org/maps/route?dest_lat=35.6892&dest_lng=51.3890" target="_blank" className="flex items-center justify-center gap-2 bg-[#0054BE]/10 text-[#0054BE] py-2.5 rounded-xl text-xs font-bold hover:bg-[#0054BE]/20 transition-colors">
                          <Navigation size={14} /> مسیریابی نشان
                      </a>
                      <a href="https://www.google.com/maps/dir/?api=1&destination=35.6892,51.3890" target="_blank" className="flex items-center justify-center gap-2 bg-[#34A853]/10 text-[#34A853] py-2.5 rounded-xl text-xs font-bold hover:bg-[#34A853]/20 transition-colors">
                          <MapPin size={14} /> مسیریابی گوگل
                      </a>
                  </div>
               </div>

               {/* تلفن */}
               <a href="tel:02112345678" className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors"><Phone size={20}/></div>
                    <div>
                        <p className="text-xs text-gray-400">تلفن رزرو</p>
                        <p className="text-sm text-white font-bold">034-12345678</p>
                    </div>
                  </div>
                  <Plus size={16} className="text-gray-600 group-hover:text-white rotate-45 transition-colors"/>
               </a>

               {/* اینستاگرام */}
               <a href="https://instagram.com" target="_blank" className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors"><Instagram size={20}/></div>
                    <div>
                        <p className="text-xs text-gray-400">دنبال کنید</p>
                        <p className="text-sm text-white font-bold">_cafe_paeez_@</p>
                    </div>
                  </div>
                  <Plus size={16} className="text-gray-600 group-hover:text-white rotate-45 transition-colors"/>
               </a>

               {/* وای‌فای (کپی هوشمند) */}
               <button onClick={copyWifi} className="w-full flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-blue-500/10 text-blue-500'}`}>
                        {copied ? <Check size={20}/> : <Wifi size={20}/>}
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">رمز وای‌فای</p>
                        <p className="text-sm text-white font-bold font-mono tracking-wider">{copied ? "کپی شد!" : "PaeezGuest"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-lg">
                      <Copy size={12} />
                      کپی
                  </div>
               </button>

            </div>
            
            <p className="text-center text-[10px] text-gray-600 mt-6">Design by Aidin Masoumi ❤️</p>
          </div>
        </div>
      )}
    </div>
  );
}