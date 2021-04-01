import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {useAxios} from '../network';

export function ProjectcreationScreen() {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.login.token);
  const myAxios = useAxios();
  const [name, onChangeProjectname] = React.useState('axios');
  const [description, onChangeDescription] = React.useState('axios');
  const [customer, onChangeCustomer] = React.useState('axois');
  const [skills = skills.split(','), onChangeSkills] = React.useState([
    'axios',
    'php',
  ]);
  // const [assignees, onChangeAssignees] = React.useState('アサイン');

  // APIからとってきた全User情報配列を保持するためのState
  const [users, setUsers] = useState([]);
  // Pickerで何が選択されているか（userのID）を管理するState
  const [selectedValue, setSelectedValue] = useState(undefined);

  const tryprojectcreation = async () => {
    //   案件作成
    console.log(token);
    try {
      const response = await myAxios.post('/projects', {
        name,
        description,
        customer,
        skills,
        assignees: [selectedValue],
      });
      // console.log(response);

      // TODO 案件作成完了ページ作成
      console.log('これ成功', response);
    } catch (err) {
      console.log('これ失敗', err);
    }
  };

  useEffect(() => {
    const tryAllusers = async () => {
      try {
        const response = await myAxios.get('/users');
        console.log('これ成功', response.data);
        const getUsers = response.data;

        console.log('これ配列？これこれ', getUsers.data);
        setUsers(getUsers.data); // 変更前　これは配列
        // setUsers(getUsers); //変更後
        console.log('げっとyu-za-', getUsers);
      } catch (err) {
        console.log('これ失敗', err);
      }
    };
    tryAllusers();
  }, []);

  return (
    <View>
      <Text>案件作成フォーム</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeProjectname(text)}
        value={name}
        placeholder="projectname"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeDescription(text)}
        value={description}
        placeholder="description"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeCustomer(text)}
        value={customer}
        placeholder="customer"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeSkills(text)}
        value={skills.join(',')}
        placeholder="skills"
      />
      {/* <Text>
        {users.map(user => {
          return <Text key={user._id}>{user.name}</Text>;
        })}
      </Text> */}

      <Picker
        selectedValue={selectedValue}
        onValueChange={user => {
          console.log(user);
          setSelectedValue(user);
        }}>
        {users.map(user => {
          return (
            <Picker.Item
              key={user._id}
              label={user.name.toString()}
              value={user._id}
            />
          );
        })}
      </Picker>

      <Button onPress={tryprojectcreation} title="送信" />

      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default ProjectcreationScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
