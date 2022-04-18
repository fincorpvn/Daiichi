import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
type TValue = string | object | Array<any>;
type TReturn = string | object | null;

export async function setStoreData(name: string, value: TValue) {
  try {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    const res: any = await AsyncStorage.setItem(name, val);
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function getStoreData(name: string) {
  try {
    const res: any = await AsyncStorage.getItem(name);

    if (res) {
      return res;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function setStoreToken(token: string) {
  return setStoreData('tokenApp', token);
}

export async function getStoreToken() {
  const res = await getStoreData('tokenApp');
  return res;
}

export async function setAccount(p: {username: string; password: string}) {
  Keychain.setGenericPassword(p.username, p.password);
  setStoreData('isAccountTouchID', 'Access');
}

export async function getAccount() {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials;
    }
    return null;
  } catch (error) {
    return null;
  } finally {
    Keychain.resetGenericPassword();
  }
}
export async function resetAccount() {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {}
}
