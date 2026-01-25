# 🔐 Salalausegeneraattori

Luotu Tekoälyn perusteet kurssin lopputyönä VSCoden Copilot-laajennuksen avulla.
Turvallinen ja helppokäyttöinen suomenkielinen salalausegeneraattori. Luo vahvoja, helposti muistettavia salasanoja suomalaisilla sanoilla kryptografisesti turvallisesti.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)

## ✨ Ominaisuudet

- 🔒 **Kryptografisesti turvallinen** - Käyttää Web Crypto API:ta
- 🇫🇮 **Suomalaiset sanat** - Yli 100,000 suomalaista sanaa
- 🎨 **Moderni UI** - Responsiivinen, tumma teema, Tailwind CSS
- ⚡ **Nopea ja kevyt** - Vite + React
- 🔐 **Täysi yksityisyys** - Salasanat luodaan paikallisesti, ei lähetetä palvelimelle
- ♿ **Saavutettavuus** - WCAG 2.1 Level AA yhteensopiva
- 📱 **Responsiivinen** - Toimii kaikilla laitteilla
- 🌙 **Tumma tila** - Automaattinen teeman vaihto
- 📊 **Entropia-indikaattori** - Näyttää salasanan vahvuuden
- ⚙️ **Muokattava** - Monta vaihtoehtoa salasanan luomiseen

## 🚀 Pika-aloitus

### Edellytykset

- Node.js 18+ ja npm 9+
- Git

### Asennus

1. **Kloonaa repositorio**
```bash
git clone https://github.com/Echo-Override/fin-passphrase-generator.git
cd fin-passphrase-generator
```

2. **Asenna riippuvuudet**
```bash
npm install
```

3. **Käynnistä kehityspalvelin**
```bash
npm run dev
```

4. **Avaa selaimessa**
```
http://localhost:3000
```

## 📦 Skriptit

```bash
# Kehitys
npm run dev              # Käynnistä dev-palvelin

# Tuotanto
npm run build            # Rakenna tuotantoon
npm run preview          # Esikatsele build

# Testaus
npm test                 # Aja testit
npm run test:watch       # Aja testit watch-tilassa
npm run test:coverage    # Testikattavuus

# Koodin laatu
npm run lint             # Tarkista koodin laatu
npm run lint:fix         # Korjaa lint-virheet
npm run format           # Formatoi koodi
npm run format:check     # Tarkista formatointi
npm run type-check       # Tarkista tyypit
```

## 🏗️ Projektin rakenne

```
fin-passphrase-generator/
├── api/                      # Vercel serverless functions
│   └── words.js             # API endpoint sanaluettelolle
├── public/                   # Staattiset tiedostot
│   ├── security.txt         # Tietoturva-raportit
│   ├── robots.txt           # SEO
│   └── favicon.svg          # Favicon
├── src/
│   ├── components/          # React-komponentit
│   │   ├── Header.tsx
│   │   ├── PasswordDisplay.tsx
│   │   ├── PasswordGenerator.tsx
│   │   └── Settings.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useCopyToClipboard.ts
│   │   ├── useDarkMode.ts
│   │   ├── useLocalStorage.ts
│   │   └── usePasswordGenerator.ts
│   ├── styles/              # CSS-tyylit
│   │   └── globals.css
│   ├── tests/               # Testit
│   │   ├── setup.ts
│   │   └── utils/
│   ├── utils/               # Apufunktiot
│   │   ├── constants.ts     # Vakiot
│   │   ├── passphrase.ts      # Salasanageneraattori
│   │   └── security.ts      # Turvallisuustyökalut
│   ├── App.tsx              # Pääkomponentti
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # TypeScript definitions
├── words.json               # Sanaluettelo (102,993 sanaa)
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── vercel.json              # Vercel deployment config
├── tailwind.config.js       # Tailwind CSS config
└── README.md                # Tämä tiedosto
```

## 🔐 Turvallisuus

### Turvallisuusominaisuudet

