function initSelect(elem) {
  let select = elem.querySelector('.dropdown.select');
  let selectValue = elem.querySelector('.dropdown.select .value');
  let selectOptions = elem.querySelectorAll('.dropdown-menu li');

  selectOptions.forEach(function (currentElement) {
    currentElement.addEventListener('click', function () {
      selectValue.innerText = currentElement.textContent;
      select.classList.remove('-open');
      if (select.classList.contains('-error')) select.classList.remove('-error');

      const brandId = currentElement.getAttribute('value');
      selectValue.setAttribute('value', brandId);
    })
  })

  selectValue.addEventListener('click', function () {
    select.classList.toggle('-open');
  })

  document.addEventListener('click', function (e) {
    if (!e.composedPath().includes(select)) {
      select.classList.remove('-open');
    }
  })
}

function generateUrl() {
  const urlAction = '/supportedfeatures/help?'
  const brandSelectValue = document.querySelector('[name="brand_id"] .value');
  const phoneSelectValue = document.querySelector('[name="phone_id"] .value');
  const brandId = brandSelectValue.getAttribute('value');
  const phoneId = phoneSelectValue.getAttribute('value');
  const selectValue = document.querySelectorAll('.find-manual .value');
  let isError = false;

  selectValue.forEach(function (currentElement) {
    if (currentElement.getAttribute('value') === null) {
      currentElement.parentElement.classList.add('-error');
      isError = true
    }
  });

  if (isError) return;

  const generateUrl = urlAction + 'brand_id=' + brandId + '&' + 'phone_id=' + phoneId;
  window.location.replace(generateUrl);
}

function loadDataSet() {
  const brandSelectValue = document.querySelector('[name="brand_id"] .value');
  const phoneSelectValue = document.querySelector('[name="phone_id"] .value');

  const brandOptions = document.querySelectorAll('[name="brand_id"] li');
  const phoneOptions = document.querySelectorAll('[name="phone_id"] li');

  const url = window.location.href;
  const parseUrl = new URL(url);
  const brandId = parseUrl.searchParams.get('brand_id');
  const phoneId = parseUrl.searchParams.get('phone_id');

  if (brandId === null) return;

  initSelect(selectPhone);

  brandSelectValue.setAttribute('value', brandId);
  phoneSelectValue.setAttribute('value', phoneId);

  brandOptions.forEach(function (el) {
    if (el.getAttribute('value') === brandId) {
      brandSelectValue.innerText = el.textContent;
    }
  })

  phoneOptions.forEach(function (el) {
    if (el.getAttribute('value') === phoneId) {
      phoneSelectValue.innerText = el.textContent;
    }
  })
}

const selectBrand = document.querySelector('[name="brand_id"]');
const selectPhone = document.querySelector('[name="phone_id"]');
const selectButton = document.querySelector('.find-manual .btn');

selectButton.addEventListener('click', generateUrl);
window.addEventListener('load', loadDataSet);

initSelect(selectBrand);
initSelect(selectPhone);