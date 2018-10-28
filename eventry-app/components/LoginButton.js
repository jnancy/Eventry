import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View} from "react-native";
//import styles from "../Style/Style.js";
import { Ionicons } from "@expo/vector-icons";

class LoginButton extends Component{
    render() {
        const{icon, loginText} = this.props;
        return (
            <View style = {{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Ionicons name = {icon} size={21} color = "white"/>
                <Text style={{marginLeft: 10, fontWeight: "bold", color: "white", fontSize:11}}>{loginText}</Text>
            </View>
        );
    }
}
LoginButton.propTypes = {
    icon: PropTypes.string.isRequired,
    loginText: PropTypes.string.isRequired,
};

export default LoginButton;
