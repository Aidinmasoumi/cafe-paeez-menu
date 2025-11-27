import type { Metadata } from "next";
import localFont from "next/font/local"; // <--- این رو ایمپورت کن
import "./globals.css";

// --- تنظیم فونت شخصی ---
const myFont = localFont({
  src: "../public/fonts/Estedad-Regular.ttf", // <--- آدرس دقیق فایلت (اسم فایل رو درست کن)
  variable: "--font-custom",           // <--- یک اسم متغیر براش می‌ذاریم
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cafe Menu",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      {/* متغیر فونت رو اینجا اضافه می‌کنیم */}
      <body className={myFont.variable}>
        <div className="flex justify-center min-h-screen bg-black">
          <div className="w-full max-w-[430px] bg-[#121212] min-h-screen shadow-white/10 shadow-2xl overflow-x-hidden font-sans">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}