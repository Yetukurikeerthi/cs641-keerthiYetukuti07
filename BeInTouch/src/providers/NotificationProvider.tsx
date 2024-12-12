import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";
import { useEffect, useRef, useState, ReactNode } from "react"; // Added ReactNode
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthProvider";

// Set the default behavior for notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Type for the props to ensure 'children' is correctly typed
interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [expoPushToken, setExpoPushToken] = useState<string>(""); // Added typing for state
  const { user } = useAuth(); // Get the user from AuthProvider

  useEffect(() => {
    if (Platform.OS === "web") {
      console.warn("Push notifications are not supported on web");
      return;
    }

    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));
  }, []);

  useEffect(() => {
    saveUserPushToken();
  }, [expoPushToken]);

  // Save the user's push token to the Supabase profiles table
  const saveUserPushToken = async () => {
    if (!user?.id || !expoPushToken) {
      return;
    }

    try {
      await supabase
        .from("profiles")
        .update({ push_token: expoPushToken })
        .eq("id", user.id); // Ensure you're targeting the correct user profile
    } catch (error) {
      console.error("Error saving push token:", error);
    }
  };

  return <>{children}</>; // Properly return children wrapped in a fragment
}

// Error handling function
function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

// Register the device for push notifications and get the push token
async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    // handleRegistrationError('Must use physical device for push notifications');
  }
}
