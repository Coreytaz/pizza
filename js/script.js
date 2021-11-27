const hamburger = document.querySelector('.header__burger'),
    menu = document.querySelector('.header__menu'),
    body = document.querySelector('body');

hamburger.addEventListener('click', () => {
    if (!hamburger.classList.contains('active')) {
        menu.classList.add('active');
        hamburger.classList.add('active');
        body.classList.add('no-croll');
    }
    else {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('no-croll');
    }
});

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');
    } else {
        selectSingle.setAttribute('data-state', 'active');
    }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
        selectSingle_title.textContent = evt.target.textContent;
        selectSingle.setAttribute('data-state', '');
    });
}

const catalogTab = document.querySelectorAll('.catalog-nav__item');
const tabs = document.querySelectorAll(".catalog__item");

catalogTab.forEach(function (item) {
    item.addEventListener("click", function () {
        tabId = item.getAttribute("data-catalog");
        curret = document.querySelectorAll(tabId);
        if (tabId == "#all") {
            tabs.forEach(function (item) {
                item.classList.add('active');
                catalogTab.forEach(function (item) {
                    item.classList.remove('active');
                });
                catalogTab[0].classList.add('active');
            });
            return
        }
        catalogTab.forEach(function (item) {
            item.classList.remove('active');
        });
        tabs.forEach(function (item) {
            item.classList.remove('active');
        });

        item.classList.add('active');
        curret.forEach(function (item) {
            item.classList.add('active');
        });
    });
});

; (function () {
    window.myLib = {};

    window.myLib.body = document.querySelector('body');

    window.myLib.closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };
})();

; (function () {
    var catalog = document.querySelector('.catalog');

    if (catalog === null) {
        return;
    }

    var updateProductPrice = function (product, price) {
        var productPrice = product.querySelector('.product__price-value');
        productPrice.textContent = price;
    };

    var changeProductSize = function (target) {
        var product = myLib.closestItemByClass(target, 'product');
        var previousBtnActive = product.querySelector('.product__size.is-active');
        var newPrice = target.getAttribute('data-size-price');

        previousBtnActive.classList.remove('is-active');
        target.classList.add('is-active');
        updateProductPrice(product, newPrice);
    };

    catalog.addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('product__size') && !target.classList.contains('is-active')) {
            e.preventDefault();
            changeProductSize(target);
        }
    });
})();

$(document).ready(function () {
    $('.modal__close').on('click', function () {
        $('.overlay, #order, #thanks, #error').fadeOut('slow');
    });

    $('.product__btn').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__name-title').text($('.product__title').eq(i).text());
            $('#order .modal__name-price').text($('.product__price-value').eq(i).text());
            $('#order .modal__text').text($('.is-active').eq(i).text());
            $('#order .modal__img').attr('src', $('.product__img').eq(i).data('src'));
            $('.overlay, #order').fadeIn('slow');
        })
    })
    var $page = $('html, body');
    $('a[href*="#"]').click(function () {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
    });

    $('#order form').validate({
        rules: {
            Name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
            buy: "required",
        },
        messages: {
            Name: "Пожалуйста, введите свое имя",
            phone: "Пожалуйста, введите свой телефон",
            email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильный адрес почты"
            }
        }
    });

    $('input[name=phone]').mask("+7 (999)-999-99-99")
});
