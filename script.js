/* =========================================================================
   DIGITAL WORLD — script.js
   Vanilla JS only. Organized by feature. Search "TODO" for easy edit points.
   ========================================================================= */

/* -------------------------------------------------------------------------
   0. CONFIG — edit these to relaunch under a different number/handle
------------------------------------------------------------------------- */
const CONFIG = {
  // TODO: replace with the real WhatsApp Business number, country code first, no + or spaces.
  whatsappNumber: "919006060974"
};

/* -------------------------------------------------------------------------
   1. Header: scroll shadow + mobile menu
------------------------------------------------------------------------- */
(function header() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");

  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const openMenu = () => {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
})();

/* -------------------------------------------------------------------------
   2. Reveal-on-scroll
------------------------------------------------------------------------- */
(function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
})();

/* -------------------------------------------------------------------------
   3. "Learn More" -> smooth scroll to service detail
------------------------------------------------------------------------- */
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-scroll-to");
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* -------------------------------------------------------------------------
   4. FAQ accordion
------------------------------------------------------------------------- */
document.querySelectorAll(".faq-item").forEach((item) => {
  const q = item.querySelector(".faq-q");
  const a = item.querySelector(".faq-a");
  q.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");
    document.querySelectorAll(".faq-item.is-open").forEach((other) => {
      if (other !== item) {
        other.classList.remove("is-open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      }
    });
    if (isOpen) {
      item.classList.remove("is-open");
      a.style.maxHeight = null;
      q.setAttribute("aria-expanded", "false");
    } else {
      item.classList.add("is-open");
      a.style.maxHeight = a.scrollHeight + "px";
      q.setAttribute("aria-expanded", "true");
    }
  });
});

