import React, { memo } from 'react';
import COLORS from '_components/constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GiveFeedBack from '_screens/giveFeedback';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffff',
        },
        headerTintColor: COLORS.BLACK,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'Poppins_Medium',
          fontSize: 18,
        },
      }}>
      <Stack.Screen
        name="GiveFeedBack"
        component={GiveFeedBack}
        options={{ title: 'Give FeedBack' }}
      />
    </Stack.Navigator>
  );
};

export default memo(StackNavigator);
