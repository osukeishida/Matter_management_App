import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {myAxios} from '../network';
import {TestScheduler} from '@jest/core';

export function AllusersScreen() {
  const navigation = useNavigation();
  const token = useSelector(state => state.login.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const tryAllusers = async () => {
      try {
        const response = await myAxios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
            {user.role},{user.email}
          </Text>
        );
      })}

      <Text>TODO ユーザー追加</Text>
      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}
