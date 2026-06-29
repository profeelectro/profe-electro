import { useState, useEffect } from "react";

// ─── DATOS MÓDULOS GVA ────────────────────────────────────────────────────────
const MODULOS_FP = {
  cfgb: {
    label: "CFGB Electricidad y Electrónica", color: "#F59E0B", emoji: "⚡",
    cursos: {
      "1º curso": [
        { cod: "3013", nombre: "Instalaciones eléctricas y domóticas", horas: 266 },
        { cod: "3015", nombre: "Equipos eléctricos y electrónicos", horas: 332 },
        { cod: "3161", nombre: "Comunicación y Ciencias Sociales I", horas: 133 },
        { cod: "3163", nombre: "Ciencias Aplicadas I", horas: 133 },
        { cod: "3159p", nombre: "Itinerario personal empleabilidad 1º", horas: 67 },
      ],
      "2º curso": [
        { cod: "3014", nombre: "Instalaciones de telecomunicaciones", horas: 266 },
        { cod: "3016", nombre: "Redes para transmisión de datos", horas: 266 },
        { cod: "3162", nombre: "Comunicación y Ciencias Sociales II", horas: 166 },
        { cod: "3164", nombre: "Ciencias Aplicadas II", horas: 166 },
        { cod: "3160956", nombre: "Proyecto intermodular colaborativo", horas: 67 },
      ],
    },
  },
  cfgm: {
    label: "CFGM Instalaciones Eléctricas y Automáticas", color: "#3B82F6", emoji: "🔧",
    cursos: {
      "1º curso": [
        { cod: "0156", nombre: "Inglés profesional GM", horas: 67 },
        { cod: "0232", nombre: "Automatismos industriales", horas: 266 },
        { cod: "0233", nombre: "Electrónica", horas: 100 },
        { cod: "0234", nombre: "Electrotecnia", horas: 201 },
        { cod: "0235", nombre: "Instalaciones eléctricas interiores", horas: 266 },
        { cod: "1709", nombre: "Itinerario empleabilidad I", horas: 100 },
      ],
      "2º curso": [
        { cod: "0236", nombre: "Instalaciones de distribución", horas: 166 },
        { cod: "0237", nombre: "Infraestructuras comunes telecomunicación", horas: 133 },
        { cod: "0238", nombre: "Instalaciones domóticas", horas: 166 },
        { cod: "0239", nombre: "Instalaciones solares fotovoltaicas", horas: 67 },
        { cod: "0240", nombre: "Máquinas eléctricas", horas: 133 },
        { cod: "1710", nombre: "Itinerario empleabilidad II", horas: 100 },
        { cod: "CVOPM031", nombre: "Módulo optativo", horas: 100 },
        { cod: "1708031", nombre: "Sostenibilidad aplicada al sistema productivo", horas: 34 },
        { cod: "1664031", nombre: "Digitalización aplicada GM", horas: 34 },
      ],
    },
  },
  cfgs: {
    label: "CFGS Sistemas Electrotécnicos y Automatizados", color: "#8B5CF6", emoji: "🏭",
    cursos: {
      "1º curso": [
        { cod: "0179", nombre: "Inglés profesional GS", horas: 67 },
        { cod: "0519", nombre: "Documentación técnica en instalaciones eléctricas", horas: 100 },
        { cod: "0520", nombre: "Sistemas y circuitos eléctricos", horas: 133 },
        { cod: "0522", nombre: "Desarrollo de redes eléctricas y centros de transformación", horas: 133 },
        { cod: "0523", nombre: "Configuración de instalaciones domóticas y automáticas", horas: 166 },
        { cod: "0524", nombre: "Configuración de instalaciones eléctricas", horas: 166 },
        { cod: "0602", nombre: "Gestión del montaje y mantenimiento", horas: 100 },
        { cod: "1709", nombre: "Itinerario empleabilidad I", horas: 100 },
        { cod: "0526p", nombre: "Proyecto intermodular (parcial)", horas: 35 },
      ],
      "2º curso": [
        { cod: "0517", nombre: "Procesos en instalaciones ICT", horas: 166 },
        { cod: "0518", nombre: "Técnicas y procesos en instalaciones eléctricas", horas: 233 },
        { cod: "0521", nombre: "Técnicas y procesos en instalaciones domóticas y automáticas", horas: 233 },
        { cod: "1710", nombre: "Itinerario empleabilidad II", horas: 100 },
        { cod: "0526", nombre: "Proyecto intermodular sistemas electrotécnicos", horas: 100 },
        { cod: "CVOPS031", nombre: "Módulo optativo", horas: 100 },
        { cod: "1665031", nombre: "Digitalización aplicada GS", horas: 34 },
        { cod: "1708031", nombre: "Sostenibilidad aplicada al sistema productivo", horas: 34 },
      ],
    },
  },
};

// ─── UMBRALES FALTAS ──────────────────────────────────────────────────────────
const MESES_CURSO = [
  { id: "sep", label: "Sep", color: "#6366F1" }, { id: "oct", label: "Oct", color: "#3B82F6" },
  { id: "nov", label: "Nov", color: "#0EA5E9" }, { id: "dic", label: "Dic", color: "#10B981" },
  { id: "ene", label: "Ene", color: "#F59E0B" }, { id: "feb", label: "Feb", color: "#F97316" },
  { id: "mar", label: "Mar", color: "#EF4444" }, { id: "abr", label: "Abr", color: "#EC4899" },
  { id: "may", label: "May", color: "#8B5CF6" }, { id: "jun", label: "Jun", color: "#14B8A6" },
];

// ─── CALENDARIO GVA 2025-2026 ─────────────────────────────────────────────────
const CAL = {
  periodos: [
    { nombre: "🎄 Navidad", inicio: "23 dic 2025", fin: "6 ene 2026", color: "#EF4444" },
    { nombre: "❄️ Semana Blanca", inicio: "13 feb 2026", fin: "17 feb 2026", color: "#60A5FA" },
    { nombre: "🌸 Semana Santa", inicio: "2 abr 2026", fin: "13 abr 2026", color: "#10B981" },
  ],
  festivos: [
    { nombre: "Comunitat Valenciana", fecha: "9 oct 2025", emoji: "🎗️" },
    { nombre: "Día de la Inmaculada", fecha: "8 dic 2025", emoji: "⛪" },
    { nombre: "Fallas — Picassent", fecha: "16 mar 2026", emoji: "🔥" },
    { nombre: "San José", fecha: "19 mar 2026", emoji: "🌹" },
    { nombre: "San Vicente Ferrer", fecha: "13 abr 2026", emoji: "✝️" },
    { nombre: "Día del Trabajo", fecha: "1 may 2026", emoji: "✊" },
    { nombre: "San Cristóbal — Picassent", fecha: "10 jul 2026", emoji: "🎉" },
  ],
  evaluaciones: [
    { nombre: "1ª Evaluación", fecha: "19 dic 2025", color: "#F59E0B" },
    { nombre: "2ª Evaluación", fecha: "20 mar 2026", color: "#3B82F6" },
    { nombre: "3ª Evaluación / Final", fecha: "12 jun 2026", color: "#10B981" },
  ],
  examenes: [
    { nombre: "📝 Exámenes 1ª Ev.", inicio: "15 dic 2025", fin: "19 dic 2025", color: "#F59E0B" },
    { nombre: "📝 Exámenes 2ª Ev.", inicio: "16 mar 2026", fin: "20 mar 2026", color: "#3B82F6" },
    { nombre: "📝 Exámenes 3ª Ev.", inicio: "8 jun 2026", fin: "12 jun 2026", color: "#10B981" },
    { nombre: "🔄 Recuperaciones 1ª", inicio: "12 ene 2026", fin: "16 ene 2026", color: "#F97316" },
    { nombre: "🔄 Recuperaciones 2ª", inicio: "13 abr 2026", fin: "17 abr 2026", color: "#F97316" },
    { nombre: "🔄 Recuperación Final", inicio: "15 jun 2026", fin: "19 jun 2026", color: "#EF4444" },
  ],
  claustros: [
    { nombre: "🏫 Claustro inicio de curso", fecha: "5 sep 2025", color: "#8B5CF6" },
    { nombre: "🏫 Claustro 1ª evaluación", fecha: "19 dic 2025", color: "#8B5CF6" },
    { nombre: "👨‍👩‍👧 Equipos docentes 1ª Ev.", fecha: "10 dic 2025", color: "#0EA5E9" },
    { nombre: "🏫 Claustro 2ª evaluación", fecha: "20 mar 2026", color: "#8B5CF6" },
    { nombre: "👨‍👩‍👧 Equipos docentes 2ª Ev.", fecha: "13 mar 2026", color: "#0EA5E9" },
    { nombre: "👨‍👩‍👧 Equipos docentes Final", fecha: "5 jun 2026", color: "#0EA5E9" },
    { nombre: "🏫 Claustro final de curso", fecha: "19 jun 2026", color: "#8B5CF6" },
  ],
};

const GRUPOS_INIT = [
  { id: "cfgb-1", ciclo: "cfgb", curso: "1º curso", nombre: "CFGB Electricidad — 1º", moduloActual: "Instalaciones eléctricas y domóticas", color: "#F59E0B", emoji: "⚡", alumnos: [] },
  { id: "cfgm-1", ciclo: "cfgm", curso: "1º curso", nombre: "CFGM Instalaciones — 1º", moduloActual: "Automatismos industriales", color: "#3B82F6", emoji: "🔧", alumnos: [] },
  { id: "cfgs-2", ciclo: "cfgs", curso: "2º curso", nombre: "CFGS Sistemas — 2º", moduloActual: "Técnicas y procesos en instalaciones eléctricas", color: "#8B5CF6", emoji: "🏭", alumnos: [] },
];

