
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Configuration, OpenAI } from "openai";
import { ApiKey } from './ApiKey';



export const Solution = () => {
  const routes = useRoute();


  const [response, setResponse] = useState("");
  const [running, setRunning] = useState(false);
  const [openai, setOpenai] = useState();

  const finalTemplate = [{
    "role": "system",
    "content": `You are a environnemental assistant.
    You are going to help me reduce my carbon footprint based on my sources and factors of emissions.
    You are going to give me a plan to reduce my carbon footprint`}, {
    "role": "user", "content": routes.params.data}]


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
      console.log("final temp", finalTemplate);
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


  return (<View style={{ minHeight: "100vh", width: "100vw", justifyContent: "center", alignItems: "center" }}>
    {
      running ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <View style={{ width: "50vw" }}>
          <Text style={{ color: 'gb(107,142,35)', fontWeight: 'bold', fontSize:25 }}>Your taylor made solution</Text>
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
      )
    }
  </View>
  )
}
