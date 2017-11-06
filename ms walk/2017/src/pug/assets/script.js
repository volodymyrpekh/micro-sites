$('.card_chapter .card__item').click(function() {
    $('.modal-content').animate({
        scrollTop: $('#card_event').offset().top
    }, 700);
    $('.card_chapter .card__item').removeClass('choose');
    $(this).addClass('choose');
    $(this).parent().parent().removeClass('choose');
    $('.card_province').addClass('not-choose');



    $('.card_event .card__list').removeClass('choose');
    $('.card_event .card__item').removeClass('choose');
    $('.card_event .card__content').addClass('choose');
    my_event = $(this).attr('data-item');
    $('[data-list=' + my_event + ']').addClass('choose'); 
});

$('.card_province .card__item').click(function() {
    $('.modal-content').animate({
        scrollTop: $('#card_chapter').offset().top
    }, 700);

    $('.card_event .card__list').removeClass('choose');
    $('.card_event .card__content').removeClass('choose');

    $('.card_chapter .card__list').removeClass('choose');
    $('.card_chapter .card__item').removeClass('choose');
    $('.card_chapter .card__content').addClass('choose');
    choose = $(this).attr('data-item');
    $('[data-list=' + choose + ']').addClass('choose'); 
    
    $('.card_province .card__item').removeClass('choose');
    $(this).parent().parent().removeClass('choose');
    $(this).addClass('choose');

    choose_event = $(this).attr('data-event');
    if (choose_event) {
        $('[data-list=' + choose_event + ']').addClass('choose');
        $('.card_event .card__content').addClass('choose');
        $('.card_chapter .card__content').removeClass('choose');
        $('[data-list=' + choose + '] [data-item=' + choose_event + ']').addClass('choose');

        $('.modal-content').animate({
            scrollTop: $('#card_event').offset().top + 100
        }, 700);
    }

});




$(window).bind('scroll', function() {
    var my_menu = $('.header');
    var my_body = $('body');
    var my_scroll = $('.no-touch #cd-vertical-nav a');

    if ($(window).scrollTop() > 70) {
        my_menu.addClass('fixed');
        my_body.addClass('fixed');
    } else {
        my_menu.removeClass('fixed');
        my_body.removeClass('fixed');
    }
});

jQuery(document).ready(function($) {
    var contentSections = $('.cd-section'),
        navigationItems = $('#cd-vertical-nav a');

    updateNavigation();
    $(window).on('scroll', function() {
        updateNavigation();
    });

    //smooth scroll to the section
    navigationItems.on('click', function(event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function() {
        $('.touch #cd-vertical-nav').toggleClass('open');

    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function() {
        $('.touch #cd-vertical-nav').removeClass('open');
    });

    function updateNavigation() {
        contentSections.each(function() {
            $this = $(this);
            var activeSection = $('#cd-vertical-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
            if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationItems.eq(activeSection).addClass('is-selected');
            } else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
    }

    function smoothScroll(target) {
        $('body,html').animate({ 'scrollTop': target.offset().top - 70 },
            600
        );
    }
});
jQuery(document).ready(function() {
    body_scroll = ( $(".whowalk").height() - $('.no-touch #cd-vertical-nav').offset().top );
    $('.no-touch #cd-vertical-nav a').addClass('scroll');
});

$(window).bind('scroll', function() {
    var my_scroll = $('.no-touch #cd-vertical-nav a');

    if ($(window).scrollTop() > body_scroll + 50) {
        my_scroll.removeClass('scroll');
    } else {
        my_scroll.addClass('scroll');
    }
});