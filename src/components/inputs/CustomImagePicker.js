import React, { useState, useEffect, memo } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { withTheme } from 'react-native-paper';
import ImagePickerDialog from '_components/dialog/ImagePickerDialog';
import STRINGS from '_components/constants/strings';
import { PermissionsAndroid } from 'react-native';
import { CAMERA_GALLERY_TYPE } from '_components/constants/actionTypes';

const CustomImagePicker = ({
  pickerVisible,
  onDismiss,
  showSnackbar,
  imageAspect,
  onImageSelect,
}) => {
  const [visible, setVisible] = useState(false);

  const isPermissionsGranted = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        showSnackbar(STRINGS.CAMERA_PERMISSION_DENIED);
        return false;
      }
    } catch (err) {
      showSnackbar(STRINGS.CAMERA_PERMISSION_DENIED);
    }
    return false;
  };

  const openPicker = () => {
    setVisible(true);
  };

  const showImagePicker = async () => {
    if (!(await isPermissionsGranted())) {
      onDismiss();
      return;
    }
    openPicker();
  };

  let pickerVisibleEffect = () => {
    if (!pickerVisible) return;
    showImagePicker();
  };
  useEffect(pickerVisibleEffect, [pickerVisible]);
  const pickImage = async (cameraGalleryType) => {
    const pickerConfig = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 500,
      maxWidth: 500,
      quality: 0.95,
    };

    if (cameraGalleryType === CAMERA_GALLERY_TYPE.CAMERA) {
      await launchCamera(pickerConfig, (response) => {
        if (response.didCancel) {
          return;
        } else if (response.error) {
          return;
        } else {
          parseImageData(response);
        }
      });
    } else {
      await launchImageLibrary(pickerConfig, (response) => {
        if (response.didCancel) {
          return;
        } else if (response.error) {
          return;
        } else {
          parseImageData(response);
        }
      });
    }

    onDismiss();
  };

  const parseImageData = (imageData) => {
    if (!imageData) return;
    if (imageData.cancelled) return;
    if (imageData.assets[0].type !== 'image/jpeg') return;

    let type = imageData.assets[0].uri;
    let res = type.split('.');
    let imgType = imageData.assets[0].type + '/' + res[res.length - 1];
    imgType = imgType.replace(/\s+/g, '');
    onImageSelect({
      imageURI: imageData.assets[0].uri,
      imageBase64: imageData.assets[0].base64,
      type: imgType,
    });
  };

  const handleImagePickerClose = () => {
    setVisible(false);
    onDismiss();
  };
  const handleCameraPress = () => {
    handleImagePickerClose();
    pickImage(CAMERA_GALLERY_TYPE.CAMERA);
  };
  const handleGalleryPress = () => {
    handleImagePickerClose();
    pickImage(CAMERA_GALLERY_TYPE.GALLERY);
  };
  return (
    <ImagePickerDialog
      visible={visible}
      onDismiss={() => handleImagePickerClose()}
      onCameraPress={handleCameraPress}
      onGalleryPress={handleGalleryPress}
    />
  );
};

export default withTheme(memo(CustomImagePicker));
