import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const categories = [
  { name: 'Feeding', icon: 'restaurant', color: '#6ca502' },     // orange-amber for food
  { name: 'Cleaning', icon: 'cleaning-services', color: '#6ca502' },
  { name: 'Health', icon: 'healing', color: '#6ca502' },          // red for health/medical
  { name: 'Environment', icon: 'eco', color: '#6ca502' },
];

const priorities = [
  { label: 'Low', color: '#748152' },
  { label: 'Medium', color: '#65b62f' },
  { label: 'High', color: '#00c040ea' },
];

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
    setShowDatePicker(false); // Close on Android immediately
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatDate = (d) => {
    return d.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (t) => {
    return t.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleSave = () => {
    if (!taskName.trim()) {
      // You can add alert / toast here
      console.warn('Task name is required');
      return;
    }

    const task = {
      taskName,
      category: selectedCategory,
      date: formatDate(date),
      time: formatTime(time),
      priority: selectedPriority,
      notes,
    };

    console.log('New Task:', task);
    // TODO: Save to state / context / API / AsyncStorage / navigate back
  };

  return (
  <>
    <UserNavbar />
    <ScrollView style={styles.container}>
      

      <Text style={styles.title}>New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Clean the water tanks"
        placeholderTextColor="#AAA"
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
              selectedCategory === cat.name && {
                ...styles.selectedCategory, backgroundColor: `${Colors.light.success}10`,
                borderColor: Colors.light.success,
              },
            ]}
            onPress={() => setSelectedCategory(cat.name)}
          >
            <Icon name={cat.icon} size={24} color={selectedCategory === cat.name ? '#096b00' : cat.color} />
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory === cat.name ? '#096b00' : cat.color },
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeItem}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.pickerText}>{formatDate(date)}</Text>
            <Icon name="calendar-today" size={20} color="#757575" />
          </TouchableOpacity>
        </View>

        <View style={styles.dateTimeItem}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.pickerText}>{formatTime(time)}</Text>
            <Icon name="access-time" size={20} color="#757575" />
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {priorities.map((prio) => (
          <TouchableOpacity
            key={prio.label}
            style={[
              styles.priorityButton,
              selectedPriority === prio.label && { ...styles.selectedPriority, backgroundColor: prio.color, borderColor: prio.color },
            ]}
            onPress={() => setSelectedPriority(prio.label)}
          >
            <Text
              style={[
                styles.priorityText,
                selectedPriority === prio.label && { color: '#FFF' },
              ]}
            >
              {prio.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Add additional details about the task..."
        placeholderTextColor="#AAA"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  notesInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    width: '48%',
    backgroundColor: '#F9F9F9',
  },
  selectedCategory: {
    // dynamically set bg & border in render
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FAFAFA',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  priorityButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    width: '30%',
    backgroundColor: '#F9F9F9',
  },
  selectedPriority: {
    // dynamic bg & border
  },
  priorityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default NewTaskScreen;