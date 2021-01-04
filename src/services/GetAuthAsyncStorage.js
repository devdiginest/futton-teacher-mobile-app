import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAuthAsyncStorage() {
  const token = await AsyncStorage.getItem('userToken');
  return { token : token };
}

export async function setAuthAsyncStorage(response) {
  await AsyncStorage.setItem('userToken', response.data.token);
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userToken');
}
