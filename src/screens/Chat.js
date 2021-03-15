import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { connect } from "react-redux"
import { BASE_URL } from "./../config/Constants"
import { HEIGHT, WIDTH } from '../constants';

function Chat({ route, navigation, userData }) {
  const { thread, receiverData } = route.params;
  const [messages, setMessages] = useState([]);

  const loadMessagesScreen = () => {
    navigation.goBack();
  };

  async function handleSend(messages) {
    const text = messages[0].text;

    const newMsg = {
      text,
      createdAt: new Date().getTime(),
      sender: { id: userData.id, name: userData.name },
      user: {
        _id: userData.id,

        // email : currentUser.email
        //_id: "7XdHMylSf5hnyj3CfGBjHjCdo2x2",
        // email: "jkampadi@gmail.com"
      }
    }
    await firestore()
      .collection('chat-history')
      .doc(thread._id)
      .collection('chats')
      .add(newMsg);

    const threadData = await firestore().collection('chat-history').doc(thread._id).get()
    const fieldPath = new firestore.FieldPath("lastMessage")
    const unreadMsgCount = new firestore.FieldPath("unreadMsgCount")

    let lastMessage = []
    if (threadData.get(fieldPath)) {
      lastMessage = [...threadData.get(fieldPath), newMsg]
    } else {
      lastMessage = [newMsg]
    }

    await firestore().collection('chat-history').doc(thread._id).update({ lastMsgSender: userData.id, lastMessage: text, unreadMsgCount: firestore.FieldValue.increment(1), updatedAt: new Date().getTime() })

    /* await firestore()
      .collection('techerChats')
      .doc(thread._id)
      .set({
        latestMessage: {
          text,
          createdAt: new Date().getTime()
        }
      }, {
        merge: true
      }); */
  }

  useEffect(() => {
    const messagesListener = firestore().collection('chat-history').doc(thread._id).collection('chats').orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: firebaseData.createdAt,
            // ...firebaseData
            user: {
              _id: firebaseData.sender.id,
              name: firebaseData.sender.name
            }
          }
          setMsgReadStatus()
          return data;
        });

        setMessages(messages);
      });

    setDetails()


    return () => messagesListener();
  }, []);

  const setMsgReadStatus = async () => {
    const threadData = await firestore().collection('chat-history').doc(thread._id).get()
    const countPath = new firestore.FieldPath("unreadMsgCount")
    const lastMsgSenderPath = new firestore.FieldPath("lastMsgSender")
    if (lastMsgSenderPath && threadData.get(lastMsgSenderPath) && threadData.get(lastMsgSenderPath) != userData.id) {
      if (countPath && threadData.get(countPath)) {
        await firestore().collection('chat-history').doc(thread._id).update({ unreadMsgCount: firestore.FieldValue.delete() })
      }
    }
  }

  const setDetails = async () => {
    const threadData = await firestore().collection('chat-history').doc(thread._id).get()
    const fieldPath = new firestore.FieldPath("users")
    const users = threadData.get(fieldPath)

    const senderDetails = {}
    senderDetails[userData.id] = userData
    setMsgReadStatus()
    if (users) {
      if (users.filter((item) => item == userData.id).length == 0) {
        users.push(userData.id)
        await firestore().collection('chat-history').doc(thread._id).update({ users, ...senderDetails })
      }
    } else {
      await firestore().collection('chat-history').doc(thread._id).update({ users: [userData.id], ...senderDetails })
    }
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { backgroundColor: '#F4F4F4', borderRadius: 5 },
          right: { backgroundColor: '#3951B6', borderRadius: 5 }
        }}
        textStyle={{
          left: { color: '#222B45' },
          right: { color: '#FFF' }
        }} />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, borderWidth: 1 }}>
      {/* <Header
        backgroundColor="#FFF"
        barStyle="dark-content"
        centerComponent={{
          text: receiverData.name,
          style: styles.headercentercomp
        }}
        containerStyle={styles.headercontainer}
        leftComponent={{
          icon: 'arrow-back',
          color: '#3951B6',
          onPress: loadMessagesScreen
        }}
        placement="left" /> */}
      <View style={{ marginTop: HEIGHT * 0.035, height: HEIGHT * 0.07, width: WIDTH, paddingHorizontal: WIDTH * 0.05, alignItems: "center", flexDirection: "row", backgroundColor: "#3951B6" }}>
        <Pressable style={{ marginRight: WIDTH * 0.05 }} onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#FFF' /></Pressable>
        <Pressable style={{}} onPress={() => navigation.navigate("ChatInfo", { item: receiverData })}>
          <Image
            style={{ height: HEIGHT * 0.06, width: HEIGHT * 0.06, borderWidth: 1, borderRadius: HEIGHT * 0.03 }}
            source={receiverData.photo ? { uri: `${BASE_URL}profilepics/${receiverData.photo}` } : require("../../assets/profile-image-placeholder.png")}
            resizeMode="cover"
          /></Pressable>
        <View style={{ marginLeft: WIDTH * 0.05, flex: 1 }}>
          <Text style={{
            color: '#FFF',
            fontSize: 16,
            fontWeight: '700',
            fontFamily: 'System',
          }}>{receiverData.name}</Text>
          <Text style={{
            color: '#C7C7C7',
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'System',
          }}>{receiverData.email}</Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <GiftedChat
          user={{ _id: userData.id }}
          messages={messages}
          renderBubble={renderBubble}
          placeholder="Type your message here"
          alwaysShowSend
          onSend={handleSend} />
      </View>

    </SafeAreaView>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  const { userData } = state.auth
  return {
    userData: userData,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

const styles = StyleSheet.create({
  headercontainer: {
    paddingLeft: 24,
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
  }
});
