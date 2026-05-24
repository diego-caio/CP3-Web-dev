// ===== DADOS DOS PRODUTOS =====
const produtos = [
  {
    id: 1,
    nome: "VoltX Pro 7000",
    descricao: "Potência de 7kW, autonomia de 200km por carga. Design esportivo com painel digital full-color.",
    preco: 18990,
    emoji: "⚡",
    badge: "MAIS VENDIDO",
    imagem: "src/assets/img/kundan-bana-0EsSjaKfZ28-unsplash.jpg",
  },
  {
    id: 2,
    nome: "EcoRider S200",
    descricao: "Ideal para cidade. Motor de 3kW, autonomia de 120km e carregamento rápido em 3 horas.",
    preco: 9490,
    emoji: "🏍️",
    badge: "ECONÔMICA",
    imagem: "src/assets/img/harley-davidson-YsMg1pJqqKk-unsplash.jpg",
  },
  {
    id: 3,
    nome: "Thunder Elite X",
    descricao: "Top de linha. 12kW, autonomia de 300km, suspensão ajustável e conectividade Bluetooth.",
    preco: 32500,
    emoji: "🔋",
    badge: "PREMIUM",
    imagem: "src/assets/img/stefan-lehner-DS2JrhXpEVY-unsplash.jpg",
  },
  {
    id: 4,
    nome: "NeoUrban 500",
    descricao: "Compacta e leve. Perfeita para o trânsito urbano, 2kW e autonomia de 80km.",
    preco: 6990,
    emoji: "🛵",
    badge: "URBAN",
    imagem: "src/assets/img/harley-davidson-YsMg1pJqqKk-unsplash.jpg",
  },
  {
    id: 5,
    nome: "StormCross 9500",
    descricao: "Off-road elétrica. Motor de 9.5kW, pneus reforçados e autonomia de 180km em trilhas.",
    preco: 27800,
    emoji: "💨",
    badge: "OFF-ROAD",
    imagem: "src/assets/img/jan-kopriva-c2cW2tSSvRc-unsplash.jpg",
  },
];

// ===== FORMATAR PREÇO =====
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ===== SALVAR E CARREGAR CARRINHO NO SESSIONstorage =====
function salvarCarrinho() {
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
  sessionStorage.setItem("descontoAplicado", JSON.stringify(descontoAplicado));
}

function carregarCarrinho() {
  const salvo = sessionStorage.getItem("carrinho");
  const desconto = sessionStorage.getItem("descontoAplicado");
  if (salvo) carrinho = JSON.parse(salvo);
  if (desconto) descontoAplicado = JSON.parse(desconto);
}

// ===== ESTADO DO CARRINHO =====
let carrinho = [];
let descontoAplicado = false;

// ===== ADICIONAR AO CARRINHO =====
function adicionarAoCarrinho(id) {
  carregarCarrinho();
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;

  const itemExistente = carrinho.find((i) => i.id === id);
  if (itemExistente) {
    itemExistente.qtd += 1;
  } else {
    carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco, emoji: produto.emoji, qtd: 1 });
  }

  descontoAplicado = false;
  salvarCarrinho();
  mostrarToast("ADICIONADO AO CARRINHO!");
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
      <div class="card-img-wrapper" id="img-wrapper-${produto.id}">
        <img
          src="${produto.imagem}"
          alt="${produto.nome}"
          class="card-img"
          onerror="document.getElementById('img-wrapper-${produto.id}').innerHTML='<div class=&quot;card-placeholder&quot;>${produto.emoji}</div>'"
        />
      </div>
      <div class="card-body">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
      </div>
      <div class="card-footer">
        <span class="preco">${formatarPreco(produto.preco)}</span>
        <button class="btn btn-solid btn-sm" onclick="adicionarAoCarrinho(${produto.id})">COMPRAR</button>
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

// ===== CALCULAR TOTAL COM REDUCE =====
function calcularTotal() {
  return carrinho.reduce((acumulador, item) => {
    return acumulador + item.preco * item.qtd;
  }, 0);
}

// ===== CALCULAR QUANTIDADE COM REDUCE =====
function calcularQuantidadeTotal() {
  return carrinho.reduce((acc, item) => acc + item.qtd, 0);
}

