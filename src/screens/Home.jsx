import React, { useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Image } from "react-native";
import { TodoList } from "./TodoList";
import Add from '../icons/plus-icon.png';
import { useDispatch } from "react-redux";
import { addToDo } from "../redux/todoSlice";

export const Home = () => {
    const [text, setText] = useState();
    const dispatch = useDispatch();

    function handleSumbit() {
        dispatch(addToDo({ newContent: text }));
        setText('');
    }
    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.title}>Todo App</Text>
                <TodoList />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
                <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Write a task" />
                <TouchableOpacity style={styles.addBtn} onPress={handleSumbit}>
                    <Image source={Add} style={styles.icon} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#cccccc",
    },
    taskWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '70%',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#dc0b0b'
    },
    icon: {
        height: 20,
        width: 20,
        tintColor: '#2612dc'
    },
    taskContainer: {
        marginTop: 20
    },
    inputContainer: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        width: '70%',
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        borderColor: '#c0c0c0',
        borderWidth: 1
    },
    addBtn: {
        width: 60,
        height: 60,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#c0c0c0',
        borderWidth: 1
    }
});