import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  HeartHandshake, Store, Bike, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp, Sun, Calendar
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Утёсов» — Феодосия, Симферопольское шоссе, 48к1";

  const meta = [
    { name: "description", content: "ЖК «Утёсов» (Феодосия): квартиры в комфорт‑классе рядом с инфраструктурой города. Видеонаблюдение, умный доступ, озеленённые дворы, детские и спортплощадки. Этапы до IV кв. 2027. ДДУ 214‑ФЗ, эскроу." },
    { property: "og:title", content: "ЖК «Утёсов» — новостройка в Феодосии" },
    { property: "og:description", content: "Адрес: Симферопольское шоссе, 48к1. Паркинги, благоустроенные дворы, автономное отопление, планировки от студий до 2‑комн." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image-utesov.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на визуал проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop";
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#CDE4FF", backgroundColor: "#FFFFFF", color: "#0A2239" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #3B82F6 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#365B7D" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div
      className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
      style={{ borderColor: "#CDE4FF", backgroundColor: "#F3F8FF", color: "#0A2239" }}
    >
      {children}
    </div>
  );
}

function FireIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z" />
    </svg>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative"
      style={{ backgroundColor: "#F6FAFF", color: "#0A2239", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: синяя волна */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E9F3FF 0%, #F6FAFF 45%, #F6FAFF 100%)" }} />
        <motion.svg
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
          width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#CDE4FF" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#D7E9FF" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION (просторные кнопки, переносы) */}
      <header className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ backgroundColor: "rgba(246,250,255,0.9)", borderColor: "#CDE4FF" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-3">
          {/* Лого и название */}
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0A2239", color: "#D7E9FF" }}>У</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Утёсов»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#365B7D" }}>
                <MapPin size={12} className="inline mr-1" /> Феодосия, Симферопольское шоссе, 48к1
              </div>
            </div>
          </a>

          {/* Меню для ПК: центр, переносы */}
          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О проекте", "Инженерия и сервис", "Планировки", "Локация", "Сроки", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#tech','#plans','#location','#status','#faq'][i]} className="hover:text-blue-700 whitespace-nowrap transition-colors" style={{ color: "#365B7D" }}>{t}</a>
              ))}
            </div>
          </nav>

          {/* Кнопки действий */}
          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#9EC8FF", color: "#0A2239" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#3B82F6", color: "#F6FAFF" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#CDE4FF' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О проекте','#about'],['Инженерия и сервис','#tech'],['Планировки','#plans'],['Локация','#location'],['Сроки','#status'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-blue-50" style={{ color: '#365B7D' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#9EC8FF', color: '#0A2239' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#3B82F6', color: '#F6FAFF' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0A2239", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Утёсов» — комфорт‑класс в Феодосии
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#365B7D", maxWidth: 640 }}>
              Современный жилой комплекс на Симферопольском шоссе, 48к1: благоустроенные дворы, умный доступ, видеонаблюдение, детские и спортивные зоны. В пешей доступности — магазины, медцентр, остановки.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["Комфорт‑класс, ДДУ 214‑ФЗ", <ShieldCheck size={18} key="s" />],["До центра ~2 км", <MapPin size={18} key="m" />],["Студии–2‑комн.", <Ruler size={18} key="r" />],["Паркинг: наземный/многоур.", <ParkingSquare size={18} key="p" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#CDE4FF", color: "#0A2239" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#3B82F6", color: "#F6FAFF" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#9EC8FF", color: "#0A2239" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          {/* КАРТИНКА */}
          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#CDE4FF" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(205,228,255,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop" alt="Феодосия, побережье" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="~2 км" label="До центра" sub="Оценка по карте" icon={<MapPin size={18} />} /></div>
          <div className="h-full"><Stat value="до 9" label="Этажей (отдельные дома)" sub="монолит‑кирпич" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="Студии–2к" label="Форматы" icon={<Ruler size={18} />} /></div>
          <div className="h-full"><Stat value="Видеонаблюдение" label="Сервисы" sub="умный доступ, Wi‑Fi во дворе" icon={<CircuitBoard size={18} />} /></div>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#365B7D' }}>
              «Утёсов» — современный квартал в Феодосии от бренда «ИнтерСтрой». В проектах предусмотрены благоустроенные дворы без машин,
              зоны отдыха и спортивные площадки. Форматы квартир — от студий до 2‑комнатных. Продажа по ДДУ (214‑ФЗ) с расчётами через эскроу‑счета.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Сроки', t: 'По данным площадок продаж — этапы до IV кв. 2027 года.', icon: <Calendar size={18} /> },
                { h: 'Конструктив', t: 'Монолит‑кирпич, энергоэффективные решения, панорамное остекление.', icon: <CircuitBoard size={18} /> },
                { h: 'Правовой статус', t: 'ДДУ по 214‑ФЗ, расчёты через эскроу‑счета. Девелопер: ООО СЗ «Феодосийский».', icon: <ShieldCheck size={18} /> },
                { h: 'Инфраструктура', t: 'Детские и спортплощадки, ландшафт, лаунж‑зоны; рядом магазины, медцентр, банки.', icon: <Hammer size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#CDE4FF', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0A2239' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#365B7D' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#D7E9FF', borderColor: '#CDE4FF' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0A2239' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#365B7D' }}>
              <li><MapPin size={14} className="inline mr-2" /> Феодосия, Симферопольское ш., 48к1</li>
              <li><HeartHandshake size={14} className="inline mr-2" /> Магазины ~150 м, медцентр ~100 м</li>
              <li><Bike size={14} className="inline mr-2" /> Остановка ~50 м; набережная и пляжи ~2,8 км</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#3B82F6', color: '#F6FAFF' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ИНЖЕНЕРИЯ И СЕРВИС */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#E9F3FF' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><CircuitBoard size={22} /> Инженерия и сервис</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#365B7D' }}>
              {[
                { t: 'Автономное отопление (двухконтурные котлы)', icon: <Bath size={16} /> },
                { t: 'Видеонаблюдение по периметру, умный доступ по картам/приложению', icon: <FireIcon /> },
                { t: 'Wi‑Fi во дворах, озеленение с автополивом', icon: <Trees size={16} /> },
                { t: 'Детские и спортивные площадки, лаунж‑пространства', icon: <Dumbbell size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#CDE4FF' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0A2239' }}>
              <ShieldCheck size={18} /> Что получает владелец
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#365B7D' }}>
              {["Готовая городская среда", "Экономия на отоплении", "Безопасность и доступ", "Потенциал аренды"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F6FAFF', borderColor: '#CDE4FF' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировочные решения</h2>
          <p className="mt-3" style={{ color: '#365B7D' }}>
            Студии, 1‑ и 2‑комнатные планировки. Пришлём PDF‑подборку с актуальными вариантами, этажами и видами.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Компактные форматы для старта или аренды", icon: <Home size={18} /> },
              { t: "1‑комнатные", d: "Кухни‑гостиные, балконы", icon: <Home size={18} /> },
              { t: "2‑комнатные", d: "Семейные сценарии и видовые этажи", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#CDE4FF' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0A2239' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#365B7D' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#3B82F6' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СТАТУС И СРОКИ */}
      <section id="status" className="py-14 md:py-20" style={{ backgroundColor: '#E9F3FF' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><FileText size={22} /> Сроки и статус</h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Адрес", d: "Симферопольское шоссе, 48к1 (Феодосия)", icon: <MapPin size={18} /> },
            { t: "Срок готовности", d: "Ориентир — IV кв. 2027", icon: <Calendar size={18} /> },
            { t: "Застройщик", d: "ООО СЗ «Феодосийский» · бренд «ИнтерСтрой»", icon: <ShieldCheck size={18} /> },
            { t: "Парковка", d: "Наземная и многоуровневая", icon: <ParkingSquare size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#CDE4FF' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#0A2239' }}>{s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#365B7D' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Доступность и расстояния</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#365B7D' }}>
              {[
                "Набережная и пляжи — ~2,8 км",
                "Школа — ~950 м; детсад — ~1 км",
                "Магазины — ~150 м; медцентр — ~100 м",
                "Остановка общественного транспорта — ~50 м"
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Bike size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#CDE4FF' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%A4%D0%B5%D0%BE%D0%B4%D0%BE%D1%81%D0%B8%D1%8F%2C%20%D0%A1%D0%B8%D0%BC%D1%84%D0%B5%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%2048%D0%BA1&z=15" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен комплекс?", a: "Феодосия, Симферопольское шоссе, 48к1." },
              { q: "Какие форматы квартир?", a: "Студии, 1‑ и 2‑комнатные." },
              { q: "Какие особенности инженерии?", a: "Автономное отопление, видеонаблюдение, умный доступ, Wi‑Fi во дворе." },
              { q: "Сроки ввода?", a: "По данным площадок — ориентир IV кв. 2027." },
              { q: "Есть ли паркинг?", a: "Да, предусмотрены наземные и многоуровневые парковки." },
              { q: "Как проходит покупка?", a: "Бронирование, ДДУ по 214‑ФЗ на эскроу‑счёте, помощь с ипотекой." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#CDE4FF' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0A2239' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#365B7D' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где расположен комплекс?", "acceptedAnswer": { "@type": "Answer", "text": "Феодосия, Симферопольское шоссе, 48к1." } },
            { "@type": "Question", "name": "Какие форматы квартир?", "acceptedAnswer": { "@type": "Answer", "text": "Студии, 1‑ и 2‑комнатные." } },
            { "@type": "Question", "name": "Какие особенности инженерии?", "acceptedAnswer": { "@type": "Answer", "text": "Автономное отопление, видеонаблюдение, умный доступ, Wi‑Fi во дворе." } },
            { "@type": "Question", "name": "Сроки ввода?", "acceptedAnswer": { "@type": "Answer", "text": "Ориентир IV кв. 2027." } },
            { "@type": "Question", "name": "Есть ли паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "Наземная и многоуровневая парковка." } },
            { "@type": "Question", "name": "Как проходит покупка?", "acceptedAnswer": { "@type": "Answer", "text": "Бронирование, ДДУ 214‑ФЗ, расчёты на эскроу‑счёте." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#365B7D' }}>
              Пришлём актуальные планировки, этажи и виды, информацию по срокам и ипотеке. Поможем выбрать квартиру под проживание или аренду.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#9EC8FF', color: '#0A2239' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#CDE4FF' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0A2239' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#365B7D' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0A2239' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#365B7D' }}>
                  Оставьте контакты — вышлем PDF с планировками и условиями по ЖК «Утёсов».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CDE4FF' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CDE4FF' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CDE4FF' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CDE4FF' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#3B82F6', color: '#F6FAFF' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#53779D' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#53779D' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#CDE4FF' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#365B7D' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0A2239' }}>
              <Home size={16} /> ЖК «Утёсов»
            </div>
            <p className="mt-2">Республика Крым, г. Феодосия, Симферопольское ш., 48к1</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета.</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "ЖК «Утёсов»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Симферопольское ш., 48к1",
          "addressLocality": "Феодосия",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#3B82F6", color: "#F6FAFF", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
