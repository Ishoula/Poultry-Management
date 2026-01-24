import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Colors } from '../../constants/colors';
import { ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import UserNavbar from '../../components/UserNavbar';

let DateTimePicker = null;
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

const AddOrder = () => {
  const [breedType, setBreedType] = useState('Broilers'); // Fixed initial value to match options
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [basis, setBasis] = useState('Per Chicken'); // Added initial value
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate.toISOString().split('T')[0]); // YYYY-MM-DD
    }
  };

  const handleRegister = () => {
    // TODO: Implement registration logic (e.g., API call)
    console.log({
      breedType,
      name,
      date,
      quantity,
      price,
      basis,
    });
    // Optionally navigate back or show success message
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
              underlineColorAndroid="transparent" // Remove Android focus underline
            />
          </View>
          {/* Breed Type Dropdown */}
          <View style={styles.field}>
            <Text style={styles.label}>Breed Type</Text>
            <View style={styles.underlineContainer}>
              <Picker
                selectedValue={breedType}
                onValueChange={(itemValue) => setBreedType(itemValue)}
                style={styles.picker}
                mode="dialog"
              >
                <Picker.Item label="Broilers" value="Broilers" />
                <Picker.Item label="Kuroilers" value="Kuroilers" />
                <Picker.Item label="Layers" value="Layers" />
              </Picker>
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
                <Picker.Item label="Per Chicken" value="Per Chicken" />
                <Picker.Item label="Per Kg" value="Per Kg" />
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
              onChangeText={setPrice} // Fixed this (was {price})
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
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} >
            <Text style={styles.buttonText}>Register</Text>
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