
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Configuration, OpenAI } from "openai";
import { ApiKey } from './ApiKey';




export const Solution = () => {
  const routes = useRoute();

  const downloadTxtFile = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = 'Report';

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const [response, setResponse] = useState("");
  const [running, setRunning] = useState(true);
  const [openai, setOpenai] = useState();

  const finalTemplate = [{
    "role": "system",
    "content": `You are a environnemental assistant.
    You are going to help me reduce my carbon footprint based on my sources and factors of emissions.
    NEVER PROPOSE TO CONSULT PROFESSIONALS.
    You are going to give me a plan to reduce my carbon footprint. Precise in what equipment I should based on my budget.`}, {
    "role": "user", "content": routes.params.data
  }]


  useEffect(() => {

  }, [])


  useEffect(() => {
    const final = async () => {
      const configuration = new OpenAI({
        apiKey: ApiKey,
        dangerouslyAllowBrowser: true
      });
      setOpenai(configuration)

      setRunning(true);
      const response = await configuration.chat.completions.create({
        messages: finalTemplate,
        model: 'gpt-3.5-turbo',
      });
      const ans = response.choices[0].message.content
      console.log("ans: ", ans);
      setResponse(ans);
      setRunning(false);

    }
    final()
  }, [])


  return (<View style={{ minHeight: "100vh", width: "100vw", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
    {
      running ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <View style={{ width: "100vw", padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 20 }}>Your taylor made solution</Text>
          <TouchableOpacity style={{
            position: "absolute",
            top: 20,
            right: 30,
            backgroundColor: "green",
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
            backgroundColor: 'green',
            padding: 10,
          }}>
            <Text style={{ maxWidth: "100vw", color: 'white', fontWeight: 'bold' }}>{response}</Text>
          </View>
        </View>
      )
    }
  </View>
  )
}
