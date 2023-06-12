/* eslint-disable react/no-unstable-nested-components */
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
import BackButton from '../../components/BackButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Colors from '../../constant/Colors';
import PickerComponent from '../../components/PickerComponent';
import {isEmptyValue} from '../../helper/Utilities';

import {useRoute} from '@react-navigation/native';

import {Images} from '../../constant';

const AddProducts = () => {
  const navigation = useNavigation();
  const route = useRoute();

  let updateButtonText = route?.params?.isFromEdit ? 'Update' : 'Save';
  let titleText = route?.params?.isFromEdit ? 'Update Product' : 'Add Product';

  // values
  const [mrp, setMrp] = useState('');
  const [title, setTitle] = useState('');
  const [protein, setProtien] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');
  const [totalFat, setTotalFat] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [proteinUnit, setProtienUnit] = useState('mg');
  const [carboHydrate, setCarboHyderate] = useState('');
  const [dateBeforeUse, setDateBeforeUse] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('mg');
  const [totalFatUnit, setTotalFatUnit] = useState('mg');
  const [caloriesUnit, setCaloriesUnit] = useState('cal');
  const [cholesterolUnit, setCholesterolUnit] = useState('mg');
  const [carboHydrateUnit, setCarboHyderateUnit] = useState('mg');
  const [proteinValidationText, setProtienValidationText] = useState('');
  const [caloriesValidationText, setCaloriesValidationText] = useState('');
  const [totalFatValidationText, setTotalFatValidationText] = useState('');
  const [cholesterolValidationText, setCholesterolValidationText] =
    useState('');
  const [carboHydrateValidationText, setCarboHyderateValidationText] =
    useState('');
  // Validations text
  const [titleValidationText, setTitleValidationText] = useState('');
  const [quantityValidationText, setQuantityValidationText] = useState('');
  const [mrpValidationText, setMrpValidationText] = useState('');
  const [dateBeforeUseValidationText, setDateBeforeUseValidationText] =
    useState('');
  const [ingredients, setIngredients] = useState([{value: ''}]);
  const [ingredientsValidationText, setIncredientValidationText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const titleRef = useRef();
  const qtyRef = useRef();
  const mrpRef = useRef();
  const bestBeforeRef = useRef();
  const caloriesRef = useRef();
  const totalFatRef = useRef();
  const protienRef = useRef();
  const incredientRef = useRef();
  const cholesterolRef = useRef();
  const carboHydrateRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      console.log('---', navigation);
      if (route?.params?.isFromEdit) {
        configData();
      }

      return () => {};
    }, [route?.params?.isFromEdit]),
  );

  const configData = () => {
    console.log('Enterd', route?.params?.item.title);
    setTitle(route?.params?.item?.title || '');
    setQuantity(route?.params?.item?.quantity || '');
    setMrp(route?.params?.item?.mrp || '');
    setDateBeforeUse(route?.params?.item?.dateBeforeUse || '');
    setQuantityUnit(route?.params?.item?.quantityUnit || '');
    setCalories(route?.params?.item?.calories || '');
    setTotalFat(route?.params?.item?.totalFat || '');
    setProtien(route?.params?.item?.protein || '');
    setCholesterol(route?.params?.item?.cholesterol || '');
    setCarboHyderate(route?.params?.item?.carboHydrate || '');
    setCaloriesUnit(route?.params?.item?.caloriesUnit || 'cal');
    setTotalFatUnit(route?.params?.item?.totalFatUnit || 'mg');
    setProtienUnit(route?.params?.item?.proteinUnit || 'mg');
    setCholesterolUnit(route?.params?.item?.cholesterolUnit || 'mg');
    setCarboHyderateUnit(route?.params?.item?.carboHydrate || 'mg');
    setIngredients(route?.params?.item?.ingredients || []);
  };

  const validationAction = () => {
    var isValidTitle = 0;
    var isValidQuantity = 0;
    var isValidMRP = 0;
    var isValidDateBeforeUse = 0;

    var isValidCalories = 0;
    var isValidTotalFat = 0;
    var isValidProtien = 0;
    var isValidCholesterol = 0;
    var isValidCarboHydrate = 0;
    var isValidIngredients = 0;
    if (title?.length > 0) {
      setTitleValidationText('');
      isValidTitle = 1;
    } else {
      setTitleValidationText('Title is required');
      isValidTitle = 0;
    }
    if (quantity?.length <= 0) {
      setQuantityValidationText('Quantity is required');
      isValidQuantity = 0;
    } else if (quantity <= 0) {
      setQuantityValidationText('Quantity must be grater than zero');
      isValidQuantity = 0;
    } else {
      isValidQuantity = 1;
      setQuantityValidationText('');
    }
    if (mrp?.length <= 0) {
      setMrpValidationText('Mrp is required');
      isValidMRP = 0;
    } else if (mrp <= 0) {
      setMrpValidationText('Mrp must be grater than zero');
      isValidMRP = 0;
    } else {
      isValidMRP = 1;
      setMrpValidationText('');
    }
    if (dateBeforeUse?.length > 0) {
      isValidDateBeforeUse = 1;
      setDateBeforeUseValidationText('');
    } else {
      isValidDateBeforeUse = 0;
      setDateBeforeUseValidationText('Date before use is required');
    }

    if (isEmptyValue(calories)) {
      isValidCalories = 0;
      setCaloriesValidationText('Calories is required');
    } else {
      isValidCalories = 1;
      setCaloriesValidationText('');
    }
    if (isEmptyValue(totalFat)) {
      isValidTotalFat = 0;
      setTotalFatValidationText('Total Fat is required');
    } else {
      isValidTotalFat = 1;
      setTotalFatValidationText('');
    }
    if (isEmptyValue(protein)) {
      isValidProtien = 0;
      setProtienValidationText('Protein is required');
    } else {
      isValidProtien = 1;
      setProtienValidationText('');
    }
    if (isEmptyValue(cholesterol)) {
      isValidCholesterol = 0;
      setCholesterolValidationText('Cholesterol  is required');
    } else {
      isValidCholesterol = 1;
      setCholesterolValidationText('');
    }
    if (isEmptyValue(carboHydrate)) {
      isValidCarboHydrate = 0;
      setCarboHyderateValidationText('CarboHydrate is required');
    } else {
      isValidCarboHydrate = 1;
      setCarboHyderateValidationText('');
    }

    if (isEmptyValue(ingredients?.[0]?.value)) {
      isValidIngredients = 0;
      setIncredientValidationText('Enter at least one ingredient');
    } else {
      isValidIngredients = 1;
      setIncredientValidationText('');
    }
    if (
      isValidTitle === 1 &&
      isValidQuantity === 1 &&
      isValidMRP === 1 &&
      isValidDateBeforeUse === 1 &&
      isValidCalories === 1 &&
      isValidTotalFat === 1 &&
      isValidProtien === 1 &&
      isValidCholesterol === 1 &&
      isValidCarboHydrate === 1 &&
      isValidIngredients === 1
    ) {
      if (route?.params?.isFromEdit === true) {
        updateAction();
      } else {
        saveButtonAction();
      }
    }
  };

  const backAction = () => {
    navigation?.goBack();
  };
  const updateAction = () => {
    console.log(
      title,
      quantity,
      quantityUnit,
      mrp,
      dateBeforeUse,
      calories,
      totalFat,
      protein,
      cholesterol,
      carboHydrate,
      ingredients,
    );

    try {
      firestore()
        .collection('sreeNandhas')
        .doc('Products')
        .collection('products')
        .doc(route?.params?.item?._id)
        .update({
          title: title,
          quantity: quantity,
          quantityUnit: quantityUnit,
          mrp: mrp,
          dateBeforeUse: dateBeforeUse,
          calories: calories,
          totalFat: totalFat,
          protein: protein,
          cholesterol: cholesterol,
          carboHydrate: carboHydrate,
          nutritionalFacts: [
            {
              id: '0',
              title: 'calories',
              value: calories,
              unit: caloriesUnit,
            },
            {
              id: '1',
              title: 'totalFat',
              value: calories,
              unit: totalFatUnit,
            },
            {
              id: '2',
              title: 'protein',
              value: protein,
              unit: proteinUnit,
            },
            {
              id: '3',
              title: 'cholesterol',
              value: cholesterol,
              unit: cholesterolUnit,
            },
            {
              id: '4',
              title: 'carboHydrate',
              value: carboHydrate,
              unit: carboHydrateUnit,
            },
          ],
          ingredients: ingredients,
        })
        .then(() => {
          Alert.alert('Success', 'Successfully updated product details', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
  const saveButtonAction = async () => {
    try {
      firestore()
        .collection('sreeNandhas')
        .doc('Products')
        .collection('products')
        .add({
          title: title,
          quantity: quantity,
          quantityUnit: quantityUnit,
          mrp: mrp,
          dateBeforeUse: dateBeforeUse,
          calories: calories,
          totalFat: totalFat,
          protein: protein,
          cholesterol: cholesterol,
          carboHydrate: carboHydrate,
          nutritionalFacts: [
            {
              id: '0',
              title: 'calories',
              value: calories,
              unit: caloriesUnit,
            },
            {
              id: '1',
              title: 'totalFat',
              value: calories,
              unit: totalFatUnit,
            },
            {
              id: '2',
              title: 'protein',
              value: protein,
              unit: proteinUnit,
            },
            {
              id: '3',
              title: 'cholesterol',
              value: cholesterol,
              unit: cholesterolUnit,
            },
            {
              id: '4',
              title: 'carboHydrate',
              value: carboHydrate,
              unit: carboHydrateUnit,
            },
          ],
          ingredients: ingredients,
        })
        .then(() => {
          Alert.alert('Success', 'Successfully created new product', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  const plusButtonAction = (index, text) => {
    let array = [...ingredients];
    let obj = {value: ''};
    array.push(obj);
    setIngredients(array);
  };
  const removeButtonAction = (index, text) => {
    let array = [...ingredients];
    array.splice(index, 1);
    setIngredients(array);
  };
  const onDynamicInputChange = (text, index) => {
    const newArray = [...ingredients];
    newArray[index].value = text;
    setIngredients(newArray);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <BackButton onPress={backAction} />
        <Text style={styles.header}>{titleText}</Text>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'Product'}
              ref={titleRef}
              onChangeText={value => setTitle(value)}
              onSubmitEditing={() => qtyRef?.current?.focus()}
              value={title}
            />
          </View>
          <Text style={styles.errorText}>{titleValidationText}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <TextInput
                style={[styles.inputField]}
                placeholder={'Quantity'}
                ref={qtyRef}
                onChangeText={value => setQuantity(value)}
                onSubmitEditing={() => mrpRef?.current?.focus()}
                keyboardType={'number-pad'}
                value={quantity}
              />
            </View>
            <View style={[styles.inputContainer, {flex: 0.75}]}>
              <PickerComponent
                value={quantityUnit}
                setValue={setQuantityUnit}
              />
            </View>
          </View>
          <Text style={styles.errorText}>{quantityValidationText}</Text>
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'MRP'}
              ref={mrpRef}
              onChangeText={value => setMrp(value)}
              onSubmitEditing={() => bestBeforeRef?.current?.focus()}
              keyboardType={'number-pad'}
              value={mrp}
            />
          </View>
          <Text style={styles.errorText}>{mrpValidationText}</Text>
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'Date before use'}
              ref={bestBeforeRef}
              onChangeText={value => setDateBeforeUse(value)}
              onSubmitEditing={() => {
                caloriesRef?.current?.focus();
              }}
              keyboardType={'number-pad'}
              value={dateBeforeUse}
            />
          </View>
          <Text style={styles.errorText}>{dateBeforeUseValidationText}</Text>

          <Text
            style={{
              fontSize: responsiveFontSize(2),
              marginLeft: 15,
              color: 'black',
            }}>
            Nutritional Facts per 100 g
          </Text>
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'Calories'}
              ref={caloriesRef}
              onChangeText={value => setCalories(value)}
              onSubmitEditing={() => {
                totalFatRef?.current?.focus();
              }}
              keyboardType={'number-pad'}
              value={calories}
            />
          </View>
          <Text style={styles.errorText}>{caloriesValidationText}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <TextInput
                style={[styles.inputField]}
                placeholder={'Total Fat'}
                ref={totalFatRef}
                onChangeText={value => setTotalFat(value)}
                onSubmitEditing={() => protienRef?.current?.focus()}
                keyboardType={'number-pad'}
                value={totalFat}
              />
            </View>
            <View style={[styles.inputContainer, {flex: 0.75}]}>
              <PickerComponent
                value={totalFatUnit}
                setValue={setTotalFatUnit}
              />
            </View>
          </View>
          <Text style={styles.errorText}>{totalFatValidationText}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <TextInput
                style={[styles.inputField]}
                placeholder={'Protein'}
                ref={protienRef}
                onChangeText={value => setProtien(value)}
                onSubmitEditing={() => cholesterolRef?.current?.focus()}
                keyboardType={'number-pad'}
                value={protein}
              />
            </View>
            <View style={[styles.inputContainer, {flex: 0.75}]}>
              <PickerComponent value={proteinUnit} setValue={setProtienUnit} />
            </View>
          </View>
          <Text style={styles.errorText}>{proteinValidationText}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <TextInput
                style={[styles.inputField]}
                placeholder={'Cholesterol'}
                ref={cholesterolRef}
                onChangeText={value => setCholesterol(value)}
                onSubmitEditing={() => carboHydrateRef?.current?.focus()}
                keyboardType={'number-pad'}
                value={cholesterol}
              />
            </View>
            <View style={[styles.inputContainer, {flex: 0.75}]}>
              <PickerComponent
                value={cholesterolUnit}
                setValue={setCholesterolUnit}
              />
            </View>
          </View>
          <Text style={styles.errorText}>{cholesterolValidationText}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <TextInput
                style={[styles.inputField]}
                placeholder={'Carbohydrates'}
                ref={carboHydrateRef}
                onChangeText={value => setCarboHyderate(value)}
                onSubmitEditing={() => {
                  validationAction();
                }}
                keyboardType={'number-pad'}
                value={carboHydrate}
              />
            </View>
            <View style={[styles.inputContainer, {flex: 0.75}]}>
              <PickerComponent
                value={carboHydrateUnit}
                setValue={setCarboHyderateUnit}
              />
            </View>
          </View>
          <Text style={styles.errorText}>{carboHydrateValidationText}</Text>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              marginLeft: 15,
              color: 'black',
            }}>
            Ingredients
          </Text>

          <ScrollView>
            {ingredients?.map((item, index) => {
              return (
                <>
                  <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
                    <TextInput
                      placeholder={'Ingredients'}
                      style={[styles.inputField]}
                      value={item?.value}
                      onChangeText={text => {
                        onDynamicInputChange(text, index);
                      }}
                      onSubmitEditing={() => {}}
                    />

                    {item?.value !== '' ? (
                      <TouchableOpacity
                        style={{
                          flex: 0.15,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          index === ingredients.length - 1
                            ? plusButtonAction()
                            : removeButtonAction(index, item);
                        }}>
                        <Image
                          style={{width: 10, height: 10}}
                          source={
                            index === ingredients.length - 1
                              ? Images.PLUS
                              : Images.CLOSE
                          }
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  {ingredients?.length > 1 ? null : (
                    <Text style={styles.errorText}>
                      {ingredientsValidationText}
                    </Text>
                  )}
                </>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => validationAction()}
            // onPress={()=> console.log('==>', ingredients)}
          >
            <Text style={styles.saveButtonText}>{updateButtonText}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  saveButton: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
    width: responsiveWidth(40),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    marginHorizontal: responsiveWidth(4),
    marginVertical: 10,
  },
  header: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginTop: 2,
    marginLeft: 10,
  },
  inputContainer: {
    height: responsiveHeight(6),
    borderWidth: 1,
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    marginBottom: 4,
    borderColor: Colors.TEXT_INPUT_BORDER_COLOR,
  },
  inputField: {
    paddingLeft: 15,
    color: 'black',
    flex: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    fontSize: 12,
    marginRight: responsiveWidth(4),
  },
  pickerItem: {fontSize: responsiveFontSize(2)},
});
