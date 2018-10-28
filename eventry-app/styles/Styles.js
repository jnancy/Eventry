"use strict";
import { StyleSheet, Dimensions } from "react-native";

let { width, height } = Dimensions.get("window");

var Styles = StyleSheet.create({

    textInput: {
      height: 40,
      color: "white",
      borderColor: "white",
      marginTop: 10,
      borderBottomWidth: 1,
      width: width*7/10,
      fontSize: 15,
    }
});
export default Styles;
