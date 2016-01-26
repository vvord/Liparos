// ==UserScript==
// @name        autoPtSitesBonusSignIn
// @namespace   vvord@github
// @include     http://totheglory.im/*
// @include     http://hdwing.com/*
// @include     https://totheglory.im/*
// @include     https://hdwing.com/*
// @version     0.1.3
// @grant       none
// ==/UserScript==


//v0.1.3 a temporary workaround for the slow initiation of jquery in hdw due to the poor performance & coding of the site. to trigger autosignin sooner, codes needs to be rewritten.
//v0.1.2 signed data now is inserted before 'a[href="myset.php?action=mybonus"]'
//v0.1.1 hdw bonus auto sign-in codes changed.

//console.log(jQuery.fn.jquery);
var siteName = document.location.host;
try
{
    if("hdwing.com" == siteName )
    {
        /* wait till the content of the page is fully loaded. since codes below used jquery, 
           if triggered too early, it will result a reference error of jquery. 2 solutions: 
           1) rewrite the code, get rid of jquery; or 2) add @require jquery.js.
           the waiting can be sometime unbearable ... 
        */
        window.addEventListener("load", 
        function (event) 
        {
            hdwBonusAutoSignIn();
        });    
    }
    else if( "totheglory.im" == siteName )
    {
        ttgBonusAutoSignIn();
    }
}
catch (err)
{
    console.log("Error: ", err);
}
//---------------------------
function hdwBonusAutoSignIn()
{
    if(jQuery)
    {
        var signLink = document.getElementById("sign_button");
        if(signLink && signLink.value !="\u5DF2\u7B7E\u5230" )
        {
            //get the source code of bonus click function as follows:
            /* var signajax = $.ajax({
             *        type: "POST",
             *        url: "/usersign.php",
             *        data: { hash:"VVpdXLa/" }
             *      })
             *  .done(function(data) { 
             *      var rd = data.split("|");
             *      if(rd.length&lt;3||parseInt(rd[0])&lt;1){
             *          var msg  ="";
             *          if(parseInt(rd[0])==-1)msg="，请稍后再试";
             *          if(parseInt(rd[0])==-2)msg="，今天已经签到了？";
             *          alert("数据无效"+msg);
             *      }else{
             *          alert("第"+rd[4]+"个签到成功，已经连续签到"+rd[1]+"天，赠送积分"+rd[2]+",明天继续签到可赠送"+rd[3]+"分");
             *      }
             *      $("#sign_button").attr('class','signed');
             *  }).fail(function(data) { alert("签到错误"); })
             */
            //instead of using $.data, get all <script> nodes that do not have src attributes.
            //this ...is dumb. 
            var ss = document.querySelectorAll("script:not([src])");
            for (let i of ss)
            {
                //get the hash value for later use.
                var ma = /hash:"([^"]+)/g.exec(i.textContent);
                if(ma) break;
            }
            //console.log(ma[0]);
            //ma = [];
            //ma[1] = "00000";
            // ---------------
            var siPostData = {hash: ma[1]};
            var bonusInfo = "";
            var silentNotification = function (info)
                {
                    //var ap =  document.querySelector('#hdw_skin');
                    var ap =  document.querySelector('a[href="myset.php?action=mybonus"]');
                    var sp = document.createElement("span");
                    sp.innerHTML = info + " ";
                    ap.parentNode.insertBefore(sp, ap);
                    //alert(data);
                }
            var signajax = $.ajax(
            {
                type: "POST",
                url: document.location.origin + "/usersign.php",
                data: siPostData
            })
            .done( function (data)
            { 
                var rd = data.split("|");
                //console.log(rd);
                if(rd.length < 3 || parseInt(rd[0]) < 1)
                {
                    //var msg  ="";
                    if(parseInt(rd[0])==-1) bonusInfo = "\u7B7E\u5230\u9519\u8BEF";
                    if(parseInt(rd[0])==-2) bonusInfo = "\uFF0C\u4ECA\u5929\u5DF2\u7ECF\u7B7E\u5230\u4E86\uFF1F";
                    bonusInfo = "\u6570\u636E\u65E0\u6548" + bonusInfo;
                    //alert(bonusInfo);
                    silentNotification(bonusInfo);
                }
                else
                {
                    bonusInfo = "\u7B2C" 
                        + rd[4] + "\u4E2A\u7B7E\u5230\u6210\u529F\uFF0C\u5DF2\u7ECF\u8FDE\u7EED\u7B7E\u5230" 
                        + rd[1] + "\u5929\uFF0C\u8D60\u9001\u79EF\u5206"
                        + rd[2] + "\uFF0C\u660E\u5929\u7EE7\u7EED\u7B7E\u5230\u53EF\u8D60\u9001"
                        + rd[3] + "\u5206";
                    silentNotification(bonusInfo);
                }
                $("#sign_button").attr('class','signed').hide();
            })
            .fail( function (data)
            {
                bonusInfo = "\u7B7E\u5230\u9519\u8BEF"; 
                silentNotification(bonusInfo);
            });
            //alert(bonusInfo);
        }
    }
    else
    {
        throw "jQuery is not loaded."
    }
}
//---------------------------
function ttgBonusAutoSignIn()
{
    if(jQuery)
    {
        /*
        $(window).load(function(){
            console.log(jQuery.fn.jquery);
            console.log($._data.toSource());
            $('a[href="/index.php"]').attr("href","javascript:void(0);").click( function() { 
            console.log($._data($("#signed")[0], "events" ));
            console.log($.hasData($("#signed")[0]));
            console.log($("#signed"));
            });
        });
        */
        //first if there is a sign-in link, which means you are yet to sign in.
        var signLink = document.getElementById("signed");
        if(signLink)
        {
            //get the source code of bonus click function as follows:
            /* 
             *  $("a#signed").click(function(){
             *      $.post("signed.php", {signed_timestamp: "0000000", signed_token: "abcdef0000"}, function(data) {
             *          $('#sp_signed').html("<b style=\"color:green;\">已签到</b>");
             *          alert(data);
             *      });
             */
             
            //jQuery._data or jQuery.data either seem not working as expected. 
            /*
            var si = jQuery._data(document.getElementById("signed")).events.click[0].handler.toString();
            var si = $("#signed").data("events").click[0].handler.toString();
            */
            
            //instead of using $.data, get all <script> nodes that do not have src attributes.
            //this is a dumb workaround.
            var ss = document.querySelectorAll("script:not([src])")
            for (let i of ss)
            {
                //get the time_stamp and token for later use.
                var ma = /signed_timestamp: "(\d+)", signed_token: "([\da-f]+)"/g.exec(i.textContent);
                if(ma) break;
            }
            //console.log(ma[0]);
            var siPostData = {signed_timestamp: ma[1], signed_token: ma[2]};
            $.post( document.location.origin +"/signed.php", siPostData, function (data) 
            {
                $('#sp_signed').html("<b style=\"color:green;\">\u5DF2\u7B7E\u5230</b>");
                //append returned data after this element
                var ap =  document.querySelector('a[href="/mybonus.php"]');
                var sp = document.createElement("span");
                sp.innerHTML = data;
                ap.parentNode.appendChild(sp);
                //alert(data);
            });
        }
    }
    else
    {
        throw "jQuery is not loaded."
    }
}
//---------------------------
