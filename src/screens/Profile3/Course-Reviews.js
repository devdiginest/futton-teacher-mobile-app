import React                            from 'react';
import { FlatList, StyleSheet }         from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient                   from 'react-native-linear-gradient';

const screenData = [{
  "id"   : 1,
  "name" : "Introduction to Learning Maths"
}];

export default function MyCoursesCompleted() {
  const viewreviews = () => {

  }

  return (
    <FlatList
      data={screenData}
      style={styles.container}
      keyExtractor= {(item) => { return item.id.toString(); }}
      renderItem={({item}) => {
        return (
          <View style={styles.ocourse}>
            <Text style={styles.ocourseno}>0{item.id}</Text>

            <View>
              <Text style={styles.cname}>{item.name}</Text>
              <TouchableOpacity
                style={styles.continuebtncontainer}
                onPress={viewreviews}>
                <LinearGradient
                  colors={[ '#0066D1', '#03C0C7' ]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.continuebtngradient}>
                  <Text style={styles.continuebtntext}>View Reviews</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
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
  continuebtncontainer: {
    marginTop: 10,
    marginLeft: 0,
    width: 100,
    height: 26
  },
  continuebtngradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  continuebtntext: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'System'
  }
});
