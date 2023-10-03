import { useNavigation } from "@react-navigation/native"
import { Image, Text, TouchableOpacity, View } from "react-native"

export const WelcomeScreen = () => {
    
    const navigation = useNavigation()

    return (
        <View style={{ height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <Image source={require("../assets/logo.png")} style={{ height: 171, width: 294 }} />
            <Text style={{ fontWeight: "bold", fontSize: 24, color: "green" }}>Committing businesses to ecology.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Infos")} style={{ padding: 10, borderRadius: 10, backgroundColor: "green", marginTop: 20 }}>
                <Text style={{ fontWeight: "bold", color: "white" }}>My carbon footprint</Text>
            </TouchableOpacity>
        </View>
    )
}