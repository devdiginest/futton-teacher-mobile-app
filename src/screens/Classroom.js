import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, Image, StyleSheet, Pressable, ScrollView, FlatList, Modal, TextInput, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Header, Text, Icon } from 'react-native-elements';
import _ from "lodash"
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import axios from '../components/Axios';
import API from "../config/api"
import { HEIGHT, WIDTH } from "../constants"
import { TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const buttons = ["Robotics", "Forensic Science"]
const lessons = ['C & C++', 'Maths', 'Physics']
const subjects = [{ label: 'Robotics', value: 'Robotics' }, { label: 'Forensic Science', value: 'Forensic Science' }, { label: 'Physics', value: 'Physics' }]

const RenderLesson = (props) => {
  const { item } = props
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState({})

  const setValues = (type, value) => {
    const temp = data == null ? {} : data
    temp[type] = value
    setData({ ...temp })
  }

  return (<>
    <Modal visible={visible} style={{ flex: 1, }} animationType="fade" transparent>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => setVisible(false)}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000090" }}>
          <Pressable style={{ width: WIDTH * 0.9, backgroundColor: "#FFFFFF", paddingHorizontal: WIDTH * 0.03, borderRadius: HEIGHT * 0.01, overflow: "hidden" }}>
            <View style={{ height: HEIGHT * 0.06, backgroundColor: "#3951B6", marginHorizontal: -WIDTH * 0.03, justifyContent: "space-between", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", alignItems: "center", }}>
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Edit lesson</Text>
              <Pressable style={{ margin: 10 }} onPress={() => setVisible(false)}><Icon type="material" name="close" color='#FFF' /></Pressable>
            </View>

            <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, }}>
              <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Subject</Text>
              <RNPickerSelect
                placeholder={{ label: "Select subject" }}
                onValueChange={(value) => setValues("subject", value)}
                items={subjects}
                value={_.has(data, "subject") ? data.subject : ""}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 30, // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 30, // to ensure the text is never behind the icon
                  },
                }}
              />
            </View>
            <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, height: HEIGHT * 0.11, flexDirection: "row", }}>
              <View style={{ justifyContent: "space-between", flex: 1 }}>
                <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Lesson name</Text>
                <TextInput
                  keyboardType="default"
                  placeholder="Enter the Lesson name"
                  onChangeText={text => { setValues("lesson_name", text) }}
                  value={_.has(data, "lesson_name") ? data.lesson_name.toString() : ""}
                />
              </View>
            </View>
            <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, flexDirection: "row", }}>
              <View style={{ justifyContent: "space-between", flex: 1 }}>
                <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Description</Text>
                <TextInput
                  style={{ alignContent: "flex-start" }}
                  keyboardType="default"
                  placeholder="Enter the description"
                  multiline
                  onChangeText={text => { setValues("description", text) }}
                  value={_.has(data, "description") ? data.description.toString() : ""}
                />
              </View>
            </View>
            <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, marginBottom: WIDTH * 0.05, height: HEIGHT * 0.11, flexDirection: "row", backgroundColor: "#FFF" }}>
              <View style={{ justifyContent: "space-between", flex: 1 }}>
                <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>File</Text>
                {/* <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>{data.file || "FILE"}</Text> */}
                <TextInput
                  editable={false}
                  //keyboardType="default"
                  //placeholder="Enter the description"
                  //onChangeText={text => { setValues("file", text) }}
                  value={_.has(data, "file") ? data.file.toString() : "FILE"}
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Icon type="material" name="attach-file" color='#3951B6' size={26} />
              </View>
            </View>
            <Button
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
              onPress={() => setVisible(false)} />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    <View style={{ borderBottomWidth: 0.5, marginTop: HEIGHT * 0.01, height: HEIGHT * 0.07, flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", borderColor: "#3951B6" }}>
        <Text numberOfLines={2} style={{ fontSize: 16, fontFamily: "System", color: "#3951B6", fontWeight: "bold" }}>{item}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable style={{ margin: 10 }} onPress={() => { }}><Icon type="material" name="play-circle-outline" color='#3951B6' /></Pressable>
        <Pressable style={{ margin: 10 }} onPress={() => setVisible(true)}><Icon type="material" name="edit" color='#3951B6' /></Pressable>
        <Pressable style={{ margin: 10 }} onPress={() => { }}><Icon type="material" name="delete-outline" color='#3951B6' /></Pressable>
      </View>
    </View></>)
}

