/**

*/
$(function(){
	//判断页面是否有底部悬浮的功能
	if($("#foot").length>0 && $("#bottom").length>0){
		$("body").css("padding-bottom","120px");
		$("#foot").css("bottom",$("#bottom").height());
	}else if($("#foot").length>0 || $("#bottom").length>0){
		$("body").css("padding-bottom","60px");
	}
});
//选项卡
function tab(obj){
	var index = $(obj).index();
	$(obj).addClass("current").siblings().removeClass("current");
	$(".tabContent>.tabItems").eq(index).show().siblings().hide();
}

//弹窗
/*
* tit：标题
* con：提示语
* btn1：取消按钮名字
* btn2：确认按钮名字
* name:执行函数名
* author:zhaobin
* since:2017/12/26
*/
function tips(tit,con,btn1,btn2,id,name){
	var html = "<div class='tipbox'>\
					<div class='tips'>\
						<div class='info'>\
							<div class='tit'>"+tit+"</div>\
							<div class='con'>"+con+"</div>\
						</div>\
						<div class='btnflex'>\
							<p class='nullBtn1' onclick='tipsHide(this)'>"+btn1+"</p>\
							<p class='nullBtn2' onclick='"+name+"("+id+")'>"+btn2+"</p>\
						</div>\
					</div>\
				</div>"
	$("body").append(html);
	if ($(".nullBtn1").text() == "" || $(".nullBtn1").text() == "undefined") {
		$(".nullBtn1").remove();
	}
	if ($(".nullBtn2").text() == "" || $(".nullBtn2").text() == "undefined") {
		$(".nullBtn2").remove();
	}
}
// 弹窗按钮
function tipsHide(obj){
	$(obj).parents(".tipbox").remove();
}

