import React                  from 'react';
import { Button, Text, View } from 'react-native';
import { Image, StyleSheet }  from 'react-native';

export default function Classroom({ navigation }) {
  return (
    <View style={styles.ocontainer}>
      <View style={styles.container}>
        <Text style={styles.cname}>GATE 2021 Premium Batch</Text>

        <View style={styles.ccontent}>
          <View style={styles.csubject}>
            <View style={styles.csubjectheader}>
              <Text style={styles.sname}>Introduction to User Interface</Text>
              <Image style={styles.cmatupload} source={require('../../assets/icon-upload-cmat.png')} />
            </View>

            <View style={styles.sclass}>
              <Text style={styles.sclassnoactive}>1.</Text>
              <View>
                <Text style={styles.sclassnameactive}>What is User Interface?</Text>
                <Text style={styles.sclassduration}>30:00 mins (Was Live on 15-10-2020)</Text>
              </View>
            </View>
            <View style={styles.sclass}>
              <Text style={styles.sclassno}>2.</Text>
              <View>
                <Text style={styles.sclassname}>What is difference between UI & UX?</Text>
                <Text style={styles.sclassduration}>05:42 mins</Text>
              </View>
            </View>
          </View>

          <View style={styles.csubject}>
            <View style={styles.csubjectheader}>
              <Text style={styles.sname}>Understanding of elements</Text>
              <Image style={styles.cmatupload} source={require('../../assets/icon-upload-cmat.png')} />
            </View>

            <View style={styles.sclass}>
              <Text style={styles.sclassno}>3.</Text>
              <View>
                <Text style={styles.sclassname}>Which tool is best for UI Design?</Text>
                <Text style={styles.sclassduration}>04:25 mins (LIVE, Scheduled on 17-10-2020)</Text>
              </View>
            </View>
            <View style={styles.sclass}>
              <Text style={styles.sclassno}>4.</Text>
              <View>
                <Text style={styles.sclassname}>How to start with basic UI design?</Text>
                <Text style={styles.sclassduration}>06:56 mins</Text>
              </View>
            </View>
            <View style={styles.sclass}>
              <Text style={styles.sclassno}>5.</Text>
              <View>
                <Text style={styles.sclassname}>Things to keep in mind while designing.</Text>
                <Text style={styles.sclassduration}>03:36 mins</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ocontainer: {
    height: '100%',
    backgroundColor: '#FFF'
  },
  backgroundVideo: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 60,
    right: 0,
    bottom: 0,
    left: 0
  },
  container: {
    padding: 24,
    backgroundColor: '#FFF'
  },
  cname: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System'
  },
  ccontent: {

  },
  csubject: {

  },
  csubjectheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sname: {
    marginTop: 25,
    marginBottom: 20,
    color: '#999999',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'System'
  },
  cmatupload: {
    width: 15.29,
    height: 19
  },
  sclass: {
    marginTop: 8,
    marginBottom: 7,
    flexDirection:'row'
  },
  sclassno: {
    width: 35,
    color: '#262626',
    fontSize: 14,
    fontFamily: 'System'
  },
  sclassnoactive: {
    width: 35,
    color: '#3951B6',
    fontSize: 14,
    fontFamily: 'System'
  },
  sclassname: {
    color: '#262626',
    fontSize: 14,
    fontFamily: 'System'
  },
  sclassnameactive: {
    color: '#3951B6',
    fontSize: 14,
    fontFamily: 'System'
  },
  sclassduration: {
    marginTop: 5,
    color: '#969696',
    fontSize: 14,
    fontFamily: 'System'
  }
});
