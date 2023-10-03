import React, { useEffect, useRef, useState} from 'react';
import { View, Picker, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, useWindowDimensions, Animated, ActivityIndicator} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"

import { TypingAnimation } from 'react-native-typing-animation';
import { Configuration, OpenAI} from "openai";
import { ApiKey } from './ApiKey';

const darkGreen = "	rgb(85,107,47)";
const green = "rgb(41, 93, 78)";

const Message = ({ el, i, mess }) => {

  const scale = useRef(new Animated.Value(0)).current;

  const animScale = () => {
    Animated.spring(scale, {
      bounciness: 14,
      toValue: 1,
      speed: 3,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      onLayout={() => {
        animScale();
      }}
      style={{ maxWidth: "80%", marginTop: 10, padding: el.type == 2 ? 0 : 10, borderRadius: 10, backgroundColor: el.type == 0 ? green : darkGreen, alignSelf: el.type == 0 ? "flex-end" : "flex-start", transform: [{ scale: scale }] }}>
      {el.type == 2 && i == mess.length - 1 &&
        <View style={{ width: 50, height: 40, borderRadius: 10, backgroundColor: darkGreen }}>
          <TypingAnimation
            dotColor={"white"}
            dotMargin={5}
            dotAmplitude={3}
            dotSpeed={0.15}
            dotRadius={4}
            dotX={12}
            dotY={8}
            style={{ position: "absolute", top: 10, left: 10 }}
          />
        </View>
      }
      <Text style={{ fontWeight: "500", color: "white" }}>{el.content}</Text>
    </Animated.View>
  )
}

export const SearchAreaEnd = ({ chat, setChat, setType, firstPrompt }) => {

  const [running, setRunning] = useState(true);
  const [query, setQuery] = useState(firstPrompt);
  const [index, setIndex] = useState(0)
  const { height } = useWindowDimensions()
  const [h, setH] = useState(height - 15 - 15 - 50);

  const [mess, setMess] = useState([]);
  const [messDispaly, setMessDisplay] = useState([]);
  const [openai, setOpenai] = useState();

  const [loading, setLoading] = useState();
  const [userAns, setUserAns] = useState(firstPrompt);
  const navigation = useNavigation();

  useEffect(() => {

    const gatherResponse = async () => {
      setIndex(index+1);
      if(index == 3){
        navigation.navigate("Solution", { data: userAns });
      }
      setMess((old) => [...old, { type: 2, content: "" }]);
      setMessDisplay((old) => [...old, { type: 2, content: "" }]);            
      
      const response = await openai.chat.completions.create({
        messages: chat,
        model: 'gpt-3.5-turbo',
      });
      const resp = response.choices[0].message.content
      // const resp = response.data.choices[0].message.content;

      setMess((old) => [...old, { type: 1, content: resp }])
      setMessDisplay((old) => [...old, { type: 1, content: resp }]) //1 pour resp ia      
      setRunning(false);
      setLoading(false)
    }

    if (mess.length != 0 && mess[mess.length - 1].type == 0) {
      gatherResponse();
    }
  }, [chat])

  useEffect(() => {
    const configuration = new OpenAI({
      apiKey: ApiKey,
      dangerouslyAllowBrowser: true 
    });
    setOpenai(configuration)
  }, [])

  useEffect(() => {

    if (mess.length != 0 && mess[mess.length - 1].type == 0) { //type user 0
      setLoading(true)
      setChat((old) => [...old, {
        "role": "user",
        "content": mess[mess.length - 1].content,
      }])
    }

  }, [mess.length])
  
  useEffect(()=>{
    
    console.log("first prompt search area", firstPrompt);
    setRunning(true);
    Animated.timing(textOpacity, {
      duration: 800,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setMess((old) => [...old, { type: 0, content: query }])
   
    })
    setQuery("");
    },[])

  const textOpacity = useRef(new Animated.Value(1)).current;
  const hideText = () => {
    Animated.timing(textOpacity, {
      duration: 800,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setMess((old) => [...old, { type: 0, content: query }])
      setMessDisplay((old) => [...old, { type: 0, content: query }])
    })
  }

  const messScrollRef = useRef(null)
  return (
    <View>
    { running ? (
      <View style={{minHeight: "100vh", width: "100vw", justifyContent: "center", alignItems: "center"}}>
         <ActivityIndicator color={"black"} />
      </View>
     
    ) : (
   
    <View style={{ backgroundColor: "white", borderTopLeftRadius: 35, borderBottomLeftRadius: 35, shadowColor: "#000",    
    shadowOpacity: 0.25,
    shadowRadius: 5, height: "100vh", width: "100%", justifyContent: "center", alignItems: "center"}}>
      {textOpacity._value == 0 && <ScrollView onContentSizeChange={() => messScrollRef.current.scrollToEnd({ animated: true })} ref={messScrollRef} style={{
        height: "100vh",
        width: "50vw",
        paddingHorizontal: 40,
        height: textOpacity._value == 0 ? "calc(100vh - 80px - 77px - 100px)" : null // top bar (80px) | search bar (57px + 20px de margin)
      }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        {
          messDispaly.map((el, i) => {
            return <Message key={i} el={el} i={i} mess={mess} />
          })
        }
      </ScrollView>}
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Entypo name="magnifying-glass" size={26} color={green} style={{ position: "absolute", top: 14, left: 14 }} />
        <TextInput
          editable={!loading}
          placeholder=""
          value={query}
          onChange={(e) => setQuery(e.nativeEvent.text)}
          placeholderTextColor={darkGreen}
          style={{
            marginBottom: 20,
            outline: "none",
            padding: 20,
            paddingLeft: 20 + 30,
            borderRadius: 20,
            minWidth: 400,
            maxWidth: 600,
            width: "50vw",
            // shadowColor: "#000",
            shadowColor: darkGreen,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.4,
            shadowRadius: 7,
            fontWeight: "500"
          }}
          onSubmitEditing={() => {
            if (textOpacity._value == 1) {
              setQuery("");
              hideText()
            } else {
              setQuery("");
              setMess((old) => [...old, { type: 0, content: query }])
              setMessDisplay((old) => [...old, { type: 0, content: query }])
              setUserAns((old) => `${old} ${query}`)
            }
            // setH((old) => old+500)
          }}
        />
      </View>
    </View>
    )}
    </View>
  )
}