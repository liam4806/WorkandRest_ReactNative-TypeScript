import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const mainstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    flexDirection: "column",
  },
  emptyheader: {
    flex: 0.5,
  },
  btn_pressed: {
    color: "#ffffff",
    fontSize: 45,
    fontWeight: "600",
  },
  btn_notpressed: {
    color: "#969696",
    fontSize: 45,
    fontWeight: "600",
  },
  main: {
    flex: 5,
    backgroundColor: "#000",
  },
  top_BtnContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  input:{
    backgroundColor: "white",
    paddingHorizontal:20,
    paddingVertical:15,
    borderRadius: 40,
    fontSize:16,
    marginBottom:20,
  },
  insider:{
    paddingHorizontal:20,
  },
  lists_text:{
    color:"white",
    fontSize:25,
    fontWeight:"500",
  },
  lists:{
    backgroundColor: "#656363aa",
    marginBottom:15,
    marginHorizontal:20,
    paddingVertical:15,
    paddingHorizontal:30,
    borderRadius:20,
  }
});

export default mainstyle;