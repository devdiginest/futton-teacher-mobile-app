import React, { Fragment, useRef } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, TextInput, Keyboard, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Avatar, Button, Header, Text, Icon } from 'react-native-elements';
import { useDispatch, useSelector, connect } from 'react-redux';
import axios from '../components/Axios';
import { logout } from '../actions/Auth';
import _ from "lodash"

import { BASE_URL } from "./../config/Constants"
import { Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setProfileData } from "../actions/Auth"

function Profile({ navigation, userData }) {
  const [loading, setLoading] = useState(true);
  // const [profile, setProfile] = useState({});
  const [editProfile, setEditProfile] = useState(false)
  const [profileName, setProfileName] = useState(userData.name)
  let inputRef = useRef(null)
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);

  const setProfile = async (imageData = {}) => {
    let data = new FormData()
    data.append('id', userData.id)
    data.append('name', profileName)

    if (!_.isEmpty(imageData)) {
      data.append('photo', {
        name: imageData.fileName,
        type: imageData.type,
        uri: Platform.OS === 'android' ? imageData.uri : imageData.uri.replace('file://', ''),
      })
    }
    await Axios.post('mobile/profile', data, { headers: { "Content-Type": "multipart/form-data" } })
      .then(response => {
        if (response.status && response.status) {
          const data = response.data;
          if (data) {
            getProfile()
          }
        }
      })
      .catch(err => console.log("post ", err));
  };

  const getProfile = async () => {
    await Axios
      .get('mobile/profile')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            dispatch(setProfileData(data));
          }
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // getProfile();
  }, []);

  return (<Fragment>
    <Header
      backgroundColor="#FFF"
      barStyle="dark-content"
      centerComponent={{
        text: "Profile",
        style: styles.headercentercomp
      }}
      // rightComponent={{ icon: 'edit', color: '#3951B6' }}
      containerStyle={styles.headercontainer}
      rightContainerStyle={styles.headerrightcontainer}
      rightComponent={<TouchableOpacity onPress={() => {
        setEditProfile(!editProfile)
        try {
          editProfile ? [setProfile(), Keyboard.dismiss()] : inputRef && inputRef.focus()
        } catch (error) { }
      }}>
        <Icon type="material" name={editProfile ? "save" : "edit"} color='#3951B6' />
      </TouchableOpacity>}
      placement="left" />
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Avatar
          onPress={() => launchImageLibrary({ mediaType: "photo", maxHeight: 300, maxWidth: 300 }, (data) => setProfile(data))}
          activeOpacity={0.9}
          containerStyle={styles.avatar}
          rounded
          showAccessory={true}
          source={userData.photo ? { uri: `${BASE_URL}profilepics/${userData.photo}` } : require("../../assets/profile-image-placeholder.png")}
          size="large" />

        <TextInput
          ref={(rf) => inputRef = rf}
          style={styles.profilename}
          placeholder="Enter your name"
          onChangeText={(text) => editProfile && setProfileName(text)}
          value={profileName}
        />
        <Text style={styles.profileemail}>{userData.email}</Text>
        <View style={styles.actionbuttons}>

          <TouchableOpacity onPress={() => navigation.navigate("DailyReport")} style={[styles.actionbutton, styles.actionbutton1]}>
            <View style={styles.actionbuttonleft}>
              <View style={styles.actionbuttonicono}>
                <View style={[styles.actionbuttonicon, styles.actionbuttonicon4]}>
                  <Icon size={20} name='document-text-outline' type='ionicon' color='#FFF' />
                </View>
              </View>
              <Text style={styles.buttonname}>Daily Reports</Text>
            </View>
            <Image
              style={styles.buttonsubmiticon}
              source={require('../../assets/icon-right-arrow.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("StudentList")} style={[styles.actionbutton, styles.actionbutton1]}>
            <View style={styles.actionbuttonleft}>
              <View style={styles.actionbuttonicono}>
                <View style={[styles.actionbuttonicon, styles.actionbuttonicon4]}>
                  <Icon size={20} name='people-outline' type='ionicon' color='#FFF' />
                </View>
              </View>
              <Text style={styles.buttonname}>Students</Text>
            </View>
            <Image
              style={styles.buttonsubmiticon}
              source={require('../../assets/icon-right-arrow.png')} />
          </TouchableOpacity>

          {/*  <TouchableOpacity style={[styles.actionbutton, styles.actionbutton1]}>
            <View style={styles.actionbuttonleft}>
              <View style={styles.actionbuttonicono}>
                <View style={[styles.actionbuttonicon, styles.actionbuttonicon4]}>
                  <Icon size={20} name='settings-outline' type='ionicon' color='#FFF' />
                </View>
              </View>
              <Text style={styles.buttonname}>Settings</Text>
            </View>
            <Image
              style={styles.buttonsubmiticon}
              source={require('../../assets/icon-right-arrow.png')} />
          </TouchableOpacity> */}

          <TouchableOpacity style={[styles.actionbutton]} onPress={() => dispatch(logout())}>
            <View style={styles.actionbuttonleft}>
              <View style={styles.actionbuttonicono}>
                <View style={[styles.actionbuttonicon, styles.actionbuttonicon4]}>
                  <Icon size={20} name='logout' type='material ' color='#FFF' />
                </View>
              </View>
              <Text style={styles.buttonname}>Log Out</Text>
            </View>

            <Image
              style={styles.buttonsubmiticon}
              source={require('../../assets/icon-right-arrow.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  </Fragment>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  const { userData } = state.auth
  return {
    userData: userData,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  headercontainer: {
    width: '100%',
    borderBottomWidth: 1.5,
    elevation: 10
  },
  headercentercomp: {
    color: '#3951B6',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System'
  },
  headerrightcontainer: {
    paddingRight: 10
  },
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#FFF'
  },
  avatar: {
    marginTop: 20,
    alignSelf: 'center',
  },
  profilename: {
    marginTop: 20,
    color: '#222B45',
    fontSize: 23,
    fontWeight: '700',
    fontFamily: 'System',
    alignSelf: 'center',
    textAlign: "center"
  },
  profileemail: {
    color: '#8F9BB3',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'System',
    alignSelf: 'center'
  },
  actionbuttons: {
    marginTop: 40,
    //paddingHorizontal: 15
  },
  actionbutton: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actionbutton1: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F7'
  },
  actionbuttonleft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionbuttonicono: {
    width: 34,
    height: 34,
    backgroundColor: '#3951B6',
    borderRadius: 17
  },
  actionbuttonicon: {
    //alignSelf: 'center'
  },
  actionbuttonicon4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // marginTop: 8,
  },
  actionbuttonicon5: {
    marginTop: 10
  },
  buttonname: {
    marginLeft: 10,
    color: '#222B45',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'System'
  },
  buttonsubmiticon: {
    width: 7,
    height: 14
  }
});
