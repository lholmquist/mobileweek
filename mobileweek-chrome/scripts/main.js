'use strict';
/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/experimental.app.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        width: 500,
        height: 309
    });
});

// This will happen when the app is first Installed
chrome.runtime.onInstalled.addListener(function() {

    // First we need to get the channelID and then send it to the Unified Push Server
    // This code could also go in the 'onLaunched' method
    chrome.pushMessaging.getChannelId( true, function(channelId) {
        /*
            Set our Variant ID and Secret and the location of the Unified Push Server
        */
        var variantId = "8da78ddb-89b5-418f-a261-2052f52c61e2",
        variantSecret = "d0b49ba9-5d8a-4887-8ab7-fac2f4c47ba6",
        pushServerURL = "https://mobileweek-lholmqui.rhcloud.com/rest/registry/device";
        // Once we have the channelID we can then register with the Unified Push Server using
        // the AeroGear.js library
        var client = AeroGear.UnifiedPushClient(
                variantId,
                variantSecret,
                pushServerURL
            ),settings = {};
            // The channelId will be the "device token"

        settings.metadata = {
            deviceToken: channelId.channelId
        };

        // Register with the Unified Push Server
        client.registerWithPushServer( settings );

        chrome.pushMessaging.onMessage.addListener( function( message ) {
            var opt = {
                type: 'basic',
                title: 'Push Notification',
                message: message.payload
            };

            chrome.notifications.create("1", opt, function(notificationId){
                console.log( notificationId );
            });
        });
    });
});
