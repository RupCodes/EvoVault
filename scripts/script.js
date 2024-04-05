function load() {
  var currentPage = window.location.href.split('/')[3];
  let body = document.getElementsByTagName('body')[0];

  // Check Preferred Color Scheme (Light mode: work in progress)
  // detectColorScheme(body);

  // Toggle Hamburger Menu
  document.getElementById('hamburgerBtn').addEventListener('click', toggleHamburger);

  // Check if its Product Page 
  if(currentPage.startsWith('products')) {

  // Fetch Shoes
  fetchShoes();
  };

  // Check if Its Contact Page
  if(currentPage.startsWith('contact')) {
    // Listener for Submit Button
    document.getElementById("contactForm").addEventListener("submit", validateForm);

    document.getElementById("contactForm").addEventListener("reset", clearErrors);
    };
}

/**
 * Toggles Hamburger Menu
 */
function toggleHamburger() {
  let links = document.getElementById('hamburgerLinks');
  
  links.classList.toggle('showLinks')
  }

/** 
 * Checks Form Errors
 */
function validateForm(e) {
let hasError = false;

    // Clear Errors
    clearErrors()

  let contactForm = document.getElementById('contactForm');
  let fields = ['name', 'email', 'phone', 'subject', 'message'];

  fields.forEach(fieldKey => {
  let field = document.getElementById(`contactForm-${fieldKey}`);

    if(!fieldHasInput(field)) {
      let error = document.createElement('p');

      error.innerHTML = 'Required Field*';

      contactForm.insertBefore(error, field.nextSibling); // nextSibling: Gets the next child after current one

      if(!hasError) {
        field.focus();
        field.select();
        hasError = true;
      }
    }

    if(((fieldKey == 'phone') && fieldHasInput(field))) {
      let phoneNumRegex = new RegExp(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g);

      if(!phoneNumRegex.test(field.value)) {

        let error = document.createElement('p');

        error.innerHTML = 'Invalid Phone Number*';
  
        contactForm.insertBefore(error, field.nextSibling); // nextSibling: Gets the next child after current one
  
        if(!hasError) {
          field.focus();
          field.select();
          hasError = true;
        }

      }
    }

    if((fieldKey == 'email') && fieldHasInput(field)) {
      let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

      if(!emailRegex.test(field.value)) {

        let error = document.createElement('p').className;

        error.innerHTML = 'Invalid Email*';
  
        contactForm.insertBefore(error, field.nextSibling); // nextSibling: Gets the next child after current one
  
        if(!hasError) {
          field.focus();
          field.select();
          hasError = true;
        }

      }
    }

  })

  if(hasError) {
    e.preventDefault();
  }

  return (!hasError);
}

/** Clear Errors */

function clearErrors() {
  let contactForm = document.getElementById('contactForm');
  let pTags = contactForm.querySelectorAll('p');
  
  pTags.forEach(pTag => pTag.remove());
}


/**
 * Checks Field Input
 */
function fieldHasInput(field) {
	if (field.value == null || field.value.trim() == "") {
		return false;
	}

	return true;
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
