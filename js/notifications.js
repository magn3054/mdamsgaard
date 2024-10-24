document.getElementById('notify-btn').addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification('You are subscribed to notifications!');
        }
    });
});