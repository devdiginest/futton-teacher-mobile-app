import                                    'react-native-gesture-handler';
import React, { useContext }         from 'react';
import { useEffect, useState }       from 'react';
import { Provider }                  from 'react-redux';
import SplashScreen                  from 'react-native-splash-screen';
import auth                          from '@react-native-firebase/auth';
import { NavigationContainer }       from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/navigation/AuthProvider';
import Navigation                    from './src/navigation/Navigation';
import { loggedIn }                  from './src/actions/Auth';
import store                         from './src/reducers';
import { getAuthAsyncStorage }       from './src/services/GetAuthAsyncStorage';
import { navigationRef }             from './src/services/NavRef';


export default function App() {
  // const { user, setUser }                           = useContext(AuthContext);
  const [ isLoading, setIsLoadingFromAsyncStorage ] = useState(true);

  const loadApp = async () => {
    await setIsLoadingFromAsyncStorage(true);

    const userStorage = await getAuthAsyncStorage();
    if (userStorage.token) {
      await store.dispatch(loggedIn({ token : userStorage.token }));
    }

    await setIsLoadingFromAsyncStorage(false);

    SplashScreen.hide();
  };

  function onAuthStateChanged(user) {
    // setUser(user);
  }

  useEffect(() => {
    loadApp();

    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
