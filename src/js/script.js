// ===== DADOS DOS PRODUTOS =====
const produtos = [
  {
    id: 1,
    nome: "VoltX Pro 7000",
    descricao: "Potência de 7kW, autonomia de 200km por carga. Design esportivo com painel digital full-color.",
    preco: 18990,
    emoji: "⚡",
    badge: "MAIS VENDIDO",
  },
  {
    id: 2,
    nome: "EcoRider S200",
    descricao: "Ideal para cidade. Motor de 3kW, autonomia de 120km e carregamento rápido em 3 horas.",
    preco: 9490,
    emoji: "🏍️",
    badge: "ECONÔMICA",
  },
  {
    id: 3,
    nome: "Thunder Elite X",
    descricao: "Top de linha. 12kW, autonomia de 300km, suspensão ajustável e conectividade Bluetooth.",
    preco: 32500,
    emoji: "🔋",
    badge: "PREMIUM",
  },
  {
    id: 4,
    nome: "NeoUrban 500",
    descricao: "Compacta e leve. Perfeita para o trânsito urbano, 2kW e autonomia de 80km.",
    preco: 6990,
    emoji: "🛵",
    badge: "URBAN",
  },
  {
    id: 5,
    nome: "StormCross 9500",
    descricao: "Off-road elétrica. Motor de 9.5kW, pneus reforçados e autonomia de 180km em trilhas.",
    preco: 27800,
    emoji: "💨",
    badge: "OFF-ROAD",
  },
];

// ===== FORMATAR PREÇO =====
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ===== RENDERIZAR PRODUTOS NA INDEX =====
function renderizarProdutos() {
  const container = document.getElementById("produtos-container");
  if (!container) return;

  container.innerHTML = "";

  produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1}s`;

    card.innerHTML = `
      <span class="card-badge">${produto.badge}</span>
      <div class="card-placeholder">${produto.emoji}</div>
      <div class="card-body">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
      </div>
      <div class="card-footer">
        <span class="preco">${formatarPreco(produto.preco)}</span>
        <a href="pages/loja.html" class="btn btn-solid btn-sm">
          <span>COMPRAR</span>
        </a>
      </div>
    `;

    container.appendChild(card);

    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);
    });
  });
}