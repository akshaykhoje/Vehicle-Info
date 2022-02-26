import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { TouchableOpacity } from "react-native-gesture-handler";

// export default function ImageScreen({ route }) {
//   const { photo } = route.params;

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Image source={{ uri: photo.uri }} style={{ width: 380, height: 550 }} />
//     </View>
//   );
// }


function ImageScreen() {
  // const [ready, setReady] = useState(false);
  // const [image, setImage] = useState(null);

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
    <View>
      <Text>Hello ImageScreen</Text>
      <TouchableOpacity onPress={cropImage,
        // props.navigation.navigate("Vaahan.js"),
        console.log("ImageScreen:calling cropImage")
    }
      >
        <View onPress={cropImage} style={styles.container2}>
          {_renderImage()}
        </View>
        <Text>crop</Text>
      </TouchableOpacity>
      {/* props.navigation.navigate("VehicleInfo"); */}
    </View>
  );
}

export default ImageScreen;

const styles = StyleSheet.create({
  imageContainer: {
    height: 80,
    width: 80,
    justifyContent: "center"
  },
  container2: {
    height: 80,
    width: 80,
    marginBottom: 20
  },
  image: {
    height: 100,
    width: 100,
    justifyContent: "center"
  }
})