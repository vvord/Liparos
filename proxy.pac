var urlPatterns = [
    /https?:\/\/(?:[\w\-]+\.)*(?:google)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)?(?:twitter|twimg|amazonaws)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:youtube|ytimg|googlevideo)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:bit|cl|img|ow|post)\.ly\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:facebook)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:vimeo)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)?(?:imdb)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:nytimes|nyt)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:cnn)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)?(?:youtu)\.be\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:instagram|path)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:blogspot|blogger)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:fbcdn)\.net\/.*/,
    /https?:\/\/(?:[\w\-]+\.)?(?:imgur)\.com\/.*/,
    "*://t.co/*",
    "*.googleusercontent.com/*",
    "*://*.wordpress.com/*",
    "*://youtube.googleapis.com/*",
    "*.danwei.org/*",
    "*.xys.org/*",
    "*.bbc.co.uk/*",
    "*.wikisource.org/*",
    "http://chinadigitaltimes.net/*",
    "*://feeds.feedburner.com/*",
    /https?:\/\/(?:[\w\-]+\.)*(?:d)\.pr\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:wenxuecity|mitbbs)\.com\/.*/,
    /https?:\/\/(?:[\w\-]+\.)*(?:mobile01\.com|google\.com\.tw)\/.*/,
    /https?:\/\/(?:[\w\-]+\.)?(?:twitpic|yfrog)\.com\/.*/,
    "http://ff.im/*"
];

function FindProxyForURL(url, host) {
    if (loopUrlPatternMatch(url, urlPatterns)) 
    {
        return "PROXY 192.168.1.3:20081";
    }
    return "DIRECT";
}

function loopUrlPatternMatch(url, patterns) {
    var isMatched = false;
    var i = 0;
    while (!isMatched && (i < patterns.length)) {
        isMatched = ((patterns[i] instanceof RegExp)?patterns[i].test(url):shExpMatch(url, patterns[i])) || isMatched;
        //N.B.: shExpMatch is limited to wildcards in IE. ref: http://support.microsoft.com/kb/274204 
        i++;
    }
    return isMatched;
}

