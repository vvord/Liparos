// ==UserScript==
// @name           Google Search Results Grid View
// @namespace      vvord@github
// @description    Re-arrange Google search results layout with grid-system-like css
// @include        http://www.google.com/search*
// @include        https://www.google.com/search*
// @include        http://google.com/search*
// @grant          GM_addStyle 
// ==/UserScript==

//Add css here.
GM_addStyle( " \
    #cnt { \
        max-width:100%; \
    } \
   .mw { \
        max-width: none !important; \
    } \
    #ires>ol li.g { \
        background-color:white; \
        position:relative; \
        float:left; \
        display:inline-block; \
        min-height:125px; \
        height:135px; \
        margin:0.25% 0.5% 0.25% 0.5% !important; \
        overflow:hidden; \
    } \
    li.currency, li.new_rhs_block, li.tpo { \
        //display:block !important; \
        min-height:200px !important; \
    } \
    #ires>ol li.g:hover { \
        z-index:99; \
        background-color:none; \
        overflow:visible; \
        word-wrap:break-word; \
    } \
    #ires>ol li.g:hover>* { \
        z-index:999; \
        background-color:whitesmoke; \
    } \
    #ires>ol li.g:hover>.vsc { \
        margin:-11px; \
        padding:10px; \
        border-radius:5px; \
        -moz-border-radius:5px; \
        border:1px solid silver; \
    } \
    #ires>ol li.g:hover>.vsc+div { \
        position:relative; \
        margin:10px -11px -11px -11px; \
        padding:10px 10px 10px 10px; \
        border-radius:5px; \
        -moz-border-radius:5px; \
        border:1px solid silver; \
    } \
    #ires>ol li.g:hover>.mbl+.med, #ires>ol>li.g>.mbl+.med:hover { \
        background-color:white; \
        position:relative; \
        margin:10px -11px -11px -11px; \
        padding:10px 10px 10px 10px; \
        border-radius:5px; \
        -moz-border-radius:5px; \
        word-wrap:normal; \
        border:1px dashed silver; \
    }     \
    #ires>ol li.g>.mbl+.med .std *{ \
        margin:0 !important; \
    } \
    #ires .kv  {\
        height:34px !important;\
    }\
    div.clear { \
        clear:both; \
    } \
    .videobox { \
        padding-bottom:0px !important; \
    } \
    .videobox:hover { \
        padding-bottom:0px; \
    } \
    #center_col, #footerbox { \
        /*width:100% !important; \
        */padding-left:0px; \
        padding-right:3px;/*1725px;*/ \
        margin-right:auto; \
    } \
    #rcnt .col { \
        width: auto !important; \
    } \
    #center_col { \
        margin-left: 0 !important; \
        padding-left: 1% !important; \
        padding-right: 1% !important; \
        width: 98% !important; \
    }\
    .f.kv { \
        white-space: normal !important; \
    }\
    #res { \
        padding-left:0px; \
        padding-right:0px; \
    } \
    #rhs { \
        /*position:relative; \
        margin-left:212px !important; \
        */} \
");

var grids = 6;  //Set numbers of grids per row.
var gridsMargin = 0.5;
var gridWidth = 99 / grids - 2 * gridsMargin;
GM_addStyle('#ires>ol li.g {width:'+ gridWidth.toString() +'%;}');
GM_addStyle('#ires>ol li.currency {width:'+ (gridWidth*2 -2 * gridsMargin).toString() +'% !important;}');
GM_addStyle('#ires>ol li.new_rhs_block {width:'+ (gridWidth*2 +2 * gridsMargin).toString() +'% !important;}');
GM_addStyle('#kno-result {width:100% !important; height: 250px !important;}');
GM_addStyle('#ires>ol li.tpo {width:'+ (gridWidth*2 +2 * gridsMargin).toString() +'% !important;}');
GM_addStyle('#ires>ol li.g .r a {max-width:'+ gridWidth.toString()-5 +'%;}');
//Insert a "clear" div before <div id="foot">.
var foot, clearDiv;
foot = document.getElementById('foot');
if (foot) {
    clearDiv = document.createElement('div');
    clearDiv.className='clear';
    foot.parentNode.insertBefore(clearDiv, foot);
}

if(2 <= document.querySelectorAll("#rhs_block")[0].childElementCount) {
//if #rhs_block contains not only <script>
    var rsoNode = document.getElementById( "rso");
    var newLiG= document.createElement( "li" );
    newLiG.className = "g new_rhs_block"; 
    newLiG.appendChild(document.querySelectorAll("#rhs_block")[0]);
    rsoNode.insertBefore( newLiG, rsoNode.firstChild)
}
//Modify imagebox, newsbox, videobox, 
/*imageBox = document.getElementById('imagebox');
if (imageBox) {
    boxWrapper = document.createElement('div');
    boxWrapper.className='boxWrapper';
    
    imageBox.replaceChild(boxWrapper, imageBox);
}
*/
//Modify all <li class ="g" > styles.
//var allLis, thisLi;


//allLis = document.querySelectorAll("li .g[style*="marginLeft"] ");

// allLis = document.evaluate(
// //    "//li[(@class='g' or @class='g w0' )and @style='margin-left: 16px;']",
    // "//li[@class='g' or @class='g w0']",
    // document,
    // null,
    // XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    // null);
// for (var i = 0; i < allLis.snapshotLength; i++) {
    // thisLi = allLis.snapshotItem(i);
    // //Remove margin-left of some <li class="g">s with "margin-left: 16px" style. and add some other styles to them.
    // if(thisLi.style.marginLeft == '16px') {
        // thisLi.style.marginLeft = '2px';
        // thisLi.style.borderLeft = '1px black dotted';
    // }
// /*  Of no use currently.
    // //On mouseover
    // thisLi.addEventListener('mouseover', function(event) {
      // //this.style.overflow = 'visible';
      // //this.style.height='auto';
      // //this.style.border='1px gray dashed';
    // }, false);
    
    // //On mouseout
    // thisLi.addEventListener('mouseout', function(event) {
      // //this.style.overflow = 'hidden';
      // //this.style.height='150px';
      // //this.style.border='none';
    // }, false);
// */
// }
