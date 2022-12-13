const CACHE_NAME = 'v1_cache_goostav',
urlsToCache = [
    '/',
    'img/google.ico',
    'css/style.css',
    'js/nav.js',
    'js/search.js'
]

self.addEventListener('install', e=>{

    e.waitUntil(

        caches.open(CACHE_NAME)
        
        .then(cache=>{

            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de caché', err))
    );
});

self.addEventListener('active', e=>{

    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(

        caches.keys()
        .then(cacheNames => {

            cacheNames.map(cacheName=>{

                if (cacheWhiteList.indexOf(cacheName) === -1) {

                    return caches.delete(cacheName);
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
});