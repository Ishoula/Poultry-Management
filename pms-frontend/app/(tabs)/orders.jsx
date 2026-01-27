import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const ordersData = [
    {
        id: '1',
        name: 'Shoula',
        code: '#SP-2041',
        breedType: 'Broilers',
        basis: 'Per Kilogram',
        quantity: '25kg',
        price: '50,000 FRW',
        status: 'Delivered',
    },
    {
        id: '2',
        name: 'Delight',
        code: '#SP-2042',
        breedType: 'Kuroilers',
        basis: 'Per Chicken',
        quantity: '25 Chicken',
        price: '50,000 FRW',
        status: 'Pending',
    },
];

const Orders = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <UserNavbar />

                <View style={styles.headerSection}>
                    <Text style={styles.pageTitle}>Orders</Text>
                    <Text style={styles.pageSubtitle}>Manage your poultry sales and deliveries</Text>

                    <TouchableOpacity style={styles.primaryCta}>
                        <Ionicons name="add-circle" size={20} color={Colors.light.topBackground} style={styles.ctaIcon} />
                        <Text style={styles.primaryCtaLabel}>Add New Order</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Latest Orders</Text>
                    <TouchableOpacity>
                        <Text style={styles.sectionAction}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardsStack}>
                    {ordersData.map((order) => (
                        <View key={order.id} style={styles.orderCard}>
                            <View style={styles.cardHeader}>
                                <View style={styles.avatar}>
                                    <Ionicons name="cube" size={20} color={Colors.light.success} />
                                </View>
                                <View style={styles.cardTitleBlock}>
                                    <Text style={styles.orderName}>{order.name}</Text>
                                    <Text style={styles.orderCode}>ORDER {order.code}</Text>
                                </View>
                                <View style={[styles.statusPill, order.status === 'Delivered' ? styles.statusDelivered : styles.statusPending]}>
                                    <Text style={[styles.statusLabel, order.status === 'Delivered' ? styles.statusDeliveredLabel : styles.statusPendingLabel]}>
                                        {order.status}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.metaGrid}>
                                <View style={styles.metaColumn}>
                                    <Text style={styles.metaLabel}>Breed Type</Text>
                                    <Text style={styles.metaValue}>{order.breedType}</Text>
                                </View>
                                <View style={styles.metaColumn}>
                                    <Text style={styles.metaLabel}>Basis</Text>
                                    <Text style={styles.metaValue}>{order.basis}</Text>
                                </View>
                            </View>

                            <View style={styles.metaGrid}>
                                <View style={styles.metaColumn}>
                                    <Text style={styles.metaLabel}>Quantity</Text>
                                    <Text style={styles.metaValue}>{order.quantity}</Text>
                                </View>
                                <View style={styles.metaColumn}>
                                    <Text style={styles.metaLabel}>Total Price</Text>
                                    <Text style={styles.metaValue}>{order.price}</Text>
                                </View>
                            </View>

                            {order.status === 'Pending' && (
                                <TouchableOpacity style={styles.secondaryCta}>
                                    <Ionicons name="checkmark-circle" size={20} color={Colors.light.topBackground} style={styles.ctaIcon} />
                                    <Text style={styles.secondaryCtaLabel}>Mark Delivered</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                <Text style={styles.footerNote}>End of recent orders</Text>
            </ScrollView>
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scrollContent: {
        paddingBottom: 48,
    },
    headerSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
        gap: 12,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.light.text,
    },
    pageSubtitle: {
        fontSize: 16,
        color: Colors.light.textMuted,
    },
    primaryCta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 16,
        height: 52,
        gap: 8,
        shadowColor: '#1A472A66',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
    primaryCtaLabel: {
        color: Colors.light.topBackground,
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    ctaIcon: {
        marginRight: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginTop: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    sectionAction: {
        fontSize: 14,
        color: Colors.light.success,
        fontWeight: '600',
    },
    cardsStack: {
        gap: 18,
        paddingHorizontal: 24,
    },
    orderCard: {
        backgroundColor: Colors.light.topBackground,
        borderRadius: 20,
        padding: 18,
        gap: 16,
        shadowColor: '#1A202C0F',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: Colors.light.successSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitleBlock: {
        flex: 1,
        gap: 4,
    },
    orderName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    orderCode: {
        fontSize: 13,
        letterSpacing: 0.4,
        color: Colors.light.textMuted,
    },
    statusPill: {
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    statusDelivered: {
        backgroundColor: Colors.light.successSoft,
    },
    statusDeliveredLabel: {
        color: Colors.light.success,
    },
    statusPending: {
        backgroundColor: Colors.light.pendingSoft,
    },
    statusPendingLabel: {
        color: Colors.light.pending,
    },
    statusLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    metaGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    metaColumn: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
        gap: 6,
    },
    metaLabel: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: Colors.light.textMuted,
        fontWeight: '600',
    },
    metaValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    secondaryCta: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 14,
        height: 48,
        gap: 8,
    },
    secondaryCtaLabel: {
        color: Colors.light.topBackground,
        fontSize: 16,
        fontWeight: '600',
    },
    footerNote: {
        marginTop: 24,
        textAlign: 'center',
        color: Colors.light.textMuted,
        fontSize: 13,
    },
});