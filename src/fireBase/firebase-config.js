import {initializeApp} from '@react-native-firebase/app';
import {getFirestore} from '@react-native-firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyD_3_o-K7z6lFGNGr8A1rEfj2ZDTb-i7Aw',
  authDomain: 'bt-printer.firebaseapp.com',
  projectId: 'bt-printer',
  storageBucket: 'bt-printer.appspot.com',
  messagingSenderId: '570474683010',
  appId: '1:570474683010:web:96d8c69220ff9351cd329b',
  measurementId: 'G-S53R4VSCGV',
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
