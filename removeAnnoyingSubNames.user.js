// ==UserScript==
// @name        removeAnnoyingSubNames
// @namespace   vvord@github
// @include     http://hdwing.com/browse.php*
// @include     http://chdbits.org/torrents.php*
// @include     http://totheglory.im/browse.php*
// @include     https://hdwing.com/browse.php*
// @include     https://chdbits.org/torrents.php*
// @include     https://totheglory.im/browse.php*
// @grant       GM_addStyle 
// @version     0.2
// ==/UserScript==
/*Changelog
0.2 some minor changes.
*/
var siteName, torrentList;
siteName = document.location.host;
if( siteName == "chdbits.org" )
{
    torrentList = document.querySelectorAll(".torrentname .embedded:nth-of-type(1)");
    removeTextNodes(torrentList);
}
if( siteName == "hdwing.com" )
{
    //torrentList = document.getElementsByClassName("man_link");
    //removeTextNodes(torrentList);
    GM_addStyle('\
        .mctitle { \
            display: none !important; }\
    ');
}
if( siteName == "totheglory.im" )
{
    torrentList = document.querySelectorAll(".name_left a b");
    removeTextOrSpanNodesforTTG(torrentList);
    torrentList = document.querySelectorAll(".name_left a b font");
    removeTextOrSpanNodesforTTG(torrentList);
}

function removeTextNodes( nodesList )
{

    for( var i = 0 ; i < nodesList.length; i++ )
    {
        for( var j = nodesList[i].childNodes.length - 1; j > 0; j-- )
        {
            if( (nodesList[i].childNodes[j].nodeType == 3) )
            {
                nodesList[i].removeChild(nodesList[i].childNodes[j]);
            }
        }
    }
}
function removeTextOrSpanNodesforTTG( nodesList )
{
    for( var i = 0 ; i < nodesList.length; i++ )
    {
     var bTagNew = /\u0028\u65B0\u0029/.test(nodesList[i].childNodes[0].textContent);
        for( var j = nodesList[i].childNodes.length - 1; j > (bTagNew ? 1:0); j-- )
        {
            var indexBR=0;
            //if( /^BR$/i.test( nodesList[i].childNodes[j].nodeName ) ) indexBR = j;
            if( ((nodesList[i].childNodes[j].nodeType == 3) && (j >= indexBR)) || (/^SPAN$/i.test( nodesList[i].childNodes[j].nodeName)) )
            {
                nodesList[i].removeChild(nodesList[i].childNodes[j]);
                //j--;
            }
        }
    }
}
// for( var i = 0 ; i < torrentList.length; i++ )
// {
        // for( var j = 0; j < torrentList[i].childNodes.length; j++ )
        // {
            // if( torrentList[i].childNodes[j].nodeType == 3 )
            // {
                // torrentList[i].removeChild(torrentList[i].childNodes[j]);
            // }
        // }
// }
