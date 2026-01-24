import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming already installed from previous code
import DateTimePicker from '@react-native-community/datetimepicker';
import UserNavbar from '../../components/UserNavbar'
 // Install via: npm install @react-native-community/datetimepicker
// For iOS: npx pod-install

const categories = [
  { name: 'Feeding', icon: 'cloud' }, // Placeholder icon; adjust based on actual (screenshot shows hash? Maybe 'restaurant' for feeding)
  { name: 'Cleaning', icon: 'cleaning-services' }, // Broom-like
  { name: 'Health', icon: 'favorite' }, // Heart
  { name: 'Environment', icon: 'eco' }, // Leaf
];

const priorities = ['Low', 'Medium', 'High'];

const NewTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [notes, setNotes] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const formatTime = (time) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleSave = () => {
    // TODO: Implement save logic, e.g., add to tasks list or API call
    console.log({ taskName, selectedCategory, date: formatDate(date), time: formatTime(time), selectedPriority, notes });
    // Navigate back or clear form
  };

  return (
    <ScrollView style={styles.container}>

        <UserNavbar/>
      <Text style={styles.title}>New Task</Text>
      
      <TextInput
        style={styles.input}
        placeholder="e.g. Clean the water tanks"
        value={taskName}
        onChangeText={setTaskName}
      />
      
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.categoryButton,
              selectedCategory === cat.name && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(cat.name)}
          >
            <Icon name={cat.icon} size={24} color={selectedCategory === cat.name ? '#FFF' : '#4CAF50'} />
            <Text style={[
              styles.categoryText,
              selectedCategory === cat.name && styles.selectedCategoryText,
            ]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeItem}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
            <Text>{formatDate(date)}</Text>
            <Icon name="calendar-today" size={20} color="#757575" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        <View style={styles.dateTimeItem}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePicker(true)}>
            <Text>{formatTime(time)}</Text>
            <Icon name="access-time" size={20} color="#757575" />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
      </View>
      
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {priorities.map((prio) => (
          <TouchableOpacity
            key={prio}
            style={[
              styles.priorityButton,
              selectedPriority === prio && styles.selectedPriority,
            ]}
            onPress={() => setSelectedPriority(prio)}
          >
            <Text style={[
              styles.priorityText,
              selectedPriority === prio && styles.selectedPriorityText,
            ]}>
              {prio}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Add additional details about the task..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginBottom: 8,
    width: '48%', // Two per row
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    marginLeft: 8,
    color: '#4CAF50',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateTimeItem: {
    width: '48%',
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priorityButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    width: '30%',
  },
  selectedPriority: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  priorityText: {
    fontSize: 16,
  },
  selectedPriorityText: {
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewTaskScreen;