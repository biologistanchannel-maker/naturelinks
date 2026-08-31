/* ==========================================================================
   HinduKushBioDiversity — script.js
   Static data + interactivity: map, directory, ethnobotany, quiz, theme,
   citizen sightings, AI companion (local stub).
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Data ---------------- */

  var DISTRICTS = [
    { id: "chitral", name: "Chitral", capital: "Chitral Town", altitude: "1,500m - 7,708m (Tirich Mir)",
      keySpecies: ["Snow Leopard", "Kashmir Markhor", "Chilghoza Pine", "Barberry"],
      protectedAreas: [{ name: "Chitral Gol National Park", type: "National Park" }, { name: "Garam Chashma Wildlife Sanctuary", type: "Wildlife Sanctuary" }],
      threatIndex: 4, x: 50, y: 35 },
    { id: "upperdir", name: "Upper Dir", capital: "Dir", altitude: "1,200m - 4,300m",
      keySpecies: ["Asiatic Black Bear", "Deodar Cedar", "Monal Pheasant", "Chilghoza Pine"],
      protectedAreas: [{ name: "Kumrat Wildlife Reserve", type: "Conservation Zone" }],
      threatIndex: 6, x: 60, y: 70 },
    { id: "lowerdir", name: "Lower Dir", capital: "Timergara", altitude: "800m - 2,200m",
      keySpecies: ["Barberry", "Kashmir Markhor", "Deodar Cedar"],
      protectedAreas: [{ name: "Laram Top Protected Area", type: "Community Conserved Area" }],
      threatIndex: 7, x: 55, y: 95 },
    { id: "swat", name: "Swat", capital: "Saidu Sharif", altitude: "960m - 5,918m (Falaksar)",
      keySpecies: ["Monal Pheasant", "Asiatic Black Bear", "Barberry", "Deodar Cedar"],
      protectedAreas: [{ name: "Kalam Forest Reserve", type: "Nature Reserve" }, { name: "Madyan Game Reserve", type: "Wildlife Sanctuary" }],
      threatIndex: 5, x: 80, y: 65 },
    { id: "shangla", name: "Shangla", capital: "Alpuri", altitude: "1,000m - 3,500m",
      keySpecies: ["Barberry", "Costus Root", "Asiatic Black Bear", "Deodar Cedar"],
      protectedAreas: [{ name: "Shangla Pass Protection Ridge", type: "Protected Watershed" }],
      threatIndex: 8, x: 105, y: 65 },
    { id: "buner", name: "Buner", capital: "Daggar", altitude: "600m - 2,500m",
      keySpecies: ["Costus Root", "Deodar Cedar", "Barberry"],
      protectedAreas: [{ name: "Elum Mountain Conservation Area", type: "Community Protected Area" }],
      threatIndex: 8, x: 100, y: 90 },
    { id: "malakand", name: "Malakand", capital: "Batkhela", altitude: "500m - 1,800m",
      keySpecies: ["Barberry", "Wild Olive"],
      protectedAreas: [{ name: "Malakand Protected Watershed", type: "Soil Reclamation Belt" }],
      threatIndex: 9, x: 75, y: 110 }
  ];

  var FLORA = [
    { id: "f1", scientificName: "Berberis lycium", commonName: "Barberry", localName: "Ishkeen / Sumbul",
      family: "Berberidaceae", category: "flora", subCategory: "Medicinal Shrub", conservationStatus: "LC",
      habitat: "Sunny hill slopes, dry valleys, open shrublands, and rocky cliffs across Swat, Shangla, and Dir, ranging from 1,000 to 2,500m.",
      traditionalUses: "For centuries, local elders have boiled the golden roots to extract \"Ishkeen,\" a condensed thick paste famously applied to heal fractured bones, relieve deep muscular pain, soothe eye infections, and treat severe gastrointestinal disorders.",
      medicinalImportance: "Rich in Berberine alkaloids, possessing strong antimicrobial, wound-healing, and diabetes-modulating properties validated in molecular pharmacology.",
      harvestingPractices: "Roots should be selectively harvested only in late autumn when the plant of Berberis is dormant, taking care to extract only a portion of the mature roots and leaving the central root crown intact to guarantee sustainable regeneration.",
      description: "A spiny, deciduous evergreen shrub reaching up to 3 meters with yellow wood, highly adapted to dry slopes. Produces bright yellow flowers and bluish-black edible acidic berries loved by local mountain birds.",
      image: "images/barberry.png", districts: ["Swat", "Upper Dir", "Lower Dir", "Chitral", "Shangla"] },
    { id: "f2", scientificName: "Pinus gerardiana", commonName: "Chilghoza Pine", localName: "Chilghoza",
      family: "Pinaceae", category: "flora", subCategory: "Conifer Tree", conservationStatus: "NT",
      habitat: "Dry temperate sub-alpine areas of South Chitral, Upper Dir, and neighboring mountains, surviving intense cold at 2,000m to 3,350m.",
      traditionalUses: "A cornerstone of local winter economies. The highly nutritious, oily nuts are roasted inside their dry pine cones and consumed in mountain communities to provide vital warmth and calories during harsh winter blockades.",
      medicinalImportance: "Contains rich monounsaturated fatty acids like pinolenic acid, antioxidants, and trace elements that reduce LDL cholesterol and improve respiratory strength in higher altitudes.",
      harvestingPractices: "Traditional cone picking must be executed by local cooperatives using specialized canvas bags instead of cutting green branches, leaving at least 15% of the pine cones intact to allow natural seed dispersal and forest regeneration.",
      description: "A slow-growing medium pine tree characterized by smooth, papery, peeling bark that sheds to reveal silver-green patches. Famous worldwide for its highly prized, edible elongated pine nuts.",
      image: "images/chilghoza.png", districts: ["Chitral", "Upper Dir"] },
    { id: "f3", scientificName: "Cedrus deodara", commonName: "Deodar Cedar", localName: "Deodar / Yarokh",
      family: "Pinaceae", category: "flora", subCategory: "National Icon Conifer", conservationStatus: "LC",
      habitat: "Prevalent across Kumrat Valley, Kalam, Swat, and Upper Dir sub-alpine moist forests. Prefers rich humid slopes from 1,500m to 3,200m.",
      traditionalUses: "Its dense aromatic timber, immune to insect decay, has historically built traditional mosques, alpine houses, and bridges. Deodar wood resin is used traditionally to treat backaches, skin eczema, and joint pains.",
      medicinalImportance: "The essential oil extracted from Deodar wood contains powerful cedrol, carrying antiseptic, anti-inflammatory, and insecticidal properties.",
      harvestingPractices: "Commercial logging is strictly prohibited by government bans. Harvesting must be limited only to dry fallen branches. naturelink works to build youth forest squads to guard mature stands in Kumrat Valley.",
      description: "The magnificent National Tree of Pakistan. An evergreen conifer with majestic spreading crown, long needles, and deeply furrowed dark-gray bark. Grows into giant towers surviving up to 800 years.",
      image: "images/deodar.jpg", districts: ["Swat", "Upper Dir", "Kalam", "Kumrat Valley", "Lower Dir", "Chitral", "Shangla"] },
    { id: "f4", scientificName: "Saussurea lappa", commonName: "Costus Root", localName: "Kuth / Qust",
      family: "Asteraceae", category: "flora", subCategory: "Endangered Herb", conservationStatus: "EN",
      habitat: "Sub-alpine meadows near moist glaciers and heavy high snowfields in Shangla, Kalam mountains, and high alpine ridges.",
      traditionalUses: "High-value root powdered and infused into tea by local Hakims to treat chronic asthma, arthritis, internal worms, and severe skin inflammations. Also used as a natural organic insect repellent inside woolen chest storage.",
      medicinalImportance: "Contains costunolide lactones, exhibiting high anti-ulcer, anti-inflammatory, and strong bronchodilator therapeutic effects.",
      harvestingPractices: "Wild collection is banned globally under CITES due to risk of imminent extinction. Only licensed, community-cultivated highland farms initiated by naturelink are allowed to harvest the roots.",
      description: "An upright perennial herb growing up to 2 meters with large, heart-shaped leaves and dense, purple-black flower heads clustering tightly at the top of stem.",
      image: "images/mountain.jpg", districts: ["Shangla", "Swat", "Buner"] }
  ];

  var FAUNA = [
    { id: "a1", scientificName: "Panthera uncia", commonName: "Snow Leopard", localName: "Barfani Tendwa",
      family: "Felidae", category: "fauna", subCategory: "Mammal", conservationStatus: "VU",
      habitat: "High alpine ridges and steep rocky scree above the tree line in Chitral Gol National Park and Kalam mountains, hunting at altitudes up to 5,500m.",
      description: "Known as the \"Ghost of the Mountains.\" A majestic cat with highly insulated thick smoky-gray fur patterned with dark rosettes, extremely long muscular tail for balance, and wide paws acting as natural snowshoes. Under immense climate stress.",
      image: "images/snow-leopard.jpg", districts: ["Chitral", "Swat", "Upper Dir"] },
    { id: "a2", scientificName: "Capra falconeri cashmiriensis", commonName: "Kashmir Markhor", localName: "Mairkhwar / Markhor",
      family: "Bovidae", category: "fauna", subCategory: "Mammal", conservationStatus: "NT",
      habitat: "Deep rugged gorges with precipitous cliffs, rocky slopes, and sparse oak scrub forests in Chitral, Kalam, and Lower Dir cliff lands.",
      description: "The magnificent National Animal of Pakistan. Features legendary long, corkscrew-shaped horns that can grow up to 160 cm in males, and a long white shaggy beard. Community conservancies have successfully curbed historic poaching.",
      image: "images/markhor.jpg", districts: ["Chitral", "Swat", "Lower Dir"] },
    { id: "a3", scientificName: "Ursus thibetanus", commonName: "Asiatic Black Bear", localName: "Kala Reech / Janglee Khars",
      family: "Ursidae", category: "fauna", subCategory: "Mammal", conservationStatus: "VU",
      habitat: "Moist broadleaved and coniferous forest zones of Kumrat Valley, Shangla, and dense high forests of Kalam.",
      description: "Characterized by a unique cream-white \"V\" or crescent patch on its chest. Known locally to forage on acorns, berries, wild honey, and crop fields, occasionally breeding human-wildlife conflicts due to agricultural expansions.",
      image: "images/bear.jpg", districts: ["Swat", "Upper Dir", "Kumrat Valley", "Shangla"] },
    { id: "a4", scientificName: "Lophophorus impejanus", commonName: "Himalayan Monal", localName: "Monal / Sunayhar",
      family: "Phasianidae", category: "fauna", subCategory: "Bird", conservationStatus: "LC",
      habitat: "Open sub-alpine meadows, conifer and oak undergrowth at altitudes of 2,400m to 4,500m in Swat, Kalam, and Upper Dir meadows.",
      description: "A stunning bird with iridescent metallic-colored feathers. The male displays a brilliant spectrum of bronze, green, purple, and blue plumage with an elegant crested wire tuft, while the female is camouflaged in speckled brown feathers.",
      image: "images/monal.jpg", districts: ["Swat", "Upper Dir", "Kalam", "Chitral"] }
  ];

  var REMEDIES = [
    { id: "story-1", elder: "Baba Merajuddin (Aged 84, Kalam Valley)", role: "Traditional herbal healer (Hakeem)",
      title: "The Secret of the Ishkeen Paste (Berberis)",
      story: "When my father was young, shepherds would climb up to 3,000 meters just to harvest late-fall Barberry roots. We boil them for days in huge copper pots until a pure, golden extract settles down. If someone falls off a steep Kalam cliff and breaks a bone, we bind this hot paste under wool fabric. In 10 days, they would be walking again. But today, the youth often pull the whole bush out, which kills the plant. We must leave the heart root alone." },
    { id: "story-2", elder: "Zarmina Bibi (Aged 76, South Chitral)", role: "Community Forest Steward",
      title: "The Chilghoza Pine Ledger",
      story: "The Chilghoza is not just a nut; it is our winter protector. In old times, no one was allowed to climb the trees until the village drum beat on conservation day. That was our harvest law. If you break branches, you break your own children's future. Now, under the naturelink initiative, we are bringing back the village community councils to fine anyone who uses metal axes on endangered conifers." }
  ];

  var QUIZ = [
    { question: "Which native tree, officially designated as the National Tree of Pakistan, dominates the high alpine moist forests of Kalam and Kumrat Valley?",
      options: ["Chilghoza Pine", "Deodar Cedar", "Wild Oak", "Sumbul"], answerIndex: 1,
      explanation: "Cedrus deodara (Deodar) is the magnificent National Tree of Pakistan, growing extensively in moist, temperate cold regions like Kumrat and Kalam." },
    { question: "What unique active chemical, critical for respiratory bronchodilation, is exported under strict protection from the roots of the endangered Saussurea lappa (Kuth)?",
      options: ["Berberine", "Cedrol", "Costunolide lactones", "Atropine"], answerIndex: 2,
      explanation: "Saussurea lappa (Kuth root) contains costunolide lactones, providing potent bronchodilatory effects historically used by local traditional Hakims for severe asthma." },
    { question: "How does giving local highlanders ownership over trophy hunting permits help save the Kashmir Markhor?",
      options: ["It allows them to purchase heavy security surveillance drones.", "Permit fees finance local schools and infrastructure, transforming locals into protectors rather than poachers.", "It encourages caging the Markhor for eco-tourism parks.", "It provides direct cash incentives for chemical predator feeds."],
      answerIndex: 1,
      explanation: "80% of trophy hunting permit fees are directly retained by village conservation committees to fund local utility infrastructure. This links species prosperity directly to community economic survival." }
  ];

  var PARKS = [
    { name: "Chitral Gol National Park", area: "7,750 Hectares", altitude: "3,200m - 5,000m",
      focus: "Snow Leopard & Kashmir Markhor",
      info: "A high alpine river basin fenced by steep cliffs, representing the absolute last stronghold of pure Kashmir Markhor genetics in Pakistan.",
      image: "images/mountain.jpg" },
    { name: "Kumrat Forest Conservation reserve", area: "12,500 Hectares", altitude: "2,100m - 4,200m",
      focus: "Asiatic Black Bear & Deodar Cedar",
      info: "Known for spectacular dense coniferous canopies and alpine marshes supporting critical wild carnivore gene pools under heavy protection.",
      image: "images/kumrat.jpg" }
  ];

  var PARTNERS = [
    { label: "British Council Pakistan", url: "https://pakistan.britishcouncil.org/" },
    { label: "United Nations Environment Program (UNEP)", url: "https://www.unep.org/" },
    { label: "IUCN Red List of Species", url: "https://www.iucnredlist.org/" },
    { label: "Convention on Biological Diversity (CBD)", url: "https://www.cbd.int/" },
    { label: "Global Biodiversity Information Facility (GBIF)", url: "https://www.gbif.org/" },
    { label: "WWF Pakistan", url: "https://www.wwfpak.org/" },
    { label: "National Geographic Society", url: "https://www.nationalgeographic.org/" },
    { label: "UN Biodiversity Initiatives", url: "https://www.unep.org/un-biodiversity-conference" },
    { label: "UNESCO Heritage Sites", url: "https://whc.unesco.org/" },
    { label: "Pakistan Environmental Protection Agency", url: "http://mocc.gov.pk/" },
    { label: "Pakistan Wildlife Foundation", url: "https://www.pakistanwildlife.org/" }
  ];

  var DOWNLOADS = [
    { title: "naturelink Alpine Species Identification Guide", size: "4.2 MB", ext: "PDF" },
    { title: "Ethnobotanical Survey of Swat District & Local Remedies", size: "2.8 MB", ext: "PDF" },
    { title: "Snow Leopard Habitat Threat Map & GIS Model 2026", size: "12.4 MB", ext: "ZIP" }
  ];

  var SEED_SIGHTINGS = [
    { id: "s1", speciesName: "Snow Leopard", observerName: "Imran Shah", location: "Chitral Gol", date: "2026-07-14",
      description: "A solitary adult was observed traversing the rocky scree line at approximately 3,900m during late afternoon light." },
    { id: "s2", speciesName: "Himalayan Monal", observerName: "Dr. Fatima Bibi", location: "Kalam Valley", date: "2026-07-02",
      description: "A brilliant male displaying iridescent plumage near the sub-alpine meadow edge, feeding on wild berries." },
    { id: "s3", speciesName: "Kashmir Markhor", observerName: "Community Ranger Unit", location: "Lower Dir", date: "2026-06-21",
      description: "Herd of nine individuals, including two juveniles, grazing on sparse oak scrub along the cliff band." }
  ];

  function sightingImage(name) {
    var n = (name || "").toLowerCase();
    if (n.indexOf("monal") >= 0 || n.indexOf("pheasant") >= 0) return "images/monal.jpg";
    if (n.indexOf("berberis") >= 0 || n.indexOf("barberry") >= 0) return "images/barberry.png";
    if (n.indexOf("markhor") >= 0) return "images/markhor.jpg";
    if (n.indexOf("snow") >= 0 || n.indexOf("leopard") >= 0) return "images/snow-leopard.jpg";
    if (n.indexOf("bear") >= 0) return "images/bear.jpg";
    if (n.indexOf("pine") >= 0 || n.indexOf("chilghoza") >= 0) return "images/chilghoza.png";
    if (n.indexOf("cedar") >= 0 || n.indexOf("deodar") >= 0) return "images/deodar.jpg";
    return "images/mountain.jpg";
  }

  function statusClass(status) {
    switch (status) {
      case "CR": return "st-CR";
      case "EN": return "st-EN";
      case "VU": return "st-VU";
      case "NT": return "st-NT";
      case "LC": return "st-LC";
      default: return "st-default";
    }
  }

  /* ---------------- Theme ---------------- */

  var themeToggle = document.getElementById("theme-toggle");
  function applyTheme(dark) {
    document.documentElement.classList.toggle("dark", dark);
    if (dark) localStorage.setItem("hk-theme", "dark");
    else localStorage.setItem("hk-theme", "light");
  }
  var savedTheme = localStorage.getItem("hk-theme");
  if (savedTheme === "dark") applyTheme(true);
  themeToggle.addEventListener("click", function () {
    applyTheme(!document.documentElement.classList.contains("dark"));
  });

  /* ---------------- Reading bar ---------------- */

  var readingFill = document.getElementById("reading-fill");
  function updateReadingBar() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    readingFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateReadingBar, { passive: true });

  /* ---------------- Scroll-top & nav active ---------------- */

  var scrollTopBtn = document.getElementById("scroll-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) scrollTopBtn.classList.add("is-visible");
    else scrollTopBtn.classList.remove("is-visible");
  }, { passive: true });
  scrollTopBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  var SECTIONS = [
    { id: "map", key: "map" },
    { id: "directory", key: "directory" },
    { id: "ethnobotany", key: "ethnobotany" },
    { id: "quiz", key: "quiz" },
    { id: "research", key: "research" },
    { id: "citizen", key: "citizen" },
    { id: "contact", key: "contact" }
  ];
  var navLinks = document.querySelectorAll(".nav__link");
  var activeSection = "map";
  function setActiveSection(key) {
    activeSection = key;
    navLinks.forEach(function (l) {
      l.classList.toggle("is-active", l.getAttribute("data-scroll") === key);
    });
  }
  window.addEventListener("scroll", function () {
    var y = window.scrollY + 220;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) {
      setActiveSection("contact");
      return;
    }
    SECTIONS.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (el) {
        var top = el.offsetTop, h = el.offsetHeight;
        if (y >= top && y < top + h) setActiveSection(s.key);
      }
    });
  }, { passive: true });

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var off = window.innerWidth < 1024 ? 160 : 120;
    var top = el.getBoundingClientRect().top + window.pageYOffset - off;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-scroll");
      setActiveSection(key);
      scrollToSection(key);
    });
  });

  /* ---------------- Interactive Map ---------------- */

  var mapDetail = document.getElementById("map-detail");
  var mapTabs = document.getElementById("map-tabs");
  var mapMarkers = document.getElementById("district-markers");
  var currentDistrict = "chitral";

  function threatColor(idx) {
    if (idx <= 4) return "#10b981";
    if (idx <= 7) return "#eab308";
    return "#f43f5e";
  }
  function threatBadge(idx) {
    if (idx <= 4) return "threat-low";
    if (idx <= 7) return "threat-mid";
    return "threat-high";
  }
  function threatLabel(idx) {
    if (idx <= 4) return "Stable Habitat (Low Pressure)";
    if (idx <= 7) return "Vulnerable (Climate & Encroachment)";
    return "Critical Buffer (Severely Threatened)";
  }

  function renderMapMarkers() {
    var html = "";
    DISTRICTS.forEach(function (d) {
      var active = d.id === currentDistrict;
      var color = threatColor(d.threatIndex);
      var r = active ? 11 : 7;
      var r2 = active ? 6.5 : 4.5;
      var r3 = "2";
      var fill = active ? "#ffffff" : color;
      var stroke = active ? color : "#ffffff";
      var labelFill = active ? "#10b981" : (d.threatIndex >= 8 ? "#f43f5e" : "#78716c");
      var fontSize = active ? "5.5" : "4.5";
      var fontWeight = active ? "700" : "500";
      html +=
        '<g class="map__marker" data-id="' + d.id + '">' +
        '<circle cx="' + d.x + '" cy="' + d.y + '" r="' + r + '" fill="' + color + '" opacity="' + (active ? 0.25 : 0.08) + '" style="transition:all .35s" />' +
        '<circle cx="' + d.x + '" cy="' + d.y + '" r="' + r2 + '" fill="none" stroke="' + color + '" stroke-width="' + (active ? 1.5 : 0.8) + '" style="transition:all .2s" />' +
        '<circle cx="' + d.x + '" cy="' + d.y + '" r="' + r3 + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1" style="transition:all .2s" />' +
        '<text x="' + d.x + '" y="' + (d.y - (active ? 13 : 9)) + '" text-anchor="middle" font-size="' + fontSize + '" font-weight="' + fontWeight + '" fill="' + labelFill + '" style="transition:all .2s;user-select:none;pointer-events:none;letter-spacing:-.025em;font-family:Inter,sans-serif">' + d.name + "</text>" +
        "</g>";
    });
    mapMarkers.innerHTML = html;
    mapMarkers.querySelectorAll(".map__marker").forEach(function (g) {
      g.addEventListener("click", function () { selectDistrict(g.getAttribute("data-id")); });
    });
  }

  function renderMapDetail() {
    var d = DISTRICTS.find(function (x) { return x.id === currentDistrict; }) || DISTRICTS[0];
    var speciesHtml = d.keySpecies.map(function (s) { return "<span><i></i>" + s + "</span>"; }).join("");
    var protectedHtml = d.protectedAreas.map(function (p) {
      return '<div class="map__protected-item"><span class="map__protected-name">🛡️ ' + p.name + '</span><span class="map__protected-type">' + p.type + "</span></div>";
    }).join("");

    mapDetail.innerHTML =
      '<div><div class="map__detail-head">' +
      '<div><h3 class="map__detail-name">' + d.name + '</h3><span class="map__detail-sub">Hindu Kush Conservation Area</span></div>' +
      '<div class="map__detail-alt"><span class="map__detail-alt-label">Altitude Range</span><span class="map__detail-alt-val">' + d.altitude + "</span></div>" +
      "</div>" +
      '<div class="map__meta-grid">' +
      '<div class="map__meta"><div class="map__meta-label">🏔️ District HQ</div><div class="map__meta-value">' + d.capital + "</div></div>" +
      '<div class="map__meta"><div class="map__meta-label">📊 Threat Rating</div><div><span class="threat-badge ' + threatBadge(d.threatIndex) + '">' + d.threatIndex + '/10</span></div></div>' +
      "</div>" +
      '<div class="map__status"><span>⚠️</span><div><span class="map__status-label">Eco-Status Assessment</span>' + threatLabel(d.threatIndex) + "</div></div>" +
      '<span class="map__species-label">Critical Native Bio Indicators</span>' +
      '<div class="map__species">' + speciesHtml + "</div></div>" +
      '<div style="margin-top:1.5rem"><span class="map__protected-label">Established Protected Reserves (' + d.protectedAreas.length + ')</span>' +
      '<div class="map__protected">' + protectedHtml + "</div></div>";
  }

  function renderMapTabs() {
    mapTabs.innerHTML = DISTRICTS.map(function (d) {
      return '<button class="' + (d.id === currentDistrict ? "is-active" : "") + '" data-id="' + d.id + '">' + d.name + "</button>";
    }).join("");
    mapTabs.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { selectDistrict(b.getAttribute("data-id")); });
    });
  }

  function selectDistrict(id) {
    currentDistrict = id;
    renderMapMarkers();
    renderMapDetail();
    renderMapTabs();
  }

  /* ---------------- Directory ---------------- */

  var dirTab = "flora";
  var filterStatus = "all";
  var filterDistrict = "all";
  var searchTerm = "";
  var speciesGrid = document.getElementById("species-grid");
  var speciesEmpty = document.getElementById("species-empty");

  function renderSpecies() {
    var list = (dirTab === "flora" ? FLORA : FAUNA).filter(function (s) {
      var q = searchTerm.toLowerCase();
      var matchSearch = s.scientificName.toLowerCase().indexOf(q) >= 0 ||
        s.localName.toLowerCase().indexOf(q) >= 0 ||
        s.commonName.toLowerCase().indexOf(q) >= 0 ||
        (s.subCategory && s.subCategory.toLowerCase().indexOf(q) >= 0);
      var matchStatus = filterStatus === "all" || s.conservationStatus === filterStatus;
      var matchDistrict = filterDistrict === "all" || s.districts.indexOf(filterDistrict) >= 0;
      return matchSearch && matchStatus && matchDistrict;
    });

    speciesEmpty.hidden = list.length > 0;

    speciesGrid.innerHTML = list.map(function (s) {
      var facts = "";
      facts += '<div class="fact"><span class="fact__icon">📍</span><div><span class="fact__label">Natural Habitat</span><p class="fact__text">' + s.habitat + "</p></div></div>";
      if (s.traditionalUses) {
        facts += '<div class="fact fact--highlight"><span class="fact__icon">🔬</span><div><span class="fact__label">Traditional Remedies</span><p class="fact__text" style="font-style:italic">"' + s.traditionalUses + '"</p></div></div>';
      }
      if (s.harvestingPractices) {
        facts += '<div class="fact fact--neutral"><span class="fact__icon">🛡️</span><div><span class="fact__label">Sustainable Harvesting Note</span><p class="fact__text">' + s.harvestingPractices + "</p></div></div>";
      }
      var districts = s.districts.map(function (d) { return '<span class="species-card__district">' + d + "</span>"; }).join("");

      return '<div class="species-card" id="species-card-' + s.id + '">' +
        '<div class="species-card__media">' +
        '<img src="' + s.image + '" alt="' + s.commonName + '" loading="lazy" />' +
        '<div class="species-card__badges">' +
        '<span class="status-pill ' + statusClass(s.conservationStatus) + '">' + s.conservationStatus + "</span>" +
        '<span class="subcat-pill">' + s.subCategory + "</span>" +
        "</div></div>" +
        '<div class="species-card__body">' +
        '<div><div class="species-card__head"><div><h4 class="species-card__name">' + s.commonName + '</h4>' +
        '<p class="species-card__sci">' + s.scientificName + "</p></div>" +
        '<div class="species-card__local"><span class="species-card__local-label">Local Name</span><span class="species-card__local-val">' + s.localName + "</span></div></div>" +
        '<div class="species-card__family">❤️ Family: <strong>' + s.family + "</strong></div>" +
        '<p class="species-card__desc">' + s.description + "</p>" +
        '<div class="species-card__facts">' + facts + "</div></div>" +
        '<div class="species-card__districts"><span class="species-card__districts-label">Districts:</span>' + districts + "</div>" +
        "</div></div>";
    }).join("");
  }

  document.getElementById("dir-tabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    document.querySelectorAll("#dir-tabs .tab").forEach(function (t) { t.classList.remove("is-active"); });
    btn.classList.add("is-active");
    dirTab = btn.getAttribute("data-tab");
    renderSpecies();
  });

  document.getElementById("filter-status").addEventListener("change", function (e) {
    filterStatus = e.target.value;
    renderSpecies();
  });
  document.getElementById("filter-district").addEventListener("change", function (e) {
    filterDistrict = e.target.value;
    renderSpecies();
  });
  document.getElementById("species-search").addEventListener("input", function (e) {
    searchTerm = e.target.value;
    renderSpecies();
  });

  /* ---------------- Ethnobotany ---------------- */

  var ethnoFilter = "all";
  var remedyGrid = document.getElementById("remedy-grid");
  var elderGrid = document.getElementById("elder-grid");

  function renderRemedies() {
    var list = FLORA.filter(function (f) { return f.traditionalUses; });
    remedyGrid.innerHTML = list.map(function (f) {
      return '<div class="remedy-card">' +
        '<div><div class="remedy-card__head"><h4 class="remedy-card__name">' + f.commonName + '</h4>' +
        '<span class="remedy-card__sci">' + f.scientificName + "</span></div>" +
        '<p class="remedy-card__text">' + f.traditionalUses + "</p></div>" +
        '<div class="remedy-card__foot">✦ Validated chemical marker: <strong>' + f.family + "</strong></div>" +
        "</div>";
    }).join("");
  }

  function renderElders() {
    elderGrid.innerHTML = REMEDIES.map(function (r) {
      return '<div class="elder-card">' +
        '<div class="elder-card__icon">❝</div>' +
        '<div><span class="elder-card__elder">' + r.elder + '</span>' +
        '<span class="elder-card__role">Role: ' + r.role + "</span>" +
        '<h4 class="elder-card__title">' + r.title + "</h4>" +
        '<p class="elder-card__story">"' + r.story + '"</p></div>' +
        "</div>";
    }).join("");
  }

  function applyEthnoFilter() {
    document.querySelectorAll("[data-ethno-block]").forEach(function (block) {
      var tags = block.getAttribute("data-ethno-block").split(" ");
      var show = ethnoFilter === "all" || tags.indexOf(ethnoFilter) >= 0;
      block.style.display = show ? "" : "none";
    });
  }

  document.querySelectorAll("[data-ethno]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-ethno]").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      ethnoFilter = btn.getAttribute("data-ethno");
      applyEthnoFilter();
    });
  });

  /* ---------------- Quiz ---------------- */

  var quizBody = document.getElementById("quiz-body");
  var quizCounter = document.getElementById("quiz-counter");
  var quizIndex = 0, quizSelected = null, quizLocked = false, quizScore = 0, quizDone = false;

  function renderQuiz() {
    if (quizDone) {
      quizCounter.textContent = "Q: " + QUIZ.length + " / " + QUIZ.length;
      var msg = quizScore === QUIZ.length
        ? "Outstanding! You are a qualified naturelink Ambassador of the high Hindu Kush."
        : "Superb attempt! Continue researching our flora and fauna catalogs to scale your scores higher.";
      quizBody.innerHTML =
        '<div class="quiz__result">' +
        '<div class="quiz__result-icon">🏅</div>' +
        '<h4>Your Conservation Score</h4>' +
        '<p class="quiz__result-score">' + quizScore + " / " + QUIZ.length + "</p>" +
        "<p>" + msg + "</p>" +
        '<div class="quiz__actions" style="justify-content:center"><button class="btn btn--ghost" id="quiz-restart">Restart assessment</button></div>' +
        "</div>";
      document.getElementById("quiz-restart").addEventListener("click", restartQuiz);
      return;
    }

    var q = QUIZ[quizIndex];
    quizCounter.textContent = "Q: " + (quizIndex + 1) + " / " + QUIZ.length;

    var opts = q.options.map(function (opt, i) {
      var cls = "quiz__option";
      if (quizLocked) {
        if (i === q.answerIndex) cls += " is-correct";
        else if (i === quizSelected) cls += " is-wrong";
        else cls += " is-dim";
      } else if (quizSelected === i) {
        cls += " is-selected";
      }
      var mark = "";
      if (quizLocked && i === q.answerIndex) mark = '<span class="opt-mark">✓</span>';
      else if (quizLocked && i === quizSelected && i !== q.answerIndex) mark = '<span class="opt-mark">✕</span>';
      return '<button class="' + cls + '" data-opt="' + i + '"><span>' + opt + "</span>" + mark + "</button>";
    }).join("");

    var feedback = "";
    if (quizLocked) {
      feedback = '<div class="quiz__feedback"><span>🏅</span><div><strong>' +
        (quizSelected === q.answerIndex ? "Excellent explanation!" : "Keep studying!") + "</strong><p>" +
        q.explanation + "</p></div></div>";
    }

    var action = quizLocked
      ? '<button class="btn btn--primary" id="quiz-next">Next Challenge →</button>'
      : '<button class="btn btn--primary" id="quiz-check" ' + (quizSelected === null ? "disabled style='opacity:.4;cursor:not-allowed'" : "") + ">Check Answer</button>";

    quizBody.innerHTML =
      '<div class="quiz__question">' + q.question + "</div>" +
      '<div class="quiz__options">' + opts + "</div>" + feedback +
      '<div class="quiz__actions">' + action + "</div>";

    quizBody.querySelectorAll(".quiz__option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (quizLocked) return;
        quizSelected = parseInt(btn.getAttribute("data-opt"), 10);
        renderQuiz();
      });
    });

    var checkBtn = document.getElementById("quiz-check");
    if (checkBtn) checkBtn.addEventListener("click", function () {
      quizLocked = true;
      if (quizSelected === q.answerIndex) quizScore++;
      renderQuiz();
    });
    var nextBtn = document.getElementById("quiz-next");
    if (nextBtn) nextBtn.addEventListener("click", function () {
      if (quizIndex + 1 < QUIZ.length) {
        quizIndex++;
        quizSelected = null;
        quizLocked = false;
        renderQuiz();
      } else {
        quizDone = true;
        renderQuiz();
      }
    });
  }

  function restartQuiz() {
    quizIndex = 0; quizSelected = null; quizLocked = false; quizScore = 0; quizDone = false;
    renderQuiz();
  }

  /* ---------------- Research / Parks ---------------- */

  var parkGrid = document.getElementById("park-grid");
  parkGrid.innerHTML = PARKS.map(function (p) {
    return '<div class="park-card">' +
      '<div class="park-card__media"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy" />' +
      '<span class="park-card__tag">National Protected Reserve</span></div>' +
      '<div class="park-card__body"><div><div class="park-card__name">' + p.name + '</div>' +
      '<p class="park-card__info">"' + p.info + '"</p></div>' +
      '<div class="park-card__meta"><div><span>Established Area</span>' + p.area + '</div>' +
      '<div style="text-align:center"><span>Altitude Meter</span>' + p.altitude + '</div>' +
      '<div style="text-align:right"><span>Critical Species</span><span class="em">' + p.focus + "</span></div></div></div></div>";
  }).join("");

  var downloads = document.getElementById("downloads");
  downloads.innerHTML = DOWNLOADS.map(function (d) {
    return '<div class="download" data-title="' + d.title + '" data-size="' + d.size + '">' +
      '<div style="display:flex;align-items:center;gap:.75rem"><span class="download__icon">⬇</span><div><div>' + d.title + "</div>" +
      '<div class="download__meta">Format: ' + d.ext + " • File size: " + d.size + "</div></div></div><span>↗</span></div>";
  }).join("");
  downloads.querySelectorAll(".download").forEach(function (el) {
    el.addEventListener("click", function () {
      alert("naturelink: Commencing local download trigger for '" + el.getAttribute("data-title") + "' (Size: " + el.getAttribute("data-size") + ")");
    });
  });

  var partnerGrid = document.getElementById("partner-grid");
  partnerGrid.innerHTML = PARTNERS.map(function (p) {
    return '<a class="partner-link" href="' + p.url + '" target="_blank" rel="noreferrer"><span>' + p.label + "</span><span>↗</span></a>";
  }).join("");

  /* ---------------- Citizen Science ---------------- */

  var feed = document.getElementById("sightings-feed");
  var sightings = SEED_SIGHTINGS.slice();

  function renderFeed() {
    feed.innerHTML = sightings.map(function (s) {
      return '<div class="sighting">' +
        '<div class="sighting__thumb"><img src="' + sightingImage(s.speciesName) + '" alt="' + s.speciesName + '" loading="lazy" /></div>' +
        '<div class="sighting__body"><div><div class="sighting__top"><span class="sighting__species">' + s.speciesName + '</span>' +
        '<span class="sighting__verified">Verified Sighting</span></div>' +
        '<p class="sighting__desc">"' + s.description + '"</p></div>' +
        '<div class="sighting__meta"><span>👤 <span class="val">' + s.observerName + "</span></span>" +
        '<span style="justify-content:center">📍 <span class="val">' + s.location + "</span></span>" +
        '<span style="justify-content:flex-end">📅 <span class="val">' + s.date + "</span></span></div></div></div>";
    }).join("");
  }
  renderFeed();

  var form = document.getElementById("sighting-form");
  var formSuccess = document.getElementById("form-success");
  var submitBtn = document.getElementById("submit-btn");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var observer = document.getElementById("f-observer").value.trim();
    var species = document.getElementById("f-species").value.trim();
    var location = document.getElementById("f-location").value.trim();
    var date = document.getElementById("f-date").value;
    var notes = document.getElementById("f-notes").value.trim();
    if (!observer || !species || !location) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Registering Sightings...";
    setTimeout(function () {
      sightings.unshift({ id: "s" + Date.now(), speciesName: species, observerName: observer, location: location, date: date || "2026-08-31", description: notes || "Details pending verification." });
      renderFeed();
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Scientific Report";
      formSuccess.hidden = false;
      setTimeout(function () { formSuccess.hidden = true; }, 5000);
    }, 500);
  });

  /* ---------------- AI Companion (local stub) ---------------- */

  var aiChat = document.getElementById("ai-chat");
  var aiInput = document.getElementById("ai-input");
  var aiSend = document.getElementById("ai-send");

  function aiFallbackAnswer(prompt) {
    var p = (prompt || "").toLowerCase();
    if (p.indexOf("berberis") >= 0 || p.indexOf("barberry") >= 0 || p.indexOf("ishkeen") >= 0) {
      return "Berberis lycium (Barberry / Ishkeen) roots are rich in Berberine alkaloids. Traditional healers in Swat and Dir boil the golden roots into a thick paste applied to heal fractured bones, ease muscle pain and soothe eye infections. Modern pharmacology validates its antimicrobial, wound-healing and diabetes-modulating effects.";
    }
    if (p.indexOf("markhor") >= 0) {
      return "The Kashmir Markhor (Capra falconeri cashmiriensis) is Pakistan's National Animal. Communities now earn 80% of trophy-hunting permit fees, which fund local schools and infrastructure — turning former poachers into protectors and sharply reducing illegal hunting across Chitral and Kalam.";
    }
    if (p.indexOf("saussurea") >= 0 || p.indexOf("kuth") >= 0 || p.indexOf("costus") >= 0) {
      return "Saussurea lappa (Kuth / Costus root) is an endangered sub-alpine herb. Its roots contain costunolide lactones with potent bronchodilator and anti-inflammatory action, historically used for asthma. Wild collection is banned under CITES — only licensed naturelink community farms may harvest it sustainably.";
    }
    if (p.indexOf("chilghoza") >= 0 || p.indexOf("pine") >= 0) {
      return "Chilghoza Pine (Pinus gerardiana) produces prized oily nuts that sustain mountain winter economies. Traditional cone harvest leaves at least 15% of cones for natural seed dispersal, ensuring forest regeneration across South Chitral and Upper Dir.";
    }
    return "Great question! The Hindu Kush hosts over 4,500 plant and 450 vertebrate species across alpine zones in Swat, Dir, Chitral and Shangla. Key species include Deodar Cedar (National Tree), Snow Leopard, Kashmir Markhor, Himalayan Monal and the medicinal Barberry. Ask me about a specific species or remedy for more detail.";
  }

  function appendAiMessage(role, text) {
    var div = document.createElement("div");
    div.className = "ai__msg ai__msg--" + (role === "user" ? "user" : "bot");
    var bubble = document.createElement("div");
    bubble.className = "ai__bubble";
    bubble.textContent = text;
    var who = document.createElement("span");
    who.className = "ai__who";
    who.textContent = role === "user" ? "You" : "naturelink Scholar";
    div.appendChild(bubble);
    div.appendChild(who);
    aiChat.appendChild(div);
    aiChat.scrollTop = aiChat.scrollHeight;
  }

  function sendAi(prompt) {
    var text = prompt || aiInput.value;
    if (!text.trim()) return;
    appendAiMessage("user", text.trim());
    aiInput.value = "";
    var loading = document.createElement("div");
    loading.className = "ai__msg ai__msg--bot";
    loading.innerHTML = '<div class="ai__bubble">Analyzing botanical datasets…</div>';
    aiChat.appendChild(loading);
    aiChat.scrollTop = aiChat.scrollHeight;
    setTimeout(function () {
      loading.remove();
      appendAiMessage("bot", aiFallbackAnswer(text));
    }, 600);
  }

  aiSend.addEventListener("click", function () { sendAi(); });
  aiInput.addEventListener("keydown", function (e) { if (e.key === "Enter") sendAi(); });
  document.querySelectorAll("[data-prompt]").forEach(function (btn) {
    btn.addEventListener("click", function () { sendAi(btn.getAttribute("data-prompt")); });
  });

  /* ---------------- Init ---------------- */

  renderMapMarkers();
  renderMapDetail();
  renderMapTabs();
  renderSpecies();
  renderRemedies();
  renderElders();
  renderQuiz();
  updateReadingBar();
})();
