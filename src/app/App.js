/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen';
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import store from './store';
import {Provider} from 'react-redux';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {Navigation} from '../app/Navigation';
import {ProjectcreationScreen} from '../screens/ProjectcreationScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {AllprojectsScreen} from '../screens/AllprojectsScreen';
import {MyAxios2} from '../network';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
