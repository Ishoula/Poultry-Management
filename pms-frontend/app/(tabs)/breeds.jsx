import React, { useEffect, useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../constants/colors';
import UserNavbar from '../../components/UserNavbar';
import { authFetch } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

const BreedsScreen = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const fetchBreeds = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await authFetch('/breeds', { method: 'GET' });
        const list = Array.isArray(data?.breeds) ? data.breeds : [];
        if (mounted) setBreeds(list);
      } catch (e) {
        if (mounted) setError(e?.message || 'Failed to load breeds');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchBreeds();
    return () => { mounted = false; };
  }, []);

  const breedsData = useMemo(() => {
    const palette = ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#F44336'];
    const icons = ['duck', 'bird', 'egg-outline', 'clover', 'leaf'];
    return breeds.map((b, idx) => ({
      id: b._id,
      name: b.breedName,
      description: b.description || 'No description provided.',
      growthPeriod: b.growthPeriod,
      avgWeight: b.averageWeight,
      iconColor: palette[idx % palette.length],
      iconName: icons[idx % icons.length],
    }));
  }, [breeds]);

  const renderBreed = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.breedCard}>
      <div style={{ display: 'none' }}></div>
      <View style={styles.cardTopSection}>
        <View style={[styles.iconCircle, { backgroundColor: `${item.iconColor}15` }]}>
          <Icon name={item.iconName} size={28} color={item.iconColor} />
        </View>
        <View style={styles.breedHeader}>
          <Text style={styles.breedName}>{item.name}</Text>
          <Text style={styles.breedDescription} numberOfLines={1}>{item.description}</Text>
        </View>
        <TouchableOpacity hitSlop={10}>
          <Icon name="dots-vertical" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Icon name="calendar-clock" size={16} color="#6B7280" />
          <Text style={styles.statLabel}>Growth:</Text>
          <Text style={styles.statValue}>{item.growthPeriod} Days</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="weight-kilogram" size={16} color="#6B7280" />
          <Text style={styles.statLabel}>Weight:</Text>
          <Text style={styles.statValue}>{item.avgWeight}kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <UserNavbar />
      
      <FlatList
        data={breedsData}
        renderItem={renderBreed}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Poultry Breeds</Text>
            <Text style={styles.subtitle}>Track and manage your specific bird varieties.</Text>
            
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Inventory</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{breedsData.length} SPECIES</Text>
              </View>
            </View>
            
            {loading && <ActivityIndicator color={Colors.light.success} style={{marginTop: 20}} />}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        }
      />

      {/* Floating Plus Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/(screens)/addBreed')}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 120 // Extra padding so the FAB doesn't cover the last card
  },
  pageHeader: { 
    paddingTop: 20, 
    marginBottom: 10 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1E293B' 
  },
  subtitle: { 
    fontSize: 15, 
    color: '#64748B', 
    marginTop: 4, 
    marginBottom: 24 
  },
  
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#334155' 
  },
  badge: { 
    backgroundColor: '#E2E8F0', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  badgeText: { 
    fontSize: 10, 
    fontWeight: '800', 
    color: '#475569' 
  },

  breedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopSection: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  breedHeader: { 
    flex: 1 
  },
  breedName: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#1E293B' 
  },
  breedDescription: { 
    fontSize: 13, 
    color: '#94A3B8', 
    marginTop: 2 
  },
  
  divider: { 
    height: 1, 
    backgroundColor: '#F1F5F9', 
    marginVertical: 14 
  },
  
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  statItem: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  statLabel: { 
    fontSize: 13, 
    color: '#64748B', 
    marginLeft: 6, 
    marginRight: 4 
  },
  statValue: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#334155' 
  },
  errorText: { 
    color: '#EF4444', 
    textAlign: 'center', 
    marginTop: 10 
  },

  // Floating Action Button
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
    marginBottom:40
    
  }
});

export default BreedsScreen;