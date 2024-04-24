import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import COLORS from '_components/constants/colors';

const LoadingActionButton = ({
  title,
  callback,
  loading,
  disabled,
  style,
  contentStyle,
  labelStyle,
  ...props
}) => {
  const [cntStyle, setContentStyle] = useState(contentStyle);

  useEffect(() => {
    if (contentStyle === undefined || contentStyle === null)
      setContentStyle({ height: 45, paddingHorizontal: 5 });
  }, []);

  return (
    <Button
      style={[styles.loadingButton, style]}
      mode="outlined"
      dark
      onPress={callback}
      disabled={disabled ? disabled : loading}
      loading={loading}
      labelStyle={[styles.labelinStyle, labelStyle]}
      contentStyle={{
        ...cntStyle,
      }}
      {...props}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  loadingButton: {
    borderRadius: 7,
    backgroundColor: 'blue',
    alignSelf: 'baseline',
    padding: 2,
  },
  labelinStyle: { color: COLORS.WHITE, fontSize: 18 },
});

export default withTheme(memo(LoadingActionButton));
