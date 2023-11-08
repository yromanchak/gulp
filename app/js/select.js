function initSelect(elem, optionValueAttr) {
    let select = elem;
    let selectValue = elem.querySelector('.value');
    let selectOptions = elem.querySelectorAll('.dropdown-menu li');
    let timerLeave = null;
    let inputHidden = elem.querySelector('input[type="hidden"]');

    selectOptions.forEach(function (currentElement) {
        currentElement.addEventListener('click', function (e) {
            selectValue.innerText = optionValueAttr ? currentElement.getAttribute('value') : currentElement.textContent;
            select.classList.remove('-open');

            if (select.classList.contains('-error')) select.classList.remove('-error');

            const optionValue = currentElement.getAttribute('value');
            selectValue.setAttribute('value', optionValue);

            if (typeof(inputHidden) != 'undefined' && inputHidden != null) {
                inputHidden.setAttribute('value', optionValue);
            }

            if (select.getAttribute('name') === 'select-department') {
                const contactForm = document.querySelector('#contact-form');
                optionValue === 'credits_issues' ?  contactForm.classList.add('_credits_issues') : contactForm.classList.remove('_credits_issues');
            }
        })

        if (inputHidden != null && inputHidden.getAttribute('value') === currentElement.getAttribute('value')) {
            selectValue.innerText = currentElement.textContent;
        }

    })

    selectValue.addEventListener('click', function () {
        select.classList.toggle('-open');
    })

    document.addEventListener('click', function (e) {
        if (!e.composedPath().includes(select)) {
            select.classList.remove('-open');
        }
    })

    select.onmouseenter = () => {
        clearTimeout(timerLeave);
    }
    select.onmouseleave = () => {
        timerLeave = setTimeout(() => {
            select.classList.remove('-open');
        }, 500);
    }
}

const selectOptionAttr= document.querySelectorAll('.select.-option-attr');
const selectOptionText= document.querySelectorAll('.select:not(.-option-attr)');

if (typeof(selectOptionAttr) != 'undefined' && selectOptionAttr != null) {
    selectOptionAttr.forEach((item) => {
        initSelect(item, true);
    });
}

if (typeof(selectOptionText) != 'undefined' && selectOptionText != null) {
    selectOptionText.forEach((item) => {
        initSelect(item);
    });
}