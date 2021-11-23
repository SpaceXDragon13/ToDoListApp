import React from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput,
         TouchableOpacity, View } from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import colors from '../Colors';
import * as Font from 'expo-font';


export default class TodoModal extends React.Component {
    state = {
        newTodo: "" ,
        fontsLoaded: false
    };

    async loadFonts() {
        await Font.loadAsync({
            'BubblegumSans-Regular' : require('../assets/fonts/BubblegumSans-Regular.ttf'),
            'MPLUS1-Regular' : require('../assets/fonts/MPLUS1-Regular.ttf'),
            'MPLUS1-SemiBold' : require('../assets/fonts/MPLUS1-SemiBold.ttf'),
            'AnnieUseYourTelescope-Regular' : require('../assets/fonts/AnnieUseYourTelescope-Regular.ttf'),
        });
        this.setState({ fontsLoaded: true});
    }

    componentDidMount() {
        this.loadFonts();
    }
    
    addTodo = () => {
        let list = this.props.list;
        list.todos.push({title: this.state.newTodo, completed: false});

        this.props.updateList(list);
        this.setState({newTodo: ""});

        Keyboard.dismiss();
    };

    renderTodo = (todo, index) =>  {
        
        return (
            
            <View style={styles.todoContainer}>
        
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Ionicons name = {todo.completed ? 'checkmark-circle' : 'radio-button-off'}
                                     color = {todo.completed ? colors.emeraldGreen : colors.black}

                              size={24}
                              style={{width: 32}} />
                
                </TouchableOpacity>
                <Text style={[styles.todo, {textDecorationLine: todo.completed ? 'line-through' : 'none',
                             color: todo.completed ? colors.gray : colors.black}]}>
                             {todo.title}
                </Text>
            </View>
            
        ); 
    };

    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };

    render() {
     
        const list = this.props.list
        const taskCount = list.todos.length
        const completedCount = list.todos.filter(todo => todo.completed).length
        
        if(this.state.fontsLoaded) {
        return (
            
            <View style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', top:45, right: 32, zIndex: 10}}
                    onPress={this.props.closeModal}>
                    <AntDesign name ="close" size={24} color={colors.black} />
                </TouchableOpacity>
                
                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}> 
                    
                        <Text style={styles.title}>{list.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                        </Text>
                </View>
                
                <View style={[styles.section, {flex: 3}]}>
                    <FlatList 
                        data = { list.todos } 
                        keyExtractor ={item => item.title}
                        renderItem = {({item, index}) =>  this.renderTodo(item, index)}
                        contentContainerStyle = {{paddingHorizontal: 32, paddingVertical: 20}}
                        showHorizontalScrollIndicator = {false}
                    
                    />
                </View>
                

                <View style={[styles.section, styles.footer]}>
                       <TextInput style={[styles.input, {borderColor: list.color}]}
                           onChangeText={text => this.setState({newTodo: text})}
                           value={this.state.newTodo}
                           placeholder="Add a New Task.."
                       />

                        <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]}
                            onPress={() => this.addTodo()}>
                            <AntDesign name ="plus" size = {16} color = {colors.white} />
                        </TouchableOpacity>
                </View>
                
            </View>

        
        );
    } else {
        return null;
    }
    }
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: colors.alabaster
    },
    section: {
        alignSelf: "stretch",
    },
    header: {
        justifyContent: "center",
        marginHorizontal: 20,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black,
        marginTop: 30,
        textAlign: 'center',
        fontFamily: 'MPLUS1-SemiBold'
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "800",
        textAlign: 'center',
        fontFamily: 'MPLUS1-Regular'
    },
    footer: {
        paddingHorizontal: 0,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: -20
    },
    input: {
        position: 'absolute',
        height: 48,
        borderWidth: 3,
        width: 310,
        borderRadius: 6,
        top: -80,
        left: 10,
        fontSize: 20,
        backgroundColor: colors.white,
        paddingLeft: 15,
        fontSize: 20,
        fontFamily: 'BubblegumSans-Regular'
    },
    addTodo: {
        position: 'absolute',
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        top: -80,
        right: 0
        
    },
    todoContainer: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: "center",
    },
    todo: {
        color: colors.black,
        fontWeight: "500",
        fontSize: 30,
        fontFamily: 'AnnieUseYourTelescope-Regular'
    }
});