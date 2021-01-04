import React                                 from 'react';
import { Image, StyleSheet, Text }           from 'react-native';
import { TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient                        from 'react-native-linear-gradient';

export default function ResetPassword({ navigation }) {
  const resetPassword = () => {
    navigation.navigate('SignIn');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/futton-logo.png')} />
      <Text style={styles.screeninfo}>Enter your new password.</Text>

      <View style={styles.optscontainer}>
        <View style={styles.optcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#3951B6"
            secureTextEntry={true} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.continuebtncontainer}
        onPress={resetPassword}>
        <LinearGradient
          colors={[ '#0066D1', '#03C0C7' ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.continuebtngradient}>
          <Text style={styles.continuebtntext}>RESET PASSWORD</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    marginTop: 20,
    width: 166,
    height: 165
  },
  screeninfo: {
    marginTop: 50,
    color: '#2554C0',
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: 'normal'
  },
  optscontainer: {
    marginTop: 40,
    width: '100%',
    height: 57
  },
  optcontainer: {
    paddingRight: 15,
    paddingLeft: 15,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  input: {
    height: 57,
    lineHeight: 18,
    color: '#3951B6',
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: 'normal'
  },
  continuebtncontainer: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    height: 57,
    borderRadius: 5
  },
  continuebtngradient: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  continuebtntext: {
    lineHeight: 18,
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: 'normal'
  }
});
