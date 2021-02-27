import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import App from './App';


LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.", "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`"])

AppRegistry.registerComponent(appName, () => App);
