(function() {
    var cacheName = 'mywordCache-v1.0';
    self.addEventListener('install', function(e) {
        console.log('[Service Worker installing]');
        var files = ['react-myword.js','sixes.json',
        'app.css',
        'https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js',
        'https://unpkg.com/babel-standalone@6/babel.min.js',
        'https://unpkg.com/react@16/umd/react.development.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.development.js'];

        e.waitUntil(
            caches.open(cacheName).then(
                function(cache) {
                    console.log('[Service Worker] caching all content');
                    return cache.addAll(files);
                })
            );
    });

    self.addEventListener('fetch', function(e) {
        console.log('[Service Worker] Fetched resource '+e.request.url);
        e.respondWith(
            caches.match(e.request).then(function(r) {
                console.log('[Service Worker] Fetching resource: '+e.request.url);
                return r || fetch(e.request).then(function(response) {
                    return caches.open(cacheName).then(function(cache) {
                        console.log('[Service Worker] Caching new resource: '+e.request.url);
                        cache.put(e.request, response.clone());
                        return response;
                    });
                });
            })
        );
    });

})();
