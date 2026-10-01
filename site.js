const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = mobileMenu?.querySelector(".menu-panel");
const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']") ?? [];
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
const backgroundRegions = [document.querySelector("main"), document.querySelector(".site-footer")].filter(Boolean);
let lastFocusedElement = null;
let currentLanguage = "it";

const translations = {
  it: {
    skip: "Vai al contenuto",
    "nav.restaurant": "Ristorante",
    "nav.gallery": "Galleria",
    "nav.reviews": "Recensioni",
    "nav.contacts": "Contatti",
    "cta.book": "Prenota",
    "cta.bookTable": "Prenota un tavolo",
    "cta.discoverMenu": "Scopri il menu",
    "cta.giftCard": "Gift Card",
    "cta.menu": "Le nostre proposte",
    "cta.wine": "Carta dei vini",
    "cta.call": "Chiama ora",
    "hero.overline": "Ristorante fine dining",
    "hero.subtitle": "Un'esperienza gastronomica nel cuore di Genova.",
    "hero.hours": "<span>CENA &amp; ARTE CONTEMPORANEA</span> CUCINA CREATIVA - GALLERIA - DEGUSTAZIONE",
    "hero.edge": "Cucina e arte in dialogo",
    "hero.discover": "Scopri ETRA",
    "restaurant.kicker": "01 Ristorante",
    "restaurant.copy1": "Un ristorante fine dining ospitato nel Palazzo Doria De Fornari, dove cucina contemporanea e arte condividono la stessa scena.",
    "restaurant.copy2": "La proposta dello chef Davide Cannavino attraversa tecnica, materia prima e micro-stagionalita in percorsi gastronomici essenziali e creativi.",
    "restaurant.mobileCopy": "Cucina creativa e arte contemporanea nel cuore di Genova.",
    "food.one": "Materia",
    "food.two": "Tecnica",
    "food.three": "Contrasto",
    "food.four": "Vegetale",
    "food.five": "Geometria",
    "food.six": "Cottura",
    "food.seven": "Sorpresa",
    "food.eight": "Equilibrio",
    "tasting.etymo": "Un percorso essenziale di cucina contemporanea, tra vegetale, mare e note affumicate.",
    "tasting.littera": "Un racconto piu ampio, con ricciola, bottoni neri ripieni di razza e il ritmo della galleria.",
    "tasting.logos": "La degustazione piu completa: ricerca, contrasti e una sequenza gastronomica immersiva.",
    "gallery.kicker": "02 Galleria",
    "gallery.copy1": "ETRA nasce come spazio di meraviglia: un ambiente scuro, minimale, attraversato da opere d'arte contemporanea in continua evoluzione.",
    "gallery.copy2": "Sala, opere e dettagli raccontano un luogo costruito per accogliere cucina, materia e visione.",
    "gallery.one": "Sala",
    "gallery.two": "Segni",
    "gallery.three": "Opere",
    "gallery.four": "Intimita",
    "gallery.five": "Atmosfera",
    "reviews.kicker": "03 Recensioni",
    "reviews.title": "Cosa dicono di noi",
    "reviews.rating": "Tripadvisor",
    "reviews.cardLabel1": "Michelin",
    "reviews.cardLabel2": "Fine dining",
    "reviews.cardLabel3": "Ospitalita",
    "reviews.quote1": "Una cucina distinta da curiosita, brio e precisione tecnica, articolata in tre percorsi degustazione.",
    "reviews.quote2": "Un ambiente nero, minimale e immersivo dove cucina e galleria convivono nella stessa esperienza.",
    "reviews.quote3": "Nel cuore di Piazza De Ferrari, un percorso gastronomico contemporaneo e personale.",
    "reviews.author1": "Guida MICHELIN",
    "reviews.author2": "ETRA · Genova",
    "reviews.author3": "Piazza De Ferrari 4",
    "reviews.read": "Leggi le recensioni",
    "reviews.leave": "Lascia una recensione",
    "contacts.kicker": "04 Contatti",
    "contacts.title": "Contatti",
    "contacts.where": "Dove siamo",
    "contacts.hoursLabel": "Orari",
    "contacts.hours": "Martedi - Domenica<br>19:30 - 22:00<br>Lunedi chiuso",
    "contacts.email": "Email",
    "contacts.phone": "Telefono",
    "contacts.mapLabel": "Genova · Piazza De Ferrari",
    "contacts.openMap": "Apri su Google Maps",
    "footer.tagline": "Cucina e arte,<br>nel cuore di Genova.",
    "footer.top": "Torna su",
    "card.food": "Le nostre proposte",
    "card.wine": "Carta dei vini",
    "card.note": "Menu, prezzi e disponibilita possono variare secondo stagione e aggiornamenti del ristorante.",
    "card.wineNote": "Percorsi pairing e carta possono variare secondo disponibilita e annate.",
    "form.kicker": "WhatsApp",
    "form.title": "Scrivi a<br><em>ETRA.</em>",
    "form.intro": "Compila i campi: prepareremo il messaggio da inviare su WhatsApp.",
    "form.name": "Nome e cognome *",
    "form.date": "Data",
    "form.time": "Orario",
    "form.guests": "Persone",
    "form.choose": "Scegli",
    "form.message": "Messaggio",
    "form.placeholder": "Richieste o informazioni utili",
    "form.submit": "Continua su WhatsApp",
    "form.note": "Nessun dato viene salvato sul sito: il messaggio viene composto direttamente in WhatsApp.",
    "legal.privacy": "Privacy",
    "legal.cookies": "Cookie",
    "legal.notes": "Note legali",
    "legal.manageCookies": "Gestisci cookie",
    "cookie.title": "Privacy e servizi esterni",
    "cookie.copy": "Usiamo solo strumenti tecnici. Per caricare Google Maps ti chiediamo prima il consenso ai servizi esterni.",
    "cookie.necessary": "Solo necessari",
    "cookie.accept": "Accetta servizi esterni",
    "cookie.preferences": "Dettagli",
    "map.notice": "La mappa di Google viene caricata solo dopo il consenso ai servizi esterni.",
    "map.load": "Carica la mappa",
  },
  en: {
    skip: "Skip to content",
    "nav.restaurant": "Restaurant",
    "nav.gallery": "Gallery",
    "nav.reviews": "Reviews",
    "nav.contacts": "Contacts",
    "cta.book": "Book now",
    "cta.bookTable": "Book a table",
    "cta.discoverMenu": "Discover the menu",
    "cta.giftCard": "Gift Card",
    "cta.menu": "Our proposals",
    "cta.wine": "Wine list",
    "cta.call": "Call now",
    "hero.overline": "Fine dining restaurant",
    "hero.subtitle": "A gastronomic experience in the heart of Genoa.",
    "hero.hours": "<span>DINNER &amp; CONTEMPORARY ART</span> CREATIVE CUISINE - GALLERY - TASTING",
    "hero.edge": "Cuisine and art in dialogue",
    "hero.discover": "Discover ETRA",
    "restaurant.kicker": "01 Restaurant",
    "restaurant.copy1": "A fine dining restaurant inside Palazzo Doria De Fornari, where contemporary cuisine and art share the same stage.",
    "restaurant.copy2": "Chef Davide Cannavino's proposal moves through technique, ingredients and micro-seasonality in essential, creative tasting paths.",
    "restaurant.mobileCopy": "Creative cuisine and contemporary art in the heart of Genoa.",
    "food.one": "Ingredient",
    "food.two": "Technique",
    "food.three": "Contrast",
    "food.four": "Vegetal",
    "food.five": "Geometry",
    "food.six": "Cooking",
    "food.seven": "Surprise",
    "food.eight": "Balance",
    "tasting.etymo": "An essential contemporary route between vegetables, sea and smoky notes.",
    "tasting.littera": "A broader narrative with amberjack, black ray-filled buttons and the rhythm of the gallery.",
    "tasting.logos": "The most complete tasting: research, contrasts and an immersive gastronomic sequence.",
    "gallery.kicker": "02 Gallery",
    "gallery.copy1": "ETRA is a space of wonder: a dark, minimal environment animated by contemporary artworks that change over time.",
    "gallery.copy2": "Dining room, artworks and details reveal a place designed for cuisine, material and vision.",
    "gallery.one": "Room",
    "gallery.two": "Signs",
    "gallery.three": "Artworks",
    "gallery.four": "Intimacy",
    "gallery.five": "Atmosphere",
    "reviews.kicker": "03 Reviews",
    "reviews.title": "What guests say",
    "reviews.rating": "Tripadvisor",
    "reviews.cardLabel1": "Michelin",
    "reviews.cardLabel2": "Fine dining",
    "reviews.cardLabel3": "Hospitality",
    "reviews.quote1": "Cuisine marked by curiosity, verve and technical precision, arranged around three tasting menus.",
    "reviews.quote2": "A black, minimal and immersive space where cuisine and gallery coexist in the same experience.",
    "reviews.quote3": "In the heart of Piazza De Ferrari, a contemporary and personal gastronomic journey.",
    "reviews.author1": "MICHELIN Guide",
    "reviews.author2": "ETRA · Genoa",
    "reviews.author3": "Piazza De Ferrari 4",
    "reviews.read": "Read reviews",
    "reviews.leave": "Leave a review",
    "contacts.kicker": "04 Contacts",
    "contacts.title": "Contacts",
    "contacts.where": "Find us",
    "contacts.hoursLabel": "Opening hours",
    "contacts.hours": "Tuesday - Sunday<br>7:30 pm - 10:00 pm<br>Monday closed",
    "contacts.email": "Email",
    "contacts.phone": "Phone",
    "contacts.mapLabel": "Genoa · Piazza De Ferrari",
    "contacts.openMap": "Open in Google Maps",
    "footer.tagline": "Cuisine and art,<br>in the heart of Genoa.",
    "footer.top": "Back to top",
    "card.food": "Our proposals",
    "card.wine": "Wine list",
    "card.note": "Menus, prices and availability may vary according to season and restaurant updates.",
    "card.wineNote": "Pairings and labels may vary according to availability and vintages.",
    "form.kicker": "WhatsApp",
    "form.title": "Write to<br><em>ETRA.</em>",
    "form.intro": "Fill in the fields: we will prepare the message to send on WhatsApp.",
    "form.name": "Full name *",
    "form.date": "Date",
    "form.time": "Time",
    "form.guests": "Guests",
    "form.choose": "Select",
    "form.message": "Message",
    "form.placeholder": "Requests or useful information",
    "form.submit": "Continue on WhatsApp",
    "form.note": "No data is stored on this website: the message is composed directly in WhatsApp.",
    "legal.privacy": "Privacy",
    "legal.cookies": "Cookies",
    "legal.notes": "Legal notes",
    "legal.manageCookies": "Manage cookies",
    "cookie.title": "Privacy and external services",
    "cookie.copy": "We only use technical tools. To load Google Maps, we ask for your consent to external services first.",
    "cookie.necessary": "Necessary only",
    "cookie.accept": "Accept external services",
    "cookie.preferences": "Details",
    "map.notice": "Google Maps is loaded only after consent to external services.",
    "map.load": "Load map",
  },
};

