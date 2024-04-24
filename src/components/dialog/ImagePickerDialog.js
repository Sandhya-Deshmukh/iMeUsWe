import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Dialog,
  Portal,
  Avatar,
  withTheme,
  Surface,
  Subheading,
  Title,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import IMAGES from '_components/constants/images';
import COLORS from '_components/constants/colors';
const ImagePickerDialog = ({
  visible,
  onDismiss,
  isVideo,
  onCameraPress,
  onGalleryPress,
  theme,
}) => {
  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        dismissable={true}
        onDismiss={onDismiss}>
        <Title style={[styles.dialogTitle]}>
          {'Pick ' + (isVideo ? 'Video' : 'Image') + ' From'}
        </Title>
        <Surface style={styles.surface}>
          <TouchableOpacity style={styles.touchable} onPress={onCameraPress}>
            <Avatar.Image size={100} source={IMAGES.CAMERA} />
            <Subheading style={styles.text}>CAMERA</Subheading>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={onGalleryPress}>
            <Avatar.Image
              size={100}
              source={isVideo ? IMAGES.VIDEO : IMAGES.GALLERY}
            />
            <Subheading style={styles.text}>GALLERY</Subheading>
          </TouchableOpacity>
        </Surface>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    maxHeight: Dimensions.get('window').height - 100,
  },
  dialogTitle: {
    marginTop: 0,
    width: '100%',
    minHeight: 50,
    backgroundColor: 'blue',
    color: COLORS.WHITE,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  surface: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 30,
    backgroundColor: 'transparent',
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: COLORS.BLACK,
  },
});

ImagePickerDialog.prototype = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  isVideo: PropTypes.bool,
  onCameraPress: PropTypes.func.isRequired,
  onGalleryPress: PropTypes.func.isRequired,
};

export default withTheme(ImagePickerDialog);
