/* eslint-disable no-undef */
import NetInfo from '@react-native-community/netinfo';

export default isInterNetConnected = async () => {
  var connected = false;

  NetInfo.addEventListener((networkState) => {
    connected = networkState.isConnected;
  });

  return connected;
};
