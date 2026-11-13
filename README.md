# Suma

Andriaus ir Ramūno kalkuliatorius, sukurtas naudojant Next.js, React ir TypeScript.
Kalkuliatorius sudeda, atima, daugina arba dalija du skaičius. Duomenų bazės ir API raktų nereikia.

## Paleidimas

Reikia Node.js 22.18 arba naujesnės versijos ir npm.

```sh
npm ci
npm run dev
```

Atidarykite http://localhost:3000. Windows PowerShell aplinkoje, jei blokuojamas
`npm.ps1`, naudokite `npm.cmd ci` ir `npm.cmd run dev`.

## Aplinkos kintamieji

Projektas veikia be `.env`. Jei norite pasiruošti vietinį nustatymų failą:

```powershell
Copy-Item .env.example .env
```

`.env.example` yra bendras šablonas be paslapčių. Pridėję naują būtiną kintamąjį,
papildykite jį pavyzdžiu, kad kolega žinotų, ką nustatyti savo kompiuteryje.
Tikri raktai laikomi tik ignoruojamame `.env`. `NEXT_PUBLIC_` kintamieji yra vieši
ir matomi naršyklėje, todėl juose negalima laikyti slaptų raktų.
Jei reikės DB, naudosime Supabase; kol kas jo konfigūracijos nereikia.

## Komandos

```sh
npm test              # sumavimas ir netinkama įvestis
npm run typecheck     # TypeScript patikra
npm run build         # produkcinis surinkimas
npm start             # paleidimas po surinkimo
```

## Kaip naudotis

Įveskite du skaičius, pasirinkite „Sudėtis“, „Atimtis“, „Daugyba“ arba „Dalyba“ ir spauskite
„Sudėti skaičius“ / „Atimti skaičius“ / „Dauginti skaičius“ / „Padalyti skaičius“ arba Enter. Pagal nutylėjimą pasirinkta sudėtis.
Atimties atveju iš pirmo skaičiaus atimamas antras.
Dalybos atveju pirmas skaičius dalijamas iš antro. Dalyti iš nulio negalima.
Palaikomi neigiami skaičiai, kablelis ir taškas trupmenoms.
„Išvalyti laukus“ išvalo įvestį ir rezultatą.
Skaičiavimai vyksta naršyklėje, niekur nesiunčiami ir nesaugomi.
Naudojami JavaScript skaičiai; rezultatas apvalinamas iki 15 reikšminių skaitmenų.
Tai bendros paskirties kalkuliatorius, netinkamas tiksliam finansiniam skaičiavimui.

## Darbas per GitHub

Į repozitoriją įtraukite šaltinio failus, `.gitignore`, `.env.example`,
`package.json` ir `package-lock.json`. Kolega po klonavimo vykdo `npm ci`.
`node_modules/`, `.next/` ir `.env` bei jo variantai ignoruojami.

Kiekvienai užduočiai kurkite atskirą šaką ir pakeitimus sujunkite per Pull Request.
Prieš commit patikrinkite `git status` ir `git diff --cached`.
`.gitignore` nepašalina jau sekamų failų: jei paslaptis anksčiau pateko į Git,
pašalinkite failą iš sekimo ir pakeiskite atskleistą raktą.

Next.js dokumentacija: https://nextjs.org/docs/app/getting-started/installation
