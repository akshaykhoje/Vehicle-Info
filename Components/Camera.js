import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, useRef, Component } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator"
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";


function camera(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState(null);
  
  toServer = async (mediaFile) => {
    let type = mediaFile.type;
    let schema = "http://";
    let host = "192.168.31.108";
    let route = "";
    let port = "5000";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    url = schema + host + ":" + port + route;

    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
  };

  //camera ref to access camera
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      // console.log("in takephoto");
      try {
        let photo = await cameraRef.current.takePictureAsync("photo", {
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        return photo;
      } catch (e) {
        // console.log(e.Image);
      }
    }
  };

  const cropImage = async () => {
    const manipResult = await manipulateAsync(
      "../../backend/v_env/image.jpeg",
      [{ crop: { height: 100, originX: 30, originY: 80, width: 100 } }],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
  };

  const _renderImage = () => (
    <View style={styles.imageContainer}>
      <Image source={"../../backend/v_env/image.jpeg"} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Image style={styles.flipStyle} source={require("../flip.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const r = await takePhoto();
              r.type = "image";

              if (r.type == "image") {
                await toServer({
                  type: r.type,
                  uri: r.uri,
                });
              }
              <View style={styles.container2}>
                {ready && image && _renderImage()}
                <Button title="Crop Image" onPress={cropImage} />
              </View>
              // props.navigation.navigate("ImageScreen");
              props.navigation.navigate("VehicleInfo");
            }}
          >
            <Image style={styles.camStyle} source={require("../cam1.png")} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  text1: {
    color: "white",
    alignItems: "center",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  text2: {
    color: "white",
    alignItems: "center",
    marginLeft: 150,
    fontWeight: "bold",
    marginTop: 550,
  },
  camStyle: {
    width: 60,
    height: 60,
    marginLeft: 150,
    marginTop: 525,
  },
  flipStyle: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 20,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