//会员卡获取弹窗
/*
usertx 用户头像
userid 用户名称
brandname 商家名称
link 用户领取路径 
*/
function giftCard(data){
	data.logo = data.logo?data.logo:"/exusers/images/profilePic_default.png";
	data.background = data.backgroundImage?data.backgroundColor+" url("+data.backgroundImage+") no-repeat":data.backgroundColor;
	var top = $('body').width()<767 ? 40 : 100 ;
	var html = "<div class='giftCardWin'>\
					<div class='giftCon'>\
						<img class='cd' src='/exusers/images/0604/cd.png'>\
						<div class='userTx'></div>\
						<div class='hi'>Hi，"+data.userid+"</div>\
						<div class='gTit'>恭喜获得会员卡</div>\
						<div class='giftcard'>\
							<div class='pos'>\
								<div class='userTxsm'></div>\
								<div class='brandname'>"+data.brandname+"</div>\
								<div class='vip'>\
									VIP\
									<p>会员专享 专属优惠</p>\
								</div>\
							</div>\
						</div>\
						<div class='cardts'>享受折扣、积分抵扣等特权</div>\
						<a class='cardBtn' href='javascript:openCard();'>立即领取</a>\
					</div>\
					<img onclick='giftClose()' class='giftClose' src='/exusers/images/0604/close.png'>\
					<style>\
					@media screen and (max-width: 320px) {\
    					.giftCardWin .giftCon {width: 250px;padding: 20px;margin: 60px auto 10px;}\
						.giftCardWin .giftCon .userTx {width: 50px;height: 50px;margin: -50px auto 10px;}\
						.giftCardWin .giftCon .brandname {margin-top: 5px}\
						.giftCardWin .giftCon .vip {font-size: 26px;}\
						.giftCardWin .cardts {margin: 10px auto;}\
						.giftCardWin .giftClose {width: 40px;height: 40px;margin: 0 auto;float: none;display: block;}\
					}\
					.giftCardWin{position: fixed; z-index: 999999999; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5);}\
					.giftCon{position: relative; width: 300px; margin: "+top+"px auto 20px; border-radius: 8px; background: #fff; padding:30px; text-align: center; box-sizing: border-box;}\
					.giftCon .cd{position: absolute; top:-15px; left: 0; width: 100%;}\
					.giftCon .userTx{width: 70px; height: 70px; margin: -65px auto 15px; overflow: hidden; background:#fff url("+data.logo+") no-repeat center; background-size: cover; border-radius: 100%; border:2px solid #fff;}\
					.giftCon .hi{font-size: 14px; line-height: 1.6;}\
					.giftCon .gTit{font-size: 18px; line-height: 1; margin: 10px 0 20px;}\
					.giftcard{position: relative; width: 100%; background:"+data.background+"; background-size: cover; border-radius: 6px;}\
					.giftcard:after{content: ''; padding-top: 55%; display: block; position: relative; z-index: 1;}\
					.giftcard .pos{position: absolute; left: 15px; top: 15px; right: 15px; bottom: 15px; z-index: 2;}\
					.giftCon .userTxsm{float: left; width: 35px; height: 35px; background:#fff url("+data.usertx+") no-repeat center; background-size: cover; border-radius: 100%;}\
					.giftCon .brandname{float: left; font-size: 14px; margin: 8px 0 0 10px; color: #fff; line-height: 1;}\
					.giftCon .vip{font-size: 40px; line-height: 1; color: #fff; clear: both;}\
					.giftCon .vip p{display: block; font-size: 12px; margin-top: 10px}\
					.cardts{font-size: 12px; margin: 20px auto;}\
					.cardBtn{display: block; width: 100%; height: 40px; line-height: 40px; background: #e65659; color: #fff; text-decoration: none; border-radius: 20px;}\
					.cardBtn:hover{color:#fff;}\
					.giftClose{float: left; width: 50px; height: 50px; margin-left:calc(50% - 25px);}\
					</style>\
				</div>"
	$("body").append(html);
}
function giftClose(){
	$(".giftCardWin").remove();
}
function openCard(){

    $.post("//"+DIY_JS_SERVER+"/exusers/ajax/ajax_load_api.php",{'mod':'usercard','act':'openCard'}, function (res) {
        if(res != null) {
            if (res.code == 401) {
                window.location.href = './usercard/u8_login.php';
                return;
            } else if (res.code == 200) {
                window.location.href = './usercard/usercardwx.php';
                return;
            } else if (res.code == 201) {
                loadWxJsSdkInfo(function(){
                    var cardExt = '{"timestamp": ' + res.data.timestamp + ',"signature":"' + res.data.signature + '","nonce_str": "' + res.data.nonceStr + '"}'
                    wx.ready(function () {
                        wx.addCard({
                            cardList: [{
                                cardId: res.data.cardId,
                                cardExt: cardExt
                            }],
                            success: function (res2) {
                                console.log("aaa1:", res2)
                                var param = {};
                                param['cardId'] = res2['cardList'][0]['cardId'];
                                param['code'] = res2['cardList'][0]['code'];
                                param['vipcard_id'] = res.data.vipcard_id;

                                $.post("//"+DIY_JS_SERVER+"/exusers/ajax/ajax_load_api.php", {
                                    'mod': 'usercard',
                                    'act': 'addCardUser',
                                    'data': param
                                }, function (res3) {
                                    if(res3 != null) {
                                        console.log("aaa3:", res3);
                                        if (res3.code == 200) {
                                            window.location.href = './usercard/usercardwx.php';
                                            return;
                                        } else if (res3.code == 203) {
                                            openwxCard(res3.cardId, res3.userCardCode);

                                        }
                                    }
                                }, "jsonp");
                            },
                            fail: function (res2) {
                                console.log("aaa2:", res2);
                            },
                            complete: function (res2) {
                                console.log("aaa3:", res2);
                            }
                        });
                    });
                });
            } else if (res.code == 202) {
                loadWxJsSdkInfo(function(){
                    wx.ready(function () {
                        openwxCard(res.data.cardId, res.data.userCardCode);
                    });
                });
            }
        }

    },"jsonp");
}
function openwxCard(cardId, userCardCode, callback){
    wx.openCard({
        cardList: [{
            cardId: cardId,
            code: userCardCode
        }],
        success: function (res4) {
            console.log("aaa4:", res4)
            if (typeof callback == 'function') {
                callback(res4);
            }
        },
        fail: function (res4) {
            console.log("aaa44:", res4)
            if (typeof callback == 'function') {
                callback(res4);
            }
        }
    });
}
function gotoUrl(obj){

    var id = obj.data("id");
    var rcid = obj.data("rcid");

    $.post("//"+DIY_JS_SERVER+"/exusers/ajax/ajax_load_api.php",{'mod':'coupon','act':'openwxCard','data': {'id':id,'rcid':rcid}}, function (res) {
        if (res.code == 401) {
            window.location.href = './usercard/u8_login.php';
            return;
        } else if (res.code == 200) {
            window.location.href="//"+DIY_JS_SERVER+"/exusers/coupons/coupons.php?id="+id+"&usercouponid="+rcid;
        } else if (res.code == 201) {
            loadWxJsSdkInfo(function() {
                wx.ready(function () {
                    openwxCard(res.data.cardId, res.data.userCardCode);
                });
            });
        }
    },"jsonp");


}


