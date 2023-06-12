import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useRef, useState } from "react";
import CustomButton from "../../components/CustomButton";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Images from "../../constant/Images";

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const [passwordSecurity, setPasswordSecurity] = useState(true);
const [cPasswordSecurity, setCPasswordSecurity] = useState(true);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  /**
 * Purpose:manage eye button action
 * Created/Modified By:Sudhin
 * Created/Modified Date: 9 Nov 2022
 * Steps:
     1.check the previous value of the state and change its value 
*/
const passwordEyeButtonAction = () =>{
  if (passwordSecurity) {
    setPasswordSecurity(passwordSecurity=> !passwordSecurity);
  }
}
const cPasswordEyeButtonAction = () => {
  if(cPasswordSecurity){
    setCPasswordSecurity(cPasswordSecurity=>!cPasswordSecurity);
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Text style={styles.header}>BT Printer</Text>
      <Text style={styles.registerText}>Register</Text>
      <View style={[styles.inputContainer, {}]}>
        <TextInput
          style={[styles.inputField]}
          placeholder={"First name"}
          ref={firstNameRef}
          onChangeText={(value) => setFirstName(value)}
          onSubmitEditing={() => lastNameRef?.current?.focus()}
        />
      </View>
      <View style={[styles.inputContainer, {}]}>
        <TextInput
          style={[styles.inputField]}
          placeholder={"Last name"}
          ref={lastNameRef}
          onChangeText={(value) => setLastName(value)}
          onSubmitEditing={() => emailRef?.current?.focus()}
        />
      </View>
      <View style={[styles.inputContainer, {}]}>
        <TextInput
          style={[styles.inputField]}
          placeholder={"E-mail"}
          ref={emailRef}
          onChangeText={(value) => setEmail(value)}
          onSubmitEditing={() => passwordRef?.current?.focus()}
        />
      </View>
      <View style={[styles.inputContainer, { flexDirection: "row" }]}>
        <TextInput
          style={[styles.inputField]}
          placeholder={"Password"}
          ref={passwordRef}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={passwordSecurity}
          onSubmitEditing={() => passwordRef?.current?.focus()}
        />
        <TouchableOpacity style={styles.eyeButton}>
          <Image
            style={styles.eyeButtonIcon}
            source={passwordSecurity ? Images.EYE_CLOSE : Images.EYE_OPEN}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.inputContainer, { flexDirection: "row" }]}>
        <TextInput
          style={[styles.inputField]}
          placeholder={"Confirm password"}
          ref={confirmPasswordRef}
          secureTextEntry={cPasswordSecurity}
          onChangeText={(value) => setConfirmPassword(value)}
          onSubmitEditing={() => {}}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => passwordEyeButtonAction()}
        >
          <Image
            style={styles.eyeButtonIcon}
            source={cPasswordSecurity ? Images.EYE_CLOSE : Images.EYE_OPEN}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    marginTop: responsiveHeight(8),
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    color: "black",
  },
  registerText: {
    textAlign: "left",
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginLeft: responsiveWidth(3),
  },
  inputContainer: {
    height: responsiveHeight(6),
    borderWidth: 1,
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(5),
    marginBottom: 4,
  },
  inputField: {
    paddingLeft: 15,
    color: "black",
    flex:1
  },
  errorText: {
    color: "red",
    textAlign: "right",
    fontSize: 12,
    marginRight: responsiveWidth(5),
  },
  button: {
    backgroundColor: "blue",
    alignSelf: "center",
    marginTop: responsiveHeight(4),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 6,
  },
  eyeButtonIcon: { width: 25, height: 25 },
  eyeButton: {
    width: responsiveHeight(6),
    alignItems:'center',
    justifyContent:'center'
  },
});
