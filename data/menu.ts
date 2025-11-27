export type Product = {
  id: number;
  name: string;
  engName: string;
  price: number;
  description: string;
  image: string;
  category: string;
  tags?: string[];
};

export const categories = [
  { id: "hot-coffee", title: "قهوه گرم" },
  { id: "cold-brew", title: "نوشیدنی سرد" },
  { id: "cakes", title: "کیک و دسر" },
  { id: "breakfast", title: "صبحانه" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "اسپرسو دبل",
    engName: "Double Espresso",
    price: 65000,
    description: "۱۰۰٪ عربیکا با رست مدیوم",
    image: "https://images.unsplash.com/photo-1510707577719-ae7b14805e3a?auto=format&fit=crop&w=500&q=80",
    category: "hot-coffee",
    tags: ["باریستا"],
  },
  {
    id: 2,
    name: "لاته کارامل",
    engName: "Caramel Latte",
    price: 85000,
    description: "اسپرسو، شیر فوم گرفته شده و سیروپ کارامل",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80",
    category: "hot-coffee",
  },
  {
    id: 3,
    name: "آیس لاته",
    engName: "Iced Latte",
    price: 75000,
    description: "شیر سرد، یخ و دو شات اسپرسو",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500&q=80",
    category: "cold-brew",
    tags: ["محبوب"],
  },
  {
    id: 4,
    name: "چیزکیک نیویورکی",
    engName: "New York Cheesecake",
    price: 120000,
    description: "بافت کلاسیک خامه‌ای با سس توت فرنگی",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=500&q=80",
    category: "cakes",
  },
];