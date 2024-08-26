document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchBox = document.getElementById('search-box');
    const products = document.querySelectorAll('.product .box');

    searchBox.addEventListener('input', function() {
        const searchText = searchBox.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchText)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Cart and Wishlist Arrays
    const cart = [];
    const wishlist = [];

    // Add to cart and wishlist functionality for product boxes
    const cartButtons = document.querySelectorAll('.btn');
    const heartIcons = document.querySelectorAll('.fa-heart');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productBox = button.closest('.box');
            const productName = productBox.querySelector('h3').textContent;
            const productPrice = parseFloat(productBox.querySelector('.price').textContent.replace('Rs.', ''));
            const productQuantity = parseInt(productBox.querySelector('input[type="number"]').value);
            const existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += productQuantity;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: productQuantity
                });
            }

            alert(`${productName} added to cart!`);
        });
    });

    heartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const productBox = icon.closest('.box');
            const productName = productBox.querySelector('h3').textContent;

            // Toggle wishlist functionality
            icon.classList.toggle('active');
            if (icon.classList.contains('active')) {
                icon.style.color = 'red';
                wishlist.push(productName);
            } else {
                icon.style.color = 'black';
                const index = wishlist.indexOf(productName);
                if (index > -1) {
                    wishlist.splice(index, 1);
                }
            }
        });
    });

    // Navbar cart icon functionality
    const cartIcon = document.querySelector('.fa-shopping-cart');
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Your cart is empty.');
        } else {
            let cartDetails = '';
            let subtotal = 0;

            cart.forEach(item => {
                cartDetails += `${item.name} - Quantity: ${item.quantity}, Price: Rs.${item.price * item.quantity}\n`;
                subtotal += item.price * item.quantity;
            });

            cartDetails += `\nSubtotal: Rs.${subtotal}`;
            alert(`Cart:\n${cartDetails}`);
        }
    });

    // Navbar wishlist icon functionality
    const wishlistIcon = document.querySelector('.fa-heart');
    wishlistIcon.addEventListener('click', function(e) {
        e.preventDefault();
        if (wishlist.length === 0) {
            alert('Your wishlist is empty.');
        } else {
            alert(`Wishlist:\n${wishlist.join('\n')}`);
        }
    });

    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.category .box .btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = button.closest('.box').querySelector('h3').textContent.toLowerCase();
            products.forEach(product => {
                const productCategory = product.querySelector('h3').textContent.toLowerCase();
                if (
                    (categoryName === 'vegetables' && productCategory.includes('carrot') || productCategory.includes('tomatoes')) ||
                    (categoryName === 'vegetables' && productCategory.includes('broccoli') || productCategory.includes('tomatoes')) ||
                    (categoryName === 'vegetables' && productCategory.includes('potatoes') || productCategory.includes('tomatoes')) ||
                    (categoryName === 'juices' && productCategory.includes('juice')) ||
                    (categoryName === 'fruits' && (productCategory.includes('mangoes') || productCategory.includes('banana') ||productCategory.includes('oranges')))
                ) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});
