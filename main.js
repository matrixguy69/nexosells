// ── CART STORE ──
const Cart = {
  get items() {
    return JSON.parse(localStorage.getItem('nexo_cart') || '[]');
  },
  save(items) {
    localStorage.setItem('nexo_cart', JSON.stringify(items));
    this.updateBadge();
  },
  add(product) {
    const items = this.items;
    const existing = items.find(i => i.id === product.id && i.size === product.size);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ ...product, qty: 1 });
    }
    this.save(items);
    showToast(`${product.name} added to cart 🔥`);
  },
  remove(id, size) {
    const items = this.items.filter(i => !(i.id === id && i.size === size));
    this.save(items);
  },
  updateQty(id, size, qty) {
    const items = this.items;
    const item = items.find(i => i.id === id && i.size === size);
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) return this.remove(id, size);
    }
    this.save(items);
  },
  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },
  clear() {
    localStorage.removeItem('nexo_cart');
    this.updateBadge();
  },
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
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── NAV ──
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const sideMenu = document.querySelector('.side-menu');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-close');

  function openMenu() {
    sideMenu?.classList.add('open');
    overlay?.classList.add('open');
  }
  function closeMenu() {
    sideMenu?.classList.remove('open');
    overlay?.classList.remove('open');
  }

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
}

// ── SCROLL REVEAL ──
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  Cart.updateBadge();
});
