const cacheName = 'cache-v1';

urlsToCache = [
    './',
    './css/style.css',
    './js/nav.js',
    './js/search.js',
    './matrix/index.html',
    './calculator/index.html',
    './chess/index.html'
]

// Use the install event to pre-cache all initial resources.

this.addEventListener("install", (event) => {

    event.waitUntil(
        
        caches

        .open(cacheName)
        
        .then((cache) => cache.addAll(urlsToCache))
    );
});

// Upgrade cache

self.addEventListener('activate', (event) => {

    const cacheAllowlist = [cacheName];

    event.waitUntil(
 
        caches.forEach((cache, cacheName) => {
 
            if (!cacheAllowlist.includes(cacheName)) {
 
                return caches.delete(cacheName); 
            } 
        }) 
    ); 
});

self.addEventListener("fetch", (event) => {

    event.respondWith((async () => {

        const cache = await caches.open(cacheName);

        try { // Try to fetch the resource from the network.

            const fetchResponse = await fetch(event.request);

            // Save the resource in the cache.

            cache.put(event.request, fetchResponse.clone());

            // And return it.

            return fetchResponse;
        }

        catch (e) { // Fetching didn't work get the resource from the cache.

            const cachedResponse = await cache.match(event.request);

            // And return it.

            return cachedResponse;
        }
    })());
});