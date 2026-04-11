/* ============================================
   SAPLINE PHARMACEUTICAL — PRODUCTS CATALOG
   ============================================ */

// ===== PRODUCT DATA =====
const PRODUCTS = [
    // --- Pain & Ortho ---
    { id: 1, name: "Sapwin-SPAS", composition: "Aceclofenac 100mg & Drotaverine Hydrochloride 80mg Tablets", category: "Pain & Ortho", form: "Tablets", packaging: "10x10 Alu-Alu", badge: "bestseller", icon: "fa-bone", image: "med_products/med5.jpeg" },
    { id: 2, name: "Sapwin-Fort", composition: "Aceclofenac, Paracetamol & Serratiopeptidase Tablets", category: "Pain & Ortho", form: "Tablets", packaging: "10x10 Alu-Alu", badge: "popular", icon: "fa-bone", image: "med_products/med4.jpeg" },
    { id: 3, name: "Sapwin-Plus", composition: "Aceclofenac & Paracetamol Tablets", category: "Pain & Ortho", form: "Tablets", packaging: "10x10 Alu-Alu", badge: "", icon: "fa-bone", image: "med_products/med10.jpeg" },
    { id: 4, name: "Sapwin DP", composition: "Drotaverine Hydrochloride & Paracetamol Tablets", category: "Spasmodic Pain", form: "Tablets", packaging: "10x10 Tablets", badge: "", icon: "fa-hand-holding-medical", image: "med_products/med1.jpeg" },
    { id: 5, name: "Sapwin-MR", composition: "Etoricoxib & Thiocolchicoside Tablets", category: "Pain & Ortho", form: "Tablets", packaging: "10x10 Tablets", badge: "new", icon: "fa-bone", image: "med_products/med8.jpeg" },

    // --- Gastro ---
    { id: 6, name: "Saptard-D", composition: "Pantoprazole Gastro-Resistant & Domperidone Prolonged-Release Capsules I.P.", category: "Gastro", form: "Capsules", packaging: "10x10 Alu-Alu", badge: "bestseller", icon: "fa-stomach", image: "med_products/med6.jpeg" },
    { id: 7, name: "Aashvi Zyme Syrup", composition: "Digestive Enzyme Syrup", category: "Gastro", form: "Syrup", packaging: "200ml Bottle", badge: "new", icon: "fa-stomach", image: "med_products/med11.png" },
    { id: 8, name: "Aashvi Zyme Drops", composition: "Fungal Diastase & Pepsin Drops (Pediatric Use)", category: "Gastro", form: "Drops", packaging: "30ml Bottle", badge: "new", icon: "fa-stomach", image: "med_products/med12.png" },

    // --- Urology ---
    { id: 9, name: "Safeflow-D", composition: "Tamsulosin Hydrochloride 0.4mg (Modified Release) & Dutasteride 0.5mg Tablets", category: "Urology", form: "Tablets", packaging: "10x10 Tablets", badge: "popular", icon: "fa-pills", image: "med_products/med3.jpeg" },

    // --- Neuroscience ---
    { id: 10, name: "Neuron-OD+", composition: "Alpha Lipoic Acid 100mg, Methylcobalamin 1500mcg, Vitamin B6 3mg, Folic Acid 1.5mg, Benfotiamine 50mg, Biotin 5mg & Chromium Picolinate 250mcg Capsules", category: "Neuroscience", form: "Capsules", packaging: "10x10 Alu-Alu", badge: "bestseller", icon: "fa-brain", image: "med_products/med7.jpeg" },

    // --- Vitamins & Supplements ---
    { id: 11, name: "Saprox XT", composition: "Ferrous Ascorbate, Folic Acid & Zinc Sulphate Tablets", category: "Vitamins", form: "Tablets", packaging: "10x10 Tablets", badge: "bestseller", icon: "fa-capsules", image: "med_products/med2.jpeg" },
    { id: 12, name: "Sapmore", composition: "Multivitamin & Multiminerals Syrup", category: "Vitamins", form: "Syrup", packaging: "200ml Bottle", badge: "popular", icon: "fa-capsules", image: "med_products/med9.jpeg" },

    // --- Hepatology ---
    { id: 13, name: "Udisap 300", composition: "Ursodeoxycholic Acid 300mg Tablets", category: "Gastro", form: "Tablets", packaging: "10x10 Tablets", badge: "new", icon: "fa-stomach", image: "med_products/med_13.jpeg" },

    // --- Anti-Infective ---
    { id: 14, name: "Sapcin-O", composition: "Cefixime & Ofloxacin Tablets", category: "Anti-Infective", form: "Tablets", packaging: "10x10 Tablets", badge: "new", icon: "fa-shield-virus", image: "med_products/med14.jpeg" },
];

