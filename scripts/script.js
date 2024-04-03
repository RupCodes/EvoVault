function load() {
  var currentPage = window.location.href.split('/')[3];
  let body = document.getElementsByTagName('body')[0];

  // Check Preferred Color Scheme (Light mode: work in progress)
  // detectColorScheme(body);

  // Check if its Product Page 
  if(currentPage.startsWith('products')) {

  // Fetch Shoes
  fetchShoes();
  };
}
/**
 * Fetches Shoes from JSON
 * 
 */

async function fetchShoes() {
  fetch('../products.json').then(result => { return result.json();}).then(data => createProducts(data));

}


/**
 * Adds Shoe Product Cards
 */
function createProducts(data) {
  let productSection = document.getElementById('productSection');

  // Action on each element
  data.forEach((el, i) => {
    let count = i + 1;
    let card = document.createElement('div');

    let img = document.createElement('img');
  
    let detailRow = document.createElement('div');
    let name = document.createElement('p');
    let price = document.createElement('p');
  
    let btn = document.createElement('button');
  
    // Add Classes
    card.className = 'productCard';
    detailRow.className = 'topDiv';

    // Add Animation Delay
    card.style.animationDelay = `${count * 200}ms`;

    // Image Source
    img.src = `../assets/shoes/${el.image}`;
 
    // Details
    name.innerText = el.name; 
    price.innerText = `$${el.price}`;

    btn.innerText = 'Buy Now'

    btn.id = `evoshoe-${count}`

    // Append Children
    card.appendChild(img)
    
    detailRow.appendChild(name);
    detailRow.appendChild(price);

    card.appendChild(detailRow);

    card.appendChild(btn);

    productSection.appendChild(card);
  });
}


/**
 * Automatically Detects and Sets the user preferred color scheme
 * 
 * @param body Document Body
 */
function detectColorScheme(body) {
    if (window.matchMedia) {
        // Check if the dark-mode Media-Query matches
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
          // Prefers Dark Mode
          body.classList.remove("lightMode"); // default mode
          body.classList.add("darkMode");
        }
      }
}


// Run Load Function on Content Load
document.addEventListener("DOMContentLoaded", load)
