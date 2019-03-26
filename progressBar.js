$('#next').click(function () {
    var $next = $('.progress ul li.current').removeClass('current').addClass('complete').next('li');
    if ($next.length) {
        $next.removeClass('complete').addClass('current');
        //console.log('Prev');
    } else {
        $(".progress ul li:first").removeClass('complete').addClass('current');
        if (".progress ul li:last") {
          $('.progress ul li').removeClass('current').removeClass('complete').removeAttr('class');
          $(".progress ul li:first").addClass('current');
        }
        //console.log('Next');
    }
});
$('#prev').click(function () {
    var $prev = $('.progress ul li.current').removeClass('current').removeClass('complete').removeAttr('class').prev('li');
    if ($prev.length) {
        $prev.removeClass('complete').addClass('current');
        //console.log('Prev');
    } else {
        $(".progress ul li:first").removeClass('complete').addClass('current');
        $(".progress ul li:last").removeClass('current').removeClass('complete').removeAttr('class');
        //console.log('Prev');
    }
});