
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

import { SearchAreaEnd } from './ChatbotEnd';

export const EndAi = () => {
  const routes = useRoute();
  const data = routes.params.data;
  const [chat, setChat] = useState([{
    "role": "system", "content":
      `You are an environmental assistant.
      You are respectfull and polite.
      Your goal is to determinate the users's factors of emission based on his sources of emission.
      Ask only three relevant questions. 
  `}])

  const firstPrompt = `I have a retail industry.
    My sources of emission are the following : 
    My fugitive emission are ${data["Stationary Combustion"]}% of the total emissions, 
    mobile combustion are ${data["Mobile Combustion"]}% of the total emissions 
    and stationary emissions are ${data["Fugitive Emission"]}% of the total emissions.
    My consumption of electricity and gas contributes to ${data["Electricty and gas"]}% of my total emissions.
    My budget is ${data["Budget"]} dollars and my timeline is ${data["TimeLine"]} year.
  `

  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchAreaEnd chat={chat} setChat={setChat} firstPrompt={firstPrompt} />
    </View>

  )
}
