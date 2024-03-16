import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
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
import { useRef, useEffect, useState } from "react";
import { HeaderBackButton } from "@react-navigation/elements";
import { set } from "mongoose";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RouteProp } from "@react-navigation/native";

const DetailScreen = () => {
    
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { text, key} = route.params;
    const [edittext, setedittext] = useState<string>(text);

      const saveTodos = async (key:string,element:string) => {
        if (text == "") {
              return;
        }
        const d = await AsyncStorage.getItem("@todosave");
        if (d === null) {
          return;
        }
        const todos = JSON.parse(d);
        todos[key].text=element;
        const data = JSON.stringify(todos);
        await AsyncStorage.setItem("@todosave", data);
        navigation.goBack(null);
      };
    const changetext = (e: string) => {
        setedittext((cur) => e);
    };
    
return (
  <View style={mainstyle.container}>
    <View style={{padding:20}}></View>
    <View style={mainstyle.insider}>
      <TextInput
        returnKeyType="done"
        onChangeText={changetext}
        value={edittext}
        onSubmitEditing={()=>{
            saveTodos(key,edittext);
            setedittext("");
        }
        }
        placeholder={
          text
        }
        autoCorrect={false}
        style={mainstyle.input}
      />
    </View>
  </View>
);
}


export default DetailScreen;