const TABS = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "grupos", label: "Grupos", icon: "👥" },
  { id: "notas", label: "Notas", icon: "📊" },
  { id: "faltas", label: "Faltas", icon: "📋" },
  { id: "banco", label: "Banco", icon: "📚" },
  { id: "prog", label: "Prog.", icon: "📄" },
  { id: "cal", label: "Cal.", icon: "📅" },
];

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
const Badge = ({ color, children, small }) => (
  <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 20, padding: small ? "1px 8px" : "3px 10px", fontSize: small ? 10 : 12, fontWeight: 700 }}>{children}</span>
);
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 16, cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>
);
const Inp = ({ value, onChange, placeholder, style = {}, onKeyDown, onFocus, type = "text" }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown} onFocus={onFocus}
    style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 10, padding: "10px 14px", color: "#F1F5F9", fontSize: 14, outline: "none", boxSizing: "border-box", ...style }} />
);
const Sel = ({ value, onChange, children, style = {} }) => (
  <select value={value} onChange={onChange} style={{ width: "100%", background: "#1E293B", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 10, padding: "10px 14px", color: "#F1F5F9", fontSize: 14, outline: "none", boxSizing: "border-box", ...style }}>{children}</select>
);
const Btn = ({ onClick, children, color = "#3B82F6", disabled, full, small, outline }) => (
  <button onClick={onClick} disabled={disabled} style={{ background: outline ? "transparent" : disabled ? "rgba(255,255,255,0.07)" : color, color: disabled ? "#475569" : outline ? color : "#fff", border: outline ? `1.5px solid ${color}` : "none", borderRadius: 10, padding: small ? "6px 14px" : "10px 18px", fontWeight: 700, fontSize: small ? 12 : 14, cursor: disabled ? "default" : "pointer", width: full ? "100%" : "auto", transition: "all 0.15s" }}>{children}</button>
);

// ─── HOOK STORAGE (localStorage — funciona en iPhone/Mac/cualquier navegador) ──
function useStorage(key, def) {
  const [value, setValue] = useState(() => {
    // Carga síncrona desde localStorage al iniciar
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : def;
    } catch {
      return def;
    }
  });
  const [loaded] = useState(true); // localStorage es síncrono, siempre listo

  const setAndSave = (nv) => {
    setValue(prev => {
      const resolved = typeof nv === "function" ? nv(prev) : nv;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch (e) {
        console.error("Error guardando en localStorage:", e);
      }
      return resolved;
    });
  };

  return [value, setAndSave, loaded];
}

