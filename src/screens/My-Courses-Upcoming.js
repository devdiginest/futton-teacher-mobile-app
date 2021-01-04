import React, { useEffect, useState}    from 'react';
import { FlatList, StyleSheet }         from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector }     from 'react-redux';
import axios                            from '../components/Axios';

const screenData = [{
  "id"    : 1,
  "name"  : "GATE 2021 Alpha Batch",
  "sdate" : "20-11-2020"
}, {
  "id"    : 2,
  "name"  : "Basic Intro to Chemistry",
  "sdate" : "20-11-2020"
}];

export default function MyCoursesUpcoming({ navigation }) {
  const [ loading, setLoading ]   = useState(true);
  const [ uCourses, setUCourses ] = useState({});

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
          }
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <FlatList
      data={uCourses}
      style={styles.container}
      keyExtractor= {(item) => { return item.id.toString(); }}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity style={styles.ocourse}>
            <Text style={styles.ocourseno}>{index < 10 ? ('0' + (++index)) : (++index)}</Text>

            <View>
              <Text style={styles.cname}>{item.name}</Text>
              <Text style={styles.csdate}>Starting on {item.start_date}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    } />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 17,
    paddingBottom: 18,
    flex: 1,
    backgroundColor: '#FFF'
  },
  ocourse: {
    marginTop: 8,
    marginBottom: 7,
    marginLeft: 24,
    marginRight: 24,
    padding: 15,
    paddingLeft: 20,
    flexDirection:'row',
    backgroundColor: '#FFF',
    borderRadius: 6,
    shadowColor: '#26000000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 4
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
  csdate: {
    marginTop: 12,
    color: '#3951B6',
    fontSize: 13,
    fontFamily: 'System'
  }
});
