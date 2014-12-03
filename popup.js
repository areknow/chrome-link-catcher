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





function paintDiv(text) {
    $('#link-container').html(text);
}
function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}


$(document).ready(function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var link = tabs[0].url;
        
        
//        var links = ["test1","test2","test3","test4"];
//        var stack ="";
//        jQuery.each(links, function(i, val) {
//            stack += val + "<br />";
//        });
//        
//        paintDiv(stack);
        
        DOMtoString(document);
    });
});