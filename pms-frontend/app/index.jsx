import { View, Text, StyleSheet ,Pressable} from 'react-native'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Colors } from '../constants/colors'
import logo from '../assets/images/logo.png'
import Navbar from '../components/Navbar'


const index = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Navbar/>
      {/* Image div */}
      <View style={styles.imageDiv}>
        <Image source={logo} style={styles.image} />
      </View>

      {/* Content */}

      <View style={styles.mainContent}>
        <View style={styles.content}>
          <Text style={[styles.contentText, { fontWeight: 'bold', textAlign: 'center' }]}>Smart Poultry</Text>
          <Text style={[styles.contentText, { fontSize: 16 }]}>Manage Your Poultry Farm with ease</Text>
        </View>
        {/* Buttons */}
        <View style={styles.buttonDiv}>
          <Link href="/login">
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
          </Link>
          <Text style={{padding:10}}>OR</Text>
          <Link href="/register">
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    alignItems: 'center',
  },
  topBar: {
    backgroundColor: Colors.light.topBackground,
    width: '100%',
    height: 50,
    justifyContent: 'center'
  },
  topBarText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    font: 'Roboto',
    color: Colors.light.success
  },
  imageDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    // backgroundColor:Colors.light.icon

  },
  image: {
    width: 200,
    height: 200,
    borderRadius: '50%'
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    padding:20,
    backgroundColor:Colors.light.topBackground
  },
  contentText: {
    fontSize: 24,
    font: 'Roboto',
    color: Colors.light.text
  },
  buttonDiv: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
    marginBottom:30,
  },
  button: {
    backgroundColor: Colors.light.success,
    padding: 10,
    borderRadius: 10,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'bold'
  }
})