// ===== CATEGORY ICONS =====
const CATEGORY_ICONS = {
    "Pain & Ortho": "fa-bone",
    "Gastro": "fa-stomach",
    "Urology": "fa-pills",
    "Neuroscience": "fa-brain",
    "Vitamins": "fa-capsules",
    "Anti-Infective": "fa-shield-virus",
    "Spasmodic Pain": "fa-hand-holding-medical"
};

// ===== STATE =====
let inquiryBasket = JSON.parse(localStorage.getItem('sapline_inquiry') || '[]');
let activeCategory = 'All';
let activeForm = 'All';
let searchQuery = '';
let viewMode = 'grid'; // 'grid' or 'list'
let sortBy = 'name'; // 'name' or 'category'

// ===== DOM ELEMENTS =====
const catalogGrid = document.getElementById('catalogGrid');
const searchInput = document.getElementById('searchInput');
const categoryList = document.getElementById('categoryList');
const basketPanel = document.getElementById('basketPanel');
const basketOverlay = document.getElementById('basketOverlay');
const basketBody = document.getElementById('basketBody');
const basketCountEls = document.querySelectorAll('.basket-count, .basket-header-count');
const catalogCountEl = document.getElementById('catalogCount');
const inquiryModal = document.getElementById('inquiryModal');
const successModal = document.getElementById('successModal');
const quickviewOverlay = document.getElementById('quickviewOverlay');

// ===== RENDER FUNCTIONS =====

function getFilteredProducts() {
    let filtered = [...PRODUCTS];

    // Category
    if (activeCategory !== 'All') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Form
    if (activeForm !== 'All') {
        filtered = filtered.filter(p => p.form === activeForm);
    }

    // Search
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.composition.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    }

    // Sort
    if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'category') {
        filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    return filtered;
}

function renderProducts() {
    const filtered = getFilteredProducts();

    // Update count
    if (catalogCountEl) {
        catalogCountEl.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${PRODUCTS.length}</strong> products`;
    }

    if (filtered.length === 0) {
        catalogGrid.innerHTML = `
            <div class="catalog-empty">
                <i class="fas fa-search"></i>
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or search query</p>
                <button class="btn btn-primary" onclick="resetFilters()">
                    Reset Filters <i class="fas fa-redo"></i>
                </button>
            </div>
        `;
        return;
    }

    catalogGrid.innerHTML = filtered.map(product => {
        const inBasket = inquiryBasket.some(item => item.id === product.id);
        const badgeHTML = product.badge
            ? `<div class="catalog-product-badge badge-${product.badge}">${product.badge}</div>`
            : '';

        const imageHTML = product.image
            ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
            : `<i class="fas ${product.icon}"></i>`;

        return `
            <div class="catalog-product reveal active" data-id="${product.id}">
                ${badgeHTML}
                <div class="catalog-product-image ${product.image ? 'has-image' : ''}">
                    ${imageHTML}
                </div>
                <div class="catalog-product-body">
                    <div class="catalog-product-category">${product.category}</div>
                    <h3>${product.name}</h3>
                    <p class="catalog-product-composition">${product.composition}</p>
                    <div class="catalog-product-meta">
                        <span class="meta-tag"><i class="fas fa-capsules"></i> ${product.form}</span>
                        <span class="meta-tag"><i class="fas fa-box"></i> ${product.packaging}</span>
                    </div>
                    <div class="catalog-product-actions">
                        <button class="btn-inquiry ${inBasket ? 'added' : ''}" onclick="toggleInquiry(${product.id})">
                            <i class="fas ${inBasket ? 'fa-check' : 'fa-plus'}"></i>
                            ${inBasket ? 'Added' : 'Add to Inquiry'}
                        </button>
                        <button class="btn-quick-view" onclick="openQuickView(${product.id})" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderCategories() {
    const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

    categoryList.innerHTML = categories.map(cat => {
        const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length;
        return `
            <li>
                <button class="${activeCategory === cat ? 'active' : ''}" onclick="setCategory('${cat}')">
                    ${cat}
                    <span class="filter-count">${count}</span>
                </button>
            </li>
        `;
    }).join('');
}

function renderBasket() {
    // Update counts
    basketCountEls.forEach(el => {
        if (el.classList.contains('basket-header-count')) {
            el.textContent = inquiryBasket.length + ' items';
        } else {
            el.textContent = inquiryBasket.length;
            el.classList.toggle('empty', inquiryBasket.length === 0);
        }
    });

    // Update navbar cart count (desktop + mobile)
    document.querySelectorAll('#topbarCount, #topbarCountMobile').forEach(el => {
        el.textContent = inquiryBasket.length;
        el.classList.toggle('hide', inquiryBasket.length === 0);
    });

    // Bounce animation on cart (all visible cart buttons)
    document.querySelectorAll('.nav-cart').forEach(navCart => {
        if (inquiryBasket.length > 0) {
            navCart.classList.remove('bounce');
            void navCart.offsetWidth;
            navCart.classList.add('bounce');
        }
    });

    // Render items
    if (inquiryBasket.length === 0) {
        basketBody.innerHTML = `
            <div class="basket-empty">
                <i class="fas fa-clipboard-list"></i>
                <p>Your inquiry list is empty.<br>Browse products and add them here.</p>
            </div>
        `;
        return;
    }

    basketBody.innerHTML = inquiryBasket.map(item => `
        <div class="basket-item" data-id="${item.id}">
            <div class="basket-item-icon">
                <i class="fas ${item.icon || 'fa-pills'}"></i>
            </div>
            <div class="basket-item-info">
                <h4>${item.name}</h4>
                <p>${item.composition}</p>
            </div>
            <button class="basket-item-remove" onclick="removeFromBasket(${item.id})" title="Remove">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// ===== ACTIONS =====

function toggleInquiry(productId) {
    const exists = inquiryBasket.some(item => item.id === productId);

    if (exists) {
        inquiryBasket = inquiryBasket.filter(item => item.id !== productId);
    } else {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            inquiryBasket.push({ ...product });
        }
    }

    saveBasket();
    renderProducts();
    renderBasket();
}

function removeFromBasket(productId) {
    inquiryBasket = inquiryBasket.filter(item => item.id !== productId);
    saveBasket();
    renderProducts();
    renderBasket();
}

function clearBasket() {
    inquiryBasket = [];
    saveBasket();
    renderProducts();
    renderBasket();
}

function saveBasket() {
    localStorage.setItem('sapline_inquiry', JSON.stringify(inquiryBasket));
}

function setCategory(cat) {
    activeCategory = cat;
    renderCategories();
    renderProducts();
}

function setFormFilter(form, btn) {
    activeForm = form;
    document.querySelectorAll('.form-tag').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
}

function resetFilters() {
    activeCategory = 'All';
    activeForm = 'All';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.form-tag').forEach(t => t.classList.remove('active'));
    document.querySelector('.form-tag[data-form="All"]')?.classList.add('active');
    renderCategories();
    renderProducts();
}

// ===== BASKET PANEL =====
function openBasket() {
    basketPanel.classList.add('open');
    basketOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeBasket() {
    basketPanel.classList.remove('open');
    basketOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== INQUIRY MODAL =====
function openInquiryModal() {
    closeBasket();

    // Populate product list
    const summaryList = document.getElementById('inquirySummaryList');
    if (summaryList) {
        summaryList.innerHTML = inquiryBasket.map(item =>
            `<li><i class="fas fa-check-circle"></i> ${item.name} — ${item.composition}</li>`
        ).join('');
    }

    setTimeout(() => {
        inquiryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }, 300);
}

function closeInquiryModal() {
    inquiryModal.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== SUCCESS MODAL =====
function showSuccess() {
    closeInquiryModal();
    setTimeout(() => {
        successModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }, 300);
}

function closeSuccess() {
    successModal.classList.remove('open');
    document.body.style.overflow = '';
    clearBasket();
}

// ===== QUICK VIEW =====
function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const inBasket = inquiryBasket.some(item => item.id === productId);

    document.getElementById('qvCategory').textContent = product.category;
    document.getElementById('qvName').textContent = product.name;
    const qvImageEl = document.querySelector('.quickview-image');
    if (product.image) {
        qvImageEl.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;">`;
    } else {
        qvImageEl.innerHTML = `<i class="fas ${product.icon}" id="qvIcon"></i>`;
    }
    document.getElementById('qvComposition').textContent = product.composition;
    document.getElementById('qvForm').textContent = product.form;
    document.getElementById('qvPackaging').textContent = product.packaging;
    document.getElementById('qvCategory2').textContent = product.category;

    const qvBtn = document.getElementById('qvInquiryBtn');
    qvBtn.className = `btn-inquiry ${inBasket ? 'added' : ''}`;
    qvBtn.innerHTML = `<i class="fas ${inBasket ? 'fa-check' : 'fa-plus'}"></i> ${inBasket ? 'Added to Inquiry' : 'Add to Inquiry'}`;
    qvBtn.onclick = () => {
        toggleInquiry(productId);
        const nowInBasket = inquiryBasket.some(item => item.id === productId);
        qvBtn.className = `btn-inquiry ${nowInBasket ? 'added' : ''}`;
        qvBtn.innerHTML = `<i class="fas ${nowInBasket ? 'fa-check' : 'fa-plus'}"></i> ${nowInBasket ? 'Added to Inquiry' : 'Add to Inquiry'}`;
    };

    quickviewOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    quickviewOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== VIEW TOGGLE =====
function setView(mode, btn) {
    viewMode = mode;
    catalogGrid.classList.toggle('list-view', mode === 'list');
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// ===== SORT =====
function setSort(value) {
    sortBy = value;
    renderProducts();
}

// ===== FORM SUBMISSION =====
function handleInquirySubmit(e) {
    e.preventDefault();

    const form = document.getElementById('inquiryForm');
    const btn = form.querySelector('.btn-send-inquiry');
    const originalText = btn.innerHTML;

    // Build product list and set hidden field
    const productList = inquiryBasket.map(item => `${item.name} (${item.composition})`).join(', ');
    document.getElementById('inqProductsHidden').value = productList;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            form.reset();
            closeInquiryModal();
            clearBasket();
            showSuccess();
        } else {
            btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try again.';
            btn.style.background = '#e74c3c';
        }
    }).catch(() => {
        btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try again.';
        btn.style.background = '#e74c3c';
    }).finally(() => {
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}

// ===== SEARCH DEBOUNCE =====
let searchTimeout;
function handleSearch(value) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchQuery = value;
        renderProducts();
    }, 300);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();
    renderBasket();

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    }

    // Close overlays on click outside
    if (basketOverlay) basketOverlay.addEventListener('click', closeBasket);
    if (quickviewOverlay) quickviewOverlay.addEventListener('click', (e) => {
        if (e.target === quickviewOverlay) closeQuickView();
    });
    if (inquiryModal) inquiryModal.addEventListener('click', (e) => {
        if (e.target === inquiryModal) closeInquiryModal();
    });
    if (successModal) successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccess();
    });

    // Inquiry form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', handleInquirySubmit);
    }

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => setSort(e.target.value));
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBasket();
            closeQuickView();
            closeInquiryModal();
            closeSuccess();
        }
    });

});
