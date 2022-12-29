import { createSlice } from '@reduxjs/toolkit'
export const todoReducer = createSlice({
    name: 'todo',
    initialState: {
        todoList: [
            {
                id: 1,
                content: "hit the gym"
            }
        ]
    },
    reducers: {
        addToDo: (state, action) => {
            let newTodoList = {
                id: Math.floor(Math.random() * 1000000000),
                content: action.payload.newContent
            }
            state.todoList.push(newTodoList);
        },
        deleteToDo: (state, action) => {
            console.log('delete task', action)
            let { todoList } = state;
            state.todoList = todoList.filter((item) =>
                item.id !== action.payload.id);
        },
        editTodo: (state, action) => {
            console.log('edit task', action)
            let { todoList } = state;
            state.todoList = todoList.map((item) =>
                item.id === action.payload.id ? action.payload : item);
        }
    },
})

export const { addToDo, deleteToDo, editTodo } = todoReducer.actions
export default todoReducer.reducer;