import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';
import { authFetch } from '../../context/AuthContext';

const priorityStyles = {
    High: { bg: Colors.light.priorityHighBg, color: Colors.light.priorityHigh },
    Medium: { bg: Colors.light.priorityMediumBg, color: Colors.light.priorityMedium },
    Low: { bg: Colors.light.priorityLowBg, color: Colors.light.priorityLow },
};

const TasksScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setError('');
                setLoading(true);
                const data = await authFetch('/tasks', { method: 'GET' });
                const list = Array.isArray(data?.tasks) ? data.tasks : [];
                if (mounted) setTasks(list);
            } catch (e) {
                if (mounted) setError(e?.message || 'Failed to load tasks');
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task._id === id ? { ...task, completed: !task.completed } : task))
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <UserNavbar />

                <View style={styles.bodyWrapper}>
                    <Text style={styles.pageTitle}>Tasks</Text>
                    <Text style={styles.pageSubtitle}>Manage your poultry routines and stay ahead of chores.</Text>

                    {loading ? <Text style={styles.pageSubtitle}>Loading...</Text> : null}
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.tasksStack}>
                        {tasks.map((task) => {
                            const isCompleted = task.completed;
                            const badgeStyle = priorityStyles[task.priority];

                            return (
                                <View key={task._id} style={[styles.taskCard, isCompleted && styles.taskCardDone]}>
                                    <TouchableOpacity
                                        style={[
                                            styles.checkbox,
                                            isCompleted ? styles.checkboxChecked : styles.checkboxDefault,
                                        ]}
                                        onPress={() => toggleTask(task._id)}
                                    >
                                        {isCompleted && <Ionicons name="checkmark" size={18} color={Colors.light.topBackground} />}
                                    </TouchableOpacity>

                                    <View style={styles.cardContent}>
                                        <Text style={[styles.taskTitle, isCompleted && styles.taskTitleDone]}>{task.title}</Text>
                                        <View style={styles.metaRow}>
                                            <View style={styles.metaGroup}>
                                                <Ionicons name="pricetag-outline" size={16} color={Colors.light.icon} />
                                                <Text style={styles.metaText}>{task.category}</Text>
                                            </View>
                                            <View style={styles.metaGroup}>
                                                <Ionicons name="time-outline" size={16} color={Colors.light.icon} />
                                                <Text style={styles.metaText}>{task.time}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={[styles.priorityBadge, { backgroundColor: badgeStyle.bg }]}>
                                        <Text style={[styles.priorityLabel, { color: badgeStyle.color }]}>{task.priority}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={28} color={Colors.light.topBackground} />
            </TouchableOpacity>
        </View>
    );
};

export default TasksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    bodyWrapper: {
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 18,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.light.text,
    },
    pageSubtitle: {
        fontSize: 15,
        color: Colors.light.textMuted,
        lineHeight: 22,
    },
    errorText: {
        fontSize: 14,
        color: '#dc2626',
        lineHeight: 20,
    },
    tasksStack: {
        gap: 12,
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.topBackground,
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 14,
        shadowColor: '#1A202C0F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
    },
    taskCardDone: {
        opacity: 0.75,
    },
    checkbox: {
        width: 34,
        height: 34,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    checkboxDefault: {
        borderWidth: 2,
        borderColor: '#C9D3DF',
    },
    checkboxChecked: {
        backgroundColor: Colors.light.success,
    },
    cardContent: {
        flex: 1,
        gap: 4,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    taskTitleDone: {
        color: '#94A3B8',
        textDecorationLine: 'line-through',
    },
    metaRow: {
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
    },
    metaGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 13,
        color: '#6C7A91',
    },
    priorityBadge: {
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    priorityLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },
    fab: {
        position: 'absolute',
        bottom: 32,
        right: 24,
        width: 58,
        height: 58,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.success,
        shadowColor: '#1A472A44',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 6,
    },
});