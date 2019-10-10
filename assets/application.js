var menuToggle = document.querySelector('.body');

var menuButtons = document.querySelectorAll('.js-toggle-menu');
for (var i = 0; i < menuButtons.length; i++) {
  menuButtons[i].addEventListener('click', function() {
    if (menuToggle.classList.contains('open-menu')) {
      menuToggle.classList.remove('open-menu');
    } else {
      menuToggle.classList.add('open-menu');
    }
  });
}

var advancedFilterButtons = document.querySelectorAll('.js-toggle-advanced-filter');
for (var i = 0; i < advancedFilterButtons.length; i++) {
  advancedFilterButtons[i].addEventListener('click', function() {
    if (menuToggle.classList.contains('open-advanced-filter')) {
      menuToggle.classList.remove('open-advanced-filter');
    } else {
      menuToggle.classList.add('open-advanced-filter');
    }
  });
}

var cartButtons = document.querySelectorAll('.js-toggle-cart-overlay');
for (var i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener('click', function() {
    if (menuToggle.classList.contains('open-cart')) {
      menuToggle.classList.remove('open-cart');
    } else {
      menuToggle.classList.add('open-cart');
    }
  });
}
