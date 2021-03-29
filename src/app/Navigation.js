import 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {useSelector} from 'react-redux';
import {ProjectcreationScreen} from '../screens/Projectcreation';
import {AllprojectsScreen} from '../screens/AllprojectsScreen';
import {ProjecteditScreen} from '../screens/ProjecteditScreen';
const Stack = createStackNavigator();

export function Navigation() {
  const token = useSelector(state => state.login.token);
  // console.log(token);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Projectcreation"
              component={ProjectcreationScreen}
            />
            <Stack.Screen name="Allprojects" component={AllprojectsScreen} />
            <Stack.Screen name="Projectedit" component={ProjecteditScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
