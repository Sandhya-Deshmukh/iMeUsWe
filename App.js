import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import StackNavigator from './src/rootNavigation/stackNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import COLORS from '_components/constants/colors';
import { DefaultTheme } from '_components/constants/themes';
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={false}
        style={'light'}
        backgroundColor={COLORS.PRIMARY_BASE}
      />
      <PaperProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}
