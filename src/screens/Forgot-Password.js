import React, { Fragment, useState }        from 'react';
import { Image, StyleSheet }                from 'react-native';
import { TouchableOpacity, View }           from 'react-native';
import { AlertIOS, Platform, ToastAndroid } from 'react-native';
import { Button, Header, Input, Text }      from 'react-native-elements';
import LinearGradient                       from 'react-native-linear-gradient';
import axios                                from '../components/Axios';

export default function ForgotPassword({ navigation }) {
  const [ email, setEmail ]     = useState('');
  const [ loading, setLoading ] = useState(false);
  const Axios                   = axios();

  const showToast = (msg, duration) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, duration);
    } else {
      AlertIOS.alert(msg);
    }
  };

  const loadLoginScreen = () => {
    navigation.goBack();
  };
  const forgotPassword = () => {
    if (email) {
      if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,)) {
        showToast('Enter a valid Email address!', ToastAndroid.SHORT);
      } else {
        setLoading(true);

        Axios
          .post('fpassword', { email: email })
          .then(response => {
            setLoading(false);

            showToast(response.data.message, ToastAndroid.LONG);
            navigation.goBack();
          })
          .catch(err => {
            setLoading(false);

            showToast(err.response.data.message, ToastAndroid.SHORT);
          });
      }
    } else {
      showToast('Email address is required!', ToastAndroid.SHORT);
    }
  };

  return (
    <Fragment>
      <Header
        backgroundColor="#FFF"
        barStyle="default"
        containerStyle={styles.headercontainer}
        leftComponent={{
          icon : 'arrow-back',
          color : '#3951B6',
          onPress : loadLoginScreen
        }} />

      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/futton-logo.png')} />
        <Text style={styles.screeninfo}>Please provide your registered Email Address.</Text>

        <View style={styles.inputscontainer}>
          <Input
            containerStyle={styles.inputouter}
            inputContainerStyle={styles.inputinner}
            inputStyle={styles.input}
            placeholder="Email Address"
            onChangeText={text => { setEmail(text) }} />
        </View>

        <Button
          containerStyle={styles.submitbtncontainer}
          buttonStyle={styles.submitbtn}
          loading={loading}
          linearGradientProps={{
            colors: ['#0066D1', '#03C0C7'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 }
          }}
          title="SUBMIT"
          ViewComponent={LinearGradient}
          onPress={() => forgotPassword()} />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headercontainer: {
    paddingLeft: 24,
    width: '100%'
  },
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150.08
  },
  screeninfo: {
    marginTop: 50,
    color: '#2554C0',
    fontSize: 15,
    fontFamily: 'System'
  },
  inputscontainer: {
    marginTop: 35,
    width: '100%',
    height: 57
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
  submitbtncontainer: {
    marginTop: 20,
    width: '100%'
  },
  submitbtn: {
    height: 57,
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'System',
    borderRadius: 5
  }
});
