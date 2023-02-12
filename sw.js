const cacheName = `cache-v1`;

urlsToCache = [
    './',
    './css/style.css',
    './js/nav.js',
    './js/search.js',
    './sites_list/sites_list.html',
    './matrix/index.html',
    './img/wp.png'
]

// Use the install event to pre-cache all initial resources.

this.addEventListener("install", (event) => {

    event.waitUntil(
        
        caches

        .open("cache-v1")
        
        .then((cache) => cache.addAll(urlsToCache))
    );
});

// Upgrade cache

globalScope.addEventListener('activate', (event) => {

    const cacheAllowlist = ['cache-v2'];

    event.waitUntil(

        caches.forEach((cache, cacheName) => {

            if (!cacheAllowlist.includes(cacheName)) {

                return caches.delete(cacheName);
            }
        })
    );
}); 

self.addEventListener("fetch", (event) => {

    // Let the browser do its default thing

    if (event.request.method !== "GET") return; // For non-GET requests.

    event.respondWith( // Prevent the default, and handle the request ourselves.

        (async () => { // Try to get the response from a cache.

            const cache = await caches.open("dynamic-v1");

            const cachedResponse = await cache.match(event.request);

            if (cachedResponse) { // If we found a match in the cache, return it, but also update the entry in the cache in the background.

                event.waitUntil(cache.add(event.request));

                return cachedResponse;
            }

            // If we didn't find a match in the cache, use the network.
            return fetch(event.request);
        })()
    );
});
