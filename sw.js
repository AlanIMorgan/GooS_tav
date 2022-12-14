const CACHE_NAME = `my-sample-app-cache-v1`;

urlsToCache = [
    './',
    './img/google.ico',
    './css/style.css',
    './js/nav.js',
    './js/search.js'
] /* 

self.addEventListener('install', e=>{

    e.waitUntil(

        caches.open(cacheName)
        
        .then((cache)=>{

            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de caché', err))
    );
}); */

// Use the install event to pre-cache all initial resources.

self.addEventListener('install', event => {

    event.waitUntil((async () => {

        const cache = await caches.open(CACHE_NAME);

        cache.addAll(urlsToCache);
    })());
}); /* 

self.addEventListener('active', e=>{

    const cacheWhiteList = [cacheName];

    e.waitUntil(

        caches.keys()
        .then(cacheNames => {

            cacheNames.map(cacheName_two =>{

                if (cacheWhiteList.indexOf(cacheName_two) === -1) {

                    return caches.delete(cacheName_two);
                }
            })
        })

        .then(()=> self.clients.claim())
    );
});

self.addEventListener('fetch', e=>{

    e.respondWith(

        caches.match(e.request)
        .then(res => {

            if (res) {

                return res;
            }

            return fetch(e.request);
        })
    );
}); */

self.addEventListener('fetch', event => {

    event.respondWith((async () => {

        const cache = await caches.open(CACHE_NAME);

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