# Ristorante Barinello - Sito Web

Sito web per il Ristorante Barinello, specializzato in cucina di pesce a Terrasini, Sicilia.

## Tecnologie Utilizzate

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipizzazione statica
- **Tailwind CSS** - Styling utility-first
- **Framer Motion** - Animazioni fluide
- **Supabase** - Database backend
- **next-themes** - Gestione tema dark/light

## Funzionalità

- 🎨 Design responsive ottimizzato per mobile e desktop
- 🌓 Modalità dark/light
- 📸 Gallery verticale interattiva con immagini cliccabili
- 🧭 Navigation bar responsive (top su desktop, bottom su mobile)
- 📱 Ottimizzazione mobile-first

## Installazione

1. Installa le dipendenze:
```bash
pnpm install
```

2. Configura le variabili d'ambiente:
```bash
cp .env.local.example .env.local
```

Aggiungi le tue credenziali Supabase nel file `.env.local`.

3. Avvia il server di sviluppo:
```bash
pnpm dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Configurazione Supabase

1. Crea un progetto su [Supabase](https://supabase.com)
2. Copia l'URL del progetto e la chiave anonima
3. Inseriscile nel file `.env.local`

## Personalizzazione Immagini

Sostituisci le immagini placeholder in `app/page.tsx`:
- `coverImage` - Immagine di copertina
- `profileImage` - Immagine profilo
- `galleryImages` - Array di immagini per la gallery

## Build per Produzione

```bash
pnpm build
pnpm start
```

## Licenza

Proprietario: Ristorante Barinello

