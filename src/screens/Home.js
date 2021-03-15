import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SliderBox } from 'react-native-image-slider-box';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Text, Icon } from 'react-native-elements';
import _ from "lodash"
import { TabActions } from '@react-navigation/native';
import axios from '../components/Axios';
import API from "./../config/api"
import { API_URL, BASE_URL } from "./../config/Constants"
import { setProfileData } from "../actions/Auth"
import { CourseComponent, EmptyList, Loader } from "./../components"
import { HEIGHT, WIDTH } from "../constants"

function Home({ navigation, userData }) {
  const [loading, setLoading] = useState(true);
  const [uCourses, setUCourses] = useState([]);
  const [oCourses, setOCourses] = useState([]);
  const [slider, setSlider] = useState([]);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);

  const showMyCoursesTab = (route = "Upcoming") => {
    //const jumpToAction = TabActions.jumpTo('My Courses', { screen: 'MyCourses', params: { route } });
    //navigation.dispatch(jumpToAction);
    navigation.navigate('My Courses', { route })
  }


  const getHomeData = async () => {
    await Axios
      .get('mobile/mycourses')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            setUCourses(_.unionBy(data.upcoming, "id"));
            setOCourses(_.unionBy(data.ongoing, "id"));
          }
        }
      })
      .catch(err => console.log(err));
    setLoading(false)
  };

  const getHomeSliderData = async () => {
    await Axios.get(API.homeSlider)
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          const temp = []
          if (data) {
            data.map((item) => {
              _.has(item, "image") && temp.push(`${BASE_URL}sliders/${item.image}`)
            })
          }
          setSlider([...temp])
        }
      })
      .catch(err => console.log(err));
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
    getHomeSliderData()
    getHomeData();
    getProfile()
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: HEIGHT * 0.07, width: WIDTH, paddingHorizontal: WIDTH * 0.05, alignItems: "center", flexDirection: "row", backgroundColor: "#3951B6" }}>
        <Image
          style={{ height: HEIGHT * 0.06, width: HEIGHT * 0.06, borderWidth: 1, borderRadius: HEIGHT * 0.03 }}
          source={userData.photo ? { uri: `${BASE_URL}profilepics/${userData.photo}` } : require("../../assets/profile-image-placeholder.png")}
          resizeMode="cover"
        />
        <View style={{ marginLeft: WIDTH * 0.05, flex: 1 }}>
          <Text style={{
            color: '#FFF',
            fontSize: 16,
            fontWeight: '700',
            fontFamily: 'System',
          }}>{userData.name}</Text>
          <Text style={{
            color: '#C7C7C7',
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'System',
          }}>{userData.email}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Notifications")} style={{ width: WIDTH * 0.1, height: "100%", justifyContent: "center" }}>
          <Icon size={24} name='bell' type='simple-line-icon' color='#FFF' />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <SliderBox
          images={slider}
          dotColor="#3951B6"
          inactiveDotColor="#FFF"
          sliderBoxHeight={292}
          autoplay />

        <View style={styles.coursesContainer}>
          <View style={styles.ongcourses}>
            <View style={styles.ongcoursesheader}>
              <Text style={styles.secheading}>Upcoming Courses</Text>
              <Text style={styles.secviewall} onPress={() => showMyCoursesTab()}>View all</Text>
            </View>

            <FlatList
              data={uCourses}
              style={styles.courses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (<CourseComponent item={item} />)
              }}
              ListEmptyComponent={<EmptyList />}
            />
          </View>

          <View style={styles.allcourses}>
            <View style={styles.allcoursesheader}>
              <Text style={styles.secheading}>Ongoing Courses</Text>
              <Text style={styles.secviewall} onPress={() => showMyCoursesTab("Ongoing")}>View all</Text>
            </View>

            <FlatList
              data={oCourses}
              style={styles.courses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (<CourseComponent item={item} />)
              }}
              ListEmptyComponent={<EmptyList />}
            />
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    backgroundColor: '#FFF'
  },
  coursesContainer: {
    paddingVertical: 24,
  },
  secheading: {
    color: '#333',
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  secviewall: {
    flex: 1,
    textAlign: 'right',
    color: '#3951B6',
    fontSize: 15,
    fontFamily: 'System'
  },
  todaysclasses: {
    marginTop: 10
  },
  todaysclassesheader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  classes: {
    paddingVertical: 20,
    paddingHorizontal: 1
  },
  class: {
    marginRight: 10,
    padding: 15,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    shadowColor: '#26000000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 4,
    borderRadius: 6
  },
  classsubject: {
    marginTop: 10,
    color: '#3951B6',
    fontSize: 14,
    fontFamily: 'System'
  },
  classtiming: {
    marginTop: 10,
    color: '#C7C7C7',
    fontSize: 12,
    fontFamily: 'System'
  },
  ongcourses: {
    marginTop: 20
  },
  ongcoursesheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12
  },
  courses: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 0,
    width: '100%'
  },
  course: {
    marginBottom: 10,
    marginHorizontal: 12,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    shadowColor: '#26000000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 4,
    borderRadius: 6
  },
  cimg: {
    width: 100
  },
  cdetails: {
    marginLeft: 15
  },
  cname: {
    color: '#262626',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System'
  },
  cprogress: {
    marginTop: 12,
    color: '#3951B6',
    fontSize: 12,
    fontFamily: 'System'
  },
  cprogressbar: {
    marginTop: 5,
    width: '100%',
    borderRadius: 100
  },
  allcourses: {
    marginTop: 30
  },
  allcoursesheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12
  },
  cprice: {
    marginTop: 5,
    color: '#3951B6',
    fontSize: 12,
    fontFamily: 'System'
  },
  cratingsnreviews: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cstar: {
    width: 14,
    height: 13
  },
  cratings: {
    marginLeft: 5,
    color: '#8F9BB3',
    fontSize: 12,
    fontFamily: 'System'
  },
  creviews: {
    marginLeft: 5,
    color: '#C5CEE0',
    fontSize: 12,
    fontFamily: 'System'
  }
});