/**
 * Created by Chaiyunfeng on 2017/7/27.
 */
var LoadMore = (function () {
    var screenY = 0,
        cursor = 0;
    function LoadMore(content, loading) {
        this.content = content;
        this.loading = loading;
    }
    LoadMore.prototype = {
        constructor : LoadMore,
        scrollEvent : function () {
            screenY = document.body.scrollHeight - document.body.scrollTop;
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (screenY <= windowHeight) {
                requestData(this);
            }
        }
    };
    function requestData(o) {
        var request = new XMLHttpRequest();
        request.open('get', '../sentData.php');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                showData(o.content, request.responseText);
            }
        }
    }
    function showData(content, data) {
        var fragment = document.createDocumentFragment(),
            text = JSON.parse(data);
        if (text) {
            for (var i in text) {
                var div = document.createElement('div');
                if (text.hasOwnProperty(i)){
                    div.innerHTML = text[i];
                    fragment.appendChild(div);
                }
            }
            content.appendChild(fragment);
        }
    }
})();