import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { useRef, useEffect, useState, } from "react";
import React from "react";
import mainstyle from "./css/mainstyle";
import Checkbox from "expo-checkbox";

interface newTodo {
  [datenow: string]: { text: string; work: boolean; complete: boolean };
}

const List = (props: {
  working: boolean;
  resttext: string;
  changeresttext: (e: string) => void;
  changetext: (e: string) => void;
  text: string;
  add_Todo: () => void;
  deleteTodos: (key: string) => void;
  todos: newTodo;
  completeTodos: (key: string)=> void;
  deleteAllTodos: (state: boolean) => void;
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const textAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
      
    }, [props.working]);
    useEffect(() => {
      textAnim.setValue(0);
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [props.todos]);
  return (
    <Animated.View style={{ ...mainstyle.main, opacity: fadeAnim }}>
      <View style={mainstyle.insider}>
        <TextInput
          returnKeyType="done"
          onChangeText={props.changetext}
          value={props.text}
          onSubmitEditing={props.add_Todo}
          placeholder={
            props.working ? "Add your To Do List!" : "How do you want to Rest?"
          }
          autoCorrect={false}
          style={mainstyle.input}
        />
      </View>
      <Animated.ScrollView style={{ flex: 7, opacity: textAnim }}>
        {props.todos ? (
          <>
            {Object.keys(props.todos).map((k) => {
              const todo = props.todos[k as keyof typeof props.todos];
              if (todo.complete === false && todo.work === props.working) {
                return (
                  <View key={k} style={mainstyle.lists}>
                    <Checkbox
                      value={todo.complete}
                      onValueChange={() => {
                        props.completeTodos(k as string);
                      }}
                    />
                    <Text style={mainstyle.lists_text}>{todo.text}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.deleteTodos(k as string);
                      }}
                    >
                      <EvilIcons name="trash" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return null;
              }
            })}
            {Object.keys(props.todos).map((k) => {
              const todo = props.todos[k as keyof typeof props.todos];
              if (todo.complete === true && todo.work === props.working) {
                return (
                  <View key={k} style={mainstyle.lists}>
                    <Checkbox
                      value={todo.complete}
                      onValueChange={() => {
                        props.completeTodos(k as string);
                      }}
                    />
                    <Text style={mainstyle.lists_text_completed}>
                      {todo.text}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.deleteTodos(k as string);
                      }}
                    >
                      <EvilIcons name="trash" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return null;
              }
            })}
          </>
        ) : (
          <View></View>
        )}
      </Animated.ScrollView>
      <View style={mainstyle.Delete_all}>
        <TouchableOpacity
          onPress={() => {
            props.deleteAllTodos(props.working as boolean);
          }}
        >
          <EvilIcons name="trash" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};


export default List;