/* -------------------------------------------------------------------------
   5. Gallery lightbox
------------------------------------------------------------------------- */
(function lightbox() {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  document.querySelectorAll("[data-lightbox-src]").forEach((el) => {
    el.addEventListener("click", () => {
      lbImg.src = el.getAttribute("data-lightbox-src");
      lbImg.alt = el.getAttribute("data-lightbox-alt") || "Gallery image";
      lb.classList.add("is-open");
    });
  });
  const close = () => lb.classList.remove("is-open");
  closeBtn.addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

/* -------------------------------------------------------------------------
   6. Device / Brand / Model data
   Coverage: full cascading list for Smartphone (the category the brief
   details explicitly). Other categories use a shorter brand list; if a
   brand/model isn't listed, "Other" reveals a free-text field so nothing
   is ever blocked.
------------------------------------------------------------------------- */
const OTHER = "Other";

const SMARTPHONE_MODELS = {
  Apple: ["iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max","iPhone 12 Mini","iPhone 12","iPhone 12 Pro","iPhone 12 Pro Max","iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max","iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max","iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max","iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max","iPhone SE (2nd Gen)","iPhone SE (3rd Gen)"],
  Samsung: ["Galaxy S21","Galaxy S21+","Galaxy S21 Ultra","Galaxy S22","Galaxy S22+","Galaxy S22 Ultra","Galaxy S23","Galaxy S23+","Galaxy S23 Ultra","Galaxy S23 FE","Galaxy S24","Galaxy S24+","Galaxy S24 Ultra","Galaxy Z Flip 4","Galaxy Z Flip 5","Galaxy Z Fold 4","Galaxy Z Fold 5","Galaxy A14","Galaxy A15","Galaxy A24","Galaxy A34","Galaxy A54","Galaxy A55","Galaxy M14","Galaxy M34","Galaxy F14"],
  Xiaomi: ["Xiaomi 11 Lite","Xiaomi 11i","Xiaomi 12","Xiaomi 12 Pro","Xiaomi 13","Xiaomi 13 Pro","Xiaomi 14","Xiaomi 14 Civi","Mi A3","Mi 10","Mi 10T","Mi 11X","Mi 11X Pro"],
  Redmi: ["Redmi 9 3GB/32GB","Redmi 9 4GB/64GB","Redmi 9 4GB/128GB","Redmi 9 6GB/128GB","Redmi 9 Prime 4GB/64GB","Redmi 9 Prime 4GB/128GB","Redmi 9A","Redmi 9C","Redmi 10","Redmi 10 Prime","Redmi 10A","Redmi 10C","Redmi 11 Prime","Redmi 12","Redmi 12C","Redmi 13C","Redmi Note 9","Redmi Note 9 Pro 4G","Redmi Note 9 Pro 5G","Redmi Note 9 Pro Max","Redmi Note 9S","Redmi Note 10","Redmi Note 10 Pro","Redmi Note 10 Pro Max","Redmi Note 10S","Redmi Note 11","Redmi Note 11 Pro","Redmi Note 11 Pro+ 5G","Redmi Note 11S","Redmi Note 12","Redmi Note 12 Pro","Redmi Note 12 Pro+","Redmi Note 12 5G","Redmi Note 13","Redmi Note 13 Pro","Redmi Note 13 Pro+"],
  POCO: ["POCO C31","POCO C51","POCO C55","POCO C65","POCO F1","POCO F3","POCO F4","POCO F5","POCO F5 Pro","POCO F6","POCO M2","POCO M3","POCO M4 Pro","POCO M5","POCO M6 Pro","POCO X2","POCO X3","POCO X3 Pro","POCO X4 Pro 5G","POCO X5","POCO X5 Pro","POCO X6","POCO X6 Pro"],
  Realme: ["Realme 5","Realme 5 Pro","Realme 6","Realme 6 Pro","Realme 7","Realme 7 Pro","Realme 8","Realme 8 Pro","Realme 9","Realme 9 Pro","Realme 9 Pro+","Realme 10","Realme 10 Pro","Realme 11","Realme 11 Pro","Realme 12","Realme 12 Pro","Realme C11","Realme C12","Realme C15","Realme C20","Realme C25","Realme C30","Realme C33","Realme C51","Realme C55","Realme Narzo 50","Realme Narzo 60"],
  Vivo: ["Vivo Y12","Vivo Y15","Vivo Y17","Vivo Y20","Vivo Y21","Vivo Y22","Vivo Y33s","Vivo Y53s","Vivo Y72","Vivo Y100","Vivo V17","Vivo V20","Vivo V21","Vivo V23","Vivo V25","Vivo V27","Vivo V29","Vivo V30","Vivo X60","Vivo X70","Vivo X80","Vivo X90","Vivo T1","Vivo T2","Vivo T3"],
  Oppo: ["Oppo A5s","Oppo A12","Oppo A15","Oppo A16","Oppo A31","Oppo A53","Oppo A54","Oppo A55","Oppo A57","Oppo A74","Oppo A77","Oppo A78","Oppo A96","Oppo A98","Oppo F17","Oppo F19","Oppo F21 Pro","Oppo F23","Oppo Reno 4","Oppo Reno 5","Oppo Reno 6","Oppo Reno 7","Oppo Reno 8","Oppo Reno 9","Oppo Reno 10","Oppo Reno 11","Oppo Reno 12"],
  OnePlus: ["OnePlus 7","OnePlus 7T","OnePlus 8","OnePlus 8T","OnePlus 9","OnePlus 9R","OnePlus 9 Pro","OnePlus 10R","OnePlus 10 Pro","OnePlus 10T","OnePlus 11","OnePlus 11R","OnePlus 12","OnePlus 12R","OnePlus Nord","OnePlus Nord 2","OnePlus Nord 3","OnePlus Nord CE","OnePlus Nord CE 2","OnePlus Nord CE 3","OnePlus Nord CE 4"],
  Motorola: ["Moto G20","Moto G30","Moto G40 Fusion","Moto G60","Moto G73","Moto G84","Moto G85","Moto Edge 30","Moto Edge 40","Moto Edge 50","Moto E13","Moto E20","Moto E22","Razr 40"],
  "Google Pixel": ["Pixel 4a","Pixel 5","Pixel 6","Pixel 6 Pro","Pixel 6a","Pixel 7","Pixel 7 Pro","Pixel 7a","Pixel 8","Pixel 8 Pro","Pixel 8a","Pixel 9","Pixel 9 Pro"],
  Nothing: ["Phone (1)","Phone (2)","Phone (2a)","Phone (2a) Plus"],
  CMF: ["CMF Phone 1"],
  Lava: ["Lava Blaze","Lava Blaze Pro","Lava Blaze 5G","Lava Yuva","Lava Yuva 2","Lava Agni 2"],
  Micromax: ["Micromax IN 1","Micromax IN 2b","Micromax IN Note 1"],
  Infinix: ["Infinix Hot 12","Infinix Hot 30","Infinix Hot 40","Infinix Note 12","Infinix Note 30","Infinix Zero 30"],
  Tecno: ["Tecno Spark 10","Tecno Spark 20","Tecno Camon 20","Tecno Pova 5","Tecno Pova 6"],
  iQOO: ["iQOO Z6","iQOO Z7","iQOO Z9","iQOO 9","iQOO 11","iQOO 12","iQOO Neo 7","iQOO Neo 9"],
  Honor: ["Honor 8X","Honor 9X","Honor 10X Lite","Honor 90","Honor Magic 5 Pro"],
  Huawei: ["Huawei P30","Huawei P30 Lite","Huawei P40 Lite","Huawei Y7 Prime","Huawei Nova 7i"],
  Asus: ["Asus 6Z","Asus ROG Phone 5","Asus ROG Phone 6","Asus ROG Phone 8","Asus Zenfone 9"],
  Sony: ["Sony Xperia 1 IV","Sony Xperia 5 III","Sony Xperia 10 IV"],
  Nokia: ["Nokia 5.4","Nokia 6.1","Nokia 7.2","Nokia G21","Nokia G42","Nokia X30"],
  Lenovo: ["Lenovo K8 Note","Lenovo Z6 Pro","Lenovo Legion Phone"],
  "Black Shark": ["Black Shark 4","Black Shark 5","Black Shark 5 Pro"],
  ZTE: ["ZTE Blade A31","ZTE Blade V40","ZTE Nubia Red Magic 8"],
  Meizu: ["Meizu 16", "Meizu 18", "Meizu 20"],
  Coolpad: ["Coolpad Note 5", "Coolpad Cool 3"],
  LeEco: ["LeEco Le 1s", "LeEco Le 2"],
  Acer: ["Acer Liquid Z6"],
  Panasonic: ["Panasonic Eluga Ray"],
  HTC: ["HTC Desire 20", "HTC U11"],
  LG: ["LG G8", "LG V50", "LG Wing"],
};
SMARTPHONE_MODELS[OTHER] = [];

const DEVICE_DATA = {
  Smartphone: {
    brands: Object.keys(SMARTPHONE_MODELS).concat([]),
    models: SMARTPHONE_MODELS,
  },
  Tablet: {
    brands: ["Apple","Samsung","Lenovo","Xiaomi","Realme","OnePlus","Amazon Fire","Nokia", OTHER],
    models: null,
  },
  Laptop: {
    brands: ["Apple","Dell","HP","Lenovo","Asus","Acer","MSI","Samsung","LG","Microsoft Surface", OTHER],
    models: null,
  },
  Desktop: {
    brands: ["Apple","Dell","HP","Lenovo","Custom Built PC", OTHER],
    models: null,
  },
  Smartwatch: {
    brands: ["Apple Watch","Samsung Galaxy Watch","Noise","boAt","Fire-Boltt","Amazfit","Fitbit","Garmin", OTHER],
    models: null,
  },
  "Feature Phone": {
    brands: ["Nokia","Jio Phone","Itel","Lava","Samsung Guru", OTHER],
    models: null,
  },
  "Gaming Console": {
    brands: ["PlayStation","Xbox","Nintendo Switch", OTHER],
    models: null,
  },
  Printer: {
    brands: ["HP","Canon","Epson","Brother", OTHER],
    models: null,
  },
  Television: {
    brands: ["Samsung","LG","Sony","Xiaomi/Mi","OnePlus","TCL", OTHER],
    models: null,
  },
  Other: {
    brands: [OTHER],
    models: null,
  },
};
// Ensure "Other" is always the last, present option for every category's brand list.
Object.values(DEVICE_DATA).forEach((cat) => {
  if (!cat.brands.includes(OTHER)) cat.brands.push(OTHER);
});

/* -------------------------------------------------------------------------
   7. Reusable searchable select
   Renders into a container with structure:
   <div class="search-select">
     <input type="text" readonly/typeable placeholder>
     <div class="ss-panel"></div>
   </div>
   options: array of strings. onSelect(value) fired on pick.
------------------------------------------------------------------------- */
function createSearchableSelect(root, { placeholder = "Select...", disabled = false } = {}) {
  const input = document.createElement("input");
  input.type = "text";
  input.setAttribute("autocomplete", "off");
  input.placeholder = placeholder;
  input.disabled = disabled;

  const panel = document.createElement("div");
  panel.className = "ss-panel";

  root.innerHTML = "";
  root.appendChild(input);
  root.appendChild(panel);

  let options = [];
  let value = "";
  let onSelectCb = () => {};

  function renderPanel(filterText) {
    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(filterText.toLowerCase())
    );
    panel.innerHTML = "";
    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "ss-empty";
      empty.textContent = "No matches — try a different search or pick Other.";
      panel.appendChild(empty);
      return;
    }
    filtered.forEach((opt) => {
      const row = document.createElement("div");
      row.className = "ss-option";
      row.textContent = opt;
      row.addEventListener("mousedown", (e) => {
        e.preventDefault();
        pick(opt);
      });
      panel.appendChild(row);
    });
  }

  function pick(opt) {
    value = opt;
    input.value = opt;
    root.classList.remove("is-open");
    onSelectCb(opt);
  }

  input.addEventListener("focus", () => {
    if (disabled) return;
    root.classList.add("is-open");
    renderPanel("");
  });
  input.addEventListener("input", () => {
    root.classList.add("is-open");
    renderPanel(input.value);
    if (input.value === "") { value = ""; onSelectCb(""); }
  });
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) root.classList.remove("is-open");
  });

  return {
    setOptions(newOptions) {
      options = newOptions;
    },
    setDisabled(state) {
      disabled = state;
      input.disabled = state;
      input.placeholder = state ? "Select the field above first" : placeholder;
    },
    reset() {
      value = "";
      input.value = "";
    },
    onSelect(cb) {
      onSelectCb = cb;
    },
    getValue() {
      return value;
    },
  };
}

