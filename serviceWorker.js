const staticFretboardTraining = "fretboard-learning-v1"
const assets = [
    "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/nosleep/0.6.0/NoSleep.min.js",
    "/",
    "/index.html",
    "/css/main.css",
    "/js/functions.js",
    "/js/main.js",
    "/images/icon.png"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticFretboardTraining).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})