const menuCatalogs = {
  food: {
    intro: {
      it: {
        kicker: "ETRA · Le nostre proposte",
        title: "Le nostre <em>proposte.</em>",
        description: "Tre percorsi degustazione raccontati portata dopo portata, con i relativi abbinamenti.",
      },
      en: {
        kicker: "ETRA · Our proposals",
        title: "Our <em>proposals.</em>",
        description: "Three tasting menus presented course by course, with their pairing options.",
      },
    },
    sections: [
      {
        it: "ETymo · 80 EUR",
        en: "ETymo · 80 EUR",
        items: [
          { it: "Carota affumicata, yuzu, salsa marmorizzata", en: "Smoked carrot, yuzu, marbled sauce" },
          { it: "Sashimi di pesca, semi di pomodoro, sommacco", en: "Peach sashimi, tomato seeds, sumac" },
          { it: "Tubetti tiepidi, Mornay all'aglio orsino, caviale vegetale", en: "Warm tubetti, wild garlic Mornay, vegetable caviar" },
          { it: "“Melanzana Beef”", en: "“Eggplant Beef”" },
          { it: "Lollipop", en: "Lollipop" },
          { it: "Semifreddo allo zucchero affumicato, liquirizia, erba cedrina", en: "Smoked sugar semifreddo, liquorice, lemon verbena" },
        ],
      },
      {
        it: "Littera · 90 EUR",
        en: "Littera · 90 EUR",
        items: [
          { it: "Carota affumicata, yuzu, salsa marmorizzata", en: "Smoked carrot, yuzu, marbled sauce" },
          { it: "Crudo di ricciola, kefir, cetriolo, fiori di acacia acidulati", en: "Amberjack crudo, kefir, cucumber, acidulated acacia flowers" },
          { it: "Bottoni neri ripieni di razza, gamberi, infuso vegetale", en: "Black buttons filled with skate, prawns, vegetable infusion" },
          { it: "Piccione, shiso, pesche verdi", en: "Pigeon, shiso, green peaches" },
          { it: "Lollipop", en: "Lollipop" },
          { it: "100% Fragola", en: "100% Strawberry" },
        ],
      },
      {
        it: "Logos · 110 EUR",
        en: "Logos · 110 EUR",
        items: [
          { it: "Sashimi di pesca, semi di pomodoro, sommacco", en: "Peach sashimi, tomato seeds, sumac" },
          { it: "Seppia, “liquirizia di mare”, granita di mandorla", en: "Cuttlefish, sea liquorice, almond granita" },
          { it: "Sardenaira al cucchiaio", en: "Spoon-served sardenaira" },
          { it: "Rarita: morchelle farcite", en: "Rarity: stuffed morels" },
          { it: "Risotto, erbette liguri, limone alla brace, elicriso", en: "Risotto, Ligurian herbs, grilled lemon, helichrysum" },
          { it: "Aragosta, zucchine trombetta, jus al chorizo", en: "Lobster, trombetta courgettes, chorizo jus" },
          { it: "Lollipop", en: "Lollipop" },
          { it: "Ibisco, rabarbaro, barbabietola, lamponi", en: "Hibiscus, rhubarb, beetroot, raspberries" },
        ],
      },
      {
        it: "Abbinamenti",
        en: "Pairings",
        items: [
          { it: "Percorso a 4 calici", en: "4-glass pairing", price: "60 EUR" },
          { it: "Percorso a 6 calici", en: "6-glass pairing", price: "80 EUR" },
          { it: "Percorso analcolico", en: "Non-alcoholic pairing", price: "40 EUR" },
        ],
      },
      {
        it: "Alla carta",
        en: "A la carte",
        items: [
          { it: "Due piatti a scelta piu dessert", en: "Two dishes of your choice plus dessert", price: "75 EUR" },
          { it: "I percorsi non sono vincolanti per l'intero tavolo", en: "Tasting menus are not binding for the entire table" },
        ],
      },
    ],
  },
  wine: {
    intro: {
      it: {
        kicker: "ETRA · Carta dei vini",
        title: "Carta <em>dei vini.</em>",
        description: "La selezione di Chiara Campora, organizzata per territori e denominazioni.",
      },
      en: {
        kicker: "ETRA · Wine list",
        title: "Wine <em>list.</em>",
        description: "Chiara Campora's selection, organised by regions and appellations.",
      },
    },
    sections: window.ETRA_WINE_CATALOG || [],
  },
};

