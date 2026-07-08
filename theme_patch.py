from pathlib import Path
import re
root = Path(r"c:/Users/CARLOS/OneDrive - TBZ/Datenablagen/Schule/m293/Protfolie_hobby")
css_dir = root / 'styles'
html_files = sorted(root.glob('*.html'))
css_files = sorted(css_dir.glob('*.css'))

# 1. Patch style1.css with theme variables and toggle styles.
style1 = css_dir / 'style1.css'
text = style1.read_text(encoding='utf-8')
if '--bg:' not in text:
    text = re.sub(r'(html\s*\{[^}]*\})', r"\1\n\n:root {\n  --bg: radial-gradient(circle at top, #0b1220 0%, #0a0f1c 100%);\n  --surface: rgba(15, 23, 42, 0.95);\n  --surface-2: rgba(20, 28, 42, 0.96);\n  --navbar: rgba(11, 18, 32, 0.75);\n  --footer: rgba(11, 18, 32, 0.9);\n  --border: rgba(59, 130, 246, 0.15);\n  --surface-border: rgba(148, 163, 184, 0.18);\n  --text: #e2e8f0;\n  --text-secondary: #94a3b8;\n  --primary: #3b82f6;\n  --primary-hover: #60a5fa;\n  --accent: #38bdf8;\n  --card: linear-gradient(180deg, rgba(30, 41, 59, 0.95), rgba(20, 28, 43, 0.92));\n  --shadow: 0 20px 45px rgba(0, 0, 0, 0.32);\n  --btn-text: #0b1220;\n  --hero-overlay: rgba(11, 18, 32, 0.75);\n  --hero-overlay-alt: rgba(11, 18, 32, 0.9);\n  --link: #3b82f6;\n}\n\nbody.light {\n  --bg: radial-gradient(circle at top, #f5f7fb 0%, #e9eff5 100%);\n  --surface: rgba(255, 255, 255, 0.92);\n  --surface-2: rgba(248, 250, 252, 0.95);\n  --navbar: rgba(255, 255, 255, 0.88);\n  --footer: rgba(248, 250, 252, 0.9);\n  --border: rgba(59, 130, 246, 0.2);\n  --surface-border: rgba(148, 163, 184, 0.25);\n  --text: #0f172a;\n  --text-secondary: #475569;\n  --primary: #2563eb;\n  --primary-hover: #3b82f6;\n  --accent: #2563eb;\n  --card: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(241,245,249,0.92));\n  --shadow: 0 20px 45px rgba(15, 23, 42, 0.12);\n  --btn-text: #0f172a;\n  --hero-overlay: rgba(255, 255, 255, 0.85);\n  --hero-overlay-alt: rgba(255, 255, 255, 0.95);\n  --link: #2563eb;\n}\n\nbody.dark {\n  --bg: radial-gradient(circle at top, #0b1220 0%, #0a0f1c 100%);\n  --surface: rgba(15, 23, 42, 0.95);\n  --surface-2: rgba(20, 28, 42, 0.96);\n  --navbar: rgba(11, 18, 32, 0.75);\n  --footer: rgba(11, 18, 32, 0.9);\n  --border: rgba(59, 130, 246, 0.15);\n  --surface-border: rgba(148, 163, 184, 0.18);\n  --text: #e2e8f0;\n  --text-secondary: #94a3b8;\n  --primary: #3b82f6;\n  --primary-hover: #60a5fa;\n  --accent: #38bdf8;\n  --card: linear-gradient(180deg, rgba(30, 41, 59, 0.95), rgba(20, 28, 43, 0.92));\n  --shadow: 0 20px 45px rgba(0, 0, 0, 0.32);\n  --btn-text: #0b1220;\n  --hero-overlay: rgba(11, 18, 32, 0.75);\n  --hero-overlay-alt: rgba(11, 18, 32, 0.9);\n  --link: #3b82f6;\n}\n", text, count=1, flags=re.S)

# Replace body base styles with theme variables and transitions
text = text.replace(
"body {\n  line-height: 1.7;\n  background: radial-gradient(circle at top, #0b1220 0%, #0a0f1c 100%);\n  color: #e2e8f0;\n  padding-top: 70px;\n}",
"body {\n  line-height: 1.7;\n  background: var(--bg);\n  color: var(--text);\n  padding-top: 70px;\n  transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease, box-shadow 300ms ease, fill 300ms ease, stroke 300ms ease;\n}\n")

# Add theme toggle styles after nav link styles if missing
if '.theme-toggle' not in text:
    text = text.replace(
        "nav a:hover {\n  color: #3b82f6;\n  transform: none;\n}\n\n/* ===============================\n   MOBILE NAVBAR\n=============================== */",
        "nav a:hover {\n  color: var(--primary);\n  transform: none;\n}\n\n.theme-toggle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  border: 1px solid var(--surface-border);\n  border-radius: 999px;\n  background: var(--surface);\n  color: var(--text);\n  font-size: 1rem;\n  cursor: pointer;\n  transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease, box-shadow 300ms ease;\n}\n\n.theme-toggle:hover {\n  background: var(--surface-2);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.12);\n}\n\n/* ===============================\n   MOBILE NAVBAR\n=============================== */")

