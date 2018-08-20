function touch() {
    if ($('html').width() < 1200) {
        $('html').addClass('touch').removeClass('no-touch');
    } else {
        $('html').removeClass('touch').addClass('no-touch');
    }
}

var boxwidth = $(window).width();
var heightSlide = $("#slide").height();

function remove_fixed() {
    $('html').removeClass('fixed');
    $('.header').removeClass('nav-open');
}
function fixed_header() {
    $(".header").css({ "top": "0" });
    $("html").toggleClass("fixed");
}
function remove_dropdawn() {
    $('.dropdown').removeClass('active');
    $('.cd-morph-dropdown').removeClass('is-dropdown-visible');
}

$("[data-toggle='modal']").click(function() {
    remove_fixed();
});

$("[data-target='#SearchModal']").click(function() {
    if ($("#DonateModal").hasClass("show")) {
        $("#DonateModal").removeClass("show").modal("hide");
        $('#SearchModal').modal("show").addClass("show");
    }
    else {
        $('#SearchModal').modal('show').addClass("show");
        remove_fixed();
    }
});
$("[data-target='#DonateModal']").click(function() {
    if ($("#SearchModal").hasClass("show")) {
        remove_dropdawn();
        $("#SearchModal").removeClass("show").modal("hide");
        $('#DonateModal').modal('show').addClass("show");
        remove_fixed();
    } 
    else {
        if ($("#DonateModal").hasClass("show")) {
            $('.modal').modal('hide');
            remove_fixed();
        }
        else {
            $('#DonateModal').modal('show');
            remove_fixed();
            $(".header").css({ "top": "" }).addClass("fixed");
            $("html").removeClass("fixed");
        }
    }
});
$(".header__search").click(function() {
    $("#SearchModal .modal-header").css({ "padding-top": "" });
    $(".modal__take input").focus();
});
$(".btn-close, .nav-trigger").click(function() {
    $('.modal').modal('hide');
    remove_dropdawn();
});

$(window).resize(function() {
    boxwidth = $(window).width();
    touch();
    new_scroll();
    $('.modal').modal('hide');
    if ($('html').width() > 1199) {
        remove_fixed();
        remove_dropdawn();
    }
});
function header_fixed() {
    if ($(window).scrollTop() > 100) {
        $('.header').addClass('fixed');
    } else {
        $('.header').removeClass('fixed');
    }
}
$(window).bind('scroll', function() {
    header_fixed();
});

header_fixed();

$(".nav-trigger").click(function() {
    if ($("html").hasClass("fixed")) {
        fixed_header();
    } else {
        $(".header").css({ "top": $(".header").offset().top });
        $("html").toggleClass("fixed");
    }
});

jQuery(document).ready(function($) {
    touch();

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
        if ($('html').width() < 1440) {
            $('html,body').animate({ 'scrollTop': target.offset().top - 73 }, 600);
        } else {
            $('html,body').animate({ 'scrollTop': target.offset().top - 85 }, 600);
        }
    }
});

function new_scroll() {
    var my_scroll = $('.no-touch #cd-vertical-nav a');
    if ($(window).scrollTop() > 100) {
        my_scroll.removeClass('scroll');
    } else {
        my_scroll.addClass('scroll');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    $("[data-toggle='collapse']").on('click', function() {
        $(this)
            .find('[data-fa-i2svg]:last-child')
            .toggleClass('fa-caret-up')
            .toggleClass('fa-caret-down');
    });
});

jQuery(document).ready(function() {
    if ($("html").hasClass("no-touch")) {
        $('.no-touch #cd-vertical-nav a').addClass('scroll');
    }

    $(window).bind('scroll', function() {
        new_scroll();
    });
});

$(window).on('scroll',
        {
            previousTop: 0
        }, 
        function () {
    var headerHeight = $('.header').height();
    var currentTop = $(window).scrollTop();
    //check if user is scrolling up
    if (currentTop < this.previousTop ) {
        //if scrolling up...
        if (currentTop > 0 && $('.header').hasClass('fixed')) {
            $('.header').addClass('vis_top');
        } else {
            $('.header').removeClass('vis_top fixed');
        }
    } else {
        //if scrolling down...
        $('.header').removeClass('vis_top');
        if( currentTop > headerHeight && !$('.header').hasClass('fixed')) $('.header').addClass('fixed');
    }
    this.previousTop = currentTop;
});
$('#radius').change(function() {
  $('.radius_value').html(this.value);
});