(() => {
  const products = [
    {
      id: "banana",
      name: "Banana caturra / nanica",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 6.5,
      unit: "1 kg",
      emoji: "🍌",
      image: "assets/products/banana-nanica-recorte.png",
      art: "fruit",
    },
    {
      id: "banana-prata",
      name: "Banana prata",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 4.1,
      unit: "1 kg",
      emoji: "🍌",
      image: "assets/products/banana-prata-recorte.png",
      art: "fruit",
    },
    {
      id: "tomato",
      name: "Tomate",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 17.5,
      unit: "1 kg",
      emoji: "🍅",
      image: "assets/products/tomate-foto.png",
      art: "veg",
    },
    {
      id: "tomato-cherry",
      name: "Tomate cereja",
      brand: "Hortifruti · bandeja 200 g",
      category: "Hortifruti",
      price: 6.98,
      unit: "200 g",
      emoji: "🍅",
      image: "assets/products/tomate-cereja-recorte.png",
      art: "veg",
    },
    {
      id: "broccoli",
      name: "Brócolis japonês",
      brand: "Hortifruti · unidade",
      category: "Hortifruti",
      price: 3.99,
      unit: "1 unidade",
      emoji: "🥦",
      image: "assets/products/brocolis-japones.png",
      art: "veg",
    },
    {
      id: "cauliflower",
      name: "Couve-flor",
      brand: "Hortifruti · unidade",
      category: "Hortifruti",
      price: 8.99,
      unit: "1 unidade",
      emoji: "🥦",
      image: "assets/products/couve-flor-foto.png",
      art: "veg",
    },
    {
      id: "american-pepper",
      name: "Pimenta americana",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 11.99,
      unit: "1 kg",
      emoji: "🫑",
      image: "assets/products/pimenta-americana-foto.png",
      art: "veg",
    },
    {
      id: "chili-dedo-de-moca",
      name: "Pimenta dedo-de-moça",
      brand: "Hortifruti · bandeja",
      category: "Hortifruti",
      price: 6.98,
      unit: "1 bandeja",
      emoji: "🌶️",
      image: "assets/products/pimenta-dedo-de-moca.png",
      art: "veg",
    },
    {
      id: "pepper-cambuci",
      name: "Pimenta cambuci",
      brand: "Hortifruti · bandeja",
      category: "Hortifruti",
      price: 6.98,
      unit: "1 bandeja",
      emoji: "🫑",
      image: "assets/products/pimenta-cambuci.png",
      art: "veg",
    },
    {
      id: "jilo-redondo-verde-escuro",
      name: "Jiló redondo verde-escuro",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 8.39,
      unit: "1 kg",
      emoji: "🍆",
      image: "assets/products/jilo-redondo-verde-escuro.png",
      art: "veg",
    },
    {
      id: "jilo-comprido-verde-claro",
      name: "Jiló comprido verde-claro",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 8.39,
      unit: "1 kg",
      emoji: "🍆",
      image: "assets/products/jilo-comprido-verde-claro.png",
      art: "veg",
    },
    {
      id: "okra",
      name: "Quiabo",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 12.99,
      unit: "1 kg",
      emoji: "🌿",
      image: "assets/products/quiabo.png",
      art: "veg",
    },
    {
      id: "lettuce-curly",
      name: "Alface crespa",
      brand: "Hortifruti · unidade",
      category: "Hortifruti",
      price: 4.49,
      unit: "1 unidade",
      emoji: "🥬",
      image: "assets/products/alface-crespa.png",
      art: "veg",
    },
    {
      id: "cilantro",
      name: "Coentro",
      brand: "Hortifruti · maço",
      category: "Hortifruti",
      price: 2.99,
      unit: "1 maço",
      emoji: "🌿",
      image: "assets/products/coentro.png",
      art: "veg",
    },
    {
      id: "collard-greens",
      name: "Couve-manteiga",
      brand: "Hortifruti · maço",
      category: "Hortifruti",
      price: 3.99,
      unit: "1 maço",
      emoji: "🥬",
      image: "assets/products/couve-manteiga.png",
      art: "veg",
    },
    {
      id: "chicory",
      name: "Almeirão",
      brand: "Hortifruti · unidade",
      category: "Hortifruti",
      price: 3.49,
      unit: "1 unidade",
      emoji: "🥬",
      image: "assets/products/almeirao.png",
      art: "veg",
    },
    {
      id: "chives",
      name: "Cebolinha",
      brand: "Hortifruti · unidade",
      category: "Hortifruti",
      price: 1.99,
      unit: "1 unidade",
      emoji: "🌿",
      image: "assets/products/cebolinha.png",
      art: "veg",
    },
    {
      id: "parsley",
      name: "Salsinha",
      brand: "Hortifruti · unidade",
      category: "Hortifruti",
      price: 1.99,
      unit: "1 unidade",
      emoji: "🌿",
      image: "assets/products/salsinha.png",
      art: "veg",
    },
    {
      id: "potato",
      name: "Batata Monalisa",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 6.7,
      unit: "1 kg",
      emoji: "🥔",
      image: "assets/products/batata-monalisa-recorte.png",
      art: "veg",
    },
    {
      id: "potato-bolinha",
      name: "Batata bolinha",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 6.7,
      unit: "1 kg",
      emoji: "🥔",
      image: "assets/products/batata-bolinha-recorte.png",
      art: "veg",
    },
    {
      id: "sweet-potato",
      name: "Batata-doce",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 5.99,
      unit: "1 kg",
      emoji: "🍠",
      image: "assets/products/batata-doce-foto.png",
      art: "veg",
    },
    {
      id: "potato-asterix",
      name: "Batata Asterix",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 6.79,
      unit: "1 kg",
      emoji: "🥔",
      image: "assets/products/batata-asterix-foto.png",
      art: "veg",
    },
    {
      id: "onion",
      name: "Cebola",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 8.2,
      unit: "1 kg",
      emoji: "🧅",
      image: "assets/products/cebola-foto.png",
      art: "veg",
    },
    {
      id: "onion-red",
      name: "Cebola roxa",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 8.2,
      unit: "1 kg",
      emoji: "🧅",
      image: "assets/products/cebola-roxa-foto.png",
      art: "veg",
    },
    {
      id: "apple",
      name: "Maçã Fuji",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 15.4,
      unit: "1 kg",
      emoji: "🍎",
      image: "assets/products/maca-fuji-foto.png",
      art: "fruit",
    },
    {
      id: "apple-green",
      name: "Maçã verde",
      brand: "Hortifruti · peso variável",
      category: "Hortifruti",
      price: 25.99,
      unit: "1 kg",
      emoji: "🍏",
      image: "assets/products/maca-verde-foto.png",
      art: "fruit",
    },

    {
      id: "eggs",
      name: "Ovos brancos grandes · 12 un.",
      brand: "Granja Feliz",
      category: "Frios e laticínios",
      price: 6.2,
      unit: "12 unidades",
      emoji: "🥚",
      image: "assets/products/ovos-brancos.webp",
      art: "egg",
    },
    {
      id: "eggs-red",
      name: "Ovos vermelhos grandes · 12 un.",
      brand: "Hortifruti · bandeja 12 un.",
      category: "Frios e laticínios",
      price: 6.2,
      unit: "12 unidades",
      emoji: "🥚",
      image: "assets/products/ovos-vermelhos-foto.png",
      art: "egg",
    },

    {
      id: "rice-minueto-5kg",
      name: "Arroz branco tipo 1 · 5 kg",
      brand: "Minueto",
      category: "Mercearia",
      price: 29.8,
      unit: "5 kg",
      emoji: "🍚",
      image: "assets/products/arroz-minueto-5kg.png",
      art: "rice",
    },
    {
      id: "rice-prato-fino-1kg",
      name: "Arroz branco tipo 1 · 1 kg",
      brand: "Prato Fino",
      category: "Mercearia",
      price: 9.99,
      unit: "1 kg",
      emoji: "🍚",
      image: "assets/products/arroz-prato-fino-1kg.png",
      art: "rice",
    },
    {
      id: "risoto-tio-joao-parmigiana-175g",
      name: "Risoto à Parmigiana · 175 g",
      brand: "Tio João",
      category: "Mercearia",
      price: 11.98,
      unit: "175 g",
      emoji: "🍚",
      image: "assets/products/risoto-tio-joao-parmigiana-175g.png",
      art: "rice",
    },
    {
      id: "coffee-melitta-extraforte",
      name: "Café Melitta Extraforte · 500 g",
      brand: "Melitta",
      category: "Mercearia",
      price: 22.9,
      unit: "500 g",
      emoji: "☕",
      image: "assets/products/cafe-melitta-extraforte-500g.png",
      art: "coffee",
    },
    {
      id: "coffee-3-coracoes-extraforte",
      name: "Café 3 Corações Extraforte · 500 g",
      brand: "3 Corações",
      category: "Mercearia",
      price: 24.99,
      unit: "500 g",
      emoji: "☕",
      image: "assets/products/cafe-3-coracoes-extraforte-500g.png",
      art: "coffee",
    },
    {
      id: "cappuccino-3-coracoes-classic",
      name: "Cappuccino Classic 3 Corações · 200 g",
      brand: "3 Corações",
      category: "Mercearia",
      price: 17.99,
      unit: "200 g",
      emoji: "☕",
      image: "assets/products/cappuccino-classic-3-coracoes-200g.png",
      art: "coffee",
    },
    {
      id: "beans-camil-carioca",
      name: "Feijão Carioca Camil Tipo 1 · 1 kg",
      brand: "Camil",
      category: "Mercearia",
      price: 8.49,
      unit: "1 kg",
      emoji: "🫘",
      image: "assets/products/feijao-carioca-camil-1kg.png",
      art: "beans",
    },
    {
      id: "beans-camil-black",
      name: "Feijão Preto Camil Tipo 1 · 1 kg",
      brand: "Camil",
      category: "Mercearia",
      price: 8.79,
      unit: "1 kg",
      emoji: "🫘",
      image: "assets/products/feijao-preto-camil-1kg.png",
      art: "beans",
    },
    {
      id: "oil-coamo-900ml",
      name: "Óleo de soja Coamo · 900 ml",
      brand: "Coamo",
      category: "Mercearia",
      price: 7.49,
      unit: "900 ml",
      emoji: "🫒",
      image: "assets/products/oleo-coamo-900ml.png",
      art: "oil",
    },
    {
      id: "oil-liza-900ml",
      name: "Óleo de soja Liza · 900 ml",
      brand: "Liza",
      category: "Mercearia",
      price: 7.99,
      unit: "900 ml",
      emoji: "🫒",
      image: "assets/products/oleo-liza-900ml.png",
      art: "oil",
    },
    {
      id: "pasta-mondo-spaghetti-500g",
      name: "Macarrão Mondo Spaghetti · 500 g",
      brand: "Mondo",
      category: "Mercearia",
      price: 4.49,
      unit: "500 g",
      emoji: "🍝",
      image: "assets/products/macarrao-mondo-spaghetti-500g.png",
      art: "pasta",
    },
    {
      id: "pasta-galo-semola-500g",
      name: "Macarrão Galo de Sêmola Padrão Normal · 500 g",
      brand: "Galo",
      category: "Mercearia",
      price: 4.09,
      unit: "500 g",
      emoji: "🍝",
      image: "assets/products/macarrao-galo-semola-padrao-normal-500g.png",
      art: "pasta",
    },

    {
      id: "milk-piracanjuba-integral",
      name: "Leite integral UHT Piracanjuba · 1 L",
      brand: "Piracanjuba",
      category: "Frios e laticínios",
      price: 7.79,
      unit: "1 litro",
      emoji: "🥛",
      image: "assets/products/leite-piracanjuba-integral-1l.png",
      art: "milk",
    },
    {
      id: "milk-italac-integral",
      name: "Leite integral UHT Italac · 1 L",
      brand: "Italac",
      category: "Frios e laticínios",
      price: 4.99,
      unit: "1 litro",
      emoji: "🥛",
      image: "assets/products/leite-italac-integral-1l.png",
      art: "milk",
    },

    {
      id: "bread-panco-premium-500g",
      name: "Pão de forma Premium · 500 g",
      brand: "Panco",
      category: "Padaria",
      price: 8.29,
      unit: "500 g",
      emoji: "🍞",
      image: "assets/products/pao-forma-panco-premium-500g.png",
      art: "bread",
    },
    {
      id: "bread-wickbold-integral-500g",
      name: "Pão do Forno 100% integral · 500 g",
      brand: "Wickbold",
      category: "Padaria",
      price: 13.4,
      unit: "500 g",
      emoji: "🍞",
      image: "assets/products/pao-integral-wickbold-do-forno-500g.png",
      art: "bread",
    },
    {
      id: "bread-pullman-brioche-520g",
      name: "Pão de hambúrguer Brioche Grand Burger · 520 g",
      brand: "Pullman",
      category: "Padaria",
      price: 18.69,
      unit: "520 g",
      emoji: "🍞",
      image: "assets/products/pao-pullman-grand-burger-brioche-520g.png",
      art: "bread",
    },
  ];

  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const productGrid = document.querySelector("#product-grid");
  const resultSummary = document.querySelector("#result-summary");
  const noResults = document.querySelector("#no-results");
  const searchInput = document.querySelector("#product-search");
  const searchForm = document.querySelector(".search-form");
  const sortSelect = document.querySelector("#sort-products");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const categoryButtons = [...document.querySelectorAll("[data-category-link]")];
  const cartDialog = document.querySelector("#cart-dialog");
  const demoDialog = document.querySelector("#demo-dialog");
  const cartItems = document.querySelector("#cart-items");
  const cartEmpty = document.querySelector("#cart-empty");
  const cartSummary = document.querySelector("#cart-summary");
  const cartCount = document.querySelector("#cart-count");
  const cartTitleCount = document.querySelector("#cart-title-count");
  const cartSubtotal = document.querySelector("#cart-subtotal");
  const toast = document.querySelector("#market-toast");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeToggleLabel = document.querySelector("#theme-toggle-label");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const themeLogos = [...document.querySelectorAll("[data-theme-light][data-theme-dark]")];
  let activeCategory = "Todos";
  let toastTimer;
  let cart = readCart();

  function setTheme(theme, save = false) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    const nextThemeName = isDark ? "claro" : "escuro";
    const themeLabel = isDark ? "Claro" : "Escuro";
    themeToggle.setAttribute("aria-label", `Tema ${isDark ? "escuro" : "claro"}, ativar tema ${nextThemeName}`);
    themeToggle.title = `Ativar tema ${nextThemeName}`;
    themeToggleLabel.textContent = themeLabel;
    themeColor.content = isDark ? "#07111d" : "#f6f7f4";
    themeLogos.forEach((logo) => {
      logo.src = isDark ? logo.dataset.themeDark : logo.dataset.themeLight;
    });
    if (save) {
      try { localStorage.setItem("kuronami-market-theme", isDark ? "dark" : "light"); } catch { /* A troca de tema vale durante esta visita. */ }
    }
  }

  themeToggle.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
  });
  setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

  function readCart() {
    try {
      const stored = JSON.parse(localStorage.getItem("kuronami-demo-cart") || "{}");
      if (!stored || typeof stored !== "object" || Array.isArray(stored)) return {};
      return Object.fromEntries(Object.entries(stored).filter(([id, quantity]) =>
        products.some((product) => product.id === id) && Number.isInteger(quantity) && quantity > 0,
      ));
    } catch {
      return {};
    }
  }

  function saveCart() {
    try { localStorage.setItem("kuronami-demo-cart", JSON.stringify(cart)); } catch { /* A sacola continua funcionando durante esta visita. */ }
  }

  function normalized(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
  }

  function visibleProducts() {
    const term = normalized(searchInput.value.trim());
    let result = products.filter((product) => {
      const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
      const matchesTerm = !term || normalized(`${product.name} ${product.brand} ${product.category}`).includes(term);
      return matchesCategory && matchesTerm;
    });
    if (sortSelect.value === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortSelect.value === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortSelect.value === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    return result;
  }

  function productPhotoModifier(productId) {
    if (productId === "chives") return " product-photo--chives";
    if (productId === "pasta-mondo-spaghetti-500g") return " product-photo--pasta";

    const tallProductIds = [
      "milk-italac-integral",
      "bread-panco-premium-500g",
      "bread-wickbold-integral-500g",
      "bread-pullman-brioche-520g",
    ];

    return tallProductIds.includes(productId) ? " product-photo--tall" : "";
  }

  function priceUnitLabel(unit) {
    if (unit === "1 kg") return "por kg";
    if (unit === "1 maço") return "por maço";
    return "por unidade";
  }

  function renderProducts() {
    const matches = visibleProducts();
    productGrid.innerHTML = matches.map((product) => `
      <article class="product-card">
        <div class="product-visual visual-${product.art}">
          ${product.image
            ? `<img
                class="product-photo${productPhotoModifier(product.id)}"
                src="${product.image}"
                alt=""
                loading="lazy"
                decoding="async"
              >`
            : `<span class="product-emoji" aria-hidden="true">${product.emoji}</span>`}
          <span class="product-unit">${product.unit}</span>
        </div>
        <div class="product-info">
          <p class="product-department">${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-brand">${product.brand}</p>
          <div class="product-buy-row">
            <span class="product-price">
              ${money.format(product.price)}
              <small>${priceUnitLabel(product.unit)}</small>
            </span>
            <button class="add-button" type="button" data-add="${product.id}" aria-label="Adicionar ${product.name} à sacola">+</button>
          </div>
        </div>
      </article>`).join("");
    noResults.hidden = matches.length > 0;
    resultSummary.textContent = `${matches.length} ${matches.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
  }

  function setCategory(category) {
    activeCategory = category;
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderProducts();
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderCart() {
    const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
    const count = entries.reduce((total, [, quantity]) => total + quantity, 0);
    const subtotal = entries.reduce((total, [id, quantity]) => total + products.find((product) => product.id === id).price * quantity, 0);
    cartCount.textContent = String(count);
    cartCount.setAttribute("aria-label", `${count} ${count === 1 ? "item" : "itens"}`);
    cartTitleCount.textContent = `(${count})`;
    cartSubtotal.textContent = money.format(subtotal);
    cartEmpty.classList.toggle("is-visible", entries.length === 0);
    cartSummary.hidden = entries.length === 0;
    cartItems.innerHTML = entries.map(([id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return `<div class="cart-row">
        <span
          class="cart-thumb visual-${product.art} product-${product.id}"
          aria-hidden="true"
        >
          ${product.image
            ? `<img
                src="${product.image}"
                alt=""
                loading="lazy"
                decoding="async"
              >`
            : product.emoji}
        </span>
        <div class="cart-row-copy"><strong>${product.name}</strong><small>${money.format(product.price)} · ${product.unit}</small>
          <div class="quantity-control" aria-label="Quantidade de ${product.name}">
            <button type="button" data-quantity="${id}" data-delta="-1" aria-label="Diminuir ${product.name}">−</button>
            <span>${quantity}</span>
            <button type="button" data-quantity="${id}" data-delta="1" aria-label="Aumentar ${product.name}">+</button>
          </div>
        </div>
        <strong class="cart-row-price">${money.format(product.price * quantity)}</strong>
      </div>`;
    }).join("");
    saveCart();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2300);
  }

  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (!button) return;
    const product = products.find((item) => item.id === button.dataset.add);
    cart[product.id] = (cart[product.id] || 0) + 1;
    renderCart();
    showToast(`${product.name} adicionado à sua sacola`);
  });

  filterButtons.forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.filter)));
  categoryButtons.forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.categoryLink)));
  searchInput.addEventListener("input", renderProducts);
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderProducts();
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  sortSelect.addEventListener("change", renderProducts);
  document.querySelector("#clear-search").addEventListener("click", () => {
    searchInput.value = "";
    activeCategory = "Todos";
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === "Todos";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderProducts();
    searchInput.focus();
  });

  document.querySelector(".cart-trigger").addEventListener("click", () => cartDialog.showModal());
  document.querySelector(".cart-close").addEventListener("click", () => cartDialog.close());
  document.querySelector(".continue-shopping").addEventListener("click", () => cartDialog.close());
  cartDialog.addEventListener("click", (event) => {
    if (event.target === cartDialog) cartDialog.close();
    const button = event.target.closest("[data-quantity]");
    if (!button) return;
    const id = button.dataset.quantity;
    cart[id] = (cart[id] || 0) + Number(button.dataset.delta);
    if (cart[id] <= 0) delete cart[id];
    renderCart();
  });
  document.querySelector("#checkout-button").addEventListener("click", () => {
    cartDialog.close();
    window.setTimeout(() => demoDialog.showModal(), 120);
  });
  document.querySelector(".demo-close").addEventListener("click", () => demoDialog.close());
  document.querySelector(".demo-understood").addEventListener("click", () => demoDialog.close());
  demoDialog.addEventListener("click", (event) => {
    if (event.target === demoDialog) demoDialog.close();
  });

  renderProducts();
  renderCart();
})();
