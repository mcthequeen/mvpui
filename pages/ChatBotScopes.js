import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, useWindowDimensions, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { TypingAnimation } from 'react-native-typing-animation';
import { OpenAI } from "openai";
import { ApiKey } from './ApiKey';



const Message = ({ el, i, mess, messColor }) => {

  const scale = useRef(new Animated.Value(0)).current;
  const green = 'green'

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
      style={{ maxWidth: "80%", marginTop: 10, padding: el.type == 2 ? 0 : 10, borderRadius: 10, backgroundColor: el.type == 0 ? green : messColor, alignSelf: el.type == 0 ? "flex-end" : "flex-start", transform: [{ scale: scale }] }}>
      {el.type == 2 && i == mess.length - 1 &&
        <View style={{ width: 50, height: 40, borderRadius: 10, backgroundColor: messColor }}>
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

export const SearchArea = ({ chat, setChat, firstMess, messColor }) => {

  console.log("first mess: ",firstMess);
  console.log("color: ", messColor);
  const darkGreen = "rgb(38, 55, 51)";
  const green = messColor;

  const [query, setQuery] = useState("");
  const { height } = useWindowDimensions()
  const [h, setH] = useState(height - 15 - 15 - 50);

  const [mess, setMess] = useState([]);
  const [openai, setOpenai] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setMess([]);
    setMess([{ type: 1, content: firstMess }]);
  },[firstMess])

  useEffect(() => {

    const gatherResponse = async () => {
      setMess((old) => [...old, { type: 2, content: "" }])

      const response = await openai.chat.completions.create({
        messages: chat,
        model: 'gpt-3.5-turbo',
      });
      const resp = response.choices[0].message.content
      // const resp = response.data.choices[0].message.content;

      setMess((old) => [...old, { type: 1, content: resp }])
      setLoading(false);
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

    if (mess.length != 0 && mess[mess.length - 1].type == 0) {
      setLoading(true)
      setChat((old) => [...old, {
        "role": "user",
        "content": mess[mess.length - 1].content,
      }])
    }

  }, [mess.length])

  const textOpacity = useRef(new Animated.Value(1)).current;
  const hideText = () => {
    Animated.timing(textOpacity, {
      duration: 800,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setMess((old) => [...old, { type: 0, content: query }])
    })
  }

  const messScrollRef = useRef(null)
  return (
    <View style={{
      backgroundColor: "white", borderTopLeftRadius: 35, borderBottomLeftRadius: 35, shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 5, height: "100vh", width:'100%', justifyContent: "center", alignItems: "center"
    }}>
     
       <ScrollView onContentSizeChange={() => messScrollRef.current.scrollToEnd({ animated: true })} ref={messScrollRef} style={{
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
          mess.map((el, i) => {
            return <Message key={i} el={el} i={i} mess={mess} messColor={messColor} />
          })
        }
      </ScrollView>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Entypo name="magnifying-glass" size={26} color={green} style={{ position: "absolute", top: 14, left: 14 }} />
        <TextInput
          editable={!loading}
          placeholder="Ask your question"
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
              hideText();
            } else {
              setQuery("");
              setMess((old) => [...old, { type: 0, content: query }])
            }
            // setH((old) => old+500)
          }}
        />
      </View>
    </View>
  )
}


