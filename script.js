// Navigation logic
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const target = this.getAttribute('href').substring(1);
        sections.forEach(section => {
            if (section.id === target) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// View Menu button functionality
document.getElementById('view-menu-btn').addEventListener('click', function() {
    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show menu section
    document.getElementById('menu').style.display = 'block';
    
    // Update navigation active state
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('a[href="#menu"]').classList.add('active');
});

// Cart logic
let cart = [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.hotel} - ${item.name} x${item.qty} - ₹${item.price * item.qty}`;
        cartItems.appendChild(li);
        total += item.price * item.qty;
    });
    cartTotal.textContent = cart.length ? `Total: ₹${total}` : '';
}

document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
        // Get item details from data attributes
        const hotel = btn.getAttribute('data-hotel');
        const itemName = btn.getAttribute('data-item');
        const price = parseInt(btn.getAttribute('data-price'));
        
        // Get the quantity from the input field
        const qtyInput = btn.parentElement.querySelector('.item-qty');
        let qty = parseInt(qtyInput.value, 10);
        if (isNaN(qty) || qty < 1) qty = 1;
        
        // Create unique item identifier
        const itemId = `${hotel}-${itemName}`;
        
        const found = cart.find(i => i.id === itemId);
        if (found) {
            found.qty += qty;
        } else {
            cart.push({ 
                id: itemId,
                hotel: hotel,
                name: itemName, 
                price: price, 
                qty: qty 
            });
        }
        alert(`${itemName} x${qty} from ${hotel} added to cart!`);
        updateCart();
    });
});

// Buy button functionality
const buyBtn = document.getElementById('buy-btn');
const deliveryAnim = document.getElementById('delivery-animation');
if (buyBtn) {
    buyBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            // Show fun empty cart message with bouncing burger
            const emptyCartMessage = `🛒 "Your cart is empty… but your stomach isn't!" 🍔`;
            alert(emptyCartMessage);
            return;
        }
        // Show delivery animation
        if (deliveryAnim) {
            deliveryAnim.style.display = 'flex';
            // Reset animation
            const bike = deliveryAnim.querySelector('.delivery-bike-container');
            bike.style.animation = 'none';
            // Force reflow
            void bike.offsetWidth;
            bike.style.animation = '';
            setTimeout(() => {
                deliveryAnim.style.display = 'none';
            }, 2500);
        }
        cart = [];
        updateCart();
    });
}

// On page load, show only login (or signup if chosen)
document.getElementById('navbar').style.display = 'none';
document.getElementById('main-content').style.display = 'none';
document.getElementById('login').style.display = 'block';
document.getElementById('signup').style.display = 'none';

// Switch to signup form
const showSignup = document.getElementById('show-signup');
if (showSignup) {
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login').style.display = 'none';
        document.getElementById('signup').style.display = 'block';
    });
}
// Switch to login form
const showLogin = document.getElementById('show-login');
if (showLogin) {
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signup').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    });
}

// Profile dropdown logic
const profileBtn = document.getElementById('profile-btn');
const profileDropdown = document.getElementById('profile-dropdown');
const profileGreeting = document.getElementById('profile-greeting');
const profileUsername = document.getElementById('profile-username');
const profileLoginBtn = document.getElementById('profile-login-btn');
const profileSignupBtn = document.getElementById('profile-signup-btn');
const profileLogoutBtn = document.getElementById('profile-logout-btn');

let currentUser = null;

function updateProfileDropdown() {
    if (currentUser) {
        profileUsername.textContent = currentUser;
        profileLoginBtn.style.display = 'none';
        profileSignupBtn.style.display = 'none';
        profileLogoutBtn.style.display = 'block';
    } else {
        profileUsername.textContent = 'Guest';
        profileLoginBtn.style.display = 'block';
        profileSignupBtn.style.display = 'block';
        profileLogoutBtn.style.display = 'none';
    }
}

if (profileBtn) {
    profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (profileDropdown.style.display === 'none' || profileDropdown.style.display === '') {
            profileDropdown.style.display = 'flex';
        } else {
            profileDropdown.style.display = 'none';
        }
    });
}
document.addEventListener('click', function(e) {
    if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileBtn) {
        profileDropdown.style.display = 'none';
    }
});
if (profileLoginBtn) {
    profileLoginBtn.addEventListener('click', function() {
        profileDropdown.style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('signup').style.display = 'none';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('navbar').style.display = 'none';
    });
}
if (profileSignupBtn) {
    profileSignupBtn.addEventListener('click', function() {
        profileDropdown.style.display = 'none';
        document.getElementById('signup').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('navbar').style.display = 'none';
    });
}
if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener('click', function() {
        currentUser = null;
        updateProfileDropdown();
        profileDropdown.style.display = 'none';
    });
}

// After login/signup, show main content and navbar
function showMainContent() {
    document.getElementById('navbar').style.display = 'flex';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    // Show home section by default
    sections.forEach(section => {
        if (section.id !== 'home') section.style.display = 'none';
        else section.style.display = 'block';
    });
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('a[href="#home"]').classList.add('active');
    updateProfileDropdown();
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.querySelector('input[type="text"]').value || 'User';
    currentUser = username;
    alert('Logged in! (Demo only)');
    showMainContent();
});
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.querySelector('input[type="text"]').value || 'User';
    currentUser = username;
    alert('Signed up! (Demo only)');
    showMainContent();
}); 

// Add search functionality for menu
const menuSearch = document.getElementById('menu-search');
if (menuSearch) {
    menuSearch.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        
        document.querySelectorAll('#menu .menu-item').forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            const desc = item.querySelector('p').textContent.toLowerCase();
            const itemSection = item.closest('.hotel-section');
            const itemCategory = itemSection.getAttribute('data-category');
            
            // Only search within the active category (or all categories if 'all' is selected)
            const isInActiveCategory = activeCategory === 'all' || itemCategory === activeCategory;
            
            if (isInActiveCategory && (name.includes(searchText) || desc.includes(searchText))) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Category filtering functionality
const categoryBtns = document.querySelectorAll('.category-btn');
const hotelSections = document.querySelectorAll('.hotel-section');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const selectedCategory = this.getAttribute('data-category');
        
        // Show/hide hotel sections based on category
        hotelSections.forEach(section => {
            if (selectedCategory === 'all') {
                section.classList.remove('hidden');
            } else {
                const sectionCategory = section.getAttribute('data-category');
                if (sectionCategory === selectedCategory) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            }
        });
        
        // Clear search when category changes
        if (menuSearch) {
            menuSearch.value = '';
            // Show all items in the selected category
            document.querySelectorAll('#menu .menu-item').forEach(item => {
                item.style.display = '';
            });
        }
    });
});

// Offer to cart mapping
const offerToCartMap = {
    'Pizza Mania': {
        hotel: 'Pizza Palace',
        name: 'Margherita Pizza',
        price: 199,
        discountedPrice: 99 // 50% OFF
    },
    'Burger Bonanza': {
        hotel: 'Burger House',
        name: 'Vegetable Burger',
        price: 149,
        discountedPrice: 149 // Free delivery, price unchanged
    },
    'Indian Feast': {
        hotel: 'Indian Spice',
        name: 'Butter paneer',
        price: 249,
        discountedPrice: 174 // 30% OFF
    },
    'Combo Delight': {
        hotel: 'Combo Meals',
        name: 'Pizza Combo',
        price: 449,
        discountedPrice: 337 // 25% OFF
    },
    'Sweet Treats': {
        hotel: 'Dessert Corner',
        name: 'Chocolate Cake',
        price: 120,
        discountedPrice: 80 // 33% OFF
    },
    'Thirst Quenchers': {
        hotel: 'Beverage Station',
        name: 'Fresh Lime Soda',
        price: 40,
        discountedPrice: 24 // 40% OFF
    }
};

// Claim Offer button functionality
const claimOfferBtns = document.querySelectorAll('.claim-offer');
claimOfferBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const offerTitle = btn.parentElement.querySelector('h3').textContent.trim();
        const offerKey = offerTitle.replace(/^[^A-Za-z]+/, ''); // Remove emoji if present
        const offer = offerToCartMap[offerKey];
        if (offer) {
            // Create unique item identifier
            const itemId = `${offer.hotel}-${offer.name}`;
            const found = cart.find(i => i.id === itemId);
            if (found) {
                found.qty += 1;
            } else {
                cart.push({
                    id: itemId,
                    hotel: offer.hotel,
                    name: offer.name,
                    price: offer.discountedPrice || offer.price,
                    qty: 1
                });
            }
            if (offer.discountedPrice && offer.discountedPrice !== offer.price) {
                alert(`${offer.name} from ${offer.hotel} added to cart!\nOriginal: ₹${offer.price} | Offer Price: ₹${offer.discountedPrice}`);
            } else {
                alert(`${offer.name} from ${offer.hotel} added to cart!`);
            }
            updateCart();
        }
    });
});

// On page load, update profile dropdown
updateProfileDropdown(); 