function Classroom(props) {
  const { navigation, route: { params: { item = {} } } = { item: {} } } = props
  const [oCourses, setOCourses] = useState({});
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState({})
  const [dateShow, setDateShow] = useState(false)
  const [startTimeShow, setStartTimeShow] = useState(false)
  const [endTimeShow, setEndTimeShow] = useState(false)

  const setValues = (type, value) => {
    const temp = data == null ? {} : data
    temp[type] = value
    setData({ ...temp })
  }

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

  const getTime = (time = new Date()) => {
    let h = time.getHours()
    if (h > 11) { h = h - 12 }
    if (h < 10) { h = `0${h}` }
    let m = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
    let am_pm = time.getHours() > 11 ? "PM" : "AM"
    return `${h} : ${m} ${am_pm}`
  }

  return (<>
    <Header
      backgroundColor="#FFF"
      barStyle="dark-content"
      centerComponent={{
        text: item.name,
        style: styles.headercentercomp
      }}
      leftComponent={<Pressable onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></Pressable>}
      rightComponent={<Pressable onPress={() => setVisible(true)}><Icon type="material" name="ondemand-video" color='#3951B6' /></Pressable>}
      containerStyle={styles.headercontainer}
      rightContainerStyle={styles.headerrightcontainer}
      placement="left" />
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: HEIGHT * 0.3 }}>
          <ImageBackground style={{ height: HEIGHT * 0.3 }} source={require("../../assets/img-home-slider.png")}>
            <View style={{ flex: 1, backgroundColor: "#FFFFFF50", padding: WIDTH * 0.05, alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                {/* <Text style={{
                  color: '#3951B6', fontSize: 20, fontWeight: "700", fontFamily: 'System',
                }}>{item.name}</Text>
                <Text style={{
                  color: '#C7C7C7', fontSize: 16, fontWeight: '400', fontFamily: 'System'
                }}>{item.subjectname}</Text> */}
              </View>
              <Text style={{
                color: '#FFF', fontSize: 12, fontWeight: 'bold', fontFamily: 'System'
              }}>{`${item.start_date} to ${item.end_date}`}</Text>
            </View>
          </ImageBackground>
        </View>
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
        <ScrollView horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1, }}
          ref={ScrollViewRef}
        >
          <FlatList
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={buttons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <View style={{ width: WIDTH, paddingHorizontal: WIDTH * 0.05, }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={lessons}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RenderLesson item={item} />}
              />
            </View>}
          />
        </ScrollView>
      </ScrollView>
    </View>

    <Modal visible={visible} style={{ flex: 1, }} animationType="fade" transparent>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => setVisible(false)}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000090" }}>

          <Pressable style={{ width: WIDTH * 0.9, backgroundColor: "#FFFFFF", paddingHorizontal: WIDTH * 0.03, borderRadius: HEIGHT * 0.01, overflow: "hidden", maxHeight: HEIGHT * 0.86 }}>
            <View style={{ height: HEIGHT * 0.06, backgroundColor: "#3951B6", marginHorizontal: -WIDTH * 0.03, justifyContent: "space-between", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", alignItems: "center", }}>
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>Schedule live class</Text>
              <Pressable style={{ margin: 10 }} onPress={() => setVisible(false)}><Icon type="material" name="close" color='#FFF' /></Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, }}>
                <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Subject</Text>
                <RNPickerSelect
                  placeholder={{ label: "Select subject" }}
                  onValueChange={(value) => setValues("subject", value)}
                  items={subjects}
                  value={_.has(data, "subject") ? data.subject : ""}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingVertical: 12,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      color: 'black',
                      paddingRight: 30,
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: 'red',
                      borderRadius: 8,
                      color: 'black',
                      paddingRight: 30, // to ensure the text is never behind the icon
                    },
                  }}
                />
              </View>
              <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, }}>
                <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Lesson</Text>
                <RNPickerSelect
                  placeholder={{ label: "Select lesson" }}
                  onValueChange={(value) => setValues("lesson", value)}
                  items={subjects}
                  value={_.has(data, "lesson") ? data.lesson : ""}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingVertical: 12,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      color: 'black',
                      paddingRight: 30,
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: 'red',
                      borderRadius: 8,
                      color: 'black',
                      paddingRight: 30, // to ensure the text is never behind the icon
                    },
                  }}
                />
              </View>
              {/* <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, height: HEIGHT * 0.11, flexDirection: "row", }}>
              <View style={{ justifyContent: "space-between", flex: 1 }}>
                <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Lesson name</Text>
                <TextInput
                  keyboardType="default"
                  placeholder="Enter the Lesson name"
                  onChangeText={text => { setValues("lesson_name", text) }}
                  value={_.has(data, "lesson_name") ? data.lesson_name.toString() : ""}
                />
              </View>
            </View> */}
              <View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, flexDirection: "row", }}>
                <View style={{ justifyContent: "space-between", flex: 1 }}>
                  <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Name</Text>
                  <TextInput
                    style={{ alignContent: "flex-start" }}
                    keyboardType="default"
                    placeholder="Enter the name"
                    multiline
                    onChangeText={text => { setValues("name", text) }}
                    value={_.has(data, "name") ? data.name.toString() : ""}
                  />
                </View>
              </View>
              <Pressable onPress={() => setDateShow(true)} style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, marginBottom: WIDTH * 0.05, height: HEIGHT * 0.11, flexDirection: "row", backgroundColor: "#FFF" }}>
                <View style={{ justifyContent: "space-between", flex: 1 }}>
                  <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Date</Text>
                  <Text style={{ color: '#000', fontSize: 14, fontWeight: '500', fontFamily: 'System', marginBottom: HEIGHT * 0.01 }}>{_.has(data, "date") ? new Date(data.date).toDateString() : new Date().toDateString()}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Icon type="antdesign" name="calendar" color='#3951B6' size={26} />
                </View>
                {dateShow && <DateTimePicker
                  testID="dateTimePicker"
                  value={_.has(data, "date") ? new Date(data.date) : new Date()}
                  mode={"date"}
                  display="spinner"
                  onChange={(event, date) => {
                    setDateShow(false)
                    date && setValues("date", date)
                  }}
                />}
              </Pressable>
              <Pressable onPress={() => setStartTimeShow(true)} style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, marginBottom: WIDTH * 0.05, height: HEIGHT * 0.11, flexDirection: "row", backgroundColor: "#FFF" }}>
                <View style={{ justifyContent: "space-between", flex: 1 }}>
                  <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Start time</Text>
                  <Text style={{ color: '#000', fontSize: 14, fontWeight: '500', fontFamily: 'System', marginBottom: HEIGHT * 0.01 }}>{_.has(data, "startTime") ? getTime(data.startTime) : ""}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Icon type="material" name="access-time" color='#3951B6' size={26} />
                </View>
                {startTimeShow && <DateTimePicker
                  testID="dateTimePicker"
                  value={_.has(data, "startTime") ? new Date(data.startTime) : new Date()}
                  mode={"time"}
                  display="spinner"
                  onChange={(event, date) => {
                    setStartTimeShow(false)
                    date && setValues("startTime", date)
                  }}
                />}
              </Pressable>{console.log(new Date().toLocaleTimeString("en-US").split(/:| /))}
              <Pressable onPress={() => setEndTimeShow(true)} style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, marginBottom: WIDTH * 0.05, height: HEIGHT * 0.11, flexDirection: "row", backgroundColor: "#FFF" }}>
                <View style={{ justifyContent: "space-between", flex: 1 }}>
                  <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>End time</Text>
                  <Text style={{ color: '#000', fontSize: 14, fontWeight: '500', fontFamily: 'System', marginBottom: HEIGHT * 0.01 }}>{_.has(data, "endTime") ? getTime(data.endTime) : ""}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Icon type="material" name="access-time" color='#3951B6' size={26} />
                </View>
                {endTimeShow && <DateTimePicker
                  testID="dateTimePicker"
                  value={_.has(data, "endTime") ? new Date(data.endTime) : new Date()}
                  mode={"time"}
                  display="spinner"
                  onChange={(event, date) => {
                    setEndTimeShow(false)
                    date && setValues("endTime", date)
                  }}
                />}
              </Pressable>
            </ScrollView>
            {/*< View style={{ borderRadius: WIDTH * 0.02, padding: WIDTH * 0.03, marginBottom: WIDTH * 0.05, height: HEIGHT * 0.11, flexDirection: "row", backgroundColor: "#FFF" }}>
              <View style={{ justifyContent: "space-between", flex: 1 }}>
                <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>File</Text>
                {/* <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>{data.file || "FILE"}</Text> }
                <TextInput
                  editable={false}
                  //keyboardType="default"
                  //placeholder="Enter the description"
                  //onChangeText={text => { setValues("file", text) }}
                  value={_.has(data, "file") ? data.file.toString() : "FILE"}
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Icon type="material" name="attach-file" color='#3951B6' size={26} />
              </View>
            </View> */}
            <Button
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
              title="ADD"
              ViewComponent={LinearGradient}
              onPress={() => setVisible(false)} />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
