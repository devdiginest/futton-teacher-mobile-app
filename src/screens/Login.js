import React, { useState, useEffect } from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import { View, TouchableOpacity }     from 'react-native';
import { Button, Input, Text }        from 'react-native-elements';
import LinearGradient                 from 'react-native-linear-gradient';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector }   from 'react-redux';
import InputPasswordToggle            from '../components/InputPasswordToggle';
import { login }                      from '../actions/Auth';

export default function Login({ navigation }) {
  const [ email, setEmail ]       = useState('');
  const [ password, setPassword ] = useState('');

  const auth                  = useSelector(state => state.auth);
  const dispatch              = useDispatch();
  const { errorMessageLogin } = auth;

  const loadForgotPasswordScreen = () => {
    navigation.navigate('ForgotPassword');
  };
  const handleOpenURL = (event) => {
    navigateHandler(event.url);
  };
  const navigateHandler = async (url) => {
    if (url) {
      const { navigate } = navigation;
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];

      navigate('ResetPassword', { token: '' });
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      console.log(url);
      navigateHandler(url);
    });

    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', handleOpenURL);
    }

    return () => {
      if (Platform.OS === 'ios') {        
        Linking.removeEventListener('url', handleOpenURL);
      }
    };
   }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/futton-logo.png')} />

      {
        errorMessageLogin &&
        <View style={styles.emsgcontainer}>
          <Text style={styles.emsg}>{errorMessageLogin}</Text>
        </View>
      }

      <View style={styles.inputscontainer}>
        <Input
          containerStyle={styles.inputouter}
          inputContainerStyle={styles.inputinner}
          inputStyle={styles.input}
          placeholder="Email Address"
          onChangeText={text => { setEmail(text) }} />
        <InputPasswordToggle
          value={password}
          style={styles.pinputouter}
          iconColor="#CCC"
          inputStyle={styles.input}
          onChangeText={setPassword} />
      </View>

      <View style={styles.forgotpwdlinkcontainer}>
        <TouchableOpacity onPress={loadForgotPasswordScreen}>
          <Text style={styles.forgotpwdlink}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        containerStyle={styles.loginbtncontainer}
        buttonStyle={styles.loginbtn}
        loading={auth.loggingIn}
        linearGradientProps={{
          colors: ['#0066D1', '#03C0C7'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 }
        }}
        title="LOGIN"
        ViewComponent={LinearGradient}
        onPress={() => dispatch(login(email, password))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150.08
  },
  emsgcontainer: {
    marginTop: 20
  },
  emsg: {
    color: '#2554C0'
  },
  inputscontainer: {
    marginTop: 55,
    width: '100%',
    height: 129
  },
  inputouter: {
    marginBottom: 15,
    width: '100%',
    height: 57,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 15,
    shadowColor: '#1F54C3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  pinputouter: {
    marginBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    width: '100%',
    height: 57,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 15,
    shadowColor: '#1F54C3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  inputinner: {
    paddingRight: 5,
    paddingLeft: 5,
    height: 57,
    borderBottomWidth: 0
  },
  input: {
    height: 57,
    color: '#3951B6',
    fontSize: 15,
    fontFamily: 'System'
  },
  forgotpwdlinkcontainer: {
    marginTop: 25,
    alignSelf: 'flex-end'
  },
  forgotpwdlink: {
    color: '#2554C0',
    fontSize: 15,
    fontFamily: 'System'
  },
  loginbtncontainer: {
    marginTop: 35,
    width: '100%'
  },
  loginbtn: {
    height: 57,
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'System',
    borderRadius: 5
  }
});
