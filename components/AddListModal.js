import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import tempData from "../tempData";
import * as Font from 'expo-font';

export default class AddListModal extends React.Component {
   
    backgroundColors = ["#E09391", "#E9A475", "#E4CE80", "#94C499", "#4883D2", "#A19AD1", "#A17E79"];
    
    state = {
        name: "",
        color: this.backgroundColors[0],
        fontsLoaded: false
    };

    async loadFonts() {
        await Font.loadAsync({
            'BubblegumSans-Regular' : require('../assets/fonts/BubblegumSans-Regular.ttf'),
            'MPLUS1-SemiBold' : require('../assets/fonts/MPLUS1-SemiBold.ttf'),
        });
        this.setState({ fontsLoaded: true});
    }

    componentDidMount() {
        this.loadFonts();
    }
 
    createTodo = () => {
        const {name, color} = this.state;
 
        tempData.push({
            name,
            color,
            todos: []
        });
        
        this.setState({name: ""})
        this.props.closeModal();
    };
 
    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, {backgroundColor: color}]}
                    onPress={() => this.setState({color})} />
            )
        })
    };
 
    render() {
        if(this.state.fontsLoaded) {
        return (
            <KeyboardAvoidingView style = {styles.container} >
                <TouchableOpacity style={{position: "absolute", top: 64, 
                    right: 32,}} onPress={this.props.closeModal}>
                    <AntDesign name ="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
                    <Text style={styles.title}>Create a New List</Text>
 
                    <TextInput style={styles.input}
                                placeholder= "Add a New List..."
                                onChangeText={text => this.setState({name: text})} />
                   
                    <View style ={{flexDirection: "row", justifyContent: "space-between", marginTop: 0}}>
                        {this.renderColors()}
                    </View>
 
                    <TouchableOpacity style={[styles.create, {backgroundColor: this.state.color}]}
                        onPress={this.createTodo}>
                        <Text style={{color: colors.white, fontWeight: "600"}}>Create!</Text>
                    </TouchableOpacity>
                </View>
                
            </KeyboardAvoidingView>
        ); 
        } else {
            return null;
        }
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.alabaster
    },
    title: {
        fontSize: 28,
        fontWeight: "normal",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16,
        fontFamily: 'MPLUS1-SemiBold'
  
    },
    input: {
        borderWidth: 3,
        borderColor: colors.blue,
        borderRadius: 10,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 20,
        backgroundColor: colors.white,
        fontFamily: 'BubblegumSans-Regular'
    },
    create: {
        marginTop:  24,
        height: 50,
        borderRadius: 6,
        top: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width:  30,
        height: 30,
        borderRadius: 4,
        top: 30
    }
 
});