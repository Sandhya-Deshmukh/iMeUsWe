import React, { memo, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ErrorHelperText from '_components/inputs/ErrorHelperText';
import IMAGES from '_components/constants/images';
import COLORS from '_components/constants/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';
const SimpleDropDown = (props) => {
  const {
    style,
    dropDownRef,
    data,
    onChangeText,
    placeholder,
    itemKey,
    defaultIndex,
    errorMessage,
  } = props;
  const ref = useRef();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [value, setValue] = useState(undefined);

  const isError = errorMessage ? true : false;

  useEffect(() => {
    if (isDataLoaded === true) {
      return;
    }
    if (data == undefined || data == null) {
      setIsDataLoaded(false);
      return;
    }

    if (data.length <= 0) {
      setIsDataLoaded(false);
      return;
    }

    setIsDataLoaded(true);

    if (defaultIndex === undefined) {
      return;
    }

    if (
      data[defaultIndex] === undefined ||
      data[defaultIndex] === null ||
      data[defaultIndex].length <= 0
    ) {
      return;
    }

    onChangeText(data[defaultIndex]);
  }, [data]);

  useEffect(() => {
    if (itemKey === undefined) {
      return;
    }

    if (itemKey === null) {
      return;
    }
    if (itemKey === 'key') {
      return;
    }

    var isFound = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === itemKey) {
        onChangeText(data[i]);
        setValue(data[i].value);
        isFound = true;
        return;
      }
    }

    if (isFound === false) {
      setValue(0);
    }
  }, [itemKey]);

  if (data === undefined || data === null || data.length <= 0) return null;
  return (
    <>
      <View
        style={[
          styles.mainView,
          style,
          styles.dropDownView,
          // { borderWidth: isError ? 1 : isDataLoaded ? 1 : 0 }
        ]}>
        {isDataLoaded ? (
          <RNPickerSelect
            //{...field}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Image
                  source={IMAGES.DOWN_ARROW}
                  size={8}
                  color={COLORS.LIGHT_GRAY_BG}
                  style={styles.arrowIcon}
                />
              );
            }}
            ref={dropDownRef ? dropDownRef : ref}
            onValueChange={onChangeText}
            items={data}
            value={value}
            itemKey={itemKey}
            placeholder={defaultIndex === undefined ? placeholder : {}}
            textInputProps={{
              style: styles.valueColor,
            }}
            style={[pickerStyles]}
          />
        ) : null}
      </View>

      {isError ? (
        <ErrorHelperText
          visible={isError}
          errorMessage={errorMessage}
          style={{ alignSelf: 'flex-start' }}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
  },
  dropDownView: {
    borderColor: '#bbb',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  arrowIcon: {
    justifyContent: 'center',
    top: 5,
    left: -50,
    position: 'absolute',
    width: 30,
    height: 30,
  },
  valueColor: { color: COLORS.BLACK, marginLeft: 5 },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    fontFamily: 'Poppins_Medium',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 12,
    fontFamily: 'Poppins_Medium',
    paddingHorizontal: 10,
    //paddingVertical: 3,
    borderWidth: 0.5,
    // borderColor: 'purple',
    borderRadius: 8,
    marginBottom: 3,
    color: COLORS.RED,
    paddingRight: 30,
  },
  placeholder: {
    color: COLORS.BLACK,
    fontSize: 12,
    fontFamily: 'Poppins_Medium',
  },
});

export default memo(SimpleDropDown);
