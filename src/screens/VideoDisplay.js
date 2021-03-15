import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Slider,
  BackHandler,
  TouchableNativeFeedback
} from 'react-native';
import Video from 'react-native-video'; /// alreadyimported this
import Icon from 'react-native-vector-icons/FontAwesome5'; // and this
import Orientation from 'react-native-orientation';
import { ActivityIndicator } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
// const samplevideo = require('./sample.mp4');

export default class App extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      currentTime: 0,
      duration: 0.1,
      paused: false,
      overlay: true,
      fullscreen: false,
      isBuffering: true,
      videoEnd: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    Orientation.getOrientation((err, orientation) => {
      if (orientation == 'LANDSCAPE') {
        Orientation.lockToPortrait();
        return true
      }
    });
  }
  componentWillMount() {
    console.log(this.props.route.params.file)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  lastTap = null;
  handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      clearTimeout(this.timer);
      doubleTapCallback();
    } else {
      this.lastTap = now;
      this.timer = setTimeout(() => {
        singleTapCallback();
      }, DOUBLE_PRESS_DELAY);
    }
  }

  getTime = t => {
    const digit = n => n < 10 ? `0${n}` : `${n}`;
    // const t = Math.round(time);
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    const hr = digit(Math.floor((t / 3600) % 60));
    return hr + ':' + min + ':' + sec; // this will convert sec to timer string
    // 33 -> 00:00:33
    // this is done here
    // ok now the theme is good to look
  }

  load = ({ duration }) => this.setState({ duration, isBuffering: false, overlay: false }) // now here the duration is update on load video
  progress = ({ currentTime }) => this.setState({ currentTime }) // here the current time is upated

  backward = () => {
    this.video.seek(this.state.currentTime - 5);
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  }
  forward = () => {
    this.video.seek(this.state.currentTime + 5); // here the video is seek to 5 sec forward
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  }

  onslide = slide => {
    this.video.seek(slide * this.state.duration); // here the upation is maked for video seeking
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  }
  youtubeSeekLeft = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => {
      this.video.seek(currentTime - 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    })
  }
  youtubeSeekRight = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => { // this fn is used to detect the double tap first callback
      this.video.seek(currentTime + 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    })
  }

  fullscreen = () => {
    const { fullscreen } = this.state;
    if (fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    this.setState({ fullscreen: !fullscreen });
  }

  onVideoEnd = () => {
    this.setState({
      videoEnd: true
    })
  }


  render = () => {
    const { currentTime, duration, paused, overlay, fullscreen } = this.state;
    return (
      <View style={style.container}>
        <View style={fullscreen ? style.fullscreenVideo : style.video}>
          <Video
            fullscreen={fullscreen}
            paused={paused} // this will manage the pause and play
            ref={ref => this.video = ref}
            source={{ uri: this.props.route.params.file }}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode={fullscreen ? 'cover' : 'contain'}
            onLoad={this.load}
            onBuffer={({ isBuffering }) => this.setState({ isBuffering })}
            onProgress={this.progress}
            onVideoEnd={this.onEndVideo}
            playWhenInactive={false}
            playInBackground={false}
            onError={(e) => console.log(e)}
            // selectedVideoTrack={{
            //   type: "resolution",
            //   value: 144
            // }}
            volume={10}
          />
          <View style={style.overlay}>
            {/* now we can remove this not */}
            {(overlay || this.state.isBuffering || paused) ? <><View style={{ backgroundColor: '#0006' }}>
              <Text style={{ color: '#fff', top: 30, }}>{this.props.route.params.name}</Text>
            </View>
              <View style={{ ...style.overlaySet, backgroundColor: '#0006' }}>
                <View style={{ flexDirection: 'row', width: '100%' }} >
                  <View style={{ justifyContent: 'center', width: '35%' }} >
                    <Icon name='backward' style={style.icon} onPress={this.backward} />
                  </View>
                  <View style={{ justifyContent: 'center', width: '30%' }} >
                    {!this.state.isBuffering && <Icon name={paused ? 'play' : 'pause'} style={style.icon} onPress={() => this.setState({ paused: !paused })} />}
                    {this.state.isBuffering && <ActivityIndicator color="#fff" style={style.icon} />}
                  </View>
                  <View style={{ justifyContent: 'center', width: '30%' }} >
                    <Icon name='forward' style={style.icon} onPress={this.forward} />
                  </View>
                </View>
                <View style={style.sliderCont}>
                  <View style={style.timer}>
                    <Text style={{ color: 'white' }}>{this.getTime(currentTime)}</Text>
                    <Text style={{ color: 'white' }}>{this.getTime(duration)}   <Icon onPress={this.fullscreen} name={fullscreen ? 'compress' : 'expand'} style={{ fontSize: 20 }} /></Text>
                  </View>
                  <Slider
                    // we want to add some param here
                    maximumTrackTintColor='white'
                    minimumTrackTintColor='white'
                    thumbTintColor='white' // now the slider and the time will work
                    value={currentTime / duration} // slier input is 0 - 1 only so we want to convert sec to 0 - 1
                    onValueChange={this.onslide}
                  />
                </View>
              </View></> : <View style={style.overlaySet}>
              <TouchableWithoutFeedback onPress={this.youtubeSeekLeft}><View style={{ flex: 1 }} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.youtubeSeekRight}><View style={{ flex: 1 }} /></TouchableWithoutFeedback>
            </View>}
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    color: 'white',
    // flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25
  },
  sliderCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingStart: 15,
    paddingEnd: 15
  },
  video: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1
  }
});