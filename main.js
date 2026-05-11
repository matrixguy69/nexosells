// ── CART STORE ──
const Cart = {
  get items() { return JSON.parse(localStorage.getItem('nexo_cart') || '[]'); },
  save(items) { localStorage.setItem('nexo_cart', JSON.stringify(items)); this.updateBadge(); },
  add(product) {
    const items = this.items;
    const existing = items.find(i => i.id === product.id && i.size === product.size);
    if (existing) existing.qty++;
    else items.push({ ...product, qty: 1 });
    this.save(items);
    showToast(`${product.name} added to bag 🔥`);
  },
  remove(id, size) { this.save(this.items.filter(i => !(i.id === id && i.size === size))); },
  updateQty(id, size, qty) {
    const items = this.items;
    const item = items.find(i => i.id === id && i.size === size);
    if (item) { item.qty = qty; if (item.qty <= 0) return this.remove(id, size); }
    this.save(items);
  },
  get total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  get count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  clear() { localStorage.removeItem('nexo_cart'); this.updateBadge(); },
  updateBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.count;
      el.style.display = this.count === 0 ? 'none' : 'inline-block';
    });
  }
};

// ── TOAST ──
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── PRICE DISPLAY (handles sale prices) ──
function renderPrice(product) {
  if (product.salePrice) {
    return `<span class="price-original">PKR ${product.salePrice.toLocaleString()}</span> <span class="price-sale">PKR ${product.price.toLocaleString()}</span>`;
  }
  return `<span class="price-normal">PKR ${product.price.toLocaleString()}</span>`;
}

// ── STOCK CHECK ──
function getStockForSize(product, size) {
  return product.stockBySize?.[size] ?? 99;
}

function isSizeAvailable(product, size) {
  return getStockForSize(product, size) > 0;
}

// ── NAV ──
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const sideMenu = document.querySelector('.side-menu');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-close');
  function openMenu() { sideMenu?.classList.add('open'); overlay?.classList.add('open'); }
  function closeMenu() { sideMenu?.classList.remove('open'); overlay?.classList.remove('open'); }
  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
}

// ── SCROLL REVEAL ──
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// ── RECENTLY VIEWED ──
function trackView(productId) {
  let viewed = JSON.parse(localStorage.getItem('nexo_viewed') || '[]');
  viewed = [productId, ...viewed.filter(id => id !== productId)].slice(0, 8);
  localStorage.setItem('nexo_viewed', JSON.stringify(viewed));
}

function renderRecentlyViewed(containerId) {
  if (!window.PRODUCTS) return;
  const ids = JSON.parse(localStorage.getItem('nexo_viewed') || '[]');
  if (!ids.length) return;
  const container = document.getElementById(containerId);
  if (!container) return;
  const products = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean).slice(0, 4);
  container.innerHTML = products.map(p => `
    <div class="product-card reveal">
      <a href="product.html?id=${p.id}" class="product-img-wrap">
        <div class="product-img-placeholder">${p.emoji || '📦'}</div>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </a>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-cat">${p.category}</p>
        <div class="product-footer">
          <span>${renderPrice(p)}</span>
          <button class="add-btn" onclick="Cart.add({...PRODUCTS.find(x=>x.id===${p.id}), size: PRODUCTS.find(x=>x.id===${p.id}).sizes[0]})">+ ADD</button>
        </div>
      </div>
    </div>`).join('');
  initReveal();
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  Cart.updateBadge();
});
