import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LabelText from '_components/inputs/LabelText';
import EditTextBox from '_components/inputs/EditTextBox';
import NumberCountLabel from '_components/inputs/NumberCountLabel';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import STRINGS from '_components/constants/strings';
import COLORS from '_components/constants/colors';
import SimpleDropDown from '_components/dropDown/SimpleDropDown';
import DROP_DOWN_VALUES from '_components/constants/dropDownValues';
import CustomImagePicker from '_components/inputs/CustomImagePicker';
import LoadingActionButton from '_components/buttons/LoadingActionButton';
import LoadingActionButtonOutline from '_components/buttons/LoadingActionButtonOutline';
import { FeedBack } from '_api/feedBack';
const GiveFeedBack = () => {
  const [defaultValues, setDefaultValues] = useState({
    Purpose: '',
    Subject: '',
    Message: '',
    Document: {
      Name: '',
      Size: 1024,
      Type: 'image/png',
      Data: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [ImageData, setImageData] = useState('');

  const [minLengthConsumer, setMinLengthConsumer] = useState(4);
  const [maxLengthConsumer, setMaxLengthConsumer] = useState(100);
  const validationSchema = Yup.object({
    Purpose: Yup.string()
      .notOneOf(['Select Purpose'], STRINGS.PLEASE_SELECT_VALID + 'Purpose')
      .required(STRINGS.PLEASE_SELECT_VALID + 'op type'),
    Subject: Yup.string()
      .trim()
      .min(minLengthConsumer, STRINGS.PLEASE_ENTER_VALID + ' subject')
      .max(maxLengthConsumer, STRINGS.PLEASE_ENTER_VALID + ' subject')
      .required(STRINGS.PLEASE_ENTER_VALID + ' subject'),
  });

  const handleUploadImage = () => {
    setImagePickerVisible(true);
  };

  const handleImagePickerDismiss = () => {
    setImagePickerVisible(false);
  };
  const handleSubmit = async (values) => {
    setLoading(true);

    let reqJSON = {
      Purpose: values.Purpose,
      Subject: values.Subject,
      Messsage: values.Messsage,
      Document: values.Document,
    };
    console.log('feedback req-->', reqJSON);
    const response = await FeedBack(reqJSON);
    console.log('feedback req-->', response);
    setLoading(false);
    if (!response.isAuthorized) {
      return;
    }

    if (!response.status) {
      return;
    }
    const data = JSON.parse(response.data);

    console.log('data===>', data);
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const GiveFeedbackForm = ({
    values,
    setFieldValue,
    errors,
    validateField,
    submitForm,
    resetForm,
  }) => {
    console.log('errors--->', errors);
    const onImageSelect = (imageData) => {
      let { imageBase64, imageURI, type } = imageData;

      setFieldValue('Document.Data', imageBase64);
      setFieldValue('Document.Name', 'kyc.png');
      setFieldValue('Document.Type', 'image/png');
      setFieldValue('DocumentURI', imageURI);
      setImageData(imageBase64);
    };
    return (
      <View style={styles.mainView}>
        <LabelText style={styles.note} text={STRINGS.TOP_NOTE}></LabelText>
        <CustomImagePicker
          pickerVisible={imagePickerVisible}
          onDismiss={handleImagePickerDismiss}
          onImageSelect={onImageSelect}
        />
        <SimpleDropDown
          name="Purpose"
          data={DROP_DOWN_VALUES.PURPOSE}
          placeholder={{
            label: 'Select Purpose',
            value: '',
            key: '0',
          }}
          itemKey="key"
          onChangeText={(item) => {
            setFieldValue('Purpose', item);
          }}
          errorMessage={errors.Purpose}
        />
        <EditTextBox
          style={styles.editTextBox}
          label="Subject"
          name="Subject"
          maxLength={100}
          multiline={true}
        />
        <NumberCountLabel textCount={values.Subject} maxValue={100} />
        <EditTextBox
          style={styles.editTextBox}
          label="Message"
          name="Message"
          maxLength={750}
          multiline={true}
        />
        <NumberCountLabel textCount={values.Message} maxValue={750} />
        <View>
          <LoadingActionButtonOutline
            style={styles.uploadImageButton}
            title={'Upload Image'}
            contentStyle={styles.contentStyle}
            callback={handleUploadImage}
            loading={false}
          />
          {ImageData !== '' && (
            <>
              <Image
                style={styles.image}
                source={{
                  uri: `data:image/png;base64,${ImageData}`,
                }}
              />
            </>
          )}
        </View>
        <View style={{ flex: 1, alignSelf: 'center' }}>
          <LoadingActionButton
            style={styles.button}
            title={'Send'}
            callback={submitForm}
            loading={loading}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          enableReinitialize={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}>
          {GiveFeedbackForm}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    padding: 20,
    backgroundColor: COLORS.BG_COLOR,
  },
  safeArea: { flex: 1 },
  digitText: {
    fontFamily: 'Poppins_Bold',
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  note: {
    fontFamily: 'Poppins_Bold',
    marginBottom: 5,
  },
  button: {
    justifyContent: 'center',
  },
  uploadImageButton: { borderRadius: 10, marginBottom: 10 },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'center',
  },
});
export default GiveFeedBack;
