import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const eventOptions = [
    { id: 'death', label: 'Death', icon: 'heart-broken', color: '#EF4444' },
    { id: 'diseases', label: 'Diseases', icon: 'healing', color: '#F59E0B' },
    { id: 'sold', label: 'Sold', icon: 'storefront', color: '#3B82F6' },
    { id: 'vaccinated', label: 'Vaccinated', icon: 'vaccines', color: '#10B981' },
];

const AddGrowthLog = () => {
    const [selectedEvent, setSelectedEvent] = useState('death');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const handleRegister = () => {
        // TODO: Implement registration logic (e.g., API call)
        console.log({
            selectedEvent,
            value,
            date,
            note,
            
        });
        // Optionally navigate back or show success message
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <UserNavbar />
                <View style={styles.screenPadding}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.navIconButton}>
                            <Icon name="arrow-back" size={20} color={Colors.light.text} />
                        </TouchableOpacity>
                        <Text style={styles.topBarTitle}>Add Growth Record</Text>
                    </View>

                    <View style={styles.formCard}>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Select Event Type</Text>
                            <View style={styles.eventGrid}>
                                {eventOptions.map((option) => {
                                    const isActive = option.id === selectedEvent;
                                    return (
                                        <TouchableOpacity
                                            key={option.id}
                                            style={[styles.eventPill, isActive && styles.eventPillActive]}
                                            onPress={() => setSelectedEvent(option.id)}
                                        >
                                            <View style={[styles.eventIconBadge, { backgroundColor: `${option.color}1A` }]}
                                            >
                                                <Icon
                                                    name={option.icon}
                                                    size={20}
                                                    color={isActive ? Colors.light.success : option.color}
                                                />
                                            </View>
                                            <Text style={[styles.eventLabel, isActive && styles.eventLabelActive]}>
                                                {option.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Value</Text>
                            <View style={[styles.inputShell, focusedField === 'value' && styles.inputShellFocused]}>
                                <Icon name="tag" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={value}
                                    onChangeText={setValue}
                                    placeholder="e.g., 12 birds or 25kg"
                                    placeholderTextColor="#9CA3AF"
                                    underlineColorAndroid="transparent"
                                    onFocus={() => setFocusedField('value')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Date</Text>
                            <View style={[styles.inputShell, styles.inputShellBetween, focusedField === 'date' && styles.inputShellFocused]}>
                                <View style={styles.inlineIconText}>
                                    <Icon name="event" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        value={date}
                                        onChangeText={setDate}
                                        placeholder="MM/DD/YYYY"
                                        placeholderTextColor="#9CA3AF"
                                        underlineColorAndroid="transparent"
                                        onFocus={() => setFocusedField('date')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </View>
                                <Icon name="calendar-today" size={18} color={Colors.light.icon} />
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Note</Text>
                            <View style={[styles.inputShell, styles.multilineShell, focusedField === 'note' && styles.inputShellFocused]}>
                                <TextInput
                                    style={[styles.textInput, styles.multilineInput]}
                                    value={note}
                                    onChangeText={setNote}
                                    placeholder="Add an explanation or details here..."
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    underlineColorAndroid="transparent"
                                    onFocus={() => setFocusedField('note')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
                            <Icon name="check" size={18} color="#ffffff" style={styles.saveIcon} />
                            <Text style={styles.saveButtonText}>Save Record</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default AddGrowthLog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background || '#f0f2f5',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    screenPadding: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 20,
    },
    navIconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#0F172A',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 2,
    },
    topBarTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#0F172A',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        elevation: 5,
    },
    fieldGroup: {
        marginBottom: 24,
    },
    fieldLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    eventGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    eventPill: {
        width: '48%',
        backgroundColor: '#F3F4F6',
        borderRadius: 18,
        paddingVertical: 18,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        gap: 12,
    },
    eventPillActive: {
        borderColor: Colors.light.success,
        backgroundColor: `${Colors.light.success}10`,
    },
    eventIconBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    eventLabelActive: {
        color: Colors.light.success,
    },
    inputShell: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    inputShellBetween: {
        justifyContent: 'space-between',
    },
    inputShellFocused: {
        borderRadius: 0,
    },
    inputIcon: {
        marginRight: 12,
    },
    inlineIconText: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
        paddingVertical: 0,
    },
    multilineShell: {
        alignItems: 'flex-start',
        paddingTop: 14,
        paddingBottom: 14,
    },
    multilineInput: {
        minHeight: 96,
        textAlignVertical: 'top',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 28,
        paddingVertical: 16,
        marginTop: 12,
        shadowColor: '#1A472A',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 4,
    },
    saveIcon: {
        marginRight: 8,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
});

