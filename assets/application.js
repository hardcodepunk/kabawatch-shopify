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
      var url = baseURL + 'collections/all/' + urlParams;

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
      console.log('urlParams' + ': ' + urlParams);

      var url = baseURL + 'collections/all/' + urlParams + '?sort_by=price-ascending';
      console.log('url' + ': ' + url);

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
      var url = baseURL + urlParams;
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
      var url = baseURL + urlParams;
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
    console.log('clickedURL' + ': ' + clickedURL);

    // get param of active filters
    var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
    for (var i = 0; i < checkedFilterAnchors.length; i++) {
      urlParamsArray.push(checkedFilterAnchors[i].href.split('/').pop());
    }

    // get base url actual location
    var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';


    // join strings to url
    var urlParams = urlParamsArray.join('+');
    console.log('urlParams' + ': ' + urlParams);

    var url = baseURL + urlParams;

  } else {

    // reset sort filter
    if ( checkedSortAnchor ) {
      document.querySelector('.js-sort a.is-checked').classList.remove('is-checked');
    }

    this.classList.add('is-checked');

    // get param of clicked filter
    var clickedURL = this.href;
    console.log('clickedURL' + ': ' + clickedURL);

    // get param of active filters
    var checkedFilterAnchors = document.querySelectorAll('.js-filter a.is-checked');
    for (var i = 0; i < checkedFilterAnchors.length; i++) {
      urlParamsArray.push(checkedFilterAnchors[i].href.split('/').pop());
    }

    var checkedSortAnchor = document.querySelector('.js-sort a.is-checked');
    var sortParam = checkedSortAnchor.href.split('=').pop();

    console.log('sortParam' + ': ' + sortParam);

    console.log('checkedSortAnchor' + ': ' + checkedSortAnchor);

    // get base url actual location
    var baseURL = clickedURL.split('/').slice(0, -1).join('/') + '/';

    console.log('baseURL' + ': ' + baseURL);

    // join strings to url
    var urlParams = urlParamsArray.join('+');
    console.log('urlParams' + ': ' + urlParams);

    var url = baseURL + urlParams + '?=' + sortParam;
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

/* var currentURL = new URL(window.location);
var currentParams = currentURL.searchParams.get('sort_by');
var urlSearchParams = new URLSearchParams(
  window.location.search.indexOf("sort_by") > -1
  ? window.location.search.replace(/sort_by/gi,"")
  : window.location.search
);

var render = function (template, node) {
  node.innerHTML = template;

  node.querySelector('#sort-by').addEventListener('change', function() {
    urlSearchParams.set(this.name, this.value);
    window.location = `?sort_by${urlSearchParams}`;
  });
};

var SortOptions = [{
  label: 'Featured',
  value: 'manual'
}, {
  label: 'Price: Low to High',
  value: 'price-ascending'
}, {
  label: 'Price: High to Low',
  value: 'price-descending'
}, {
  label: 'A-Z',
  value: 'title-ascending'
}, {
  label: 'Z-A',
  value: 'title-descending'
}, {
  label: 'Oldest to Newest',
  value: 'created-ascending'
}, {
  label: 'Newest to Oldest',
  value: 'created-descending'
}, {
  label: 'Best Selling',
  value: 'best-selling'
}];

var template = `
  <div>
    <label for="sort-by">Sort by</label>
    <select id="sort-by">
      ${SortOptions.map((item) =>
        `<option value="${item.value}" ${currentParams === item.value ? 'selected' : ''}>${item.label}</option>`
      ).join('')}
    </select>
  </div>
`;

render(template, document.querySelector('#sort-by-container')); */
