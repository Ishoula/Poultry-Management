import { useUser } from "@clerk/clerk-expo";
import { Entypo, FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View,Image } from "react-native";
import UserNavbar from "../../components/UserNavbar";
import { Colors } from "../../constants/colors";
import shoula from '../../assets/images/shoula.jpg';
export default function HomeScreen() {
  const { user } = useUser();

  const firstName = user?.firstName || user?.username?.split(" ")[0] || "User";

  const tasks = {
    feeding: {
      name: "Morning Feeding",
      time: "8:00 AM",
      batch: "Batch-2",
      status: "pending",
    },
    clean: {
      name: "Clean Water Tanks",
      time: "10:00 AM",
      batch: "Batch-1",
      status: "pending",
    },
  };

  const growthLog = {
    Batch4: {
      name: 'Batch-4',
      avgWeight: '1.2 kg',
      time: 'Day 20',
    },
    Batch1: {
      name: 'Batch-1',
      avgWeight: '1.5kg',
      time: 'Day 50',
    }
  }

  const orders = {
    first: {
      name: 'Order - 1212',
      quantity: '12 kg Boilers',
      date: '18-05',
      status: 'Delivered',
    },
    second: {
      name: 'Order - 1213',
      quantity: '8 kg Layers',
      date: '20-05',
      status: 'Pending',
    }
  }

  const batches = {
    name: 'Batch-3',
    age: '30 days',
    quantity: '150 chicks',
    status: 'Active'
  }

  const breeds={
    first:{
      name:'Broilers',
      characteristics:'Rapid growth',
    },
    second:{
      name:'Layers',
      characteristics:'Egg laying',
    },
    third:{
      name:'Kuroilers',
      characteristics:'Dual purpose',
    }
  }

  const chat={
    name:'Shoula',
    message:'How are the new chicks adapting',
    time:'2m ago',
  }
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
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Batches</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="skull"
              size={32}
              color={Colors.light.danger || "#fa897d"}
            />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Dead</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="cart"
              size={32}
              color={Colors.light.cart}
            />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
        </View>

        {/* My Tasks */}

        <View>
          <Text style={styles.batchText}>My Tasks</Text>
        </View>

        <View style={styles.sectionCard}>


          <View style={styles.iconContainer}>
            <Text>
              <FontAwesome5
                name="syringe"
                size={20}
                color={Colors.light.pending}
              />
            </Text>
            <View>
              <Text style={styles.batchText}>Vaccine Batch 4</Text>
              <Text>Today 3:00 PM</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Mark Done</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Text>
              <Ionicons
                name="restaurant"
                size={20}
                color={Colors.light.success}
              />
            </Text>
            <View>
              <Text style={styles.batchText}>{tasks.feeding.name}</Text>
              <Text>
                {tasks.feeding.batch} {tasks.feeding.time}
              </Text>
            </View>
            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              <Text style={styles.buttonText}>
                {tasks.feeding.status === "pending" ? (
                  <MaterialIcons
                    name="radio-button-unchecked"
                    size={20}
                    color={Colors.light.icon}
                  />
                ) : (
                  <MaterialIcons
                    name="radio-button-checked"
                    size={20}
                    color={Colors.light.suc}
                  />
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Text>
              <Entypo
                name="water"
                size={20}
                color={Colors.light.cart}
              />
            </Text>
            <View>
              <Text style={styles.batchText}>{tasks.clean.name}</Text>
              <Text>
                {tasks.clean.batch} {tasks.clean.time}
              </Text>
            </View>
            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              <Text style={styles.buttonText}>
                {tasks.clean.status === "pending" ? (
                  <MaterialIcons
                    name="radio-button-unchecked"
                    size={20}
                    color={Colors.light.icon}
                  />
                ) : (
                  <MaterialIcons
                    name="radio-button-checked"
                    size={20}
                    color={Colors.light.success}
                  />
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Growth Log */}
        <View>
          <Text style={styles.batchText}>Growth Log</Text>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Text>
              <FontAwesome name='line-chart' size={20} color={Colors.light.success} />
            </Text>
            <View>
              <Text style={styles.batchText}>{growthLog.Batch1.name}</Text>
              <Text>
                {growthLog.Batch1.avgWeight}
              </Text>
            </View>

            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              <Text style={[styles.buttonText, { color: Colors.light.text }, { fontWeight: 'medium' }]}>
                {growthLog.Batch1.time}
              </Text>
            </View>

          </View>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Text>
              <FontAwesome
                name="line-chart"
                size={20}
                color={Colors.light.success}
              />
            </Text>
            <View>
              <Text style={styles.batchText}>{growthLog.Batch4.name}</Text>
              <Text>
                {growthLog.Batch4.avgWeight}
              </Text>
            </View>

            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              <Text style={[styles.buttonText, { color: Colors.light.text }, { fontWeight: 'medium' }]}>
                {growthLog.Batch4.time}
              </Text>
            </View>
          </View>
        </View>

        {/* Latest Orders */}
        <View>
          <Text style={styles.batchText}>Latest Orders</Text>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Text>
              <Ionicons name='cart' size={24} color={Colors.light.cart} />
            </Text>
            <View>
              <Text style={styles.batchText}>{orders.first.name}</Text>
              <Text>
                {orders.first.quantity} -{orders.first.date}
              </Text>
            </View>

            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              {orders.first.status === 'Delivered' ? (
                <Text style={[styles.buttonText, { color: Colors.light.success }, { fontWeight: 'medium' }]}>
                  {orders.first.status}
                </Text>) : (
                <Text style={[styles.buttonText, { color: Colors.light.pending }, { fontWeight: 'medium' }]}>
                  {orders.first.status}
                </Text>
              )}
            </View>

          </View>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Text>
              <Ionicons name='cart' size={24} color={Colors.light.cart} />
            </Text>
            <View>
              <Text style={styles.batchText}>{orders.second.name}</Text>
              <Text>
                {orders.second.quantity} -{orders.second.date}
              </Text>
            </View>

            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              {orders.second.status === 'Delivered' ? (
                <Text style={[styles.buttonText, { color: Colors.light.success }, { fontWeight: 'medium' }]}>
                  {orders.second.status}
                </Text>) : (
                <Text style={[styles.buttonText, { color: Colors.light.pending }, { fontWeight: 'medium' }]}>
                  {orders.second.status}
                </Text>
              )}
            </View>

          </View>
        </View>

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
              <Text style={styles.batchText}>{batches.name}</Text>
              <Text>
                {batches.quantity} -{batches.age}
              </Text>
            </View>

            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              {batches.status === 'Active' ? (
                <Text style={[styles.buttonText, { color: Colors.light.success, fontWeight: 'medium', backgroundColor: Colors.light.lightSuccess, padding: 10, borderRadius: 6 }]}>
                  {batches.status}
                </Text>) : (
                <Text style={[styles.buttonText, { color: Colors.light.pending }, { fontWeight: 'medium' }]}>
                  {batches.status}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Breeds*/}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons
              name="logo-twitter"
              size={32}
              color={Colors.light.success}
            />
            <Text style={styles.batchText}>{breeds.first.name}</Text>
            <Text style={{fontSize:16,}}>{breeds.first.characteristics}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="logo-twitter"
              size={32}
              color={Colors.light.pending}
            />
            <Text style={styles.statNumber}>{breeds.second.name}</Text>
            <Text style={styles.statLabel}>{breeds.second.characteristics}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="logo-twitter"
              size={32}
              color={Colors.light.cart}
            />
            <Text style={styles.statNumber}>{breeds.third.name}</Text>
            <Text style={styles.statLabel}>{breeds.third.characteristics}</Text>
          </View>
        </View>

        {/* Chat */}
        <View>
          <Text style={styles.batchText}>Chat</Text>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.iconContainer}>
            <Image source={shoula} style={{width:60, height:60, borderRadius:50}} />
            <View>
              <Text style={styles.batchText}>{chat.name}</Text>
              <Text>
                {chat.message}
              </Text>
            </View>

            <View style={[styles.buttonContainer, { backgroundColor: 'none' }]}>
              <Text style={[styles.buttonText, { color: Colors.light.success }, { fontWeight: 'light' }]}>
                {chat.time}
              </Text>
            </View>
          </View>
        </View>


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
