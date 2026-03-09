import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const eventOptions = [
    { id: 'death', label: 'Death ', icon: 'heart-broken', color: '#EF4444' },
    { id: 'diseases', label: 'Disease ', icon: 'healing', color: '#F59E0B' },
    { id: 'sold', label: 'Sold ', icon: 'storefront', color: '#3B82F6' },
    { id: 'vaccinated', label: 'Vaccinated', icon: 'vaccines', color: '#10B981' },
];

const AddGrowthLog = () => {
    const [selectedEvent, setSelectedEvent] = useState(eventOptions[0].id);
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [note, setNote] = useState('');

    const selectedOption = eventOptions.find(opt => opt.id === selectedEvent);
    const formatDate = (inputDate) => {
        if (!inputDate || !(inputDate instanceof Date) || isNaN(inputDate.getTime())) {
            return 'Select date';
        }
        try {
            return inputDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (err) {
            console.warn('Date formatting failed:', err);
            return 'Invalid date';
        }
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
            setDate(new Date(selectedDate));
        }
    };

    const getValueLabel = () => {
        switch (selectedEvent) {
            case 'death': return 'Number of birds died';
            case 'diseases': return 'Number affected / treated';
            case 'sold': return 'Number sold / Total weight';
            case 'vaccinated': return 'Number vaccinated';
            default: return 'Value';
        }
    };

    const getValuePlaceholder = () => {
        switch (selectedEvent) {
            case 'death': return 'e.g. 15';
            case 'diseases': return 'e.g. 8 birds';
            case 'sold': return 'e.g. 50 birds or 120 kg';
            case 'vaccinated': return 'e.g. 200';
            default: return 'e.g. 12 birds or 25 kg';
        }
    };

    const handleSave = () => {
        if (!value.trim()) {
            console.warn('Please enter a value');
            return;
        }
        const logEntry = {
            eventType: selectedEvent,
            value: value.trim(),
            date: formatDate(date),
            note: note.trim(),
        };
        console.log('New Growth Log:', logEntry);

    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <UserNavbar />

                <View style={styles.screenPadding}>
                    <Text style={styles.title}>Add Growth Record</Text>

                    {/* EVENT TYPE - kept more pill-style, but you can simplify if needed */}
                    <Text style={styles.label}>Event Type</Text>
                    <View style={styles.eventGrid}>
                        {eventOptions.map((option) => {
                            const isActive = option.id === selectedEvent;
                            return (
                                <TouchableOpacity
                                    key={option.id}
                                    style={[
                                        styles.eventPill,
                                        isActive && { ...styles.eventPillActive },
                                    ]}
                                    onPress={() => {
                                        setSelectedEvent(option.id);
                                        setValue('');
                                    }}
                                >
                                    <Icon name={option.icon} size={24} color={isActive ? selectedOption?.color : '#5c5c5c'} />
                                    <Text style={[styles.eventLabel, isActive && { color: isActive ? selectedOption?.color : '#5c5c5c' }]}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* VALUE */}
                    <Text style={styles.label}>{getValueLabel()}</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={setValue}
                            placeholder={getValuePlaceholder()}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* DATE */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>DATE</Text>
                        <TouchableOpacity
                            style={[
                                styles.inputShell,

                            ]}
                            onPress={() => setShowDatePicker(true)}
                            activeOpacity={0.7}
                        >
                            <Icon
                                name="event"
                                size={20}
                                color={Colors.light.icon || '#6B7280'}
                                style={styles.inputIcon}
                            />

                            <Text
                                style={[
                                    styles.dateText,
                                    !date || isNaN(date.getTime()) ? styles.datePlaceholder : null,
                                ]}
                            >
                                {formatDate(date)}
                            </Text>

                            <Icon
                                name="calendar-today"
                                size={20}
                                color={Colors.light.icon || '#6B7280'}
                            />
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}
                    </View>

                    {/* NOTE */}
                    <Text style={styles.label}>Note </Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[styles.input, styles.notesInput]}
                            value={note}
                            onChangeText={setNote}
                            placeholder="Symptoms, treatment used, buyer name, vaccine type, observations..."
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save Record</Text>
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
        backgroundColor: '#FFF',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    screenPadding: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#444',
    },

    inputWrapper: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    input: {
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    inputText: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
    },

    eventGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    eventPill: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        marginBottom: 12,
        gap: 8,
        backgroundColor: '#f9f9f9',
    },
    eventPillActive: {
         backgroundColor: `${Colors.light.success}10`,
        borderColor: Colors.light.success,

    },
    eventLabel: {
        fontSize: 14,
        color: '#555',
    },

    saveButton: {
        backgroundColor: Colors.light.success,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputShell: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',

    },

    inputIcon: {
        marginRight: 12,
    },

    dateText: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text || '#111827',

    },

    datePlaceholder: {
        color: '#9CA3AF',
        fontStyle: 'italic',
    },
});