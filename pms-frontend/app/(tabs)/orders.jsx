import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ordersData = [
    {
        id: '1',
        name: 'Shoula',
        breedType: 'Boilers',
        basis:'Per kg',
        quantity: '25kg',
        price: '50000 FRW',
        icon: 'cart',
        color: Colors.light.success,
    },
    {
        id: '2',
        name: 'Delight',
        breedType: 'Layers',
        basis:'Per kg',
        quantity: '20kg',
        price: '40000 FRW',
        icon: 'cart',
        color: Colors.light.success,
    },
    {
        id: '3',
        name: 'Pasca',
        breedType: 'Kuroilers',
        basis:'Per chicken',
        quantity: '15 chicken',
        price: '30000 FRW',
        icon: 'cart',
        color: Colors.light.success,
    },
];

const Orders = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <UserNavbar />

                <Text style={styles.pageTitle}>Orders</Text>

                {/* Featured / Highlighted breed */}
                <View style={styles.featuredCard}>
                    <Text style={styles.featuredTitle}>Your orders</Text>
                </View>

                <View style={styles.statsContainer}>
                    {ordersData.map((order) => (
                        <View key={order.id} style={styles.statItem}>
                            <MaterialCommunityIcons name={order.icon} size={24} color={order.color} />
                            <Text style={styles.breedName}>{order.name}</Text>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Breed Type: </Text>
                                <Text style={styles.detailValue}>{order.breedType}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Basis: </Text>
                                <Text style={styles.detailValue}>{order.basis}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Quantity: </Text>
                                <Text style={styles.detailValue}>{order.quantity}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Price: </Text>
                                <Text style={styles.detailValue}>{order.price}</Text>
                            </View>
                        </View>
                    ))}
                </View> 

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 30,
                        backgroundColor: Colors.light.topBackground,
                        padding: 12,
                        borderRadius: 10,
                        marginHorizontal: 20,
                    }}
                    onPress={() => {
                        // Add your logic here (e.g., navigate to add breed screen)
                        console.log('Add orderr tapped');
                    }}
                >
                    <Text style={{ color: Colors.light.success, fontWeight: 'bold', marginRight: 8, fontSize:18 }}>
                        Add order
                    </Text>
                    <MaterialCommunityIcons name="cart-plus" size={24} color={Colors.light.success} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    
    breedType: {
        fontSize: 15,
        color: '#555',
        marginBottom: 12,
        textAlign: 'center',
    },
  
    container: {
        flex: 1,
        backgroundColor: Colors.light.background || '#f8f9fa',
    },
    pageTitle: {
        fontFamily: 'Roboto',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        // marginBottom: 10,
        color: Colors.light.text,
    },
    sectionTitle: {
        marginLeft: 20,
        marginTop: 24,
        marginBottom: 12,
        color: Colors.light.text,
        fontWeight: 'bold',
        fontSize: 18,
    },
    featuredCard: {
        margin: 20,
        padding: 20,
        backgroundColor: Colors.light.topBackground || '#ffffff',
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    featuredTitle: {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.success,
    },
    featuredSubtitle: {
        marginTop: 6,
        color: '#666',
        fontSize: 14,
    },
    statsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        gap: 16,
    },
    statItem: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    breedName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        marginTop: 12,
        marginBottom: 4,
    },
    breedType: {
        fontSize: 15,
        color: '#555',
        marginBottom: 12,
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    detailLabel: {
        fontSize: 18,
        color: '#333',
        fontWeight: '700',
    },
    detailValue: {
        fontSize: 18,
        fontWeight: '500',
        color: '#474747',
    },
});