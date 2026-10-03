let cart = [];
let currentCategory = "All";

function toggleMenu(btn) {
    btn.classList.toggle('active');
    document.getElementById('mobileNav').classList.toggle('show');
}

function closeMobileMenu() {
    document.querySelector('.hamburger').classList.remove('active');
    document.getElementById('mobileNav').classList.remove('show');
}

function addItem(button, name, price) {
    let card = button.closest('.card');

    let item = cart.find(x => x.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateDisplay();
    toast(name + " added to cart!");
}

function removeItem(button) {
    let card = button.closest('.card');
    let name = card.querySelector('h3').textContent;
    let currentQty = parseInt(card.querySelector('.qty').textContent);

    if (currentQty > 0) {
        let item = cart.find(x => x.name === name);
        if (item) {
            item.qty--;
            if (item.qty === 0) {
                cart = cart.filter(x => x.name !== name);
            }
        }
    }

    updateDisplay();
}

function updateDisplay() {
    let subtotal = 0;
    let count = 0;

    // Update card quantities
    document.querySelectorAll('.card').forEach(card => {
        let name = card.querySelector('h3').textContent;
        let item = cart.find(x => x.name === name);
        let qty = card.querySelector('.qty');
        qty.textContent = item ? item.qty : 0;
    });

    // Calculate totals
    cart.forEach(item => {
        subtotal += item.price * item.qty;
        count += item.qty;
    });

    document.getElementById('cartCount').textContent = count;
    document.getElementById('subtotal').textContent = '₦' + subtotal.toLocaleString();
    document.getElementById('total').textContent = '₦' + (subtotal ? subtotal + 500 : 0).toLocaleString();

    // Update cart list
    let cartList = document.getElementById('cartList');

    if (!cart.length) {
        cartList.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div style="background:linear-gradient(135deg, #ffb88c 0%, #ff9966 100%);width:50px;height:45px;border-radius:8px;"></div>
        <div>
          <h4>${item.name}</h4>
          <p>₦${item.price.toLocaleString()} × ${item.qty}</p>
        </div>
        <button class="remove" onclick="removeFromCart('${item.name}')">×</button>
      </div>
    `).join('');
    }
}

function removeFromCart(name) {
    cart = cart.filter(x => x.name !== name);
    updateDisplay();
}

function filterFood(category, button) {
    currentCategory = category;

    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.card').forEach(card => {
        if (category === 'All' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchFood() {
    let search = document.getElementById('search').value.toLowerCase();

    document.querySelectorAll('.card').forEach(card => {
        let name = card.dataset.name.toLowerCase();
        if (name.includes(search) && (currentCategory === 'All' || card.dataset.category === currentCategory)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function toast(message) {
    let box = document.getElementById('toast');
    box.textContent = message;
    box.classList.add('show');

    setTimeout(() => box.classList.remove('show'), 2000);
}

function openModal() {
    document.getElementById('modal').classList.add('show');
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function checkout() {
    if (!cart.length) {
        toast('Your cart is empty');
        return;
    }

    let modal = document.getElementById('modal');
    let box = modal.querySelector('.modal-box');

    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) + 500;

    box.innerHTML = `
    <button class="close" onclick="closeCheckout()">×</button>
    <div style="font-size:50px;margin-bottom:20px;">✓</div>
    <h2>Order Successful!</h2>
    <p style="margin:20px 0;">
      Your order has been confirmed.<br>
      <strong style="color:var(--red);font-size:20px;">Total: ₦${total.toLocaleString()}</strong><br><br>
      Your delicious meal will arrive fresh and hot!
    </p>
    <button class="order-btn" onclick="closeCheckout()">Done</button>
  `;

    modal.classList.add('show');

    setTimeout(() => {
        cart = [];
        updateDisplay();
    }, 1500);
}

function closeCheckout() {
    document.getElementById('modal').classList.remove('show');

    let box = document.querySelector('.modal-box');
    box.innerHTML = `
    <button class="close" onclick="closeModal()">×</button>
    <h2>Ready to Order?</h2>
    <p>
      Browse our delicious Nigerian menu and add your favorite meals to your cart.
      Fast delivery, fresh food, guaranteed satisfaction!
    </p>
    <button class="order-btn" onclick="closeModal();scrollMenu()">
      View Menu
    </button>
  `;
}

function scrollMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function goCart() {
    document.getElementById('cartBox').scrollIntoView({ behavior: 'smooth' });
}

updateDisplay();
