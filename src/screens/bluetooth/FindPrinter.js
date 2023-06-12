import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  NetPrinterEventEmitter,
  RN_THERMAL_RECEIPT_PRINTER_EVENTS,
  NetPrinter,
} from 'react-native-thermal-receipt-printer-image-qr';
import LoadingIndicator from '../../components/LoadingIndicator';

import { useNavigation } from '@react-navigation/native';



const FindPrinter = () => {
  const navigation = useNavigation()
  const [devices, setDevices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (devices.length === 0) {
      setLoading(true);
      NetPrinterEventEmitter.addListener(
        RN_THERMAL_RECEIPT_PRINTER_EVENTS.EVENT_NET_PRINTER_SCANNED_SUCCESS,
        (printers) => {
          console.log({printers});
          if (printers) {
            console.log({printers});
            setLoading(false);
            setDevices(printers);
          }
        },
      );
 
    }
     getDeviceList(); 
    return () => {
      NetPrinterEventEmitter.removeAllListeners(
        RN_THERMAL_RECEIPT_PRINTER_EVENTS.EVENT_NET_PRINTER_SCANNED_SUCCESS,
      );
      NetPrinterEventEmitter.removeAllListeners(
        RN_THERMAL_RECEIPT_PRINTER_EVENTS.EVENT_NET_PRINTER_SCANNED_ERROR,
      );
    };
  }, []);
const getDeviceList = async () =>{
 const results = await NetPrinter.getDeviceList();
 console.log({results});
}
  if (loading) {
    return <LoadingIndicator visible={loading}  />;
  }

  const onSelectedPrinter = (printer) => {
    navigation.navigate('Bluetooth', {printer});
  };

  return (
    <View style={styles.container} >
      {devices !== undefined &&
      devices?.length > 0 &&
      devices?.map((item, index) => {
        const onPress = () => onSelectedPrinter(item);
        return (
          <TouchableOpacity key={`printer-item-${index}`} onPress={()=>onPress()} >
            <Text >{item.host}</Text >
          </TouchableOpacity >
        );
      })}
    </View >
  );
};
export default FindPrinter
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});