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

if (document.querySelector('.shop__list__item') !== null) {
  var shopPreviewImgs = document.querySelectorAll('.shop__list__item__visual');
  var shopListItem = document.querySelector('.shop__list__item');
  window.addEventListener("resize", function(){
    shopListItemWidth = shopListItem.offsetHeight;
    for (var i = 0; i < shopPreviewImgs.length; i++) {
      shopPreviewImgs[i].style.height = shopListItemWidth;
    }
  });
}

//gallery
if (document.querySelector('.show') !== null) {
  var sliderItems = document.querySelectorAll('.shop-item__gallery__item');
  var sliderProjection = document.getElementById('slider-projection');
  for (var i = 0; i < sliderItems.length; i++) {
    sliderItems[i].addEventListener('click', function() {
      if (this.classList.contains('is-being-displayed')) {

      } else {
        for (var i = 0; i < sliderItems.length; i++) {
          sliderItems[i].classList.remove('is-being-displayed');
        }
        this.classList.add('is-being-displayed');
        sliderProjection.src = this.querySelector('.shop-item__gallery__item__visual__img').src;
        var img = this.querySelector('.shop-item__gallery__item__visual__img');

        displayedItem = document.querySelector('li.shop-item__gallery__item.is-being-displayed');
        currentLocation = sliderItemsArray.indexOf(displayedItem) + 1;
        paginationElementCurrent.innerHTML = currentLocation;

        var previousItem = displayedItem.previousElementSibling;
        var nextItem = displayedItem.nextElementSibling;

        for (var i = 0; i < galleryBtns.length; i++) {
          galleryBtns[i].classList.remove('is-hidden');
        }

        if ( nextItem == null ) {
          btnNext.classList.add('is-hidden');
        }

        if (previousItem == null) {
          btnPrevious.classList.add('is-hidden');
        }
      }
    });
  }

  var galleryBtns = document.querySelectorAll('.shop-item__gallery-controls__btn');
  var btnPrevious = document.getElementById('gallery__btn-previous');
  var btnNext = document.getElementById('gallery__btn-next');

  var displayedItem = document.querySelector('li.shop-item__gallery__item.is-being-displayed');
  var sliderItemsArray = Array.prototype.slice.call(sliderItems);
  var currentLocation = sliderItemsArray.indexOf(displayedItem) + 1;
  var totalItems = sliderItems.length;
  var paginationElementTotal = document.getElementById('gallery__pagination__total');
  var paginationElementCurrent = document.getElementById('gallery__pagination__current');

  paginationElementCurrent.innerHTML = currentLocation;
  paginationElementTotal.innerHTML = totalItems;

  for (var i = 0; i < galleryBtns.length; i++) {

    galleryBtns[i].addEventListener('click', function() {

      var displayedItem = document.querySelector('li.shop-item__gallery__item.is-being-displayed');

      if (this == btnPrevious) {

        var previousItem = displayedItem.previousElementSibling;

        displayedItem.classList.remove('is-being-displayed');
        previousItem.classList.add('is-being-displayed');

        sliderProjection.src = previousItem.querySelector('.shop-item__gallery__item__visual__img').src;

        if (previousItem.previousElementSibling == null) {
          btnPrevious.classList.add('is-hidden');
        }

        if (btnNext.classList.contains('is-hidden')) {
          btnNext.classList.remove('is-hidden');
        }

        currentLocation -= 1;
        paginationElementCurrent.innerHTML = currentLocation;

      } else if ( this == btnNext ) {

        var nextItem = displayedItem.nextElementSibling;

        displayedItem.classList.remove('is-being-displayed');
        nextItem.classList.add('is-being-displayed');
        sliderProjection.src = nextItem.querySelector('.shop-item__gallery__item__visual__img').src;

        if ( nextItem.nextElementSibling == null ) {
          btnNext.classList.add('is-hidden');
        }

        if (btnPrevious.classList.contains('is-hidden')) {
          btnPrevious.classList.remove('is-hidden');
        }

        currentLocation += 1;
        paginationElementCurrent.innerHTML = currentLocation;
      }
    });
  }

  document.onkeydown = function(e) {
    var displayedItem = document.querySelector('li.shop-item__gallery__item.is-being-displayed');

    switch (e.keyCode) {

      case 37:
        var previousItem = displayedItem.previousElementSibling;

        if (previousItem !== null) {
          displayedItem.classList.remove('is-being-displayed');
          previousItem.classList.add('is-being-displayed');

          sliderProjection.src = previousItem.querySelector('.shop-item__gallery__item__visual__img').src;

          if (previousItem.previousElementSibling == null) {
            btnPrevious.classList.add('is-hidden');
          }

          if (btnNext.classList.contains('is-hidden')) {
            btnNext.classList.remove('is-hidden');
          }

          currentLocation -= 1;

          paginationElementCurrent.innerHTML = currentLocation;
        }

        break;

      case 39:

        var nextItem = displayedItem.nextElementSibling;

        if (nextItem !== null) {
          displayedItem.classList.remove('is-being-displayed');
          nextItem.classList.add('is-being-displayed');
          sliderProjection.src = nextItem.querySelector('.shop-item__gallery__item__visual__img').src;

          if ( nextItem.nextElementSibling == null ) {
            btnNext.classList.add('is-hidden');
          }

          if (btnPrevious.classList.contains('is-hidden')) {
            btnPrevious.classList.remove('is-hidden');
          }

          currentLocation += 1;
          paginationElementCurrent.innerHTML = currentLocation;
        }

        break;
    }
  };
}

