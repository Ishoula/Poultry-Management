import React, { useEffect, useMemo, useState } from "react";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import UserNavbar from "../../components/UserNavbar";
import { Colors } from "../../constants/colors";
import shoula from '../../assets/images/shoula.jpg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authFetch } from '../../context/AuthContext';

export default function HomeScreen() {
  const [me, setMe] = useState(null);

  const [batches, setBatches] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setError("");
        setLoading(true);

        const [meRes, batchesRes, breedsRes, tasksRes, ordersRes, chatsRes] = await Promise.all([
          authFetch('/auth/me', { method: 'GET' }),
          authFetch('/batchs', { method: 'GET' }),
          authFetch('/breeds', { method: 'GET' }),
          authFetch('/tasks', { method: 'GET' }),
          authFetch('/orders', { method: 'GET' }),
          authFetch('/chats', { method: 'GET' }),
        ]);

        const user = meRes?.user || null;

        const fetchedBatches = Array.isArray(batchesRes?.batches) ? batchesRes.batches : [];
        const fetchedBreeds = Array.isArray(breedsRes?.breeds) ? breedsRes.breeds : [];
        const fetchedTasks = Array.isArray(tasksRes?.tasks) ? tasksRes.tasks : [];
        const fetchedOrders = Array.isArray(ordersRes?.orders) ? ordersRes.orders : [];
        const fetchedChats = Array.isArray(chatsRes?.chats) ? chatsRes.chats : [];

        if (mounted) {
          setMe(user);
          setBatches(fetchedBatches);
          setBreeds(fetchedBreeds);
          setTasks(fetchedTasks);
          setOrders(fetchedOrders);
          setChats(fetchedChats);
        }

        // Load recent logs for first batch (if any)
        if (fetchedBatches[0]?._id) {
          const logsRes = await authFetch(`/batchs/${fetchedBatches[0]._id}/logs?limit=2&page=1`, { method: 'GET' });
          const logs = Array.isArray(logsRes?.logs) ? logsRes.logs : [];
          if (mounted) setRecentLogs(logs);
        } else {
          if (mounted) setRecentLogs([]);
        }
      } catch (e) {
        if (mounted) setError(e?.message || 'Failed to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const firstName = me?.username || me?.email || 'User';

  const batchCount = batches.length;
  const ordersCount = orders.length;
  const deadCount = useMemo(() => {
    return batches.reduce((sum, b) => {
      const total = Number(b?.total_chickens || 0);
      const current = Number(b?.current_chickens || 0);
      return sum + Math.max(0, total - current);
    }, 0);
  }, [batches]);

  const previewBatch = batches[0];
  const previewBreeds = breeds.slice(0, 3);

  return (
    <View style={styles.screen}>
      {/* Fixed top navigation bar */}
      <UserNavbar />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome back, {firstName}!</Text>
          <Text style={styles.welcomeSubtitle}>
            Your farm is running smoothly. Here's a quick overview.
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons
              name="egg"
              size={32}
              color={Colors.light.pending}
            />
            <Text style={styles.statNumber}>{batchCount}</Text>
            <Text style={styles.statLabel}>Batches</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="skull"
              size={32}
              color={Colors.light.danger || "#fa897d"}
            />
            <Text style={styles.statNumber}>{deadCount}</Text>
            <Text style={styles.statLabel}>Dead</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="store-front"
              size={32}
              color={Colors.light.success}
            />
            <Text style={styles.statNumber}>{ordersCount}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
        </View>

        {loading ? <Text style={styles.infoText}>Loading...</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* My Tasks */}

        <View>
          <Text style={styles.batchText}>My Tasks</Text>
        </View>
        {tasks.length === 0 ? (
          <View style={styles.sectionCard}>
            <Text style={styles.infoText}>No tasks yet.</Text>
          </View>
        ) : (
          tasks.slice(0, 2).map((t) => (
            <View key={t._id} style={styles.sectionCard}>
              <View style={styles.iconContainer}>
                <Text>
                  <Ionicons name="pricetag-outline" size={20} color={Colors.light.icon} />
                </Text>
                <View>
                  <Text style={styles.batchText}>{t.title}</Text>
                  <Text>
                    {t.category} {t.time}
                  </Text>
                </View>
                <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
                  <Text style={[styles.buttonText, { color: Colors.light.success }, { fontWeight: 'medium' }]}>
                    {t.priority}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Growth Log */}
        <View>
          <Text style={styles.batchText}>Growth Log</Text>
        </View>
        {recentLogs.length === 0 ? (
          <View style={styles.sectionCard}>
            <Text style={styles.infoText}>No logs yet.</Text>
          </View>
        ) : (
          recentLogs.map((log) => {
            const dateLabel = log?.date ? new Date(log.date).toLocaleDateString() : '';
            const valueLabel = `${log?.type || 'log'}: ${log?.value ?? ''}${log?.unit || ''}`;
            return (
              <View key={log._id} style={styles.sectionCard}>
                <View style={styles.iconContainer}>
                  <Text>
                    <Icon name='egg' size={20} color={Colors.light.pending} />
                  </Text>
                  <View>
                    <Text style={styles.batchText}>{previewBatch ? 'Batch' : 'Growth log'}</Text>
                    <Text>{valueLabel}</Text>
                  </View>

                  <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
                    <Text style={[styles.buttonText, { color: Colors.light.text }, { fontWeight: 'medium' }]}>
                      {dateLabel}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Latest Orders */}
        <View>
          <Text style={styles.batchText}>Latest Orders</Text>
        </View>
        {orders.length === 0 ? (
          <View style={styles.sectionCard}>
            <Text style={styles.infoText}>No orders yet.</Text>
          </View>
        ) : (
          orders.slice(0, 2).map((o) => (
            <View key={o._id} style={styles.sectionCard}>
              <View style={styles.iconContainer}>
                <Text>
                  <Ionicons name='cart' size={24} color={Colors.light.success} />
                </Text>
                <View>
                  <Text style={styles.batchText}>{o.name}</Text>
                  <Text>
                    {o.quantity} - {o.breedType}
                  </Text>
                </View>

                <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
                  <Text style={[styles.buttonText, { color: o.status === 'Delivered' ? Colors.light.success : Colors.light.pending }, { fontWeight: 'medium' }]}>
                    {o.status}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Batches */}
        <View>
          <Text style={styles.batchText}>Batches</Text>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Text>
              <Ionicons name='egg' size={24} color={Colors.light.pending} />
            </Text>
            <View>
              <Text style={styles.batchText}>{previewBatch ? 'Latest Batch' : 'No batches'}</Text>
              {previewBatch ? (
                <Text>
                  {previewBatch.current_chickens}/{previewBatch.total_chickens} chickens
                </Text>
              ) : null}
            </View>

            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              {(previewBatch?.status || 'active').toString().toLowerCase() === 'active' ? (
                <Text style={[styles.buttonText, { color: Colors.light.success, fontWeight: 'medium', backgroundColor: Colors.light.lightSuccess, padding: 10, borderRadius: 6 }]}>
                  {(previewBatch?.status || 'active').toString().toUpperCase()}
                </Text>) : (
                <Text style={[styles.buttonText, { color: Colors.light.pending }, { fontWeight: 'medium' }]}>
                  {(previewBatch?.status || 'inactive').toString().toUpperCase()}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Breeds*/}
        <View style={styles.statsContainer}>
          {previewBreeds.map((b, idx) => (
            <View key={b._id} style={styles.statItem}>
              <Ionicons
                name="logo-twitter"
                size={32}
                color={idx === 0 ? Colors.light.success : idx === 1 ? Colors.light.pending : Colors.light.cart}
              />
              <Text style={styles.batchText}>{b.breedName}</Text>
              <Text style={styles.statLabel}>{b.description || '-'}</Text>
            </View>
          ))}
        </View>

        {/* Chat */}
        <View>
          <Text style={styles.batchText}>Chat</Text>
        </View>
        {chats.length === 0 ? (
          <View style={styles.sectionCard}>
            <Text style={styles.infoText}>No messages yet.</Text>
          </View>
        ) : (
          <View style={styles.sectionCard}>
            <View style={styles.iconContainer}>
              <Image source={shoula} style={{width:60, height:60, borderRadius:50}} />
              <View>
                <Text style={styles.batchText}>{chats[0].name}</Text>
                <Text>
                  {chats[0].lastMessage || ''}
                </Text>
              </View>

              <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
                <Text style={[styles.buttonText, { color: Colors.light.success }, { fontWeight: 'light' }]}>
                  {chats[0].time || ''}
                </Text>
              </View>
            </View>
          </View>
        )}


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  welcomeCard: {
    marginTop: 16,
    padding: 24,
    backgroundColor: "#e8f5e9",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a472a",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    paddingVertical: 16,

    elevation: 4,
    gap: 20,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    // color: "#1a472a",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  sectionCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  batchText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: Colors.light.text,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.light.topBackground,
  },
  buttonContainer: {
    backgroundColor: Colors.light.success,
    padding: 10,
    borderRadius: 8,
    marginLeft: "auto",
  },
});