/* -------------------------------------------------------------------------
   8. Booking form wiring
------------------------------------------------------------------------- */
(function bookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const categorySelect = document.getElementById("deviceCategory");
  const otherDeviceWrap = document.getElementById("otherDeviceWrap");
  const otherDeviceInput = document.getElementById("otherDeviceInput");

  const brandRoot = document.getElementById("brandSelect");
  const otherBrandWrap = document.getElementById("otherBrandWrap");
  const otherBrandInput = document.getElementById("otherBrandInput");

  const modelRoot = document.getElementById("modelSelect");
  const otherModelWrap = document.getElementById("otherModelWrap");
  const otherModelInput = document.getElementById("otherModelInput");
  const modelFreeTextWrap = document.getElementById("modelFreeTextWrap");
  const modelFreeTextInput = document.getElementById("modelFreeTextInput");

  const brandField = createSearchableSelect(brandRoot, { placeholder: "Select device category first", disabled: true });
  const modelField = createSearchableSelect(modelRoot, { placeholder: "Select a brand first", disabled: true });

  let currentCategory = "";
  let currentBrand = "";

  categorySelect.addEventListener("change", () => {
    currentCategory = categorySelect.value;
    otherDeviceWrap.style.display = currentCategory === "Other" ? "flex" : "none";

    brandField.reset();
    modelField.reset();
    otherBrandWrap.style.display = "none";
    otherModelWrap.style.display = "none";
    modelFreeTextWrap.style.display = "none";

    if (currentCategory && DEVICE_DATA[currentCategory]) {
      brandField.setOptions(DEVICE_DATA[currentCategory].brands);
      brandField.setDisabled(false);
    } else {
      brandField.setOptions([]);
      brandField.setDisabled(true);
    }
    modelField.setOptions([]);
    modelField.setDisabled(true);
  });

  brandField.onSelect((brand) => {
    currentBrand = brand;
    otherBrandWrap.style.display = brand === OTHER ? "flex" : "none";

    modelField.reset();
    otherModelWrap.style.display = "none";
    modelFreeTextWrap.style.display = "none";

    const catData = DEVICE_DATA[currentCategory];
    if (!brand) {
      modelField.setDisabled(true);
      return;
    }
    if (catData.models && catData.models[brand]) {
      // Full cascading model list (smartphones)
      modelField.setOptions(catData.models[brand].concat([OTHER]));
      modelField.setDisabled(false);
      modelFreeTextWrap.style.display = "none";
    } else {
      // No cascading model DB for this category/brand — use a direct text field
      modelField.setDisabled(true);
      modelField.setOptions([]);
      modelFreeTextWrap.style.display = "flex";
    }
  });

  modelField.onSelect((model) => {
    otherModelWrap.style.display = model === OTHER ? "flex" : "none";
  });

  /* ---- Map / location ----
     Real, draggable -drop map (Leaflet + OpenStreetMap — no API key
     needed) with an address search box. Customers can search their
     address, use their current location, or simply tap/drag the  —
     whichever gets them to the exact spot fastest. */
  const useLocationBtn = document.getElementById("useLocationBtn");
  const mapCoords = document.getElementById("mapCoords");
  const locationMsg = document.getElementById("locationMsg");
  const addressSearchRoot = document.getElementById("addressSearch");
  const addressSearchInput = document.getElementById("addressSearchInput");
  const addressSearchPanel = document.getElementById("addressSearchPanel");

  // TODO: if you'd like the map centred somewhere more precise than
  // "Ranchi city", swap these for the shop's exact coordinates.
  const SHOP_CENTER = { lat: 23.3441, lng: 85.3096 };
  // Rough bounding box around Ranchi, used only to *bias* address search
  // results toward this area (bounded:0 below still allows other places).
  const RANCHI_VIEWBOX = "85.15,23.48,85.55,23.20";

  let map = null;
  let marker = null;
  let accuracyCircle = null;
  let lat = null;
  let lng = null;

  function showLocationMsg(text) {
    locationMsg.textContent = text;
    locationMsg.classList.add("is-visible");
  }
  function clearLocationMsg() {
    locationMsg.classList.remove("is-visible");
  }

  function initMap() {
    if (typeof L === "undefined") {
      showLocationMsg("The map couldn't load (no internet connection?). You can still describe the exact location in the address field above.");
      return;
    }
    map = L.map("leafletMap").setView([SHOP_CENTER.lat, SHOP_CENTER.lng], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Tapg/clicking anywhere on the map drops (or moves) the  there.
    map.on("click", (e) => set(e.latlng.lat, e.latlng.lng, { skipView: true }));

    // Fix any sizing glitch from webfonts/layout shifting after load.
    window.addEventListener("load", () => map && map.invalidateSize());
  }

  function set(newLat, newLng, opts = {}) {
    lat = newLat;
    lng = newLng;
    if (!marker) {
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        lat = pos.lat;
        lng = pos.lng;
        if (accuracyCircle) { map.removeLayer(accuracyCircle); accuracyCircle = null; }
        updateCoordsLabel();
      });
    } else {
      marker.setLatLng([lat, lng]);
    }
    if (!opts.skipView) map.setView([lat, lng], opts.zoom || 17);
    updateCoordsLabel();
  }

  function updateCoordsLabel() {
    mapCoords.classList.remove("map-accuracy-note");
    mapCoords.textContent = `ned at ${lat.toFixed(6)}, ${lng.toFixed(6)} — drag the  if it needs adjusting.`;
  }

  initMap();
  /* Use current GPS location, then let the customer drag the  to
     correct it — this is what fixes "current location isn't accurate". */
  useLocationBtn.addEventListener("click", () => {
    if (!("geolocation" in navigator)) {
      showLocationMsg("Location isn't available on this device/browser. Search your address above instead.");
      return;
    }
    if (!map) { showLocationMsg("Map isn't ready yet — try again in a moment."); return; }
    useLocationBtn.disabled = true;
    useLocationBtn.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        set(latitude, longitude, { zoom: accuracy && accuracy > 100 ? 15 : 18 });
        if (accuracyCircle) map.removeLayer(accuracyCircle);
        if (accuracy) {
          accuracyCircle = L.circle([latitude, longitude], {
            radius: accuracy, color: "#2455E8", weight: 1, fillOpacity: 0.08,
          }).addTo(map);
        }
        if (accuracy && accuracy > 50) {
          mapCoords.classList.add("map-accuracy-note");
          mapCoords.textContent = `ned near your location (accurate to about ${Math.round(accuracy)}m). Please drag the  to your exact spot.`;
        }
        clearLocationMsg();
        useLocationBtn.disabled = false;
        useLocationBtn.textContent = "Use Current Location";
      },
      () => {
        showLocationMsg("Couldn't get your location. Check location permissions, then try again, or search your address above.");
        useLocationBtn.disabled = false;
        useLocationBtn.textContent = "Use Current Location";
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });

  /* Address search, powered by OpenStreetMap's free Nominatim geocoder. */
  let searchDebounce = null;

  function closeAddressPanel() {
    addressSearchRoot.classList.remove("is-open");
  }

  function renderAddressResults(results) {
    addressSearchPanel.innerHTML = "";
    if (!results || results.length === 0) {
      const empty = document.createElement("div");
      empty.className = "ss-empty";
      empty.textContent = "No matches — try a shorter search, or drag the  on the map instead.";
      addressSearchPanel.appendChild(empty);
      addressSearchRoot.classList.add("is-open");
      return;
    }
    results.forEach((r) => {
      const row = document.createElement("div");
      row.className = "ss-option";
      row.textContent = r.display_name;
      row.addEventListener("mousedown", (e) => {
        e.preventDefault();
        addressSearchInput.value = r.display_name;
        set(parseFloat(r.lat), parseFloat(r.lon), { zoom: 17 });
        closeAddressPanel();
        // Fill the pickup address field too, if the customer hasn't typed one yet.
        const addressField = document.getElementById("pickupAddress");
        if (addressField && !addressField.value.trim()) addressField.value = r.display_name;
      });
      addressSearchPanel.appendChild(row);
    });
    addressSearchRoot.classList.add("is-open");
  }

  async function runAddressSearch(query) {
    try {
      const url =
        "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6" +
        `&countrycodes=in&viewbox=${RANCHI_VIEWBOX}&bounded=0&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const results = await res.json();
      renderAddressResults(results);
    } catch (err) {
      showLocationMsg("Couldn't search right now — check your connection, or drag the  on the map instead.");
    }
  }

  addressSearchInput.addEventListener("input", () => {
    const q = addressSearchInput.value.trim();
    clearTimeout(searchDebounce);
    if (q.length < 3) { closeAddressPanel(); return; }
    searchDebounce = setTimeout(() => runAddressSearch(q), 450);
  });
  addressSearchInput.addEventListener("focus", () => {
    if (addressSearchPanel.children.length > 0) addressSearchRoot.classList.add("is-open");
  });
  document.addEventListener("click", (e) => {
    if (!addressSearchRoot.contains(e.target)) closeAddressPanel();
  });


  /* ---- Submit -> WhatsApp ---- */
  const formMsg = document.getElementById("formMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const email = document.getElementById("emailField").value.trim();
    const problem = document.getElementById("problemDesc").value.trim();
    const address = document.getElementById("pickupAddress").value.trim();
    const prefDate = document.getElementById("prefDate").value;
    const prefTime = document.getElementById("prefTime").value;
const googleMapsLink = document.getElementById("googleMapsLink").value.trim();

const hasPinnedLocation = (lat !== null && lng !== null);

if (!googleMapsLink && !hasPinnedLocation) {

    formMsg.textContent = "Please provide either your Google Maps link or pin your exact location.";

    formMsg.classList.add("is-visible", "form-msg--error");

    formMsg.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    return;
}
    if (!name || !phone || !currentCategory || !problem || !address) {
      formMsg.textContent = "Please fill in your name, phone number, device category, problem description, and address.";
      formMsg.classList.add("is-visible", "form-msg--error");
      formMsg.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    formMsg.classList.remove("is-visible", "form-msg--error");

    const deviceCategoryFinal =
      currentCategory === "Other" ? (otherDeviceInput.value.trim() || "Other") : currentCategory;

    const brandFinal =
      currentBrand === "Other" ? (otherBrandInput.value.trim() || "Other") : currentBrand;

    let modelFinal = modelField.getValue();
    if (modelFinal === "Other") modelFinal = otherModelInput.value.trim() || "Other";
    if (!modelFinal) modelFinal = modelFreeTextInput.value.trim();
    if (!modelFinal) modelFinal = "Not specified";

    const locationLine =
        googleMapsLink ||
      (lat !== null && lng !== null
        ? `https://maps.google.com/?q=${lat},${lng}`
        : "Not provided");

    const lines = [
      "*New Repair Booking — Digital World*",
      "",
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      email ? `*Email:* ${email}` : null,
      `*Device Category:* ${deviceCategoryFinal}`,
      `*Brand:* ${brandFinal}`,
      `*Model:* ${modelFinal}`,
      "",
      `*Problem:* ${problem}`,
      "",
      `*Pickup Address:* ${address}`,
      `*Map Location:* ${locationLine}`,
      prefDate ? `*Preferred Date:* ${prefDate}` : null,
      prefTime ? `*Preferred Time:* ${prefTime}` : null,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(url, "_blank", "noopener");
  });
})();

/* -------------------------------------------------------------------------
   9. Generic "Chat on WhatsApp" buttons (hero, floating, contact section)
------------------------------------------------------------------------- */
document.querySelectorAll("[data-whatsapp-cta]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const presetMsg = encodeURIComponent("Hi Digital World, I'd like to ask about a repair.");
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${presetMsg}`, "_blank", "noopener");
  });
});

/* -------------------------------------------------------------------------
   10. Footer year
------------------------------------------------------------------------- */
const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();
