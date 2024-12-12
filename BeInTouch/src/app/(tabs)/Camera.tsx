import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Button from "~/src/components/Button";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <View style={styles.button}>
            <Button title="Take Another" onPress={() => setPhoto(null)} />
          </View>
          <View style={styles.button}>
            <Button title="Upload as Post" onPress={() => setPhoto(null)} />
          </View>

          <View style={styles.button}>
            <Button title="Update Profile" onPress={() => setPhoto(null)} />
          </View>
        </View>
      ) : (
        <>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
          ></CameraView>
          <View style={{ backgroundColor: "transparent" }}>
            <View style={styles.button}>
              <Button title="Flip" onPress={toggleCameraFacing} />
            </View>
            <View style={styles.button}>
              <Button title="Take Photo" onPress={takePicture} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  preview: {
    flex: 1,
    resizeMode: "contain",
  },
});