const getFocusableElements = (container) => {
  if (!container) return [];
  return [...container.querySelectorAll(focusableSelector)].filter((element) => element.offsetParent !== null);
};

const setBackgroundInert = (inert) => {
  backgroundRegions.forEach((region) => {
    if (inert) region.setAttribute("inert", "");
    else region.removeAttribute("inert");
  });
};

const setMenu = (open, restoreFocus = true) => {
  const wasOpen = body.classList.contains("menu-open");
  if (open && !wasOpen) lastFocusedElement = document.activeElement;
  body.classList.toggle("menu-open", open);
  mobileMenu?.classList.toggle("is-open", open);
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
  setBackgroundInert(open);

  if (open) {
    window.setTimeout(() => (getFocusableElements(mobileMenuPanel)[0] || mobileMenuPanel)?.focus(), 260);
  } else if (wasOpen && restoreFocus) {
    lastFocusedElement?.focus();
  }
};

menuToggle?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
mobileMenu?.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const mobileStickyBook = document.querySelector(".mobile-sticky-book");
const stickyBookSections = [
  { element: document.querySelector("#top"), theme: "dark" },
  { element: document.querySelector("#ristorante"), theme: "dark" },
  { element: document.querySelector("#galleria"), theme: "light" },
  { element: document.querySelector("#recensioni"), theme: "light" },
  { element: document.querySelector("#contatti"), theme: "light" },
  { element: document.querySelector(".site-footer"), theme: "dark" },
].filter(({ element }) => element);

