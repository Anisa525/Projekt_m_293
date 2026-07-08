KI-DOKU.md
KI-Dokumentation – Evaluation, Einsatz und Reflexion (Ich-Perspektive)
1. Einleitung

Im Rahmen meines Webentwicklungsprojekts habe ich intensiv mit künstlicher Intelligenz gearbeitet. Ziel war es, die Entwicklung meiner Website effizienter, moderner und fehlerfreier umzusetzen.

Dabei habe ich KI nicht nur als „Codegenerator“, sondern als Lern-, Analyse- und Entwicklungswerkzeug verwendet.

Die KI hat mich in allen Projektphasen unterstützt:

Planung der Website-Struktur
Entwicklung von HTML, CSS und JavaScript
Debugging von Fehlern
Verbesserung des Designs
Optimierung der Benutzerfreundlichkeit (UX/UI)

Diese Dokumentation zeigt:

welche KI-Tools ich getestet habe
warum ich mich entschieden habe
wie ich KI konkret eingesetzt habe
welche Erfahrungen ich gemacht habe
welche Farben und Designentscheidungen verwendet wurden
2. Projektziele mit KI-Unterstützung

Meine Ziele beim Einsatz der KI waren:

schnelleres Entwickeln der Website
bessere Codequalität
Unterstützung beim responsiven Design
Umsetzung eines Dark-/Light-Modes
Speicherung von Benutzer-Einstellungen
Fehler schneller finden und lösen
professionelleres UI-Design
3. Evaluierte KI-Werkzeuge

Ich habe zwei KI-Tools miteinander verglichen:

3.1 ChatGPT (OpenAI)

ChatGPT wurde als dialogbasierte KI genutzt, die mir in folgenden Bereichen geholfen hat:

Erklärung von Code
Erstellung von CSS/JS Lösungen
Debugging von Fehlern
Strukturierung von Projekten
Planung von Features

👉 Vorteil: sehr flexibel und verständlich
👉 Nachteil: nicht direkt im Code-Editor integriert

3.2 GitHub Copilot

GitHub Copilot wurde direkt in VS Code getestet:

automatische Codevervollständigung
Vorschläge während des Tippens
schnelle Code-Snippets

👉 Vorteil: sehr schnell im Schreiben von Code
👉 Nachteil: kaum Erklärungen, wenig Kontextverständnis

4. Nutzwertanalyse

Bewertungsskala:
1 = schlecht | 2 = genügend | 3 = gut | 4 = sehr gut | 5 = ausgezeichnet

Kriterium	ChatGPT	GitHub Copilot
Codequalität	5	4
Verständnis & Erklärungen	5	2
Debugging	5	3
IDE-Integration	3	5
Geschwindigkeit	4	5
Lernunterstützung	5	2
Flexibilität	5	3
Projektverständnis	5	3
Gesamtergebnis:
ChatGPT: 37 / 40
Copilot: 27 / 40
5. Entscheidung für ChatGPT

Ich habe mich für ChatGPT als Haupt-KI entschieden, weil:

ich nicht nur Code brauche, sondern auch Verständnis
ich Probleme analysieren wollte
ich CSS- und Layoutfehler besser verstehen wollte
ich komplexe Funktionen wie Dark Mode selbst nachvollziehen wollte

GitHub Copilot war hilfreich für schnelle Codevorschläge, aber nicht für das Verständnis des Projekts.

6. Design & Farbkonzept der Website

Ein wichtiger Teil meines Projekts war das visuelle Design. Dafür habe ich ein modernes Farbsystem mit Dark- und Light-Mode entwickelt.

Die KI hat mir geholfen:

