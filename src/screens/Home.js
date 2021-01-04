import React, { useEffect, useState}   from 'react';
import { FlatList, Image, ScrollView } from 'react-native';
import { StyleSheet, Text, View }      from 'react-native';
import { TouchableOpacity }            from 'react-native';
import { SafeAreaView }                from 'react-native-safe-area-context';
import { SliderBox }                   from 'react-native-image-slider-box';
import { useDispatch, useSelector }    from 'react-redux';
import axios                           from '../components/Axios';

const sliderImages = [
  require('../../assets/img-home-slider.png'),
  require('../../assets/img-home-slider.png'),
  require('../../assets/img-home-slider.png'),
  require('../../assets/img-home-slider.png')
];

const screenData = {
  "upcoming" : [{
    "id"    : 1,
    "name"  : "GATE 2021 Alpha Batch",
    "sdate" : "20-11-2020"
  }, {
    "id"    : 2,
    "name"  : "Basic Intro to Chemistry",
    "sdate" : "20-11-2020"
  }],
  "ongoing" : [{
    "id"       : 1,
    "name"     : "GATE 2021 Premium Batch",
    "ratings"  : "4.6",
    "reviews"  : 1435
  }, {
    "id"       : 2,
    "name"     : "GATE 2021 Alpha Batch 2",
    "ratings"  : "4.0",
    "reviews"  : 243
  }]
};

export default function Home({ navigation }) {
  const [ loading, setLoading ]   = useState(true);
  const [ uCourses, setUCourses ] = useState({});
  const [ oCourses, setOCourses ] = useState({});

  const auth      = useSelector(state => state.auth);
  const dispatch  = useDispatch();
  const userToken = auth.token ? auth.token : null;
  const Axios     = axios(userToken);

  const showMyCoursesTab = () => {
    navigation.navigate('My Courses');
  }
  const showMyCoursesTab2 = () => {
    navigation.navigate('My Courses');
  }
  const showClassroom = () => {
    navigation.navigate('Classroom');
  }

  const getHomeData = async () => {
    await Axios
      .get('mobile/home')
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

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <SliderBox
          images={sliderImages}
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
              keyExtractor= {(item) => { return item.id.toString(); }}
              renderItem={({item}) => {
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
              keyExtractor= {(item) => { return item.id.toString(); }}
              renderItem={({item}) => {
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
    padding: 24
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
    flexDirection:'column',
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
    alignItems: 'center'
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
    padding: 15,
    flexDirection:'row',
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
    alignItems: 'center'
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