const setStickyBookTheme = (theme) => {
  if (!mobileStickyBook) return;
  const light = theme === "light";
  mobileStickyBook.classList.toggle("is-on-light", light);
  mobileStickyBook.classList.toggle("is-on-dark", !light);
};

const updateStickyBookTheme = () => {
  if (!stickyBookSections.length) return;
  const sampleY = Math.max(96, Math.min(window.innerHeight - 96, window.innerHeight * 0.64));
  const sampleElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
  const activeSection = stickyBookSections.find(({ element }) => element.contains(sampleElement)) || stickyBookSections[0];
  setStickyBookTheme(activeSection.theme);
};

if (mobileStickyBook) {
  setStickyBookTheme("dark");
  updateStickyBookTheme();
  window.addEventListener("scroll", updateStickyBookTheme, { passive: true });
  window.addEventListener("resize", updateStickyBookTheme);
}

const setupCarousel = ({ trackSelector, cardSelector, currentSelector, prevSelector, nextSelector }) => {
  const track = document.querySelector(trackSelector);
  const cards = [...document.querySelectorAll(cardSelector)];
  const current = document.querySelector(currentSelector);
  const previous = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);
  if (!track || !cards.length) return;

  const step = () => {
    const styles = getComputedStyle(track);
    return cards[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  };

  const updateCounter = () => {
    if (!current) return;
    const cardStep = step();
    const index = cardStep ? Math.round(track.scrollLeft / cardStep) + 1 : 1;
    current.textContent = String(Math.min(cards.length, Math.max(1, index))).padStart(2, "0");
  };

  previous?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", updateCounter, { passive: true });
  updateCounter();
};

