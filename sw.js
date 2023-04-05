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

    self.addEventListener('fetch', event => {
        if (event.request.method === 'POST' && event.request.url.includes('/share-target')) {

            event.respondWith(handleShare(event.request));
        }
    });

    async function handleShare(request) {

        const formData = await request.formData();

        const sharedData = formData.get('sharedData');

        // Procesar los datos compartidos aquí
        

        return Response.redirect('/?' + sharedData);
    }
});