// ===== RENDERIZAR CARRINHO =====
function renderizarCarrinho() {
  const lista = document.getElementById("carrinho-lista");
  const totalEl = document.getElementById("total-valor");
  const subtotalEl = document.getElementById("subtotal-valor");
  const qtdEl = document.getElementById("qtd-itens");
  const descontoEl = document.getElementById("desconto-info");
  const btnDesconto = document.getElementById("btn-desconto");

  if (!lista) return;

  if (carrinho.length === 0) {
    lista.innerHTML = `
      <div class="carrinho-vazio">
        <span class="emoji">🛒</span>
        <p>Seu carrinho está vazio.</p>
        <a href="../index.html" class="btn" style="margin-top:1rem">VER PRODUTOS</a>
      </div>
    `;
  } else {
    lista.innerHTML = "";
    carrinho.forEach((item) => {
      const el = document.createElement("div");
      el.classList.add("item-carrinho");
      el.innerHTML = `
        <div class="item-emoji">${item.emoji}</div>
        <div class="item-info">
          <h4>${item.nome}</h4>
          <p>${formatarPreco(item.preco)} / unid.</p>
        </div>
        <div class="item-qtd">
          <button class="qtd-btn" onclick="alterarQtd(${item.id}, -1)">−</button>
          <span class="qtd-num">${item.qtd}</span>
          <button class="qtd-btn" onclick="alterarQtd(${item.id}, 1)">+</button>
        </div>
        <div class="item-preco">${formatarPreco(item.preco * item.qtd)}</div>
        <button class="item-remover" onclick="removerItem(${item.id})" title="Remover">✕</button>
      `;
      lista.appendChild(el);
    });
  }

  const total = calcularTotal();
  const qtd = calcularQuantidadeTotal();

  if (subtotalEl) subtotalEl.textContent = formatarPreco(total);
  if (qtdEl) qtdEl.textContent = qtd;

  if (descontoAplicado) {
    const totalComDesconto = total * 0.9;
    if (totalEl) totalEl.textContent = formatarPreco(totalComDesconto);
    if (descontoEl) {
      descontoEl.style.display = "block";
      descontoEl.textContent = `✔ DESCONTO DE 10% APLICADO — VOCÊ ECONOMIZOU ${formatarPreco(total * 0.1)}`;
    }
    if (btnDesconto) btnDesconto.disabled = true;
  } else {
    if (totalEl) totalEl.textContent = formatarPreco(total);
    if (descontoEl) descontoEl.style.display = "none";
    if (btnDesconto) btnDesconto.disabled = false;
  }
}

// ===== ALTERAR QUANTIDADE =====
function alterarQtd(id, delta) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) {
    removerItem(id);
    return;
  }
  descontoAplicado = false;
  salvarCarrinho();
  renderizarCarrinho();
  mostrarToast("CARRINHO ATUALIZADO");
}

// ===== REMOVER ITEM =====
function removerItem(id) {
  carrinho = carrinho.filter((i) => i.id !== id);
  descontoAplicado = false;
  salvarCarrinho();
  renderizarCarrinho();
  mostrarToast("ITEM REMOVIDO");
}

// ===== APLICAR DESCONTO 10% COM REDUCE =====
function aplicarDesconto() {
  if (carrinho.length === 0) return;
  const totalOriginal = calcularTotal();
  if (totalOriginal === 0) return;
  descontoAplicado = true;
  salvarCarrinho();
  renderizarCarrinho();
  mostrarToast("DESCONTO DE 10% APLICADO!");
}

// ===== FINALIZAR COMPRA =====
function finalizarCompra() {
  if (carrinho.length === 0) {
    mostrarToast("CARRINHO VAZIO!");
    return;
  }
  alert(
    `✅ Pedido confirmado!\n\n` +
    `Total: ${document.getElementById("total-valor").textContent}\n` +
    `Itens: ${calcularQuantidadeTotal()} unidade(s)\n\n` +
    `Obrigado por escolher a VoltMoto! 🏍️⚡`
  );
  carrinho = [];
  descontoAplicado = false;
  salvarCarrinho();
  renderizarCarrinho();
  mostrarToast("COMPRA FINALIZADA!");
}

// ===== TOAST =====
function mostrarToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  renderizarProdutos();
  renderizarCarrinho();
});