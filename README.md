# DUA
Col·lecció de continguts per posar a prova el coneixement sobre Disseny Universal de l'Aprenentatge.

Aquest repositori té com a finalitat principal fer les pràctiques d'un curs de Vibe Code per tal d'aprendre el concepte.

# PLAN

Per tal de començar farem un plan:

> Crear un website introductori per tal d'introduir als/les docents en el Dissen Universal de l'Aprenentatge.

## Passos

1. Resumir el més rellevant del Disseny Universal de l'Aprenentatge.
2. Fer un qüestionari sobre la informació teòrica adreçada als docents.
3) Millorar la web estèticament amb javascript.


## Todos
[✓] Netejar estructura HTML (head/body duplicats, meta tags, Bootstrap)
[✓] Crear style.css amb variables de tema, pestanyes, targetes, mode fosc, animacions
[✓] Crear script.js amb pestanyes, qüestionari de 10 preguntes, correcció, barra de progrés, mode fosc
[✓] Reescriure index.html amb resum teòric DUA (3 principis + introducció)
[✓] Verificar que tot funciona correctament

## Fitxers creats/modificats
- `index.html` -	208	HTML semàntic net, pestanyes Teoria/Qüestionari
- `style.css` -	547	Estils complets amb variables, mode fosc, animacions
- `script.js` -	318	Tota la interactivitat en JS vanilla

## Funcionalitats implementades

### Pas 1 — Resum teòric DUA
- Secció introductòria "Què és el DUA?" amb context de CAST
- 3 targetes dels principis: Representació (👁️), Acció i Expressió (✋), Compromís (❤️)
- Cada targeta inclou: xarxa cerebral associada, descripció, i les 3 pautes
- Secció de les 9 pautes DUA amb graella interactiva

### Pas 2 — Qüestionari per a docents
- 10 preguntes d'opció múltiple sobre la teoria DUA
- Botó "Corregir" amb validació que totes estiguin respondes
- Retroalimentació visual: verd (correcta), vermell (incorrecta), amb icona ✓/✗
- Puntuació final en % amb missatge personalitzat segons el nivell

### Pas 3 — Millores estètiques amb JavaScript
- Pestanyes Teoria / Qüestionari amb transicions suaus
- Mode clar/fosc amb persistència a localStorage
- Barra de progrés que s'actualitza en temps real
- Animacions d'entrada per a les targetes i preguntes
- Disseny responsive per a mòbils
- Botó "Tornar a intentar" per reiniciar el qüestionari

