import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const growthLogs = [
    {
        id: '1',
        title: 'Death',
        value: '2 birds',
        date: '18 May 2024',
        note: 'Sudden loss due to extreme heat stress in Pen A.',
        icon: 'heart-broken',
        iconColor: '#EF4444',
    },
    {
        id: '2',
        title: 'Diseases',
        value: '12 birds isolated',
        date: '15 May 2024',
        note: 'Respiratory infection detected in Batch 4.',
        icon: 'medication',
        iconColor: '#F59E0B',
    },
    {
        id: '3',
        title: 'Sold',
        value: '50 Kuroilers',
        date: '10 May 2024',
        note: 'Sold to Local Market Vendor at $4.50/kg.',
        icon: 'storefront',
        iconColor: '#3B82F6',
    },
];

const GrowthLogScreen = () => {
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
                data={growthLogs}
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
                        <TouchableOpacity style={styles.addButton}>
                            <View style={styles.addIconBadge}>
                                <Icon name="add" size={18} color={Colors.light.success} />
                            </View>
                            <Text style={styles.addButtonText}>Add a record</Text>
                        </TouchableOpacity>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My records</Text>
                            <Text style={styles.sectionMeta}>{`${growthLogs.length} Total`}</Text>
                        </View>
                    </View>
                }
            />
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
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    addIconBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    addButtonText: {
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
    sectionMeta: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        letterSpacing: 0.6,
    },
    logCard: {
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
        marginBottom: 12,
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