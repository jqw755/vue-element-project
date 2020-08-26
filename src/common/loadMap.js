// 异步创建script引入高德地图js
export default function mp(key) {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(1)
        };
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//webapi.amap.com/maps?v=1.4.15&key=" + key + "&callback=init";
        script.onerror = reject;
        document.head.appendChild(script);
    })
}