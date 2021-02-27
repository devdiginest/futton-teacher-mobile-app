import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { connect } from "react-redux"
import Loading from '../components/Loading';
import _ from 'lodash';

const screenData = [{
  id: 1,
  image: "../../assets/icon-msg-student1.png",
  name: "Student 1",
  text: "Yah, I have 3 lessons for you.",
  time: "30 min ago"
}, {
  id: 2,
  image: "../../assets/icon-msg-student2.png",
  name: "Student 2",
  text: "Yah, I have 3 lessons for you.",
  time: "Yesterday"
}, {
  id: 3,
  image: "../../assets/icon-msg-student3.png",
  name: "Student 3",
  text: "Yah, I have 3 lessons for you.",
  time: "11 Jan 2020"
}, {
  id: 4,
  image: "../../assets/icon-msg-student4.png",
  name: "Student 4",
  text: "Yah, I have 3 lessons for you.",
  time: "11 Jan 2020"
}, {
  id: 5,
  image: "../../assets/icon-msg-student5.png",
  name: "Student 5",
  text: "Yah, I have 3 lessons for you.",
  time: "11 Jan 2020"
}];

function Messages({ navigation, userData }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore().collection('chat-history').onSnapshot((querySnapshot) => {
      let thread = []
      querySnapshot.docs.forEach((documentSnapshot) => {
        if (documentSnapshot.id.includes(userData.id)) {
          thread.push({ _id: documentSnapshot.id, ...documentSnapshot.data() });
        }
      });
      setThreads(thread);
      if (loading) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
          return (
            <TouchableOpacity
              style={styles.ncontainer}
              onPress={() => navigation.navigate('Chat', { thread: msg })}>
              <Image style={styles.avatar} source={require('../../assets/icon-user-notification1.png')} />

              <View style={styles.content}>
                <View style={styles.message}>
                  <Text style={styles.name}>{msg.name}</Text>
                  <Text>No Messages</Text>
                </View>

                <Text style={styles.timeAgo}>{/*msg.latestMessage == null ? '' : msg.latestMessage.createdAt*/}</Text>
              </View>
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
    padding: 24,
    paddingTop: 10,
    backgroundColor: '#FFF'
  },
  separator: {
    height: 1,
    backgroundColor: "#E2E8ED"
  },
  ncontainer: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
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
    flex: 1,
    alignItems: 'center'
  },
  message: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: '#8F9BB3',
    fontSize: 15
  },
  name: {
    width: '100%',
    color: '#222B45',
    fontSize: 15,
    fontWeight: 'bold'
  },
  timeAgo: {
    color: "#C5CEE0",
    fontSize: 13
  }
});
