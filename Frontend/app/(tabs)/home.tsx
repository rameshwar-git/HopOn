import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Alert, Platform, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { env } from "../env";

//const DEFAULT_API = process.env.API_URI;
const API_BASE = env.API_URL;
type UserLocation = {
  userId: string;
  currentLocation: { latitude: number; longitude: number } | null;
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [allLocations, setAllLocations] = useState<UserLocation[]>([]);
  const [mapComponents, setMapComponents] = useState<{ MapView?: any; Marker?: any } | null>(null);
  const [mapRegion, setMapRegion] = useState<any | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [polling, setPolling] = useState(false);
  const [transitMode, setTransitMode] = useState(false);

  // Map height for layout
  const mapHeight = Math.round(Dimensions.get("window").height * 0.55);

  useEffect(() => {
    try {
      const userId = AsyncStorage.getItem("userId");
      const validate = fetch(`${API_BASE}/passenger/${userId}`);
      if(!validate){
        AsyncStorage.clear();
        router.replace("/auth/signin");
      }
    } catch (err: any) {
      console.log(err.message);
    }
    if (Platform.OS !== "web") {
      try {
        const Maps = require("react-native-maps");
        setMapComponents({ MapView: Maps.default || Maps.MapView || Maps, Marker: Maps.Marker });
      } catch (err: any) {
        console.warn("react-native-maps not available:", err?.message || err);
      }
    }
    (async () => {
      await fetchAndSetAllLocations();
      setLoading(false);
    })();

    return () => stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // pick a sensible region if we have at least one coord
    const any = allLocations.find((u) => u.currentLocation);
    if (any && !mapRegion) {
      setMapRegion({
        latitude: any!.currentLocation!.latitude,
        longitude: any!.currentLocation!.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLocations]);

  const fetchAndSetAllLocations = async () => {
    try {
      const url = `${API_BASE}/location/allLocation`;

      const res = await fetch(url);
      if (!res.ok) {
        console.warn("fetch /location/all failed", res.status);
        return;
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        console.warn("fetch /location/all returned unexpected payload", data);
        return;
      }

      // normalize shape and set state
      const out = data.map((d: any) => ({
        userId: d.userId?.toString ? d.userId.toString() : String(d.userId),
        currentLocation: d.currentLocation || null,
      }));

      setAllLocations(out);
    } catch (err: any) {
      console.warn("fetchAllLocations error:", err?.message || err);
    }
  };

  const startPolling = (intervalMs = 3000) => {
    stopPolling();
    setPolling(true);
    requestPermissions();
    // immediate
    fetchAndSetAllLocations();
    pollRef.current = setInterval(fetchAndSetAllLocations, intervalMs);
  };

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    setPolling(false);
  };

  const centerOn = (loc: { latitude: number; longitude: number }) => {
    setMapRegion({ latitude: loc.latitude, longitude: loc.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 });
  };

  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Location permission is required to share your location.");
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  // Render
  const MapView = mapComponents?.MapView;
  const Marker = mapComponents?.Marker;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users — Live Locations</Text>

      <View style={{ height: mapHeight, marginHorizontal: 12, marginTop: 8 }}>
        {Platform.OS === "web" ? (
          <View style={styles.webMapNotice}>
            <Text>Map not available on web. Open on a native device or simulator with react-native-maps installed.</Text>
          </View>
        ) : MapView ? (
          mapRegion ? (
            <MapView
              style={{ flex: 1 }}
              region={mapRegion}
              onRegionChangeComplete={(r: any) => setMapRegion(r)}
              provider={Platform.OS === "android" || transitMode ? MapView.PROVIDER_GOOGLE : undefined} // use Google on Android or when transit enabled
              showsUserLocation={true}
              showsMyLocationButton={true}
              showsCompass={true}
              rotateEnabled={false}
              pitchEnabled={true}
            >
              {allLocations.map((u) => {
                const loc = u.currentLocation;
                if (!loc) return null;
                return (
                  Marker && (
                    <Marker
                      key={u.userId}
                      coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                      title={u.userId}
                      description={`userId: ${u.userId}`}
                      image={require('@assets/images/passenger_x100.png')}
                    // pinColor left unspecified to avoid platform color issues
                    />
                  )
                );
              })}
            </MapView>
          ) : (
            <View style={styles.loadingMapWrapper}>
              <ActivityIndicator size="large" />
              <Text style={{ marginTop: 8 }}>Waiting for location data...</Text>
            </View>
          )
        ) : (
          <View style={styles.webMapNotice}>
            <Text>Map component not installed. Install react-native-maps for native map support.</Text>
          </View>
        )}
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[styles.btn, polling ? styles.btnSecondary : styles.btnPrimary]}
          onPress={() => (polling ? stopPolling() : startPolling())}
        >
          <Text style={styles.btnText}>{polling ? "Go Offline" : "Go Live"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnGhost]}
          onPress={() => {
            fetchAndSetAllLocations();
            addLog("Manual refresh");
          }}
        >
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listArea}>
        <Text style={styles.sectionTitle}>Users ({allLocations.length})</Text>
        <View style={{ maxHeight: 160 }}>
          {allLocations.map((u) => (
            <TouchableOpacity
              key={u.userId}
              style={styles.userRow}
              onPress={() => u.currentLocation && centerOn(u.currentLocation)}
            >
              <Text style={styles.userId}>{u.userId}</Text>
              <Text style={styles.userCoord}>{
                u.currentLocation ? `${u.currentLocation.latitude.toFixed(5)}, ${u.currentLocation.longitude.toFixed(5)}` : "no location"
              }</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={{ fontSize: 12, color: "#444" }}>API: {API_BASE}</Text>
      </View>
    </View>
  );
}

// tiny logger helper used in a couple places
const addLog = (msg: string) => console.log(new Date().toLocaleTimeString(), "—", msg);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#fff" },
  title: { textAlign: "center", fontSize: 18, fontWeight: "600" },
  webMapNotice: { flex: 1, backgroundColor: "#fff", borderRadius: 8, padding: 14, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#e6e6e6" },
  loadingMapWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
  controlsRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 12, marginHorizontal: 12 },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  btnPrimary: { backgroundColor: "#2b6cb0" },
  btnSecondary: { backgroundColor: "#c53030" },
  btnGhost: { backgroundColor: "#e2e8f0" },
  btnText: { color: "#fff", fontWeight: "600" },
  listArea: { marginTop: 12, paddingHorizontal: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  userRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#f1f1f1" },
  userId: { fontSize: 14, fontWeight: "600" },
  userCoord: { fontSize: 12, color: "#555" },
  footer: { padding: 10, alignItems: "center" },
});
