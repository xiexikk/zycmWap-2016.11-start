/*Created by Administrator on 2016/11/10*/
//rem布局总控制
    var oldDriver = {max: 750, min: 320, px: 100};
    $(window).on('resize', function () {
        var w = $(this).width();
        if (w < oldDriver.min) {
            w = oldDriver.min;
        } else if (w > oldDriver.max) {
            w = oldDriver.max;
        }
        $('html').css('font-size', oldDriver.px * w / oldDriver.max + 'px');
    }).trigger('resize');

//给予a链接加参数，根据参数取相关的值
function GetValue() {
    var search = window.location.search;
    if(search){
        var args = search.split('?')[1].split('&');
        for (var i = 0; i < args.length; i++) {
            var a = args[i].split('=');
            this[a[0]]=a[1];
        }
    }
}
