// TasksScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// For demo — replace with real date logic later
const todayIndex = 1; // TUE

const initialTasks = [
  {
    id: '1',
    title: 'Clean the water tanks',
    time: '08:00 AM',
    priority: 'HIGH',
    category: 'Cleaning',
    completed: false,
  },
  {
    id: '2',
    title: 'Morning Feeding',
    time: '07:00 AM',
    priority: 'MEDIUM',
    category: 'Feeding',
    completed: false,
  },
  {
    id: '3',
    title: 'Temperature Check',
    time: '',
    priority: 'LOW',
    category: 'Environment',
    completed: true,
  },
  {
    id: '4',
    title: 'Vaccination - Batch A',
    time: '10:30 AM',
    priority: 'HIGH',
    category: 'Health',
    completed: false,
  },
];

const priorityStyles = {
  HIGH: { backgroundColor: '#dc2626', color: 'white' },
  MEDIUM: { backgroundColor: '#d97706', color: 'white' },
  LOW: { backgroundColor: '#059669', color: 'white' },
};

// Ionicons names that fit reasonably well
const categoryIcons = {
  Cleaning: 'water-outline',           // or 'trash-outline', 'sparkles-outline'
  Feeding: 'restaurant-outline',        // or 'leaf-outline', 'nutrition-outline'
  Environment: 'thermometer-outline',
  Health: 'medkit-outline',             // or 'bandage-outline', 'heart-outline'
  // fallback
  default: 'time-outline',
};

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderTask = ({ item }) => {
    const iconName = categoryIcons[item.category] || categoryIcons.default;
    const prioStyle = priorityStyles[item.priority] || priorityStyles.LOW;

    return (
      <View style={styles.taskCard}>
        <Pressable
          onPress={() => toggleComplete(item.id)}
          style={({ pressed }) => [
            styles.checkbox,
            item.completed && styles.checkboxDone,
            pressed && { opacity: 0.7 },
          ]}
        >
          {item.completed && (
            <Ionicons name="checkmark" size={18} color="white" />
          )}
        </Pressable>

        <View style={styles.taskInfo}>
          <Text
            style={[
              styles.taskName,
              item.completed && styles.taskNameDone,
            ]}
          >
            {item.title}
          </Text>

          <View style={styles.metaRow}>
            {item.time ? (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color="#64748b" />
                <Text style={styles.metaText}>{item.time}</Text>
              </View>
            ) : null}

            <View style={styles.metaItem}>
              <Ionicons name={iconName} size={14} color="#64748b" />
              <Text style={styles.metaText}>{item.category}</Text>
            </View>

            <View style={[styles.priorityTag, { backgroundColor: prioStyle.backgroundColor }]}>
              <Text style={[styles.priorityLabel, { color: prioStyle.color }]}>
                {item.priority}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {/* Weekday bar */}
      <View style={styles.weekHeader}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {days.map((day, index) => {
            const isActive = index === todayIndex;
            return (
              <Pressable
                key={day}
                style={[styles.dayPill, isActive && styles.dayPillActive]}
              >
                <Text style={[styles.dayLabel, isActive && styles.dayLabelActive]}>
                  {day}
                </Text>
                {isActive && <Text style={styles.dayNumber}>29</Text>}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <Text style={styles.pageTitle}>Wednesday, January 29</Text>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      <Pressable style={styles.fab}>
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  weekHeader: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  dayPill: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 9999,
  },
  dayPillActive: {
    backgroundColor: '#16a34a',
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  dayLabelActive: {
    color: 'white',
    fontWeight: '600',
  },
  dayNumber: {
    fontSize: 11,
    color: 'white',
    marginTop: 2,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  taskList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  taskNameDone: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 6,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#64748b',
  },
  priorityTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  priorityLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
});