import { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRoute } from '@react-navigation/native';


export const Infos2 = () => {

    const navigation = useNavigation();


    const routes = useRoute();
    const data = routes.params.data;

    const [formData, setFormData] = useState({
        TypeIndustry: '',
        NumVehicule: '',
        EstimatedKm: '',
        TotalSurface: '',
        Electricity: '',
        Gas: '',


    });


    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        for (const key in formData) {
            if (!formData[key]) {
                setErrorMessage('Please fill in all fields.');
                console.log("data", formData);
                return;
            }
        }
        const EstimationData = { ...formData, ...data };
        navigation.navigate("Estimation", {data : EstimationData} )
        setErrorMessage('');
        // Proceed with form submission or other actions
    };

    return (
        <View style={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <View style={styles.formContainer}>
                <Text style={{ fontWeight: "700", fontSize: 30, marginBottom: 20 }}>Getting to know you</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What is the type of your comapny ?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, { outline: "none" }]}
                        onChangeText={(value) => handleChange('TypeIndustry', value)}
                        value={formData.TypeIndustry}
                        placeholder="Enter type of industry"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>How many vehicule do you have?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, { outline: "none" }]}
                        onChangeText={(value) => handleChange('NumVehicule', value)}
                        value={formData.NumVehicule}
                        placeholder="Enter number of vehicules"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>How many km do you do in 1 year?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, { outline: "none" }]}
                        onChangeText={(value) => handleChange('EstimatedKm', value)}
                        value={formData.EstimatedKm}
                        placeholder="Enter number of estimated km"
                        keyboardType="numeric"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What is your total consumption in 1 year of electricity ?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, { outline: "none" }]}
                        onChangeText={(value) => handleChange('Electricity', value)}
                        value={formData.Electricity}
                        placeholder="Enter consumption"
                        keyboardType="numeric"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What is your total consumption in 1 year of gas ?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, { outline: "none" }]}
                        onChangeText={(value) => handleChange('Gas', value)}
                        value={formData.Gas}
                        placeholder="Enter consumption"
                        keyboardType="numeric"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What is the total surface of all your buildings?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, { outline: "none" }]}
                        onChangeText={(value) => handleChange('TotalSurface', value)}
                        value={formData.TotalSurface}
                        placeholder="Enter total surface"
                        keyboardType="numeric"
                        required
                    />
                </View>
                <TouchableOpacity
                    style={{ padding: 10, borderRadius: 10, backgroundColor: "green" }}
                    onPress={handleSubmit}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>Next</Text>
                </TouchableOpacity>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        maxWidth: 400,
        marginVertical: 50,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 2,

    },
    formGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "500"
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        border: "none",
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        fontSize: 14,
        fontWeight: "500"
    },
    errorMessage: {
        color: 'red',
        fontWeight: "600",
        marginTop: 10,
        fontSize: 12,
    },
})