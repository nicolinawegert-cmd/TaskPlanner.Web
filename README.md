# Task Planner – Frontend

En webbapp för att planera uppgifter, byggd med React och Vite.

## Funktioner

- Visa, lägga till och redigera uppgifter.
- Välja status och slutdatum.
- Bifoga en fil och öppna den från uppgiften.
- Ta bort uppgifter efter en bekräftelse.
- Visa ett felmeddelande om ett API-anrop misslyckas.

## Starta projektet

Du behöver Git och [Node.js 24.x med npm](https://nodejs.org/en/download).

Appen behöver också sitt API. Följ
[startguiden i backend-repot](https://github.com/nicolinawegert-cmd/TaskPlanner#starta-projektet)
och låt backend vara igång i en egen terminal.

Öppna sedan en ny terminal och kör:

```sh
git clone https://github.com/nicolinawegert-cmd/TaskPlanner.Web.git
cd TaskPlanner.Web
npm ci
npm run dev
```

Öppna [http://localhost:5173](http://localhost:5173) i webbläsaren.
`npm ci` installerar projektets paket och `npm run dev` startar appen.

Frontend använder port `5173` och anropar backend på port `5035`.
Om appen inte kan hämta uppgifter, kontrollera att backend är igång.
Använd adressen med `localhost`, eftersom backend är inställd för den.

Stoppa frontend med `Ctrl+C`. Nästa gång räcker det att köra
`npm run dev` i projektmappen.

## Hur koden är uppdelad

- `App.jsx` håller reda på uppgifterna och felmeddelandena.
- `components/` innehåller formulär, lista, uppgiftskort och filuppladdning.
- `services/taskService.js` innehåller anropen till API:t.

Komponenterna är uppdelade för att göra koden lättare att hitta i och ändra.
API-anropen ligger i en egen fil så att samma kod inte behöver skrivas på flera ställen.
Reacts `useState` används för formulär och uppgiftslistan. Appen är liten nog att
inte behöva ett extra bibliotek för detta.

CSS Grid används för uppgiftslistan. Den visar två kolumner på datorskärm och en
kolumn på skärmar som är högst 600 px breda.

## Testning

Appens funktioner har testats manuellt. Layouten har testats på:

- Laptop: 1440 px.
- Mobile M: 375 px.
