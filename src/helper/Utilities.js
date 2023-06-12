import NetInfo from '@react-native-community/netinfo';

const isEmptyValue = val => {
  console.log('func called', val);
  if (val?.length > 0) {
    return false;
  } else {
    return true;
  }
};
const isNetConnected = () => {
  NetInfo.addEventListener(state => {
    // console.log('Connection type', state.type);
    // console.log('Is connected? ====>', state.isConnected);
    return state.isConnected;
  });
};
export {isEmptyValue, isNetConnected};
