
# Comença mirant el producte creat

[https://inclusaedu.github.io/DUA/](https://inclusaedu.github.io/DUA/)


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

# Desenvolupat amb IA

1. Orquestador utilitzat: [OpenCode.ai](https://opencode.ai/)
2. Ens baixem el paquet `curl -fsSL https://opencode.ai/install | bash`
3. Cal elegir una IA, elegim Zen, ja que és gratuïta. Ho fem tancant la terminal per tal que tinga en conte la instal·lació i utilitzem el caracter `/` per tal l'elegir el model, en aquest cas Zen.
4. Com que ens hem loguejat amb **Zen** mitjançant una `passkey` generada, escanegem amb Microsoft Authenticator el qr de la `passkey` i ens demana associar-ho a l'usuari de **Microsoft Authenticator** amb el compte de **GitHub** que hem obert per fer al curset en **Github Education**.
5. Obrim la terminal a la carpeta del nostre projecte local de Github, en aquest cas `DUA`.
6. Obrim OpenCode escrivint això mateix al terminal.
7. Amb el tabulador elegim la paraula `Plan` i li proposem el que cal desenvolupar. Ho escrivim al terminal.
8. Ens desenvolupa el plan i el deixa a la terminal, a la sessió de Zen. Podrem recuperar-ho deperès escrivint `/session` i elegint la sessió que hem creat anteriorment.
9. Amb el tabulador elegim la paraula `Build` per tal que construisca el projecte.

El resultat és un projecte de 3 arxius:
- `index.html`
- `style.css`
- `script.js`

Es pot accedir al projecte amb aquesta url: [https://inclusaedu.github.io/DUA/](https://inclusaedu.github.io/DUA/)
