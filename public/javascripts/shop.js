const product_card = document.querySelector('.product-card');
const product_grid = document.querySelector('.product-grid');

async function fetchProducts() {
    const response = await fetch('/scratch/product');  // Fetch data from /products route
    const products = await response.json();     // Parse the response as JSON
    console.log(products);
    displayProducts(products);

}

function displayProducts(products) {
    const productContainer = document.querySelector('.product-container'); // Parent container for all products
    productContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        // Create a new div element for each product card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card'); // Add the product card class


        let base64Image = '';

        if (product.image && product.image.data) {
            // Assuming product.image.data is an array of byte values (Buffer-like data)
            const byteArray = new Uint8Array(product.image.data);
            const blob = new Blob([byteArray], { type: 'image/jpeg' }); // You can change 'image/jpeg' depending on the image type
            const imageUrl = URL.createObjectURL(blob); // Create object URL for the image
            base64Image = imageUrl;
        }

        productCard.innerHTML = `
            <div class="product-img">
                <img src="${base64Image}" alt="${product.name}" id="img">
            </div>
            <div class="product-dtl">
                <div class="product-info">
                    <p id="p1">${product.name}</p>
                    <p id="p2">${product.price}</p>
                    <p id="p3">-₹${product.discount || 0}</p> 
                </div>
                <div class="btn"> 
                    <a href='/scratch/addtocart/${product._id}' class="increment">+</a>
                </div>
                </div>
        `;
        productContainer.appendChild(productCard);

    });

}

fetchProducts();
