import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAxios} from '../network';

export function AllusersScreen() {
  const navigation = useNavigation();
  const myAxios = useAxios();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const tryAllusers = async () => {
      try {
        const response = await myAxios.get('/users');
        console.log('これ成功', response.data);
        const getUsers = response.data;
        setUsers(getUsers.data);
        console.log('げっとyu-za-', getUsers);
      } catch (err) {
        console.log('これ失敗', err);
      }
    };
    tryAllusers();
  }, []);

  const tryDelete = async id => {
    console.log({id});
    try {
      const response = await myAxios.delete(`/users/${id}`);
      console.log('これ成功', response);
    } catch (err) {
      console.log('これ失敗', err);
    }
  };

  return (
    <View>
      <Text>全ユーザー</Text>
      {users.map(user => {
        return (
          <Text key={user._id}>
            <Button
              title={user.name}
              onPress={() => {
                navigation.navigate('Useredit', {
                  id: user._id,
                  role: user.role,
                  name: user.name,
                  email: user.email,
                });
              }}
            />
            {user.role},{user.email},
            <Button
              title="削除"
              onPress={() => {
                console.log(user._id);
                tryDelete(user._id);
              }}
            />
          </Text>
        );
      })}

      <Button
        title="ユーザー追加"
        onPress={() => navigation.navigate('Usercreation')}
      />
      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}
