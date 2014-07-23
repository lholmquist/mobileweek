var ul = document.querySelector('#messages ul');

chrome.pushMessaging.onMessage.addListener( function( message ) {
    var opt = {
        type: 'basic',
        title: 'Push Notification',
        message: message.payload
    };

    var li = document.createElement('li');

    li.innerHTML = message.payload;
    ul.appendChild( li );
});
