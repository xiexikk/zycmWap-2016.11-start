$(document).ready(function () {

    //样式控制 otherFn()
    ~function(){
        // search.html, classifyWj.html,group.html
        $(".goodsTj .in .con").eq(0).css("padding-top", "0");
    }();

    //收藏 Fn()
    +function () {
        function collect(parm) {
            $(parm).each(function(i,e){
                $(e).on("click", function () {
                    $(e).toggleClass("on");
                    if ($(e).hasClass("on")){
                        $(this).addClass("on");
                        $(this).html("<i></i>" + "已收藏");
                    } else {
                        $(e).removeClass("on");
                        $(e).html("<i></i>" + "收藏");
                    }
                })
            })
        }
        //产品收藏：expoon.html , goodsTj.html , group.html
        collect(".propose .pag .star");
        //商家收藏： expoon.html ，sellerTj.html
        collect(".brandUl .col")
    }();

    //点赞Fn()
    ~function(){
        var zan = $('.zanNum');
        var num = parseInt(zan.html());
        var i = 0;
        zan.on("click",function(e){
            zan.toggleClass('on');
            if($(this).hasClass('on')){

            }else{

            }
        })
    }();

    //tab栏Fn()
    +function () {
        //点击
        function tabChg(parm1, parm2) {
            var speed = 300;
            $(parm2+'>li').eq(0).show().siblings().hide()
            $(parm1+'>li').on("click", function () {
                $(this).addClass("cur").siblings().removeClass("cur");
                var index = $(this).index();
                $(parm2+">li").eq(index).fadeIn(speed).siblings().hide();
            })
        }
        //group.html
        tabChg(".myGroup .nav",".myGroup .com");

        //轻触(点击)，滑动
        function tabTapSwipe(tab,main){
            var speed = 500;
            var num = $(main +' li').length;
            $(main +'>li').eq(0).show().siblings().hide();
            $(tab+' li').on("click", function () {
                $(this).addClass('cur').siblings().removeClass('cur');
                var t = $(this).index();
                $(main+' li').eq(t).fadeIn(speed).siblings().hide();
            });
            $(main+'>li').on("swipeLeft", function () {
                var i= $(this).index()+1;
                if(i==num){
                    return false;
                }
                else{
                    $(main+'>li').eq(i).fadeIn(speed).siblings().hide();
                    $(this).parents('.myCom').find('ol li').eq(i).addClass('cur').siblings().removeClass('cur');
                }
            }).on("swipeRight", function () {
                var i = $(this).index();
                if(i==0){
                    return false;
                }
                else{
                    var n = i-1;
                    $(main+'>li').eq(n).fadeIn(speed).siblings().hide();
                    $(this).parents('.myCom').find('ol li').eq(i-1).addClass('cur').siblings().removeClass('cur');
                }
            })
        }

        //myCollect.html
        tabTapSwipe(".myCollect .tab",".myCollect .collectCom");

        //goodsDet.html
        tabTapSwipe(".goodsDet .tab",".goodsDet .itemCon");

        //franchiser.html
        tabTapSwipe(".franchiser .nav",".franchiser .con");

        //information.html
        tabTapSwipe(".information .nav",".information .con");

        //periodicals.html
        tabTapSwipe(".periodicals .tab",".periodicals .com");

        //group.html
       /* tabTapSwipe(".myGroup .nav",".myGroup .com");*/

    }();

    //弹窗 Fn()
    ~function(){
        function popFn(btn,pop){
            var speed = 200;
            $(btn).on("click",function(){
                $(pop).fadeIn(speed);
                $(pop+" .wrap").fadeIn(speed);
                $("html").css("overflow","hidden");
            });
            $(pop+" .close,"+pop+" .wrap").on("click",function(){
                $(pop).fadeOut(speed);
                $(pop+" .wrap").fadeOut(speed);
                $("html").css("overflow","visible");
            });
        }
        //group.html ~意向咨询
        popFn(".botHandle .btn02","#msgPop");
        //group.html ~非会员点击头像提示
        popFn(".mesCon .item .tp","#powerPop")

        //exhitBook.html ~立即索票
        popFn(".actList .getBtn","#trickPop");
        popFn("#myTrick","#trickPop");


    }();
});

//加载更多Fn().......
function getDataAndRender(o) {
    //数据交互
    $.ajax({
        type: 'get',
        url: o.url,
        data: o.data,
        beforeSend: function () {
            //发送前的相关判断
            if (o.tip.hasClass('loading') || o.dataEnd) {
                return false;
            } else {
                o.tip.addClass('loading').show().html('加载中...');
            }
        },
        success: function (data) {
            //console.log('ok');
            console.log({}.toString.call(data), data);
            o.getData = {}.toString.call(data) == '[object String]' ? $.parseJSON(data) : data;
            if (o.getData[o.retStatus] == 1) {
                //渲染页面
                var html = template(o.templateId, o);
                o.box.append(html);
                //相关处理
                o.box.attr('data-page', o.data.page++); //保存页码
                o.tip.html('加载完成');
            } else {
                o.tip.html('没有更多数据了');
                o.dataEnd = true;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log('err');
            //未发送时的处理
            if (XMLHttpRequest.readyState == 0) {
                return;
            }
        },
        complete: function () {
            //后续处理
            o.tip.removeClass('loading');
            if (!o.dataEnd) {
                //还有更多数据可加载时的操作
                o.moreFn && o.moreFn();
            }
        }
    });
};
