import React from 'react';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';
const LabelText = ({ style, ...props }) => {
  return <Text style={style}>{props.text}</Text>;
};
LabelText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LabelText;
