import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
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

  const tryprojectcreation = async () => {
    //   案件作成
    console.log(token);
    try {
      const response = await myAxios.post('/projects', {
        name,
        description,
        customer,
        skills,
        // assignees,
      });
      // console.log(response);

      // TODO 案件作成完了ページ作成
      console.log('これ成功', response);
    } catch (err) {
      console.log('これ失敗', err);
    }
  };

  return (
    <View>
      {/* TODO key,value作成 */}
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
      {/* <TextInput
        // アサインは記入タイプではなくユーザー一覧選択
        style={styles.input}
        onChangeText={text => onChangeAssignees(text)}
        value={assignees}
        // placeholder="assignees"
      /> */}
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