setupCarousel({
  trackSelector: "[data-food-track]",
  cardSelector: ".food-card",
  currentSelector: "[data-food-current]",
  prevSelector: "[data-food-prev]",
  nextSelector: "[data-food-next]",
});

setupCarousel({
  trackSelector: "[data-location-track]",
  cardSelector: ".location-card",
  currentSelector: "[data-location-current]",
  prevSelector: "[data-location-prev]",
  nextSelector: "[data-location-next]",
});

const cardModal = document.querySelector("[data-card-modal]");
const cardDialog = cardModal?.querySelector(".card-dialog");
const cardBody = cardModal?.querySelector(".card-body");
const cardContent = cardModal?.querySelector("[data-card-content]");
const cardKicker = cardModal?.querySelector("[data-card-kicker]");
const cardTitle = cardModal?.querySelector("[data-card-title]");
const cardDescription = cardModal?.querySelector("[data-card-description]");
const catalogNote = cardModal?.querySelector(".catalog-note");
let activeCardType = "food";
let cardCloseTimer;

const renderCatalog = () => {
  if (!cardContent || !cardKicker || !cardTitle || !cardDescription) return;
  const catalog = menuCatalogs[activeCardType];
  const intro = catalog.intro[currentLanguage];
  cardKicker.textContent = intro.kicker;
  cardTitle.innerHTML = intro.title;
  cardDescription.textContent = intro.description;
  if (catalogNote) catalogNote.textContent = translations[currentLanguage][activeCardType === "food" ? "card.note" : "card.wineNote"];
  cardContent.innerHTML = catalog.sections.map((section) => `
    <section class="catalog-section">
      <h3>${section[currentLanguage]}${section.it !== section.en ? `<small>${section[currentLanguage === "it" ? "en" : "it"]}</small>` : ""}</h3>
      <div class="catalog-items">
        ${section.items.map((item) => `
          <article class="catalog-item">
            <div>
              <h4>${item[currentLanguage] || item.it}</h4>
              ${item.sub ? `<p>${item.sub}</p>` : ""}
            </div>
            ${item.price ? `<span>${item.price}</span>` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
};

const setCardType = (type) => {
  activeCardType = menuCatalogs[type] ? type : "food";
  cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
    const active = button.dataset.cardTab === activeCardType;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  renderCatalog();
  if (cardBody) cardBody.scrollTop = 0;
};

const openCardModal = (type, trigger) => {
  if (!cardModal || !cardDialog) return;
  window.clearTimeout(cardCloseTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  setCardType(type);
  cardModal.hidden = false;
  cardModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => {
    cardModal.classList.add("is-open");
    window.setTimeout(() => cardModal.querySelector("[data-card-close]")?.focus(), 260);
  });
};

const closeCardModal = () => {
  if (!cardModal || cardModal.hidden) return;
  cardModal.classList.remove("is-open");
  cardModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  cardCloseTimer = window.setTimeout(() => {
    cardModal.hidden = true;
    lastFocusedElement?.focus();
  }, 450);
};

document.querySelectorAll("[data-card-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openCardModal(trigger.dataset.cardTrigger, trigger);
  });
});

