// this means ServiceWorkerGlobalScope
const cacheSupported = () => {
    if("caches" in this){
        return true;
    }else{
        alert("cache storage not supported in your browser");
        return false;
    }
}
this.addEventListener("install",(e) => {
    if(cacheSupported()){
        e.waitUntil(
            caches.open("github_udata").then((cache) => {
                cache.addAll([
                    "/",
                    "/users",
                    "bookmarks",
                    "/manifest.json",
                    "/static/js/main.9afde5d4.js"
                ])
            })
            .catch(err => console.error(`caches storage custome error 1 = ${err}`))
        )
    }
});
this.addEventListener("fetch",(e) => {
    if(cacheSupported() && !navigator.onLine){
        e.respondWith(
            caches.match(e.request).then(data => {
                if(data){
                    return data;
                }else{
                    return fetch(e.request.clone());
                }
            }).catch(err => console.error(`caches storage custome error 2 = ${err}`))
        )
    }
})