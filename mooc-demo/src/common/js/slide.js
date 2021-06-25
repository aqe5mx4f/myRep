export function slideTitle(title) {
    var title = JSON.parse(JSON.stringify(title))
    var titleTime
    var setNull = true
    window.clearInterval(titleTime)
    titleTime = setInterval(function() {
        title = title.slice(1) + title.substr(0, 1)
        document.title = title;
    }, 1000)
    document.addEventListener('visibilitychange', function() {
        window.clearInterval(titleTime);
        if (document.hidden) {
            document.title = '(つェ⊂)我藏好了哦~ ';
        } else {
            document.title = '(*´∇｀*) 被你发现啦~ ';
            titleTime = setInterval(function() {
                document.title = !setNull ? title : ''
                setNull = false
                if (!setNull) {
                    title = title.slice(1) + title.substr(0, 1)
                    document.title = title;
                }
            }, 1000);
        }
    })
}