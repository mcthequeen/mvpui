import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { WelcomeScreen } from "./WelcomeScreen";
import { Graphs } from "./Graphs";
import { EndAi } from "./EndAi";
import { Solution } from "./Final";
import { Scope2 } from "./Scope2";
import { Infos } from "./Infos";
import { Infos2 } from "./Infos2";
import { Estimation } from "./Estimation";
import { AdditionalQuest } from "./AdditionalQuest";


const Stack = createNativeStackNavigator()

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen">
                <Stack.Screen options={{ headerShown: false }} name={"WelcomeScreen"} component={WelcomeScreen} />                
                <Stack.Screen options={{ headerShown: false }} name={"Infos"} component={Infos} />  
                <Stack.Screen options={{ headerShown: false }} name={"Infos2"} component={Infos2} /> 
                <Stack.Screen options={{ headerShown: false }} name={"Estimation"} component={Estimation} />
                <Stack.Screen options={{ headerShown: false }} name={"Scope2"} component={Scope2} /> 
                <Stack.Screen options={{ headerShown: false }} name={"Graphs"} component={Graphs} />  
                <Stack.Screen options={{ headerShown: false }} name={"AdditionalQuest"} component={AdditionalQuest} />  
                <Stack.Screen options={{ headerShown: false }} name={"EndAi"} component={EndAi} /> 
                <Stack.Screen options={{ headerShown: false }} name={"Solution"} component={Solution} /> 
        
            </Stack.Navigator>
        </NavigationContainer>
    )
}


// to do
// faire le data pour first step complet
// faire UI
// faire IA derniere step
