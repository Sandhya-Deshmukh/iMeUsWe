import React, { memo } from 'react';
import { isEqual } from 'lodash';
import { useField } from 'formik';
import { View, StyleSheet, TextInput } from 'react-native';
import ErrorHelperText from './ErrorHelperText';
import COLORS from '_components/constants/colors';
const EditTextBox = (props) => {
  const [field, meta, form] = useField(props);
  var isError = meta.touched && meta.error ? true : false;
  const { value, onChange, onBlur } = field;
  return (
    <>
      <View style={[styles.mainView, props.style]}>
        <TextInput
          textAlignVertical={'top'}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          numberOfLines={10}
          allowFontScaling={false}
          clearButtonMode="always"
          mode="outlined"
          outlineColor="#000"
          autoComplete="off"
          multiline={props.multiline}
          placeholder={props.label}
          backgroundColor="transparent"
          placeholderTextColor={styles.placeholder}
          numeric
          keyboardType={props.keyboardType}
          underlineColorAndroid="transparent"
          label={props.label}
          error={isError}
          onBlur={onBlur(props.name)}
          value={value}
          editable={!props?.disabled}
          onChangeText={
            props.onChangeText ? props.onChangeText : onChange(props.name)
          }
          {...props}
        />
      </View>
      {isError ? (
        <ErrorHelperText
          visible={isError}
          errorMessage={meta.error}
          style={{ alignSelf: 'baseline' }}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.WHITE_BB,
    paddingHorizontal: 7,
    marginBottom: 10,
    width: '100%',
    height: 100,
    backgroundColor: COLORS.WHITE,
  },
  placeholder: {
    color: COLORS.MEDIUM_GRAY,
    alignItems: 'flex-start',
  },
  border: { bordertWidth: 1, borderColor: COLORS.WHITE_BB },
});
export default memo(EditTextBox, isEqual);
