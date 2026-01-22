import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const breedsData = [
    {
        id: '1',
        name: 'Broilers',
        value: 'Rapid growth for meat',
        date:'18 May 2024',
        icon: 'invoice-list',
        color: Colors.light.success,
    },
    {
        id: '2',
        name: 'Layers',
        value: 'Egg laying',
        date:'18 June 2024',
        avgMarketWeight: '1.8-2.5 kg',
        icon: 'invoice-list',
        color: Colors.light.success,
    },
    {
        id: '3',
        name: 'Kuroilers',
        value: 'Dual-purpose',
        date:'18 July 2024',
        avgMarketWeight: '3-3.5 kg',
        icon: 'invoice-list',
        color: Colors.light.success,
    },
];

const Breeds = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <UserNavbar />

                <Text style={styles.pageTitle}>Growth log</Text>

                {/* Featured / Highlighted breed */}
                <View style={styles.featuredCard}>
                    <Text style={styles.featuredTitle}>Your records</Text>
                </View>

                <View style={styles.statsContainer}>
                    {breedsData.map((breed) => (
                        <View key={breed.id} style={styles.statItem}>
                            <MaterialCommunityIcons name={breed.icon} size={36} color={breed.color} />
                            
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Event: </Text>
                                <Text style={styles.detailValue}>{breed.name}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Value: </Text>
                                <Text style={styles.detailValue}>{breed.value}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Date: </Text>
                                <Text style={styles.detailValue}>{breed.date}</Text>
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
                        console.log('Add breed tapped');
                    }}
                >
                    <Text style={{ color: Colors.light.success, fontWeight: 'bold', marginRight: 8 }}>
                        Add record
                    </Text>
                    <MaterialCommunityIcons name="plus" size={24} color={Colors.light.success} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Breeds;

// Styles remain mostly the same; add this if you want to use breedvalue later
const styles = StyleSheet.create({
    // ... your existing styles ...
    breedvalue: {
        fontSize: 15,
        color: '#555',
        marginBottom: 12,
        textAlign: 'center',
    },
    // Optional: for future image additions
    breedImage: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginBottom: 12,
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
        gap: 16, // React Native 0.71+ supports gap
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
    breedDescription: {
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
        fontSize: 14,
        color: '#333',
        fontWeight: '700',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#474747',
    },
});