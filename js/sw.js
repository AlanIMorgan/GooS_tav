const cacheName = 'v1_cache_goostav';

urlsToCache = [
    './',
    './img/google.ico',
    './css/style.css',
    './js/nav.js',
    './js/search.js'
]

self.addEventListener('install', e=>{

    e.waitUntil(

        caches.open(cacheName)
        
        .then((cache)=>{

            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de caché', err))
    );
});

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
});