import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Colors } from '../../constants/colors';
import { ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import UserNavbar from '../../components/UserNavbar';

const AddGrowthLog = () => {
    const [eventType, setEventType] = useState('Broiler');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    const handleRegister = () => {
        // TODO: Implement registration logic (e.g., API call)
        console.log({
            eventType,
            value,
            date,
            note,
            
        });
        // Optionally navigate back or show success message
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <UserNavbar />

                <Text style={styles.pageTitle}>Growth Log</Text>
                <Text style={styles.subtitle}>What happened in the farm today</Text>

                <View style={styles.formContainer}>
                    {/* Event Type Dropdown */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Event</Text>
                        <View style={styles.underlineContainer}>
                            <Picker
                                selectedValue={eventType}
                                onValueChange={(itemValue) => setEventType(itemValue)}
                                style={styles.picker}
                                mode="dialog"
                            >
                                <Picker.Item label="Death" value="Death" />
                                <Picker.Item label="Sickness" value="Sickness" />
                                <Picker.Item label="Sold" value="Sold" />
                            </Picker>
                        </View>
                    </View>

                    {/* Value */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Value</Text>
                        <TextInput
                            style={styles.underlineInput}
                            value={value}
                            onChangeText={setValue}
                            placeholder="Enter the number "
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/*Note */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Note</Text>
                        <TextInput
                            style={styles.underlineInput}
                            value={date}
                            onChangeText={setNote}
                            placeholder="Details of what happened"
                            keyboardType="default"
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
export default AddGrowthLog;
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

