(function () {
    var registrations = navigator.push.registrations(),
        request,
        applicationEndpoint,
        UPClient = AeroGear.UnifiedPushClient( "37eeb851-bdf5-48cc-85ab-97ff6485827a", "7da3d343-1cce-4642-937b-d225768d7e68", "https://mobileweek-lholmqui.rhcloud.com/rest/registry/device"),
        ul = document.querySelector('#messages ul');

    registrations.onsuccess = function() {
        //some cleanup
        var regs = registrations.result,
            regLength = regs.length;

        console.log( regLength );

        for( var i = 0; i < regLength; i++ ) {
            navigator.push.unregister( regs[ i ].pushEndpoint );
            UPClient.unregisterWithPushServer( encodeURIComponent( encodeURIComponent( regs[ i ].pushEndpoint ) ) );
        }

        request = navigator.push.register();

        request.onsuccess = function( event ) {
            applicationEndpoint = request.result;

            console.log( applicationEndpoint );

            var settings = {
                    metadata: {
                        deviceToken: encodeURIComponent(applicationEndpoint),
                        simplePushEndpoint: applicationEndpoint
                    },
                    success: function( event ) {
                        console.log( "Register on the UPS" );
                    },
                    error: function( error ) {
                        console.log( "Error registering on the UPS", error );
                    }
                };

            UPClient.registerWithPushServer( settings );
        };

        request.onerror = function( event ) {
            console.log( "Error getting a new endpoint" + JSON.stringify(e) );
        };
    };

    navigator.mozSetMessageHandler( "push", function( message ) {
        var notification = new Notification( "Mobile Week" );

        var li = document.createElement('li');
        if( applicationEndpoint === message.pushEndpoint ) {
            li.innerHTML = "Application Endpoint - Ding Dong";
            ul.appendChild( li );
        } else {
            li.innerHTML = "Other Endpoint - Ding Dong";
            ul.appendChild( li );
        }
    });
})();
