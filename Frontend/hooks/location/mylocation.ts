import * as Location from "expo-location";
import { Alert } from "react-native";

/**
 * Start live tracking: send current location immediately, then stream updates.
 * Returns the LocationSubscription (or null on failure). Caller should call
 * `subscription.remove()` to stop tracking.
 *
 * @param userId string - id of the user to update on the server
 * @param intervalMs number - minimum time between updates (ms), default 3000
 */
export const startLiveTracking = async (
  userId: string,
  intervalMs = 3000
): Promise<Location.LocationSubscription | null> => {
  if (!userId) {
    Alert.alert("Missing userId", "Provide a userId to start live tracking.");
    return null;
  }

  try {
    // request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Location permission is required to share your location.");
      return null;
    }

    // helper to send single update to backend
    const sendUpdate = async (latitude: number, longitude: number) => {
      try {
        const url = `http://192.168.1.3:5000/api/location/updateLocation/${encodeURIComponent(userId)}`;
        await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentLocation: { latitude, longitude } }),
        });
      } catch (err) {
        console.warn("sendUpdate error:", err);
      }
    };

    // 1) send one immediate position (not required but useful)
    try {
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const { latitude, longitude } = pos.coords;
      // update server with current pos
      await sendUpdate(latitude, longitude);
    } catch (err) {
      console.warn("getCurrentPositionAsync failed:", err);
      // continue to watch positions even if this fails
    }

    // 2) start watching position and send updates as they come
    const subscription = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Highest, timeInterval: intervalMs, distanceInterval: 0 },
      (position) => {
        const { latitude, longitude } = position.coords;
        // fire-and-forget send
        sendUpdate(latitude, longitude);
      }
    );

    return subscription;
  } catch (err: any) {
    console.error("startLiveTracking error:", err?.message ?? err);
    return null;
  }
};
