import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Pressable,
  StyleSheet,
  Alert,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import mainstyle from "../css/mainstyle";
import { useRef, useEffect, useState} from "react";
import List from "../List";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useIsFocused } from "@react-navigation/native";
interface newTodo {
  [datenow: string]: { text: string; work: boolean; complete: boolean };
}
const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [working, setwork] = useState<boolean>(true);
  const [text, settext] = useState<string>("");
  const [resttext, setresttext] = useState<string>("");
  const [todos, settodos] = useState<newTodo>({});
    const isFocused = useIsFocused();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    loadTodos();
  }, [isFocused]);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const saveTodos = async (saving: newTodo) => {
    const data = JSON.stringify(saving);
    await AsyncStorage.setItem("@todosave", data);
  };
  const loadTodos = async () => {
    const d = await AsyncStorage.getItem("@todosave");
    if (d === null) {
      return;
    }
    settodos((cur) => JSON.parse(d));
  };
  
  const deleteTodos = async (key: string) => {
    Alert.alert("Delete To do:", `${todos[key].text}`, [
      { text: "Cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const newtodos = { ...todos };
          delete newtodos[key];
          settodos((cur) => newtodos);
          await saveTodos(newtodos);
        },
      },
    ]);
  };
  const deleteAllTodos = async (state: boolean) => {
    Alert.alert(`Delete all ${state ? "Work" : "Rest"} To dos`, "", [
      { text: "Cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const newtodos = { ...todos };
          Object.keys(newtodos).forEach((key) => {
            if (newtodos[key].work == state) {
              delete newtodos[key];
            }
          });
          settodos((cur) => newtodos);
          await saveTodos(newtodos);
        },
      },
    ]);
  };
  const completeTodos = async (key: string) => {
    const newtodos = { ...todos };
    newtodos[key].complete = !newtodos[key].complete;
    settodos((cur) => newtodos);
    await saveTodos(newtodos);
  };
  const rest = () => {
    setwork((cur) => false);
  };
  const work = () => {
    setwork((cur) => true);
  };
  const add_Todo = async () => {
    if (text == "") {
      return;
    }
    const newTodo: newTodo = Object.assign({}, todos, {
      [Date.now()]: { text: text, work: working, complete: false },
    });
    settodos((cur) => newTodo);
    await saveTodos(newTodo);
    settext((cur) => "");
  };
  const changetext = (e: string) => {
    settext((cur) => e);
  };
  const changeresttext = (e: string) => {
    setresttext((cur) => e);
  };
  const godetail = (key: string)=>{
    const todo = todos[key]
    navigation.navigate("Details",{
        text : todo.text,
        key:key,
    })
  }
  return (
        <Animated.View style={mainstyle.container} >
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
      deleteTodos={deleteTodos}
      todos={todos} 
      completeTodos={completeTodos}
      deleteAllTodos={deleteAllTodos}
      godetail={godetail}
/>
    </Animated.View>
  );
};

export default HomeScreen;
