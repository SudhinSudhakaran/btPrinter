import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import {
  BLEPrinter,
  NetPrinter,
  USBPrinter,
  IUSBPrinter,
  IBLEPrinter,
  INetPrinter,
  ColumnAliment,
  COMMANDS,
} from 'react-native-thermal-receipt-printer-image-qr';

import {DeviceType} from './FindPrinter';
import {Images} from '../constant';
import AntIcon from 'react-native-vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';
import {useRef, useState} from 'react';
import {Buffer} from 'buffer';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DevicesEnum} from '../constant/enum';
import LoadingIndicator from '../components/LoadingIndicator';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import CustomButton from '../components/CustomButton';
import {responsiveWidth} from 'react-native-responsive-dimensions';
const printerList = {
  ble: BLEPrinter,
  net: NetPrinter,
  usb: USBPrinter,
};

// export interface SelectedPrinter
//   extends Partial<IUSBPrinter & IBLEPrinter & INetPrinter> {
//   printerType?: keyof typeof printerList;
// }

export const PORT = '9100';

const deviceWidth = Dimensions.get('window').width;
const EscPosEncoder = require('esc-pos-encoder');

const HomeScreen = () => {
  const route = useRoute();
  const {url} = route?.params;
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = React.useState(DevicesEnum.blu);
  const [devices, setDevices] = React.useState([]);
  // const [connected, setConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedPrinter, setSelectedPrinter] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  const [bluetoothOn, setBluetoothOn] = React.useState(true);
  const [selectedNetPrinter, setSelectedNetPrinter] = React.useState({
    device_name: 'My Net Printer',
    host: '192.168.0.101', // your host
    port: PORT, // your port
    printerType: DevicesEnum.net,
  });

  React.useEffect(() => {
    if (route.params?.printer) {
      setSelectedNetPrinter({
        ...selectedNetPrinter,
        ...route.params.printer,
      });
    }
  }, [route.params?.printer]);

  const getListDevices = async () => {
    const Printer = BLEPrinter;
    //  await Printer.init();
    //     requestAnimationFrame(async () => {
    //       try {

    //         const results = await Printer.getDeviceList();
    //         console.log('result =>', results);
    //         setDevices(
    //           results?.map(item => ({
    //             ...item,
    //             printerType: selectedValue,
    //           })),
    //         );
    //       } catch (err) {
    //         console.warn(err);
    //       } finally {
    //         setLoading(false);
    //       }
    //     });
    BLEPrinter.init().then(() => {
      BLEPrinter.getDeviceList().then(res => {
        console.log('==>', res);
        setDevices(res);
        setLoading(false);
      });
    });
    setLoading(false);
  };

  React.useEffect(() => {
    BluetoothStateManager.getState().then(bluetoothState => {
      console.log('isBluetoothIsOn', bluetoothState);
      if (bluetoothState === 'PoweredOff') {
        setBluetoothOn(false);
      } else {
        setBluetoothOn(true);
        setLoading(true);
        getListDevices().then();
      }
    });
  }, [refresh]);
  const turnOnBlueTooth =async () => {
   await BluetoothStateManager.enable().then(result => {
      console.log("result", result);
      setRefresh(!refresh);
    });
    
  };
  const handleConnectSelectedPrinter = async () => {
    console.log('selectedPrinter', selectedPrinter);
    setLoading(true);
    const connect = async () => {
      try {
        if (selectedPrinter?.inner_mac_address) {
          console.log('entered in connecting function');
          BLEPrinter.connectPrinter(selectedPrinter.inner_mac_address)
            .then
            //  error => console.warn(error),
            ();
        }

        setLoading(false);
      } catch (err) {
        Alert.alert('Connect failed!', `${err} !`);
      } finally {
        setLoading(false);
      }
    };
    await connect();
  };

  // const handlePrint = async () => {
  //   try {
  //     const Printer = BLEPrinter;
  //     Printer.printText('<C>sample text</C>', {
  //       cut: false,
  //     });
  //     Printer.printImage(
  //       'https://sportshub.cbsistatic.com/i/2021/04/09/9df74632-fde2-421e-bc6f-d4bf631bf8e5/one-piece-trafalgar-law-wano-anime-1246430.jpg',
  //     );
  //     Printer.printBill('<C>sample text</C>');
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const handlePrintBill = async () => {
  //   let address = '2700 S123 Grand Ave, Los Angeles, CA 90007223, USA.';
  //   const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
  //   const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
  //   const CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_CT;
  //   const OFF_CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_LT;
  //   try {
  //     const getDataURL = () => {
  //       QrRef.toDataURL(callback);
  //     };
  //     const callback = async dataURL => {
  //       let qrProcessed = dataURL.replace(/(\r\n|\n|\r)/gm, '');
  //       // Can print android and ios with the same type or with encoder for android
  //       if (Platform.OS === 'android' || Platform.OS === 'ios') {
  //         const Printer = BLEPrinter;
  //         Printer.printImage(
  //           `https://sportshub.cbsistatic.com/i/2021/04/09/9df74632-fde2-421e-bc6f-d4bf631bf8e5/one-piece-trafalgar-law-wano-anime-1246430.jpg`,
  //           {
  //             imageWidth: 300,
  //             imageHeight: 300,
  //           },
  //         );
  //       } else {
  //         let base64String = Buffer.from(_encoder).toString('base64');
  //         Printer.printRaw(base64String);
  //       }
  //     };
  //     getDataURL();
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const handlePrintBillWithImage = async () => {
    const Printer = BLEPrinter;
    Printer.printImage(url, {
      imageWidth: 575,
      // imageHeight: 1000,
      // paddingX: 100
    });
    // Printer.printBill('', {beep: false});
  };

  const findPrinter = () => {
    navigation.navigate('FindPrinter');
  };

  const onChangeText = text => {
    setSelectedNetPrinter({...selectedNetPrinter, host: text});
  };

  const _renderOther = () => (
    <>
      <Text>Select printer: </Text>
      <Picker
        selectedValue={selectedPrinter}
        onValueChange={setSelectedPrinter}>
        {devices !== undefined &&
          devices?.length > 0 &&
          devices?.map((item, index) => (
            <Picker.Item
              label={item.device_name}
              value={item}
              key={`printer-item-${index}`}
            />
          ))}
      </Picker>
    </>
  );

  return bluetoothOn ? (
    <View style={styles.container}>
      {/* Printers List */}
      <View style={styles.section}>
        {_renderOther()}
        {/* Buttons Connect */}
        <View
          style={[
            styles.buttonContainer,
            {
              marginTop: 50,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleConnectSelectedPrinter()}
          >
            {/* <AntIcon name={'disconnect'} color={'white'} size={18} /> */}
            <Text style={styles.text}>Connect</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "blue" }]}
            onPress={() => handlePrintBillWithImage()}
          >
            {/* <AntIcon name={'profile'} color={'white'} size={18} /> */}
            <Text style={styles.text}>Print</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.qr}>
          <QRCode value="hey" getRef={el => (QrRef = el)} />
        </View> */}
      </View>
      <LoadingIndicator visible={loading} />
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => turnOnBlueTooth()}
        style={[
          styles.button,
          { width: responsiveWidth(45), backgroundColor: "#6796f9" },
        ]}
      >
        <Image source={Images.BLUETOOTH_ICON} style={styles.bluetoothIcon} />
        <Text style={styles.buttonText}>Enable Bluetooth</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {},
  rowDirection: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    height: 40,
    width: deviceWidth / 1.5,
    alignSelf: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  qr: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  bluetoothIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
