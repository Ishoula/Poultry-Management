import { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ActivityIndicator, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import UserNavbar from '../../components/UserNavbar';
import { authFetch } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

let DateTimePicker = null;
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

const AddOrder = () => {
  const router = useRouter();

  const [breeds, setBreeds] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [breedsError, setBreedsError] = useState('');

  const [breedType, setBreedType] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [basis, setBasis] = useState('per chick');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadBreeds = async () => {
    try {
      setBreedsError('');
      setLoadingBreeds(true);
      const data = await authFetch('/breeds', { method: 'GET' });
      const list = Array.isArray(data?.breeds) ? data.breeds : [];
      setBreeds(list);
      if (!breedType && list.length > 0) {
        setBreedType(list[0]._id);
      }
    } catch (e) {
      setBreedsError(e?.message || 'Failed to load breeds');
    } finally {
      setLoadingBreeds(false);
    }
  };

  useEffect(() => {
    loadBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedBreedName = useMemo(() => {
    const found = breeds.find((b) => b?._id === breedType);
    return found?.breedName || '';
  }, [breeds, breedType]);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate.toISOString().split('T')[0]); // YYYY-MM-DD
    }
  };

  const handleRegister = () => {
    // Deprecated by submitOrder
  };

  const submitOrder = async () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a customer name.');
      return;
    }
    if (!breedType) {
      Alert.alert('Missing breed', 'Please select a breed type.');
      return;
    }
    if (!basis) {
      Alert.alert('Missing basis', 'Please select basis.');
      return;
    }
    if (!quantity || Number.isNaN(Number(quantity)) || Number(quantity) <= 0) {
      Alert.alert('Invalid quantity', 'Quantity must be a positive number.');
      return;
    }
    if (!price || Number.isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Invalid price', 'Price must be a positive number.');
      return;
    }
    if (!date) {
      Alert.alert('Missing delivery date', 'Please select a delivery date.');
      return;
    }

    try {
      setSubmitting(true);
      await authFetch('/orders', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          breedType,
          basis,
          quantity: Number(quantity),
          price: Number(price),
          deliveryDate: date,
        }),
      });
      router.replace('/(tabs)/orders');
    } catch (e) {
      Alert.alert('Failed to create order', e?.message || 'Please try again');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <UserNavbar />

        <Text style={styles.pageTitle}>Add Order</Text>

        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.underlineInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#aaa"
              underlineColorAndroid="transparent" 
            />
          </View>
          {/* Breed Type Dropdown */}
          <View style={styles.field}>
            <Text style={styles.label}>Breed Type</Text>
            <View style={styles.underlineContainer}>
              {loadingBreeds ? (
                <View style={{ paddingVertical: 10 }}>
                  <ActivityIndicator size="small" color={Colors.light.success} />
                </View>
              ) : breedsError ? (
                <TouchableOpacity activeOpacity={0.8} onPress={loadBreeds} style={{ paddingVertical: 8 }}>
                  <Text style={{ color: '#dc2626', fontWeight: '700' }}>{breedsError} (Tap to retry)</Text>
                </TouchableOpacity>
              ) : (
                <Picker
                  selectedValue={breedType}
                  onValueChange={(itemValue) => setBreedType(itemValue)}
                  style={styles.picker}
                  mode="dialog"
                >
                  {breeds.map((b) => (
                    <Picker.Item key={b._id} label={b.breedName} value={b._id} />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          {/* Basis */}
          <View style={styles.field}>
            <Text style={styles.label}>Basis</Text>
            <View style={styles.underlineContainer}>
              <Picker
                selectedValue={basis}
                onValueChange={(itemValue) => setBasis(itemValue)}
                style={styles.picker}
                mode="dialog"
              >
                <Picker.Item label="Per Chick" value="per chick" />
                <Picker.Item label="Per Kg" value="per kg" />
              </Picker>
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.field}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.underlineInput}
              value={quantity}
              onChangeText={setQuantity}
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              underlineColorAndroid="transparent" // Remove Android focus underline
            />
          </View>

          {/* Price */}
          <View style={styles.field}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.underlineInput}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
              underlineColorAndroid="transparent" // Remove Android focus underline
            />
          </View>

          {/* Date */}
          <View style={styles.field}>
            <Text style={styles.label}>Date</Text>

            {Platform.OS === 'web' ? (
              <TextInput
                style={styles.underlineInput}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#aaa"
                type="date"
                underlineColorAndroid="transparent" // Just in case, but not needed on web
              />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.underlineInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={{ color: date ? Colors.light.text : '#aaa', paddingVertical: 8 }}>
                    {date || 'Select date'}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && DateTimePicker && (
                  <DateTimePicker
                    value={date ? new Date(date) : new Date()}
                    mode="date"
                    onChange={onDateChange}
                  />
                )}
              </>
            )}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, submitting && { opacity: 0.8 }]}
            onPress={submitOrder}
            disabled={submitting || loadingBreeds || !!breedsError}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background || '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageTitle: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    color: Colors.light.text,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    color: Colors.light.text,
  },
  underlineInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineWidth: 0,
        outlineColor: 'transparent',
        outlineStyle: 'none', // Fully remove browser focus outline
      },
    }),
  },
  underlineContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
    ...Platform.select({
      web: {
        outlineWidth: 0,
        outlineColor: 'transparent',
        outlineStyle: 'none', // Remove outline for picker container on web
      },
    }),
  },
  picker: {
    height: 48,
    width: '100%',
    color: Colors.light.text,
    fontSize: 16,
    borderColor: 'none',
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineWidth: 0,
        outlineColor: 'transparent',
        outlineStyle: 'none', // Remove outline on focus for picker on web
        border: 'none', // Ensure no border
      },
    }),
  },
  registerButton: {
    backgroundColor: Colors.light.success || 'green',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    marginBottom:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});