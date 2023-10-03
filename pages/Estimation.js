import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Configuration, OpenAI } from "openai";

import * as FileSystem from 'expo-file-system';
import { ApiKey } from "./ApiKey";



const downloadTxtFile = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = 'Report';

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};


export const Estimation = () => {


    const [response, setResponse] = useState("");
    const [running, setRunning] = useState(false);
    const [openai, setOpenai] = useState();

    const naviation = useNavigation();
    const routes = useRoute();
    const data = routes.params.data;

    const firstPrompt = `
    I have a retail ${data["TypeIndustry"]}. 
    I have ${data["numEmployees"]} employes.
    I have a total of ${data["NumVehicule"]} vehicules and they do ${data["EstimatedKm"]} km per year.
    I have a total surface of building of ${data["TotalSurface"]}.
    My turnover is ${data["turover"]} millions.
    My total consumption in one year of gas is ${data["Gas"]}
    My total consumption in one year of gas is ${data["Electricity"]}
    `

    const EstimationTemplate = [{
        "role": "system",
        "content": `hello chat gpt. You are a professional environmental assistant.
        Your ONLY task is to estimate my carbon footprint.
        Do not ask to provide more informations just give an estimation even if there is data missing. 
        I will provide you informations. 
        Estimate total carbon footprint. Give me a number`}, {
        "role": "user", "content": firstPrompt
    }]








    useEffect(() => {
        const final = async () => {
            const configuration = new OpenAI({
                apiKey: ApiKey,
                dangerouslyAllowBrowser: true
            });
            setOpenai(configuration)

            setRunning(true);
            console.log("final temp", EstimationTemplate);
            const response = await configuration.chat.completions.create({
                messages: EstimationTemplate,
                model: 'gpt-3.5-turbo',
            });
            const ans = response.choices[0].message.content
            console.log("ans: ", ans);
            setResponse(ans);
            setRunning(false);

        }
        final()
    }, [])


    return (
        <View>
            {
                running ? (
                    <View style={{ minHeight: "100vh", width: "100vw", justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={"black"} />
                    </View>
                ) : (
                    <View style={{ minHeight: "100vh", width: "100vw", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: "50vw" }}>
                            <Text style={{ color: 'gb(107,142,35)', fontWeight: 'bold', fontSize: 25 }}>Your estimated carbon footprint</Text>
                            <TouchableOpacity style={{
                                margin: 10,
                                maxWidth: 110,
                                display: 'flex',
                                backgroundColor: 'green',
                                borderRadius: 10,
                                padding: 10,
                                zIndex: 10,
                                maxHeight: 50,
                                justifyContent: "center",
                                alignItems: "center",
                            }} onPress={() => downloadTxtFile(response)}>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Download</Text>
                            </TouchableOpacity>
                            <View style={{
                                shadowColor: '#171717',
                                shadowOpacity: 0.5,
                                shadowRadius: 3,
                                borderRadius: 10,
                                backgroundColor: 'rgb(107,142,35)',
                                padding: 10,
                            }}>
                                <Text style={{ maxWidth: "100vw", color: 'white', fontWeight: 'bold' }}>{response}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            <TouchableOpacity onPress={() => {
                naviation.navigate("Scope2")
            }}
                style={{
                    position: "absolute",
                    bottom: 20,
                    right: 30,
                    backgroundColor: "green",
                    borderRadius: 10,
                    padding: 10,
                    zIndex: 10
                }}>
                <Text style={{ fontWeight: "bold", color: "white" }}>Go to premium</Text>
            </TouchableOpacity>

        </View>
    )
}