var filterAnchors = document.querySelectorAll('.js-filter a');
for (var i = 0; i < filterAnchors.length; i++) {
  filterAnchors[i].addEventListener('click', toggleFilter);
}

var sortAnchors = document.querySelectorAll('.js-sort a');
for (var i = 0; i < sortAnchors.length; i++) {
  sortAnchors[i].addEventListener('click', toggleSort);
}

function toggleFilter(e) {

  // prevent normal anchor behaviour
  e.preventDefault();

  // all url params in an array
  var urlParamsArray = [];

  var checkedSortAnchor = document.querySelector('.js-sort a.is-checked');

  // emptying the shop
  var productContainer = document.getElementById('product-container');
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  // check if index
  if (document.getElementById('index__shop') != undefined) {

    // check if clicked filter is activated or not
    if (this.classList.contains('is-checked')) {

      // remove checked class from clicked filter anchor
      this.classList.remove('is-checked');

      // get param of clicked filter
      var clickedURL = this.href;

      // get param of active filters
      var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
      for (var i = 0; i < checkedFilterAnchors.length; i++) {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('=').pop());
      }

      // get base url actual location
      var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';

      // join
      var urlParams = urlParamsArray.join('+');

      if ( checkedSortAnchor ) {
        var sortParam = checkedSortAnchor.href.split('=').pop();
        var url = baseURL + 'collections/all/' + urlParams + '?sort_by=' + sortParam;
      } else {
        var url = baseURL + 'collections/all/' + urlParams;
      }

    } else {

      // add checked class from clicked filter anchor
      this.classList.add('is-checked');

      // get param of clicked filter
      var clickedURL = this.href;

      // get param of active filters
      var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
      for (var i = 0; i < checkedFilterAnchors.length; i++) {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('=').pop());
      }

      // get base url actual location
      var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';

      // join strings to url
      var urlParams = urlParamsArray.join('+');

      if ( checkedSortAnchor ) {
        var sortParam = checkedSortAnchor.href.split('=').pop();
        var url = baseURL + 'collections/all/' + urlParams + '?sort_by=' + sortParam;
      } else {
        var url = baseURL + 'collections/all/' + urlParams;
      }

    }
  } else {

    // check if clicked filter is activated or not
    if (this.classList.contains('is-checked')) {

      // add checked class from clicked filter anchor
      this.classList.remove('is-checked');

      // get param of clicked filter
      var clickedURL = this.href;

      // get param of active filters
      var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
      for (var i = 0; i < checkedFilterAnchors.length; i++) {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('/').pop());
      }

      // get base url actual location
      var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';

      // join strings to url
      var urlParams = urlParamsArray.join('+');

      if ( checkedSortAnchor ) {
        var sortParam = checkedSortAnchor.href.split('=').pop();
        var url = baseURL + urlParams + '?sort_by=' + sortParam;
      } else {
        var url = baseURL + urlParams;
      }
    } else {

      // add checked class from clicked filter anchor
      this.classList.add('is-checked');

      // get param of clicked filter
      var clickedURL = this.href;

      // get param of active filters
      var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
      for (var i = 0; i < checkedFilterAnchors.length; i++) {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('/').pop());
      }

      // get base url actual location
      var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';

      // join strings to url
      var urlParams = urlParamsArray.join('+');

      if ( checkedSortAnchor ) {
        var sortParam = checkedSortAnchor.href.split('=').pop();
        var url = baseURL + urlParams + '?sort_by=' + sortParam;
      } else {
        var url = baseURL + urlParams;
      }
    }
  }

  // push parameters to url
  if (history.pushState) {
    window.history.pushState({path: url}, '', url);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      parser = new DOMParser();
      var doc = parser.parseFromString(xhr.responseText, "text/html");
      xhrProductContainer = doc.getElementById('product-container');
      while (xhrProductContainer.firstChild) {
        productContainer.appendChild(xhrProductContainer.firstChild);
      }
    }
  };
  xhr.send();
}

