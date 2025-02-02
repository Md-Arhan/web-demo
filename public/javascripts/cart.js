async function fetchProducts() {
    const response = await fetch('/scratch/cart_data');  // Fetch data from /products route
    const products = await response.json();     // Parse the response as JSON
    console.log(products);
    displayProducts(products);

}

function displayProducts(products) {
    const productContainer = document.querySelector('.container'); // Parent container for all products
    productContainer.innerHTML = ''; // Clear existing content

    
    products.forEach(product => {
        // Create a new div element for each product card
        const product_details = document.createElement('div');
        product_details.classList.add('product-details'); // Add the product card class

        let base64Image = '';

        if (product.image && product.image.data) {
            // Assuming product.image.data is an array of byte values (Buffer-like data)
            const byteArray = new Uint8Array(product.image.data);
            const blob = new Blob([byteArray], { type: 'image/jpeg' }); // You can change 'image/jpeg' depending on the image type
            const imageUrl = URL.createObjectURL(blob); // Create object URL for the image
            base64Image = imageUrl;
        }

        product_details.innerHTML = `
        <div class='product-img'>
          <div class='image'>
           <img src="${base64Image}" alt="${product.name}">
          </div>
          <div class='product-inc-dec'>
            <h3>${product.name}</h3>
            <div class='btn'>
              <button class='decrement'>-</button>
              <span class='quantity'>1</span>
              <button class='increment'>+</button>
            </div>
          </div>
          <div class='net-worth'>
             <h5>Net worth</h5>
             <h3>₹${product.price}</h3>
           </div>
        </div>

       <div class='price-breakdown'>
         <h3>Price Breakdown</h3>
         <div class='cart-total'>
           <div class='mrp'>
            <h4>Total MRP</h4>
            <h4>₹${product.price}</h4>
           </div>
           <div class='dis-mrp'>
            <h4>Discount on MRP</h4>
            <h4>₹${product.discount||0}</h4>
           </div>
           <div class='fee'>
            <h4>Platform Fee</h4>
            <h4>₹20</h4>
           </div>
           <div class='shipping'>
            <h4>Shipping Fee</h4>
            <h4>FREE</h4>
           </div>
         </div>
         <div class='total'>
          <h4>Total Amount</h4>
          <h4>₹${product.price-product.discount+20}</h4>
         </div>
         <a class='buy-now' href=''>Buy now</a>
       </div>
       `
        productContainer.appendChild(product_details);

        
        const decrementButton = product_details.querySelector('.decrement');
        const incrementButton = product_details.querySelector('.increment');
        const quantityDisplay = product_details.querySelector('.quantity');

        let quantity = 0; // Initialize quantity

        decrementButton.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--; // Decrease quantity
                quantityDisplay.textContent = quantity; // Update displayed quantity
            }
        });

        incrementButton.addEventListener('click', () => {
            quantity++; // Increase quantity
            quantityDisplay.textContent = quantity; // Update displayed quantity
        });

    });

}

fetchProducts();
