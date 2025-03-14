self.addEventListener("push", function(event) {
    const data = event.data.json();
    
    self.registration.showNotification(data.notification.title, {
      body: data.notification.body,
      icon: "/icon.png",
      vibrate: [200, 100, 200],
      data: { url: data.notification.click_action || "/" }
    });
  });
  
  // Manejar clic en la notificación
  self.addEventListener("notificationclick", function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  });
  