import { useNavigation } from "@react-navigation/native"
import { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from "react-native"

export const Infos = () => {

    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        companyWebsite: '',
        caenCode: '',
        cuiCode: '',
        turnover: '',
        numEmployees: '',
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
            return;
          }
        }
        navigation.navigate("Infos2", { data: formData })
     
        setErrorMessage('');
        // Proceed with form submission or other actions
      };

    return (
        <View style={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <View style={styles.formContainer}>
                <Text style={{ fontWeight: "700", fontSize: 30, marginBottom: 20 }}>Getting to know you</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What is the website of your company?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, {outline: "none"}]}
                        onChangeText={(value) => handleChange('companyWebsite', value)}
                        value={formData.companyWebsite}
                        placeholder="Enter website"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What is the CAEN code of the enterprise?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, {outline: "none"}]}
                        onChangeText={(value) => handleChange('caenCode', value)}
                        value={formData.caenCode}
                        placeholder="Enter CAEN code"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What is the identification code (CUI) of the enterprise?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, {outline: "none"}]}
                        onChangeText={(value) => handleChange('cuiCode', value)}
                        value={formData.cuiCode}
                        placeholder="Enter CUI code"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>What was your turnover for the previous year (in million)?</Text>
                    <TextInput
                        placeholderTextColor={"gray"}
                        style={[styles.input, {outline: "none"}]}
                        onChangeText={(value) => handleChange('turnover', value)}
                        value={formData.turnover}
                        placeholder="Enter turnover"
                        keyboardType="numeric"
                        required
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>How many employees work in your company?</Text>
                    <TextInput                        
                        placeholderTextColor={"gray"}
                        style={[styles.input, {outline: "none"}]}
                        onChangeText={(value) => handleChange('numEmployees', value)}
                        value={formData.numEmployees}
                        placeholder="Enter number of employees"
                        keyboardType="numeric"
                        required
                    />
                </View>
                <TouchableOpacity
                    style={{padding: 10, borderRadius: 10, backgroundColor: "green"}}
                    onPress={handleSubmit}
                >
                    <Text style={{fontWeight: "bold", color: "white"}}>Next</Text>
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