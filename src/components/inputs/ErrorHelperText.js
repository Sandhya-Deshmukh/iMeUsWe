import React, { memo } from 'react';
import { HelperText, withTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const ErrorHelperText = ({ visible, errorMessage, style, ...props }) => {
  if (
    errorMessage === undefined ||
    errorMessage === null ||
    errorMessage.length <= 0
  ) {
    return (
      <HelperText
        style={[styles.helperText, style]}
        type="error"
        visible={visible}></HelperText>
    );
  }
  return (
    <HelperText
      style={[styles.helperText, style]}
      type="error"
      visible={visible}>
      {errorMessage}
    </HelperText>
  );
};
const styles = StyleSheet.create({
  helperText: {
    paddingHorizontal: 0,
    color: 'red',
    fontFamily: 'Poppins_Regular',
    marginTop: -7,
    paddingTop: 0,
    position: 'relative',
  },
});
export default withTheme(memo(ErrorHelperText));
