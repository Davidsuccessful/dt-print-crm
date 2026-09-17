if (rows) setLeads(rows);import { useState, useEffect, useMemo, useRef, useCallback } from "react";
if (rows) setLeads(rows);import Papa from "papaparse";
if (rows) setLeads(rows);
if (rows) setLeads(rows);// Supabase integration
if (rows) setLeads(rows);const SUPABASE_URL = "https://schuvtwhwzvtczrvlncj.supabase.co";
if (rows) setLeads(rows);const SUPABASE_KEY = "sb_publishable_As95AsUHcyTa5LBk_zzMVQ_RsqJwv3C";
if (rows) setLeads(rows);
if (rows) setLeads(rows);const supabase = {
if (rows) setLeads(rows);  async fetch(method, table, { eq = null, select = "*", data = null } = {}) {
if (rows) setLeads(rows);    let url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}`;
if (rows) setLeads(rows);    if (eq) url += `&id=eq.${eq}`;
if (rows) setLeads(rows);    const opts = {
if (rows) setLeads(rows);      method,
if (rows) setLeads(rows);      headers: {
if (rows) setLeads(rows);        "Content-Type": "application/json",
if (rows) setLeads(rows);        apikey: SUPABASE_KEY,
if (rows) setLeads(rows);        Authorization: `Bearer ${SUPABASE_KEY}`,
if (rows) setLeads(rows);      },
if (rows) setLeads(rows);    };
if (rows) setLeads(rows);    if (data) opts.body = JSON.stringify(data);
if (rows) setLeads(rows);    const r = await fetch(url, opts);
if (rows) setLeads(rows);    if (!r.ok) throw new Error(`Supabase: ${r.status}`);
if (rows) setLeads(rows);    return method === "DELETE" ? null : await r.json();
if (rows) setLeads(rows);  },
if (rows) setLeads(rows);  async list(table) { return this.fetch("GET", table); },
if (rows) setLeads(rows);  async insert(table, data) { return this.fetch("POST", table, { data }); },
if (rows) setLeads(rows);  async update(table, id, data) { return this.fetch("PATCH", `${table}?id=eq.${id}`, { data }); },
if (rows) setLeads(rows);  async delete(table, id) { return this.fetch("DELETE", `${table}?id=eq.${id}`); },
if (rows) setLeads(rows);};
if (rows) setLeads(rows);
if (rows) setLeads(rows);const STORE_KEY = "adt-crm-v1";
if (rows) setLeads(rows);
if (rows) setLeads(rows);const STAGES = [
if (rows) setLeads(rows);  { id: "new", label: "Новий", short: "Новий", color: "#34598A" },
if (rows) setLeads(rows);  { id: "contacted", label: "Зв'язались", short: "Контакт", color: "#6E8595" },
if (rows) setLeads(rows);  { id: "qualified", label: "Кваліфіковано", short: "Кваліф.", color: "#B8862B" },
if (rows) setLeads(rows);  { id: "proposal", label: "КП надіслано", short: "КП", color: "#8C6239" },
if (rows) setLeads(rows);  { id: "negotiation", label: "Переговори", short: "Перемови", color: "#2E3439" },
if (rows) setLeads(rows);  { id: "won", label: "Угода", short: "Угода", color: "#4E7043" },
if (rows) setLeads(rows);];
if (rows) setLeads(rows);const LOST = { id: "lost", label: "Відмова", short: "Відмова", color: "#9A958E" };
if (rows) setLeads(rows);const ALL_ST = [...STAGES, LOST];
if (rows) setLeads(rows);const statusOf = (id) => ALL_ST.find((s) => s.id === id) || STAGES[0];
if (rows) setLeads(rows);
if (rows) setLeads(rows);const SOURCES = [
if (rows) setLeads(rows);  { id: "instagram", label: "Instagram", short: "IG" },
if (rows) setLeads(rows);  { id: "facebook", label: "Facebook", short: "FB" },
if (rows) setLeads(rows);  { id: "meta", label: "Meta Ads", short: "META" },
if (rows) setLeads(rows);  { id: "landing", label: "Лендінг", short: "LP" },
if (rows) setLeads(rows);  { id: "site", label: "Сайт", short: "WEB" },
if (rows) setLeads(rows);  { id: "telegram", label: "Telegram", short: "TG" },
if (rows) setLeads(rows);  { id: "call", label: "Дзвінок", short: "TEL" },
if (rows) setLeads(rows);  { id: "referral", label: "Рекомендація", short: "REF" },
if (rows) setLeads(rows);  { id: "other", label: "Інше", short: "ІНШЕ" },
if (rows) setLeads(rows);];
if (rows) setLeads(rows);const srcOf = (id) => SOURCES.find((s) => s.id === id) || SOURCES[SOURCES.length - 1];
if (rows) setLeads(rows);
if (rows) setLeads(rows);const SEGMENTS = [
if (rows) setLeads(rows);  { id: "unknown", label: "Не визначено" },
if (rows) setLeads(rows);  { id: "developer", label: "Забудовник" },
if (rows) setLeads(rows);  { id: "contractor", label: "Генпідрядник" },
if (rows) setLeads(rows);  { id: "architect", label: "Архітектор" },
if (rows) setLeads(rows);  { id: "landscape", label: "Ландшафтний дизайнер" },
if (rows) setLeads(rows);  { id: "horeca", label: "HoReCa" },
if (rows) setLeads(rows);  { id: "private", label: "Приватний клієнт" },
if (rows) setLeads(rows);];
if (rows) setLeads(rows);const segLabel = (id) => (SEGMENTS.find((s) => s.id === id) || SEGMENTS[0]).label;
if (rows) setLeads(rows);
if (rows) setLeads(rows);const PRODUCTS = ["Лавки", "Вазони", "Фонтани", "Архітектурні форми", "Індивідуальний проєкт"];
if (rows) setLeads(rows);const LOST_REASONS = ["Дорого", "Не на часі", "Обрали іншого", "Не відповідає", "Нецільовий"];
if (rows) setLeads(rows);
if (rows) setLeads(rows);/* ---------- helpers ---------- */
if (rows) setLeads(rows);const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
if (rows) setLeads(rows);const digitsOf = (p) => (p || "").replace(/\D/g, "");
if (rows) setLeads(rows);const phoneKey = (p) => { const d = digitsOf(p); return d.length >= 9 ? d.slice(-9) : ""; };
if (rows) setLeads(rows);const intlPhone = (p) => { const d = digitsOf(p); return d.length === 10 && d[0] === "0" ? "38" + d : d; };
if (rows) setLeads(rows);const pad = (n) => String(n).padStart(2, "0");
if (rows) setLeads(rows);const fmtMoney = (n) => (n ? new Intl.NumberFormat("uk-UA").format(n) + " ₴" : "—");
if (rows) setLeads(rows);const fmtDate = (ts) => { const d = new Date(ts); return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(-2)}`; };
if (rows) setLeads(rows);const fmtTime = (ts) => { const d = new Date(ts); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
if (rows) setLeads(rows);const sameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();
if (rows) setLeads(rows);const fmtWhen = (ts, now) => {
if (rows) setLeads(rows);  if (sameDay(ts, now)) return `сьогодні ${fmtTime(ts)}`;
if (rows) setLeads(rows);  if (sameDay(ts, now + 864e5)) return `завтра ${fmtTime(ts)}`;
if (rows) setLeads(rows);  if (sameDay(ts, now - 864e5)) return `вчора ${fmtTime(ts)}`;
if (rows) setLeads(rows);  return `${fmtDate(ts)} ${fmtTime(ts)}`;
if (rows) setLeads(rows);};
if (rows) setLeads(rows);const toLocalInput = (ts) => {
if (rows) setLeads(rows);  if (!ts) return "";
if (rows) setLeads(rows);  const d = new Date(ts);
if (rows) setLeads(rows);  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
if (rows) setLeads(rows);};
if (rows) setLeads(rows);const dur = (ms) => {
if (rows) setLeads(rows);  const m = Math.max(0, Math.round(ms / 60000));
if (rows) setLeads(rows);  if (m < 60) return `${m} хв`;
if (rows) setLeads(rows);  const h = Math.floor(m / 60);
if (rows) setLeads(rows);  if (h < 24) return `${h} год${m % 60 ? ` ${m % 60} хв` : ""}`;
if (rows) setLeads(rows);  return `${Math.floor(h / 24)} дн`;
if (rows) setLeads(rows);};
if (rows) setLeads(rows);const rel = (ts, now) => {
if (rows) setLeads(rows);  const m = Math.round((now - ts) / 60000);
if (rows) setLeads(rows);  if (m < 1) return "щойно";
if (rows) setLeads(rows);  if (m < 60) return `${m} хв тому`;
if (rows) setLeads(rows);  const h = Math.floor(m / 60);
if (rows) setLeads(rows);  if (h < 24) return `${h} год тому`;
if (rows) setLeads(rows);  const d = Math.floor(h / 24);
if (rows) setLeads(rows);  if (d === 1) return "вчора";
if (rows) setLeads(rows);  if (d < 7) return `${d} дн тому`;
if (rows) setLeads(rows);  return fmtDate(ts);
if (rows) setLeads(rows);};
if (rows) setLeads(rows);
if (rows) setLeads(rows);/* Що потребує дії: саме це не дає лідам губитися */
if (rows) setLeads(rows);function attention(l, now) {
if (rows) setLeads(rows);  if (l.status === "won" || l.status === "lost") return null;
if (rows) setLeads(rows);  if (l.status === "new") {
if (rows) setLeads(rows);    const age = now - l.createdAt;
if (rows) setLeads(rows);    return age > 15 * 60000
if (rows) setLeads(rows);      ? { level: 2, text: `Без відповіді ${dur(age)}` }
if (rows) setLeads(rows);      : { level: 1, text: "Новий: зателефонуйте протягом 15 хв" };
if (rows) setLeads(rows);  }
if (rows) setLeads(rows);  if (l.nextAt && l.nextAt < now) return { level: 2, text: `Прострочено: ${fmtWhen(l.nextAt, now)}` };
if (rows) setLeads(rows);  if (!l.nextAt) return { level: 1, text: "Не заплановано наступний крок" };
if (rows) setLeads(rows);  return null;
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);const matchQ = (l, q) => {
if (rows) setLeads(rows);  if (!q) return true;
if (rows) setLeads(rows);  const s = `${l.name} ${l.phone} ${l.email || ""} ${l.campaign || ""} ${l.city || ""} ${l.owner || ""}`.toLowerCase();
if (rows) setLeads(rows);  if (s.includes(q.toLowerCase())) return true;
if (rows) setLeads(rows);  const d = digitsOf(q);
if (rows) setLeads(rows);  return d.length >= 3 && digitsOf(l.phone).includes(d);
if (rows) setLeads(rows);};
if (rows) setLeads(rows);
if (rows) setLeads(rows);/* ---------- Meta CSV import ---------- */
if (rows) setLeads(rows);const META_SYS = /^(id|created_time|ad_id|ad_name|adset_id|adset_name|campaign_id|campaign_name|form_id|form_name|is_organic|platform|lead_status|inbox_url)$/i;
if (rows) setLeads(rows);
if (rows) setLeads(rows);async function readTable(file) {
if (rows) setLeads(rows);  const buf = await file.arrayBuffer();
if (rows) setLeads(rows);  const b = new Uint8Array(buf);
if (rows) setLeads(rows);  let enc = "utf-8";
if (rows) setLeads(rows);  if (b[0] === 0xff && b[1] === 0xfe) enc = "utf-16le";
if (rows) setLeads(rows);  else if (b[0] === 0xfe && b[1] === 0xff) enc = "utf-16be";
if (rows) setLeads(rows);  else if (b.length > 3 && b[1] === 0 && b[3] === 0) enc = "utf-16le";
if (rows) setLeads(rows);  const text = new TextDecoder(enc).decode(buf).replace(/^\uFEFF/, "");
if (rows) setLeads(rows);  return Papa.parse(text, { header: true, skipEmptyLines: true, transformHeader: (h) => h.trim() }).data;
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function rowToLead(row) {
if (rows) setLeads(rows);  const used = new Set();
if (rows) setLeads(rows);  const take = (regs) => {
if (rows) setLeads(rows);    const keys = Object.keys(row);
if (rows) setLeads(rows);    for (const r of regs) for (const k of keys) {
if (rows) setLeads(rows);      if (r.test(k)) { const v = String(row[k] ?? "").trim(); if (v) { used.add(k); return v; } }
if (rows) setLeads(rows);    }
if (rows) setLeads(rows);    return "";
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);  let name = take([/^full[_\s]?name$/i, /^(name|ім.?я|имя|піб|фио)$/i, /^first[_\s]?name$/i]);
if (rows) setLeads(rows);  const last = take([/^last[_\s]?name$/i, /^прізвище$/i]);
if (rows) setLeads(rows);  if (last && !name.includes(last)) name = `${name} ${last}`.trim();
if (rows) setLeads(rows);  const phone = take([/phone/i, /телефон/i, /^номер/i]).replace(/^p:\s*/i, "");
if (rows) setLeads(rows);  const email = take([/e-?mail/i, /пошта|почта/i]);
if (rows) setLeads(rows);  const createdRaw = take([/^created[_\s]?time$/i, /^(date|дата|created)$/i]);
if (rows) setLeads(rows);  const platform = take([/^platform$/i]).toLowerCase();
if (rows) setLeads(rows);  const campaign = take([/^campaign[_\s]?name$/i, /кампан/i]);
if (rows) setLeads(rows);  const adName = take([/^ad[_\s]?name$/i]);
if (rows) setLeads(rows);  const city = take([/city|місто|город/i]);
if (rows) setLeads(rows);  if (!name && !phone && !email) return null;
if (rows) setLeads(rows);
if (rows) setLeads(rows);  let createdAt = Date.parse(createdRaw.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
if (rows) setLeads(rows);  if (isNaN(createdAt)) createdAt = Date.now();
if (rows) setLeads(rows);  const source = /^(ig|instagram)$/.test(platform) ? "instagram" : /^(fb|facebook)$/.test(platform) ? "facebook" : "meta";
if (rows) setLeads(rows);  const answers = Object.entries(row)
if (rows) setLeads(rows);    .filter(([k, v]) => !used.has(k) && !META_SYS.test(k) && String(v ?? "").trim())
if (rows) setLeads(rows);    .map(([k, v]) => `${k.replace(/_/g, " ").trim()}: ${String(v).trim()}`);
if (rows) setLeads(rows);  const now = Date.now();
if (rows) setLeads(rows);  return {
if (rows) setLeads(rows);    id: uid(), name, phone, email, telegram: "", city, source,
if (rows) setLeads(rows);    campaign: [campaign, adName].filter(Boolean).join(" / "),
if (rows) setLeads(rows);    segment: "unknown", products: [], budget: 0, owner: "",
if (rows) setLeads(rows);    status: "new", maxStage: 0, createdAt, updatedAt: now, contactedAt: null,
if (rows) setLeads(rows);    nextAt: null, nextNote: "", lostReason: "",
if (rows) setLeads(rows);    history: [
if (rows) setLeads(rows);      { id: uid(), at: now, kind: "status", text: "Імпортовано з CSV (Meta)" },
if (rows) setLeads(rows);      ...(answers.length ? [{ id: uid(), at: now, kind: "note", text: "Відповіді з форми:\n" + answers.join("\n") }] : []),
if (rows) setLeads(rows);    ],
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);/* ---------- Telegram import (формат бота Leads AdtPrint) ---------- */
if (rows) setLeads(rows);const RE_DT = /^(\d{1,2})\.(\d{1,2})\.(\d{2,4})[,\s]+(\d{1,2}):(\d{2})(?::\d{2})?$/;
if (rows) setLeads(rows);const RE_D = /^\d{1,2}\.\d{1,2}\.\d{2,4}$/;
if (rows) setLeads(rows);const RE_TGPREFIX = /^\[\d{1,2}\.\d{1,2}\.\d{2,4}[,\s]+\d{1,2}:\d{2}(?::\d{2})?\]\s*[^:]{1,60}:\s*/;
if (rows) setLeads(rows);const PLACEHOLDER = /^(номер|телефон|phone|-|—)$/i;
if (rows) setLeads(rows);const isPhone = (s) => /^[+\d][\d\s()\-]{8,}$/.test(s) && digitsOf(s).length >= 9;
if (rows) setLeads(rows);
if (rows) setLeads(rows);function segFromText(s) {
if (rows) setLeads(rows);  const t = (s || "").toLowerCase();
if (rows) setLeads(rows);  if (/приват|будинок|котедж|дача/.test(t)) return "private";
if (rows) setLeads(rows);  if (/жк|житлов|забудов|девелоп/.test(t)) return "developer";
if (rows) setLeads(rows);  if (/підряд/.test(t)) return "contractor";
if (rows) setLeads(rows);  if (/ландшафт/.test(t)) return "landscape";
if (rows) setLeads(rows);  if (/архіт|дизайн/.test(t)) return "architect";
if (rows) setLeads(rows);  if (/кафе|ресторан|готел|horeca|комерц/.test(t)) return "horeca";
if (rows) setLeads(rows);  return "unknown";
if (rows) setLeads(rows);}
if (rows) setLeads(rows);/* відповідь клієнта у формі важливіша за аудиторію групи оголошень */
if (rows) setLeads(rows);const tgSeg = (p) => p.answers.map(segFromText).find((x) => x !== "unknown") || segFromText(p.adset);
if (rows) setLeads(rows);
if (rows) setLeads(rows);function parseTelegram(text) {
if (rows) setLeads(rows);  const lines = text.split(/\r?\n/).map((s) => s.replace(RE_TGPREFIX, "").trim());
if (rows) setLeads(rows);  const out = [];
if (rows) setLeads(rows);  let adset = "", ad = "", expectAd = false;
if (rows) setLeads(rows);  for (let i = 0; i < lines.length; i++) {
if (rows) setLeads(rows);    const s = lines[i];
if (rows) setLeads(rows);    if (!s) continue;
if (rows) setLeads(rows);    const m = s.match(RE_DT);
if (rows) setLeads(rows);    if (m) {
if (rows) setLeads(rows);      const [, dd, mm, yy, hh, mi] = m;
if (rows) setLeads(rows);      const year = yy.length === 2 ? 2000 + +yy : +yy;
if (rows) setLeads(rows);      const createdAt = new Date(year, +mm - 1, +dd, +hh, +mi).getTime();
if (rows) setLeads(rows);      const body = [];
if (rows) setLeads(rows);      let j = i + 1;
if (rows) setLeads(rows);      for (; j < lines.length; j++) {
if (rows) setLeads(rows);        const t = lines[j];
if (rows) setLeads(rows);        if (!t) { if (body.length) break; continue; }
if (rows) setLeads(rows);        if (RE_DT.test(t) || RE_D.test(t) || t.includes("|") || /^leads\b/i.test(t)) break;
if (rows) setLeads(rows);        body.push(t);
if (rows) setLeads(rows);      }
if (rows) setLeads(rows);      i = j - 1;
if (rows) setLeads(rows);      expectAd = false;
if (rows) setLeads(rows);      if (!body.length) continue;
if (rows) setLeads(rows);      const phone = body.find(isPhone) || "";
if (rows) setLeads(rows);      const rest = body.filter((t) => t !== phone && !PLACEHOLDER.test(t));
if (rows) setLeads(rows);      const name = rest.shift() || "";
if (rows) setLeads(rows);      out.push({ createdAt, name, phone, adset, ad, answers: rest });
if (rows) setLeads(rows);      continue;
if (rows) setLeads(rows);    }
if (rows) setLeads(rows);    if (s.includes("|")) { adset = s; ad = ""; expectAd = true; continue; }
if (rows) setLeads(rows);    if (expectAd && !RE_D.test(s) && !/^leads\b/i.test(s)) { ad = s; expectAd = false; }
if (rows) setLeads(rows);  }
if (rows) setLeads(rows);  return out;
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function tgToLead(p) {
if (rows) setLeads(rows);  const now = Date.now();
if (rows) setLeads(rows);  return {
if (rows) setLeads(rows);    id: uid(), name: p.name, phone: p.phone, email: "", telegram: "", city: "", source: "meta",
if (rows) setLeads(rows);    campaign: [p.adset, p.ad && `оголошення ${p.ad}`].filter(Boolean).join(" / "),
if (rows) setLeads(rows);    segment: tgSeg(p), products: [], budget: 0, owner: "",
if (rows) setLeads(rows);    status: "new", maxStage: 0, createdAt: p.createdAt, updatedAt: now, contactedAt: null,
if (rows) setLeads(rows);    nextAt: null, nextNote: "", lostReason: "",
if (rows) setLeads(rows);    history: [
if (rows) setLeads(rows);      { id: uid(), at: now, kind: "status", text: "Імпортовано з Telegram" },
if (rows) setLeads(rows);      ...(p.answers.length ? [{ id: uid(), at: now, kind: "note", text: "Відповідь з форми: " + p.answers.join(", ") }] : []),
if (rows) setLeads(rows);    ],
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);const keysOf = (l) => [
if (rows) setLeads(rows);  phoneKey(l.phone),
if (rows) setLeads(rows);  (l.email || "").toLowerCase(),
if (rows) setLeads(rows);  l.name ? `${l.name.toLowerCase()}|${Math.round(l.createdAt / 60000)}` : "",
if (rows) setLeads(rows);].filter(Boolean);
if (rows) setLeads(rows);
if (rows) setLeads(rows);/* ---------- demo ---------- */
if (rows) setLeads(rows);function demoLeads() {
if (rows) setLeads(rows);  const now = Date.now(), H = 36e5, D = 864e5;
if (rows) setLeads(rows);  const mk = (o) => {
if (rows) setLeads(rows);    const idx = STAGES.findIndex((s) => s.id === o.status);
if (rows) setLeads(rows);    return {
if (rows) setLeads(rows);      id: uid(), email: "", telegram: "", city: "", campaign: "", owner: "", nextAt: null, nextNote: "",
if (rows) setLeads(rows);      budget: 0, products: [], segment: "unknown", lostReason: "", updatedAt: now,
if (rows) setLeads(rows);      maxStage: idx < 0 ? 1 : idx,
if (rows) setLeads(rows);      contactedAt: o.status === "new" ? null : o.createdAt + 20 * 60000,
if (rows) setLeads(rows);      history: [{ id: uid(), at: o.createdAt, kind: "status", text: "Демо-лід" }],
if (rows) setLeads(rows);      ...o,
if (rows) setLeads(rows);    };
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);  return [
if (rows) setLeads(rows);    mk({ name: "Олена Коваль", phone: "+380671234567", source: "instagram", campaign: "Вазони / Reels", segment: "private", products: ["Вазони"], status: "new", createdAt: now - 40 * 60000 }),
if (rows) setLeads(rows);    mk({ name: "Максим", phone: "+380985554433", source: "facebook", status: "new", createdAt: now - 5 * 60000 }),
if (rows) setLeads(rows);    mk({ name: "ТОВ «Житлобуд-Центр»", phone: "+380503332211", source: "facebook", campaign: "Благоустрій ЖК", segment: "developer", products: ["Лавки", "Вазони"], budget: 420000, status: "proposal", createdAt: now - 3 * D, nextAt: now - 2 * H, owner: "Андрій", nextNote: "Уточнити, чи отримали КП" }),
if (rows) setLeads(rows);    mk({ name: "Ірина, студія Green Line", phone: "+380937778899", source: "instagram", segment: "landscape", products: ["Архітектурні форми"], status: "qualified", createdAt: now - D, nextAt: now + 20 * H, owner: "Андрій", nextNote: "Надіслати каталог кольорів" }),
if (rows) setLeads(rows);    mk({ name: "Кав'ярня «Бетон»", phone: "+380661112233", source: "landing", segment: "horeca", products: ["Вазони", "Лавки"], budget: 85000, status: "negotiation", createdAt: now - 6 * D, nextAt: now + 2 * D, owner: "Марія" }),
if (rows) setLeads(rows);    mk({ name: "Бюро «Контур»", phone: "+380442223344", source: "site", segment: "architect", products: ["Індивідуальний проєкт"], status: "contacted", createdAt: now - 2 * D, owner: "Марія" }),
if (rows) setLeads(rows);    mk({ name: "ЖК «Сонячний»", phone: "+380675556677", source: "referral", segment: "developer", products: ["Лавки", "Фонтани"], budget: 1250000, status: "won", createdAt: now - 14 * D, owner: "Андрій" }),
if (rows) setLeads(rows);    mk({ name: "Сергій", phone: "+380631234000", source: "instagram", segment: "private", products: ["Лавки"], status: "lost", lostReason: "Дорого", createdAt: now - 9 * D, maxStage: 3 }),
if (rows) setLeads(rows);  ];
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);/* ---------- UI pieces ---------- */
if (rows) setLeads(rows);function Field({ label, children, as }) {
if (rows) setLeads(rows);  const T = as === "div" ? "div" : "label";
if (rows) setLeads(rows);  return <T className="fld"><span>{label}</span>{children}</T>;
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function LeadRow({ l, now, onOpen }) {
if (rows) setLeads(rows);  const st = statusOf(l.status);
if (rows) setLeads(rows);  const at = attention(l, now);
if (rows) setLeads(rows);  const meta = [st.label, l.segment !== "unknown" ? segLabel(l.segment) : "", (l.products || []).join(", ")].filter(Boolean).join(", ");
if (rows) setLeads(rows);  return (
if (rows) setLeads(rows);    <button className="row" onClick={onOpen}>
if (rows) setLeads(rows);      <span className="row-bar sw" style={{ backgroundColor: st.color }} />
if (rows) setLeads(rows);      <span className="row-main">
if (rows) setLeads(rows);        <span className="row-name">{l.name || l.phone || "Без імені"}</span>
if (rows) setLeads(rows);        <span className="row-meta"><span className="src">{srcOf(l.source).short}</span>{meta}</span>
if (rows) setLeads(rows);        {at ? <span className={`att lv${at.level}`}>{at.text}</span>
if (rows) setLeads(rows);          : l.nextAt ? <span className="next">Наступний крок: {fmtWhen(l.nextAt, now)}</span> : null}
if (rows) setLeads(rows);      </span>
if (rows) setLeads(rows);      <span className="row-side">
if (rows) setLeads(rows);        <span>{rel(l.createdAt, now)}</span>
if (rows) setLeads(rows);        {l.budget ? <b>{fmtMoney(l.budget)}</b> : null}
if (rows) setLeads(rows);        {l.owner ? <span>{l.owner}</span> : null}
if (rows) setLeads(rows);      </span>
if (rows) setLeads(rows);    </button>
if (rows) setLeads(rows);  );
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function Board({ leads, now, open }) {
if (rows) setLeads(rows);  return (
if (rows) setLeads(rows);    <div className="board">
if (rows) setLeads(rows);      {ALL_ST.map((s) => {
if (rows) setLeads(rows);        const items = leads.filter((l) => l.status === s.id).sort((a, b) => b.createdAt - a.createdAt);
if (rows) setLeads(rows);        const sum = items.reduce((a, l) => a + (l.budget || 0), 0);
if (rows) setLeads(rows);        return (
if (rows) setLeads(rows);          <div className="col" key={s.id}>
if (rows) setLeads(rows);            <div className="col-head">
if (rows) setLeads(rows);              <span className="col-sw sw" style={{ backgroundColor: s.color }} />
if (rows) setLeads(rows);              <b>{s.label}</b><span className="muted">{items.length}</span>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);            {sum > 0 && <div className="muted">Сума: {fmtMoney(sum)}</div>}
if (rows) setLeads(rows);            {items.map((l) => {
if (rows) setLeads(rows);              const at = attention(l, now);
if (rows) setLeads(rows);              return (
if (rows) setLeads(rows);                <button key={l.id} className="card" onClick={() => open(l.id)}>
if (rows) setLeads(rows);                  <b>{l.name || l.phone || "Без імені"}</b>
if (rows) setLeads(rows);                  <span className="muted">{srcOf(l.source).label}{l.budget ? `, ${fmtMoney(l.budget)}` : ""}</span>
if (rows) setLeads(rows);                  {at && <span className={`att lv${at.level}`}>{at.text}</span>}
if (rows) setLeads(rows);                </button>
if (rows) setLeads(rows);              );
if (rows) setLeads(rows);            })}
if (rows) setLeads(rows);            {!items.length && <p className="muted col-empty">Порожньо</p>}
if (rows) setLeads(rows);          </div>
if (rows) setLeads(rows);        );
if (rows) setLeads(rows);      })}
if (rows) setLeads(rows);    </div>
if (rows) setLeads(rows);  );
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function Stats({ leads, now }) {
if (rows) setLeads(rows);  const [period, setPeriod] = useState(30);
if (rows) setLeads(rows);  const L = period ? leads.filter((l) => now - l.createdAt <= period * 864e5) : leads;
if (rows) setLeads(rows);  const won = L.filter((l) => l.status === "won");
if (rows) setLeads(rows);  const lost = L.filter((l) => l.status === "lost");
if (rows) setLeads(rows);  const wonSum = won.reduce((a, l) => a + (l.budget || 0), 0);
if (rows) setLeads(rows);  const conv = L.length ? Math.round((won.length / L.length) * 100) : 0;
if (rows) setLeads(rows);  const resp = L.filter((l) => l.contactedAt).map((l) => l.contactedAt - l.createdAt).sort((a, b) => a - b);
if (rows) setLeads(rows);  const median = resp.length ? resp[Math.floor(resp.length / 2)] : null;
if (rows) setLeads(rows);  const funnel = STAGES.map((s, i) => ({ ...s, n: L.filter((l) => (l.maxStage || 0) >= i).length }));
if (rows) setLeads(rows);  const bySrc = SOURCES.map((s) => {
if (rows) setLeads(rows);    const xs = L.filter((l) => l.source === s.id);
if (rows) setLeads(rows);    return { ...s, n: xs.length, won: xs.filter((l) => l.status === "won").length };
if (rows) setLeads(rows);  }).filter((s) => s.n).sort((a, b) => b.n - a.n);
if (rows) setLeads(rows);  const reasons = LOST_REASONS.map((r) => ({ r, n: lost.filter((l) => l.lostReason === r).length })).filter((x) => x.n);
if (rows) setLeads(rows);  const maxSrc = Math.max(1, ...bySrc.map((s) => s.n));
if (rows) setLeads(rows);
if (rows) setLeads(rows);  return (
if (rows) setLeads(rows);    <div className="stats">
if (rows) setLeads(rows);      <div className="chips" style={{ marginBottom: 14 }}>
if (rows) setLeads(rows);        {[[7, "7 днів"], [30, "30 днів"], [90, "90 днів"], [0, "Весь час"]].map(([v, t]) => (
if (rows) setLeads(rows);          <button key={v} className={`chip ${period === v ? "on" : ""}`} onClick={() => setPeriod(v)}>{t}</button>
if (rows) setLeads(rows);        ))}
if (rows) setLeads(rows);      </div>
if (rows) setLeads(rows);      <div className="kpis">
if (rows) setLeads(rows);        <div className="kpi"><b>{L.length}</b><span>лідів</span></div>
if (rows) setLeads(rows);        <div className="kpi"><b>{won.length}</b><span>угод, конверсія {conv}%</span></div>
if (rows) setLeads(rows);        <div className="kpi"><b>{fmtMoney(wonSum)}</b><span>сума угод</span></div>
if (rows) setLeads(rows);        <div className="kpi"><b>{median === null ? "—" : dur(median)}</b><span>медіана до першого контакту</span></div>
if (rows) setLeads(rows);      </div>
if (rows) setLeads(rows);
if (rows) setLeads(rows);      <h3>Воронка</h3>
if (rows) setLeads(rows);      <div className="bars">
if (rows) setLeads(rows);        {funnel.map((s) => (
if (rows) setLeads(rows);          <div className="bar-row" key={s.id}>
if (rows) setLeads(rows);            <span>{s.label}</span>
if (rows) setLeads(rows);            <span className="bar"><i className="sw" style={{ width: `${L.length ? (s.n / L.length) * 100 : 0}%`, backgroundColor: s.color }} /></span>
if (rows) setLeads(rows);            <b>{s.n}</b>
if (rows) setLeads(rows);          </div>
if (rows) setLeads(rows);        ))}
if (rows) setLeads(rows);      </div>
if (rows) setLeads(rows);
if (rows) setLeads(rows);      <h3>Джерела</h3>
if (rows) setLeads(rows);      <div className="bars">
if (rows) setLeads(rows);        {bySrc.length ? bySrc.map((s) => (
if (rows) setLeads(rows);          <div className="bar-row" key={s.id}>
if (rows) setLeads(rows);            <span>{s.label}</span>
if (rows) setLeads(rows);            <span className="bar"><i style={{ width: `${(s.n / maxSrc) * 100}%`, backgroundColor: "#6E8595" }} /></span>
if (rows) setLeads(rows);            <span className="muted">{s.n} / угод {s.won}</span>
if (rows) setLeads(rows);          </div>
if (rows) setLeads(rows);        )) : <p className="muted">За цей період лідів немає.</p>}
if (rows) setLeads(rows);      </div>
if (rows) setLeads(rows);
if (rows) setLeads(rows);      {reasons.length > 0 && (<>
if (rows) setLeads(rows);        <h3>Причини відмов</h3>
if (rows) setLeads(rows);        <div className="bars">
if (rows) setLeads(rows);          {reasons.map((x) => (
if (rows) setLeads(rows);            <div className="bar-row" key={x.r}>
if (rows) setLeads(rows);              <span>{x.r}</span>
if (rows) setLeads(rows);              <span className="bar"><i style={{ width: `${(x.n / lost.length) * 100}%`, backgroundColor: "#9A958E" }} /></span>
if (rows) setLeads(rows);              <b>{x.n}</b>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          ))}
if (rows) setLeads(rows);        </div>
if (rows) setLeads(rows);      </>)}
if (rows) setLeads(rows);    </div>
if (rows) setLeads(rows);  );
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function LeadDetail({ l, now, onClose, patch, changeStatus, addNote, remove }) {
if (rows) setLeads(rows);  const [note, setNote] = useState("");
if (rows) setLeads(rows);  const [askLost, setAskLost] = useState(false);
if (rows) setLeads(rows);  const [confirmDel, setConfirmDel] = useState(false);
if (rows) setLeads(rows);  const cur = STAGES.findIndex((s) => s.id === l.status);
if (rows) setLeads(rows);  const tel = intlPhone(l.phone);
if (rows) setLeads(rows);  const at = attention(l, now);
if (rows) setLeads(rows);  const at10 = (days) => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(10, 0, 0, 0); return d.getTime(); };
if (rows) setLeads(rows);  const quick = [
if (rows) setLeads(rows);    ["Через 1 год", () => Date.now() + 36e5],
if (rows) setLeads(rows);    ["Завтра 10:00", () => at10(1)],
if (rows) setLeads(rows);    ["Через 3 дні", () => at10(3)],
if (rows) setLeads(rows);    ["Через тиждень", () => at10(7)],
if (rows) setLeads(rows);  ];
if (rows) setLeads(rows);  const set = (k) => (e) => patch(l.id, { [k]: e.target.value });
if (rows) setLeads(rows);
if (rows) setLeads(rows);  return (
if (rows) setLeads(rows);    <div className="sheet-wrap" onClick={onClose}>
if (rows) setLeads(rows);      <aside className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={l.name || "Лід"}>
if (rows) setLeads(rows);        <div className="sheet-head">
if (rows) setLeads(rows);          <button className="ghost" onClick={onClose}>Закрити</button>
if (rows) setLeads(rows);          <span className="muted">Створено {fmtWhen(l.createdAt, now)}</span>
if (rows) setLeads(rows);        </div>
if (rows) setLeads(rows);        <div className="sheet-body">
if (rows) setLeads(rows);          <input className="title-input" value={l.name} onChange={set("name")} placeholder="Ім'я або компанія" />
if (rows) setLeads(rows);          {at && <div className={`att lv${at.level} big`}>{at.text}</div>}
if (rows) setLeads(rows);          {tel && (
if (rows) setLeads(rows);            <div className="contact">
if (rows) setLeads(rows);              <a className="btn dark" href={`tel:+${tel}`}>Подзвонити</a>
if (rows) setLeads(rows);              <a className="btn" href={`viber://chat?number=%2B${tel}`}>Viber</a>
if (rows) setLeads(rows);              <a className="btn" href={`https://wa.me/${tel}`} target="_blank" rel="noreferrer">WhatsApp</a>
if (rows) setLeads(rows);              {l.telegram && <a className="btn" href={`https://t.me/${l.telegram.replace(/^@/, "")}`} target="_blank" rel="noreferrer">Telegram</a>}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          )}
if (rows) setLeads(rows);
if (rows) setLeads(rows);          <section className="sec">
if (rows) setLeads(rows);            <h3>Етап</h3>
if (rows) setLeads(rows);            <div className="steps">
if (rows) setLeads(rows);              {STAGES.map((s, i) => {
if (rows) setLeads(rows);                const reached = l.status !== "lost" && i <= cur;
if (rows) setLeads(rows);                return (
if (rows) setLeads(rows);                  <button key={s.id} className={`step ${l.status === s.id ? "cur" : ""}`} onClick={() => changeStatus(l.id, s.id)} aria-pressed={l.status === s.id} title={s.label}>
if (rows) setLeads(rows);                    <span className={`step-sw ${reached ? "sw" : ""}`} style={{ backgroundColor: reached ? s.color : "transparent", borderColor: s.color }} />
if (rows) setLeads(rows);                    <span className="step-l">{s.short}</span>
if (rows) setLeads(rows);                  </button>
if (rows) setLeads(rows);                );
if (rows) setLeads(rows);              })}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);            <div style={{ marginTop: 12 }}>
if (rows) setLeads(rows);              {l.status === "lost" ? (
if (rows) setLeads(rows);                <p className="lost-note">Відмова{l.lostReason ? `: ${l.lostReason}` : ""}. Натисніть етап, щоб повернути лід у роботу.</p>
if (rows) setLeads(rows);              ) : !askLost ? (
if (rows) setLeads(rows);                <button className="link" onClick={() => setAskLost(true)}>Позначити відмову</button>
if (rows) setLeads(rows);              ) : (
if (rows) setLeads(rows);                <div className="chips">
if (rows) setLeads(rows);                  {LOST_REASONS.map((r) => (
if (rows) setLeads(rows);                    <button key={r} className="chip" onClick={() => { changeStatus(l.id, "lost", r); setAskLost(false); }}>{r}</button>
if (rows) setLeads(rows);                  ))}
if (rows) setLeads(rows);                  <button className="chip" onClick={() => setAskLost(false)}>Скасувати</button>
if (rows) setLeads(rows);                </div>
if (rows) setLeads(rows);              )}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          </section>
if (rows) setLeads(rows);
if (rows) setLeads(rows);          {l.status !== "won" && l.status !== "lost" && (
if (rows) setLeads(rows);            <section className="sec">
if (rows) setLeads(rows);              <h3>Наступний крок</h3>
if (rows) setLeads(rows);              <div className="chips">
if (rows) setLeads(rows);                {quick.map(([t, fn]) => <button key={t} className="chip" onClick={() => patch(l.id, { nextAt: fn() })}>{t}</button>)}
if (rows) setLeads(rows);              </div>
if (rows) setLeads(rows);              <div className="inline">
if (rows) setLeads(rows);                <input type="datetime-local" value={toLocalInput(l.nextAt)} onChange={(e) => patch(l.id, { nextAt: e.target.value ? new Date(e.target.value).getTime() : null })} />
if (rows) setLeads(rows);                {l.nextAt && <button className="ghost" onClick={() => patch(l.id, { nextAt: null })}>Прибрати</button>}
if (rows) setLeads(rows);              </div>
if (rows) setLeads(rows);              <input value={l.nextNote || ""} onChange={set("nextNote")} placeholder="Що зробити: передзвонити, надіслати КП…" />
if (rows) setLeads(rows);            </section>
if (rows) setLeads(rows);          )}
if (rows) setLeads(rows);
if (rows) setLeads(rows);          <section className="sec">
if (rows) setLeads(rows);            <h3>Дані клієнта</h3>
if (rows) setLeads(rows);            <div className="grid2">
if (rows) setLeads(rows);              <Field label="Телефон"><input type="tel" value={l.phone} onChange={set("phone")} /></Field>
if (rows) setLeads(rows);              <Field label="Email"><input type="email" value={l.email || ""} onChange={set("email")} /></Field>
if (rows) setLeads(rows);              <Field label="Telegram / Instagram"><input value={l.telegram || ""} onChange={set("telegram")} placeholder="@нік" /></Field>
if (rows) setLeads(rows);              <Field label="Місто"><input value={l.city || ""} onChange={set("city")} /></Field>
if (rows) setLeads(rows);              <Field label="Хто клієнт">
if (rows) setLeads(rows);                <select value={l.segment} onChange={set("segment")}>{SEGMENTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
if (rows) setLeads(rows);              </Field>
if (rows) setLeads(rows);              <Field label="Бюджет, ₴">
if (rows) setLeads(rows);                <input inputMode="numeric" value={l.budget || ""} onChange={(e) => patch(l.id, { budget: Number(e.target.value.replace(/\D/g, "")) || 0 })} />
if (rows) setLeads(rows);              </Field>
if (rows) setLeads(rows);              <Field label="Джерело">
if (rows) setLeads(rows);                <select value={l.source} onChange={set("source")}>{SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
if (rows) setLeads(rows);              </Field>
if (rows) setLeads(rows);              <Field label="Відповідальний"><input list="owners" value={l.owner || ""} onChange={set("owner")} /></Field>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);            <div style={{ marginTop: 10 }}>
if (rows) setLeads(rows);              <Field label="Кампанія / оголошення"><input value={l.campaign || ""} onChange={set("campaign")} /></Field>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);            <div style={{ marginTop: 10 }}>
if (rows) setLeads(rows);              <Field label="Що цікавить" as="div">
if (rows) setLeads(rows);                <div className="chips">
if (rows) setLeads(rows);                  {PRODUCTS.map((p) => {
if (rows) setLeads(rows);                    const on = (l.products || []).includes(p);
if (rows) setLeads(rows);                    return (
if (rows) setLeads(rows);                      <button key={p} className={`chip ${on ? "on" : ""}`} aria-pressed={on}
if (rows) setLeads(rows);                        onClick={() => patch(l.id, { products: on ? l.products.filter((x) => x !== p) : [...(l.products || []), p] })}>{p}</button>
if (rows) setLeads(rows);                    );
if (rows) setLeads(rows);                  })}
if (rows) setLeads(rows);                </div>
if (rows) setLeads(rows);              </Field>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          </section>
if (rows) setLeads(rows);
if (rows) setLeads(rows);          <section className="sec">
if (rows) setLeads(rows);            <h3>Історія та нотатки</h3>
if (rows) setLeads(rows);            <div className="note-add">
if (rows) setLeads(rows);              <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Результат дзвінка, розміри, кількість, терміни…" />
if (rows) setLeads(rows);              <button className="btn dark" disabled={!note.trim()} onClick={() => { addNote(l.id, note.trim()); setNote(""); }}>Додати нотатку</button>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);            <ol className="hist">
if (rows) setLeads(rows);              {[...(l.history || [])].reverse().map((h) => (
if (rows) setLeads(rows);                <li key={h.id} className={h.kind}>
if (rows) setLeads(rows);                  <span className="muted">{fmtWhen(h.at, now)}</span>
if (rows) setLeads(rows);                  <p>{h.text}</p>
if (rows) setLeads(rows);                </li>
if (rows) setLeads(rows);              ))}
if (rows) setLeads(rows);            </ol>
if (rows) setLeads(rows);          </section>
if (rows) setLeads(rows);
if (rows) setLeads(rows);          <div className="danger">
if (rows) setLeads(rows);            {!confirmDel ? (
if (rows) setLeads(rows);              <button className="link" onClick={() => setConfirmDel(true)}>Видалити лід</button>
if (rows) setLeads(rows);            ) : (<>
if (rows) setLeads(rows);              <span>Видалити без можливості відновлення?</span>
if (rows) setLeads(rows);              <button className="btn alert" onClick={() => remove(l.id)}>Видалити</button>
if (rows) setLeads(rows);              <button className="ghost" onClick={() => setConfirmDel(false)}>Скасувати</button>
if (rows) setLeads(rows);            </>)}
if (rows) setLeads(rows);          </div>
if (rows) setLeads(rows);        </div>
if (rows) setLeads(rows);      </aside>
if (rows) setLeads(rows);    </div>
if (rows) setLeads(rows);  );
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function AddLead({ leads, onClose, onSave, onOpen }) {
if (rows) setLeads(rows);  const [f, setF] = useState({ name: "", phone: "", email: "", telegram: "", source: "instagram", campaign: "", segment: "unknown", products: [], budget: "", owner: "", comment: "" });
if (rows) setLeads(rows);  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
if (rows) setLeads(rows);  const dup = useMemo(() => { const k = phoneKey(f.phone); return k ? leads.find((l) => phoneKey(l.phone) === k) : null; }, [f.phone, leads]);
if (rows) setLeads(rows);  const can = f.name.trim() || digitsOf(f.phone).length >= 9;
if (rows) setLeads(rows);
if (rows) setLeads(rows);  return (
if (rows) setLeads(rows);    <div className="sheet-wrap" onClick={onClose}>
if (rows) setLeads(rows);      <aside className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Новий лід">
if (rows) setLeads(rows);        <div className="sheet-head"><b>Новий лід</b><button className="ghost" onClick={onClose}>Скасувати</button></div>
if (rows) setLeads(rows);        <div className="sheet-body form">
if (rows) setLeads(rows);          <Field label="Ім'я або компанія"><input autoFocus value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
if (rows) setLeads(rows);          <Field label="Телефон"><input type="tel" inputMode="tel" placeholder="+380…" value={f.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
if (rows) setLeads(rows);          {dup && (
if (rows) setLeads(rows);            <div className="att lv1">Цей номер уже є в базі: {dup.name || "без імені"}.{" "}
if (rows) setLeads(rows);              <button className="link" onClick={() => onOpen(dup.id)}>Відкрити картку</button>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          )}
if (rows) setLeads(rows);          <Field label="Джерело" as="div">
if (rows) setLeads(rows);            <div className="chips">
if (rows) setLeads(rows);              {SOURCES.map((s) => <button key={s.id} className={`chip ${f.source === s.id ? "on" : ""}`} onClick={() => set("source", s.id)}>{s.label}</button>)}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          </Field>
if (rows) setLeads(rows);          <Field label="Хто клієнт">
if (rows) setLeads(rows);            <select value={f.segment} onChange={(e) => set("segment", e.target.value)}>{SEGMENTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
if (rows) setLeads(rows);          </Field>
if (rows) setLeads(rows);          <Field label="Що цікавить" as="div">
if (rows) setLeads(rows);            <div className="chips">
if (rows) setLeads(rows);              {PRODUCTS.map((p) => {
if (rows) setLeads(rows);                const on = f.products.includes(p);
if (rows) setLeads(rows);                return <button key={p} className={`chip ${on ? "on" : ""}`} onClick={() => set("products", on ? f.products.filter((x) => x !== p) : [...f.products, p])}>{p}</button>;
if (rows) setLeads(rows);              })}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          </Field>
if (rows) setLeads(rows);          <div className="grid2">
if (rows) setLeads(rows);            <Field label="Бюджет, ₴"><input inputMode="numeric" value={f.budget} onChange={(e) => set("budget", e.target.value.replace(/\D/g, ""))} /></Field>
if (rows) setLeads(rows);            <Field label="Відповідальний"><input list="owners" value={f.owner} onChange={(e) => set("owner", e.target.value)} /></Field>
if (rows) setLeads(rows);            <Field label="Email"><input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
if (rows) setLeads(rows);            <Field label="Telegram / Instagram"><input value={f.telegram} onChange={(e) => set("telegram", e.target.value)} placeholder="@нік" /></Field>
if (rows) setLeads(rows);          </div>
if (rows) setLeads(rows);          <Field label="Кампанія або оголошення"><input value={f.campaign} onChange={(e) => set("campaign", e.target.value)} /></Field>
if (rows) setLeads(rows);          <Field label="Коментар"><textarea rows={3} value={f.comment} onChange={(e) => set("comment", e.target.value)} placeholder="Що попросив клієнт, розміри, терміни…" /></Field>
if (rows) setLeads(rows);          <button className="btn dark wide" disabled={!can} onClick={() => onSave(f)}>Зберегти лід</button>
if (rows) setLeads(rows);          {!can && <p className="muted" style={{ margin: 0 }}>Вкажіть ім'я або телефон.</p>}
if (rows) setLeads(rows);        </div>
if (rows) setLeads(rows);      </aside>
if (rows) setLeads(rows);    </div>
if (rows) setLeads(rows);  );
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);function PasteImport({ onClose, onImport }) {
if (rows) setLeads(rows);  const [text, setText] = useState("");
if (rows) setLeads(rows);  const parsed = useMemo(() => parseTelegram(text), [text]);
if (rows) setLeads(rows);  return (
if (rows) setLeads(rows);    <div className="sheet-wrap" onClick={onClose}>
if (rows) setLeads(rows);      <aside className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Імпорт з Telegram">
if (rows) setLeads(rows);        <div className="sheet-head"><b>Імпорт з Telegram</b><button className="ghost" onClick={onClose}>Скасувати</button></div>
if (rows) setLeads(rows);        <div className="sheet-body form">
if (rows) setLeads(rows);          <p className="muted" style={{ margin: 0 }}>Виділіть повідомлення бота з лідами, скопіюйте й вставте сюди. Дублікати буде пропущено.</p>
if (rows) setLeads(rows);          <textarea rows={8} autoFocus value={text} onChange={(e) => setText(e.target.value)}
if (rows) setLeads(rows);            placeholder={"10.09.2026 13:38\nСергій\n+380…\nприватний_об'єкт"} />
if (rows) setLeads(rows);          {text.trim() && (parsed.length ? (
if (rows) setLeads(rows);            <div className="preview">
if (rows) setLeads(rows);              {parsed.map((p, i) => (
if (rows) setLeads(rows);                <div key={i} className="pv">
if (rows) setLeads(rows);                  <b>{p.name || "Без імені"}</b>
if (rows) setLeads(rows);                  <span className="muted">{p.phone || "без телефону"}, {fmtDate(p.createdAt)} {fmtTime(p.createdAt)}</span>
if (rows) setLeads(rows);                  <span className="muted">{segLabel(tgSeg(p))}{p.ad ? `, оголошення ${p.ad}` : ""}{p.answers.length ? `, відповідь: ${p.answers.join(", ")}` : ""}</span>
if (rows) setLeads(rows);                </div>
if (rows) setLeads(rows);              ))}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          ) : (
if (rows) setLeads(rows);            <p className="att lv1" style={{ margin: 0 }}>Лідів не знайдено. Кожен лід має починатися з рядка дати й часу, наприклад 10.09.2026 13:38.</p>
if (rows) setLeads(rows);          ))}
if (rows) setLeads(rows);          <button className="btn dark wide" disabled={!parsed.length} onClick={() => onImport(parsed.map(tgToLead))}>
if (rows) setLeads(rows);            Імпортувати{parsed.length ? ` ${parsed.length}` : ""}
if (rows) setLeads(rows);          </button>
if (rows) setLeads(rows);        </div>
if (rows) setLeads(rows);      </aside>
if (rows) setLeads(rows);    </div>
if (rows) setLeads(rows);  );
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);/* ---------- App ---------- */
if (rows) setLeads(rows);export default function App() {
if (rows) setLeads(rows);  const [leads, setLeads] = useState([]);
if (rows) setLeads(rows);  const [loaded, setLoaded] = useState(false);
if (rows) setLeads(rows);  const [saveState, setSaveState] = useState("idle");
if (rows) setLeads(rows);  const [view, setView] = useState("list");
if (rows) setLeads(rows);  const [q, setQ] = useState("");
if (rows) setLeads(rows);  const [statusF, setStatusF] = useState("active");
if (rows) setLeads(rows);  const [sourceF, setSourceF] = useState("all");
if (rows) setLeads(rows);  const [onlyAtt, setOnlyAtt] = useState(false);
if (rows) setLeads(rows);  const [openId, setOpenId] = useState(null);
if (rows) setLeads(rows);  const [adding, setAdding] = useState(false);
if (rows) setLeads(rows);  const [pasting, setPasting] = useState(false);
if (rows) setLeads(rows);  const [toastMsg, setToastMsg] = useState("");
if (rows) setLeads(rows);  const [now, setNow] = useState(Date.now());
if (rows) setLeads(rows);  const fileRef = useRef(null);
if (rows) setLeads(rows);  const toastT = useRef(null);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const toast = (m) => { setToastMsg(m); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToastMsg(""), 3200); };
if (rows) setLeads(rows);
if (rows) setLeads(rows);  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  useEffect(() => {
if (rows) setLeads(rows);    (async () => {
if (rows) setLeads(rows);      try {
if (rows) setLeads(rows);        const rows = await supabase.list("leads");
if (rows) setLeads(rows);        if (r && r.value) setLeads(JSON.parse(r.value).leads || []);
if (rows) setLeads(rows);      } catch (e) { /* ще немає даних */ }
if (rows) setLeads(rows);      setLoaded(true);
if (rows) setLeads(rows);    })();
if (rows) setLeads(rows);  }, []);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  useEffect(() => {
if (rows) setLeads(rows);    if (!loaded) return;
    setSaveState("saving");
    const t = setTimeout(() => setSaveState("saved"), 300);
    return () => clearTimeout(t);
  }, [leads, loaded]);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  useEffect(() => {
if (rows) setLeads(rows);    const onKey = (e) => { if (e.key === "Escape") { setOpenId(null); setAdding(false); setPasting(false); } };
if (rows) setLeads(rows);    window.addEventListener("keydown", onKey);
if (rows) setLeads(rows);    return () => window.removeEventListener("keydown", onKey);
if (rows) setLeads(rows);  }, []);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const patch = useCallback((id, p) => setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...p, updatedAt: Date.now() } : l))), []);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const addNote = useCallback((id, text) => setLeads((ls) => ls.map((l) => (l.id === id
if (rows) setLeads(rows);    ? { ...l, updatedAt: Date.now(), history: [...(l.history || []), { id: uid(), at: Date.now(), kind: "note", text }] } : l))), []);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const changeStatus = useCallback((id, to, reason) => setLeads((ls) => ls.map((l) => {
if (rows) setLeads(rows);    if (l.id !== id || l.status === to) return l;
if (rows) setLeads(rows);    const t = Date.now();
if (rows) setLeads(rows);    const idx = STAGES.findIndex((s) => s.id === to);
if (rows) setLeads(rows);    return {
if (rows) setLeads(rows);      ...l, status: to, updatedAt: t,
if (rows) setLeads(rows);      lostReason: to === "lost" ? reason || "" : l.lostReason,
if (rows) setLeads(rows);      contactedAt: l.contactedAt || (to !== "new" ? t : null),
if (rows) setLeads(rows);      maxStage: Math.max(l.maxStage || 0, idx),
if (rows) setLeads(rows);      nextAt: to === "won" || to === "lost" ? null : l.nextAt,
if (rows) setLeads(rows);      history: [...(l.history || []), { id: uid(), at: t, kind: "status", text: `${statusOf(l.status).label} → ${statusOf(to).label}${reason ? `: ${reason}` : ""}` }],
if (rows) setLeads(rows);    };
if (rows) setLeads(rows);  })), []);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const createLead = (f) => {
if (rows) setLeads(rows);    const t = Date.now();
if (rows) setLeads(rows);    const l = {
if (rows) setLeads(rows);      id: uid(), name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), telegram: f.telegram.trim(), city: "",
if (rows) setLeads(rows);      source: f.source, campaign: f.campaign.trim(), segment: f.segment, products: f.products,
if (rows) setLeads(rows);      budget: Number(f.budget) || 0, owner: f.owner.trim(), status: "new", maxStage: 0,
if (rows) setLeads(rows);      createdAt: t, updatedAt: t, contactedAt: null, nextAt: null, nextNote: "", lostReason: "",
if (rows) setLeads(rows);      history: [
if (rows) setLeads(rows);        { id: uid(), at: t, kind: "status", text: "Лід додано вручну" },
if (rows) setLeads(rows);        ...(f.comment.trim() ? [{ id: uid(), at: t, kind: "note", text: f.comment.trim() }] : []),
if (rows) setLeads(rows);      ],
if (rows) setLeads(rows);    };
if (rows) setLeads(rows);    setLeads((ls) => [l, ...ls]);
if (rows) setLeads(rows);    setAdding(false);
if (rows) setLeads(rows);    setOpenId(l.id);
if (rows) setLeads(rows);    toast("Лід збережено");
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const remove = (id) => { setLeads((ls) => ls.filter((l) => l.id !== id)); setOpenId(null); toast("Лід видалено"); };
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const merge = (incoming) => {
if (rows) setLeads(rows);    const seen = new Set(leads.flatMap(keysOf));
if (rows) setLeads(rows);    const added = []; let dups = 0;
if (rows) setLeads(rows);    for (const l of incoming) {
if (rows) setLeads(rows);      const ks = keysOf(l);
if (rows) setLeads(rows);      if (ks.some((k) => seen.has(k))) { dups++; continue; }
if (rows) setLeads(rows);      ks.forEach((k) => seen.add(k));
if (rows) setLeads(rows);      added.push(l);
if (rows) setLeads(rows);    }
if (rows) setLeads(rows);    setLeads((ls) => [...added, ...ls]);
if (rows) setLeads(rows);    return { added: added.length, dups };
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const onPaste = (list) => {
if (rows) setLeads(rows);    const r = merge(list);
if (rows) setLeads(rows);    setPasting(false);
if (rows) setLeads(rows);    toast(`Імпортовано: ${r.added}. Пропущено дублікатів: ${r.dups}.`);
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const onImport = async (e) => {
if (rows) setLeads(rows);    const file = e.target.files && e.target.files[0];
if (rows) setLeads(rows);    e.target.value = "";
if (rows) setLeads(rows);    if (!file) return;
if (rows) setLeads(rows);    try {
if (rows) setLeads(rows);      const rows = await readTable(file);
if (rows) setLeads(rows);      const r = merge(rows.map(rowToLead).filter(Boolean));
if (rows) setLeads(rows);      toast(`Імпортовано: ${r.added}. Пропущено дублікатів: ${r.dups}.`);
if (rows) setLeads(rows);    } catch (err) {
if (rows) setLeads(rows);      toast("Не вдалося прочитати файл. Потрібен CSV або TSV, завантажений з Meta.");
if (rows) setLeads(rows);    }
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const exportCsv = () => {
if (rows) setLeads(rows);    const rows = leads.map((l) => ({
if (rows) setLeads(rows);      "Ім'я": l.name, "Телефон": l.phone, "Email": l.email || "", "Telegram/Instagram": l.telegram || "", "Місто": l.city || "",
if (rows) setLeads(rows);      "Джерело": srcOf(l.source).label, "Кампанія": l.campaign || "", "Хто клієнт": segLabel(l.segment),
if (rows) setLeads(rows);      "Що цікавить": (l.products || []).join(", "), "Бюджет": l.budget || "", "Етап": statusOf(l.status).label,
if (rows) setLeads(rows);      "Причина відмови": l.lostReason || "", "Відповідальний": l.owner || "",
if (rows) setLeads(rows);      "Наступний крок": l.nextAt ? `${fmtDate(l.nextAt)} ${fmtTime(l.nextAt)}` : "", "Що зробити": l.nextNote || "",
if (rows) setLeads(rows);      "Створено": `${fmtDate(l.createdAt)} ${fmtTime(l.createdAt)}`,
if (rows) setLeads(rows);    }));
if (rows) setLeads(rows);    const blob = new Blob(["\uFEFF" + Papa.unparse(rows)], { type: "text/csv;charset=utf-8" });
if (rows) setLeads(rows);    const a = document.createElement("a");
if (rows) setLeads(rows);    a.href = URL.createObjectURL(blob);
if (rows) setLeads(rows);    a.download = `adt-leads-${fmtDate(Date.now()).replace(/\./g, "-")}.csv`;
if (rows) setLeads(rows);    a.click();
if (rows) setLeads(rows);  };
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const attList = leads.map((l) => attention(l, now)).filter(Boolean);
if (rows) setLeads(rows);  const attCount = attList.length;
if (rows) setLeads(rows);  const urgent = attList.filter((a) => a.level === 2).length;
if (rows) setLeads(rows);  const owners = useMemo(() => [...new Set(leads.map((l) => l.owner).filter(Boolean))], [leads]);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const base = useMemo(() => leads.filter((l) =>
if (rows) setLeads(rows);    (sourceF === "all" || l.source === sourceF) && (!onlyAtt || attention(l, now)) && matchQ(l, q)), [leads, sourceF, onlyAtt, q, now]);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const listItems = useMemo(() => base
if (rows) setLeads(rows);    .filter((l) => statusF === "all" ? true : statusF === "active" ? l.status !== "won" && l.status !== "lost" : l.status === statusF)
if (rows) setLeads(rows);    .sort((a, b) => {
if (rows) setLeads(rows);      const la = attention(a, now)?.level || 0, lb = attention(b, now)?.level || 0;
if (rows) setLeads(rows);      return la !== lb ? lb - la : b.createdAt - a.createdAt;
if (rows) setLeads(rows);    }), [base, statusF, now]);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  const countBy = (id) => base.filter((l) => l.status === id).length;
if (rows) setLeads(rows);  const openLead = leads.find((l) => l.id === openId);
if (rows) setLeads(rows);
if (rows) setLeads(rows);  return (
if (rows) setLeads(rows);    <div className="crm">
if (rows) setLeads(rows);      <style>{CSS}</style>
if (rows) setLeads(rows);      <div className="wrap">
if (rows) setLeads(rows);        <header className="top">
if (rows) setLeads(rows);          <div className="brand">
if (rows) setLeads(rows);            <h1>Ліди</h1><span className="co">ADT Print</span><span className="sp" />
if (rows) setLeads(rows);            <span className={`save ${saveState === "error" ? "err" : ""}`}>
if (rows) setLeads(rows);              {saveState === "saving" ? "Збереження…" : saveState === "saved" ? "Збережено" : saveState === "error" ? "Не збережено" : ""}
if (rows) setLeads(rows);            </span>
if (rows) setLeads(rows);          </div>
if (rows) setLeads(rows);          {attCount > 0 && (
if (rows) setLeads(rows);            <button className={`alertbar ${urgent ? "" : "calm"}`} onClick={() => { setOnlyAtt((v) => !v); setView("list"); setStatusF("active"); }}>
if (rows) setLeads(rows);              {urgent > 0 && <span className="dot" />}
if (rows) setLeads(rows);              <span>{onlyAtt ? `Показано лише ліди, що потребують дії (${attCount})` : `Потребують дії: ${attCount}${urgent ? `, термінових ${urgent}` : ""}`}</span>
if (rows) setLeads(rows);              <span className="x">{onlyAtt ? "Показати всі" : "Показати"}</span>
if (rows) setLeads(rows);            </button>
if (rows) setLeads(rows);          )}
if (rows) setLeads(rows);          <nav className="tabs">
if (rows) setLeads(rows);            {[["list", "Список"], ["board", "Воронка"], ["stats", "Звіт"]].map(([id, t]) => (
if (rows) setLeads(rows);              <button key={id} className={`tab ${view === id ? "on" : ""}`} onClick={() => setView(id)} aria-pressed={view === id}>{t}</button>
if (rows) setLeads(rows);            ))}
if (rows) setLeads(rows);          </nav>
if (rows) setLeads(rows);        </header>
if (rows) setLeads(rows);
if (rows) setLeads(rows);        {!loaded ? (
if (rows) setLeads(rows);          <p className="empty muted">Завантаження…</p>
if (rows) setLeads(rows);        ) : leads.length === 0 ? (
if (rows) setLeads(rows);          <div className="empty">
if (rows) setLeads(rows);            <h2>Лідів поки немає</h2>
if (rows) setLeads(rows);            <p>Додайте першого вручну або завантажте CSV з Meta: Business Suite, розділ «Ліди», кнопка «Завантажити».</p>
if (rows) setLeads(rows);            <div className="acts">
if (rows) setLeads(rows);              <button className="btn dark" onClick={() => setAdding(true)}>Додати лід</button>
if (rows) setLeads(rows);              <button className="btn" onClick={() => setPasting(true)}>Вставити з Telegram</button>
if (rows) setLeads(rows);              <button className="btn" onClick={() => fileRef.current.click()}>Імпорт CSV з Meta</button>
if (rows) setLeads(rows);              <button className="btn" onClick={() => { setLeads(demoLeads()); toast("Додано 8 демо-лідів"); }}>Показати демо-дані</button>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          </div>
if (rows) setLeads(rows);        ) : (<>
if (rows) setLeads(rows);          {view !== "stats" && (
if (rows) setLeads(rows);            <div className="tools">
if (rows) setLeads(rows);              <input className="search" type="search" placeholder="Пошук: ім'я, телефон, кампанія" value={q} onChange={(e) => setQ(e.target.value)} />
if (rows) setLeads(rows);              <select className="srcsel" value={sourceF} onChange={(e) => setSourceF(e.target.value)} aria-label="Джерело">
if (rows) setLeads(rows);                <option value="all">Усі джерела</option>
if (rows) setLeads(rows);                {SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
if (rows) setLeads(rows);              </select>
if (rows) setLeads(rows);              <button className="btn" onClick={() => setPasting(true)}>З Telegram</button>
if (rows) setLeads(rows);              <button className="btn" onClick={() => fileRef.current.click()}>CSV</button>
if (rows) setLeads(rows);              <button className="btn" onClick={exportCsv}>Експорт</button>
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          )}
if (rows) setLeads(rows);
if (rows) setLeads(rows);          {view === "list" && (<>
if (rows) setLeads(rows);            <div className="chips scroll">
if (rows) setLeads(rows);              <button className={`chip ${statusF === "active" ? "on" : ""}`} onClick={() => setStatusF("active")}>В роботі</button>
if (rows) setLeads(rows);              <button className={`chip ${statusF === "all" ? "on" : ""}`} onClick={() => setStatusF("all")}>Усі {base.length}</button>
if (rows) setLeads(rows);              {ALL_ST.map((s) => (
if (rows) setLeads(rows);                <button key={s.id} className={`chip ${statusF === s.id ? "on" : ""}`} onClick={() => setStatusF(s.id)}>
if (rows) setLeads(rows);                  <span className="d sw" style={{ backgroundColor: s.color }} />{s.label} {countBy(s.id)}
if (rows) setLeads(rows);                </button>
if (rows) setLeads(rows);              ))}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);            <div className="list">
if (rows) setLeads(rows);              {listItems.map((l) => <LeadRow key={l.id} l={l} now={now} onOpen={() => setOpenId(l.id)} />)}
if (rows) setLeads(rows);              {!listItems.length && <p className="empty muted">За цими фільтрами лідів немає.</p>}
if (rows) setLeads(rows);            </div>
if (rows) setLeads(rows);          </>)}
if (rows) setLeads(rows);          {view === "board" && <Board leads={base} now={now} open={setOpenId} />}
if (rows) setLeads(rows);          {view === "stats" && <Stats leads={leads} now={now} />}
if (rows) setLeads(rows);        </>)}
if (rows) setLeads(rows);      </div>
if (rows) setLeads(rows);
if (rows) setLeads(rows);      <input ref={fileRef} type="file" accept=".csv,.tsv,.txt,text/csv" style={{ display: "none" }} onChange={onImport} />
if (rows) setLeads(rows);      {!adding && !pasting && !openLead && loaded && <button className="fab" onClick={() => setAdding(true)}>+ Лід</button>}
if (rows) setLeads(rows);      {openLead && <LeadDetail l={openLead} now={now} onClose={() => setOpenId(null)} patch={patch} changeStatus={changeStatus} addNote={addNote} remove={remove} />}
if (rows) setLeads(rows);      {adding && <AddLead leads={leads} onClose={() => setAdding(false)} onSave={createLead} onOpen={(id) => { setAdding(false); setOpenId(id); }} />}
if (rows) setLeads(rows);      {pasting && <PasteImport onClose={() => setPasting(false)} onImport={onPaste} />}
if (rows) setLeads(rows);      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
if (rows) setLeads(rows);      <datalist id="owners">{owners.map((o) => <option key={o} value={o} />)}</datalist>
if (rows) setLeads(rows);    </div>
if (rows) setLeads(rows);  );
if (rows) setLeads(rows);}
if (rows) setLeads(rows);
if (rows) setLeads(rows);const CSS = `
if (rows) setLeads(rows);@import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Unbounded:wght@600;700&display=swap');
if (rows) setLeads(rows);body{margin:0}
if (rows) setLeads(rows);.crm{--bg:#DAD7D1;--surface:#F1EFEB;--surface2:#E5E2DC;--ink:#23282C;--ink2:#5E6360;--line:#C7C2BA;--alert:#B23A22;--warn:#8A6410;
if (rows) setLeads(rows);  font-family:'Onest',system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;font-size:15px;line-height:1.4;-webkit-font-smoothing:antialiased}
if (rows) setLeads(rows);.crm *{box-sizing:border-box}
if (rows) setLeads(rows);.crm button,.crm input,.crm select,.crm textarea{font:inherit;color:inherit}
if (rows) setLeads(rows);.crm :focus-visible{outline:2px solid var(--ink);outline-offset:2px}
if (rows) setLeads(rows);.crm :where(input,select,textarea){width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:#FAF9F7;font-size:16px}
if (rows) setLeads(rows);.crm textarea{resize:vertical}
if (rows) setLeads(rows);.sw{background-image:radial-gradient(rgba(255,255,255,.24) .8px,transparent 1.3px),radial-gradient(rgba(0,0,0,.2) .8px,transparent 1.3px);background-size:6px 6px,9px 9px;background-position:0 0,3px 4px}
if (rows) setLeads(rows);.wrap{max-width:880px;margin:0 auto;padding-bottom:90px}
if (rows) setLeads(rows);.top{position:sticky;top:0;z-index:5;background:var(--bg);padding:14px 16px 10px;border-bottom:1px solid var(--line)}
if (rows) setLeads(rows);.brand{display:flex;align-items:baseline;gap:10px;margin-bottom:10px}
if (rows) setLeads(rows);.brand h1{font-family:'Unbounded',sans-serif;font-weight:700;font-size:22px;letter-spacing:-.02em;margin:0}
if (rows) setLeads(rows);.co{font-size:13px;color:var(--ink2)}
if (rows) setLeads(rows);.sp{flex:1}
if (rows) setLeads(rows);.save{font-size:12px;color:var(--ink2)}
if (rows) setLeads(rows);.save.err{color:var(--alert)}
if (rows) setLeads(rows);.alertbar{display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:1px solid var(--alert);background:#F2E0D9;color:var(--alert);border-radius:10px;padding:9px 12px;margin-bottom:10px;cursor:pointer;font-weight:600;font-size:14px}
if (rows) setLeads(rows);.alertbar.calm{border-color:var(--line);background:var(--surface);color:var(--ink)}
if (rows) setLeads(rows);.alertbar .dot{width:8px;height:8px;border-radius:50%;background:var(--alert);flex:none}
if (rows) setLeads(rows);.alertbar .x{margin-left:auto;font-weight:400;text-decoration:underline;white-space:nowrap}
if (rows) setLeads(rows);.tabs{display:flex;gap:3px;background:var(--surface2);border-radius:10px;padding:3px}
if (rows) setLeads(rows);.tab{flex:1;border:0;background:transparent;padding:8px 6px;border-radius:8px;font-weight:500;color:var(--ink2);cursor:pointer}
if (rows) setLeads(rows);.tab.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 0 var(--line)}
if (rows) setLeads(rows);.tools{display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap}
if (rows) setLeads(rows);.tools .search{flex:1 1 220px;width:auto}
if (rows) setLeads(rows);.tools .srcsel{flex:0 1 160px;width:auto}
if (rows) setLeads(rows);.chips{display:flex;gap:6px;flex-wrap:wrap}
if (rows) setLeads(rows);.chips.scroll{flex-wrap:nowrap;overflow-x:auto;padding:0 16px 12px;scrollbar-width:none}
if (rows) setLeads(rows);.chips.scroll::-webkit-scrollbar{display:none}
if (rows) setLeads(rows);.chip{border:1px solid var(--line);border-radius:999px;padding:6px 11px;font-size:13px;background:transparent;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
if (rows) setLeads(rows);.chip.on{background:var(--ink);border-color:var(--ink);color:#fff}
if (rows) setLeads(rows);.chip .d{width:9px;height:9px;border-radius:2px;flex:none}
if (rows) setLeads(rows);.btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--ink);background:transparent;border-radius:8px;padding:9px 14px;font-weight:600;font-size:14px;cursor:pointer;text-decoration:none;color:var(--ink);white-space:nowrap}
if (rows) setLeads(rows);.btn.dark{background:var(--ink);color:#fff}
if (rows) setLeads(rows);.btn.alert{background:var(--alert);border-color:var(--alert);color:#fff}
if (rows) setLeads(rows);.btn:disabled{opacity:.4;cursor:default}
if (rows) setLeads(rows);.btn.wide{width:100%;padding:13px}
if (rows) setLeads(rows);.ghost{border:0;background:transparent;padding:8px 4px;cursor:pointer;color:var(--ink2);font-weight:500}
if (rows) setLeads(rows);.link{border:0;background:none;padding:0;color:var(--ink2);text-decoration:underline;cursor:pointer;font-size:14px}
if (rows) setLeads(rows);.muted{color:var(--ink2);font-size:13px}
if (rows) setLeads(rows);.list{background:var(--surface);border-top:1px solid var(--line)}
if (rows) setLeads(rows);.row{display:grid;grid-template-columns:5px 1fr auto;gap:12px;width:100%;text-align:left;background:transparent;border:0;border-bottom:1px solid var(--line);padding:12px 16px 12px 0;cursor:pointer}
if (rows) setLeads(rows);.row:hover{background:#F7F6F3}
if (rows) setLeads(rows);.row-bar{align-self:stretch;border-radius:0 3px 3px 0}
if (rows) setLeads(rows);.row-main{display:flex;flex-direction:column;gap:2px;min-width:0}
if (rows) setLeads(rows);.row-name{font-weight:600;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
if (rows) setLeads(rows);.row-meta{font-size:13px;color:var(--ink2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
if (rows) setLeads(rows);.src{display:inline-block;font-size:10px;font-weight:700;border:1px solid var(--line);border-radius:4px;padding:0 4px;margin-right:6px;color:var(--ink);vertical-align:1px}
if (rows) setLeads(rows);.row-side{display:flex;flex-direction:column;align-items:flex-end;gap:2px;font-size:12px;color:var(--ink2);white-space:nowrap}
if (rows) setLeads(rows);.row-side b{color:var(--ink);font-size:13px}
if (rows) setLeads(rows);.att{font-size:13px;font-weight:600}
if (rows) setLeads(rows);.att.lv2{color:var(--alert)}
if (rows) setLeads(rows);.att.lv1{color:var(--warn)}
if (rows) setLeads(rows);.att.big{padding:8px 10px;border-radius:8px;margin-top:6px;background:var(--surface2)}
if (rows) setLeads(rows);.next{font-size:13px;color:var(--ink2)}
if (rows) setLeads(rows);.empty{padding:40px 20px;text-align:center}
if (rows) setLeads(rows);.empty h2{font-family:'Unbounded',sans-serif;font-weight:600;font-size:18px;margin:0 0 8px}
if (rows) setLeads(rows);.empty p{color:var(--ink2);max-width:42ch;margin:0 auto 16px}
if (rows) setLeads(rows);.acts{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
if (rows) setLeads(rows);.fab{position:fixed;right:16px;bottom:16px;z-index:8;border:0;background:var(--ink);color:#fff;border-radius:14px;padding:14px 20px;font-weight:700;font-size:15px;box-shadow:0 6px 18px rgba(35,40,44,.28);cursor:pointer}
if (rows) setLeads(rows);.toast{position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:var(--ink);color:#fff;padding:10px 16px;border-radius:10px;z-index:40;font-size:14px;max-width:90vw;text-align:center}
if (rows) setLeads(rows);.sheet-wrap{position:fixed;inset:0;z-index:20;background:rgba(35,40,44,.4);display:flex;justify-content:flex-end}
if (rows) setLeads(rows);.sheet{width:100%;max-width:520px;height:100%;overflow-y:auto;background:var(--surface);animation:slide .2s ease-out}
if (rows) setLeads(rows);@keyframes slide{from{transform:translateX(24px);opacity:.6}to{transform:none;opacity:1}}
if (rows) setLeads(rows);@media (prefers-reduced-motion:reduce){.sheet{animation:none}}
if (rows) setLeads(rows);.sheet-head{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:8px 16px;background:var(--surface);border-bottom:1px solid var(--line)}
if (rows) setLeads(rows);.sheet-body{padding:14px 16px 48px}
if (rows) setLeads(rows);.form{display:flex;flex-direction:column;gap:14px}
if (rows) setLeads(rows);.title-input{font-family:'Unbounded',sans-serif;font-weight:600;font-size:20px;border:0;background:transparent;padding:4px 0;border-radius:0}
if (rows) setLeads(rows);.sec{padding:16px 0;border-bottom:1px solid var(--line)}
if (rows) setLeads(rows);.sec h3{font-size:14px;font-weight:600;margin:0 0 10px;color:var(--ink2)}
if (rows) setLeads(rows);.contact{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
if (rows) setLeads(rows);.steps{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}
if (rows) setLeads(rows);.step{border:0;background:transparent;padding:0;cursor:pointer;display:flex;flex-direction:column;gap:6px;align-items:stretch}
if (rows) setLeads(rows);.step-sw{height:32px;border:2px solid;border-radius:4px}
if (rows) setLeads(rows);.step.cur .step-sw{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--ink)}
if (rows) setLeads(rows);.step-l{font-size:11px;text-align:center;color:var(--ink2)}
if (rows) setLeads(rows);.step.cur .step-l{color:var(--ink);font-weight:700}
if (rows) setLeads(rows);.lost-note{margin:0;font-size:14px;color:var(--ink2)}
if (rows) setLeads(rows);.inline{display:flex;gap:8px;align-items:center;margin:10px 0}
if (rows) setLeads(rows);.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
if (rows) setLeads(rows);@media (max-width:420px){.grid2{grid-template-columns:1fr}}
if (rows) setLeads(rows);.fld{display:flex;flex-direction:column;gap:4px}
if (rows) setLeads(rows);.fld>span{font-size:12px;color:var(--ink2)}
if (rows) setLeads(rows);.note-add{display:flex;flex-direction:column;gap:8px}
if (rows) setLeads(rows);.hist{list-style:none;padding:0;margin:16px 0 0;display:flex;flex-direction:column;gap:12px}
if (rows) setLeads(rows);.hist li{border-left:3px solid var(--line);padding-left:10px}
if (rows) setLeads(rows);.hist li.note{border-color:var(--ink)}
if (rows) setLeads(rows);.hist p{margin:2px 0 0;white-space:pre-wrap;font-size:14px}
if (rows) setLeads(rows);.danger{padding-top:20px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:14px}
if (rows) setLeads(rows);.preview{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:8px;background:#FAF9F7}
if (rows) setLeads(rows);.pv{display:flex;flex-direction:column;gap:2px;padding:9px 12px;border-bottom:1px solid var(--line)}
if (rows) setLeads(rows);.pv:last-child{border-bottom:0}
if (rows) setLeads(rows);.board{display:flex;gap:10px;overflow-x:auto;padding:4px 16px 24px;scroll-snap-type:x mandatory}
if (rows) setLeads(rows);.col{flex:0 0 78%;max-width:280px;scroll-snap-align:start;background:var(--surface2);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;align-self:flex-start}
if (rows) setLeads(rows);@media (min-width:700px){.col{flex:0 0 240px}}
if (rows) setLeads(rows);.col-head{display:flex;align-items:center;gap:8px}
if (rows) setLeads(rows);.col-sw{width:14px;height:14px;border-radius:3px;flex:none}
if (rows) setLeads(rows);.col-head .muted{margin-left:auto}
if (rows) setLeads(rows);.col-empty{margin:4px 0}
if (rows) setLeads(rows);.card{text-align:left;border:1px solid var(--line);background:var(--surface);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:3px;cursor:pointer}
if (rows) setLeads(rows);.stats{padding:14px 16px 24px}
if (rows) setLeads(rows);.stats h3{font-size:14px;font-weight:600;color:var(--ink2);margin:0 0 8px}
if (rows) setLeads(rows);.kpis{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-bottom:20px}
if (rows) setLeads(rows);@media (min-width:700px){.kpis{grid-template-columns:repeat(4,1fr)}}
if (rows) setLeads(rows);.kpi{background:var(--surface);padding:12px}
if (rows) setLeads(rows);.kpi b{display:block;font-family:'Unbounded',sans-serif;font-size:19px;font-weight:600}
if (rows) setLeads(rows);.kpi span{font-size:13px;color:var(--ink2)}
if (rows) setLeads(rows);.bars{display:flex;flex-direction:column;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:20px}
if (rows) setLeads(rows);.bar-row{display:grid;grid-template-columns:104px 1fr auto;gap:10px;align-items:center;font-size:14px}
if (rows) setLeads(rows);.bar{height:10px;background:var(--surface2);border-radius:3px;overflow:hidden}
if (rows) setLeads(rows);.bar i{display:block;height:100%}
if (rows) setLeads(rows);`;
