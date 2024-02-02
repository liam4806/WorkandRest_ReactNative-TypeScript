import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, } from "react";
import React from "react";
import mainstyle from "./css/mainstyle";

interface newTodo {
  [datenow: string]: { text: string;};
}

const List = (props: {
  working: boolean;
  resttext: string;
  changeresttext: (e: string) => void;
  changetext: (e: string) => void;
  text: string;
  add_Todo: () => void;
  addrest: ()=>void;
  todos: newTodo;
  rests: newTodo;
}) => {
  return (
    <View style={mainstyle.main}>
          <View style={mainstyle.insider}>
            <TextInput
              returnKeyType="done"
              onChangeText={
                props.working ? props.changetext : props.changeresttext
              }
              value={props.working ? props.text : props.resttext}
              onSubmitEditing={props.working ? props.add_Todo : props.addrest}
              placeholder={
                props.working
                  ? "Add your To Do List!"
                  : "How do you want to Rest?"
              }
              autoCorrect={false}
              style={mainstyle.input}
            />
          </View>
          <ScrollView>
            {props.working
              ? Object.keys(props.todos).map((k) => (
                  <View style={mainstyle.lists} key={k}>
                    <Text style={mainstyle.lists_text}>
                      {props.todos[k as keyof typeof props.todos].text}
                    </Text>
                  </View>
                ))
              : Object.keys(props.rests).map((k) => (
                  <View style={mainstyle.lists} key={k}>
                    <Text style={mainstyle.lists_text}>
                      {props.rests[k as keyof typeof props.rests].text}
                    </Text>
                  </View>
                ))}
          </ScrollView>
        </View>
  );
};


export default List;