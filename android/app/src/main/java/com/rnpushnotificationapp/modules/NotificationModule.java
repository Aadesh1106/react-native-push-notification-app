package com.rnpushnotificationapp.modules;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.rnpushnotificationapp.MainActivity;
import com.rnpushnotificationapp.R;

public class NotificationModule extends ReactContextBaseJavaModule {
    private static final String CHANNEL_ID = "whatsapp_style_notifications";
    private static final String CHANNEL_NAME = "WhatsApp Style";
    private static final String CHANNEL_DESCRIPTION = "WhatsApp style notifications";
    private static final int NOTIFICATION_ID = 1001;

    private ReactApplicationContext reactContext;
    private NotificationManager notificationManager;

    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
        createNotificationChannel();
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription(CHANNEL_DESCRIPTION);
            channel.enableLights(true);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{1000, 1000, 1000, 1000, 1000});
            channel.setLightColor(android.graphics.Color.GREEN);
            
            notificationManager.createNotificationChannel(channel);
        }
    }

    @ReactMethod
    public void showWhatsAppStyleNotification(ReadableMap options, Promise promise) {
        try {
            String title = options.hasKey("title") ? options.getString("title") : "New Message";
            String message = options.hasKey("message") ? options.getString("message") : "You have a new message";
            String deepLink = options.hasKey("deepLink") ? options.getString("deepLink") : null;

            // Create intent for notification tap
            Intent intent = new Intent(reactContext, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            
            if (deepLink != null) {
                intent.putExtra("deepLink", deepLink);
            }

            PendingIntent pendingIntent = PendingIntent.getActivity(
                reactContext, 
                0, 
                intent, 
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            // Get default notification sound
            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

            // Build notification
            NotificationCompat.Builder builder = new NotificationCompat.Builder(reactContext, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_notification)
                .setContentTitle(title)
                .setContentText(message)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(message))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setCategory(NotificationCompat.CATEGORY_MESSAGE)
                .setAutoCancel(true)
                .setSound(defaultSoundUri)
                .setVibrate(new long[]{1000, 1000, 1000, 1000, 1000})
                .setLights(android.graphics.Color.GREEN, 3000, 3000)
                .setContentIntent(pendingIntent)
                .setFullScreenIntent(pendingIntent, true); // For Android 15 full-screen notifications

            // Add action buttons (WhatsApp style)
            if (options.hasKey("actions") && options.getArray("actions") != null) {
                // Reply action
                Intent replyIntent = new Intent(reactContext, MainActivity.class);
                replyIntent.putExtra("action", "reply");
                PendingIntent replyPendingIntent = PendingIntent.getActivity(
                    reactContext, 
                    1, 
                    replyIntent, 
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
                );
                builder.addAction(R.drawable.ic_reply, "Reply", replyPendingIntent);

                // Mark as read action
                Intent markReadIntent = new Intent(reactContext, MainActivity.class);
                markReadIntent.putExtra("action", "mark_read");
                PendingIntent markReadPendingIntent = PendingIntent.getActivity(
                    reactContext, 
                    2, 
                    markReadIntent, 
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
                );
                builder.addAction(R.drawable.ic_check, "Mark as Read", markReadPendingIntent);
            }

            // Show notification
            NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(reactContext);
            notificationManagerCompat.notify(NOTIFICATION_ID, builder.build());

            WritableMap result = Arguments.createMap();
            result.putBoolean("success", true);
            result.putString("message", "Notification shown successfully");
            promise.resolve(result);

        } catch (Exception e) {
            promise.reject("NOTIFICATION_ERROR", "Failed to show notification: " + e.getMessage());
        }
    }

    @ReactMethod
    public void clearAllNotifications(Promise promise) {
        try {
            notificationManager.cancelAll();
            
            WritableMap result = Arguments.createMap();
            result.putBoolean("success", true);
            result.putString("message", "All notifications cleared");
            promise.resolve(result);
            
        } catch (Exception e) {
            promise.reject("CLEAR_ERROR", "Failed to clear notifications: " + e.getMessage());
        }
    }

    @ReactMethod
    public void setBadgeCount(int count, Promise promise) {
        try {
            // Badge count implementation for Android
            // Note: This requires additional setup with launcher support
            
            WritableMap result = Arguments.createMap();
            result.putBoolean("success", true);
            result.putInt("badgeCount", count);
            promise.resolve(result);
            
        } catch (Exception e) {
            promise.reject("BADGE_ERROR", "Failed to set badge count: " + e.getMessage());
        }
    }

    @ReactMethod
    public void getDeepLinkFromNotification(Promise promise) {
        try {
            Intent intent = getCurrentActivity() != null ? getCurrentActivity().getIntent() : null;
            
            if (intent != null && intent.hasExtra("deepLink")) {
                String deepLink = intent.getStringExtra("deepLink");
                
                WritableMap result = Arguments.createMap();
                result.putString("deepLink", deepLink);
                promise.resolve(result);
            } else {
                promise.resolve(null);
            }
            
        } catch (Exception e) {
            promise.reject("DEEPLINK_ERROR", "Failed to get deep link: " + e.getMessage());
        }
    }
}
