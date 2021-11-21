const hamburger = document.querySelector('.header__burger'),
    menu = document.querySelector('.header__menu'),
    body = document.querySelector('body');

hamburger.addEventListener('click', () => {
    if (!hamburger.classList.contains('active')){
        menu.classList.add('active');
        hamburger.classList.add('active');
        body.classList.add('no-croll');
    }
    else{
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('no-croll');
    }
});