cardModal?.querySelector("[data-card-close]")?.addEventListener("click", closeCardModal);
cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
  button.addEventListener("click", () => setCardType(button.dataset.cardTab));
});

const bookingModal = document.querySelector("[data-booking-modal]");
const bookingDialog = bookingModal?.querySelector(".booking-dialog");
const bookingForm = bookingModal?.querySelector("[data-contact-form]");
const contextInput = bookingForm?.querySelector("input[name='context']");
const dateInput = bookingForm?.querySelector("input[name='date']");
let bookingCloseTimer;

if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

const openBookingModal = (trigger) => {
  if (!bookingModal || !bookingDialog) return;
  window.clearTimeout(bookingCloseTimer);
  lastFocusedElement = trigger;
  if (contextInput) contextInput.value = trigger.dataset.context || "Prenotazione tavolo";
  setMenu(false, false);
  bookingModal.hidden = false;
  bookingModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => bookingModal.classList.add("is-open"));
  window.setTimeout(() => bookingForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeBookingModal = () => {
  if (!bookingModal || bookingModal.hidden) return;
  bookingModal.classList.remove("is-open");
  bookingModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  bookingCloseTimer = window.setTimeout(() => {
    bookingModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-booking-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openBookingModal(trigger);
  });
});

bookingModal?.querySelectorAll("[data-booking-close]").forEach((button) => {
  button.addEventListener("click", closeBookingModal);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  const formData = new FormData(bookingForm);
  const details = [
    `${formData.get("context") || "Prenotazione tavolo"} ETRA`,
    `Nome: ${formData.get("name") || ""}`,
    `Data: ${formData.get("date") || "Da definire"}`,
    `Orario: ${formData.get("time") || "Da definire"}`,
    `Persone: ${formData.get("guests") || "Da definire"}`,
    `Messaggio: ${formData.get("message") || ""}`,
  ];
  const bodyText = encodeURIComponent(details.join("\n"));
  window.open(`https://wa.me/393311014699?text=${bodyText}`, "_blank", "noopener,noreferrer");
  closeBookingModal();
});

const legalModal = document.querySelector("[data-legal-modal]");
const legalDialog = legalModal?.querySelector(".legal-dialog");
let legalCloseTimer;

const setLegalTab = (tab = "privacy") => {
  const nextTab = legalModal?.querySelector(`[data-legal-tab="${tab}"]`) ? tab : "privacy";
  legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
    const active = button.dataset.legalTab === nextTab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  legalModal?.querySelectorAll("[data-legal-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.legalPanel === nextTab);
  });
};

const openLegalModal = (tab, trigger) => {
  if (!legalModal || !legalDialog) return;
  window.clearTimeout(legalCloseTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  setLegalTab(tab);
  legalModal.hidden = false;
  legalModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => {
    legalModal.classList.add("is-open");
    window.setTimeout(() => legalModal.querySelector("[data-legal-close]")?.focus(), 260);
  });
};

const closeLegalModal = () => {
  if (!legalModal || legalModal.hidden) return;
  legalModal.classList.remove("is-open");
  legalModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  legalCloseTimer = window.setTimeout(() => {
    legalModal.hidden = true;
    lastFocusedElement?.focus();
  }, 450);
};

