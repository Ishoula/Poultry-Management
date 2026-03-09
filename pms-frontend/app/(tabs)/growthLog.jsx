import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { authFetch } from '../../context/AuthContext';

const GrowthLogScreen = () => {
    const router = useRouter();

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadLogs = React.useCallback(async () => {
        try {
            setError('');
            setLoading(true);
            const data = await authFetch('/growthLog', { method: 'GET' });
            const list = Array.isArray(data?.logs) ? data.logs : [];
            setLogs(list);
        } catch (e) {
            setError(e?.message || 'Failed to load logs');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadLogs();
    }, [loadLogs]);

    useFocusEffect(
        React.useCallback(() => {
            loadLogs();
        }, [loadLogs])
    );

    const uiLogs = useMemo(() => {
        const iconByType = {
            death: { icon: 'heart-broken', iconColor: '#EF4444' },
            feed: { icon: 'grass', iconColor: '#F59E0B' },
            weight: { icon: 'scale', iconColor: '#3B82F6' },
            vaccine: { icon: 'needle', iconColor: '#10B981' },
        };
        return logs.map((l) => {
            const logDate = l.date ? new Date(l.date) : null;
            const date = logDate && !Number.isNaN(logDate.getTime()) ? logDate.toLocaleDateString() : '-';
            const iconMeta = iconByType[l.type] || { icon: 'clipboard-text', iconColor: '#6B7280' };
            const unitLabel = l.unit === 'count' ? 'birds' : l.unit;
            return {
                id: l._id,
                title: (l.type || 'log').toString().toUpperCase(),
                value: `${l.value} ${unitLabel}`,
                date,
                note: l.notes || '',
                ...iconMeta,
            };
        });
    }, [logs]);

    const renderLog = ({ item }) => (
        <View style={styles.logCard}>
            <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                    <View style={[styles.iconBadge, { backgroundColor: `${item.iconColor}1A` }]}>
                        <Icon name={item.icon} size={22} color={item.iconColor} />
                    </View>
                    <View style={styles.titleTextWrap}>
                        <Text style={styles.logTitle}>{item.title}</Text>
                        <Text style={styles.logMetaLabel}>Value</Text>
                        <Text style={styles.logMetaValue}>{item.value}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icon name="edit" size={18} color={Colors.light.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.metaRow}>
                <View style={styles.metaBlock}>
                    <Text style={styles.metaLabel}>Date</Text>
                    <Text style={styles.metaValue}>{item.date}</Text>
                </View>
            </View>
            <Text style={styles.noteLabel}>Note:</Text>
            <Text style={styles.noteText}>{item.note}</Text>
        </View>
    );

    return (
        <View style={styles.safeArea}>
            <UserNavbar />
            <FlatList
                data={uiLogs}
                renderItem={renderLog}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <View style={styles.pageHeader}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.headerIconButton}>
                                <Icon name="arrow-back" size={20} color={Colors.light.text} />
                            </TouchableOpacity>
                            <Text style={styles.title}>Growth Log</Text>
                            <View style={{ width: 40 }} />
                        </View>

                        {loading ? <Text style={styles.sectionMeta}>Loading...</Text> : null}
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My records</Text>
                            <Text style={styles.sectionMeta}>{`${uiLogs.length} Total`}</Text>
                        </View>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(screens)/addGrowthLog')}
                activeOpacity={0.8}
            >
                <Icon name="plus" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default GrowthLogScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },
    pageHeader: {
        paddingVertical: 16,
        gap: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerIconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0F172A',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.light.success,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    sectionMeta: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        letterSpacing: 0.6,
    },
    errorText: {
        fontSize: 14,
        color: '#dc2626',
    },
    logCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 18,
        marginBottom: 50,
        shadowColor: '#0F172A',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        marginRight: 12,
    },
    iconBadge: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    titleTextWrap: {
        flex: 1,
    },
    logTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 6,
    },
    logMetaLabel: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.6,
        color: '#9CA3AF',
        textTransform: 'uppercase',
    },
    logMetaValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
        marginTop: 4,
    },
    metaRow: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    metaBlock: {
        marginRight: 20,
    },
    metaLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    metaValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
    },
    noteLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    noteText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        marginRight: 12,
    },
    iconBadge: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    titleTextWrap: {
        flex: 1,
    },
    logTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 6,
    },
    logMetaLabel: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.6,
        color: '#9CA3AF',
        textTransform: 'uppercase',
    },
    logMetaValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
        marginTop: 4,
    },
    metaRow: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    metaBlock: {
        marginRight: 20,
    },
    metaLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    metaValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
    },
    noteLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    noteText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
});