"use client";
import React, { useState, useEffect } from "react";
import { Info, Plus, X, MapPin, Instagram, Phone, Wifi, Search, ImageOff, Flame, Copy, Check, Navigation, Clock, Coffee, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

// --- دیتای کامل و دقیق (بدون حذفیات) ---
const DATA = [
  // ==================== گرم کافئین دار ====================
  { id: 101, title: "اسپرسو تک", en: "Single Espresso", price: "۷۳,۰۰۰", cat: "warm_caffeine", desc: "۱۰۰٪ عربیکا", img: "/menu/101.jpg" },
  { id: 102, title: "اسپرسو دبل", en: "Double Espresso", price: "۸۵,۰۰۰", cat: "warm_caffeine", desc: "۱۰۰٪ عربیکا (غلظت بالا)", img: "/menu/102.jpg", badge: "پرفروش 🔥" },
  { id: 103, title: "آمریکانو", en: "Americano", price: "۸۷,۰۰۰", cat: "warm_caffeine", desc: "اسپرسو دبل + آب داغ", img: "/menu/103.jpg" },
  { id: 104, title: "آفوگاتو", en: "Affogato", price: "۱۰۶,۰۰۰", cat: "warm_caffeine", desc: "اسپرسو + بستنی وانیل", img: "/menu/104.jpg" },
  { id: 105, title: "لاته", en: "Latte", price: "۹۱,۰۰۰", cat: "warm_caffeine", desc: "اسپرسو + شیر فوم گرفته شده", img: "/menu/105.jpg" },
  { id: 106, title: "کاپوچینو", en: "Cappuccino", price: "۱۱۳,۰۰۰", cat: "warm_caffeine", desc: "کف شیر غلیظ + اسپرسو", img: "/menu/106.jpg" },
  { id: 107, title: "کاپوچینو با پودر", en: "Cappuccino with Powder", price: "۱۱۲,۰۰۰", cat: "warm_caffeine", desc: "همراه با پودر شکلات/دارچین", img: "/menu/107.jpg" },
  { id: 108, title: "موکا", en: "Mocha", price: "۸۹,۰۰۰", cat: "warm_caffeine", desc: "اسپرسو + شیر + سس شکلات", img: "/menu/108.jpg" },
  { id: 109, title: "فدرال", en: "Federal", price: "۱۰۰,۰۰۰", cat: "warm_caffeine", desc: "ترکیب ویژه اسپرسو", img: "/menu/109.jpg" },

  // ==================== بروئینگ بار (قهوه دمی) ====================
  { id: 150, title: "بلک کافی (فرانسه)", en: "French Press", price: "۹۱,۰۰۰", cat: "brewing", desc: "قهوه دمی فرانسه", img: "/menu/150.jpg" },
  { id: 151, title: "وی ۶۰", en: "V60", price: "۱۴۸,۰۰۰", cat: "brewing", desc: "قهوه دمی نسل سوم (متد V60)", img: "/menu/151.jpg" },
  { id: 152, title: "کمکس", en: "Chemex", price: "۱۴۸,۰۰۰", cat: "brewing", desc: "قهوه دمی شفاف و سبک", img: "/menu/152.jpg" },
  { id: 153, title: "ایروپرس", en: "Aeropress", price: "۱۴۸,۰۰۰", cat: "brewing", desc: "قهوه دمی با فشار هوا", img: "/menu/153.jpg" },
  { id: 154, title: "سایفون", en: "Syphon", price: "۱۵۰,۰۰۰", cat: "brewing", desc: "قهوه دمی خلاء (Vacuum Pot)", img: "/menu/154.jpg", badge: "خاص ✨" },
  { id: 155, title: "ترک", en: "Turkish Coffee", price: "۹۰,۰۰۰", cat: "brewing", desc: "قهوه سنتی ترک", img: "/menu/155.jpg" },

  // ==================== گرم بدون کافئین ====================
  { id: 120, title: "هات چاکلت", en: "Hot Chocolate", price: "۱۲۹,۰۰۰", cat: "warm_nocaf", desc: "شکلات داغ غلیظ", img: "/menu/120.jpg" },
  { id: 121, title: "چای ماسالا", en: "Masala Chai", price: "۹۶,۰۰۰", cat: "warm_nocaf", desc: "چای ادویه‌دار هندی", img: "/menu/121.jpg" },
  { id: 122, title: "چای کرک", en: "Karak Tea", price: "۱۰۱,۰۰۰", cat: "warm_nocaf", desc: "چای شیر غلیظ و هل", img: "/menu/122.jpg" },
  { id: 123, title: "چای لاته", en: "Tea Latte", price: "۸۷,۰۰۰", cat: "warm_nocaf", desc: "چای دم‌کشیده + شیر فوم دار", img: "/menu/123.jpg" },
  { id: 124, title: "چای ساده", en: "Black Tea", price: "۵۶,۰۰۰", cat: "warm_nocaf", desc: "چای سیاه دمی", img: "/menu/124.jpg" },
  { id: 125, title: "چای طعم دار", en: "Flavored Tea", price: "۵۹,۰۰۰", cat: "warm_nocaf", desc: "چای با طعم انتخابی (هل/دارچین...)", img: "/menu/125.jpg" },
  { id: 126, title: "دمنوش محبوب", en: "Popular Herbal Tea", price: "۵۴,۰۰۰", cat: "warm_nocaf", desc: "آرام‌بخش", img: "/menu/126.jpg" },
  { id: 127, title: "دمنوش مخصوص پائیز", en: "Paeez Special Tea", price: "۶۳,۰۰۰", cat: "warm_nocaf", desc: "ترکیب ویژه و امضا کافه", img: "/menu/127.jpg", badge: "پیشنهاد ما 🍂" },
  { id: 128, title: "سیگنیچر (به انتخاب شما)", en: "Signature Tea", price: "۶۰,۰۰۰", cat: "warm_nocaf", desc: "ترکیب گیاهی دلخواه شما", img: "/menu/128.jpg" },

  // ==================== سرد کافئین دار ====================
  { id: 201, title: "آیس آمریکانو", en: "Iced Americano", price: "۷۳,۰۰۰", cat: "cold_caffeine", desc: "اسپرسو + آب سرد + یخ", img: "/menu/201.jpg" },
  { id: 202, title: "آیس لاته", en: "Iced Latte", price: "۸۵,۰۰۰", cat: "cold_caffeine", desc: "اسپرسو + شیر سرد + یخ", img: "/menu/202.jpg" },
  { id: 203, title: "فراپه نوستالژی", en: "Frappe", price: "۸۷,۰۰۰", cat: "cold_caffeine", desc: "بستنی + موز + نسکافه", img: "/menu/203.jpg" },
  { id: 204, title: "کارامل کافی", en: "Caramel Coffee", price: "۱۰۶,۰۰۰", cat: "cold_caffeine", desc: "اسپرسو + کارامل + آب پرتقال", img: "/menu/204.jpg" },
  { id: 205, title: "آیس رومانو", en: "Iced Romano", price: "۹۱,۰۰۰", cat: "cold_caffeine", desc: "اسپرسو + لیمو", img: "/menu/205.jpg" },
  { id: 206, title: "شات اضافه سیروپ", en: "Extra Syrup Shot", price: "۲۵,۰۰۰", cat: "cold_caffeine", desc: "افزودن طعم دهنده به نوشیدنی", img: "/menu/206.jpg" },

  // ==================== شیک (Shake) ====================
  { id: 250, title: "نات چاکلت", en: "Nut Chocolate Shake", price: "۱۷۱,۰۰۰", cat: "shake", desc: "بستنی + شکلات تکه‌ای + نانی", img: "/menu/250.jpg", badge: "بمب 💣" },
  { id: 251, title: "بلک مجیک", en: "Black Magic", price: "۱۴۵,۰۰۰", cat: "shake", desc: "بستنی + کربن فعال + اورئو", img: "/menu/251.jpg" },
  { id: 252, title: "مخصوص پاییز", en: "Paeez Special Shake", price: "۱۴۴,۰۰۰", cat: "shake", desc: "بستنی + پسته + انجیر", img: "/menu/252.jpg" },
  { id: 253, title: "پنیر ریحان", en: "Basil Cheese Shake", price: "۱۱۰,۰۰۰", cat: "shake", desc: "بستنی + پنیر + ریحان (طعم خاص)", img: "/menu/253.jpg", badge: "ریسک‌پذیر 🧀" },

  // ==================== ماکتل و شربت سرا ====================
  { id: 221, title: "موهیتو", en: "Mojito", price: "۱۳۹,۰۰۰", cat: "mocktail", desc: "نعنا + لیمو + سودا", img: "/menu/221.jpg" },
  { id: 222, title: "لیموناد", en: "Lemonade", price: "۱۰۱,۰۰۰", cat: "mocktail", desc: "لیمو تازه + سیروپ", img: "/menu/222.jpg" },
  { id: 223, title: "رویش", en: "Rooyesh", price: "۱۳۰,۰۰۰", cat: "mocktail", desc: "سیب سبز + دارچین + آب آناناس", img: "/menu/223.jpg" },
  { id: 224, title: "یارا", en: "Yara", price: "۱۰۴,۰۰۰", cat: "mocktail", desc: "توتی فروتی + کرن بری + بهارنارنج", img: "/menu/224.jpg" },
  { id: 225, title: "بی‌پروا", en: "Bi Parva", price: "۹۲,۰۰۰", cat: "mocktail", desc: "بلوکاراسائو + سیب سبز + بهارنارنج", img: "/menu/225.jpg" },
  { id: 226, title: "سیگنیچر (بر اساس ذائقه)", en: "Signature Mocktail", price: "۱۵۰,۰۰۰", cat: "mocktail", desc: "طعم سازی اختصاصی باریستا", img: "/menu/226.jpg" },
  { id: 230, title: "بهار سرخ", en: "Bahar Sorkh", price: "۱۰۰,۰۰۰", cat: "mocktail", desc: "شربت سنتی", img: "/menu/230.jpg" },
  { id: 231, title: "خواب شیرین", en: "Sweet Dream", price: "۱۱۵,۰۰۰", cat: "mocktail", desc: "شربت آرام‌بخش", img: "/menu/231.jpg" },
  { id: 232, title: "غروب گل سرخ", en: "Sunset Rose", price: "۱۱۲,۰۰۰", cat: "mocktail", desc: "شربت گل سرخ", img: "/menu/232.jpg" },

  // ==================== آبمیوه و معجون ====================
  { id: 240, title: "آبمیوه روز", en: "Daily Juice", price: "۱۰۰,۰۰۰", cat: "juice", desc: "طبیعی و تازه", img: "/menu/240.jpg" },
  { id: 241, title: "معجون مخصوص", en: "Special Majoon", price: "۲۱۰,۰۰۰", cat: "juice", desc: "انبه + خرما + انجیر + اسپرسو", img: "/menu/241.jpg", badge: "انرژی خالص 💪" },
  { id: 242, title: "معجون میوه‌ای", en: "Fruit Majoon", price: "۲۳۴,۰۰۰", cat: "juice", desc: "انبه + موز + آناناس", img: "/menu/242.jpg" },

  // ==================== غذا و عصرانه ====================
  { id: 301, title: "چیکن آلفردو", en: "Chicken Alfredo", price: "۳۰۲,۰۰۰", cat: "food", desc: "۱۵۰ گرم فیله مرغ + پنه + سس آلفردو", img: "/menu/301.jpg" },
  { id: 302, title: "مک اند چیز", en: "Mac & Cheese", price: "۲۰۱,۰۰۰", cat: "food", desc: "۱۵۰ گرم مرغ + سس مخصوص + پنیر پیتزا", img: "/menu/302.jpg" },
  { id: 303, title: "سالاد سزار", en: "Caesar Salad", price: "۲۴۶,۰۰۰", cat: "food", desc: "کاهو + مرغ گریل + نان سیر + پارمزان", img: "/menu/303.jpg" },
  { id: 304, title: "اسنک پاییز", en: "Paeez Snack", price: "۱۳۴,۰۰۰", cat: "food", desc: "ژامبون مرغ و گوشت + قارچ و پنیر", img: "/menu/304.jpg" },
  { id: 305, title: "هات آلفردو", en: "Hot Alfredo", price: "۲۰۱,۰۰۰", cat: "food", desc: "هات داگ + پنیر + قارچ", img: "/menu/305.jpg" },
  { id: 306, title: "بشقاب سوخاری", en: "Fried Plate", price: "۲۹۰,۰۰۰", cat: "food", desc: "سه تیکه فیله + سیب‌زمینی", img: "/menu/306.jpg" },
  { id: 307, title: "استیک مرغ", en: "Chicken Steak", price: "۱۸۹,۰۰۰", cat: "food", desc: "سینه مرغ + سبزیجات آبپز", img: "/menu/307.jpg" },
  { id: 308, title: "چیپس پنیر", en: "Cheese Chips", price: "۲۶۶,۰۰۰", cat: "food", desc: "چیپس + پنیر فراوان", img: "/menu/308.jpg" },
  { id: 309, title: "جوجه پاییز", en: "Paeez Chicken", price: "۲۰۳,۰۰۰", cat: "food", desc: "فیله + قارچ + سس مخصوص", img: "/menu/309.jpg" },
  { id: 310, title: "سیب ساده تک نفره", en: "Fries (Single)", price: "۹۰,۰۰۰", cat: "food", desc: "۲۵۰ گرم سیب‌زمینی", img: "/menu/310.jpg" },
  { id: 311, title: "سیب ساده دونفره", en: "Fries (Double)", price: "۱۸۱,۰۰۰", cat: "food", desc: "۷۰۰ گرم سیب‌زمینی", img: "/menu/311.jpg" },
  { id: 312, title: "سیب ویژه", en: "Special Fries", price: "۲۲۰,۰۰۰", cat: "food", desc: "پنیر + ژامبون مرغ و گوشت + سس مخصوص", img: "/menu/312.jpg" },
  { id: 313, title: "سیب با سس آلفردو", en: "Alfredo Fries", price: "۲۲۳,۰۰۰", cat: "food", desc: "سیب‌زمینی با سس قارچ و خامه", img: "/menu/313.jpg" },

  // ==================== صبحانه ====================
  { id: 401, title: "املت", en: "Omelette", price: "۱۰۳,۰۰۰", cat: "breakfast", desc: "تخم مرغ + گوجه", img: "/menu/401.jpg" },
  { id: 402, title: "املت مخصوص", en: "Special Omelette", price: "۲۰۱,۰۰۰", cat: "breakfast", desc: "تخم مرغ + قارچ + پنیر + مخلفات", img: "/menu/402.jpg" },
  { id: 403, title: "صبحانه ایرانی (۲ نفره)", en: "Persian Breakfast", price: "۲۹۳,۰۰۰", cat: "breakfast", desc: "نان، پنیر، گردو، خیار، گوجه", img: "/menu/403.jpg" },
  { id: 404, title: "صبحانه انگلیسی (۲ نفره)", en: "English Breakfast", price: "۳۲۹,۰۰۰", cat: "breakfast", desc: "لوبیا، سوسیس، تخم مرغ، قارچ، بیکن", img: "/menu/404.jpg", badge: "ویژه 🔥" },
  { id: 405, title: "پنکیک نوتلا", en: "Nutella Pancake", price: "۲۴۳,۰۰۰", cat: "breakfast", desc: "تاپینگ نوتلا و میوه", img: "/menu/405.jpg" },
  { id: 406, title: "وافل نوتلا", en: "Nutella Waffle", price: "۲۳۶,۰۰۰", cat: "breakfast", desc: "وافل ترد + نوتلا", img: "/menu/406.jpg" },

  // ==================== دسر ====================
  { id: 450, title: "کیک روز", en: "Cake of the Day", price: "۱۰۰,۰۰۰", cat: "dessert", desc: "تازه و پخت روز", img: "/menu/450.jpg" },
  { id: 451, title: "دسر", en: "Dessert", price: "۹۰,۰۰۰", cat: "dessert", desc: "دسر مخصوص سرآشپز", img: "/menu/451.jpg" },

  // ==================== قلیان ====================
  { 
    id: 501, 
    title: "سرویس قلیان (۲ نفره)", 
    en: "Hookah Service", 
    price: "۱۸۰,۰۰۰", 
    cat: "hookah", 
    desc: "طعم‌ها: شب‌های مسکو، بلوبری نعنا، لاو، یخ شراب، نعنا پرتقال، نعنا آدامس، لیمو نعنا، بلوبری، تمشک بستنی، هلو، هلو آلبالو، دوسیب، دوسیب آلبالو. (همراه با سرویس چای)", 
    img: "/menu/501.jpg",
    badge: "محبوب 💨"
  },
];

const CATEGORIES = [
  { id: "warm_caffeine", label: "گرم کافئین‌دار", icon: <Coffee size={16}/> },
  { id: "warm_nocaf", label: "گرم و دمنوش", icon: <Coffee size={16}/> },
  { id: "brewing", label: "بروئینگ بار", icon: <Coffee size={16}/> },
  { id: "cold_caffeine", label: "سرد کافئین‌دار", icon: <Coffee size={16}/> },
  { id: "shake", label: "شیک", icon: <Coffee size={16}/> },
  { id: "mocktail", label: "ماکتل و شربت", icon: <Coffee size={16}/> },
  { id: "juice", label: "آبمیوه و معجون", icon: <Coffee size={16}/> },
  { id: "food", label: "غذا و عصرانه", icon: <UtensilsCrossed size={16}/> },
  { id: "breakfast", label: "صبحانه", icon: <UtensilsCrossed size={16}/> },
  { id: "dessert", label: "دسر", icon: <UtensilsCrossed size={16}/> },
  { id: "hookah", label: "قلیان", icon: <Flame size={16}/> },
];

export default function Page() {
  const [filter, setFilter] = useState("warm_caffeine");
  const [search, setSearch] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 8 && hour < 24) setIsOpen(true);
    else setIsOpen(false);
  }, []);

  const copyWifi = () => {
    navigator.clipboard.writeText("PaeezGuest");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredData = DATA.filter(item => {
    if (search.length > 0) return item.title.includes(search) || item.en.toLowerCase().includes(search.toLowerCase());
    return item.cat === filter;
  });

  return (
    <div className="min-h-screen pb-24 bg-dark font-sans relative select-none">
      
      {/* هدر */}
      <header className="sticky top-0 z-40 bg-dark/95 backdrop-blur border-b border-white/5 px-5 h-16 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-gold tracking-wide font-serif">CAFE PAEEZ</h1>
          <div className="flex items-center gap-1 mt-0.5">
             <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
             <p className="text-[9px] text-gray-400 tracking-wide uppercase">{isOpen ? "Open Now" : "Closed"}</p>
          </div>
        </div>
        <button onClick={() => setShowInfo(true)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/5 active:scale-95 transition-transform hover:bg-gold hover:text-dark">
          <Info size={20} />
        </button>
      </header>

      {/* سرچ */}
      <div className="px-5 mt-4">
        <div className="relative group">
            <input type="text" placeholder="جستجو (مثلا: موکا)..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#1E1E1E] text-white text-sm rounded-2xl py-3 pr-10 pl-4 border border-white/5 focus:border-gold/50 focus:outline-none transition-all placeholder:text-gray-600 group-focus-within:shadow-[0_0_15px_rgba(212,175,55,0.1)]"/>
            <Search className="absolute right-3 top-3 text-gray-500 group-focus-within:text-gold transition-colors" size={18} />
            {search && <button onClick={() => setSearch("")} className="absolute left-3 top-3 text-gray-500 hover:text-white"><X size={18} /></button>}
        </div>
      </div>

      {/* تب‌ها (اسکرول افقی کامل) */}
      {!search && (
        <div className="sticky top-16 z-30 bg-dark/98 py-4 border-b border-white/5 shadow-md mt-2">
            <div className="flex gap-2 px-5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setFilter(cat.id)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center gap-2 ${filter === cat.id ? "bg-gold text-dark border-gold scale-105 shadow-md" : "bg-[#1A1A1A] text-gray-400 border-transparent hover:bg-white/5"}`}>
                {cat.icon} {cat.label}
                </button>
            ))}
            </div>
        </div>
      )}

      {/* لیست محصولات */}
      <main className="px-5 mt-6 space-y-5 min-h-[50vh]">
        {filteredData.length > 0 ? (
            filteredData.map((item) => (
            <div key={item.id} className="group bg-[#1E1E1E] p-3 rounded-3xl flex items-center gap-4 border border-white/5 shadow-lg animate-in slide-in-from-bottom-4 duration-500 hover:border-gold/20 transition-colors">
                <div className="w-24 h-24 bg-gray-800 rounded-2xl overflow-hidden shrink-0 relative shadow-inner flex items-center justify-center">
                    <img src={item.img} alt={item.title} onError={(e) => {e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('show-fallback');}} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 z-10 relative" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 z-0"><ImageOff size={24} className="mb-1 opacity-50" /></div>
                    {item.badge && <div className="absolute top-0 right-0 bg-gold text-dark text-[8px] font-bold px-2 py-1 rounded-bl-xl rounded-tr-xl z-20 shadow-md">{item.badge}</div>}
                </div>
                <div className="flex-1 h-24 flex flex-col justify-between py-1">
                    <div>
                        <h3 className="text-white font-bold text-base leading-tight">{item.title}</h3>
                        <p className="text-[9px] text-gold uppercase mt-0.5 font-light">{item.en}</p>
                        <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-gold font-bold text-base">{item.price} <span className="text-[9px] text-gray-500">ت</span></span>
                        <button className="w-7 h-7 bg-[#2A2A2A] text-gold rounded-lg flex items-center justify-center active:scale-90 transition-transform hover:bg-gold hover:text-dark"><Plus size={14} /></button>
                    </div>
                </div>
            </div>
            ))
        ) : (
            <div className="text-center text-gray-500 mt-10"><Search size={40} className="mx-auto mb-2 opacity-50" /><p>یافت نشد :(</p></div>
        )}
      </main>

      <div className="text-center mt-10 mb-6 px-10"><p className="text-[10px] text-gray-600 leading-relaxed">به تمامی قیمت‌ها ۱۰٪ مالیات بر ارزش افزوده اضافه می‌شود.<br/>هزینه ظرف بیرون بر ۱۰,۰۰۰ تومان می‌باشد.</p></div>

      {/* مودال اطلاعات (آپدیت شده) */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowInfo(false)}></div>
          <div className="bg-[#181818] w-full max-w-[430px] rounded-[2.5rem] p-6 relative z-10 border border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <button onClick={() => setShowInfo(false)} className="absolute top-5 left-5 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white"><X size={20} /></button>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gold font-serif">CAFE PAEEZ</h2>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] mt-2 font-bold ${isOpen ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{isOpen ? <><Clock size={10} /> باز است</> : <><Clock size={10} /> بسته است</>}</div>
            </div>
            <div className="space-y-3">
               <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gold/10 text-gold rounded-full flex items-center justify-center"><MapPin size={16}/></div>
                      <p className="text-sm text-white">تهران، خیابان ولیعصر، پلاک ۱</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                      <a href="https://neshan.org/maps/route?dest_lat=35.6892&dest_lng=51.3890" target="_blank" className="flex items-center justify-center gap-2 bg-[#0054BE]/10 text-[#0054BE] py-2.5 rounded-xl text-xs font-bold hover:bg-[#0054BE]/20 transition-colors"><Navigation size={14} /> مسیریابی نشان</a>
                      <a href="https://www.google.com/maps/dir/?api=1&destination=35.6892,51.3890" target="_blank" className="flex items-center justify-center gap-2 bg-[#34A853]/10 text-[#34A853] py-2.5 rounded-xl text-xs font-bold hover:bg-[#34A853]/20 transition-colors"><MapPin size={14} /> مسیریابی گوگل</a>
                  </div>
               </div>
               <a href="tel:02112345678" className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors group">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center"><Phone size={20}/></div><div><p className="text-xs text-gray-400">تلفن رزرو</p><p className="text-sm text-white font-bold">021-12345678</p></div></div>
               </a>
               <a href="https://instagram.com/Cafe_Paeez" target="_blank" className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors group">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center"><Instagram size={20}/></div><div><p className="text-xs text-gray-400">اینستاگرام</p><p className="text-sm text-white font-bold">@Cafe_Paeez</p></div></div>
               </a>
               <button onClick={copyWifi} className="w-full flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors group">
                  <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-blue-500/10 text-blue-500'}`}>{copied ? <Check size={20}/> : <Wifi size={20}/>}</div><div className="text-right"><p className="text-xs text-gray-400">رمز وای‌فای</p><p className="text-sm text-white font-bold font-mono tracking-wider">{copied ? "کپی شد!" : "PaeezGuest"}</p></div></div><div className="flex items-center gap-1 text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-lg"><Copy size={12} /> کپی</div>
               </button>
            </div>
            <p className="text-center text-[10px] text-gray-600 mt-6">Design by You ❤️</p>
          </div>
        </div>
      )}
    </div>
  );
}