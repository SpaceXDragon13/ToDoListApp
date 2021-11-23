import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import {AntDesign} from '@expo/vector-icons'
import colors from "./Colors";
import tempData from "./tempData";
import TodoList from './components/TodoList';
import AddListModal from "./components/AddListModal";
import * as Font from 'expo-font';

export default class App extends React.Component {  

    state = {
        addTodoVisible: false,
        lists: tempData,
        fontsLoaded: false
    };

    async loadFonts() {
        await Font.loadAsync({
            'BubblegumSans-Regular' : require('./assets/fonts/BubblegumSans-Regular.ttf'),              
            'MPLUS1-SemiBold' : require('./assets/fonts/MPLUS1-SemiBold.ttf')
        });
        this.setState({ fontsLoaded: true});
    }

    componentDidMount() {
        this.loadFonts();
    }


    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible});   
    }

    renderList = list =>  {
        return <TodoList list = {list} updateList={this.updateList}/> 
    }

    addList = list => {
        this.setState({ list: [... this.state.list, { ...list, id: this.state.list.length + 1, todos: [] }] });
    };

    updateList = list => {
        this.setState({
            list: this.state.lists.map(item => {
                return item.id === list.id ? list : item
            })
        });
    };

    render () {
        if(this.state.fontsLoaded) {
        
        return (
            <View style={{backgroundColor: colors.alabaster, width: 411, height: 731}}>
                <Modal 
                    animationType = "slide"
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddTodoModal()}>
                        <AddListModal closeModal = {() => this.toggleAddTodoModal()} 
                            addList={this.addList}
                        />
                </Modal>

                <View style = {{ flexDirection: "row" }}>
                    
                    <Text style = {styles.title}>
                        JustDoIt: <Text style = {{fontWeight: "300", color: colors.indianRed}}>ToDoList</Text>
                    </Text>
                   
                 </View>

                 <View style = {{marginVertical: 40}}>
                    <TouchableOpacity style ={styles.addList} onPress={() => this.toggleAddTodoModal()}> 
                        <AntDesign name ="plus" size = {16} color = {colors.black} />
                    </TouchableOpacity>

                <Text style = {styles.add}>Add List</Text>
                 </View>

                 <View style = {{height: 400, paddingHorizontal: 10}}>
                     <FlatList 
                     data = { this.state.lists } 
                     keyExtractor ={item => item.name} 
                     vertical= {true} 
                     showsVerticalScrollIndicator ={false} 
                     renderItem = {({item}) =>  this.renderList(item)}
                     keyboardShouldPersistTaps="always"
                     />
                 </View>
             </View>
        );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create ({
    title: {
        fontSize: 45,
        fontWeight: "normal",
        color: colors.myrtleGreen,
        paddingHorizontal: 35,
        marginTop: 40,
        fontFamily: 'BubblegumSans-Regular'
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.black,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 176,
        backgroundColor: colors.white,
        
    },
    add: {
        color: colors.black,
        fontWeight: "normal",
        fontSize: 14,
        marginTop: 8,
        marginHorizontal: 176,
        fontFamily: 'MPLUS1-SemiBold'

    }
});