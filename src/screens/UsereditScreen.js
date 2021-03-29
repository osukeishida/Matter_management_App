import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, View, Text, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAxios} from '../network';

export function UsereditScreen() {
  const navigation = useNavigation();
  const myAxios = useAxios();
  const route = useRoute();
  const token = useSelector(state => state.login.token);
  const [name, onChangeUsername] = React.useState(route.params.name);
  const [email, onChangeUseremail] = React.useState(route.params.email);

  console.log(route.params);

  const tryUseredit = async () => {
    console.log(token);
    try {
      const response = await myAxios.put(`/users/${route.params.id}`, {
        name,
        email,
        // role,
      });
      console.log(response);
      console.log(response);
      console.log('これ成功', response);
    } catch (err) {
      console.log('これ失敗', err);
    }
  };

  return (
    <View>
      <Text>ユーザー編集フォーム</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeUsername(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeUseremail(text)}
        value={email}
      />
      <Text>roleはトグルスイッチ</Text>
      <Button onPress={tryUseredit} title="送信" />
      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default UsereditScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
