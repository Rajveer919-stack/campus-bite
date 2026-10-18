const C="cb-v1",F=["./","index.html","style.css","app.js","scene3d.js","manifest.webmanifest","icon-192.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{
  const u=e.request.url;
  if(e.request.method!=="GET"||!(u.startsWith(self.location.origin)||/gstatic|cdnjs/.test(u)))return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));
});