# Convert some nav-specific colors to variables
replacements = {
    'background: rgba(11, 18, 32, 0.65);': 'background: var(--navbar);',
    'border-bottom: 1px solid rgba(59, 130, 246, 0.15);': 'border-bottom: 1px solid var(--border);',
    'border-bottom: 1px solid rgba(59, 130, 246, 0.18);': 'border-bottom: 1px solid var(--border);',
    'box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);': 'box-shadow: var(--shadow);',
    'box-shadow: 0 10px 25px rgba(0,0,0,0.5);': 'box-shadow: var(--shadow);',
    'color: #cbd5e1;': 'color: var(--text-secondary);',
    'color: #ffffff;': 'color: var(--text);',
    'background: #3b82f6;': 'background: var(--primary);',
    'color: #3b82f6;': 'color: var(--primary);',
    'background: rgba(30, 41, 59, 0.7);': 'background: var(--surface);',
    'border: 1px solid rgba(59, 130, 246, 0.12);': 'border: 1px solid var(--border);',
}
for old, new in replacements.items():
    text = text.replace(old, new)

# ensure primary hover is used in nav hover
text = text.replace('color: #3b82f6;', 'color: var(--primary);')
style1.write_text(text, encoding='utf-8')
print('Patched style1.css')

# 2. Patch all CSS files for variable use
css_replacements = {
    'background: #0b1220;': 'background: var(--bg);',
    'background: #0b1220;\n  color: #e2e8f0;': 'background: var(--bg);\n  color: var(--text);',
    'color: #e2e8f0;': 'color: var(--text);',
    'color: #cbd5e1;': 'color: var(--text-secondary);',
    'background: rgba(11, 18, 32, 0.65);': 'background: var(--navbar);',
    'background: rgba(11, 18, 32, 0.8);': 'background: var(--surface);',
    'background: rgba(11, 18, 32, 0.75);': 'background: var(--hero-overlay);',
    'background: rgba(11, 18, 32, 0.7);': 'background: var(--hero-overlay);',
    'background: rgba(11, 18, 32, 0.85);': 'background: var(--hero-overlay-alt);',
    'background: rgba(11, 18, 32, 0.9);': 'background: var(--hero-overlay-alt);',
    'border-bottom: 1px solid rgba(59, 130, 246, 0.15);': 'border-bottom: 1px solid var(--border);',
    'border-bottom: 1px solid rgba(59, 130, 246, 0.18);': 'border-bottom: 1px solid var(--border);',
    'box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);': 'box-shadow: var(--shadow);',
    'box-shadow: 0 10px 25px rgba(0,0,0,0.5);': 'box-shadow: var(--shadow);',
    'box-shadow: 0 10px 30px rgba(0,0,0,0.5);': 'box-shadow: var(--shadow);',
    'box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);': 'box-shadow: var(--shadow);',
    'box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);': 'box-shadow: var(--shadow);',
    'background: #1e293b;': 'background: var(--surface-2);',
    'background: linear-gradient(180deg, #1e293b, #141c2b);': 'background: var(--card);',
    'background: linear-gradient(135deg, #3b82f6, #2563eb);': 'background: linear-gradient(135deg, var(--primary), #2563eb);',
    'color: #3b82f6;': 'color: var(--primary);',
    'border-color: rgba(59, 130, 246, 0.3);': 'border-color: var(--primary-hover);',
    'background: rgba(59, 130, 246, 0.1);': 'background: rgba(59, 130, 246, 0.1);',
}
for css in css_files:
    text = css.read_text(encoding='utf-8')
    original = text
    for old, new in css_replacements.items():
        text = text.replace(old, new)
    # hero overlay substitutions by regex
    text = re.sub(r'rgba\(11,\s*18,\s*32,\s*0\.(7|75)\)', 'var(--hero-overlay)', text)
    text = re.sub(r'rgba\(11,\s*18,\s*32,\s*0\.(85|9)\)', 'var(--hero-overlay-alt)', text)
    if text != original:
        css.write_text(text, encoding='utf-8')
        print(f'Patched {css.name}')

# 3. Patch HTML files with style1 import, toggle button, and cleanup script tags.
for html in html_files:
    text = html.read_text(encoding='utf-8')
    original = text
    # ensure style1.css is loaded before page-specific stylesheet if page-specific exists
    if 'href="./styles/style1.css"' not in text and 'href="styles/style1.css"' not in text:
        match = re.search(r'(<link\s+rel=["\']stylesheet["\']\s+href=["\'](?:\./)?styles/[^"\']+["\']\s*/?>)', text)
        if match:
            first_css = match.group(1)
            text = text.replace(first_css, first_css + '\n    <link rel="stylesheet" href="./styles/style1.css">')
        else:
            text = text.replace('</title>', '</title>\n    <link rel="stylesheet" href="./styles/style1.css">')
    # remove duplicated or bottom script.js includes
    text = re.sub(r'(?m)^\s*<script\s+src=["\'](?:\./)?scripts/script\.js["\']\s*(?:defer)?\s*>\s*</script>\s*\n?', '', text)
    # add single deferred script include before </head>
    if '<script src="./scripts/script.js" defer></script>' not in text:
        if '</head>' in text:
            text = text.replace('</head>', '  <script src="./scripts/script.js" defer></script>\n</head>')
    # insert theme toggle button once inside nav div
    if 'class="theme-toggle"' not in text and 'class=\'theme-toggle\'' not in text:
        text = re.sub(r'(</a>\s*\n\s*)(</div>\s*</nav>)', r'\1    <button class="theme-toggle" type="button" aria-label="Theme wechseln">🌙</button>\n\2', text, count=1)
    if text != original:
        html.write_text(text, encoding='utf-8')
        print(f'Patched HTML: {html.name}')

print('Done')
