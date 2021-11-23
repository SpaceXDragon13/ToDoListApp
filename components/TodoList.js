import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import colors from '../Colors';
import TodoModal from "./TodoModal";
import * as Font from 'expo-font';

export default class TodoList extends React.Component { 

    state = {
        showListVisible: false,
        fontsLoaded: false
    };

    async loadFonts() {
        await Font.loadAsync({
            'AnnieUseYourTelescope-Regular' : require('../assets/fonts/AnnieUseYourTelescope-Regular.ttf'),   
            'MPLUS1-SemiBold' : require('../assets/fonts/MPLUS1-SemiBold.ttf'),  
        });
        this.setState({ fontsLoaded: true});
    }

    componentDidMount() {
        this.loadFonts();
    }

    
    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible});   
    }

    render() {
        
        const list = this.props.list;

        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount  = list.todos.length - completedCount;
        if(this.state.fontsLoaded) {
        return (
            <View>
                <Modal 
                    animationType = "slide"
                    visible={this.state.showListVisible}
                    onRequestClose={() => this.toggleListModal()}>
                        <TodoModal list={list} 
                                closeModal = {() => this.toggleListModal()}
                                updateList={this.props.updateList}
                        />
                </Modal>

                <TouchableOpacity style={[styles.listContainer, {backgroundColor: list.color}]}
                    onPress={() => this.toggleListModal()}>
                        <Text style={styles.listTitle} numberOfLines={1}>
                            {list.name}
                        </Text>

                    <View>
                        <View>
                            <Text style={[styles.count, {left: 80}]}>{remainingCount}</Text>
                            <Text style={[styles.subtitle, {left: 50}]}>Remaining Tasks</Text>               
                            <Text style={[styles.count, {right: 80}]}>{completedCount}</Text>
                            <Text style={[styles.subtitle, {right: 60}]}>Tasks Done</Text>               
                        </View>
                    </View>
                </TouchableOpacity>
            </View>           
        );
    } else {
        return null;
    }
    }
}


const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginHorizontal: 12,
        width: 360,
        height: 150,
        marginVertical: 10
    },

    listTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.white,
        textAlign: 'center',
        fontFamily: 'MPLUS1-SemiBold'
        
    },

    count: {
        position: 'absolute',
        fontSize: 48,
        fontWeight: "200",
        color: colors.white,
        fontFamily: 'AnnieUseYourTelescope-Regular'        
    },

    subtitle: {
        position: 'absolute',
        fontSize: 12,
        fontWeight: "normal",
        color: colors.white,
        top: 60,
        fontFamily: 'MPLUS1-SemiBold'
    },


});
