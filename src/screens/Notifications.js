import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, StatusBar, Pressable } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { Header, Text, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../components/Axios';

export default function Notifications({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({});

  const auth = useSelector(state => state.auth);
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);

  const getNotifications = async () => {
    await Axios
      .get('mobile/notifications')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            setNotifications(data);
          }
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Fragment>
      <Header
        backgroundColor="#FFF"
        barStyle="dark-content"
        centerComponent={{
          text: "Notifications",
          style: styles.headercentercomp
        }}
        leftComponent={<Pressable onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></Pressable>}
        containerStyle={styles.headercontainer}
        placement="left" />
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={notifications}
        style={styles.container}
        extraData={notifications}
        keyExtractor={(item) => { return item.id.toString(); }}
        ItemSeparatorComponent={() => { return (<View style={styles.separator} />) }}
        renderItem={(item) => {
          const notificationn = item.item;

          return (
            <View style={styles.ncontainer}>
              <Image source={require('../../assets/icon-user-notification1.png')} style={styles.avatar} />

              <View style={styles.content}>
                <View style={styles.message}>
                  <Text style={styles.name}>{notificationn.title}</Text>
                  <Text>{notificationn.msg}</Text>
                </View>

                <Text style={styles.timeago}>{notificationn.received_date}</Text>
              </View>
            </View>
          );
        }
        } />
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
  container: {
    padding: 24,
    paddingTop: 10,
    backgroundColor: '#FFF'
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8ED'
  },
  ncontainer: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  content: {
    marginLeft: 16,
    marginRight: 0,
    flex: 1
  },
  message: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: '#8F9BB3',
    fontSize: 15,
    fontFamily: 'System'
  },
  name: {
    width: '100%',
    color: '#222B45',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'System'
  },
  timeago: {
    color: '#C5CEE0',
    fontSize: 13,
    fontFamily: 'System'
  }
});
