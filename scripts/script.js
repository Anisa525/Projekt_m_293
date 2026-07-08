/*
  Consolidated global script for the site.
  - Project filter
  - Newsletter & contact form validation
  - Theme (dark/light) management with persistence
  - Smooth navigation + active nav highlight
  - Tabs system
  - Chart.js init (if available)
  - Merkliste (saved projects) functions
  - Legacy project list helpers (kept for backward compatibility)
*/

// ---------- 1. Project filter ----------
const categoryFilter = document.getElementById('categoryFilter');
if (categoryFilter) {
  categoryFilter.addEventListener('change', () => {
    const selected = categoryFilter.value;
    document.querySelectorAll('.project').forEach(p => {
      p.classList.toggle('hidden', !(selected === 'all' || p.classList.contains(selected)));
    });
  });
}

// ---------- 2. Forms validation ----------
const newsletter = document.querySelector('.newsletter-form');
if (newsletter) {
  newsletter.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = (this.querySelector('input[type="email"]') || this.querySelector('input')).value || '';
    if (email.includes('@') && email.includes('.')) {
      alert('Danke für deine Anmeldung zum Newsletter!');
      this.reset();
    } else {
      alert('Bitte gib eine gültige E-Mail-Adresse ein.');
    }
  });
}

const contact = document.getElementById('contactForm') || document.querySelector('form:not(.newsletter-form)');
if (contact) {
  contact.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input, textarea, select');
    let ok = true;
    inputs.forEach(i => { if (i.required && !i.value.trim()) ok = false; });
    if (ok) { alert('Nachricht erfolgreich gesendet!'); this.reset(); }
    else alert('Bitte alle Felder ausfüllen.');
  });
}

// ---------- 3. Theme management ----------
const THEME_KEY = 'site-theme';
const Theme = { DARK: 'dark', LIGHT: 'light' };

function saveTheme(theme) { try { localStorage.setItem(THEME_KEY, theme); } catch (e) {} }
function getSavedTheme() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }
function detectSystemTheme() {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return Theme.LIGHT;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return Theme.DARK;
  }
  return Theme.DARK;
}

function applyTheme(theme) {
  document.body.classList.remove(Theme.LIGHT, Theme.DARK);
  document.body.classList.add(theme);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    const isDark = theme === Theme.DARK;
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', isDark);
  });
}

function loadTheme() {
  const saved = getSavedTheme();
  const theme = saved || detectSystemTheme();
  applyTheme(theme);
  if (!saved) saveTheme(theme);
}

function toggleTheme() {
  const current = document.body.classList.contains(Theme.LIGHT) ? Theme.LIGHT : Theme.DARK;
  const next = current === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
  applyTheme(next); saveTheme(next);
}

function bindThemeToggle() {
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); toggleTheme(); }));
}

// Ensure a theme-toggle button exists in the navbar on pages that don't include it
function ensureThemeToggle() {
  if (document.querySelector('.theme-toggle')) return;
  const container = document.querySelector('.nav-actions') || document.querySelector('nav div:last-child') || document.querySelector('nav');
  if (!container) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Theme wechseln');
  const isDark = document.body.classList.contains(Theme.DARK);
  btn.textContent = isDark ? '☀️' : '🌙';
  container.insertBefore(btn, container.firstChild);
}

function initNavMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNavMenu();
  });

  document.addEventListener('click', (e) => {
    const isInsideNav = e.target.closest('nav');
    if (!isInsideNav) {
      closeNavMenu(navToggle, navMenu);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNavMenu(navToggle, navMenu);
    }
  });
}

// ---------- 4. Nav smooth scroll + active ----------
function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || "index.html";

    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href");

        link.classList.remove("active");

        if (href === page) {
            link.classList.add("active");
        }
    });
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('nav a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const hash = href.indexOf('#') !== -1 ? href.substring(href.indexOf('#')) : null;

  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', hash);
      setActiveNav();
    }
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu && window.innerWidth <= 900 && link) {
    closeNavMenu(navToggle, navMenu);
  }
});

window.addEventListener('popstate', setActiveNav);
window.addEventListener('hashchange', setActiveNav);

function openNavMenu(navToggle, navMenu) {
  navMenu.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
}

function closeNavMenu(navToggle, navMenu) {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function toggleNavMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!navToggle || !navMenu) return;
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) closeNavMenu(navToggle, navMenu);
  else openNavMenu(navToggle, navMenu);
}

// ---------- 5. Tabs ----------
function openTab(tabId, evt) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
  if (evt && evt.currentTarget) evt.currentTarget.classList.add('active');
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest && e.target.closest('.tab-btn');
  if (!btn) return;
  const target = btn.dataset.tab || btn.getAttribute('data-target');
  if (target) openTab(target, e);
});

