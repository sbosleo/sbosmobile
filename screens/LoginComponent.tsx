import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import React, { useState, useEffect, createRef } from "react";
import cbosUserService from "../services/user.service";
import cbosConfigService from '../services/config.service';

export default function LoginComponent({ navigation }: RootStackScreenProps<'Login'>) {

  const [userOrg, setUserOrg] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showlogin, setShowlogin] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  useEffect(() => {
    //console.log("trying login")
    cbosUserService.getLoginedUser().then((r) => {
      //console.log("login info ", r);
      if (r && r.pl && r.pl.user && r.pl.user.loginstatus) {
        navigation.navigate('Root')
      }
      else {
        setShowlogin(true);
        console.log("set show login")
        cbosConfigService.get_organization().then((org) => {
          if (org) {
            setUserOrg(org);
          }
          else {
            setUserOrg("mf");
          }
        });
      }
    })

  });


  const handleSubmitPress = () => {
    if (userOrg && userName && userPassword) {
      let message: any = {
        "pl": {
          "user": {
            "username": userName,
            "password": userPassword,
            "org": userOrg
          }
        }
      }
      cbosUserService.loginUser(message).then((r) => {
        if (r && r.pl && r.pl.user && r.pl.user.loginstatus) {
          navigation.replace('Root')
        }
        //console.log("Login user ", r);
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/images/login.png")} resizeMode="cover" style={styles.image}>

        {
          showlogin &&
          <KeyboardAvoidingView enabled>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserOrg) =>
                  setUserOrg(UserOrg)
                }
                value={userOrg}
                placeholder="请输入组织" //dummy@abc.com
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) =>
                  setUserName(UserName)
                }
                placeholder="请输入用户名" //dummy@abc.com
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="请输入密码" //12345
                placeholderTextColor="black"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>

            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress} >
              <Text style={styles.buttonTextStyle}>登录</Text>
            </TouchableOpacity>


          </KeyboardAvoidingView>
        }


      </ImageBackground>


    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#58BE98',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#58BE98',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },

  //original
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center"
  }
});
