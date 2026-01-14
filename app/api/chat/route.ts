import { NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.GROQ_API_KEY || process.env.groq_api_key || ""

// Funzione per generare il menù completo in formato testo
function generateMenuText(): string {
  const menuCategories = [
    {
      title: "Antipasti di Mare",
      dishes: [
        { name: "Polipetti Murati", description: "Polipetti marinati con olio, limone e prezzemolo", price: "€16.00" },
        { name: "Ostrica", description: "Ostriche freschissime del giorno", price: "€4.00" },
        { name: "Insalata di Mare", description: "Polpo, Calamari, Cozze, Vongole, Carote, Sedano", price: "€15.00" },
        { name: "Caponata di Pesce Spada", description: "Pesce spada, Melanzane, Sedano, Olive, Capperi", price: "€14.00" },
        { name: "Cocktail di Gamberi", description: "Gamberi, Lattuga, Salsa cocktail", price: "€14.00" },
        { name: "Gamberi Marinati", description: "Gamberi, Olio, Limone", price: "€14.00" },
        { name: "Pepata di Cozze", description: "Cozze fresche con pepe nero e vino bianco", price: "€12.00" },
        { name: "Plateau Frutti di Mare (per 2 persone)", description: "Ostriche, Vongole, Scampi, Sashimi di Salmone, Pesce del Giorno, Caviale 10 gr", price: "€55.00" },
        { name: "Degustazione Barinello", description: "Selezione speciale del nostro chef", price: "€20.00" },
        { name: "Souté di Vongole", description: "Vongole fresche in padella con aglio e prezzemolo", price: "€18.00" },
        { name: "Antipasto di Mare", description: "Selezione di crudi, gamberi, polpo e cozze", price: "€18.00" },
        { name: "Carpaccio di Pesce Spada", description: "Pesce spada fresco con olio extravergine e limone", price: "€15.00" },
        { name: "Insalata di Polpo", description: "Polpo bollito con patate, olive e prezzemolo", price: "€12.00" },
        { name: "Cozze alla Marinara", description: "Cozze fresche con pomodoro, aglio e prezzemolo", price: "€10.00" },
        { name: "Gamberi in Guazzetto", description: "Gamberi freschi in salsa di pomodoro e vino bianco", price: "€14.00" }
      ]
    },
    {
      title: "Antipasti di Carne",
      dishes: [
        { name: "Songino, Crudo e Burrata", description: "Songino fresco, prosciutto crudo e burrata cremosa", price: "€12.00" },
        { name: "Bruschetta Pomodoro", description: "Pane tostato con pomodoro fresco, aglio e basilico", price: "€7.00" },
        { name: "Misto Caldo", description: "Patatine, Panelle, Crocché", price: "€8.00" },
        { name: "Tagliere Salumi e Formaggi", description: "Selezione di salumi e formaggi siciliani", price: "€14.00" }
      ]
    },
    {
      title: "Primi Piatti di Mare",
      dishes: [
        { name: "Tagliolino Ricci e Gambero", description: "Tagliolino fresco con ricci di mare e gamberi", price: "€26.00" },
        { name: "Spaghetti con Ricci", description: "Spaghetti con ricci di mare freschissimi", price: "€30.00" },
        { name: "Tagliolino con Gambero", description: "Gambero, Pomodorino, Granello di pistacchio, Lime", price: "€20.00" },
        { name: "Ravioli di Cernia", description: "Cozze, Vongole, Gambero, Pomodorino", price: "€22.00" },
        { name: "Spaghetti Cozze e Vongole", description: "Spaghetti con cozze e vongole fresche", price: "€18.00" },
        { name: "Farfalle al Salmone", description: "Farfalle con salmone fresco e panna", price: "€15.00" },
        { name: "Tagliolino Gambero e Vongole", description: "Tagliolino, Gambero, Vongole e pistacchio", price: "€22.00" },
        { name: "Calamarata", description: "Polpetti, Calamari, Pomodorini", price: "€20.00" },
        { name: "Spaghetti con Vongole", description: "Spaghetti con vongole veraci, aglio, prezzemolo e vino bianco", price: "€18.00" },
        { name: "Spaghetti Cozze", description: "Cozze, Pomodorini", price: "€16.00" },
        { name: "Spaghetti con Ragù di Polpo", description: "Spaghetti con ragù di polpo e pomodoro", price: "€18.00" },
        { name: "Linguine all'Astice", description: "Linguine con astice fresco, pomodorini e basilico", price: "€22.00" },
        { name: "Risotto ai Frutti di Mare", description: "Risotto cremoso con frutti di mare freschi", price: "€18.00" },
        { name: "Pasta con Sarde", description: "Pasta tradizionale siciliana con sarde, finocchietto e pinoli", price: "€14.00" },
        { name: "Bucatini alle Cicale", description: "Bucatini con cicale di mare, pomodorini e prezzemolo", price: "€19.00" }
      ]
    },
    {
      title: "Primi Piatti di Carne",
      dishes: [
        { name: "Spaghetti alla Norma", description: "Salsa di pomodoro, Melanzane fritte, Ricotta salata", price: "€12.00" },
        { name: "Spaghetti alla Carbonara", description: "Guanciale, Uova, Pecorino, Pepe", price: "€14.00" },
        { name: "Paccheri Crema di Funghi, Noci e Guanciale", description: "Paccheri con crema di funghi, noci e guanciale croccante", price: "€15.00" }
      ]
    },
    {
      title: "Secondi Piatti di Mare",
      dishes: [
        { name: "Polpo Grill con Purea di Patate", description: "Polpo grigliato con purea di patate cremosa", price: "€15.00" },
        { name: "Frittura di Cappuccetti", description: "Frittura di piccoli pesci freschi", price: "€18.00" },
        { name: "Pesce Spada Grigliato", description: "Trancio di pesce spada fresco grigliato", price: "€16.00" },
        { name: "Calamaro Grigliato", description: "Calamaro fresco grigliato con limone", price: "€16.00" },
        { name: "Grigliata Mista di Pesce (per 2 persone)", description: "Pesce spada, Calamaro grigliato, 2 p. Gamberi", price: "€35.00" },
        { name: "Frittura di Pesce", description: "Calamaro, Gambero, Latterino", price: "€18.00" },
        { name: "Gamberi Grill", description: "Gamberi", price: "€16.00" },
        { name: "Branzino al Sale", description: "Branzino intero cotto al sale grosso con contorno", price: "€22.00" },
        { name: "Orata al Forno", description: "Orata fresca al forno con patate e pomodorini", price: "€20.00" },
        { name: "Calamari Ripieni", description: "Calamari ripieni con pangrattato, aglio, prezzemolo e uova", price: "€16.00" },
        { name: "Tonno alla Siciliana", description: "Trancio di tonno fresco con cipolla, capperi e olive", price: "€23.00" }
      ]
    },
    {
      title: "Secondi Piatti di Carne",
      dishes: [
        { name: "Fetta di Arrosto Panato", description: "Fetta di arrosto panato e croccante", price: "€12.00" },
        { name: "Tomahawk", description: "Bistecca Tomahawk di prima qualità", price: "€5.00" },
        { name: "Angus", description: "Bistecca Angus (per etto)", price: "€9.00" },
        { name: "Grigliata Mista", description: "Grigliata mista di carni", price: "€20.00" },
        { name: "Stinco di Maiale con Patate al Forno", description: "Stinco di maiale con patate al forno", price: "€18.00" },
        { name: "Pollo Grigliato o Panato", description: "Pollo grigliato o panato a scelta", price: "€10.00" }
      ]
    },
    {
      title: "Contorni",
      dishes: [
        { name: "Insalata Verde", description: "Insalata verde fresca", price: "€3.00" },
        { name: "Insalata Mista", description: "Insalata fresca di stagione", price: "€4.00" },
        { name: "Patate al Forno", description: "Patate al forno con rosmarino", price: "€5.00" },
        { name: "Patate Fritte", description: "Patate fritte croccanti", price: "€5.00" },
        { name: "Verdure Grigliate", description: "Melanzane, zucchine e peperoni grigliati", price: "€5.00" },
        { name: "Coperto", description: "Coperto per persona", price: "€2.50" }
      ]
    },
    {
      title: "Dolci",
      dishes: [
        { name: "Sorbetto al Limoncello", description: "Sorbetto fresco al limoncello", price: "€6.00" },
        { name: "Flute Frutti di Bosco", description: "Flute con frutti di bosco freschi", price: "€6.00" },
        { name: "Tiramisù", description: "Tiramisù fatto in casa", price: "€6.00" },
        { name: "Cassatina", description: "Piccola cassata siciliana", price: "€4.00" },
        { name: "Cannolo Scomposto", description: "Cannolo in versione moderna e scomposta", price: "€5.00" },
        { name: "Cheesecake", description: "Cheesecake al Nutella o pistacchio", price: "€6.00" },
        { name: "Cannolo", description: "Cannolo tradizionale con ricotta fresca", price: "€4.00" },
        { name: "Crepes Nutella", description: "Crepes calde con Nutella", price: "€5.00" },
        { name: "Tortino Cuore Caldo", description: "Tortino al cioccolato o pistacchio", price: "€6.00" },
        { name: "Cannolo Siciliano", description: "Cannolo con ricotta fresca e cioccolato", price: "€6.00" },
        { name: "Cassata Siciliana", description: "Cassata tradizionale con ricotta e canditi", price: "€7.00" },
        { name: "Granita", description: "Granita al limone, mandorla o caffè", price: "€5.00" }
      ]
    },
    {
      title: "Birre",
      dishes: [
        { name: "Heineken", description: "33 cl", price: "€4.00" },
        { name: "Beck's", description: "33 cl", price: "€4.00" },
        { name: "Ceres", description: "", price: "€5.00" },
        { name: "Tennent's", description: "33 cl", price: "€5.00" },
        { name: "Nastro Azzurro", description: "33 cl", price: "€4.00" },
        { name: "Nastro Azzurro 0.0", description: "33 cl", price: "€4.00" },
        { name: "Corona", description: "33 cl", price: "€5.00" },
        { name: "Daura Gluten Free", description: "", price: "€5.00" },
        { name: "Paulaner", description: "50 cl", price: "€6.00" },
        { name: "Ichnusa", description: "33 cl", price: "€5.00" },
        { name: "Messina", description: "33 cl", price: "€5.00" },
        { name: "Leffe", description: "33 cl", price: "€5.00" },
        { name: "Leffe Rossa", description: "33 cl", price: "€5.00" }
      ]
    },
    {
      title: "Vini Bianchi",
      dishes: [
        { name: "Rosa dei Venti (Gorghi Tondi) Nerello Mascalese", description: "", price: "€24.00" },
        { name: "Kheire (Gorghi Tondi) Grillo Riserva 2023", description: "", price: "€50.00" },
        { name: "Marameo (Gorghi Tondi) Blend Biologico", description: "", price: "€28.00" },
        { name: "Coste a Preola (Gorghi Tondi) Grillo", description: "", price: "€24.00" },
        { name: "Tenuta Regaleali Leone", description: "", price: "€35.00" },
        { name: "Maria Costanza", description: "", price: "€38.00" },
        { name: "Grillo (Cantina Musita)", description: "", price: "€22.00" },
        { name: "Chardonnay (Cantina Musita)", description: "", price: "€22.00" },
        { name: "Catarratto Pinot Grigio (Cantina Musita)", description: "", price: "€22.00" },
        { name: "Organicus Catarratto (Cantina Musita)", description: "", price: "€28.00" },
        { name: "Organicus Zibibbo (Cantina Musita)", description: "", price: "€28.00" },
        { name: "Passo Calcara (Cantina Musita)", description: "", price: "€30.00" },
        { name: "Reggiterre (Cantina Musita)", description: "", price: "€25.00" },
        { name: "Organicus Grillo (Cantina Musita)", description: "", price: "€28.00" }
      ]
    },
    {
      title: "Vini Frizzanti e Spumanti",
      dishes: [
        { name: "Charme", description: "", price: "€30.00" },
        { name: "Acqua Marina", description: "", price: "€22.00" },
        { name: "Coppola Anymus", description: "", price: "€25.00" },
        { name: "Acqua Marina Rosé", description: "", price: "€22.00" },
        { name: "Col Sandaco Rosé", description: "", price: "€30.00" },
        { name: "Col Sandaco Brut", description: "", price: "€20.00" },
        { name: "Metodo Ancestrale \"Barinello\"", description: "", price: "€35.00" }
      ]
    },
    {
      title: "Vini Rossi",
      dishes: [
        { name: "Coste a Preola (Gorghi Tondi) Nero d'Avola", description: "", price: "€24.00" },
        { name: "Meridiano (Gorghi Tondi) Syrah", description: "", price: "€24.00" },
        { name: "Frappato Organicus", description: "", price: "€28.00" },
        { name: "Reggiterre", description: "", price: "€25.00" },
        { name: "Col Sandago Camoi", description: "", price: "€38.00" },
        { name: "Maria Costanza", description: "", price: "€40.00" }
      ]
    },
    {
      title: "Bibite",
      dishes: [
        { name: "Acqua", description: "50 cl", price: "€1.50" },
        { name: "Acqua", description: "1 lt", price: "€3.00" },
        { name: "Coca Cola", description: "33 cl", price: "€2.50" },
        { name: "Coca Cola Zero", description: "33 cl", price: "€2.50" },
        { name: "Fanta", description: "33 cl", price: "€2.50" },
        { name: "Sprite", description: "33 cl", price: "€2.50" },
        { name: "Chinotto", description: "33 cl", price: "€2.50" },
        { name: "Thé Pesca / Limone", description: "", price: "€2.50" },
        { name: "Schweppes Lemon / Tonic", description: "", price: "€2.50" },
        { name: "Fever-Tree", description: "Mediterranean, Indian, Fever-Tree Ginger Beer, Fever-Tree Pink Grapefruit", price: "€3.00" }
      ]
    },
    {
      title: "Caffetteria",
      dishes: [
        { name: "Caffè", description: "", price: "€1.50" },
        { name: "Caffè Doppio", description: "", price: "€3.00" },
        { name: "Caffè Macchiato", description: "", price: "€1.50" },
        { name: "Caffè Americano", description: "", price: "€2.50" },
        { name: "Decaffeinato", description: "", price: "€1.80" },
        { name: "Cappuccino", description: "", price: "€2.50" },
        { name: "Cappuccino di Soia", description: "", price: "€2.80" },
        { name: "Cappuccino senza Lattosio", description: "", price: "€2.80" },
        { name: "Macchiatone", description: "", price: "€2.00" },
        { name: "Latte Bianco", description: "", price: "€1.80" },
        { name: "Latte Macchiato", description: "", price: "€2.50" },
        { name: "Thé Caldo", description: "", price: "€3.50" },
        { name: "Tisane", description: "", price: "€3.50" },
        { name: "Infusi", description: "", price: "€3.50" },
        { name: "Succo di Frutta", description: "", price: "€2.50" },
        { name: "Succo di Melograno", description: "", price: "€3.00" },
        { name: "Succo al Mirtillo", description: "", price: "€3.00" },
        { name: "Ginseng piccolo", description: "", price: "€1.80" },
        { name: "Ginseng grande", description: "", price: "€2.50" },
        { name: "Cremino", description: "", price: "€4.00" },
        { name: "Cornetto", description: "", price: "€1.50" },
        { name: "Cornetto Special", description: "", price: "€1.80" },
        { name: "Mignon Dolce / Salato", description: "", price: "€1.00" },
        { name: "Rosticceria", description: "", price: "€2.00" },
        { name: "Rosticceria Special", description: "", price: "€2.50" }
      ]
    }
  ]

  let menuText = "\nMENÙ COMPLETO DEL RISTORANTE BARINELLO:\n\n"
  
  menuCategories.forEach(category => {
    menuText += `=== ${category.title} ===\n`
    category.dishes.forEach(dish => {
      menuText += `• ${dish.name}`
      if (dish.description) {
        menuText += ` - ${dish.description}`
      }
      menuText += ` | ${dish.price}\n`
    })
    menuText += "\n"
  })
  
  return menuText
}

const BASE_SYSTEM_PROMPT = `Sei l'Assistente AI del Ristorante Barinello, ristorante di pesce a Terrasini, Sicilia.

IDENTITÀ:
- Sei l'Assistente di Barinello, NON un cliente
- Rappresenti il Ristorante Barinello
- NON chiedere mai "siete aperti?" o "siamo aperti?" - sei l'assistente del ristorante, quindi usa "siamo aperti" o "siamo chiusi"
- Rispondi SOLO quando i clienti ti chiedono informazioni

REGOLE FONDAMENTALI:
1. Rispondi SOLO a domande sul Ristorante Barinello. Per altre richieste, rispondi educatamente che puoi aiutare solo con Barinello.
2. Risposte BREVISSIME: massimo 2-3 frasi. Essere conciso è prioritario.
3. Quando menzioni un piatto, includi sempre nome e prezzo.
4. Usa max 1 emoji per messaggio.
5. Linguaggio amichevole ma professionale.
6. Rispondi sempre in italiano.
7. NON fare domande ai clienti su orari o disponibilità - sei l'assistente, quindi conosci già queste informazioni e le fornisci quando richieste.

INFORMAZIONI RISTORANTE:
- Nome: Ristorante Barinello
- Tipo: Cucina di pesce tradizionale siciliana
- Location: Lungomare Peppino Impastato N1, Terrasini Favarotta, Italy, 90049
- Servizi: Ristorante, Asporto, Terrazza affacciata sul mare`

// Funzione per caricare la conoscenza AI dall'admin
async function loadAIKnowledge() {
  try {
    // Prova a caricare da Supabase
    const { supabaseServer } = await import("@/lib/supabase-server")
    const supabase = supabaseServer
    if (supabase) {
      const { data, error } = await supabase
        .from("admin_data")
        .select("value")
        .eq("key", "ai_knowledge")
        .single()

      if (!error && data && data.value) {
        return data.value
      }
    }
    
    // Fallback: restituisci dati di default
    return {
      openingHours: "07:00 - 01:00",
      closingDays: [],
      holidays: [],
      events: [],
      additionalInfo: ""
    }
  } catch (error) {
    console.error("Error loading AI knowledge:", error)
    return {
      openingHours: "07:00 - 01:00",
      closingDays: [],
      holidays: [],
      events: [],
      additionalInfo: ""
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    if (!API_KEY || API_KEY.trim() === "") {
      console.error("Groq API key is missing or empty")
      return NextResponse.json(
        { error: "Groq API key is not configured" },
        { status: 500 }
      )
    }

    // Verifica che la chiave API abbia il formato corretto (inizia con gsk_)
    if (!API_KEY.startsWith("gsk_")) {
      console.error("Groq API key format is invalid")
      return NextResponse.json(
        { error: "Groq API key format is invalid" },
        { status: 500 }
      )
    }

    // Carica la conoscenza AI dall'admin
    const aiKnowledge = await loadAIKnowledge()

    // Ottieni data e ora corrente (fuso orario italiano)
    const now = new Date()
    const italianTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Rome" }))
    const currentDate = italianTime.toLocaleDateString("it-IT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    const currentTime = italianTime.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit"
    })

    console.log("API Key present:", !!API_KEY)
    console.log("API Key length:", API_KEY?.length || 0)
    console.log("API Key starts with gsk_:", API_KEY?.startsWith("gsk_") || false)

    // Genera il menù completo
    const menuText = generateMenuText()
    console.log("Menu text generated, length:", menuText.length)
    
    // Costruisci il system prompt con le informazioni dall'admin
    let knowledgeInfo = `- Orari: ${aiKnowledge.openingHours}\n`
    
    if (aiKnowledge.closingDays && aiKnowledge.closingDays.length > 0) {
      knowledgeInfo += `- Giorni di chiusura: ${aiKnowledge.closingDays.join(", ")}\n`
    }
    
    if (aiKnowledge.holidays && aiKnowledge.holidays.length > 0) {
      const holidaysText = aiKnowledge.holidays
        .map((h: { date: string; description: string }) => `${h.date}: ${h.description}`)
        .join(", ")
      knowledgeInfo += `- Festività: ${holidaysText}\n`
    }
    
    if (aiKnowledge.events && aiKnowledge.events.length > 0) {
      const eventsText = aiKnowledge.events
        .map((e: { date: string; description: string }) => `${e.date}: ${e.description}`)
        .join(", ")
      knowledgeInfo += `- Eventi speciali: ${eventsText}\n`
    }
    
    if (aiKnowledge.additionalInfo) {
      knowledgeInfo += `- Informazioni aggiuntive: ${aiKnowledge.additionalInfo}\n`
    }
    
    // Costruisci il prompt finale con tutte le informazioni
    const systemPromptWithTime = `${BASE_SYSTEM_PROMPT}

INFORMAZIONI AGGIORNATE DAL ADMIN:
${knowledgeInfo}

MENÙ COMPLETO:
${menuText}

ISTRUZIONI FINALI:
- Sei l'Assistente di Barinello, NON un cliente. Usa "siamo aperti/chiusi" non "siete aperti"
- NON chiedere mai ai clienti "siete aperti?" - sei l'assistente, quindi conosci già gli orari
- Rispondi SOLO quando i clienti ti chiedono informazioni (orari, menu, prenotazioni, ecc.)
- Risposte BREVISSIME (max 2-3 frasi)
- Quando menzioni un piatto: nome + prezzo
- Usa le informazioni dalla sezione "INFORMAZIONI AGGIORNATE DAL ADMIN" sopra per rispondere alle domande
- Data/ora attuale: ${currentDate}, ${currentTime} (Italia). Usa SOLO per verificare se il ristorante è attualmente aperto quando i clienti lo chiedono.
- Se un cliente chiede se siete aperti: rispondi "Sì, siamo aperti" o "No, siamo chiusi" in base agli orari e alla data/ora attuale, senza chiedere nulla in cambio`

    // Costruisci i messaggi per Groq
    // Filtra i messaggi escludendo il messaggio di benvenuto iniziale
    const filteredMessages = messages.filter((msg: { role: string; content: string }) => {
      return !(msg.role === "assistant" && msg.content.includes("Ciao! 👋"))
    })

    // Converti i messaggi nel formato Groq
    const groqMessages = filteredMessages.map((msg: { role: string; content: string }, index: number) => {
      // Se è il primo messaggio user, aggiungi il system prompt con data/ora
      if (index === 0 && msg.role === "user") {
        return {
          role: "user" as const,
          content: `${systemPromptWithTime}\n\nDomanda del cliente: ${msg.content}`,
        }
      }
      return {
        role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: msg.content,
      }
    })

    // Se non ci sono messaggi dopo il filtro, crea un messaggio iniziale
    if (groqMessages.length === 0) {
      groqMessages.push({
        role: "user" as const,
        content: systemPromptWithTime,
      })
    }

    console.log("Preparing Groq API call...")
    console.log("Messages count:", groqMessages.length)
    console.log("First message preview:", groqMessages[0]?.content?.substring(0, 100))

    // Usa fetch diretto invece della SDK per maggiore affidabilità su Vercel
    let completion
    try {
      console.log("Calling Groq API via REST...")
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 secondi timeout
      
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: groqMessages,
          temperature: 0.6,
          max_tokens: 200,
        }),
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Groq API HTTP Error:", response.status, errorText)
        throw new Error(`Groq API error: ${response.status} - ${errorText}`)
      }
      
      completion = await response.json()
      console.log("Groq API call successful")
    } catch (groqError: any) {
      console.error("=== GROQ API ERROR ===")
      console.error("Error:", groqError)
      console.error("Error type:", groqError?.constructor?.name)
      console.error("Error name:", groqError?.name)
      console.error("Error message:", groqError?.message)
      console.error("Error status:", groqError?.status)
      console.error("Error code:", groqError?.code)
      console.error("Error stack:", groqError?.stack)
      console.error("====================")
      
      // Gestisci errori specifici
      if (groqError.name === "AbortError" || groqError.message?.includes("Timeout") || groqError.message?.includes("timeout")) {
        throw new Error("Timeout: il servizio ha impiegato troppo tempo a rispondere")
      } else if (groqError.message?.includes("401") || groqError.status === 401) {
        throw new Error("Chiave API Groq non valida o scaduta")
      } else if (groqError.message?.includes("429") || groqError.status === 429) {
        throw new Error("Troppe richieste. Riprova tra qualche momento.")
      } else if (groqError.message?.includes("ENOTFOUND") || groqError.message?.includes("ECONNREFUSED") || groqError.message?.includes("ECONNRESET") || groqError.message?.includes("fetch failed")) {
        throw new Error("Errore di connessione con il servizio AI. Riprova.")
      } else if (groqError.message?.includes("Connection") || groqError.message?.includes("connection")) {
        throw new Error("Errore di connessione. Verifica la tua connessione internet e riprova.")
      }
      // Rilancia l'errore originale se non è stato gestito
      throw groqError
    }

    const text = completion.choices[0]?.message?.content || "Mi dispiace, non sono riuscito a generare una risposta."

    const lastMessage = messages[messages.length - 1]
    
    // Controlla se c'è interesse per prenotazioni
    const hasBookingInterest = 
      lastMessage?.content?.toLowerCase().includes("prenot") ||
      lastMessage?.content?.toLowerCase().includes("tavolo") ||
      lastMessage?.content?.toLowerCase().includes("disponibil") ||
      text.toLowerCase().includes("prenot") ||
      text.toLowerCase().includes("tavolo")

    return NextResponse.json({
      message: text,
      hasBookingInterest,
    })
  } catch (error: any) {
    console.error("AI Chat Error:", error)
    console.error("Error details:", JSON.stringify(error, null, 2))
    
    // Determina il messaggio di errore appropriato
    let errorMessage = "Errore nella comunicazione con l'AI"
    
    if (error.message) {
      if (error.message.includes("Chiave API")) {
        errorMessage = "Problema con la configurazione della chiave API"
      } else if (error.message.includes("Timeout") || error.message.includes("timeout")) {
        errorMessage = "Timeout: il servizio ha impiegato troppo tempo a rispondere"
      } else if (error.message.includes("connessione") || error.message.includes("Connection")) {
        errorMessage = "Errore di connessione. Riprova tra qualche momento."
      } else if (error.message.includes("Troppe richieste")) {
        errorMessage = "Troppe richieste. Riprova tra qualche momento."
      } else {
        errorMessage = error.message
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message || "Errore sconosciuto",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

