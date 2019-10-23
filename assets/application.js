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

var filters = document.querySelectorAll('.js-filter a');
for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener('click', toggleFilter);
}

function updateURL() {
  console.log('inside');
  if (history.pushState) {

    console.log('push');
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '';
    console.log(newUrl);
    //window.history.pushState({path:newurl},'',newurl);
  }
}


function toggleFilter(e) {
  // prevent normal anchor behaviour
  e.preventDefault();

  // emptying the shop
  var productContainer = document.getElementById('product-container');
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  // filling the shop
  // preparing url
  if ( window.location.pathname == '/' ) {
    // var url = window.location.protocol + "//" + window.location.host + window.location.pathname + 'collections/all';
    // window.history.pushState({path: url}, '', url);
    console.log('index');
    var url = this.href + "/" + 'collections/all';
  } else {
    var url = this.href;
  }

  console.log(url);

  //updateURL();

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      parser = new DOMParser();
      var doc = parser.parseFromString(xhr.responseText, "text/html");
      xhrProductContainer = doc.getElementById('product-container');
      console.log(xhrProductContainer);
      while (xhrProductContainer.firstChild) {
        productContainer.appendChild(xhrProductContainer.firstChild);
      }
    }
  };
  xhr.send();
}






/* advanced filter

var currentURL = new URL(window.location);
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