Farbpaletten zu definieren
Kontraste zu verbessern
CSS-Variablen zu strukturieren
Theme-Wechsel umzusetzen
6.1 Verwendete Farben
🔵 Primärfarben
<div style="display:flex; gap:10px; flex-wrap:wrap;"> <div style="width:120px;height:60px;background:#0b1220;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #0b1220<br>Background </div> <div style="width:120px;height:60px;background:#1e293b;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #1e293b<br>Nav/Footer </div> <div style="width:120px;height:60px;background:#2563eb;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #2563eb<br>Accent </div> </div>
🌙 Dark Mode Farben
<div style="display:flex; gap:10px; flex-wrap:wrap;"> <div style="width:120px;height:60px;background:#0b1220;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #0b1220<br>BG </div> <div style="width:120px;height:60px;background:#e2e8f0;color:black;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #e2e8f0<br>Text </div> </div>
☀️ Light Mode Farben
<div style="display:flex; gap:10px; flex-wrap:wrap;"> <div style="width:120px;height:60px;background:#ffffff;color:black;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid #ccc;"> #ffffff<br>BG </div> <div style="width:120px;height:60px;background:#111111;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #111111<br>Text </div> </div>
🎨 UI Akzentfarben
<div style="display:flex; gap:10px; flex-wrap:wrap;"> <div style="width:120px;height:60px;background:#38bdf8;color:black;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #38bdf8<br>Hover </div> <div style="width:120px;height:60px;background:#22c55e;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #22c55e<br>Success </div> <div style="width:120px;height:60px;background:#ef4444;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;"> #ef4444<br>Error </div> </div>
6.2 Einsatz der Farben im Projekt

Die Farben wurden in CSS-Variablen gespeichert:

:root {
  --bg: #0b1220;
  --text: #e2e8f0;
  --nav: #1e293b;
  --accent: #2563eb;
}
6.3 Problem: Inkonsistente Darstellung

Ich hatte am Anfang Probleme:

Farben waren nicht überall gleich
Navigation hatte andere Hintergrundfarben
Dark Mode wurde nicht überall übernommen

👉 Die KI hat mir geholfen, das zu lösen durch:

globale CSS-Variablen
einheitliche body-Klassen
strukturierte Theme-Logik
7. Konkreter KI-Einsatz im Projekt
7.1 Navigation & Responsive Design

Problem:

Menü war auf Mobile verschoben
Elemente hatten unterschiedliche Größen

Lösung durch KI:

Flexbox Optimierung
Media Queries
einheitliche Abstände
@media (max-width: 900px) {
  nav {
    flex-wrap: wrap;
    gap: 12px;
  }
}
7.2 Dark / Light Mode

Die KI half mir beim kompletten System:

Toggle Button
Speicherung im Local Storage
CSS Variablen
localStorage.setItem("theme", "dark");
document.body.classList.add("dark");
7.3 Fehlerbehebung

Typische Probleme:

CSS wurde überschrieben
Layout war nicht stabil
Schriftgrößen waren unterschiedlich
Speicherfunktion hat nicht funktioniert

Die KI hat mir geholfen:

Ursachen zu finden
Code zu vereinheitlichen
Struktur zu verbessern
8. Vorteile der KI im Projekt
sehr schnelle Hilfe
gute Erklärungen
spart viel Zeit
hilft beim Lernen
unterstützt bei komplexen Problemen
9. Nachteile der KI
nicht immer 100 % projektgenau
manchmal zu allgemeine Antworten
muss selbst angepasst werden
ersetzt kein Verständnis
10. Persönliche Reflexion

Ich habe durch die Arbeit mit KI gelernt:

wie Webentwicklung effizienter funktioniert
wie CSS-Variablen eingesetzt werden
wie man JavaScript für UI nutzt
wie wichtig Struktur im Code ist

Besonders wichtig war die Erkenntnis:
👉 KI ist ein Werkzeug, kein Ersatz für eigenes Denken.

11. Fazit

Der Einsatz von KI war für mein Projekt sehr hilfreich und hat mir ermöglicht, eine moderne und funktionierende Website zu entwickeln.

ChatGPT war dabei das wichtigste Werkzeug, da es mir nicht nur Lösungen geliefert hat, sondern auch Verständnis vermittelt hat.