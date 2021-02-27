import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SliderBox } from 'react-native-image-slider-box';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../components/Axios';
import _ from "lodash"
import API from "./../config/api"
import { API_URL, BASE_URL } from "./../config/Constants"
import { setProfileData } from "../actions/Auth"

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [uCourses, setUCourses] = useState({});
  const [oCourses, setOCourses] = useState({});
  const [slider, setSlider] = useState([]);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);

  const showMyCoursesTab = () => {
    navigation.navigate('My Courses', { route: "Upcoming" });
  }
  const showMyCoursesTab2 = () => {
    navigation.navigate('My Courses', { route: "Ongoing" });
  }
  const showClassroom = () => {
    navigation.navigate('Classroom');
  }

  const getHomeData = async () => {
    await Axios
      .get('mobile/mycourses')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            setUCourses(data.upcoming);
            setOCourses(data.ongoing);
          }
        }
      })
      .catch(err => console.log(err));
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
            console.log('====================================');
            console.log("PROFILE DATA =>", JSON.stringify(data));
            console.log('====================================');
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

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <SliderBox
          images={slider}
          dotColor="#7C98FD"
          inactiveDotColor="#FFF"
          sliderBoxHeight={292}
          autoplay />

        <View style={styles.coursesContainer}>
          <View style={styles.ongcourses}>
            <View style={styles.ongcoursesheader}>
              <Text style={styles.secheading}>Upcoming Courses</Text>
              <Text style={styles.secviewall} onPress={showMyCoursesTab}>View all</Text>
            </View>

            <FlatList
              data={uCourses}
              style={styles.courses}
              keyExtractor={(item) => { return item.id.toString(); }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.course}>
                    <Image style={styles.cimg} source={require('../../assets/img-course.png')} />

                    <View style={styles.cdetails}>
                      <Text style={styles.cname}>{item.name}</Text>
                      <Text style={styles.cprogress}>Starting on {item.start_date}</Text>
                    </View>
                  </View>
                )
              }} />
          </View>

          <View style={styles.allcourses}>
            <View style={styles.allcoursesheader}>
              <Text style={styles.secheading}>Ongoing Courses</Text>
              <Text style={styles.secviewall} onPress={showMyCoursesTab2}>View all</Text>
            </View>

            <FlatList
              data={oCourses}
              style={styles.courses}
              keyExtractor={(item) => { return item.id.toString(); }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.course} onPress={showClassroom}>
                    <Image style={styles.cimg} source={require('../../assets/img-course.png')} />

                    <View style={styles.cdetails}>
                      <Text style={styles.cname}>{item.name}</Text>

                      <View style={styles.cratingsnreviews}>
                        <Image style={styles.cstar} source={require('../../assets/img-course-star.png')} />
                        <Text style={styles.cratings}>{item.ratings != null ? item.ratings.substring(0, 3) : 0}</Text>
                        <Text style={styles.creviews}>({item.reviews} Reviews)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
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