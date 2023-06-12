import React from 'react';

import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Text,
  FlatList,
} from 'react-native';
import BackButton from '../../components/BackButton';
import EscPosPrinter, {
  getPrinterSeriesByName,
  IPrinter,
} from 'react-native-esc-pos-printer';
import {Modal} from 'react-native';

// import {base64Image} from './base64Image';
import MultiPrint from './MultiPrint';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const BluetoothScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {uri} = route?.params;
  const [init, setInit] = React.useState(false);
  const [printer, setPrinter] = React.useState('');
  const [printerList, setPrinterList] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dummyData = [
    {
      name: 'TM_M10',
      ip: '192.168.192.168',
      mac: '12:34:56:78:56:78',
      target: 'TCP:192.168.192.168',
      bt: '12:34:56:78:56:78',
      usb: '000000000000000000',
      usbSerialNumber: '123456789012345678',
    },
    {
      name: 'TM_M10',
      ip: '192.168.192.169',
      mac: '12:34:56:78:56:78',
      target: 'TCP:192.168.192.168',
      bt: '12:34:56:78:56:78',
      usb: '000000000000000000',
      usbSerialNumber: '123456789012345678',
    },
    {
      name: 'TM_M10',
      ip: '192.168.192.167',
      mac: '12:34:56:78:56:78',
      target: 'TCP:192.168.192.168',
      bt: '12:34:56:78:56:78',
      usb: '000000000000000000',
      usbSerialNumber: '123456789012345678',
    },
  ];

  React.useEffect(() => {
    console.log('bluetooth screen: uri', uri);
    EscPosPrinter.addPrinterStatusListener(status => {
      console.log('current printer status:', status);
    });
    scan();
  }, []);
  React.useEffect(() => {
    console.log(printer);
  }, [printer]);
  const backAction = () => {
    navigation?.goBack();
  };
  const scan = () => {
    console.log('discovering');
    EscPosPrinter.discover()
      .then(printers => {
        console.log('done!', printers);
        setPrinterList(printers);
        if (printers[0]) {
          setPrinter(printers[0]);
        }
      })
      .catch(console.log);
  };
  const print = async () => {
    try {
      if (printer) {
        if (!init) {
          await EscPosPrinter.init({
            target: printer.target,
            seriesName: getPrinterSeriesByName(printer.name),
            language: 'EPOS2_LANG_EN',
          });
          setInit(true);
        }

        const printing = new EscPosPrinter.printing();
        const status = await printing
          .initialize()
          .image({uri: uri}, {width: 60, height: 40})
          .cut()
          .send();

        console.log('printing', status);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPrinter(item);
        }}
        style={{
          marginHorizontal: 15,
          marginTop: 10,
          height: responsiveHeight(5),
          justifyContent: 'center',
        }}>
        <Text style={{color: printer?.ip === item?.ip ? 'green' : 'black'}}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: responsiveHeight(20),
        }}>
        <Text style={{color: 'red'}}>No Printers found</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 20,
          }}>
          <BackButton onPress={backAction} />
          <Text style={styles.header}>Select Printer</Text>
        </View>
        <View style={{height: responsiveHeight(5)}} />
        <FlatList
          data={printerList}
          keyExtractor={item => item?.ip.toString()}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
          marginHorizontal: responsiveWidth(6),
        }}>
        <TouchableOpacity style={styles.button} onPress={() => scan()}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        <View style={{width: responsiveWidth(2)}} />
        <TouchableOpacity style={styles.button} onPress={() => print()}>
          <Text style={styles.buttonText}>Print</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default BluetoothScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: responsiveWidth(40),
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    marginVertical: 10,
  },
  header: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginTop: 2,
    marginLeft: 10,
  },
});
