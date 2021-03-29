import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, View, Text, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAxios} from '../network';

export function ProjecteditScreen() {
  const navigation = useNavigation();
  const myAxios = useAxios();
  const route = useRoute();
  const token = useSelector(state => state.login.token);
  const [name, onChangeProjectname] = React.useState(route.params.name);
  const [description, onChangeDescription] = React.useState(
    route.params.description,
  );
  const [customer, onChangeCustomer] = React.useState(route.params.customer);
  const [skills, onChangeSkills] = React.useState(route.params.skills);

  console.log(route.params);

  const getNames = assignees => {
    console.log({assignees});
  };

  const tryProjectedit = async () => {
    console.log(token);
    try {
      const response = await myAxios.put(`/projects/${route.params.id}`, {
        name,
        description,
        customer,
        skills,
      });
      console.log(response);
      // TODO 案件作成完了ページ作成
      console.log('これ成功', response);
    } catch (err) {
      console.log('これ失敗', err);
    }
  };

  return (
    <View>
      <Text>案件編集フォーム</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeProjectname(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeDescription(text)}
        value={description}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeCustomer(text)}
        value={customer}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeSkills(text)}
        value={skills.join(',')}
      />

      {route.params.assignees.map(assignee => {
        return (
          <TextInput
            key={assignee._id}
            // アサインは記入タイプではなくユーザー一覧選択
            style={styles.input}
            value={assignee.name}
          />
        );
      })}
      <Button onPress={tryProjectedit} title="送信" />
      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default ProjecteditScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