function getCoupons(){
    // var that = this;
    // var formId = e.detail.formId;
    // var couponid = that.data.couponid;
    // var param = {};
    // param['formId'] = formId;
    // param['id'] = couponid;
    // // param['type'] = 'getCoupons';
    // console.log("param:", param);
    // app.nicebox.api.RequestAPI('coupon', 'submit', param, function (res) {
    //     console.log("hi:", res);
    //     if (res.code == 200) {
    //         var lastid = res.lastid;
    //         app.nicebox.fun.showModal({
    //             content: res.msg,
    //             confirm: function () {
    //                 var gourl = "/pages/common/coupons/coupons?couponid=" + couponid + "&usercouponid=" + lastid;
    //                 app.nicebox.fun.turnToPage(gourl, true);
    //             },
    //             confirmText: '确认'
    //         });
    //
    //     } else if (res.code == 308) {
    //         //需要支付去支付
    //         var order_id = res.order_id;
    //         var gourl = "/pages/common/orders/pay?orderId="+order_id;
    //         app.nicebox.fun.turnToPage(gourl);
    //         return ;
    //     } else if (res.code == 401) {
    //         app.nicebox.fun.showModal({
    //             content: res.msg,
    //             confirm: function () {
    //                 app.nicebox.user.checkLogin();
    //             },
    //             confirmText: '进入登录',
    //             showCancel: true
    //         });
    //         return;
    //     } else {
    //         app.nicebox.fun.showModal({ content: res.msg });
    //     }
    //
    // });
}

function addwxCard(id, callback){

    $.post("//"+DIY_JS_SERVER+"/exusers/ajax/ajax_load_api.php",{'mod':'coupon','act':'addwxCard','data': {'id':id}}, function (res) {

        console.log("info:",res);

        if(res != null) {
            if (res.code == 401) {
                window.location.href = './usercard/u8_login.php';
                return;
            }else if(res.code == 201){
                loadWxJsSdkInfo(function(){
                    var cardExt = '{"timestamp": ' + res.data.timestamp + ',"signature":"' + res.data.signature + '","nonce_str": "' + res.data.nonceStr + '"}'
                    wx.ready(function () {
                        wx.addCard({
                            cardList: [{
                                cardId: res.data.cardId,
                                cardExt: cardExt
                            }],
                            success: function (res2) {
                                console.log("aaa1:", res2)
                                var param = {};
                                param['cardId'] = res2['cardList'][0]['cardId'];
                                param['code'] = res2['cardList'][0]['code'];
                                param['id'] = res.data.id;

                                $.post("//"+DIY_JS_SERVER+"/exusers/ajax/ajax_load_api.php", {
                                    'mod': 'coupon',
                                    'act': 'wxsubmit',
                                    'data': param
                                }, function (res3) {
                                    if(res3 != null) {
                                        console.log("aaa3:", res3);
                                        if (typeof callback == 'function') {
                                            res2.result = res3;
                                            callback(res2);
                                        }else{
                                            if (res3.code == 200) {
                                                openwxCard(res3.cardId, res3.userCardCode);
                                            } else {
                                                if(res.msg != '') alert(res.msg);
                                                return;
                                            }
                                        }
                                    }
                                }, "jsonp");

                            },
                            fail: function (res2) {
                                if (typeof callback == 'function') {
                                    callback(res2);
                                }
                                console.log("aaa2:", res2)
                            }
                        });
                    });
                });
            }else{
                if(isMobile2()){
                    window.location.href="//"+DIY_JS_SERVER+"/coupons/coupons_get.php?idweb="+DIY_WEBSITE_ID+"&id="+id;
                }else{
                    $("#boxName").html("优惠券领取");
                    $("#boxClose").html("×");
                    $("#showiframe").attr("src", "//"+DIY_JS_SERVER+"/coupons/coupons_get.php?idweb="+DIY_WEBSITE_ID+"&id="+id);
                    box.Show({width:'500px',height:'385px'});
                }
            }
        }
    },"jsonp");
}

function loadWxJsSdkInfo(callback){

    if (typeof callback == 'function') {
        callback();
    }else{
        return true;
    }

    /*
    $.post("//"+DIY_JS_SERVER+"/exusers/ajax/ajax_load_api.php",{'mod':'usercard','act':'wxjssdkinfo','data':{'cururl':DIY_CUR_URL}}, function (res) {
        if (res.code == 200) {
            console.log("res:",res);

            var json = {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: ["addCard","openCard"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            }

            wx.config(json);
            if (typeof callback == 'function') {
                callback();
            }
        }
    },"jsonp");
    */
}