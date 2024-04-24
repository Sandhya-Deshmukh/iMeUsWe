import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import COLORS from '_components/constants/colors';
const LoadingActionButtonOutline = ({
  title,
  callback,
  loading,
  disabled,
  style,
  contentStyle,
  labelStyle,
  ...props
}) => {
  return (
    <Button
      style={[styles.button, style]}
      mode="outlined"
      dark
      onPress={callback}
      disabled={disabled ? disabled : loading}
      loading={loading}
      labelStyle={labelStyle}
      contentStyle={{
        height: 40,
        ...contentStyle,
      }}
      {...props}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 40,
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
  },
});

export default memo(LoadingActionButtonOutline);
