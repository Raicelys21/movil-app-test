import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    const taskId = `${Date.now()}${task}`;
    setTasks([...tasks, { id: taskId, text: task, completed: false }]);
    setTask('');
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  const taskDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const editTask = (id, newText) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    setEditMode(null);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.taskInput}
        placeholder='Ex: Wash the dishes'
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <ScrollView style={styles.tasksContainer}>
        {tasks.map((task) => (
          <View key={task.id}>
            {editMode === task.id ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.taskInput, { marginRight: 10, flex: 1 }]}
                  value={editedTask}
                  onChangeText={setEditedTask}
                />
                <TouchableOpacity onPress={() => editTask(task.id, editedTask)}>
                  <Text style={{ color: '#496989', fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => toggleTaskComplete(task.id)}
                  onLongPress={() => taskDelete(task.id)}
                  style={[styles.task, task.completed && styles.completeTask]}
                >
                  <Text style={styles.taskText}>{task.text}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setEditMode(task.id)}>
                    <Text style={{ color: '#58A399', marginRight: 10 }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => taskDelete(task.id)}>
                    <Text style={{ color: '#E2F4C5' }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  taskInput: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#B9B4C7',
    borderColor: '#5C5470',
    borderWidth: 1,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#5C5470',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FAF0E6',
    fontWeight: 'bold',
  },
  tasksContainer: {
    marginTop: 20,
  },
  task: {
    backgroundColor: '#FAF0E6',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  taskText: {
    maxWidth: '80%',
    color: '#352F44',
  },
  completeTask: {
    backgroundColor: '#d1e7dd'
  }
});
