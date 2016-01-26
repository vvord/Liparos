// ==UserScript==
// @name           AddOtherSearchEnginesToGoogle
// @namespace      vvord@github
// @include        http://www.google.com/search*
// @include        https://www.google.com/search*
// ==/UserScript==



var resDiv = document.getElementById('resultStats'); // Links will be appended inside this div.
var searchTerm = document.getElementById('gbqfq'); // Where the searchbox is.
var oldTheme = document.getElementById('sfcnt'); // In the new UI, this div is not displayed.
var splitter = document.createTextNode(' | '); 
var encodedSearchTerm = encodeURIComponent(searchTerm.value); // Encode characters like , / ? : @ & = + $ #
//window.alert("0");

//if ( oldTheme.style.display == '' || oldTheme.style.display == 'none' ) searchTerm = document.getElementById('gbqfq'); // Where the searchbox is in a new UI.
//window.alert("1");
resDiv.innerHTML +=' | Search it on ';
var wolframAlpha = document.createElement('a'); // Add a link to Wolfram Alpha. Should be rewritten.
wolframAlpha.setAttribute('href', 'http://www.wolframalpha.com/input/?i='+ encodedSearchTerm);
wolframAlpha.innerHTML = 'Wolfram Alpha';
resDiv.appendChild(wolframAlpha);
resDiv.innerHTML +=' | ';
//window.alert("2");

var enWikipedia = document.createElement('a'); // Add a link to English Wikipedia
enWikipedia.setAttribute('href', 'http://en.wikipedia.org/wiki/Special:Search?search='+ encodedSearchTerm+'');
enWikipedia.innerHTML = 'Wikipedia (en)';
resDiv.appendChild(enWikipedia);
resDiv.innerHTML +=' | ';

var zhWikipedia = document.createElement('a'); // Add a link to Chinese Wikipedia
zhWikipedia.setAttribute('href', 'http://zh.wikipedia.org/wiki/Special:Search?search='+ encodedSearchTerm+'');
zhWikipedia.innerHTML = 'Wikipedia (zh)';
resDiv.appendChild(zhWikipedia);
resDiv.innerHTML +=' | ';

var addQuotes = document.createElement('a'); // Add a feature that put quotation marks around the keywords.
addQuotes.onclick = function () {
	if( !/^\".*\"$/.test(searchTerm.value) ) {
		searchTerm.value = '"' + searchTerm.value +'"';
		}
    searchTerm.focus(); // See the double quotes instantly... just a workaround.
    return false;
    };
addQuotes.setAttribute('href', '#');
addQuotes.innerHTML = 'Add Quotes';
resDiv.appendChild(addQuotes);
//resDiv.innerHTML +=' | '; doesn't work here.
resDiv.appendChild(splitter);
//Since .innerHTML manipulation will destory event handlers previously created, 
//document.createTextNode('|') is appended here.
var prefixDefine = document.createElement('a'); // Add a feature that prefixes the keyword with "define:"
prefixDefine.onclick = function () {
	if( !/^define:/.test(searchTerm.value) ) {
		searchTerm.value = 'define:' + searchTerm.value;
		}
    searchTerm.focus(); // See the double quotes instantly... just a workaround.
    return false;
    };
prefixDefine.setAttribute('href', '#');
prefixDefine.innerHTML = 'Define';
resDiv.appendChild(prefixDefine);