// ---------- 6. Chart init (optional) ----------
try {
  const ctx = document.getElementById('matchChart');
  if (ctx && typeof Chart !== 'undefined') {
    new Chart(ctx, {
      type: 'line',
      data: { labels: ['Serie 1','Serie 2','Serie 3','Serie 4','Serie 5'], datasets: [{ label: 'Trefferleistung', data: [92,88,85,83,80], borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#3b82f6', tension: 0.4 }] },
      options: { responsive: true }
    });
  }
} catch (e) { console.warn('chart init', e); }

// ---------- 7. Merkliste (saved projects) ----------
const SAVED_KEY = 'savedProjects_v1';
function getSavedProjects() { try { return JSON.parse(localStorage.getItem(SAVED_KEY)) || []; } catch (e) { return []; } }
function saveProjects(list) { try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch (e) {} }
function isSaved(id) { if (!id) return false; return getSavedProjects().some(p => p.id === id); }

function toggleSave(id, name) {
  if (!id) return;
  const list = getSavedProjects();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) list.push({ id, name }); else list.splice(idx, 1);
  saveProjects(list); updateAllSaveButtons();
}

function removeSaved(id) { if (!id) return; saveProjects(getSavedProjects().filter(p => p.id !== id)); updateAllSaveButtons(); }

function createSaveButton(id, name) {
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'project-save-btn'; btn.dataset.projectId = id; btn.dataset.projectName = name; btn.textContent = isSaved(id) ? '⭐ Gemerkt' : '⭐ Merken'; btn.addEventListener('click', (e) => { e.stopPropagation(); toggleSave(id, name); }); return btn;
}

function initProjectSaveButtons() {
  document.querySelectorAll('.card').forEach((card, idx) => {
    let name = card.dataset.projectName || '';
    if (!name) { const h = card.querySelector('h3,h2,.title'); if (h) name = h.innerText.trim(); }
    if (!name) name = document.title || 'Projekt';
    let id = card.dataset.projectId; if (!id) { const page = window.location.pathname.split('/').pop() || 'page'; id = `${page}::${idx}`; card.dataset.projectId = id; }
    if (card.querySelector('.project-save-btn')) return;
    const header = card.querySelector('.card-header, .meta, .card-footer');
    const btn = createSaveButton(id, name);
    if (header) header.appendChild(btn); else card.appendChild(btn);
  });
  updateAllSaveButtons();
}

function updateAllSaveButtons() { document.querySelectorAll('.project-save-btn').forEach(btn => { const id = btn.dataset.projectId; btn.textContent = isSaved(id) ? '⭐ Gemerkt' : '⭐ Merken'; btn.setAttribute('aria-pressed', isSaved(id)); }); }

function loadSavedList(container) {
  if (!container) return; const list = getSavedProjects(); container.innerHTML = ''; if (!list.length) { container.innerHTML = '<p>Keine gespeicherten Projekte.</p>'; return; }
  const ul = document.createElement('ul'); ul.className = 'saved-project-list'; list.forEach(p => { const li = document.createElement('li'); li.className = 'saved-project-item'; li.innerHTML = `<span class="saved-name">${escapeHtml(p.name)}</span>`; const rem = document.createElement('button'); rem.type='button'; rem.className='saved-remove-btn'; rem.textContent='❌ Entfernen'; rem.addEventListener('click', ()=>{ removeSaved(p.id); loadSavedList(container); }); li.appendChild(rem); ul.appendChild(li); }); container.appendChild(ul);
}

function escapeHtml(str) { return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s]); }

// ---------- 8. Legacy project list helpers (kept) ----------
function loadProjects() { try { const projects = JSON.parse(localStorage.getItem('projects')) || []; const list = document.getElementById('projectList'); if (!list) return; list.innerHTML = ''; projects.forEach((project, i) => { const li = document.createElement('li'); li.innerHTML = `${project} <button onclick="removeProject(${i})">❌</button>`; list.appendChild(li); }); } catch (e) { console.warn('loadProjects', e); } }
function addProject() { const input = document.getElementById('projectInput'); if (!input) return; const project = input.value.trim(); if (!project) return; const projects = JSON.parse(localStorage.getItem('projects')) || []; projects.push(project); localStorage.setItem('projects', JSON.stringify(projects)); input.value=''; loadProjects(); }
function removeProject(index) { const projects = JSON.parse(localStorage.getItem('projects')) || []; projects.splice(index,1); localStorage.setItem('projects', JSON.stringify(projects)); loadProjects(); }

// ---------- Init on DOMContentLoaded ----------
document.addEventListener('DOMContentLoaded', () => {
  try { loadTheme(); } catch (e) { console.warn('loadTheme', e); }
  try { ensureThemeToggle(); } catch (e) { console.warn('ensureThemeToggle', e); }
  try { bindThemeToggle(); } catch (e) { console.warn('bindThemeToggle', e); }
  try { initNavMenu(); } catch (e) { console.warn('initNavMenu', e); }
  try { setActiveNav(); } catch (e) { console.warn('setActiveNav', e); }
  try { initProjectSaveButtons(); } catch (e) { console.warn('initProjectSaveButtons', e); }
  try { loadProjects(); } catch (e) { /* optional legacy list */ }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("SW registriert"))
      .catch((err) => console.log("SW Fehler", err));
  });
}