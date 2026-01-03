// products.js renders product grids on pages that include it.
// Products live in assets/js/products.js itself for simplicity (no fetch needed on GitHub Pages).

const PRODUCTS = [
  // SIGNATURE
  {
    id: "tee-theory",
    name: "WORKING THEORY Tee",
    price: 45,
    category: "apparel",
    tags: ["signature", "tee"],
    blurb: "Fine-line grid. Big word. Small subtext. Tested daily.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html"
  },
  {
    id: "singlet-sleeves",
    name: "Sleeves Are For Job Interviews Singlet",
    price: 39,
    category: "apparel",
    tags: ["signature", "singlet"],
    blurb: "A wardrobe statement and a lifestyle choice.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html"
  },
  {
    id: "stubbie-classic",
    name: "Classic Bogan Stubby Holder",
    price: 12,
    category: "gifts",
    tags: ["signature", "stubby"],
    blurb: "Keeps it cold. Keeps it honest.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html"
  },

  // GIFTS
  {
    id: "mug-servo",
    name: "Servo Coffee Mug",
    price: 22,
    category: "gifts",
    tags: ["mug"],
    blurb: "For 6am heroics and 3pm regret.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html"
  },
  {
    id: "sign-shed",
    name: "Shed Rules Metal Sign",
    price: 29,
    category: "gifts",
    tags: ["sign"],
    blurb: "Decor for the sacred place where projects go to become ‘ongoing’.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html"
  },

  // PRINTS
  {
    id: "card-bday",
    name: "Birthday Card: Certified Chaos Unit",
    price: 7,
    category: "prints",
    tags: ["card"],
    blurb: "For the mate who turns every gathering into a story.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html"
  },
  {
    id: "print-sensitive",
    name: "Print: The Sensitive Bogan",
    price: 25,
    category: "prints",
    tags: ["print"],
    blurb: "Rough edges. Soft centre. Frame it like it’s art (because it is).",
    img: "assets/img/placeholder.jpg",
    link: "shop.html"
  },

  // BUNDLES
  {
    id: "bundle-starter",
    name: "Bogan Starter Pack",
    price: 69,
    category: "bundles",
    tags: ["bundles", "signature"],
    blurb: "Hero tee + stubby + sticker + card. Instant legend status.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html#bundles"
  },
  {
    id: "bundle-dad",
    name: "Bogan Dad Gift Pack",
    price: 79,
    category: "bundles",
    tags: ["bundles"],
    blurb: "For the man who taught you sarcasm and the value of a good chilly bin.",
    img: "assets/img/placeholder.jpg",
    link: "shop.html#bundles"
  }
];

(function () {
  const grids = document.querySelectorAll("[data-product-grid]");
  if (!grids.length) return;

  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat"); // apparel | gifts | prints | bundles
  const title = document.querySelector("[data-collection-title]");
  const subtitle = document.querySelector("[data-collection-subtitle]");
  const pill = document.querySelector("[data-collection-pill]");
  const searchInput = document.querySelector("[data-product-search]");

  const collectionMeta = {
    apparel: { title: "Apparel", subtitle: "Wearable in public. Dangerous in the comments." },
    gifts: { title: "Gifts & Home", subtitle: "For the shed, the bar, and the highly specific mate." },
    prints: { title: "Cards & Prints", subtitle: "Small price. Big laugh. Easy gift win." },
    bundles: { title: "Bundles & Starter Packs", subtitle: "Gifting made idiot-proof." }
  };

  if (cat && collectionMeta[cat]) {
    document.title = `${collectionMeta[cat].title} — bogan.co.nz`;
    if (title) title.textContent = collectionMeta[cat].title;
    if (subtitle) subtitle.textContent = collectionMeta[cat].subtitle;
    if (pill) pill.textContent = collectionMeta[cat].title;
  }

  grids.forEach((grid) => {
    const filter = grid.getAttribute("data-filter"); // "signature" or "bundles" etc.
    const initial = filterProducts({ cat, filter });
    render(grid, initial);
    grid.dataset.current = JSON.stringify(initial.map(p => p.id));
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = (e.target.value || "").toLowerCase().trim();

      grids.forEach((grid) => {
        const filter = grid.getAttribute("data-filter");
        let list = filterProducts({ cat, filter });
        if (q) {
          list = list.filter(p =>
            `${p.name} ${p.blurb} ${p.category} ${p.tags.join(" ")}`
              .toLowerCase()
              .includes(q)
          );
        }
        render(grid, list);
      });
    });
  }

  function filterProducts({ cat, filter }) {
    let list = [...PRODUCTS];
    if (cat) list = list.filter(p => p.category === cat);
    if (filter) list = list.filter(p => p.tags.includes(filter));
    return list;
  }

  function render(grid, items) {
    grid.innerHTML = items.map(cardHTML).join("");
  }

  function cardHTML(p) {
    return `
      <article class="product">
        <div class="product-img" aria-hidden="true">
          <img src="${p.img}" alt="" loading="lazy" />
        </div>
        <div class="product-body">
          <div class="product-top">
            <h3 class="product-name">${escapeHTML(p.name)}</h3>
            <div class="product-price">$${p.price}</div>
          </div>
          <p class="product-blurb">${escapeHTML(p.blurb)}</p>
          <div class="product-actions">
            <a class="btn btn-small" href="${p.link}">View</a>
            <a class="btn btn-small btn-ghost" href="contact.html">Order / Ask</a>
          </div>
        </div>
      </article>
    `;
  }

  function escapeHTML(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
