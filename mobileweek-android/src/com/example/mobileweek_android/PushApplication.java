package com.example.mobileweek_android;

import android.app.Application;
import org.jboss.aerogear.android.unifiedpush.PushConfig;
import org.jboss.aerogear.android.unifiedpush.PushRegistrar;
import org.jboss.aerogear.android.unifiedpush.Registrations;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by lholmquist on 4/9/14.
 */
public class PushApplication extends Application {

    /**********************************************************/
    /******** The UnifiedPush configuration parameters ********/
    /**********************************************************/

    private final String VARIANT_ID       = "95bc3ee5-681a-4e57-8dc0-503d916167c1";
    private final String SECRET           = "6f05b136-d963-4396-85a7-1a0439a63060";
    private final String GCM_SENDER_ID    = "624968910313";
    private final String UNIFIED_PUSH_URL = "https://mobileweek-lholmqui.rhcloud.com/";


    // used for 'selective send' to target a specific user
    // it can be any arbitary value (e.g. name, email etc)
    private final String MY_ALIAS         = "hipster";

    /***********************************************************/
    /***** End of the UnifiedPush configuration parameters *****/
    /***********************************************************/

    private PushRegistrar registration;

    @Override
    public void onCreate() {
        super.onCreate();

        Registrations registrations = new Registrations();  // 1

        try {
            PushConfig config = new PushConfig(new URI(UNIFIED_PUSH_URL), GCM_SENDER_ID);  // 2
            config.setVariantID(VARIANT_ID);
            config.setSecret(SECRET);
            config.setAlias(MY_ALIAS);

            registration = registrations.push("unifiedpush", config);  // 3

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    // Accessor method for Activities to access the 'PushRegistrar' object
    public PushRegistrar getRegistration() {
        return registration;
    }
}
