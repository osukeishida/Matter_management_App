import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {myAxios} from '../network';

export function AllprojectsScreen() {
  const navigation = useNavigation();
  const token = useSelector(state => state.login.token);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const tryAllprojects = async () => {
      // 全案件取得
      try {
        const response = await myAxios.get('/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('これ成功', response.data);

        const getProjects = response.data;
        setProjects(getProjects.data);
        console.log('げっとぷろじぇくつ', getProjects.data);
      } catch (err) {
        console.log('これ失敗', err);
      }
    };
    tryAllprojects();
  }, [token]);

  return (
    <View>
      <Text>全案件</Text>
      {projects.map(project => {
        return (
          <View key={project._id}>
            <Button
              title={project.name}
              onPress={() => {
                navigation.navigate('Projectedit', {
                  id: project._id,
                  name: project.name,
                  customer: project.customer,
                  description: project.description,
                  skills: project.skills,
                  assignees: project.assignees,
                });
              }}
            />
            <Text>{project.customer}</Text>
            <Text>{project.description}</Text>
            <Text>{project.skills}</Text>
            <Text>
              {project.assignees.map(assign => {
                return <Text key={assign._id}>{assign.name}</Text>;
              })}
            </Text>
          </View>
        );
      })}

      <Button title="戻る" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default AllprojectsScreen;
