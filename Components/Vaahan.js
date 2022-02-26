import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as Clipboard from 'expo-clipboard';


function Vaahan({ route }) {
  const { key } = route.params;
  var x = JSON.stringify(key);
  var string = x;
  str = "";
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) >= 65  && string.charCodeAt(i)<=90 || string.charCodeAt(i) >= 48 && string.charCodeAt(i)<=57) {
      str = str+string[i];
    }
  }
  const [text, onChangeText] = React.useState(str);

  const copyToClipboard = () => {
     Clipboard.setString(text);
  };

  bs = React.createRef();
  fall = new Animated.Value(1);
  const rendercontent = () => (
    <View
      style={{
        backgroundColor: "white",
        height: 60,
        marginTop: 1,
      }}
    >
      <View style={{flexDirection: "row", backgroundColor: "#015F98"}}>
        <TextInput
          style={{
            height: 45,
            width: 160,
            margin: 10,
            borderWidth: 1,
            padding: 10,
            marginLeft: 40,
            borderRadius: 20,
            backgroundColor: "#ffffff"
          }}
          onChangeText={onChangeText}
          value={text}
        />
        
        <TouchableOpacity onPress={copyToClipboard}>
          <Text style={{marginLeft:25, marginTop: 15, fontWeight:"bold", fontSize: 20, color: "#151D3B"}}>Copy</Text>
        </TouchableOpacity>
        
        </View>
    </View>
  );

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: "90.5%",
          // marginLeft: "5%",
        }}
      >
        <WebView
          source={{
            uri: "https://vahan.nic.in/nrservices/faces/user/citizen/citizenlogin.xhtml",
          }}
        />
      </View>
      <BottomSheet
        ref={this.bs}
        snapPoints={[150, 0]}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
        renderContent={rendercontent}
        borderRadius={8}
      ></BottomSheet>
    </View>
  );
}
export default Vaahan;
