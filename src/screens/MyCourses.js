import React, { Fragment }               from 'react';
import { useEffect, useState}            from 'react';
import { StyleSheet }                    from 'react-native';
import { Header }                        from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector }      from 'react-redux';
import axios                             from '../components/Axios';
import MyCoursesUpcoming                 from './My-Courses-Upcoming';
import MyCoursesOngoing                  from './My-Courses-Ongoing';
import MyCoursesCompleted                from './My-Courses-Completed';

const Tab = createMaterialTopTabNavigator();

export default function MyCourses() {
  const [ loading, setLoading ]   = useState(true);
  const [ uCourses, setUCourses ] = useState({});
  const [ oCourses, setOCourses ] = useState({});
  const [ cCourses, setCCourses ] = useState({});

  const auth      = useSelector(state => state.auth);
  const userToken = auth.token ? auth.token : null;
  const Axios     = axios(userToken);

  const getMyCourses = async () => {
    await Axios
      .get('mobile/mycourses')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            setUCourses(data.upcoming);
            setOCourses(data.ongoing);
            // setCCourses(data.completed);
          }
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <Fragment>
      <Header
        backgroundColor="#FFF"
        barStyle="default"
        centerComponent={{
          text: "My Courses",
          style: styles.header
        }}
        containerStyle={styles.haederContainerStyle}
        placement="left" />

      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#3951B6',
          inactiveTintColor: '#A2A2A2',
          labelStyle: { fontSize: 14 }
        }}>
        <Tab.Screen
          name="Upcoming"
          options={{ tabBarLabel: 'Upcoming' }}
          component={MyCoursesUpcoming} />
        <Tab.Screen
          name="Ongoing"
          options={{ tabBarLabel: 'Ongoing' }}
          component={MyCoursesOngoing} />
        <Tab.Screen
          name="Completed"
          options={{ tabBarLabel: 'Completed' }}
          component={MyCoursesCompleted} />
      </Tab.Navigator>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  haederContainerStyle: {
    width: '100%'
  },
  header: {
    color: '#3951B6',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System'
  }
});
