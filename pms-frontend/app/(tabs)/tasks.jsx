import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const tasksData = [
    { id: '1', title: 'Give chicken water', completed: true },
    { id: '2', title: 'Give chicken food', completed: true },
    { id: '3', title: 'Clean the coop', completed: false },
    { id: '4', title: 'Vaccinate Batch 4', completed: false },
    { id: '5', title: 'Review temperature', completed: false },
];

const TasksScreen = () => {
    const [tasks, setTasks] = useState(tasksData);

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        );
    };

    const renderTask = ({ item }) => {
        const isCompleted = item.completed;

        return (
            <View style={styles.taskCard}>
                <TouchableOpacity
                    style={[styles.statusBadge, isCompleted ? styles.statusBadgeCompleted : styles.statusBadgePending]}
                    onPress={() => toggleTask(item.id)}
                >
                    {isCompleted && <Icon name="check" size={18} color="#ffffff" />}
                </TouchableOpacity>
                <View style={styles.taskInfo}>
                    <Text style={[styles.taskTitle, isCompleted && styles.taskTitleCompleted]}>{item.title}</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                        <Icon name="edit" size={18} color={Colors.light.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
                        <Icon name="delete" size={18} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.safeArea}>
            <UserNavbar />
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <View style={styles.pageHeader}>
                        <Text style={styles.title}>Tasks</Text>
                        <Text style={styles.subtitle}>Manage your daily farm activities</Text>
                        <TouchableOpacity style={styles.createButton}>
                            <View style={styles.createButtonIcon}>
                                <Icon name="add" size={20} color="#ffffff" />
                            </View>
                            <Text style={styles.createButtonText}>Create task</Text>
                        </TouchableOpacity>
                    </View>
                }
                ListFooterComponent={
                    <TouchableOpacity style={styles.frequencyCard}>
                        <View style={styles.frequencyIconWrap}>
                            <Icon name="schedule" size={20} color={Colors.light.success} />
                        </View>
                        <Text style={styles.frequencyText}>Set task frequency</Text>
                        <Icon name="chevron-right" size={22} color={Colors.light.icon} />
                    </TouchableOpacity>
                }
            />
        </View>
    );
};

export default TasksScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
        paddingTop: 8,
    },
    pageHeader: {
        paddingTop: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.light.text,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 28,
        paddingVertical: 16,
        paddingHorizontal: 24,
        shadowColor: '#0F172A',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        elevation: 5,
    },
    createButtonIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    createButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#ffffff',
        letterSpacing: 0.2,
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 18,
        shadowColor: '#0F172A',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 3,
        marginBottom: 12,
    },
    statusBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    statusBadgeCompleted: {
        backgroundColor: Colors.light.success,
    },
    statusBadgePending: {
        borderWidth: 2,
        borderColor: '#D1D5DB',
        backgroundColor: Colors.light.background,
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    taskTitleCompleted: {
        color: '#6B7280',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    actionButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    editButton: {
        backgroundColor: '#E5E7EB',
        marginLeft: 0,
    },
    deleteButton: {
        backgroundColor: '#FEE2E2',
    },
    frequencyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5F3EA',
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 16,
        marginTop: 8,
    },
    frequencyIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(26,71,42,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    frequencyText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.success,
    },
    footerSpacing: {
        marginTop: 12,
    },
});