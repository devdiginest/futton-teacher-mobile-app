import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { connect } from "react-redux"

function Chat({ route, navigation, userData }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);

  const loadMessagesScreen = () => {
    navigation.goBack();
  };

  async function handleSend(messages) {
    const text = messages[0].text;

    await firestore()
      .collection('chat-history')
      .doc(thread._id)
      .collection('chats')
      .add({
        text,
        createdAt: new Date().getTime(),
        sender: { id: userData.id, name: userData.name },
        user: {
          _id: userData.id,

          // email : currentUser.email
          //_id: "7XdHMylSf5hnyj3CfGBjHjCdo2x2",
          // email: "jkampadi@gmail.com"
        }
      });

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

          return data;
        });
        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

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
    <Fragment>
      <Header
        backgroundColor="#FFF"
        barStyle="dark-content"
        centerComponent={{
          text: "Chat",
          style: styles.headercentercomp
        }}
        containerStyle={styles.headercontainer}
        leftComponent={{
          icon: 'arrow-back',
          color: '#3951B6',
          onPress: loadMessagesScreen
        }}
        placement="left" />

      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <GiftedChat
          user={{ _id: userData.id }}
          messages={messages}
          renderBubble={renderBubble}
          placeholder="Type your message here"
          alwaysShowSend
          onSend={handleSend} />
      </View>
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
