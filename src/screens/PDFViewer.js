import React, { Fragment, useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';

import Pdf from 'react-native-pdf';
import { Header, Text, Input, Button, Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from '../components/Axios';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default function PDFViewer({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [videoURI, setVideoURI] = useState("");

  const file = route.params.file
  const auth = useSelector(state => state.auth);
  const userToken = auth.token ? auth.token : null;
  const Axios = axios(userToken);
  const loadPreviousScreen = () => {
    navigation.goBack();
  };
  const source = { uri: file, cache: true };
  const videoError = (err) => {
    console.log("Video errrrrrr", err)
  }
  useEffect(() => {
    console.log("file================>", file)
    setLoading(false)
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link presse: ${uri}`)
        }}
        style={styles.pdf} />
    </View>
  );
}

const styles = StyleSheet.create({
  pagefragment: {
    width: screenWidth,
  },
  headercontainer: {
    paddingHorizontal: 20,
    width: screenWidth,
    height: 90,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    borderBottomWidth: 0
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