// ─── HELPER HTML DESCARGABLE ──────────────────────────────────────────────────
function generarHTMLRecurso(titulo, contenidoHTML, ciclo, curso, tipo, modulo, instituto) {
  const colores = { examen: "#F59E0B", practica: "#10B981", ejercicios: "#3B82F6", rebt: "#8B5CF6", programacion: "#EF4444", mensaje: "#6366F1" };
  const color = colores[tipo] || "#3B82F6";
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${titulo}</title>
<style>
  :root { --accent: ${color}; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; color: #1e293b; }
  .page { max-width: 860px; margin: 0 auto; padding: 32px 40px; }
  .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; padding: 24px 28px; border-radius: 12px; margin-bottom: 28px; border-left: 6px solid var(--accent); }
  .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
  .badge { background: var(--accent); color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
  .header h1 { font-size: 22px; font-weight: 800; color: #f1f5f9; margin-bottom: 4px; }
  .header .meta { font-size: 12px; color: #94a3b8; }
  .header .meta span { color: #60a5fa; font-weight: 600; }
  .content { background: white; border-radius: 12px; padding: 28px 32px; box-shadow: 0 1px 8px rgba(0,0,0,0.06); line-height: 1.75; }
  h2 { color: #0f172a; font-size: 16px; font-weight: 800; border-left: 4px solid var(--accent); padding-left: 12px; margin: 24px 0 12px; }
  h3 { color: #1e3a5f; font-size: 14px; font-weight: 700; margin: 18px 0 8px; }
  p { margin-bottom: 10px; font-size: 13.5px; }
  .box { background: #f1f5f9; border-left: 3px solid var(--accent); border-radius: 6px; padding: 12px 16px; margin: 14px 0; }
  .box.verde { background: #f0fdf4; border-color: #22c55e; }
  .box.amarillo { background: #fffbeb; border-color: #f59e0b; }
  .box.rojo { background: #fff1f2; border-color: #ef4444; }
  .box.azul { background: #eff6ff; border-color: #3b82f6; }
  .formula { background: #0f172a; color: #7dd3fc; font-family: 'Courier New', monospace; padding: 12px 16px; border-radius: 8px; margin: 12px 0; font-size: 13px; border: 1px solid #1e3a5f; }
  table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px; }
  th { background: #1e3a5f; color: white; padding: 10px 12px; text-align: left; font-weight: 700; }
  td { padding: 9px 12px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) td { background: #f8fafc; }
  .pregunta { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
  .pregunta .num { color: var(--accent); font-weight: 800; font-size: 12px; }
  .solucion { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-top: 6px; font-size: 12.5px; }
  .solucion::before { content: "✅ Solución: "; font-weight: 700; color: #16a34a; }
  .paso { display: flex; gap: 12px; margin: 10px 0; align-items: flex-start; }
  .paso-num { background: var(--accent); color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; flex-shrink: 0; }
  .alerta { background: linear-gradient(135deg, #7c3aed, #4f46e5); color: white; padding: 12px 16px; border-radius: 8px; margin: 12px 0; font-size: 13px; }
  .footer { margin-top: 28px; padding-top: 16px; border-top: 2px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #94a3b8; }
  .footer .logo { font-weight: 800; color: #1e3a5f; font-size: 13px; }
  pre { white-space: pre-wrap; word-break: break-word; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13.5px; line-height: 1.75; }
  @media print {
    body { background: white; }
    .page { padding: 15mm 20mm; }
    .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .content { box-shadow: none; }
    @page { margin: 10mm 15mm; }
  }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="header-top">
      <div class="badge">${tipo.toUpperCase()}</div>
      <div style="font-size:11px;color:#60a5fa;text-align:right">${new Date().toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"})}</div>
    </div>
    <h1>${titulo}</h1>
    <div class="meta">
      <span>${instituto || "IES L'Om — Picassent"}</span> · ${curso} · ${modulo}
    </div>
  </div>
  <div class="content">
    <pre>${contenidoHTML.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>
  </div>
  <div class="footer">
    <div class="logo">⚡ ProfeElectro</div>
    <div>Para guardar como PDF: Archivo → Imprimir → Guardar como PDF</div>
  </div>
</div>
</body></html>`;
}

// ─── PANTALLA CONFIG ──────────────────────────────────────────────────────────
function PantallaConfig({ config, setConfig, onDone }) {
  const [l, setL] = useState(config);
  return (
    <div style={{ position: "fixed", inset: 0, background: "linear-gradient(135deg,#0f172a,#1e3a5f)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ fontSize: 60, marginBottom: 8 }}>⚡</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "#F1F5F9", marginBottom: 4 }}>ProfeElectro</div>
      <div style={{ fontSize: 13, color: "#60A5FA", marginBottom: 32, fontWeight: 600 }}>Tu aplicación docente — GVA</div>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 14 }}>
        {[["TU NOMBRE", "nombre", "Tu nombre y apellidos"], ["INSTITUTO", "instituto", "IES L'Om — Picassent"]].map(([lbl, k, ph]) => (
          <div key={k}><div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 5, fontWeight: 600 }}>{lbl}</div><Inp value={l[k]} onChange={e => setL({ ...l, [k]: e.target.value })} placeholder={ph} /></div>
        ))}
        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 5, fontWeight: 600 }}>CURSO ESCOLAR</div>
          <Sel value={l.curso} onChange={e => setL({ ...l, curso: e.target.value })}>
            {["2024-2025","2025-2026","2026-2027"].map(c => <option key={c} value={c}>{c}</option>)}
          </Sel>
        </div>
        <div><div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 5, fontWeight: 600 }}>LOCALIDAD</div><Inp value={l.localidad} onChange={e => setL({ ...l, localidad: e.target.value })} placeholder="Picassent" /></div>
        <Btn onClick={() => { setConfig(l); onDone(); }} color="#3B82F6" full>Empezar →</Btn>
      </div>
    </div>
  );
}

// ─── PANTALLA INICIO ──────────────────────────────────────────────────────────
function PantallaInicio({ grupos, config, setConfig, recursos }) {
  const [editando, setEditando] = useState(false);
  const [lc, setLc] = useState(config);
  const totalAlumnos = grupos.reduce((s, g) => s + g.alumnos.length, 0);
  const totalFaltas = grupos.reduce((s, g) => s + g.alumnos.reduce((f, a) => f + (a.faltas || 0), 0), 0);
  const alertas = grupos.flatMap(g => {
    const mData = (MODULOS_FP[g.ciclo]?.cursos[g.curso] || []).find(m => m.nombre === g.moduloActual);
    const horas = mData?.horas || 100;
    return g.alumnos.filter(a => (a.faltas || 0) / horas >= 0.10).map(a => ({ ...a, grupo: g.nombre, color: g.color }));
  });

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1e3a5f,#0f172a,#1a1a2e)", borderRadius: 20, padding: "22px 20px", marginBottom: 16, border: "1px solid rgba(59,130,246,0.25)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, background: "radial-gradient(circle,#3B82F633,transparent)", borderRadius: "50%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, color: "#60A5FA", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>{config.curso} · GVA</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 2 }}>⚡ {config.nombre || "ProfeElectro"}</div>
            <div style={{ fontSize: 12, color: "#94A3B8" }}>{config.instituto}</div>
          </div>
          <button onClick={() => { setLc(config); setEditando(true); }} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#94A3B8", cursor: "pointer" }}>✏️</button>
        </div>
      </div>

      {editando && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#1E293B", borderRadius: 20, padding: 24, width: "100%", maxWidth: 380, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#F1F5F9", marginBottom: 16 }}>✏️ Editar datos</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Inp value={lc.nombre} onChange={e => setLc({ ...lc, nombre: e.target.value })} placeholder="Tu nombre" />
              <Inp value={lc.instituto} onChange={e => setLc({ ...lc, instituto: e.target.value })} placeholder="Instituto" />
              <Sel value={lc.curso} onChange={e => setLc({ ...lc, curso: e.target.value })}>
                {["2024-2025","2025-2026","2026-2027"].map(c => <option key={c} value={c}>{c}</option>)}
              </Sel>
              <Inp value={lc.localidad} onChange={e => setLc({ ...lc, localidad: e.target.value })} placeholder="Localidad" />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Btn onClick={() => setEditando(false)} outline color="#64748B" full>Cancelar</Btn>
              <Btn onClick={() => { setConfig(lc); setEditando(false); }} color="#3B82F6" full>Guardar</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          { icon: "📚", val: grupos.length, label: "Grupos", color: "#3B82F6" },
          { icon: "👥", val: totalAlumnos, label: "Alumnos", color: "#10B981" },
          { icon: "⚠️", val: totalFaltas, label: "Faltas", color: "#F59E0B" },
          { icon: "📁", val: (recursos || []).length, label: "Recursos", color: "#8B5CF6" },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", padding: "12px 4px" }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 9, color: "#64748B" }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Grupos */}
      <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 14, marginBottom: 10 }}>Mis grupos</div>
      {grupos.map(g => (
        <Card key={g.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: g.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `2px solid ${g.color}44` }}>{g.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 13 }}>{g.nombre}</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>{g.moduloActual}</div>
          </div>
          <Badge color={g.color} small>{g.curso}</Badge>
        </Card>
      ))}

      {/* Alertas */}
      {alertas.length > 0 && (
        <>
          <div style={{ fontWeight: 700, color: "#EF4444", fontSize: 14, marginBottom: 8, marginTop: 16 }}>🚨 Alertas absentismo ({alertas.length})</div>
          {alertas.map(a => (
            <Card key={a.id} style={{ marginBottom: 6, padding: "10px 14px", borderColor: "#EF444433" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 13 }}>{a.nombre}</div><div style={{ fontSize: 11, color: "#64748B" }}>{a.grupo}</div></div>
                <Badge color="#EF4444">{a.faltas}h</Badge>
              </div>
            </Card>
          ))}
        </>
      )}

      {/* Últimos recursos */}
      {(recursos || []).length > 0 && (
        <>
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 14, marginBottom: 10, marginTop: 16 }}>📚 Últimos recursos creados</div>
          {(recursos || []).slice(0, 3).map(r => (
            <Card key={r.id} style={{ marginBottom: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{r.icono}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 12 }}>{r.titulo}</div>
                <div style={{ fontSize: 10, color: "#64748B" }}>{r.modulo} · {r.fecha}</div>
              </div>
              <Badge color={r.colorTipo} small>{r.tipo}</Badge>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

// ─── PANTALLA GRUPOS ──────────────────────────────────────────────────────────
function PantallaGrupos({ grupos, setGrupos }) {
  const [modal, setModal] = useState(null);
  const [nuevo, setNuevo] = useState({ ciclo: "cfgm", curso: "1º curso", modulo: "" });
  const [nuevoAlumno, setNuevoAlumno] = useState("");
  const [selGrupo, setSelGrupo] = useState(null);
  const [filtroCiclo, setFiltroCiclo] = useState("todos");
  const [filtroCurso, setFiltroCurso] = useState("todos");

  const modDisponibles = nuevo.ciclo && nuevo.curso ? MODULOS_FP[nuevo.ciclo].cursos[nuevo.curso] : [];
  const gruposFiltrados = grupos.filter(g => (filtroCiclo === "todos" || g.ciclo === filtroCiclo) && (filtroCurso === "todos" || g.curso === filtroCurso));

  const crearGrupo = () => {
    const v = MODULOS_FP[nuevo.ciclo];
    const mod = nuevo.modulo || v.cursos[nuevo.curso][0].nombre;
    setGrupos(prev => [...prev, { id: `${nuevo.ciclo}-${Date.now()}`, ciclo: nuevo.ciclo, curso: nuevo.curso, nombre: `${v.emoji} ${nuevo.ciclo.toUpperCase()} — ${nuevo.curso}`, moduloActual: mod, color: v.color, emoji: v.emoji, alumnos: [] }]);
    setModal(null);
  };

  const addAlumno = (gid) => {
    if (!nuevoAlumno.trim()) return;
    setGrupos(prev => prev.map(g => g.id === gid ? { ...g, alumnos: [...g.alumnos, { id: Date.now(), nombre: nuevoAlumno.trim(), faltas: 0, faltasMes: {}, notas: { ev1: "", ev2: "", ev3: "" }, observaciones: "" }] } : g));
    setNuevoAlumno("");
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <Sel value={filtroCiclo} onChange={e => setFiltroCiclo(e.target.value)} style={{ flex: 1, minWidth: 100, padding: "7px 10px", fontSize: 12 }}>
          <option value="todos">Todos los ciclos</option>
          {Object.entries(MODULOS_FP).map(([k, v]) => <option key={k} value={k}>{v.emoji} {k.toUpperCase()}</option>)}
        </Sel>
        <Sel value={filtroCurso} onChange={e => setFiltroCurso(e.target.value)} style={{ flex: 1, minWidth: 90, padding: "7px 10px", fontSize: 12 }}>
          <option value="todos">1º y 2º</option>
          <option value="1º curso">1º curso</option>
          <option value="2º curso">2º curso</option>
        </Sel>
        <Btn onClick={() => setModal("nuevo")} color="#10B981" small>+ Grupo</Btn>
      </div>

      {gruposFiltrados.length === 0 && <Card style={{ textAlign: "center", padding: 32 }}><div style={{ fontSize: 32 }}>📭</div><div style={{ color: "#64748B", marginTop: 8 }}>Sin grupos con este filtro</div></Card>}

      {gruposFiltrados.map(g => {
        const mods = MODULOS_FP[g.ciclo].cursos[g.curso] || [];
        return (
          <Card key={g.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: g.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `2px solid ${g.color}44` }}>{g.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 14 }}>{g.nombre}</div>
                <div style={{ fontSize: 11, color: "#64748B" }}>{g.alumnos.length} alumnos</div>
              </div>
              <Badge color={g.color} small>{g.curso}</Badge>
              <button onClick={() => setGrupos(prev => prev.filter(x => x.id !== g.id))} style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}>🗑️</button>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#64748B", marginBottom: 4, fontWeight: 600 }}>MÓDULO ACTIVO</div>
              <Sel value={g.moduloActual} onChange={e => setGrupos(prev => prev.map(x => x.id === g.id ? { ...x, moduloActual: e.target.value } : x))} style={{ padding: "7px 10px", fontSize: 12 }}>
                {mods.map(m => <option key={m.cod} value={m.nombre}>[{m.cod}] {m.nombre} ({m.horas}h)</option>)}
              </Sel>
            </div>
            {g.alumnos.map((a, i) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: g.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: g.color }}>{i + 1}</div>
                <div style={{ flex: 1, fontSize: 13, color: "#E2E8F0" }}>{a.nombre}</div>
                <button onClick={() => setGrupos(prev => prev.map(x => x.id === g.id ? { ...x, alumnos: x.alumnos.filter(al => al.id !== a.id) } : x))} style={{ background: "none", color: "#475569", border: "none", cursor: "pointer" }}>✕</button>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <Inp value={selGrupo === g.id ? nuevoAlumno : ""} onChange={e => { setSelGrupo(g.id); setNuevoAlumno(e.target.value); }} onFocus={() => setSelGrupo(g.id)} onKeyDown={e => e.key === "Enter" && addAlumno(g.id)} placeholder="Añadir alumno..." style={{ padding: "7px 10px", fontSize: 12 }} />
              <Btn onClick={() => addAlumno(g.id)} color={g.color} small>+</Btn>
            </div>
          </Card>
        );
      })}

      {modal === "nuevo" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#1E293B", borderRadius: 20, padding: 24, width: "100%", maxWidth: 400, border: "1px solid rgba(255,255,255,0.1)", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#F1F5F9", marginBottom: 16 }}>➕ Nuevo grupo</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6 }}>CICLO</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {Object.entries(MODULOS_FP).map(([k, v]) => (
                    <button key={k} onClick={() => setNuevo({ ...nuevo, ciclo: k, modulo: "" })} style={{ flex: 1, background: nuevo.ciclo === k ? v.color : "rgba(255,255,255,0.07)", color: nuevo.ciclo === k ? "#fff" : "#94A3B8", border: "none", borderRadius: 10, padding: "8px 4px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>{v.emoji} {k.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6 }}>CURSO</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["1º curso","2º curso"].map(c => (
                    <button key={c} onClick={() => setNuevo({ ...nuevo, curso: c, modulo: "" })} style={{ flex: 1, background: nuevo.curso === c ? MODULOS_FP[nuevo.ciclo].color : "rgba(255,255,255,0.07)", color: nuevo.curso === c ? "#fff" : "#94A3B8", border: "none", borderRadius: 10, padding: "8px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6 }}>MÓDULO PRINCIPAL</div>
                <Sel value={nuevo.modulo} onChange={e => setNuevo({ ...nuevo, modulo: e.target.value })} style={{ fontSize: 12 }}>
                  <option value="">— Selecciona —</option>
                  {modDisponibles.map(m => <option key={m.cod} value={m.nombre}>[{m.cod}] {m.nombre} ({m.horas}h)</option>)}
                </Sel>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Btn onClick={() => setModal(null)} outline color="#64748B" full>Cancelar</Btn>
              <Btn onClick={crearGrupo} color="#10B981" full>Crear grupo</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PANTALLA NOTAS ───────────────────────────────────────────────────────────
function PantallaNotas({ grupos, setGrupos }) {
  const [grupoId, setGrupoId] = useState(grupos[0]?.id || "");
  const grupo = grupos.find(g => g.id === grupoId);
  const updNota = (aid, ev, val) => setGrupos(prev => prev.map(g => g.id === grupoId ? { ...g, alumnos: g.alumnos.map(a => a.id === aid ? { ...a, notas: { ...a.notas, [ev]: val } } : a) } : g));
  const media = (n) => { const v = ["ev1","ev2","ev3"].map(k => n[k]).filter(x => x !== "" && !isNaN(+x)).map(Number); return v.length ? (v.reduce((a,b)=>a+b,0)/v.length).toFixed(1) : null; };
  const cn = (n) => n === null ? "#475569" : +n >= 9 ? "#10B981" : +n >= 6 ? "#3B82F6" : +n >= 5 ? "#F59E0B" : "#EF4444";
  return (
    <div>
      <Sel value={grupoId} onChange={e => setGrupoId(e.target.value)} style={{ marginBottom: 12 }}>
        {grupos.map(g => <option key={g.id} value={g.id}>{g.emoji} {g.nombre}</option>)}
      </Sel>
      {grupo && <div style={{ background: "rgba(59,130,246,0.08)", borderRadius: 8, padding: "6px 12px", marginBottom: 12, fontSize: 11, color: "#60A5FA" }}>📖 {grupo.moduloActual}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 52px 52px 52px", gap: 4, padding: "4px 10px", marginBottom: 4 }}>
        <div style={{ fontSize: 10, color: "#475569", fontWeight: 700 }}>ALUMNO</div>
        {["1ª Ev","2ª Ev","3ª Ev","Media"].map(h => <div key={h} style={{ fontSize: 10, color: "#475569", fontWeight: 700, textAlign: "center" }}>{h}</div>)}
      </div>
      {!grupo || grupo.alumnos.length === 0
        ? <Card style={{ textAlign: "center", padding: 24 }}><div style={{ color: "#64748B" }}>Sin alumnos — añádelos en Grupos</div></Card>
        : grupo.alumnos.map(a => {
          const m = media(a.notas);
          return (
            <Card key={a.id} style={{ marginBottom: 6, padding: "10px 12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 52px 52px 52px", gap: 4, alignItems: "center" }}>
                <div style={{ fontSize: 12, color: "#E2E8F0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.nombre.split(" ")[0]}</div>
                {["ev1","ev2","ev3"].map(ev => (
                  <input key={ev} value={a.notas[ev]} onChange={e => updNota(a.id, ev, e.target.value)} placeholder="—" maxLength={4}
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "5px 2px", color: cn(a.notas[ev] !== "" ? +a.notas[ev] : null), fontSize: 13, fontWeight: 700, textAlign: "center", outline: "none", width: "100%", boxSizing: "border-box" }} />
                ))}
                <div style={{ textAlign: "center", fontWeight: 800, fontSize: 14, color: cn(m) }}>{m ?? "—"}</div>
              </div>
            </Card>
          );
        })}
      <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
        <div style={{ fontSize: 11, color: "#475569" }}>🟢 ≥9 · 🔵 ≥6 · 🟡 ≥5 · 🔴 &lt;5</div>
      </div>
    </div>
  );
}

// ─── PANTALLA FALTAS ──────────────────────────────────────────────────────────
function PantallaFaltas({ grupos, setGrupos }) {
  const [grupoId, setGrupoId] = useState(grupos[0]?.id || "");
  const [expandido, setExpandido] = useState(null);
  const [mesActivo, setMesActivo] = useState("oct");
  const [vista, setVista] = useState("mes");
  const grupo = grupos.find(g => g.id === grupoId);
  const mData = grupo ? (MODULOS_FP[grupo.ciclo]?.cursos[grupo.curso] || []).find(m => m.nombre === grupo.moduloActual) : null;
  const horas = mData?.horas || 100;
  const umbAviso = Math.round(horas * 0.10);
  const umbPerdida = Math.round(horas * 0.15);

  const estadoAlumno = (a) => {
    const f = a.faltas || 0;
    if (f >= umbPerdida) return { est: "perdida", color: "#EF4444", icon: "🚨", label: `PÉRDIDA EVAL. CONTINUA (≥${umbPerdida}h)` };
    if (f >= umbAviso) return { est: "aviso", color: "#F59E0B", icon: "⚠️", label: `AVISAR FAMILIA (≥${umbAviso}h)` };
    if (f > 0) return { est: "ok", color: "#60A5FA", icon: "📋", label: `${f}h acumuladas` };
    return { est: "limpio", color: "#10B981", icon: "✅", label: "Sin faltas" };
  };

  const cambiarFaltasMes = (id, mes, d) => setGrupos(prev => prev.map(g => g.id === grupoId ? {
    ...g, alumnos: g.alumnos.map(a => {
      if (a.id !== id) return a;
      const fm = { ...(a.faltasMes || {}) };
      fm[mes] = Math.max(0, (fm[mes] || 0) + d);
      return { ...a, faltasMes: fm, faltas: Object.values(fm).reduce((s, v) => s + v, 0) };
    })
  } : g));

  const alertas = grupo?.alumnos.filter(a => estadoAlumno(a).est === "aviso" || estadoAlumno(a).est === "perdida") || [];

  return (
    <div>
      <Sel value={grupoId} onChange={e => setGrupoId(e.target.value)} style={{ marginBottom: 10 }}>
        {grupos.map(g => <option key={g.id} value={g.id}>{g.emoji} {g.nombre}</option>)}
      </Sel>

      {grupo && (
        <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 11 }}>
          <span style={{ color: "#60A5FA", fontWeight: 700 }}>📋 Normativa LFP · {grupo.ciclo.toUpperCase()} · {mData?.nombre || grupo.moduloActual} ({horas}h)</span>
          <span style={{ color: "#F59E0B", marginLeft: 10 }}>⚠️ Aviso familia: {umbAviso}h (10%)</span>
          <span style={{ color: "#EF4444", marginLeft: 10 }}>🚨 Pérdida eval.: {umbPerdida}h (15%)</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {[{ id: "mes", label: "📅 Por mes" }, { id: "total", label: "📊 Total" }, { id: "alertas", label: `🚨 Alertas (${alertas.length})` }].map(v => (
          <button key={v.id} onClick={() => setVista(v.id)} style={{ flex: 1, background: vista === v.id ? (v.id === "alertas" ? "#EF4444" : "#3B82F6") : "rgba(255,255,255,0.07)", color: vista === v.id ? "#fff" : "#94A3B8", border: "none", borderRadius: 9, padding: "7px 4px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>{v.label}</button>
        ))}
      </div>

      {vista === "mes" && (
        <div style={{ display: "flex", gap: 4, overflowX: "auto", marginBottom: 10, paddingBottom: 4 }}>
          {MESES_CURSO.map(m => (
            <button key={m.id} onClick={() => setMesActivo(m.id)} style={{ flexShrink: 0, background: mesActivo === m.id ? m.color : "rgba(255,255,255,0.07)", color: mesActivo === m.id ? "#fff" : "#94A3B8", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>{m.label}</button>
          ))}
        </div>
      )}

      {!grupo || grupo.alumnos.length === 0
        ? <Card style={{ textAlign: "center", padding: 24 }}><div style={{ color: "#64748B" }}>Sin alumnos — añádelos en Grupos</div></Card>
        : vista === "alertas"
          ? alertas.length === 0
            ? <Card style={{ textAlign: "center", padding: 32 }}><div style={{ fontSize: 32 }}>✅</div><div style={{ color: "#10B981", fontWeight: 700, marginTop: 8 }}>Sin alertas activas</div></Card>
            : alertas.map(a => {
              const { color, icon, label } = estadoAlumno(a);
              const pct = Math.round((a.faltas || 0) / horas * 100);
              return (
                <Card key={a.id} style={{ marginBottom: 10, borderColor: color + "55", background: color + "0A" }}>
                  <div style={{ fontWeight: 700, color: "#F1F5F9", marginBottom: 4 }}>{icon} {a.nombre}</div>
                  <div style={{ fontSize: 12, color, fontWeight: 700, marginBottom: 6 }}>{label} · {pct}%</div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}><div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 3 }} /></div>
                  {a.faltas >= umbPerdida && <div style={{ marginTop: 8, padding: "6px 10px", background: "rgba(239,68,68,0.1)", borderRadius: 8, fontSize: 11, color: "#EF4444" }}>📋 Comunicar pérdida de evaluación continua. Derivar a prueba extraordinaria.</div>}
                  {a.faltas >= umbAviso && a.faltas < umbPerdida && <div style={{ marginTop: 8, padding: "6px 10px", background: "rgba(245,158,11,0.1)", borderRadius: 8, fontSize: 11, color: "#F59E0B" }}>📩 Comunicar a la familia por escrito en ÍTACA.</div>}
                </Card>
              );
            })
          : grupo.alumnos.map(a => {
            const { color, icon } = estadoAlumno(a);
            const fm = a.faltasMes || {};
            const pct = Math.round((a.faltas || 0) / horas * 100);
            return (
              <Card key={a.id} style={{ marginBottom: 8, padding: "12px 14px", borderLeft: `3px solid ${color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 13 }}>{a.nombre}</div>
                    <div style={{ fontSize: 11, color, marginTop: 1 }}>{icon} Total: {a.faltas || 0}h ({pct}%) {vista === "mes" && `· ${MESES_CURSO.find(m => m.id === mesActivo)?.label}: ${fm[mesActivo] || 0}h`}</div>
                    <div style={{ marginTop: 4, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}><div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 2 }} /></div>
                  </div>
                  {vista === "mes" ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <button onClick={() => cambiarFaltasMes(a.id, mesActivo, -1)} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(239,68,68,0.15)", color: "#EF4444", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: 17, fontWeight: 800, minWidth: 22, textAlign: "center", color }}>{fm[mesActivo] || 0}</span>
                      <button onClick={() => cambiarFaltasMes(a.id, mesActivo, 1)} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(59,130,246,0.15)", color: "#3B82F6", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  ) : (
                    <div style={{ fontWeight: 800, fontSize: 16, color }}>{a.faltas || 0}h</div>
                  )}
                  <button onClick={() => setExpandido(expandido === a.id ? null : a.id)} style={{ background: "rgba(255,255,255,0.07)", color: "#94A3B8", border: "none", borderRadius: 7, padding: "5px 8px", cursor: "pointer" }}>📝</button>
                </div>
                {vista === "total" && (
                  <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                    {MESES_CURSO.map(m => (fm[m.id] || 0) > 0 && <span key={m.id} style={{ background: m.color + "22", color: m.color, borderRadius: 5, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>{m.label}:{fm[m.id]}</span>)}
                  </div>
                )}
                {expandido === a.id && (
                  <textarea value={a.observaciones || ""} onChange={e => setGrupos(prev => prev.map(g => g.id === grupoId ? { ...g, alumnos: g.alumnos.map(al => al.id === a.id ? { ...al, observaciones: e.target.value } : al) } : g))} placeholder="Observaciones, motivos, contacto familia..." rows={2}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 10px", color: "#E2E8F0", fontSize: 12, resize: "none", outline: "none", boxSizing: "border-box", marginTop: 10 }} />
                )}
              </Card>
            );
          })
      }
    </div>
  );
}

// ─── PANTALLA BANCO DE RECURSOS ───────────────────────────────────────────────
const TIPOS_RECURSO = [
  { id: "examen", label: "Examen", icon: "📝", color: "#F59E0B" },
  { id: "practica", label: "Práctica", icon: "🔧", color: "#10B981" },
  { id: "ejercicios", label: "Ejercicios", icon: "⚡", color: "#3B82F6" },
  { id: "rebt", label: "Consulta REBT", icon: "📖", color: "#8B5CF6" },
  { id: "apuntes", label: "Apuntes", icon: "📋", color: "#6366F1" },
  { id: "programacion", label: "Programación", icon: "📄", color: "#EF4444" },
  { id: "mensaje", label: "Mensaje familia", icon: "✉️", color: "#0EA5E9" },
];

function PantallaBanco({ recursos, setRecursos, config }) {
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCiclo, setFiltroCiclo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [verRecurso, setVerRecurso] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [generando, setGenerando] = useState(false);
  const [modalNuevo, setModalNuevo] = useState(false);
  const [form, setForm] = useState({ tipo: "examen", ciclo: "cfgm", curso: "1º curso", modulo: "", solicitud: "" });

  const recursosFiltrados = (recursos || []).filter(r => {
    const matchTipo = filtroTipo === "todos" || r.tipo === filtroTipo;
    const matchCiclo = filtroCiclo === "todos" || r.ciclo === filtroCiclo;
    const matchBus = !busqueda || r.titulo.toLowerCase().includes(busqueda.toLowerCase()) || r.modulo?.toLowerCase().includes(busqueda.toLowerCase());
    return matchTipo && matchCiclo && matchBus;
  });

  const tipoData = (tipo) => TIPOS_RECURSO.find(t => t.id === tipo) || TIPOS_RECURSO[0];
  const modulosCurso = MODULOS_FP[form.ciclo]?.cursos[form.curso] || [];

  const SYSTEM_IA = `Eres un experto docente de FP especializado en Instalaciones Electrotécnicas y Sistemas Electrotécnicos (CFGB/CFGM/CFGS) y en el REBT (RD 842/2002) y todas sus ITC-BT.

Cuando generes recursos docentes sigue estas reglas OBLIGATORIAS:
1. El documento debe ser COMPLETO, DESARROLLADO y LISTO PARA USAR en clase, no solo un índice
2. Usa formato claro con secciones numeradas, ejemplos resueltos paso a paso, tablas y cuadros
3. Cita SIEMPRE la ITC-BT, artículo exacto, tabla o norma UNE que aplique
4. Para EXÁMENES: incluye enunciado completo, espacio para respuesta, criterios de corrección con puntuación por apartado y solución completa al final
5. Para PRÁCTICAS: objetivos, materiales con referencia comercial si aplica, EPI necesarios, esquema eléctrico en ASCII/texto, procedimiento numerado paso a paso con advertencias de seguridad, hoja de registro de medidas, criterios de evaluación con rúbrica
6. Para EJERCICIOS: enunciado con datos reales, dibujo esquemático si aplica, resolución detallada paso a paso con fórmulas, resultado numérico con unidades, comprobación
7. Para APUNTES/REBT: teoría completa con definiciones, ejemplos prácticos, cuadros resumen, fórmulas destacadas, casos reales
8. Para PROGRAMACIONES: desarrollo completo de TODOS los apartados según LO 3/2022 + RD 659/2023 + Orden 8/2025 GVA, con RA y CE reales del currículo oficial, NO solo el índice
9. Adapta el nivel: CFGB (básico/inicial), CFGM (técnico medio), CFGS (técnico superior avanzado)
Responde en español. El documento debe poder imprimirse directamente y usarse en clase.`;

  const generarRecurso = async () => {
    if (!form.solicitud.trim() || !form.modulo) return;
    setGenerando(true);
    const mData = modulosCurso.find(m => m.nombre === form.modulo);
    const td = tipoData(form.tipo);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: SYSTEM_IA,
          messages: [{ role: "user", content: `TIPO DE RECURSO: ${td.label}\nCICLO: ${MODULOS_FP[form.ciclo].label} — ${form.curso}\nMÓDULO: ${form.modulo}${mData ? ` (Cód. ${mData.cod}, ${mData.horas}h)` : ""}\n\nSOLICITUD: ${form.solicitud}\n\nGenera el recurso COMPLETO y DESARROLLADO, listo para usar en clase.` }],
        }),
      });
      const data = await res.json();
      if (data.error) { alert("⚠️ Error: " + data.error.message); setGenerando(false); return; }
      const contenido = data.content?.map(b => b.text || "").join("\n") || "";
      const titulo = `${td.label}: ${form.solicitud.slice(0, 50)}`;
      const nuevo = {
        id: Date.now(), tipo: form.tipo, icono: td.icon, colorTipo: td.color,
        titulo, ciclo: form.ciclo, curso: form.curso, modulo: form.modulo,
        solicitud: form.solicitud, contenido,
        fecha: new Date().toLocaleDateString("es-ES"),
        instituto: config.instituto || "IES L'Om — Picassent",
      };
      setRecursos(prev => [nuevo, ...(prev || [])]);
      setVerRecurso(nuevo);
      setModalNuevo(false);
      setForm({ tipo: "examen", ciclo: "cfgm", curso: "1º curso", modulo: "", solicitud: "" });
    } catch (e) { alert("⚠️ Error de conexión: " + e.message); }
    setGenerando(false);
  };

  const descargar = (r) => {
    const td = tipoData(r.tipo);
    const html = generarHTMLRecurso(r.titulo, r.contenido, r.ciclo, r.curso, r.tipo, r.modulo, r.instituto);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${r.titulo.replace(/[^\w\sáéíóúñ]/g,"_").slice(0,50)}.html`; a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => alert("📄 Abre el archivo HTML → Archivo → Imprimir → Guardar como PDF para obtener el PDF maquetado con colores."), 300);
  };

  if (verRecurso) {
    const td = tipoData(verRecurso.tipo);
    return (
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <button onClick={() => setVerRecurso(null)} style={{ background: "rgba(255,255,255,0.07)", color: "#94A3B8", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>← Banco</button>
          <button onClick={() => descargar(verRecurso)} style={{ flex: 1, background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>📄 Descargar → PDF</button>
          <button onClick={() => navigator.clipboard?.writeText(verRecurso.contenido)} style={{ flex: 1, background: "rgba(59,130,246,0.15)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>📋 Copiar</button>
          <button onClick={() => { setConfirmDelete(verRecurso.id); }} style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🗑️</button>
        </div>

        {confirmDelete && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#EF4444", fontWeight: 700, marginBottom: 10 }}>¿Eliminar este recurso permanentemente?</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn onClick={() => setConfirmDelete(null)} outline color="#64748B" full small>Cancelar</Btn>
              <Btn onClick={() => { setRecursos(prev => (prev || []).filter(r => r.id !== confirmDelete)); setVerRecurso(null); setConfirmDelete(null); }} color="#EF4444" full small>Sí, eliminar</Btn>
            </div>
          </div>
        )}

        {/* Header del recurso */}
        <div style={{ background: `linear-gradient(135deg, ${td.color}22, rgba(15,23,42,0.9))`, border: `1px solid ${td.color}44`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>{td.icon}</span>
            <div>
              <div style={{ fontWeight: 800, color: "#F1F5F9", fontSize: 14 }}>{verRecurso.titulo}</div>
              <div style={{ fontSize: 11, color: "#64748B" }}>{MODULOS_FP[verRecurso.ciclo]?.emoji} {verRecurso.ciclo.toUpperCase()} · {verRecurso.curso} · {verRecurso.modulo}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Badge color={td.color} small>{td.label}</Badge>
            <Badge color="#64748B" small>{verRecurso.fecha}</Badge>
          </div>
        </div>

        {/* Contenido */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 16 }}>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#CBD5E1", fontSize: 12.5, lineHeight: 1.75, fontFamily: "system-ui, sans-serif", margin: 0 }}>{verRecurso.contenido}</pre>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 800, color: "#F1F5F9", fontSize: 16 }}>📚 Banco de Recursos</div>
          <div style={{ fontSize: 11, color: "#64748B" }}>{(recursos || []).length} recursos guardados</div>
        </div>
        <button onClick={() => setModalNuevo(true)} style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          ✨ Crear recurso
        </button>
      </div>

      {/* Filtros */}
      <div style={{ marginBottom: 10 }}>
        <Inp value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="🔍 Buscar recursos..." style={{ marginBottom: 8 }} />
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
          <button onClick={() => setFiltroTipo("todos")} style={{ flexShrink: 0, background: filtroTipo === "todos" ? "#3B82F6" : "rgba(255,255,255,0.07)", color: filtroTipo === "todos" ? "#fff" : "#94A3B8", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>Todos</button>
          {TIPOS_RECURSO.map(t => (
            <button key={t.id} onClick={() => setFiltroTipo(filtroTipo === t.id ? "todos" : t.id)} style={{ flexShrink: 0, background: filtroTipo === t.id ? t.color : "rgba(255,255,255,0.07)", color: filtroTipo === t.id ? "#fff" : "#94A3B8", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista recursos */}
      {recursosFiltrados.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <div style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 8 }}>Banco de recursos vacío</div>
          <div style={{ color: "#64748B", fontSize: 13, marginBottom: 16 }}>Crea tu primer recurso con el botón ✨ Crear recurso</div>
          <button onClick={() => setModalNuevo(true)} style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>✨ Crear primer recurso</button>
        </Card>
      ) : (
        recursosFiltrados.map(r => {
          const td = tipoData(r.tipo);
          return (
            <div key={r.id} onClick={() => setVerRecurso(r)} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${td.color}33`, borderRadius: 12, padding: "12px 14px", marginBottom: 8, cursor: "pointer", transition: "background 0.15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: td.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `1px solid ${td.color}44`, flexShrink: 0 }}>{td.icon}</div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.titulo}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{MODULOS_FP[r.ciclo]?.emoji} {r.ciclo.toUpperCase()} · {r.modulo?.slice(0, 30)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <Badge color={td.color} small>{td.label}</Badge>
                  <div style={{ fontSize: 10, color: "#475569" }}>{r.fecha}</div>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Modal crear recurso */}
      {modalNuevo && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ background: "#0F172A", borderRadius: "20px 20px 0 0", padding: 24, width: "100%", maxWidth: 480, border: "1px solid rgba(255,255,255,0.1)", maxHeight: "92vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#F1F5F9" }}>✨ Crear recurso</div>
              <button onClick={() => setModalNuevo(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#94A3B8", cursor: "pointer" }}>✕</button>
            </div>

            {/* Tipo */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 8, fontWeight: 600 }}>TIPO DE RECURSO</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {TIPOS_RECURSO.map(t => (
                  <button key={t.id} onClick={() => setForm({ ...form, tipo: t.id })} style={{ background: form.tipo === t.id ? t.color : "rgba(255,255,255,0.07)", color: form.tipo === t.id ? "#fff" : "#94A3B8", border: "none", borderRadius: 9, padding: "7px 12px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ciclo y curso */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6, fontWeight: 600 }}>CICLO</div>
              <div style={{ display: "flex", gap: 8 }}>
                {Object.entries(MODULOS_FP).map(([k, v]) => (
                  <button key={k} onClick={() => setForm({ ...form, ciclo: k, modulo: "" })} style={{ flex: 1, background: form.ciclo === k ? v.color : "rgba(255,255,255,0.07)", color: form.ciclo === k ? "#fff" : "#94A3B8", border: "none", borderRadius: 10, padding: "8px 4px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>{v.emoji} {k.toUpperCase()}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {["1º curso","2º curso"].map(c => (
                <button key={c} onClick={() => setForm({ ...form, curso: c, modulo: "" })} style={{ flex: 1, background: form.curso === c ? MODULOS_FP[form.ciclo].color : "rgba(255,255,255,0.07)", color: form.curso === c ? "#fff" : "#94A3B8", border: "none", borderRadius: 10, padding: "8px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>{c}</button>
              ))}
            </div>

            {/* Módulo */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6, fontWeight: 600 }}>MÓDULO</div>
              <Sel value={form.modulo} onChange={e => setForm({ ...form, modulo: e.target.value })} style={{ fontSize: 12 }}>
                <option value="">— Selecciona módulo —</option>
                {modulosCurso.map(m => <option key={m.cod} value={m.nombre}>[{m.cod}] {m.nombre} ({m.horas}h)</option>)}
              </Sel>
            </div>

            {/* Solicitud */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6, fontWeight: 600 }}>DESCRIBE EL RECURSO</div>
              <textarea value={form.solicitud} onChange={e => setForm({ ...form, solicitud: e.target.value })} rows={4}
                placeholder={
                  form.tipo === "examen" ? "Ej: Examen sobre ITC-BT-19 (sección de conductores), 10 preguntas, con solución. Nivel CFGM 1º." :
                  form.tipo === "practica" ? "Ej: Práctica de montaje de cuadro de distribución doméstico con ICP, IGA, diferencial y 3 magnetotérmicos." :
                  form.tipo === "ejercicios" ? "Ej: 5 ejercicios de cálculo de sección de cable por caída de tensión según REBT, con solución paso a paso." :
                  form.tipo === "rebt" ? "Ej: Explicación completa de ITC-BT-18 (puesta a tierra), con esquemas TT/TN/IT, valores y ejemplos." :
                  form.tipo === "programacion" ? "Ej: Programación didáctica completa del módulo Automatismos industriales CFGM 1º, 8 unidades de trabajo." :
                  "Describe el recurso que necesitas generar..."
                }
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", color: "#E2E8F0", fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box" }} />
            </div>

            {/* Info de calidad */}
            <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: "10px 12px", marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#60A5FA", fontWeight: 700, marginBottom: 4 }}>✅ Calidad garantizada</div>
              <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.5 }}>
                El recurso generado incluirá: contenido completo desarrollado · ejemplos resueltos paso a paso · referencias exactas al REBT y normas UNE · criterios de evaluación · listo para imprimir y usar en clase
              </div>
            </div>

            <button onClick={generarRecurso} disabled={generando || !form.solicitud.trim() || !form.modulo} style={{
              width: "100%", background: generando || !form.solicitud.trim() || !form.modulo ? "rgba(255,255,255,0.07)" : "linear-gradient(135deg,#3B82F6,#8B5CF6)",
              color: generando || !form.solicitud.trim() || !form.modulo ? "#475569" : "#fff",
              border: "none", borderRadius: 12, padding: 14, fontWeight: 800, fontSize: 15, cursor: generando || !form.solicitud.trim() || !form.modulo ? "default" : "pointer",
            }}>
              {generando ? "⚡ Generando recurso completo..." : `${tipoData(form.tipo).icon} Generar ${tipoData(form.tipo).label}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PANTALLA PROGRAMACIÓN DIDÁCTICA ─────────────────────────────────────────
function PantallaProg({ config, recursos, setRecursos }) {
  const [ciclo, setCiclo] = useState("cfgm");
  const [curso, setCurso] = useState("1º curso");
  const [modulo, setModulo] = useState(MODULOS_FP["cfgm"].cursos["1º curso"][0].nombre);
  const [paso, setPaso] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");
  const [form, setForm] = useState({
    grupoDesc: "",
    contexto: `Instituto público de la Comunitat Valenciana, zona industrial de L'Horta Sud, con empresas del sector eléctrico en el entorno para FP Dual.`,
    nUnidades: "8",
    metodologia: "Aprendizaje basado en proyectos (ABP), prácticas de taller, aprendizaje cooperativo, resolución de problemas reales, FP Dual.",
    instrumentos: "Pruebas prácticas de taller (40%), pruebas escritas (30%), rúbricas de observación (20%), portfolio del alumno (10%).",
    atencionDiversidad: "Aplicación del Diseño Universal para el Aprendizaje (DUA) según RD 659/2023. Adaptaciones metodológicas conforme al Decreto 104/2018 GVA y Orden 20/2019 GVA.",
  });

  const modulosCurso = MODULOS_FP[ciclo].cursos[curso] || [];
  const moduloData = modulosCurso.find(m => m.nombre === modulo);
  const progGuardadas = (recursos || []).filter(r => r.tipo === "programacion");

  const PASOS = [
    { id: 0, titulo: "Módulo", icon: "📚" },
    { id: 1, titulo: "Contexto", icon: "🏫" },
    { id: 2, titulo: "Metodología", icon: "⚙️" },
    { id: 3, titulo: "Generar", icon: "✨" },
  ];

  const SYSTEM_PROG = `Eres un experto en elaboración de Programaciones Didácticas de Formación Profesional en España, especializado en electrotecnia.

NORMATIVA VIGENTE (cita artículos exactos en cada apartado):
- Ley Orgánica 3/2022, de 31 de marzo (LFP)
- Real Decreto 659/2023, de 18 de julio
- Real Decreto 498/2024
- Orden 8/2025, de 22 de abril, Conselleria d'Educació GVA
- Decreto 104/2018 GVA (equidad e inclusión)
- Orden 20/2019 GVA (respuesta educativa para la inclusión)
- REBT RD 842/2002 e ITC-BT correspondientes al módulo

INSTRUCCIÓN CRÍTICA: Debes generar la programación didáctica COMPLETA y TOTALMENTE DESARROLLADA. NO es suficiente un índice o esquema. Cada apartado debe estar completamente redactado con todo el contenido.

ESTRUCTURA COMPLETA OBLIGATORIA (desarrolla cada apartado completamente):

1. IDENTIFICACIÓN DEL MÓDULO
   - Datos completos: nombre, código, ciclo, nivel, familia profesional, horas totales, horas semanales, curso, centro, año escolar
   - Normativa aplicable completa con BOE/DOGV y fecha

2. CONTEXTUALIZACIÓN
   - Características del centro y entorno socioeconómico
   - Características del grupo-clase (número de alumnos, diversidad, motivación, nivel previo)
   - Relación con otras asignaturas y módulos (relaciones interdisciplinares)
   - Vinculación con el sector productivo y FP Dual

3. COMPETENCIAS
   - Competencia general del ciclo
   - Competencias profesionales, personales y sociales del módulo (lista completa)
   - Competencias para la empleabilidad
   - Vinculación con el Marco Europeo de Cualificaciones (EQF)

4. RESULTADOS DE APRENDIZAJE Y CRITERIOS DE EVALUACIÓN
   Desarrollar TODOS los RA del módulo según currículo oficial, para cada uno:
   - Texto completo del RA
   - Criterios de evaluación (a, b, c...) completos
   - Peso ponderado en la calificación final (%)
   - Instrumentos de evaluación específicos para ese RA

5. CONTENIDOS
   Organización por Unidades de Programación:
   Para CADA unidad de programación:
   - Número y título
   - RA que trabaja
   - Temporización (horas)
   - Contenidos específicos (conceptuales, procedimentales, actitudinales)
   - Actividades de enseñanza-aprendizaje
   - Actividades de evaluación

6. METODOLOGÍA DIDÁCTICA
   - Principios metodológicos (Art. 13 RD 659/2023)
   - Estrategias metodológicas activas: descripción y justificación
   - Secuencia didáctica de cada sesión tipo
   - Organización del espacio (aula, taller, empresa)
   - FP Dual: porcentaje y organización de la formación en empresa

7. EVALUACIÓN (Orden 8/2025 GVA)
   - Principios: continua, integradora, basada en RA (Art. 107 RD 659/2023)
   - Instrumentos de evaluación con descripción y porcentaje
   - Rúbricas de evaluación (al menos una desarrollada)
   - Criterios de calificación final del módulo
   - Evaluación ordinaria y extraordinaria
   - Pérdida de evaluación continua: umbrales (10% aviso / 15% pérdida)
   - Procedimiento de recuperación

8. ATENCIÓN A LA DIVERSIDAD (Decreto 104/2018 GVA)
   - Marco normativo desarrollado
   - Medidas de respuesta ordinaria
   - Medidas DUA: múltiples formas de representación, acción/expresión, implicación
   - Adaptaciones para alumnado NEAE
   - Protocolo de detección y respuesta

9. MATERIALES Y RECURSOS DIDÁCTICOS
   - Materiales fungibles y herramientas del taller (con especificaciones técnicas)
   - Equipos, instrumentos de medida y aparatos de maniobra
   - Recursos digitales y bibliografía (normas UNE, REBT, manuales técnicos)
   - Normativa de seguridad aplicable

10. ACTIVIDADES COMPLEMENTARIAS
    - Visitas a empresas del sector
    - Charlas de profesionales
    - Proyectos intermodulares
    - Participación en concursos o ferias de FP

11. PLAN DE MEJORA Y AUTOEVALUACIÓN DOCENTE

Responde en español. El documento final debe tener entre 3000 y 5000 palabras, completamente desarrollado, con nivel de detalle suficiente para presentarlo a la dirección del centro.`;

  const generar = async () => {
    setLoading(true);
    setResultado("");
    const prompt = `Genera una PROGRAMACIÓN DIDÁCTICA COMPLETA Y DESARROLLADA para:

MÓDULO: ${modulo}
CÓDIGO: ${moduloData?.cod || "—"} | HORAS: ${moduloData?.horas || "—"}h
CICLO: ${MODULOS_FP[ciclo].label} — ${curso}
CENTRO: ${config.instituto || "IES L'Om — Picassent"} · Picassent (Valencia)
CURSO ESCOLAR: ${config.curso || "2025-2026"}
HORAS SEMANALES APROXIMADAS: ${moduloData ? Math.round(moduloData.horas / 30) : "—"}
NÚMERO DE UNIDADES DE PROGRAMACIÓN: ${form.nUnidades}

DATOS DEL CONTEXTO:
- Grupo-clase: ${form.grupoDesc || "Grupo de FP heterogéneo en motivación y nivel previo"}
- Entorno del centro: ${form.contexto}

METODOLOGÍA: ${form.metodologia}
INSTRUMENTOS DE EVALUACIÓN: ${form.instrumentos}
ATENCIÓN A LA DIVERSIDAD: ${form.atencionDiversidad}

INSTRUCCIÓN: Genera la programación COMPLETA, desarrollando CADA apartado con todo el contenido. NO es un índice. Es el documento final listo para entregar. Incluye los RA y CE reales del módulo según el currículo oficial GVA/ceice.gva.es.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYSTEM_PROG, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      if (data.error) { alert("⚠️ " + data.error.message); setLoading(false); return; }
      const texto = data.content?.map(b => b.text || "").join("\n") || "";
      setResultado(texto);
      setPaso(3);
    } catch (e) { alert("⚠️ Error: " + e.message); }
    setLoading(false);
  };

  const guardar = () => {
    if (!resultado) return;
    const nuevo = {
      id: Date.now(), tipo: "programacion", icono: "📄", colorTipo: "#EF4444",
      titulo: `Programación: ${modulo.slice(0, 45)}`,
      ciclo, curso, modulo, solicitud: "Programación didáctica completa",
      contenido: resultado,
      fecha: new Date().toLocaleDateString("es-ES"),
      instituto: config.instituto || "IES L'Om — Picassent",
    };
    setRecursos(prev => [nuevo, ...(prev || [])]);
    alert("✅ Programación guardada en el Banco de Recursos");
  };

  const descargarProg = () => {
    if (!resultado) return;
    const titulo = `Programación Didáctica: ${modulo}`;
    const html = generarHTMLRecurso(titulo, resultado, ciclo, curso, "programacion", modulo, config.instituto);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `PD_${modulo.replace(/[^\w\sáéíóúñ]/g,"_").slice(0,40)}.html`; a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => alert("📄 Abre el HTML → Archivo → Imprimir → Guardar como PDF"), 300);
  };

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#1e3a5f,#0f172a)", borderRadius: 16, padding: "14px 16px", marginBottom: 16, border: "1px solid rgba(59,130,246,0.2)" }}>
        <div style={{ fontSize: 11, color: "#60A5FA", fontWeight: 700, marginBottom: 4 }}>NORMATIVA · LO 3/2022 + RD 659/2023 + Orden 8/2025 GVA</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#F1F5F9" }}>📄 Programación Didáctica Completa</div>
        <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>Documento completo desarrollado — todos los apartados</div>
      </div>

      {/* Historial de programaciones guardadas */}
      {progGuardadas.length > 0 && paso === 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 700, marginBottom: 8 }}>📁 PROGRAMACIONES GUARDADAS ({progGuardadas.length})</div>
          {progGuardadas.map(p => (
            <div key={p.id} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onClick={() => { setResultado(p.contenido); setPaso(3); }}>
              <div>
                <div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 12 }}>📄 {p.modulo?.slice(0, 40)}</div>
                <div style={{ fontSize: 11, color: "#64748B" }}>{MODULOS_FP[p.ciclo]?.emoji} {p.ciclo?.toUpperCase()} · {p.curso} · {p.fecha}</div>
              </div>
              <span style={{ color: "#94A3B8", fontSize: 14 }}>→</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 12, paddingTop: 12 }} />
        </div>
      )}

      {/* Wizard */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {PASOS.map((p, i) => (
          <div key={p.id} onClick={() => paso > i && setPaso(i)} style={{ flex: 1, textAlign: "center", cursor: paso > i ? "pointer" : "default" }}>
            <div style={{ width: "100%", height: 3, background: i <= paso ? "#3B82F6" : "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 4 }} />
            <div style={{ fontSize: 9, color: i <= paso ? "#3B82F6" : "#475569", fontWeight: i === paso ? 700 : 400 }}>{p.icon} {p.titulo}</div>
          </div>
        ))}
      </div>

      {/* Paso 0 */}
      {paso === 0 && (
        <div>
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 14, marginBottom: 14 }}>1. Selecciona el módulo</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6, fontWeight: 600 }}>CICLO</div>
            <div style={{ display: "flex", gap: 8 }}>
              {Object.entries(MODULOS_FP).map(([k, v]) => (
                <button key={k} onClick={() => { setCiclo(k); setCurso("1º curso"); setModulo(v.cursos["1º curso"][0].nombre); }} style={{ flex: 1, background: ciclo === k ? v.color : "rgba(255,255,255,0.07)", color: ciclo === k ? "#fff" : "#94A3B8", border: "none", borderRadius: 10, padding: "8px 4px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>{v.emoji} {k.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6, fontWeight: 600 }}>CURSO</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["1º curso","2º curso"].map(c => (
                <button key={c} onClick={() => { setCurso(c); setModulo(MODULOS_FP[ciclo].cursos[c][0].nombre); }} style={{ flex: 1, background: curso === c ? MODULOS_FP[ciclo].color : "rgba(255,255,255,0.07)", color: curso === c ? "#fff" : "#94A3B8", border: "none", borderRadius: 10, padding: "8px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6, fontWeight: 600 }}>MÓDULO</div>
            <Sel value={modulo} onChange={e => setModulo(e.target.value)} style={{ fontSize: 12 }}>
              {modulosCurso.map(m => <option key={m.cod} value={m.nombre}>[{m.cod}] {m.nombre} ({m.horas}h)</option>)}
            </Sel>
          </div>
          {moduloData && (
            <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#60A5FA", fontWeight: 700 }}>{MODULOS_FP[ciclo].emoji} {modulo}</div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 3 }}>Cód. {moduloData.cod} · {moduloData.horas}h · {Math.round(moduloData.horas/30)}h/semana</div>
            </div>
          )}
          <Btn onClick={() => setPaso(1)} color="#3B82F6" full>Siguiente →</Btn>
        </div>
      )}

      {/* Paso 1 */}
      {paso === 1 && (
        <div>
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 14, marginBottom: 14 }}>2. Contextualización</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 5, fontWeight: 600 }}>DESCRIPCIÓN DEL GRUPO</div>
              <textarea value={form.grupoDesc} onChange={e => setForm({ ...form, grupoDesc: e.target.value })} placeholder="Ej: 22 alumnos, heterogéneo en nivel previo, alta motivación hacia el taller, 3 alumnos NEAE..." rows={3}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", color: "#E2E8F0", fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 5, fontWeight: 600 }}>CONTEXTO DEL CENTRO</div>
              <textarea value={form.contexto} onChange={e => setForm({ ...form, contexto: e.target.value })} rows={3}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", color: "#E2E8F0", fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 5, fontWeight: 600 }}>NÚMERO DE UNIDADES DE PROGRAMACIÓN</div>
              <Sel value={form.nUnidades} onChange={e => setForm({ ...form, nUnidades: e.target.value })}>
                {["4","5","6","7","8","9","10","12"].map(n => <option key={n} value={n}>{n} unidades</option>)}
              </Sel>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Btn onClick={() => setPaso(0)} outline color="#64748B" full>← Atrás</Btn>
            <Btn onClick={() => setPaso(2)} color="#3B82F6" full>Siguiente →</Btn>
          </div>
        </div>
      )}

      {/* Paso 2 */}
      {paso === 2 && (
        <div>
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 14, marginBottom: 14 }}>3. Metodología y evaluación</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 5, fontWeight: 600 }}>METODOLOGÍA</div>
              <textarea value={form.metodologia} onChange={e => setForm({ ...form, metodologia: e.target.value })} rows={3}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", color: "#E2E8F0", fontSize: 12, resize: "none", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 5, fontWeight: 600 }}>INSTRUMENTOS DE EVALUACIÓN</div>
              <textarea value={form.instrumentos} onChange={e => setForm({ ...form, instrumentos: e.target.value })} rows={3}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", color: "#E2E8F0", fontSize: 12, resize: "none", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 5, fontWeight: 600 }}>ATENCIÓN A LA DIVERSIDAD</div>
              <textarea value={form.atencionDiversidad} onChange={e => setForm({ ...form, atencionDiversidad: e.target.value })} rows={2}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", color: "#E2E8F0", fontSize: 12, resize: "none", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#10B981", fontWeight: 700, marginBottom: 3 }}>ℹ️ Documento completo</div>
              <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.5 }}>Se generarán TODOS los apartados desarrollados: RA y CE reales del currículo oficial GVA, unidades de trabajo completas, rúbricas, recursos, actividades complementarias y más.</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Btn onClick={() => setPaso(1)} outline color="#64748B" full>← Atrás</Btn>
            <button onClick={generar} disabled={loading} style={{ flex: 2, background: loading ? "rgba(255,255,255,0.07)" : "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: loading ? "#475569" : "#fff", border: "none", borderRadius: 12, padding: 12, fontWeight: 800, cursor: loading ? "default" : "pointer" }}>
              {loading ? "⚡ Generando programación completa..." : "✨ Generar programación completa"}
            </button>
          </div>
        </div>
      )}

      {/* Paso 3: Resultado */}
      {paso === 3 && resultado && (
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            <button onClick={() => { setPaso(0); setResultado(""); }} style={{ flex: 1, minWidth: 60, background: "rgba(255,255,255,0.07)", color: "#94A3B8", border: "none", borderRadius: 10, padding: "9px", cursor: "pointer", fontWeight: 600, fontSize: 11 }}>← Nueva</button>
            <button onClick={guardar} style={{ flex: 1, minWidth: 80, background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "9px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>💾 Guardar</button>
            <button onClick={() => navigator.clipboard?.writeText(resultado)} style={{ flex: 1, minWidth: 60, background: "rgba(59,130,246,0.15)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 10, padding: "9px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>📋 Copiar</button>
            <button onClick={descargarProg} style={{ flex: 1, minWidth: 80, background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "9px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>📄 Descargar→PDF</button>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, color: "#3B82F6", fontWeight: 700, marginBottom: 8 }}>✅ PROGRAMACIÓN DIDÁCTICA COMPLETA · {modulo.slice(0,35)}</div>
            <div style={{ fontSize: 10, color: "#475569", marginBottom: 12 }}>{MODULOS_FP[ciclo].label} · {curso} · {config.instituto} · {config.curso}</div>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#CBD5E1", fontSize: 12, lineHeight: 1.75, fontFamily: "system-ui, sans-serif", margin: 0 }}>{resultado}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PANTALLA CALENDARIO ──────────────────────────────────────────────────────
function diasPara(fechaStr) {
  const meses = { ene:0, feb:1, mar:2, abr:3, may:4, jun:5, jul:6, ago:7, sep:8, oct:9, nov:10, dic:11 };
  const p = fechaStr.toLowerCase().split(" ");
  if (p.length < 3) return null;
  const d = parseInt(p[0]), m = meses[p[1]], y = parseInt(p[2]);
  if (isNaN(d) || m === undefined || isNaN(y)) return null;
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  return Math.round((new Date(y,m,d) - hoy) / 86400000);
}

function PantallaCal() {
  const [vista, setVista] = useState("proximos");
  const todos = [
    ...CAL.evaluaciones.map(e => ({ ...e, tipo: "eval", fecha: e.fecha })),
    ...CAL.examenes.map(e => ({ ...e, tipo: "examen", fecha: e.inicio })),
    ...CAL.claustros.map(c => ({ ...c, tipo: "claustro" })),
    ...CAL.periodos.map(p => ({ ...p, tipo: "vacaciones", fecha: p.inicio })),
  ].map(e => ({ ...e, dias: diasPara(e.fecha) })).filter(e => e.dias !== null && e.dias >= 0).sort((a,b) => a.dias - b.dias);

  const bgDias = (d) => d === 0 ? "#EF4444" : d <= 7 ? "#EF4444" : d <= 30 ? "#F59E0B" : "#64748B";

  return (
    <div>
      <div style={{ display: "flex", gap: 5, marginBottom: 14, overflowX: "auto" }}>
        {[{id:"proximos",l:"🔔 Próximos"},{id:"examenes",l:"📝 Exámenes"},{id:"claustros",l:"🏫 Claustros"},{id:"festivos",l:"📌 Festivos"}].map(t => (
          <button key={t.id} onClick={() => setVista(t.id)} style={{ flexShrink: 0, background: vista === t.id ? "linear-gradient(135deg,#3B82F6,#8B5CF6)" : "rgba(255,255,255,0.07)", color: vista === t.id ? "#fff" : "#94A3B8", border: "none", borderRadius: 10, padding: "7px 12px", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>{t.l}</button>
        ))}
      </div>

      <Card style={{ background: "linear-gradient(135deg,#0f2744,#1a1a2e)", marginBottom: 14, border: "1px solid rgba(59,130,246,0.2)" }}>
        <div style={{ fontSize: 11, color: "#60A5FA", fontWeight: 700, marginBottom: 4 }}>CALENDARIO GVA · IES L'OM · PICASSENT</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#F1F5F9" }}>Curso 2025 — 2026</div>
        <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
          <div style={{ fontSize: 11 }}><span style={{ color: "#10B981", fontWeight: 700 }}>Inicio:</span> <span style={{ color: "#94A3B8" }}>8 sep 2025</span></div>
          <div style={{ fontSize: 11 }}><span style={{ color: "#EF4444", fontWeight: 700 }}>Fin:</span> <span style={{ color: "#94A3B8" }}>19 jun 2026</span></div>
        </div>
      </Card>

      {vista === "proximos" && (
        <>
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 13, marginBottom: 10 }}>📅 Próximos eventos del curso</div>
          {todos.slice(0,10).map((e,i) => (
            <Card key={i} style={{ marginBottom: 8, padding: "12px 14px", borderLeft: `3px solid ${e.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 13 }}>{e.nombre}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{e.fecha}</div>
                </div>
                <div style={{ background: bgDias(e.dias) + "22", color: bgDias(e.dias), border: `1px solid ${bgDias(e.dias)}44`, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap" }}>
                  {e.dias === 0 ? "¡HOY!" : `${e.dias}d`}
                </div>
              </div>
            </Card>
          ))}
        </>
      )}

      {vista === "examenes" && (
        <>
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 13, marginBottom: 10 }}>📝 Semanas de exámenes y recuperaciones</div>
          {CAL.examenes.map((e,i) => {
            const d = diasPara(e.inicio);
            return (
              <Card key={i} style={{ marginBottom: 10, padding: "14px 16px", borderColor: e.color + "55", background: e.color + "08" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 13 }}>{e.nombre}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 3 }}>Del <span style={{ color: e.color, fontWeight: 600 }}>{e.inicio}</span> al <span style={{ color: e.color, fontWeight: 600 }}>{e.fin}</span></div>
                  </div>
                  {d !== null && d >= 0 && <Badge color={e.color}>{d === 0 ? "¡HOY!" : `${d}d`}</Badge>}
                </div>
              </Card>
            );
          })}
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 13, marginBottom: 10, marginTop: 14 }}>📊 Sesiones de evaluación</div>
          {CAL.evaluaciones.map((e,i) => (
            <Card key={i} style={{ marginBottom: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 13 }}>{e.nombre}</div>
              <Badge color={e.color}>{e.fecha}</Badge>
            </Card>
          ))}
        </>
      )}

      {vista === "claustros" && (
        <>
          <div style={{ fontWeight: 700, color: "#E2E8F0", fontSize: 13, marginBottom: 10 }}>🏫 Claustros y reuniones</div>
          {CAL.claustros.map((c,i) => {
            const d = diasPara(c.fecha);
            return (
              <Card key={i} style={{ marginBottom: 8, padding: "12px 14px", borderLeft: `3px solid ${c.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 13 }}>{c.nombre}</div>
                    <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{c.fecha}</div>
                  </div>
                  {d !== null && d >= 0 && <div style={{ background: bgDias(d) + "22", color: bgDias(d), borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{d === 0 ? "¡HOY!" : `${d}d`}</div>}
                </div>
              </Card>
            );
          })}
          <Card style={{ padding: 12, background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", marginTop: 8 }}>
            <div style={{ fontSize: 11, color: "#6366F1" }}>ℹ️ Confirma fechas exactas de claustros en el PGA del centro al inicio de curso.</div>
          </Card>
        </>
      )}

      {vista === "festivos" && (
        <>
          {CAL.festivos.map(f => (
            <Card key={f.nombre} style={{ marginBottom: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 13 }}>{f.emoji} {f.nombre}</div>
              <Badge color="#8B5CF6">{f.fecha}</Badge>
            </Card>
          ))}
          {CAL.periodos.map(p => (
            <Card key={p.nombre} style={{ marginBottom: 8, padding: "12px 16px", borderColor: p.color + "44" }}>
              <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 13 }}>{p.nombre}</div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 3 }}>Del {p.inicio} al {p.fin}</div>
            </Card>
          ))}
          <Card style={{ padding: 12, background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", marginTop: 8 }}>
            <div style={{ fontSize: 11, color: "#F59E0B" }}>🔥 Festivos locales Picassent: 16 mar (Fallas) y 10 jul (San Cristóbal)</div>
          </Card>
        </>
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("inicio");
  const [appLoaded, setAppLoaded] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const [grupos, setGrupos, gruposLoaded] = useStorage("pe_grupos_v4", GRUPOS_INIT);
  const [config, setConfig, configLoaded] = useStorage("pe_config_v4", { nombre: "", instituto: "IES L'Om — Picassent", curso: "2025-2026", localidad: "Picassent" });
  const [configDone, setConfigDone, configDoneLoaded] = useStorage("pe_done_v4", false);
  const [recursos, setRecursos, recursosLoaded] = useStorage("pe_recursos_v4", []);

  useEffect(() => {
    if (gruposLoaded && configLoaded && configDoneLoaded && recursosLoaded) setAppLoaded(true);
  }, [gruposLoaded, configLoaded, configDoneLoaded, recursosLoaded]);

  const setGruposGuard = (v) => { setGuardando(true); setGrupos(v); setTimeout(() => setGuardando(false), 1000); };
  const setRecursosGuard = (v) => { setGuardando(true); setRecursos(v); setTimeout(() => setGuardando(false), 1000); };

  if (!configDone) return <PantallaConfig config={config} setConfig={setConfig} onDone={() => setConfigDone(true)} />;

  const pantallas = {
    inicio: <PantallaInicio grupos={grupos} config={config} setConfig={setConfig} recursos={recursos} />,
    grupos: <PantallaGrupos grupos={grupos} setGrupos={setGruposGuard} />,
    notas: <PantallaNotas grupos={grupos} setGrupos={setGruposGuard} />,
    faltas: <PantallaFaltas grupos={grupos} setGrupos={setGruposGuard} />,
    banco: <PantallaBanco recursos={recursos} setRecursos={setRecursosGuard} config={config} />,
    prog: <PantallaProg config={config} recursos={recursos} setRecursos={setRecursosGuard} />,
    cal: <PantallaCal />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", color: "#F1F5F9", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(15,23,42,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "11px 16px 7px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#F1F5F9" }}>⚡ ProfeElectro</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {guardando && <div style={{ fontSize: 11, color: "#10B981", fontWeight: 700 }}>💾 Guardado</div>}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#60A5FA", fontWeight: 700 }}>{config.instituto}</div>
            <div style={{ fontSize: 9, color: "#475569" }}>{config.curso}</div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "14px 12px 88px" }}>{pantallas[tab]}</div>

      {/* Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(15,23,42,0.97)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", padding: "5px 0 9px" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "3px 0" }}>
            <div style={{ fontSize: 17, filter: tab === t.id ? "none" : "grayscale(1) opacity(0.35)", transform: tab === t.id ? "scale(1.15)" : "scale(1)", transition: "all 0.18s" }}>{t.icon}</div>
            <div style={{ fontSize: 8, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? "#3B82F6" : "#475569" }}>{t.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
