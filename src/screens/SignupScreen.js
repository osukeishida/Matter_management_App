import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {login} from '../slices/loginSlice';
import {myAxios} from '../network';

export function SignupScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const trySignup = async () => {
    const response = await myAxios.post('/auth/register', {
      name,
      email,
      password,
    });
    dispatch(login(response.data.token));
  };

  return (
    <View>
      <Text>サインアップフォーム</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeName(text)}
        value={name}
        placeholder="name"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeEmail(text)}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
      />
      <Button onPress={trySignup} title="送信" />

      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}
export default SignupScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
