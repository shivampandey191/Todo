import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, Pressable, TextInput, FlatList, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Delete from "../icons/delete-icon.png"
import Edit from "../icons/edit-icon.png"
import ViewIcon from "../icons/view-icon.png"
import { deleteToDo, editTodo } from "../redux/todoSlice";

export function TodoList() {
    const todos = useSelector((state) => state.todo.todoList);
    const [currentTodo, setCurrentTodo] = useState({
        content: '',
        id: null
    })
    const [modalVisible, setModalVisible] = useState(false);
    const [secondModal, setSecondModal] = useState(false);
    const [visibleTodo, setVisibleTodo] = useState('');
    const dispatch = useDispatch();

    function deleteTodo(todo) {
        dispatch(deleteToDo({ id: todo.id }));
    }

    function setEditEnabled(todo) {
        setCurrentTodo({ ...currentTodo, content: todo.content, id: todo.id })
        setModalVisible(true)
    }
    function editTodoText() {
        dispatch((editTodo({ content: currentTodo.content, id: currentTodo.id })));
        setModalVisible(false)
    }
    function viewTodo(todo) {
        setVisibleTodo(todo)
        setSecondModal(true)
    }

    if (!todos.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Start creating a new todo</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {todos.map((todo, index) => (
                    <View style={styles.item} key={todo.id}>
                        <View style={styles.itemLeft}>
                            <TouchableOpacity onPress={() => setEditEnabled(todo)}>
                                <Image source={Edit} style={styles.icon} />
                            </TouchableOpacity>
                            <Text>{index + 1} .</Text>
                            <Text numberOfLines={1} style={styles.text}> {todo.content}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => deleteTodo(todo)}>
                                <Image source={Delete} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => viewTodo(todo.content)}>
                                <Image source={ViewIcon} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput style={styles.input} value={currentTodo.content} onChangeText={(val) => setCurrentTodo({ ...currentTodo, content: val })} />
                        <View style={styles.row}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => editTodoText()}
                            >
                                <Text style={styles.textStyle}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={secondModal}
                onRequestClose={() => {
                    setSecondModal(!secondModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}> {visibleTodo}</Text>
                        <View style={styles.row}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setSecondModal(!secondModal)}
                            >
                                <Text style={styles.textStyle}>Okay</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000"
    },
    todoText: {
        color: '#000'
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '97%'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    icon: {
        height: 16,
        width: 16,
        marginRight: 10,
        tintColor: '#2612dc'
    },
    text: {
        maxWidth: '70%',
        width: '70%',
        fontWeight: 'bold'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 4,
        backgroundColor: '#2612dc'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2612dc",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        width: '70%',
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderColor: '#c0c0c0',
        borderWidth: 1,
        color: '#000'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20
    }
});