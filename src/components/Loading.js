import React                 from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, View }  from 'react-native';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6646EE" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
