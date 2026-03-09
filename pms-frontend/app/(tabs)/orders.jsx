import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const ordersData = [
    { id: '1', name: 'Shoula', breedType: 'Broilers', basis: 'Per kg', quantity: '25kg', price: '50,000 FRW' },
    { id: '2', name: 'Delight', breedType: 'Layers', basis: 'Per kg', quantity: '20kg', price: '40,000 FRW' },
    { id: '3', name: 'Pasca', breedType: 'Kuroilers', basis: 'Per chicken', quantity: '15 chickens', price: '30,000 FRW' },
];

const Orders = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <UserNavbar />
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <Text style={styles.pageTitle}>Order History</Text>
                    <Text style={styles.pageSubtitle}>Track your sales and customer distributions.</Text>
                </View>

                <View style={styles.statsContainer}>
                    {ordersData.map((order) => (
                        <TouchableOpacity key={order.id} activeOpacity={0.7} style={styles.orderCard}>
                            <View style={styles.cardHeader}>
                                <View style={styles.iconBox}>
                                    <MaterialCommunityIcons name="package-variant-closed" size={22} color={Colors.light.success} />
                                </View>
                                <View style={styles.priceBadge}>
                                    <Text style={styles.priceText}>{order.price}</Text>
                                </View>
                            </View>

                            <Text style={styles.customerName}>{order.name}</Text>
                            
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>BREED</Text>
                                    <Text style={styles.detailValue}>{order.breedType}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>QUANTITY</Text>
                                    <Text style={styles.detailValue}>{order.quantity}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>BASIS</Text>
                                    <Text style={styles.detailValue}>{order.basis}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Floating Action Button - Positioned above Tabs */}
            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => router.push('/addOrder')}
            >
                <MaterialCommunityIcons name="cart-plus" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 120, // Space for FAB and Tabs
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        marginBottom: 20,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },
    statsContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F0FDF4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    priceText: {
        color: '#1E293B',
        fontWeight: '700',
        fontSize: 13,
    },
    customerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 12,
    },
    detailsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 12,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    fab: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 110 : 90,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: Colors.light.success,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: Colors.light.success,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        zIndex: 999,
    },
});