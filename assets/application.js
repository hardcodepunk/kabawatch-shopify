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

function toggleFilter(e) {

  // prevent normal anchor behaviour
  e.preventDefault();

  // emptying the shop
  var productContainer = document.getElementById('product-container');
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  // preparing url
  if ( window.location.pathname == '/' ) {
    var url = this.href;
    var urlParam = url.split('?')[1];
    var urlIndex = url.split('?', 1)[0];
    var adaptedUrl = urlIndex + 'collections/all/' + '?' + urlParam;
    console.log(adaptedUrl + ' ' + 'adapted url');

    url = adaptedUrl;
  } else {
    var url = this.href;
    console.log(url + ' ' + 'adapted url');
  }

  // push parameters to url
  if (history.pushState) {
    window.history.pushState({path: url}, '', url);
  }

  // add checked class to filter button
  if (this.classList.contains('is-checked')) {
    this.classList.remove('is-checked');
  } else {
    this.classList.add('is-checked');
  }

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
