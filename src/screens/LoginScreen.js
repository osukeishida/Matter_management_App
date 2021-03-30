import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {login} from '../slices/loginSlice';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.login.token);
  const [email, onChangeEmail] = React.useState('ishida.o@impl.co.jp');
  const [password, onChangePassword] = React.useState('aaaaaaaa');

  const tryLogin = async () => {
    // ろぐいんする
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        {
          email,
          password,
        },
      );
      dispatch(login(response.data.token));
      // TODO ローディング時のぐるぐる
    } catch (err) {
      console.log('これ失敗', err);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Text>ログインフォーム</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeEmail(text)}
          value={email}
          //   placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          //   placeholder="password"
        />
        <Button onPress={tryLogin} title="送信" />
        <Button
          title="サインアップ"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
        <Button title="TODOパスワードリセット" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
