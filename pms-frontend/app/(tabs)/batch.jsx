import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';
import React, { useEffect, useMemo, useState } from 'react';
import { authFetch } from '../../context/AuthContext';

const Batch = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setError('');
                setLoading(true);
                const data = await authFetch('/batchs', { method: 'GET' });
                const list = Array.isArray(data?.batches) ? data.batches : [];
                if (mounted) setBatches(list);
            } catch (e) {
                if (mounted) setError(e?.message || 'Failed to load batches');
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const batchesData = useMemo(() => {
        return batches.map((b, idx) => {
            const arrivalDate = b.start_date ? new Date(b.start_date) : null;
            const arrival = arrivalDate ? arrivalDate.toLocaleDateString() : '-';
            return {
                id: b._id,
                name: `Batch ${idx + 1}`,
                breed: b?.breed?.breedName || 'Unknown',
                total: `${b.total_chickens} chicks`,
                arrival,
                status: (b.status || 'active').toString().toUpperCase(),
                iconColor: '#FBAC4F',
            };
        });
    }, [batches]);

    const renderBatch = ({ item }) => (
        <View style={styles.batchCard}>
            <View style={styles.batchCardHeader}>
                <View style={[styles.iconCircle, { backgroundColor: `${item.iconColor}26` }]}>
                    <Icon name="egg" size={22} color={item.iconColor} />
                </View>
                <View style={styles.batchInfo}>
                    <View style={styles.batchTitleRow}>
                        <View>
                            <Text style={styles.batchName}>{item.name}</Text>
                            <View style={[styles.statusPill, { backgroundColor: `${Colors.light.success}14` }]}>
                                <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Icon name="more-vert" size={22} color={Colors.light.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.batchMetaRow}>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaLabel}>Breed</Text>
                            <Text style={styles.metaValue}>{item.breed}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaLabel}>Total</Text>
                            <Text style={styles.metaValue}>{item.total}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaLabel}>Arrival</Text>
                            <Text style={styles.metaValue}>{item.arrival}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.safeArea}>
            <UserNavbar />
            <FlatList
                data={batchesData}
                renderItem={renderBatch}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.pageHeader}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.headerIconButton}>
                                <Icon name="arrow-back" size={20} color={Colors.light.text} />
                            </TouchableOpacity>
                            <Text style={[styles.title, { position: 'absolute', left: 0, right: 0, textAlign: 'center' }]}>Batches</Text>

                        </View>
                        {loading ? <Text style={styles.subtitle}>Loading...</Text> : null}
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <TouchableOpacity style={styles.registerButton}>
                            <View style={styles.registerIconBadge}>
                                <Icon name="add" size={18} color={Colors.light.success} />
                            </View>
                            <Text style={styles.registerButtonText}>Register a new batch</Text>
                        </TouchableOpacity>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My Breeds</Text>
                            <TouchableOpacity>
                                <Text style={styles.sectionAction}>View Breeds</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        </View>
    );
};

export default Batch;

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
        justifyContent: 'flex-start',      // only care about left side
        position: 'relative',
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text,
        // textAlign: 'center' is not needed anymore when using absolute
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    errorText: {
        fontSize: 14,
        color: '#dc2626',
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

    registerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    registerIconBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
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
    sectionAction: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.success,
    },
    batchCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 18,
        marginBottom: 18,
        shadowColor: '#0F172A',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 4,
    },
    batchCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    batchInfo: {
        flex: 1,
    },
    batchTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    batchName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    statusPill: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.success,
    },
    batchMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metaItem: {
        flex: 1,
    },
    metaLabel: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.6,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    metaValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
    },
});