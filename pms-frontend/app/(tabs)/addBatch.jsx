import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const breedOptions = [
    { id: 'broilers', label: 'Broilers', icon: 'cottage' },
    { id: 'layers', label: 'Layers', icon: 'egg' },
    { id: 'kuroilers', label: 'Kuroilers', icon: 'pets' },
];

const AddBatch = () => {
    const [batchName, setBatchName] = useState('');
    const [selectedBreed, setSelectedBreed] = useState('broilers');
    const [totalBirds, setTotalBirds] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [focusedField, setFocusedField] = useState(null);

    const handleRegister = () => {
        // TODO: Implement registration logic (e.g., API call)
        console.log({
            batchName,
            selectedBreed,
            totalBirds,
            arrivalDate,
            isActive,
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
                        <Text style={styles.topBarTitle}>Register Batch</Text>
                    </View>

                    <View style={styles.formCard}>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Batch Name</Text>
                            <View style={[styles.inputShell, focusedField === 'batchName' && styles.inputShellFocused]}>
                                <Icon name="inventory" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={batchName}
                                    onChangeText={setBatchName}
                                    placeholder="e.g., Summer Broilers A"
                                    placeholderTextColor="#9CA3AF"
                                    underlineColorAndroid="transparent"
                                    onFocus={() => setFocusedField('batchName')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Select Breed</Text>
                            <View style={styles.breedRow}>
                                {breedOptions.map((option) => {
                                    const isActiveOption = option.id === selectedBreed;
                                    return (
                                        <TouchableOpacity
                                            key={option.id}
                                            style={[styles.breedPill, isActiveOption && styles.breedPillActive]}
                                            onPress={() => setSelectedBreed(option.id)}
                                        >
                                            <View style={[styles.breedIconBadge, isActiveOption && styles.breedIconBadgeActive]}>
                                                <Icon
                                                    name={option.icon}
                                                    size={18}
                                                    color={isActiveOption ? '#ffffff' : '#9CA3AF'}
                                                />
                                            </View>
                                            <Text style={[styles.breedLabel, isActiveOption && styles.breedLabelActive]}>
                                                {option.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Total Number of Birds</Text>
                            <View style={[styles.inputShell, focusedField === 'totalBirds' && styles.inputShellFocused]}>
                                <Icon name="tag" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={totalBirds}
                                    onChangeText={setTotalBirds}
                                    placeholder="# 0"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numeric"
                                    underlineColorAndroid="transparent"
                                    onFocus={() => setFocusedField('totalBirds')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Arrival Date</Text>
                            <View style={[styles.inputShell, styles.inputShellBetween, focusedField === 'arrivalDate' && styles.inputShellFocused]}>
                                <View style={styles.inlineIconText}>
                                    <Icon name="event" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        value={arrivalDate}
                                        onChangeText={setArrivalDate}
                                        placeholder="mm/dd/yyyy"
                                        placeholderTextColor="#9CA3AF"
                                        underlineColorAndroid="transparent"
                                        onFocus={() => setFocusedField('arrivalDate')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </View>

                                <Icon name="calendar-today" size={18} color={Colors.light.icon} />
                            </View>
                        </View>

                        <View style={[styles.fieldGroup, styles.toggleRow]}>
                            <View style={styles.toggleCopy}>
                                <Text style={styles.toggleLabel}>Set as Active</Text>
                                <Text style={styles.toggleDescription}>Active batches allow immediate record entries.</Text>
                            </View>
                            <Switch
                                value={isActive}
                                onValueChange={setIsActive}
                                trackColor={{ false: '#E5E7EB', true: `${Colors.light.success}55` }}
                                thumbColor={isActive ? Colors.light.success : '#ffffff'}
                            />
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
                            <Icon name="check" size={18} color="#ffffff" style={styles.saveIcon} />
                            <Text style={styles.saveButtonText}>Create Batch</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

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
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    inputShell: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    inputShellFocused: {
        borderRadius: 0,
    },
    inputShellBetween: {
        justifyContent: 'space-between',
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
    breedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    breedPill: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 18,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: 'transparent',
        gap: 10,
    },
    breedPillActive: {
        backgroundColor: `${Colors.light.success}10`,
        borderColor: Colors.light.success,
    },
    breedIconBadge: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E7EB',
    },
    breedIconBadgeActive: {
        backgroundColor: Colors.light.success,
    },
    breedLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    breedLabelActive: {
        color: Colors.light.success,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleCopy: {
        flex: 1,
        paddingRight: 16,
    },
    toggleLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    toggleDescription: {
        fontSize: 12,
        color: '#6B7280',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 28,
        paddingVertical: 16,
        marginTop: 8,
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
        letterSpacing: 0.3,
    },
});

export default AddBatch;