- ✅ **Web Crypto API** - Kryptografisesti turvallinen satunnaisuus
- ✅ **Client-side generation** - Salasanat eivät koskaan poistu selaimesta
- ✅ **Content Security Policy** - Estää XSS-hyökkäykset
- ✅ **Security headers** - X-Frame-Options, X-Content-Type-Options, jne.
- ✅ **Rate limiting** - API-kutsujen rajoitus
- ✅ **Input validation** - Kaikki syötteet validoidaan
- ✅ **No logging** - Salasanoja ei kirjata mihinkään
- ✅ **HTTPS only** - Pakotettu HTTPS Vercelissä

## 🌐 Vercel-käyttöönotto

### Automaattinen käyttöönotto

1. **Pushaa GitHubiin**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Yhdistä Verceliin**
   - Mene [vercel.com](https://vercel.com)
   - Klikkaa "New Project"
   - Import your GitHub repository
   - Vercel tunnistaa asetukset automaattisesti
   - Klikkaa "Deploy"

### Manuaalinen käyttöönotto

```bash
# Asenna Vercel CLI
npm i -g vercel

# Kirjaudu
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### Ympäristömuuttujat

Luo `.env.local` tiedosto:

```env
VITE_API_BASE_URL=http://localhost:3000
API_RATE_LIMIT_MAX=100
API_RATE_LIMIT_WINDOW=900000
```

Vercelissä aseta nämä Project Settings > Environment Variables -kohdassa.

## 🧪 Testaus

Projekti käyttää Vitestiä ja Testing Library -kirjastoa.

```bash
# Aja kaikki testit
npm test

# Watch mode
npm run test:watch

# Testikattavuus
npm run test:coverage
```

### Testikattavuustavoite

- ✅ Lines: 80%+
- ✅ Functions: 80%+
- ✅ Branches: 80%+
- ✅ Statements: 80%+

## 🎨 Muokkaaminen

### Väriteemat

Muokkaa `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Omat värisi
      },
    },
  },
},
```

### Tekstit

Kaikki tekstit ovat `src/utils/constants.ts`:ssä:

```typescript
export const UI_TEXT = {
  APP_TITLE: 'Salalausegeneraattori',
  // ... muut tekstit
};
```

### Sanaluettelo

Korvaa `words.json` omalla sanaluettelollasi:

```json
{
  "words": [
    "sana1",
    "sana2",
    ...
  ]
}
```

## 📝 Lisenssi

MIT License - katso [LICENSE](LICENSE) tiedosto

## 🤝 Kontribuutiot

Kontribuutiot ovat tervetulleita!

1. Fork projekti
2. Luo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit muutokset (`git commit -m 'Add some AmazingFeature'`)
4. Push branchiin (`git push origin feature/AmazingFeature`)
5. Avaa Pull Request

### Kehitysohjeet

- Noudata ESLint sääntöjä
- Kirjoita testit uusille ominaisuuksille
- Päivitä dokumentaatio
- Käytä semanttisia commit-viestejä

## � Sanalistan lähde

Tämä projekti käyttää **Nykysuomen sanalistaa**, joka on Kotimaisten kielten keskuksen (Kotus) julkaisema sanaluettelo.

- **Lähde**: [Nykysuomen sanalista](https://kotus.fi/sanakirjat/kielitoimiston-sanakirja/nykysuomen-sana-aineistot/nykysuomen-sanalista/)
- **Julkaisija**: Kotimaisten kielten keskus (Kotus)
- **Lisenssi**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fi) (Creative Commons Nimeä 4.0)

Sanalista sisältää yli 100 000 suomen kielen sanaa ja se on vapaasti käytettävissä edellyttäen, että lähde mainitaan.

## 🙏 Kiitokset

- [Kotus](https://kotus.fi/) - Nykysuomen sanalista (CC BY 4.0)
- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Hosting

## 📞 Yhteystiedot

- **Projektin kotisivu**: [https://passphrase-generator.vercel.app](https://passphrase-generator.vercel.app)
- **Email**: p77112@edu.sasky.fi

## 📊 Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

**Huomaa:** Tämä on avoimen lähdekoodin projekti. Käytä omalla vastuullasi ja tarkista aina salasanakäytäntösi organisaatiosi ohjeiden mukaan.

🔐 **Luo turvallisia salasanoja - aina ja kaikkialla!**
