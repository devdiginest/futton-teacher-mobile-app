import React, { Fragment }              from 'react';
import { useEffect, useState }          from 'react';
import { Image, StyleSheet, View }      from 'react-native';
import { TouchableOpacity }             from 'react-native';
import { Avatar, Button, Header, Text } from 'react-native-elements';
import { useDispatch, useSelector }     from 'react-redux';
import axios                            from '../components/Axios';
import { logout }                       from '../actions/Auth';

export default function Profile({ navigation }) {
  const [ loading, setLoading ] = useState(true);
  const [ profile, setProfile ] = useState({});

  const auth      = useSelector(state => state.auth);
  const dispatch  = useDispatch();
  const userToken = auth.token ? auth.token : null;
  const Axios     = axios(userToken);

  const getProfile = async () => {
    await Axios
      .get('mobile/profile')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            setProfile(data);
          }
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <Header
        backgroundColor="#FFF"
        barStyle="default"
        centerComponent={{
          text: "Profile",
          style: styles.headercentercomp
        }}
        rightComponent={{ icon: 'edit', color: '#3951B6' }}
        containerStyle={styles.headercontainer}
        rightContainerStyle={styles.headerrightcontainer}
        placement="left" />

      <View style={styles.container}>
        <Avatar
          activeOpacity={0.9}
          containerStyle={styles.avatar}
          rounded
          showAccessory={true}
          source={require('../../assets/icon-msg-student5.png')}
          size="large" />

        <Text style={styles.profilename}>{profile.name}</Text>
        <Text style={styles.profileemail}>{profile.email}</Text>

        <View style={styles.actionbuttons}>
          <TouchableOpacity style={[ styles.actionbutton, styles.actionbutton1 ]}>
            <View style={styles.actionbuttonleft}>
              <View style={styles.actionbuttonicono}>
                <Image
                  style={[ styles.actionbuttonicon, styles.actionbuttonicon4 ]}
                  source={require('../../assets/icon-settings-settings.png')} />
              </View>
              <Text style={styles.buttonname}>Settings</Text>
            </View>

            <Image
              style={styles.buttonsubmiticon}
              source={require('../../assets/icon-right-arrow.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={[ styles.actionbutton ]} onPress={() => dispatch(logout())}>
            <View style={styles.actionbuttonleft}>
              <View style={styles.actionbuttonicono}>
                <Image
                  style={[ styles.actionbuttonicon, styles.actionbuttonicon5 ]}
                  source={require('../../assets/icon-settings-logout.png')} />
              </View>
              <Text style={styles.buttonname}>Log Out</Text>
            </View>

            <Image
              style={styles.buttonsubmiticon}
              source={require('../../assets/icon-right-arrow.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
}

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
    alignSelf: 'center'
  },
  profilename: {
    marginTop: 20,
    color: '#222B45',
    fontSize: 23,
    fontWeight: '700',
    fontFamily: 'System',
    alignSelf: 'center'
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
    paddingHorizontal: 15
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
    alignSelf: 'center'
  },
  actionbuttonicon4: {
    marginTop: 8
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
