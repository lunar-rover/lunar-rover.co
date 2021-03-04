function onPostContactUsMessageFail(error) {
    showMessageModal($('#contact-modal'), 'Contact Us', error);
}

function onPostContactUsMessageDone(data) {
    if (data.done) {
        showMessageModal($('#contact-modal'), 'Contact Us', 'Your message has been sent. Thank you.');
    }
    else if (data.error) {
        onPostContactUsMessageFail(data.error)
    }
    else {
        onPostContactUsMessageFail('Something went wrong! Please try again later.')
    }
}

function postContactUsMessage(form_data, success_cb, fail_cb) {
    $.post("process-contact", form_data)
        .done(function(data){
            success_cb(data);
        })
        .fail(function(){
            fail_cb();
        })
        .always(function(){
            // TODO: hide progress indicator
        });
}

function showMessageModal(modal, title, message) {
    $(modal).find('.modal-title').html(title);
    $(modal).find('.modal-body').html('<p>'+message+'</p>');
    $(modal).modal('show');
}

$(document).ready(function(){
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.validator.addMethod("universalEmail", function(value, element) {
        return (this.optional( element )
            || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( value ));
    }, 'Please enter a valid email address.');
    $('#contact-form').validate({
        rules: {
            email: {
                required: true,
                universalEmail: true
            }
        }
    });

    $('#contact-form').on('submit', function(e){
        e.preventDefault();
        if ($(this).valid()) {
            postContactUsMessage($(this).serializeFormJSON(), onPostContactUsMessageDone, onPostContactUsMessageFail);
        }
    });

    $(window).scroll(function() {
        if($(this).scrollTop() < $("#banner").height()){
            $(".navbar").removeClass("bg-primary");
        }
        else{
            $(".navbar").addClass("bg-primary");
        }
    });

    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    $('button.get-app').on('click', function(){
        if (iOS) {
            window.location = $('#app_link_ios').attr('href');
        }
        else if (isAndroid) {
            window.location = $('#app_link_android').attr('href');
        }
        else {
            $('#navLinkBanner').click();
        }
    });

    $("#navbarCollapse").on('show.bs.collapse', function(){
        var navbar = $(this).parents("nav.navbar").first();
        navbar.addClass("navbar-expanded");
        navbar.find("a.navbar-brand img.app-logo-placeholder").removeClass("d-none");
        navbar.find("a.navbar-brand img.app-logo").addClass("d-none");
        navbar.find(".navbar-toggler i.fa-bars").removeClass("fa-bars").addClass("fa-times");
    });
    $("#navbarCollapse").on('hide.bs.collapse', function(){
        var navbar = $(this).parents("nav.navbar").first();
        navbar.removeClass("navbar-expanded");
        navbar.find("a.navbar-brand img.app-logo-placeholder").addClass("d-none");
        navbar.find("a.navbar-brand img.app-logo").removeClass("d-none");
        navbar.find(".navbar-toggler i.fa-times").removeClass("fa-times").addClass("fa-bars");
    });

    $(".nav-link").on("click", function(){
        if ($("#navbarCollapse").hasClass('show')) {
            $("#navbarCollapse").collapse('hide');
        }
    });

    var initSectionPos = window.location.href.indexOf('#') + 1;
    if (initSectionPos > 0) {
        var initSection = window.location.href.substring(initSectionPos);
        if ($(".nav-link.page-scroll[href='#"+initSection+"']").length>0) {
            $('html, body').stop();
            $(".nav-link.page-scroll[href='#"+initSection+"']").click();
        }
    }
});