document.querySelectorAll("[data-legal-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openLegalModal(trigger.dataset.legalTrigger, trigger);
  });
});

legalModal?.querySelectorAll("[data-legal-close]").forEach((button) => {
  button.addEventListener("click", closeLegalModal);
});

legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
  button.addEventListener("click", () => setLegalTab(button.dataset.legalTab));
});

const consentStorageKey = "etraExternalServicesConsent";
const cookieBanner = document.querySelector("[data-cookie-banner]");
const mapFrame = document.querySelector(".map-frame iframe");
const mapConsent = document.querySelector("[data-map-consent]");

const getConsent = () => localStorage.getItem(consentStorageKey) === "accepted";

const loadMap = () => {
  if (!mapFrame || mapFrame.src) return;
  const mapSource = mapFrame.dataset.mapSrc;
  if (mapSource) mapFrame.src = mapSource;
  mapConsent?.classList.add("is-hidden");
};

const setConsent = (accepted) => {
  localStorage.setItem(consentStorageKey, accepted ? "accepted" : "necessary");
  cookieBanner.hidden = true;
  if (accepted) loadMap();
};

if (getConsent()) loadMap();

document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => setConsent(true));
document.querySelector("[data-cookie-necessary]")?.addEventListener("click", () => setConsent(false));
document.querySelector("[data-cookie-manage]")?.addEventListener("click", () => {
  if (cookieBanner) cookieBanner.hidden = false;
});
document.querySelector("[data-map-load]")?.addEventListener("click", () => setConsent(true));

const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
const heroTitle = document.querySelector("[data-hero-title]");
const heroSection = document.querySelector(".hero");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const heroTitles = {
  it: ["L'arte dell'ospitalit\u00e0.", "Ogni gesto, un'emozione.", "La creativit\u00e0 prende forma.", "Il piacere di sorprendere."],
  en: ["The art of hospitality.", "Every gesture, an emotion.", "Creativity takes shape.", "The pleasure of surprise."],
};
let heroIndex = 0;
let heroTimer;
let heroInView = true;

const loadHeroSlide = (index) => {
  const slide = heroSlides[index];
  if (!slide) return;
  slide.querySelectorAll("[data-srcset]").forEach((source) => {
    source.srcset = source.dataset.srcset;
    source.removeAttribute("data-srcset");
  });
  const image = slide.querySelector("img[data-src]");
  if (image) {
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
  }
};

const updateHeroTitle = (animate = false) => {
  if (!heroTitle) return;
  const nextTitle = (heroTitles[currentLanguage] || heroTitles.it)[heroIndex];
  if (!animate) {
    heroTitle.textContent = nextTitle;
    return;
  }
  heroTitle.classList.add("is-changing");
  window.setTimeout(() => {
    heroTitle.textContent = nextTitle;
    heroTitle.classList.remove("is-changing");
  }, reduceMotion.matches ? 0 : 350);
};

const setHeroSlide = (index, animateTitle = true) => {
  if (!heroSlides.length) return;
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  loadHeroSlide(heroIndex);
  loadHeroSlide((heroIndex + 1) % heroSlides.length);
  heroSlides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === heroIndex));
  updateHeroTitle(animateTitle);
};

const stopHeroAutoplay = () => window.clearInterval(heroTimer);
const startHeroAutoplay = () => {
  stopHeroAutoplay();
  if (reduceMotion.matches || document.hidden || !heroInView) return;
  heroTimer = window.setInterval(() => setHeroSlide(heroIndex + 1), 5000);
};

document.addEventListener("visibilitychange", startHeroAutoplay);
reduceMotion.addEventListener?.("change", startHeroAutoplay);

if (heroSection && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    heroInView = entry.isIntersecting;
    startHeroAutoplay();
  }, { threshold: 0.15 }).observe(heroSection);
}

loadHeroSlide(1);
startHeroAutoplay();

const applyLanguage = (language) => {
  currentLanguage = translations[language] ? language : "it";
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.placeholder = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderCatalog();
  updateHeroTitle(false);
};

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (body.classList.contains("menu-open")) setMenu(false);
  closeCardModal();
  closeBookingModal();
  closeLegalModal();
});

applyLanguage("it");
