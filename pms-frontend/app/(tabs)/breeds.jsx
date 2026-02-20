import React, { useEffect, useMemo, useState } from 'react';
import {  View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/colors';
import UserNavbar from '../../components/UserNavbar'
import { authFetch } from '../../context/AuthContext';

const BreedsScreen = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
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
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const breedsData = useMemo(() => {
    const palette = ['#2E7D32', '#FB8C00', '#1E88E5', '#8E24AA', '#F4511E'];
    const icons = ['eco', 'emoji-nature', 'grass', 'pets', 'spa'];
    return breeds.map((b, idx) => ({
      id: b._id,
      name: b.breedName,
      subtitle: '',
      description: b.description || '-',
      growthPeriod: `${b.growthPeriod} Days`,
      avgWeight: `${b.averageWeight}kg`,
      iconColor: palette[idx % palette.length],
      iconName: icons[idx % icons.length],
    }));
  }, [breeds]);

  const renderBreed = ({ item }) => (
    <View style={styles.breedCard}>
      <View style={[styles.iconCircle, { backgroundColor: item.iconColor }]}>
        <Icon name={item.iconName} size={26} color="#ffffff" />
      </View>

      <View style={styles.breedInfo}>
        <View style={styles.breedHeader}>
          <View style={styles.breedTitleGroup}>
            <Text style={styles.breedName}>{item.name}</Text>
            <View style={[styles.breedSubtitlePill, { backgroundColor: `${item.iconColor}1A` }]} > 
              <Text style={[styles.breedSubtitle, { color: item.iconColor }]}>{item.subtitle}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="more-vert" size={22} color={Colors.light.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelWrap}>
            <Icon name="fiber-manual-record" size={10} color={Colors.light.icon} style={styles.detailBullet} />
            <Text style={styles.detailLabel}>Description</Text>
          </View>
          <Text style={styles.detailValue}>{item.description}</Text>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelWrap}>
            <Icon name="event" size={14} color={Colors.light.icon} style={styles.detailBullet} />
            <Text style={styles.detailLabel}>Growth Period</Text>
          </View>
          <Text style={styles.detailValue}>{item.growthPeriod}</Text>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelWrap}>
            <Icon name="scale" size={14} color={Colors.light.icon} style={styles.detailBullet} />
            <Text style={styles.detailLabel}>Avg. Weight</Text>
          </View>
          <Text style={styles.detailValue}>{item.avgWeight}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
        <UserNavbar/>
      <FlatList
        data={breedsData}
        renderItem={renderBreed}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Breeds</Text>
            <Text style={styles.subtitle}>Manage your poultry variety and metrics.</Text>
            {loading ? <Text style={styles.subtitle}>Loading...</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.registerButton}>
              <View style={styles.registerIconBadge}>
                <Icon name="add" size={18} color={Colors.light.success} />
              </View>
              <Text style={styles.registerButtonText}>Register a breed</Text>
            </TouchableOpacity>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Breeds</Text>
              <Text style={styles.sectionMeta}>{`${breedsData.length} Total`.toUpperCase()}</Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

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
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    marginBottom: 12,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.success,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 24,
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  sectionMeta: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#9CA3AF',
  },
  breedCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    alignItems: 'flex-start',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  breedInfo: {
    flex: 1,
  },
  breedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  breedTitleGroup: {
    flex: 1,
  },
  breedName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  breedSubtitlePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
  },
  breedSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailBullet: {
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
});

export default BreedsScreen;