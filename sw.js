/* Service worker cho "Sổ Tài Chính" — cache app shell để mở được kể cả khi
   mất mạng, và để trình duyệt cho phép "Cài đặt ứng dụng" (yêu cầu bắt buộc
   của PWA). Tăng số ở CACHE mỗi lần bạn cập nhật app để buộc nạp lại cache. */
var CACHE = "so-tai-chinh-v3";
var ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* NETWORK-FIRST: luôn thử tải bản mới nhất từ mạng trước. Chỉ dùng cache khi
   mất mạng (offline) hoặc mạng lỗi. Điều này đảm bảo mỗi lần bạn cập nhật
   app và người dùng tải lại trang, họ luôn thấy bản mới nhất ngay lập tức —
   thay vì bị "trễ 1 phiên bản" như chiến lược cache-first cũ. */
self.addEventListener("fetch", function(e){
  if(e.request.method!=="GET") return;
  e.respondWith(
    fetch(e.request).then(function(res){
      if(res && res.status===200){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      }
      return res;
    }).catch(function(){
      return caches.match(e.request).then(function(cached){
        return cached || Response.error();
      });
    })
  );
});
