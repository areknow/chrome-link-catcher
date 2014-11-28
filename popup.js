// pop links in new tabs
window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
        chrome.tabs.create({url:e.target.href})
    }
})


// pass urls to php script get links back
function getLinks(url) {
    var data = {URL: url};
    $.post('http://localhost:8888/scripts/linkcatcher.php', data, function(returnedData) {
        $('#link-container').html(returnedData);
    });
}


// after load: pass tab url to getLinks()
$(document).ready(function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        getLinks(url);
    });
});