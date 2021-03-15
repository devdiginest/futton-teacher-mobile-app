import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '@kimche/react-native-progress-bar';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../components/Axios';
import { CourseComponent, EmptyList } from "./../components"
import _ from "lodash"
export default function MyCoursesOngoing({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [oCourses, setOCourses] = useState([]);

  const auth = useSelector(state => state.auth);
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);

  const getMyCourses = async () => {
    await Axios
      .get('mobile/mycourses')
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          if (data) {
            setOCourses(_.unionBy(data.ongoing, "id"));
          }
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={oCourses}
        style={styles.flatlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          /*  return (
             <TouchableOpacity style={styles.ocourse}>
               <Text style={styles.ocourseno}>{index < 10 ? ('0' + (++index)) : (++index)}</Text>
 
               <View>
                 <Text style={styles.cname}>{item.name}</Text>
                 <Text style={styles.cprogress}>Progress: 50%</Text>
                 <ProgressBar
                   max={100}
                   width={72}
                   height={4}
                   progress={50}
                   progressColor="#3951B6"
                   style={styles.cprogressbar} />
               </View>
             </TouchableOpacity>
           ) */
          return (<CourseComponent item={item} />)
        }}
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFF'
  },
  flatlist: {
    paddingTop: 17,
    paddingBottom: 17
  },
  ocourse: {
    marginTop: 8,
    marginBottom: 7,
    marginLeft: 24,
    marginRight: 24,
    padding: 15,
    paddingLeft: 20,
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
  ocourseno: {
    width: 45,
    color: '#464646',
    fontSize: 20,
    fontFamily: 'System'
  },
  cname: {
    color: '#464646',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System'
  },
  cprogress: {
    marginTop: 12,
    color: '#464646',
    fontSize: 12,
    fontFamily: 'System'
  },
  cprogressbar: {
    marginTop: 5,
    borderRadius: 100
  }
});
