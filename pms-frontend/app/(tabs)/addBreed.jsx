import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserNavbar from '../../components/UserNavbar';
import { Colors } from '../../constants/colors';

const purposeOptions = [
    { id: 'meat', label: 'Meat', icon: 'restaurant' },
    { id: 'eggs', label: 'Eggs', icon: 'egg' },
    { id: 'dual', label: 'Dual', icon: 'all-inclusive' },
];

const AddBreed = () => {
    const [breedName, setBreedName] = useState('');
    const [selectedPurpose, setSelectedPurpose] = useState('meat');
    const [description, setDescription] = useState('');
    const [growthPeriod, setGrowthPeriod] = useState('');
    const [averageWeight, setAverageWeight] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const handleRegister = () => {
        // TODO: Implement registration logic (e.g., API call)
        console.log({
            breedName,
            selectedPurpose,
            description,
            growthPeriod,
            averageWeight,
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
                        <Text style={styles.topBarTitle}>Register Breed</Text>
                    </View>

                    <View style={styles.formCard}>
                        <Text style={styles.cardTitle}>New Breed</Text>
                        <Text style={styles.cardSubtitle}>Enter the details of the new poultry variety.</Text>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Breed Name</Text>
                            <View style={[styles.inputShell, focusedField === 'breedName' && styles.inputShellFocused]}>
                                <Icon name="pets" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={breedName}
                                    onChangeText={setBreedName}
                                    placeholder="e.g., Broilers"
                                    placeholderTextColor="#9CA3AF"
                                    underlineColorAndroid="transparent"
                                    onFocus={() => setFocusedField('breedName')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Purpose</Text>
                            <View style={styles.purposeRow}>
                                {purposeOptions.map((option) => {
                                    const isActive = option.id === selectedPurpose;
                                    return (
                                        <TouchableOpacity
                                            key={option.id}
                                            style={[styles.purposePill, isActive && styles.purposePillActive]}
                                            onPress={() => setSelectedPurpose(option.id)}
                                        >
                                            <Icon
                                                name={option.icon}
                                                size={18}
                                                color={isActive ? Colors.light.success : '#9CA3AF'}
                                            />
                                            <Text
                                                style={[styles.purposeLabel, isActive && styles.purposeLabelActive]}
                                            >
                                                {option.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>Description</Text>
                            <View style={[styles.inputShell, styles.multilineShell, focusedField === 'description' && styles.inputShellFocused]}>
                                <Icon name="info-outline" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                <TextInput
                                    style={[styles.textInput, styles.multilineInput]}
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder="Describe the breed's key characteristics..."
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    underlineColorAndroid="transparent"
                                    onFocus={() => setFocusedField('description')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>

                        <View style={styles.inlineFields}>
                            <View style={[styles.fieldGroup, styles.inlineField]}>
                                <Text style={styles.fieldLabel}>Growth Period</Text>
                                <View style={[styles.inputShell, focusedField === 'growthPeriod' && styles.inputShellFocused]}>
                                    <Icon name="schedule" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        value={growthPeriod}
                                        onChangeText={setGrowthPeriod}
                                        placeholder="e.g., 1.5 mo"
                                        placeholderTextColor="#9CA3AF"
                                        underlineColorAndroid="transparent"
                                        onFocus={() => setFocusedField('growthPeriod')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </View>
                            </View>
                            <View style={[styles.fieldGroup, styles.inlineField]}>
                                <Text style={styles.fieldLabel}>Avg. Weight</Text>
                                <View style={[styles.inputShell, focusedField === 'averageWeight' && styles.inputShellFocused]}>
                                    <Icon name="scale" size={18} color={Colors.light.icon} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        value={averageWeight}
                                        onChangeText={setAverageWeight}
                                        placeholder="e.g., 60kg"
                                        placeholderTextColor="#9CA3AF"
                                        underlineColorAndroid="transparent"
                                        onFocus={() => setFocusedField('averageWeight')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
                            <Icon name="check" size={18} color="#ffffff" style={styles.saveIcon} />
                            <Text style={styles.saveButtonText}>Save Breed</Text>
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
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 6,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 24,
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
    inputIcon: {
        marginRight: 12,
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
    purposeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    purposePill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    purposePillActive: {
        backgroundColor: `${Colors.light.success}1A`,
        borderWidth: 1,
        borderColor: Colors.light.success,
    },
    purposeLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    purposeLabelActive: {
        color: Colors.light.success,
    },
    inlineFields: {
        flexDirection: 'row',
        gap: 16,
    },
    inlineField: {
        flex: 1,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.success,
        borderRadius: 20,
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
        letterSpacing: 0.3,
    },
});

export default AddBreed;