function toggleSort(e) {

  e.preventDefault()

  // all url params in an array
  var urlParamsArray = [];

  // emptying the shop
  var productContainer = document.getElementById('product-container');
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  var checkedFilterAnchors = [];
  var checkedSortAnchor = document.querySelector('.js-sort a.is-checked');

  // check if clicked filter is activated or not
  if (this.classList.contains('is-checked')) {

    this.classList.remove('is-checked');

    // get param of clicked filter
    var clickedURL = this.href;

    // get param of active filters
    var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
    for (var i = 0; i < checkedFilterAnchors.length; i++) {
      if (document.getElementById('index__shop') != undefined) {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('=').pop());
      } else {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('/').pop());
      }
    }

    // get base url actual location
    var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';

    // join strings to url
    var urlParams = urlParamsArray.join('+');

    var url = baseURL + urlParams;

  } else {

    // reset sort filter
    if ( checkedSortAnchor ) {
      document.querySelector('.js-sort a.is-checked').classList.remove('is-checked');
    }

    this.classList.add('is-checked');

    // get param of clicked filter
    var clickedURL = this.href;

    // get param of active filters
    var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
    for (var i = 0; i < checkedFilterAnchors.length; i++) {
      if (document.getElementById('index__shop') != undefined) {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('=').pop());
      } else {
        urlParamsArray.push(checkedFilterAnchors[i].href.split('/').pop());
      }
    }

    var checkedSortAnchor = document.querySelector('.js-sort a.is-checked');
    var sortParam = checkedSortAnchor.href.split('=').pop();

    // get base url actual location
    var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';

    // join strings to url
    var urlParams = urlParamsArray.join('+');

    var url = baseURL + urlParams + '?sort_by=' + sortParam;
  }

  // push parameters to url
  if (history.pushState) {
    window.history.pushState({path: url}, '', url);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      parser = new DOMParser();
      var doc = parser.parseFromString(xhr.responseText, "text/html");
      xhrProductContainer = doc.getElementById('product-container');
      while (xhrProductContainer.firstChild) {
        productContainer.appendChild(xhrProductContainer.firstChild);
      }
    }
  };
  xhr.send();
}
