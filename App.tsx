import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput,ScrollView} from "react-native";
import mainstyle from './css/mainstyle';
import { useEffect, useState } from 'react';
import React from "react";
import List from "./List";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface newTodo {
  [datenow : string] : {text : string}
}

export default function App() {
  const [working, setwork] = useState<boolean>(true);
  const [text,settext] = useState<string>("");
  const [resttext, setresttext] = useState<string>("");
  const [todos, settodos] = useState<newTodo>({});
  const [rests,setrests] = useState<newTodo>({});
  useEffect(()=>{
    loadTodos();
    loadrests();
  },[])
  const saveTodos = async (saving:newTodo) =>{
    const data = JSON.stringify(saving);
    await AsyncStorage.setItem("@todosave",data);
  };
  const saverests = async (saving:newTodo) =>{
    const data = JSON.stringify(saving);
    await AsyncStorage.setItem("@restsave", data);
  }
  const loadTodos =async () => {
    const d = await AsyncStorage.getItem("@todosave")
    if(d === null){
      return;
    }
    settodos((cur)=>JSON.parse(d));
  }
  const loadrests=async() =>{
    const d = await AsyncStorage.getItem("@restsave");
    if (d === null) {
      return;
    }
    setrests((cur) => JSON.parse(d));
  }
  const rest = () => {
    setwork((cur)=>false)
  }
  const work = () =>{
    setwork((cur)=>true)
  }
  const add_Todo = async () =>{
    if(text==""){
      return;
    }
      const newTodo: newTodo = Object.assign({}, todos, {
        [Date.now()]: { text: text},
      });
      settodos((cur) => newTodo);
      await saveTodos(newTodo);
      settext((cur) => "");
  }

  const addrest = async ()=>{
    const newrest: newTodo = {
      ...rests,
      [Date.now()]: { text: resttext},
    };
    setrests((cur) => newrest);
    await saverests(newrest);
    setresttext((cur) => "");
  }
  const changetext = (e:string) => {settext((cur)=>e)}
  const changeresttext = (e: string) => {
    setresttext((cur) => e);
  };
  return (
    <View style={mainstyle.container}>
      <View style={mainstyle.emptyheader}></View>
      <View style={mainstyle.top_BtnContainer}>
        <TouchableOpacity
          onPress={() => {
            work();
          }}
        >
          <Text
            style={working ? mainstyle.btn_pressed : mainstyle.btn_notpressed}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            rest();
          }}
        >
          <Text
            style={working ? mainstyle.btn_notpressed : mainstyle.btn_pressed}
          >
            Rest
          </Text>
        </TouchableOpacity>
      </View>
      <List 
      working={working} 
      resttext={resttext} 
      changeresttext={changeresttext}
      changetext={changetext} 
      text={text} 
      add_Todo={add_Todo} 
      addrest={addrest} 
      todos={todos} 
      rests={rests}/>
    </View>
  );
}


