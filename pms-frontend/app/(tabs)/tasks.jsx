import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';

import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const tasksData = [
    { id: '1', title: 'Clean the water tanks', category: 'Cleaning', time: '08:00 AM', priority: 'High', completed: false },
    { id: '2', title: 'Morning Feeding', category: 'Feeding', time: '07:00 AM', priority: 'Medium', completed: false },
    { id: '3', title: 'Temperature Check', category: 'Environment', time: '06:00 AM', priority: 'Low', completed: true },
    { id: '4', title: 'Vaccination - Batch A', category: 'Health', time: '10:30 AM', priority: 'High', completed: false },
];

const priorityStyles = {
    High: { bg: '#FEE2E2', color: '#EF4444', dot: '#EF4444' },
    Medium: { bg: '#FEF3C7', color: '#D97706', dot: '#D97706' },
    Low: { bg: '#E0F2FE', color: '#0284C7', dot: '#0284C7' },
};

const TasksScreen = () => {
    const router = useRouter();
    const [tasks, setTasks] = useState(tasksData);
    const [activeTab, setActiveTab] = useState('Pending'); // Pending | Completed

    const toggleTask = (id) => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        );
    };

    const filteredTasks = tasks.filter(t => activeTab === 'Pending' ? !t.completed : t.completed);

    return (
        <View style={styles.container}>
            <UserNavbar />
            
            <View style={styles.headerSection}>
                <Text style={styles.pageTitle}>Daily Chores</Text>
                <Text style={styles.pageSubtitle}>Keep your flock healthy and your farm organized.</Text>
                
                {/* Segmented Tab Control */}
                <View style={styles.tabBar}>
                    {['Pending', 'Completed'].map((tab) => (
                        <TouchableOpacity 
                            key={tab} 
                            style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab} {tab === 'Pending' && tasks.filter(t => !t.completed).length > 0 && `(${tasks.filter(t => !t.completed).length})`}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.tasksStack}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => {
                            const badgeStyle = priorityStyles[task.priority];
                            return (
                                <View key={task.id} style={[styles.taskCard, task.completed && styles.taskCardDone]}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={[styles.checkbox, task.completed ? styles.checkboxChecked : styles.checkboxDefault]}
                                        onPress={() => toggleTask(task.id)}
                                    >
                                        {task.completed && <Ionicons name="checkmark-sharp" size={20} color="white" />}
                                    </TouchableOpacity>

                                    <View style={styles.cardContent}>
                                        <Text style={[styles.taskTitle, task.completed && styles.taskTitleDone]}>
                                            {task.title}
                                        </Text>
                                        <View style={styles.metaRow}>
                                            <View style={styles.tagBadge}>
                                                <Text style={styles.tagText}>{task.category}</Text>
                                            </View>
                                            <View style={styles.timeGroup}>
                                                <Ionicons name="time-outline" size={14} color="#94A3B8" />
                                                <Text style={styles.timeText}>{task.time}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {!task.completed && (
                                        <View style={[styles.priorityDot, { backgroundColor: badgeStyle.dot }]} />
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconCircle}>
                                <Ionicons name="sparkles-outline" size={40} color={Colors.light.success} />
                            </View>
                            <Text style={styles.emptyTitle}>
                                {activeTab === 'Pending' ? "All caught up!" : "No completed tasks"}
                            </Text>
                            <Text style={styles.emptySubtitle}>
                                {activeTab === 'Pending' ? "Take a break, you've done everything for now." : "Tasks you finish will show up here."}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <TouchableOpacity 
                activeOpacity={0.9} 
                style={styles.fab} 
                onPress={() => router.push('/addTask')}
            >
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default TasksScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    headerSection: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: '#FFF', paddingBottom: 10 },
    pageTitle: { fontSize: 28, fontWeight: '800', color: '#1E293B' },
    pageSubtitle: { fontSize: 14, color: '#64748B', marginTop: 4, marginBottom: 20 },
    
    tabBar: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4 },
    tabItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
    tabItemActive: { backgroundColor: '#FFF', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
    tabTextActive: { color: Colors.light.success },

    scrollContent: { padding: 20, paddingBottom: 100 },
    tasksStack: { gap: 14 },
    
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
    },
    taskCardDone: { opacity: 0.6, backgroundColor: '#F8FAFC' },
    
    checkbox: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    checkboxDefault: { borderWidth: 2, borderColor: '#E2E8F0' },
    checkboxChecked: { backgroundColor: Colors.light.success },
    
    cardContent: { flex: 1 },
    taskTitle: { fontSize: 16, fontWeight: '700', color: '#334155' },
    taskTitleDone: { textDecorationLine: 'line-through', color: '#94A3B8' },
    
    metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 10 },
    tagBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    tagText: { fontSize: 11, fontWeight: '600', color: '#64748B' },
    timeGroup: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    timeText: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
    
    priorityDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 10 },

    emptyContainer: { alignItems: 'center', marginTop: 60 },
    emptyIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    emptyTitle: { fontSize: 18, fontWeight: '700', color: '#334155' },
    emptySubtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginTop: 6, paddingHorizontal: 40 },
// Update these specific values in your styles object
fab: {
    position: 'absolute',
    // Increase this value! 
    // If you are using the custom Tab Bar we made, 90-100 is the sweet spot.
    bottom: Platform.OS === 'ios' ? 110 : 90, 
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.success,
    // Add zIndex to ensure it stays on top of all other elements
    zIndex: 999, 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
},
});