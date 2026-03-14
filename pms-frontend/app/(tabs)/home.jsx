import React, { useEffect, useMemo, useState } from "react";
import { Entypo, FontAwesome5, Ionicons ,MaterialIcons} from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import UserNavbar from "../../components/UserNavbar";
import { Colors } from "../../constants/colors";
import { authFetch } from '../../context/AuthContext';
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [batches, setBatches] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError("");
        setLoading(true);
        const [meRes, batchesRes, breedsRes] = await Promise.all([
          authFetch('/auth/me', { method: 'GET' }),
          authFetch('/batchs', { method: 'GET' }),
          authFetch('/breeds', { method: 'GET' }),
        ]);

        const user = meRes?.user || null;
        const fetchedBatches = Array.isArray(batchesRes?.batches) ? batchesRes.batches : [];
        const fetchedBreeds = Array.isArray(breedsRes?.breeds) ? breedsRes.breeds : [];

        if (mounted) {
          setMe(user);
          setBatches(fetchedBatches);
          setBreeds(fetchedBreeds);
        }

        if (fetchedBatches[0]?._id) {
          const logsRes = await authFetch(`/batchs/${fetchedBatches[0]._id}/logs?limit=2&page=1`, { method: 'GET' });
          if (mounted) setRecentLogs(Array.isArray(logsRes?.logs) ? logsRes.logs : []);
        }
      } catch (e) {
        if (mounted) setError(e?.message || 'Failed to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const firstName = me?.username?.split(' ')[0] || 'Farmer';
  const batchCount = batches.length;
  
  const deadCount = useMemo(() => {
    return batches.reduce((sum, b) => sum + Math.max(0, (b?.total_chickens || 0) - (b?.current_chickens || 0)), 0);
  }, [batches]);

  const previewBatch = batches[0];

  // Helper for Section Headers
  const SectionHeader = ({ title, onClear }) => (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable onPress={onClear}>
        <Text style={styles.viewAllText}>View All</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.screen}>
      <UserNavbar />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Hello, {firstName} 👋</Text>
          <Text style={styles.dateText}>Here's what's happening today</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { borderLeftColor: Colors.light.pending, borderLeftWidth: 4 }]}>
            <Ionicons name="egg-outline" size={24} color={Colors.light.pending} />
            <Text style={styles.statVal}>{batchCount}</Text>
            <Text style={styles.statLabel}>Active Batches</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#EF4444', borderLeftWidth: 4 }]}>
            <Ionicons name="skull-outline" size={24} color="#EF4444" />
            <Text style={styles.statVal}>{deadCount}</Text>
            <Text style={styles.statLabel}>Total Mortality</Text>
          </View>
        </View>

        {loading && <ActivityIndicator color={Colors.light.success} style={{ marginTop: 20 }} />}
        
        {/* Latest Batch Card */}
        <SectionHeader title="Active Batch" onClear={() => router.push('/batch')} />
        <Pressable style={styles.mainCard}>
          {previewBatch ? (
            <View style={styles.cardInner}>
              <View style={styles.iconCircle}>
                <FontAwesome5 name="kiwi-bird" size={20} color={Colors.light.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{previewBatch.name || 'Batch Overview'}</Text>
                <Text style={styles.cardSubtitle}>
                  {previewBatch.current_chickens} / {previewBatch.total_chickens} Chickens Alive
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>ACTIVE</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.emptyText}>No active batches found.</Text>
          )}
        </Pressable>

        {/* Recent Growth Logs */}
        <SectionHeader title="Recent Growth Logs" onClear={() => router.push('/growthLog')} />
        <View style={styles.logsContainer}>
          {recentLogs.length === 0 ? (
            <View style={styles.emptyCard}><Text style={styles.emptyText}>No recent activity</Text></View>
          ) : (
            recentLogs.map((log) => (
              <View key={log._id} style={styles.logItem}>
                <View style={styles.logIndicator} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.logType}>{log.type?.toUpperCase()}</Text>
                  <Text style={styles.logValue}>{log.value} {log.unit}</Text>
                </View>
                <Text style={styles.logDate}>{new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
              </View>
            ))
          )}
        </View>

        {/* Quick Actions / Breeds */}
        <SectionHeader title="Available Breeds" onClear={() => router.push('/breeds')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.breedScroll}>
          {breeds.map((breed) => (
            <View key={breed._id} style={styles.breedCard}>
              <View style={styles.breedIconBox}>
                <MaterialIcons name="pets" size={24} color={Colors.light.success} />
              </View>
              <Text style={styles.breedName}>{breed.breedName}</Text>
            </View>
          ))}
        </ScrollView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  headerContainer: { marginBottom: 24, marginTop: 10 },
  welcomeText: { fontSize: 24, fontWeight: "800", color: "#111827" },
  dateText: { fontSize: 14, color: "#6B7280", marginTop: 4 },

  statsGrid: { flexDirection: "row", gap: 15, marginBottom: 28 },
  statCard: { 
    flex: 1, 
    backgroundColor: "white", 
    padding: 16, 
    borderRadius: 16, 
    elevation: 2, 
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10 
  },
  statVal: { fontSize: 22, fontWeight: "bold", color: "#111827", marginVertical: 4 },
  statLabel: { fontSize: 12, color: "#6B7280", fontWeight: "600" },

  sectionHeaderRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 12,
    marginTop: 8
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  viewAllText: { fontSize: 14, color: Colors.light.success, fontWeight: "600" },

  mainCard: { 
    backgroundColor: "white", 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F3F4F6"
  },
  cardInner: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F0FDF4", alignItems: "center", justifyContent: "center" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardSubtitle: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  statusBadge: { backgroundColor: "#DCFCE7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: "#166534", fontSize: 10, fontWeight: "800" },

  logsContainer: { backgroundColor: "white", borderRadius: 16, overflow: "hidden", marginBottom: 24 },
  logItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: "#F3F4F6" 
  },
  logIndicator: { width: 4, height: 24, borderRadius: 2, backgroundColor: Colors.light.pending, marginRight: 12 },
  logType: { fontSize: 10, fontWeight: "800", color: "#9CA3AF" },
  logValue: { fontSize: 15, fontWeight: "600", color: "#374151" },
  logDate: { fontSize: 12, color: "#9CA3AF" },

  breedScroll: { flexDirection: "row", marginBottom: 20 },
  breedCard: { 
    backgroundColor: "white", 
    width: 120, 
    padding: 16, 
    borderRadius: 16, 
    marginRight: 12, 
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6"
  },
  breedIconBox: { marginBottom: 10, opacity: 0.8 },
  breedName: { fontSize: 13, fontWeight: "600", textAlign: "center", color: "#374151" },
  
  emptyCard: { padding: 20, alignItems: "center" },
  emptyText: { color: "#9CA3AF", fontSize: 14, fontStyle: "italic" }
});