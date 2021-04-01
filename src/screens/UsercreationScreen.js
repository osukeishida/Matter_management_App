import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text, TextInput, Button, Radio} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAxios} from '../network';

export function UsercreationScreen() {
  const navigation = useNavigation();
  const token = useSelector(state => state.login.token);
  const myAxios = useAxios();
  const [name, onChangeName] = React.useState('name');
  const [email, onChangeEmail] = React.useState('aaa2@aaa.com');
  const [role, onChangeRole] = React.useState('user');
  const [password, onChangePassword] = React.useState('password');

  const tryUsercreation = async () => {
    try {
      const response = await myAxios.post('/users', {
        name,
        email,
        // role,
        password,
      });
      // TODO ユーザー作成完了ページ作成
      console.log('これ成功', response);
    } catch (err) {
      console.log('これ失敗', err);
    }
  };

  return (
    <View>
      <Text>ユーザー作成フォーム</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeRole(text)}
        value={role}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />

      <Button onPress={tryUsercreation} title="送信" />

      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default UsercreationScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
