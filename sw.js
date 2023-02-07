const CACHE_NAME = `my-sample-app-cache-v1`;

urlsToCache = [
    './',
    './css/style.css',
    './js/nav.js',
    './js/search.js',
    './bookmarks/bookmarks.html',
    './calendar/index.html',
    './karaoke/index.html',
    './matrix/index.html',
    './img/wp.png'
]

// Use the install event to pre-cache all initial resources.

self.addEventListener('install', event => {

    event.waitUntil((async () => {

        const cache = await caches.open(CACHE_NAME);

        cache.addAll(urlsToCache);
    })());
});

self.addEventListener('activate', (e) => {

    e.waitUntil(caches.keys().then((keyList) => {

        return Promise.all(keyList.map((key) => {
        
            if (key === CACHE_NAME) { return; }

            return caches.delete(key);
        }));
    }));
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