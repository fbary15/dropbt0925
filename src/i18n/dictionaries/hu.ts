import type { Dictionary } from "./en";

const hu: Dictionary = {
  meta: {
    siteName: "DROP Bt.",
    defaultTitle: "DROP Bt. – Kommunikáció, Design & E-Learning",
    tagline: "Let’s create and do it! Drop in!",
    pages: {
      home: {
        title: "Kommunikáció és design 3 nyelven",
        description:
          "Grafikai és webes tervezés, szövegírás, tördelés, fordítás, nyomdai előkészítés és nyomtatás – angolul, németül és magyarul. 1995 óta.",
      },
      flow: {
        title: "Megrendelés folyamata",
        description:
          "A kézfogástól a fordításon, tördelésen és designon át a nyomdáig és a webig – projektként vagy különböző kombinációkban.",
      },
      references: {
        title: "Referenciák",
        description:
          "Katalógusok, prospektusok, plakátok, naptárak és kiadványok, amelyeket a DROP Bt. hazai és nemzetközi megrendelőinek készített.",
      },
      partners: {
        title: "Partnerek",
        description:
          "Cégek és intézmények, amelyekkel a DROP Bt. együtt dolgozott – többek között az Audi, a Daimler, a Volvo, az Erste Bank, a L’Oréal Paris és a GlaxoSmithKline.",
      },
      teaching: {
        title: "Nyelvoktatás",
        description:
          "Angol és német nyelv anyanyelvi tanárokkal – társalgás, nyelvvizsga-felkészítés, állásinterjú, önéletrajz és üzleti kommunikáció.",
      },
      types: {
        title: "Tanulási típusok",
        description: "Vizuális, auditív, író-olvasó, kinesztikus vagy vegyes? Ismerje meg a különböző tanulási típusokat.",
      },
      contact: {
        title: "Kapcsolat",
        description: "Lépjen kapcsolatba a DROP Bt.-vel – írjon az info@drop-bt.eu címre vagy hívjon minket. Impresszum és cégadatok.",
      },
      about: {
        title: "Rólunk",
        description:
          "A DROP Bt. 1995 óta működik: a fordítástól a késztermék leszállításáig minden munkafolyamat egy kézben, többnyelvű, multikulturális csapattal.",
      },
    },
  },

  nav: {
    groups: { design: "Kommunikáció & Design", learning: "E-Learning" },
    pages: {
      home: "Mivel foglalkozunk",
      flow: "Megrendelés folyamata",
      references: "Referenciák",
      partners: "Partnerek",
      teaching: "Nyelvoktatás",
      types: "Tanulási típusok",
      contact: "Kapcsolat",
      about: "Rólunk",
    },
    blurbs: {
      home: "Design, nyomda, szöveg és fordítás",
      flow: "Így halad egy projekt",
      references: "Válogatás munkáinkból",
      partners: "Akikkel együtt dolgoztunk",
      teaching: "Angol és német, anyanyelvi tanárokkal",
      types: "Ön milyen típusú tanuló?",
      contact: "Írjon vagy hívjon minket",
      about: "1995 óta",
    },
    menu: "Menü",
    close: "Bezárás",
    skip: "Ugrás a tartalomhoz",
    language: "Nyelv",
    cta: "Beszéljünk",
    home: "Kezdőlap",
  },

  common: {
    allActivities: "… minden tevékenység 3 nyelven",
    languages: [
      { code: "EN", name: "Angol", native: "English" },
      { code: "DE", name: "Német", native: "Deutsch" },
      { code: "HU", name: "Magyar", native: "Magyar" },
    ],
    next: "Következő oldal",
    backToTop: "Vissza a tetejére",
    email: "E-mail",
    phone: "Telefon",
    anyQuestions: "Kérdése van?",
    clickHere: "Kattintson ide!",
    hope: "Reméljük, hamarosan *megkeres minket!*",
    writeUs: "Írjon nekünk",
    copy: "E-mail-cím másolása",
    copied: "Kimásolva",
    scroll: "Görgessen",
  },

  home: {
    hero: {
      eyebrow: "Kommunikáció & Design – E-Learning",
      title: ["Az ötlettől", "a *késztermékig*"],
      sub: "Grafikai tervezés, szövegírás, tördelés, fordítás és nyomdai kivitelezés – három nyelven, egy kézben.",
      primary: "Munkáink",
      secondary: "Kapcsolat",
      badge: "Let’s create and do it ✦ Drop in ✦ ",
      meta: ["1995 óta", "Dunaharaszti", "EN · DE · HU"],
      imageAlt: "Jegyzetfüzet „Let’s create and do it! Drop In!” kézírásos felirattal, mellette egy toll",
    },
    marquee: [
      "Grafikai tervezés",
      "Webes megjelenés",
      "Szövegírás",
      "Tördelés",
      "Fordítás",
      "Nyomdai előkészítés",
      "Nyomtatás",
      "Nyelvoktatás",
    ],
    intro: {
      label: "Mivel foglalkozunk",
      lead: "Jól képzett és óriási szakmai tapasztalattal rendelkező csapatunk ötleteket hoz elképzelései megvalósításához, ezeket vizualizálja és késztermékké alakítja – természetesen *kiváló minőséggel*.",
      paragraphs: [
        "Pontosabban: munkánk magában foglalja projektek teljes körű kivitelezését a grafikai és webes megjelenés tervezésétől, szövegek (cég- és termékbemutatók, önéletrajzok stb.) megírásától, a tördelésétől, illetve a fordításától – azaz a tartalomkezeléstől – a nyomdai előkészítésen keresztül egészen a nyomtatásig.",
        "Mindezt az adott nyelvterület kultúrájának és sajátosságainak figyelembevételével, 3 nyelven (angol, német, magyar) végezzük. Különböző anyanyelvű munkatársaink szaktudása a garancia arra, hogy a legmegfelelőbb kommunikációs módot, legyen az akár vizuális és/vagy verbális, tudjuk alkalmazni, ezáltal igényes, nemzetközi piacok elvárásainak megfelelő színvonalú terméket biztosítsunk megrendelőink számára.",
      ],
    },
    services: {
      label: "Szolgáltatások",
      title: "Minden *egy kézben*",
      items: [
        { title: "Grafikai és webes tervezés", detail: "Ötletek vizualizálása", page: "references" },
        { title: "Szövegírás", detail: "Cég- és termékbemutatók, önéletrajzok", page: "flow" },
        { title: "Tördelés és tartalomkezelés", detail: "Katalógusok, prospektusok, kiadványok", page: "references" },
        { title: "Fordítás", detail: "Angol · Német · Magyar", page: "flow" },
        { title: "Nyomdai előkészítés és nyomtatás", detail: "A tervezéstől a végtermékig", page: "flow" },
        { title: "Nyelvoktatás és coaching", detail: "Anyanyelvi tanárok", page: "teaching" },
      ],
    },
    facts: [
      { value: 1995, suffix: "", label: "Alapítás éve", year: true },
      { value: 1987, suffix: "", label: "Alapítóink kezdete a nyomdaiparban", year: true },
      { value: 3, suffix: "", label: "Nyelv – angol, német, magyar", year: false },
      { value: 100, suffix: "%", label: "Egy kézben – minden munkafázis", year: false },
    ],
    process: {
      label: "Megrendelés folyamata",
      title: "A kézfogástól a *nyomdáig*",
      text: "… ezeket a munkafolyamatokat vállaljuk projektként vagy különböző kombinációkban is (pl. design és nyomtatás, fordítás és tördelés stb.).",
      cta: "A megrendelés folyamata",
    },
    work: {
      label: "Referenciák",
      title: "Válogatott *munkák*",
      text: "Katalógusok, prospektusok, plakátok és naptárak – megtervezve, megírva, lefordítva és kinyomtatva.",
      cta: "Továbbiak",
    },
    partners: {
      label: "Partnerek",
      title: "Jó *társaságban*",
      text: "40 cég és 7 intézmény – nemzetközi márkáktól a helyi könyvtárig.",
      cta: "Összes partner",
    },
    learning: {
      label: "E-Learning",
      title: "English? Deutsch? *Magyar?*",
      text: "A nyelvoktatásban – legyen az személyes vagy online óra – az egyik legnagyobb kihívás annak a módszernek a megtalálása, amivel a diákok a leghatékonyabban tudják elsajátítani a tananyagot.",
      offers: [
        "Társalgás (B2 szinttől)",
        "Felkészítés nyelvvizsgára",
        "Állásinterjú, önéletrajz, üzleti kommunikáció",
        "Kezdőknek, újrakezdőknek és haladóknak",
      ],
      primary: "Nyelvoktatás",
      secondary: "Tanulási típusok",
      imageAlt: "Tábla a következő feliratokkal: English? Deutsch? Magyar?",
    },
    about: {
      label: "Rólunk",
      title: "*1995* óta",
      text: "Az összes munkafolyamat „egy kézben” van, így a megbízók egy kapcsolattartóval tudják a teljes projektet – fordítás, design, tördelés, nyomtatás – lebonyolítani.",
      cta: "Bővebben rólunk",
    },
  },

  flow: {
    label: "Kommunikáció & Design",
    title: "Megrendelés *folyamata*",
    intro: "… ezeket a munkafolyamatokat vállaljuk projektként vagy különböző kombinációkban is",
    note: "(pl. design és nyomtatás, fordítás és tördelés stb.)",
    steps: [
      { title: "DROP Bt. × Megrendelő", items: ["DROP Bt.", "Megrendelő"] },
      { title: "Fordítás", items: ["EN", "DE", "HU"] },
      { title: "Tördelés & design", items: ["Tördelés", "Design"] },
      { title: "Nyomda & web", items: ["Nyomda", "Web"] },
    ],
    loop: {
      title: "A teljes projekt során",
      items: ["Változtatások", "Új ötletek", "Korrektúra"],
    },
    stepLabel: "Lépés",
    hint: "Vigye az egeret egy lépésre",
    hintTouch: "Koppintson egy lépésre",
  },

  references: {
    label: "Kommunikáció & Design",
    title: "*Referenciák*",
    intro: "Válogatás nyomdai és grafikai munkáinkból – katalógusok, prospektusok, plakátok, naptárak és még sok más.",
    filters: {
      all: "Összes",
      catalogues: "Katalógusok",
      brochures: "Prospektusok & szórólapok",
      posters: "Plakátok & hirdetések",
      editorial: "Kiadványok & arculat",
      calendars: "Naptárak & kártyák",
    },
    open: "Megnézem",
    close: "Bezárás",
    prev: "Előző",
    next: "Következő",
    works: "munka",
  },

  partners: {
    label: "Kommunikáció & Design",
    title: "*Partnerek*",
    intro: "Cégek és intézmények, amelyekkel együtt dolgoztunk.",
    companies: "Cégek",
    institutions: "Intézmények",
  },

  teaching: {
    label: "E-Learning",
    title: "Nyelv*oktatás*",
    kicker: "… nyelvoktatás",
    paragraphs: [
      "A nyelvoktatásban – legyen az személyes vagy online óra – az egyik legnagyobb kihívás annak a módszernek a megtalálása, amivel a diákok a leghatékonyabban tudják elsajátítani a tananyagot.",
      "Minden esetben figyelembe kell venni az adott személy tanulási stílusát, meghatározott céljait, valamint a személyiségét annak érdekében, hogy az új tanulnivalót megfelelő módon fel tudja dolgozni.",
    ],
    highlight: "Az együttműködés tanár és diák között akkor lesz a leghatékonyabb, ha „*működik a kémia*”.",
    offerTitle: "Mit ajánlunk?",
    offers: [
      {
        title: "Angol és német nyelv",
        note: "Anyanyelvi tanárok",
        items: [
          "Társalgás (B2 szinttől)",
          "Felkészítés nyelvvizsgára",
          "Állásinterjúra felkészítés, önéletrajz elkészítése",
          "Üzleti kommunikáció",
        ],
      },
      {
        title: "Angol és német nyelv",
        note: "Minden szinten",
        items: ["Nyelvórák kezdőknek, újrakezdőknek és haladóknak"],
      },
    ],
    imageAlt: "Tábla a következő feliratokkal: English? Deutsch? Magyar?",
    typesTitle: "Ön melyik típushoz *tartozik?*",
    typesCta: "A tanulási típusok",
  },

  types: {
    label: "E-Learning",
    title: "Tanulási *típusok*",
    question: "Ön melyik típushoz *tartozik?*",
    kicker: "… a különböző tanulási típusok",
    mixed: "Vegyes típus",
    hint: "Vigye az egeret egy körre vagy kártyára",
    hintTouch: "Koppintson egy körre vagy kártyára",
    items: [
      {
        key: "visual",
        short: "Vizuális",
        name: "Vizuális típus",
        text: "Megfigyelésen keresztül tanul. Ötletei képi megjelenítéséhez diagramokat és modelleket alkalmaz. A kulcsszavakat szimbólumokkal helyettesíti. Szívesen használ szövegkiemelőt. Szereti az élénk színeket. A fontos dolgokat mindig írásban (e-mailben vagy chaten) rögzíti.",
      },
      {
        key: "auditory",
        short: "Auditív",
        name: "Auditív típus",
        text: "Hallás után tanul. Kérdéseket tesz fel. Másokkal megvitatja a témákat. Amit meg kell jegyeznie, azt hangosan kimondja, vagy kiselőadást tart róla.",
      },
      {
        key: "readwrite",
        short: "Író és olvasó",
        name: "Író és olvasó típus",
        text: "Szövegeket tanul. Gondolatainak rendezéséhez leírja a dolgokat. Jegyzeteit letisztázza, közben pedig kiegészíti. A fontos részeket újrafogalmazza.",
      },
      {
        key: "kinesthetic",
        short: "Kinesztikus",
        name: "Kinesztikus típus",
        text: "Cselekvéseken keresztül tanul. Fogalmak magyarázatához példákat használ. A tények helyett az élményeket igyekszik felidézni.",
      },
      {
        key: "mixed",
        short: "Vegyes",
        name: "Vegyes típus",
        text: "A fentiek vegyítése, vagyis hallásra, látásra és mozgásra épülő tanulás. A lehető legtöbb időt ki akarja használni, ezért akár sétálva, utazás közben is tanul, otthon teleragasztja a konyhaszekrényt cetlikkel, és a telefonjáról hallgatja az előadást vagy a felmondott anyagot.",
      },
    ],
  },

  contact: {
    label: "Kapcsolat",
    title: "Lépjen velünk *kapcsolatba!*",
    connect: "Kapcsolat",
    forAny: "Kérdés esetén írjon nekünk",
    orCall: "Vagy telefonáljon",
    phone: "+36 70 624 9285",
    people: [
      { name: "Droppa Szilvia", role: "Ügyvezető igazgató" },
      { name: "Bary Zoltan", role: "Kommunikáció" },
    ],
    imprint: {
      title: "Impresszum",
      intro:
        "Az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény 4. §-a szerinti adatszolgáltatás.",
      rows: [
        ["Szolgáltató neve", "DROP Kereskedelmi és Szolgáltató Betéti Társaság"],
        ["Szolgáltató székhelye", "H-2330 Dunaharaszti, Árpád utca 3."],
        ["Elektronikus elérhetőség", "info@drop-bt.eu"],
        ["Nyilvántartásba bejegyző bíróság", "Budapest Környéki Törvényszék Cégbírósága"],
        ["Cégjegyzékszám", "13-06-021862"],
        ["Adószám", "24569545-2-13"],
        ["Tárhelyszolgáltató", "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA"],
      ],
    },
  },

  about: {
    label: "Rólunk",
    title: "*Rólunk*",
    lead: "A DROP Kereskedelmi és Szolgáltató Betéti Társaság *1995* óta folytatja tevékenységét.",
    paragraphs: [
      "Az alapító tagok már 1987 óta foglalkoznak a nyomdaiparral, így társaságunk egyik fő profilja mindig a nyomdaipari tevékenység volt. A megalakulás óta törekszünk arra, hogy szolgáltatásunkat egyre komplexebbé tegyük, megrendelőink minden igényét ki tudjuk elégíteni a tervezéstől a végtermékig. Társaságunk elsődleges célkitűzése, hogy kövessük a piaci trendeket, és partnereinknek megbízható, hosszú távú beszállítói hátteret biztosítsunk, mindezt költséghatékonyan és a lehető legmegbízhatóbb módon. Szolgáltatási körünk annyiban tér el a megszokottól, hogy a megbízásokat egészen a fordítástól a késztermék leszállításáig vállaljuk.",
      "Ez számos előnnyel jár, de a legfontosabb, hogy az összes munkafolyamat „egy kézben” van, így a megbízók egy kapcsolattartóval tudják a teljes projektet – fordítás, design, tördelés, nyomtatás stb. – lebonyolítani, ami jelentős költség- és időmegtakarítással is jár. Természetesen a teljes körű kivitelezés mellett igény szerint egy-egy munkafázis elkészítését – fordítás és design, design/tördelés és nyomtatás stb. – külön-külön is vállaljuk.",
      "Profilunkat az évek során nyelvoktatással és coachinggal is színesítettük, mivel különböző anyanyelvű, multikulturális csapattagjaink sokéves tapasztalattal rendelkeznek ezeken a területeken is.",
    ],
    valuesLabel: "Értékeink",
    values: ["Megbízhatóság", "Költséghatékonyság", "Hosszú távú partnerség", "Teljes körű kivitelezés", "Multikulturális csapat"],
    pillars: [
      { title: "Egy kézben", text: "Egy kapcsolattartó a teljes projekthez – fordítás, design, tördelés, nyomtatás." },
      { title: "A tervezéstől a végtermékig", text: "A fordítástól a késztermék leszállításáig vállaljuk a megbízásokat." },
      { title: "Multikulturális csapat", text: "Különböző anyanyelvű csapattagok, sokéves tapasztalattal." },
    ],
  },

  notFound: {
    title: "Az oldal nem *található*",
    text: "A keresett oldal nem létezik, vagy máshová költözött.",
    cta: "Vissza a kezdőlapra",
  },

  footer: {
    tagline: "Let’s create and do it! *Drop in!*",
    company: "DROP Kereskedelmi és Szolgáltató Bt.",
    address: "H-2330 Dunaharaszti, Árpád utca 3.",
    reg: "Cégjegyzékszám: 13-06-021862 · Adószám: 24569545-2-13",
    rights: "Minden jog fenntartva.",
    imprint: "Impresszum",
    companyNav: "Cég",
  },
};

export default hu;
