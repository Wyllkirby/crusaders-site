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
