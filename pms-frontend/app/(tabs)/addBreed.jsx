import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Picker } from 'react-native';
import { Colors } from '../../constants/colors';
import { ScrollView } from 'react-native';
import UserNavbar from '../../components/UserNavbar';

const AddBreed = () => {
    const [breedType, setBreedType] = useState('Broiler');
    const [description, setDescription] = useState('');
    const [growthPeriod, setGrowthPeriod] = useState('');
    const [averageWeight, setAverageWeight] = useState('');

    const handleRegister = () => {
        // TODO: Implement registration logic (e.g., API call)
        console.log({
            breedType,
            description,
            growthPeriod,
            averageWeight,
        });
        // Optionally navigate back or show success message
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <UserNavbar />

                <Text style={styles.pageTitle}>Breeds</Text>
                <Text style={styles.subtitle}>Register a breed</Text>

                <View style={styles.formContainer}>
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
                                <Picker.Item label="Broiler" value="Broiler" />
                                <Picker.Item label="Layers" value="Layers" />
                                <Picker.Item label="Kuroilers" value="Kuroilers" />
                            </Picker>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.underlineInput}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Enter breed description"
                            multiline
                            numberOfLines={4}
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/* Growth Period */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Growth Period</Text>
                        <TextInput
                            style={styles.underlineInput}
                            value={growthPeriod}
                            onChangeText={setGrowthPeriod}
                            placeholder="e.g., 20-24 weeks"
                            keyboardType="default"
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/* Average Weight */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Average Weight</Text>
                        <TextInput
                            style={styles.underlineInput}
                            value={averageWeight}
                            onChangeText={setAverageWeight}
                            placeholder="e.g., 2.5 kg"
                            keyboardType="numeric"
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

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
    },
    underlineContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#ccc',
    },
    picker: {
        height: 48,
        width: '100%',
        color: Colors.light.text,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    registerButton: {
        backgroundColor: Colors.light.success || 'green',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 32,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddBreed;