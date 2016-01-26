// ==UserScript==
// @name        shittyHDWThemeKill
// @namespace   hdwSysOpSucks
// @include     http://hdwing.com/*
// @include     https://hdwing.com/*
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @grant       GM_listValues 
// @version     1.0.1
// ==/UserScript==

/* Changelog
v1.0.1
adds a list view toggle button to the navigation bar.
and the version number jumps to 1.0, due to some version confusion.
*/

//menu to reset all gm settings.
GM_registerMenuCommand("Reset settings", resetSettings);
function resetSettings()
{
    console.log(GM_listValues().length);
    if(GM_listValues().length > 0)
    //if exist any settings, remove them.
    {
        var keys = GM_listValues();
        for (var i=0, key=null; key=keys[i]; i++)
        {
            console.log(key);
            GM_deleteValue(key);
        }
    }
}

//if there's a reset theme link, click it.
var resetThemeLink = document.querySelectorAll('#head-table .smallfont a[href^="resettheme.php"]');
if (resetThemeLink.length > 0) resetThemeLink[0].click();

//here injects css hacking codes.
GM_addStyle('\
    body {\
        background: #f2f2f2 !important;\
        font-weight:lighter !important;}\
    #top_box, .topnav_fix.scroll-to-fixed-fixed {\
        background:#333333 !important;}\
    .metitle, .mctitle, .topnav_x, .grd-page span.requestx, .btnd, .pagination ul > li, .torlistd s,\
    .seeddown span, .tor_imdbx  {\
        font-family:inherit !important;\
        font-weight:inherit !important;}\
    .grd-torlist-upn, .grd-torlist-up, .grd-torlist-upo, .grd-torlist {\
        border: 0 !important;}\
    .torlistd {\
        margin: 0 !important;\
        padding: 5px;}\
    .torlistd:nth-child(odd) {\
        background: #eeeeee;}\
    .torlistd:nth-child(even) {\
        background: #f6f6f6;}\
    .torlistd:hover {\
        background: linear-gradient(to bottom, #f1f1f1 0%, #e5e5e5 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);}\
    .ciconx img {\
        width:100%;\
        border-radius: 6px;}\
    b, strong {\
        font-weight: normal !important;}\
    .seeddown span, .label-torseed {\
        background-color: transparent !important;}\
    .irightlink {\
        display: none !important;}\
    .corner_b, .corner_t, .b_shadow {\
        border-radius: 0px !important; }\
    .scbar_icon_td, .scbar_txt_td, .scbar_type_td, .scbar_btn_td, .btnd {\
        background: none !important;}\
    .scbar_icon_td {\
        width: 25px !important;}\
    #searchbox, #scbar_btn, .scbar_hot_td>a {\
        border: 1px solid #ccc !important;\
        border-radius: 2px !important;\
        padding: 1px 10px 2px !important;\
        }\
    #searchbox, #scbar_btn {\
    }\
    #searchbox, #scbar_btn, .scbar_hot_td > a {\
        height: 23px !important;\
        margin-top: 3px !important;\
        line-height: 28px !important;\
        padding: 1px 10px 2px !important;}\
    .scbar_hot_td > a {\
        display: inline-block;}\
    #scbar_btn {\
        width: 75px !important;\
        height: 28px !important;\
        margin-left: 10px !important;}\
    #sort_bar {\
        border-radius:0 !important;}\
    .pagination li {\
        display: block;\
        float: left;\
        margin-left: 10px;\
        padding-left: 10px;}\
    .pagination li:nth-child(n+3) {\
        border-left: 1px silver solid;\
        }\
    .pagination li.disabled {\
        display: none;}\
');

//changes the torrent list to compact view if the setting is true.
var bCompactList = GM_getValue("bCompactList", false);
if(bCompactList)
{
    hideMctitle();
    shrinkRowHeight();
}
//console.log(bCompactList);


//appends a toggle button to nav bar.
//<a href="myset.php"><i class="icon-cogs"></i>设 置</a>
var aMySet = document.querySelector('a[href="myset.php"]');
var compactA = document.createElement("a");
compactA.id = "compact_list_toggle";
compactA.href = "javascript:void(0);";

function listStyleToggle (bCompactList)
{
    var toggleIconClassName = !bCompactList ? "icon-circle" : "icon-circle-blank" ;
    var toggleText = !bCompactList ? "Compact List": "Original List";
    var toggleIcon = document.createElement("i");
    toggleIcon.className=toggleIconClassName;
    compactA.innerHTML= "";
    compactA.appendChild(toggleIcon);
    compactA.appendChild(document.createTextNode(toggleText));
}
listStyleToggle (bCompactList);
aMySet.parentNode.insertBefore(compactA, aMySet.nextSibling);

//functions used for the toggle button
function shrinkRowHeight()
{
    GM_addStyle('\
    .thirdline { \
        float:left;\
        border: 0;\
        margin-left: 80px;\
        margin-top:-25px;}\
    .mypro2 {\
        margin-top:0 !important;}\
    ');
}
function resetRowHeight()
{
    GM_addStyle('\
    .thirdline { \
        float:none;\
        border-top: 1px dashed #d9d9d9;\
        margin-left: 0;\
        margin-top:2px;}\
    .mypro2 {\
        margin-top:3px !important;}\
    ');
}
function hideMctitle()
{
    GM_addStyle('\
        .mctitle { \
            display: none !important; }\
    ');
}
function showMctitle()
{
    GM_addStyle('\
        .mctitle { \
            display: inline-block !important; }\
    ');
}
function checkMctitleDisplayValue()
{
    //check if the display property of class .mctitle is set to none, which means
    //the chinese subname is hidden.
    var spanMctitle = document.querySelector('.mctitle');
    var spanMctitleDisplay = window.getComputedStyle(spanMctitle, null).getPropertyValue('display');
    var dis = true;
    if ( "none" == spanMctitleDisplay)
        dis = false;
    return dis;
}

//binds the click function to the toggle button
compactA.onclick = function() {
    bCompactList = GM_getValue("bCompactList", false);
    if(!bCompactList)
    {
        hideMctitle();
        shrinkRowHeight();
    }
    else
    {
        showMctitle();
        resetRowHeight();
    }
    bCompactList = !bCompactList;
    GM_setValue("bCompactList", bCompactList);
    listStyleToggle (bCompactList);
    //console.log(GM_getValue("bCompactList"));
}