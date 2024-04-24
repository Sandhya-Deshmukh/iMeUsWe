import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

const NumberCountLabel = ({ textCount, maxValue }) => {
  if (textCount === undefined || textCount === null) {
    return <Text style={[styles.digitText]}></Text>;
  }
  return (
    <Text style={[styles.digitText]}>{textCount.length + '/' + maxValue}</Text>
  );
};

const styles = StyleSheet.create({
  digitText: {
    fontFamily: 'Poppins_Bold',
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
});

export default memo(NumberCountLabel);
