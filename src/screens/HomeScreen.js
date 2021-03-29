import React, {useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../slices/loginSlice';
import {useNavigation} from '@react-navigation/native';
import {ProjectcreationScreen} from './ProjectcreationScreen';
import {AllprojectsScreen} from '../screens/AllprojectsScreen';
import {ProjecteditScreen} from '../screens/ProjecteditScreen';

export function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>TODO ここに自分が担当の案件を出したい</Text>
      <Button
        title="案件作成"
        onPress={() => {
          navigation.navigate('Projectcreation');
        }}
      />
      <Button
        title="全案件"
        onPress={() => {
          navigation.navigate('Allprojects');
        }}
      />
      <Button title="ログアウト" onPress={() => dispatch(logout())} />
    </View>
  );
}
