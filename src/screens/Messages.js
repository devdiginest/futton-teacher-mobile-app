import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Pressable, Modal, TouchableWithoutFeedback, SectionList } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import _ from 'lodash';
import { HEIGHT, WIDTH } from '../constants';
import axios from '../components/Axios';
import API from "./../config/api"
import { BASE_URL } from "../config/Constants"
import { useDispatch, useSelector, connect } from 'react-redux';

function Messages({ navigation, userData }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false)
  const [sectionData, setSectionData] = useState([])
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);

  useEffect(() => {
    const unsubscribe = firestore().collection('chat-history').onSnapshot((querySnapshot) => {
      let thread = []
      querySnapshot.docs.forEach((documentSnapshot) => {
        if (documentSnapshot.id.includes(userData.id)) {
          thread.push({ _id: documentSnapshot.id, ...documentSnapshot.data() });
        }
      });
      setThreads(_.orderBy(thread, 'updatedAt', 'desc'));
      if (loading) {
        setLoading(false);
      }
    });
    getStudentList()
    getAdminList()
    return () => unsubscribe();
  }, []);

  const getStudentList = async () => {
    await Axios.get(API.studentList(userData.id)).then(response => {
      if (response.status === 200) {
        const data = response.data;
        if (data) {
          sectionData.push({ title: "Students", data: _.unionBy(data, "id") })
          setSectionData(sectionData)
        }
      }
    }).catch(err => console.log(err));
  };

  const getAdminList = async () => {
    await Axios.get(API.adminList).then(response => {
      if (response.status === 200) {
        const data = response.data;
        if (data) {
          sectionData.push({ title: "Admins", data: _.unionBy(data, "id") })
          setSectionData(sectionData)
        }
      }
    }).catch(err => console.log(err));
  };

  const createChat = (receiverData = {}) => {
    const msg = threads.filter((item) => item._id.includes(receiverData.id))
    setVisible(false)
    if (msg.length > 0) {
      navigation.navigate('Chat', { thread: msg[0], receiverData })
    } else {
      let setValues = {
        users: [receiverData.id, userData.id]
      }
      setValues[receiverData.id] = receiverData
      setValues[userData.id] = userData
      setValues["updatedAt"] = new Date().getTime()
      firestore().collection('chat-history').doc(`${userData.id}-${receiverData.id}`).set(setValues)
      navigation.navigate('Chat', { thread: { _id: `${userData.id}-${receiverData.id}` }, receiverData })
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Header
        backgroundColor="#FFF"
        barStyle="dark-content"
        centerComponent={{
          text: "Messages",
          style: styles.headercentercomp
        }}
        containerStyle={styles.headercontainer}
        placement="left" />
      <FlatList
        data={threads}
        style={styles.container}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => { return (<View style={styles.separator} />) }}
        renderItem={item => {
          const msg = item.item;
          const receiver = !_.isEmpty(msg.users) ? msg.users.filter((item) => item != userData.id) : []
          const receiverData = receiver.length > 0 ? msg[receiver[0]] : {}
          return (
            <TouchableOpacity
              style={styles.ncontainer}
              onPress={() => navigation.navigate('Chat', { thread: msg, receiverData })}>
              <Image style={styles.avatar} source={receiverData.photo ? { uri: `${BASE_URL}profilepics/${receiverData.photo}` } : require("../../assets/profile-image-placeholder.png")} />
              <View style={{ flex: 1, paddingLeft: WIDTH * 0.05, height: "100%", borderBottomWidth: 0, flexDirection: "row", justifyContent: "space-between", borderColor: "#3951B6" }}>
                <View style={{}}>
                  <Text style={{
                    width: '100%',
                    color: '#222B45',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>{receiverData.name}</Text>
                  <Text numberOfLines={2} style={{
                    width: '100%',
                    color: '#c7c7c7',
                    fontSize: 15,
                    fontWeight: '400',
                  }}>{msg.lastMessage}</Text>
                </View>
                <View style={{ width: WIDTH * 0.1, alignItems: "center", justifyContent: "center" }}>
                  {_.has(msg, "lastMsgSender") && msg.lastMsgSender != userData.id && _.has(msg, "unreadMsgCount") && msg.unreadMsgCount > 0 && <View style={{ width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: WIDTH * 0.035, justifyContent: "center", alignItems: "center", backgroundColor: "green" }}>
                    <Text style={{ color: '#FFF', fontSize: 14, fontWeight: 'bold' }}>{msg.unreadMsgCount}</Text>
                  </View>}
                </View>
              </View>

              {/*  <Text style={styles.timeAgo}>{/*msg.latestMessage == null ? '' : msg.latestMessage.createdAt}</Text>
              </View> */}

            </TouchableOpacity>
          );
        }} />

      {/*<FlatList
        data={screenData}
        style={styles.container}
        extraData={screenData}
        keyExtractor={item => { return item.id.toString(); }}
        ItemSeparatorComponent={() => { return ( <View style={styles.separator} /> )}}
        renderItem={item => {
          const message = item.item;

          return(
            <TouchableOpacity
              style={styles.ncontainer}
              onPress={() => navigation.navigate('Chat', { thread: item })}>
              <Image style={styles.avatar} source={require('../../assets/icon-user-notification1.png')} />

              <View style={styles.content}>
                <View style={styles.message}>
                  <Text style={styles.name}>{message.name}</Text>
                  <Text>{message.text}</Text>
                </View>

                <Text style={styles.timeAgo}>{message.time}</Text>
              </View>
            </TouchableOpacity>
          );
        }} />*/}
      <Pressable onPress={() => setVisible(true)} style={{ height: HEIGHT * 0.06, width: HEIGHT * 0.06, position: "absolute", borderRadius: HEIGHT * 0.03, bottom: HEIGHT * 0.03, right: HEIGHT * 0.03, shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: HEIGHT * 0.03, elevation: 4, backgroundColor: "#3951B6", justifyContent: "center", alignItems: "center" }}>
        <Icon type="material-community" name="message-text-outline" color='#FFF' size={26} />
      </Pressable>
      <Modal visible={visible} style={{ flex: 1, }} animationType="fade" transparent>
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => setVisible(false)}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000090", }}>
            <Pressable style={{ width: WIDTH * 0.9, backgroundColor: "#FFFFFF", paddingHorizontal: WIDTH * 0.03, borderRadius: HEIGHT * 0.01, overflow: "hidden" }}>
              <View style={{ height: HEIGHT * 0.06, backgroundColor: "#3951B6", marginHorizontal: -WIDTH * 0.03, justifyContent: "space-between", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", alignItems: "center", }}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Contacts</Text>
                <Pressable style={{ margin: 10 }} onPress={() => setVisible(false)}><Icon type="material" name="close" color='#FFF' />

                </Pressable>
              </View>
              <SectionList
                showsVerticalScrollIndicator={false}
                sections={sectionData}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 12, maxHeight: HEIGHT * 0.8 }}
                renderSectionHeader={({ section: { title } }) => <View style={{ height: HEIGHT * 0.06, backgroundColor: "#3951B6", marginHorizontal: -WIDTH * 0.03, justifyContent: "space-between", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", alignItems: "center", }}>
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>{title}</Text>
                </View>}
                renderItem={({ item, index }) => {
                  return (<Pressable onPress={() => {
                    createChat({
                      id: item.id,
                      email: item.email,
                      name: item.name,
                      photo: item.photo,
                      mobile_no: item.mobile_no
                    })
                  }} style={{ height: HEIGHT * 0.11, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', borderBottomWidth: 0.5, borderColor: "#3951B6" }}>
                    <View style={{ width: HEIGHT * 0.07 }}>
                      <Image defaultSource={require("../../assets/profile-image-placeholder.png")} source={item.photo ? { uri: `${BASE_URL}profilepics/${item.photo}` } : require("../../assets/profile-image-placeholder.png")} style={{ flex: 1, width: HEIGHT * 0.06, }} resizeMode={item.photo ? "cover" : "contain"} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "space-between" }}>
                      <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{item.name}</Text>
                      <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.mobile_no}</Text>
                      <Text numberOfLines={1} style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.email}</Text>
                    </View>
                  </Pressable>)
                }}
              />

              {/*  <Button
              containerStyle={{
                //marginTop: 35,
                //width: '100%'
                marginHorizontal: -WIDTH * 0.03,
              }}
              buttonStyle={{
                height: 57,
                color: '#FFF',
                fontSize: 17,
                fontFamily: 'System',
                borderRadius: 0
              }}
              //loading={auth.loggingIn}
              linearGradientProps={{
                colors: ['#0066D1', '#03C0C7'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 }
              }}
              title="Update"
              ViewComponent={LinearGradient}
              onPress={() => [editLesson(), setVisible(false)]} /> */}
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages)


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
    paddingTop: 10,
    backgroundColor: '#FFF'
  },
  separator: {
    height: 1,
    backgroundColor: "#E2E8ED"
  },
  ncontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: WIDTH * 0.05,
    marginVertical: HEIGHT * 0.01,
  },
  avatar: {
    width: HEIGHT * 0.07,
    height: HEIGHT * 0.07,
    borderRadius: HEIGHT * 0.035
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: WIDTH * 0.05,
    justifyContent: "center",
  },
  message: {

    fontSize: 15, paddingLeft: WIDTH * 0.05, height: "100%",
    // borderBottomWidth: 1
  },
  name: {
    width: '100%',
    color: '#222B45',
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeAgo: {
    color: "#C5CEE0",
    fontSize: 13,
  }
});
