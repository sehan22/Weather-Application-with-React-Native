import AsyncStorage from '@react-native-async-storage/async-storage';
import {err} from 'react-native-svg/lib/typescript/xml';

export const storeData = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log('Error : ', err);
  }
};

export const getData = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('Error : ', error);
  }
};
