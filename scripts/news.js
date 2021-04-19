var $actualnew= null;
var openednew=false;
$(".open-new").click(function() {
        opennew($(this));
        $actualnew=$(this);
        $actualnew.parent().addClass('open');
        return false;
});
        
function opennew(e){
$.ajax({
    url: e.data('url'),
    success: function(data) {         
        $('.news-content').html(data);
        $(".news-content").hide(0);
        $('.news-window').hide(0);  
        closenew(e);
        // $("html, body").animate({ scrollTop: $(e).offset().top - (200) }, 300, function(){
            $(e).parent().next('.news-window').show(0);
            $(e).parent().next('.news-window').css('height','0');
            var heightAjax = $('.news-content').height();
            $(e).parent().next('.news-window').animate({height:heightAjax}, 500,function(){
                $(e).parent().next('.news-window').css('height','auto');
                $(".news-content").fadeIn("slow");
            });             
        // });
    }
});
}

function closenew(e){
    $('.close-new').click(function() {
        $(e).parent().next(".news-window").slideUp("slow");
        $(e).prev(".news-window").slideUp("slow");
        $(".news-content").fadeOut("slow");
        $(e).parent().removeClass('open');
        // $("html, body").animate({ scrollTop: $('#news').offset().top -(50) }, 1000);
        openednew=false;
    });
}