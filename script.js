function updateCartDisplay() {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      document.getElementById("cart-count").textContent = cartItems.length;
    }

    updateCartDisplay();
    const mainImage = document.querySelector(".main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
        thumbnails.forEach(t => t.classList.remove("selected"));
        thumb.classList.add("selected");
      });
    });
    const sizeButtons = document.querySelectorAll(".sizes button");
    let selectedSize = null;

    sizeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        sizeButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSize = btn.textContent;
      });
    });
    const addToCartBtn = document.querySelector(".add-cart");
    const productTitle = document.querySelector(".product-title").textContent;
    const productPrice = document.querySelector(".product-price").dataset.price;
    const productImage = document.querySelector(".main-image").src;

    addToCartBtn.addEventListener("click", () => {
      if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
      }

      const newItem = {
        title: productTitle,
        size: selectedSize,
        price: parseFloat(productPrice),
        image: productImage
      };

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay();
      alert("Added to cart!");
    });
    document.querySelector(".buy-now").addEventListener("click", () => {
      if (!selectedSize) {
        alert("Please select a size before buying.");
        return;
      }
      alert(`Buying 1 x ${productTitle} (Size: ${selectedSize})`);
    });
/* script cart*/
        function loadCart() {
            const cartContainer = document.getElementById('cart-container');
            const rawItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            const grouped = {};
            rawItems.forEach(item => {
                const key = item.title + "_" + item.size;
                if (!grouped[key]) {
                    grouped[key] = { ...item, qty: 1 };
                } else {
                    grouped[key].qty++;
                }
            });

            const items = Object.values(grouped);

            if (items.length === 0) {
                cartContainer.innerHTML = `<div class="empty-cart">Your cart is currently empty.</div>`;
                return;
            }

            let total = 0;
            cartContainer.innerHTML = "";

            items.forEach((item, index) => {
                total += item.qty * item.price;

                const itemEl = document.createElement("div");
                itemEl.className = "cart-item";
                itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <div class="item-details">
            <p><strong>${item.title}</strong></p>
            <p>Size: ${item.size}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Qty: ${item.qty}</p>
          </div>
          <div class="item-actions">
            <button onclick="removeItem('${item.title}', '${item.size}')">🗑️ Delete</button>
          </div>
        `;
                cartContainer.appendChild(itemEl);
            });

            const totalEl = document.createElement("div");
            totalEl.className = "total";
            totalEl.textContent = `Total: $${total.toFixed(2)}`;
            cartContainer.appendChild(totalEl);
        }

        function removeItem(title, size) {
            const rawItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            const newItems = [];

            let removed = false;
            for (let i = 0; i < rawItems.length; i++) {
                if (rawItems[i].title === title && rawItems[i].size === size && !removed) {
                    removed = true;
                } else {
                    newItems.push(rawItems[i]);
                }
            }

            localStorage.setItem("cartItems", JSON.stringify(newItems));
            updateCartCount();
            loadCart();
        }

        function updateCartCount() {
            const newCount = JSON.parse(localStorage.getItem("cartItems"))?.length || 0;
            const countElement = document.getElementById("cart-count");
            if (countElement) {
                countElement.textContent = newCount;
            }
        }

        loadCart();
