import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Install via: npm install react-native-vector-icons
import { Colors } from '../../constants/colors';
import UserNavbar from '../../components/UserNavbar'
const tasksData = [
  { id: '1', title: 'Give chicken water', completed: true },
  { id: '2', title: 'Give chicken food', completed: true },
  { id: '3', title: 'Clean coop', completed: false },
  { id: '4', title: 'Vaccinate Batch 4', completed: false },
  { id: '5', title: 'Review temperature', completed: false },
];

const TasksScreen = () => {
  const [tasks, setTasks] = useState(tasksData);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={[styles.customCheckbox, item.completed && styles.checkedCheckbox]} 
        onPress={() => toggleTask(item.id)}
      >
        {item.completed && <Icon name="check" size={16} color="#FFF" />}
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.title}
      </Text>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="edit" size={20} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="more-vert" size={20} color="#757575" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <UserNavbar/>
      <Text style={styles.title}>Tasks</Text>
      <Text style={styles.subtitle}>Manage daily farm activities</Text>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.buttonText}>+ Create task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.frequencyButton}>
        <Text style={styles.buttonText}>Set task frequency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#19501b', // Green header
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#19501b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  customCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#757575',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor:'#19501b',
    borderColor: '#19501b',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  iconButton: {
    marginLeft: 8,
  },
  frequencyButton: {
    backgroundColor: '#19501b', // Lighter green
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default TasksScreen;