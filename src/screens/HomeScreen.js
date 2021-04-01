import React, {useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../slices/loginSlice';
import {useNavigation} from '@react-navigation/native';
import {useAxios} from '../network';
import {isadmin} from '../slices/loginSlice';

export function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myAxios = useAxios();

  // 3. useSelectorでログインしたユーザーの情報をReduxから取り出す

  useEffect(() => {
    // 1. GET api/v1/auth/me にリクエストする -> ログインしたユーザーの情報が取れる
    const tryRole = async () => {
      try {
        const response = await myAxios.get('/auth/me');
        console.log('成功', response.data.data.role);
        if (response.data.data.role === 'admin') {
          dispatch(isadmin(true));
          console.log('通ってる');
        }
      } catch (err) {
        console.log('これ失敗', err);
      }
    };
    tryRole();
    // 2. 取れた情報をReduxに保存する
  }, []);
  const role = useSelector(state => state);
  console.log('ロール', role);

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
      {/* 4. 権限を元に、条件分岐... */}
      {role.login.role ? (
        <View>
          <Button
            title="全ユーザー"
            onPress={() => {
              navigation.navigate('Allusers');
            }}
          />
        </View>
      ) : null}
      <Button title="ログアウト" onPress={() => dispatch(logout())} />
    </View>
  );
}
