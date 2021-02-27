import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, Image, StyleSheet, Pressable, ScrollView, FlatList, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Header, Text, Icon } from 'react-native-elements';

import axios from '../components/Axios';
import API from "../config/api"
import { HEIGHT, WIDTH } from "../constants"


const buttons = ["Robotics", "Forensic Science"]


function Classroom(props) {
  const { navigation, route: { params: { item = {} } } = { item: {} } } = props
  const [oCourses, setOCourses] = useState({});
  const [selected, setSelected] = useState(0);
  const ScrollViewRef = useRef(null)
  const auth = useSelector(state => state.auth);
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);

  const getMyCourses = async () => {
    await Axios
      .get(API.courseDetails(item.id))
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          console.log("courseDetails ==>", item);
          if (data) {
            setOCourses(data.ongoing);
          }
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  useEffect(() => {
    ScrollViewRef.current?.scrollTo({ x: selected * WIDTH, animated: true })
  }, [selected])

  return (<>
    <Header
      backgroundColor="#FFF"
      barStyle="dark-content"
      centerComponent={{
        text: item.name,
        style: styles.headercentercomp
      }}
      leftComponent={<Pressable onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></Pressable>}
      rightComponent={{ icon: 'edit', color: '#3951B6' }}
      containerStyle={styles.headercontainer}
      rightContainerStyle={styles.headerrightcontainer}
      placement="left" />
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ height: HEIGHT * 0.05 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={buttons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <Pressable onPress={() => setSelected(index)} style={{ height: HEIGHT * 0.05, paddingHorizontal: WIDTH * 0.05, alignItems: "center", justifyContent: "center", backgroundColor: selected == index ? '#3951B6' : "#FFF" }}>
            <Text style={{ fontSize: 16, fontFamily: "System", color: selected != index ? '#3951B6' : "#FFF" }}>{item}</Text>
          </Pressable>}
        />
      </View>

      <ScrollView horizontal style={{ flex: 1, }}
        ref={ScrollViewRef}
      >
        <FlatList
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={buttons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <View onPress={() => setSelected(index)} style={{ flex: 1, width: WIDTH, paddingHorizontal: WIDTH * 0.05, alignItems: "center", justifyContent: "center", }}>
            <Text style={{ fontSize: 16, fontFamily: "System", color: selected != index ? '#3951B6' : "#FFF" }}>{item}</Text>
          </View>}
        />
      </ScrollView>

    </View>
    {/* <View style={styles.ocontainer}>
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
    </View> */}
  </>
  );
}

export default Classroom

const styles = StyleSheet.create({
  headercentercomp: {
    color: '#3951B6',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System'
  },
  headercontainer: {
    width: '100%',
    borderBottomWidth: 1.5,
    elevation: 10
  },
  headerrightcontainer: {
    paddingRight: 10
  },
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
    flexDirection: 'row'
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
