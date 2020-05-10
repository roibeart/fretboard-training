const currentVersion = "fretboard-learning-v1.22"
const assets = [
    "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/nosleep/0.6.0/NoSleep.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/vexflow/3.0.9/vexflow-min.js",
    "/",
    "/index.html",
    "/css/main.css",
    "/js/constants.js",
    "/js/functions.js",
    "/js/main.js",
    "/images/icon.png"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(currentVersion).then(cache => {
            cache.addAll(assets)
        })
    )
})

// https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#updates
self.addEventListener('activate', event => {
    // delete the old cache
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key != currentVersion) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            //console.log('new version now ready to handle fetches!');
        })
    );
});


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})
