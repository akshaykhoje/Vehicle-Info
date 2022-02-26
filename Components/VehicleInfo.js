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
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
// import * as Font from "expo-font"
// import { AppLoading } from "expo"
// loaded =Font.useFonts({
//   CormorantGaramond:require('../assets/fonts/CormorantGaramond-Italic.ttf'), 
// })

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
      // show:true
    };
  }

  // componentDidMount(){
  //   setTimeout(()=>{

  //     this.setState({
  //       show:false
  //     })

  //   },3500)
  // }

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState((state, props) => {
      return {
        cameraRollPer: status === "granted",
        disableButton: false,
      };
    });
  }

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  pickMedia = async () => {
    this.setState((state, props) => {
      return {
        cameraRollPer: state.cameraRollPer,
        disableButton: true,
      };
    });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (result.cancelled) {
      return;
    }
    if (result.type == "image") {
      await this.toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
    } else {
      let base64 = await this.uriToBase64(result.uri);
      await this.toServer({
        type: result.type,
        base64: base64,
        uri: result.uri,
      });
    }
  };

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
 
  render() {
    return (
      <View style={styles.evr}>
        <View style={styles.Header}>
          <Text style={styles.Text}>VEHICLE INFO</Text>
        </View>

        <Text style={styles.evr1}>
          Upload your vehicle number plate image and get the owner info at one click !
        </Text>
        <Image
          // style={{ width: 180, height: 180, marginTop: 90, marginLeft: 100 }}
          style={styles.lpimage}
          source={require("../number-plate-check.jpg")}
        />
        <View style={styles.bg2}>
          <TouchableOpacity
            onPress={async () => {
              await this.pickMedia();
              this.setState((s, p) => {
                return {
                  cameraRollPer: s.cameraRollPer,
                  disableButton: false,
                };
              });
            }}
          >
            <Text style={styles.bg3}>Choose Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={async() => {
              // const response = await fetch(
              //   `http://192.168.31.108:5000/results`
              // );
              // const json = await response.json();
              // console.log(json.key);
              this.props.navigation.navigate("Camera");
              // console.log("Inside Camera");
            }}
          >
            <Text style={styles.bg5}>Camera</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.bgf}> 
              <TouchableOpacity
                onPress={async () => {
                  const response = await fetch(
                    `http://192.168.31.108:5000/results`
                  );
                  const json = await response.json();
                  // console.log(json.key);
                  this.props.navigation.navigate("Vaahan", {
                    key: json.key,
                  });
                }}
              >
                <Text style={styles.bg6}>View</Text>
              </TouchableOpacity>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  evr: {
    marginTop:40,
    backgroundColor: "#FDF6F0",
    flex: 1,
  },
  evr1: {
    fontSize: 22,
    marginTop: 30,
    marginLeft: 20,
    color: "#cd5c5c",
  },
  Header: {
    backgroundColor: "#EF4F4F",
    height: 80,
  },
  Text: {
    color: "#0B0000",
    fontSize: 30,
    marginLeft: 15,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  bg2: {
    marginTop: 90,
    // width:105,
    backgroundColor: "#FDF6F0",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bg3: {
    backgroundColor: "#FF9A8C",
    color: "#00000f",
    fontSize: 18,
    padding: 5,
    borderRadius: 80,
    // marginBottom: 240,
    // width: 120,
  },
  bg5: {
    backgroundColor: "#FF9A8C",
    color: "#00000f",
    fontSize: 18,
    padding: 5,
    borderRadius: 100,
    // marginBottom: 240,
    // alignContent: "center",
    textAlign: "center",
    width: 100,
  },
  bg6: {
    backgroundColor: "#f2bc94",
    color: "#722620",
    // color:"blue",
    fontSize: 22,
    
    borderRadius: 15,
    // marginTop:90,
    // marginRight:150,
    // marginBottom: 240,
    // alignContent: "center",
    textAlign: "center",
    width: 100,
  },
  lpimage: {
    borderRadius: 50,
    width: 180,
    height: 180,
    marginTop: 90,
    marginLeft: 90,
    borderColor: "#F44336",
  },
  bgf:{
    
    marginLeft:133,
    marginTop:40
    //  
  }
});
