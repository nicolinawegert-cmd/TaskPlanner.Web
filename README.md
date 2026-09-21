# Task Planner – Frontend

En webbapp för att planera uppgifter, byggd med React och Vite.

## Funktioner

- Visa, lägga till och redigera uppgifter.
- Välja status och slutdatum.
- Filtrera listan efter status eller visa alla uppgifter.
- Bifoga en fil och öppna den från uppgiften.
- Ta bort uppgifter efter en bekräftelse.
- Visa en översikt med totalt antal uppgifter, pågående och klara.
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

## Hur koden är uppdelad och varför

### Komponenter med egna uppgifter

- `TaskList` visar listan och använder `TaskItem` för varje uppgift.
- `TaskForm` och `TaskEditForm` innehåller formulären för att skapa och redigera.
- `FileUpload` hanterar valet av fil och uppladdningsknappen.
- `TaskOverview` visar antalet uppgifter totalt, pågående och klara.

Komponenterna ligger i `components/`. Uppdelningen gör att varje komponent har
en tydlig uppgift och blir lättare att läsa och ändra. Till exempel kan
filuppladdningens utseende ändras utan att formuläret för en ny uppgift behöver ändras.

### En gemensam uppgiftslista

Uppgifterna sparas i state i `App.jsx` eftersom både listan och översikten behöver
använda dem. De skickas vidare till komponenterna via props. När en uppgift
ändras uppdateras därför både listan och översikten från samma data.

Formulären använder eget `useState` för det användaren skriver. De anropar
funktioner från `App.jsx` när något ska sparas. Det räcker för den här appen,
så inget extra bibliotek för state behövs.

`TaskOverview` räknar antalen direkt från uppgiftslistan. Antalen sparas inte i
eget state, så de behöver inte uppdateras separat varje gång listan ändras.

Statusfiltret finns i `TaskList` och bestämmer bara vilka uppgifter som visas.
Det filtrerar den redan hämtade listan, så inga extra API-anrop behövs.
Översikten räknar fortfarande alla uppgifter, oavsett vilket filter som är valt.

### API-anrop och felhantering

Anropen till backend ligger samlade i `services/taskService.js`. Det gör dem
lättare att hitta och gör att komponenterna kan fokusera på det som visas på sidan.

Uppgiftslistan ändras först när API-anropet har lyckats. Vid fel visar `App.jsx`
ett felmeddelande. Skapa- och redigeringsformulären behåller inmatningen så att
användaren kan försöka igen. Om en borttagning misslyckas ligger uppgiften kvar.

### Anpassning till olika skärmar

CSS Grid används för att enkelt kunna ändra antalet kolumner efter skärmens bredd.
Uppgiftslistan visar två kolumner på datorskärm och översikten visar tre.
På skärmar som är högst 600 px breda visas båda i en kolumn, så att innehållet
får plats och blir lättare att läsa på mobilen.

## Testning

Appens funktioner har testats manuellt. Layouten har testats på:

- Laptop: 1440 px.
- Mobile M: 375 px.
