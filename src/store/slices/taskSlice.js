import { sub } from 'date-fns'
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid, createSlice } from '@reduxjs/toolkit'

const initialState = {
    isModalOpen: false,
    selectedTask: {},
    tasks: [
        {
            id: nanoid(),
            title: 'Task Title 1',
            description: 'This is task description. Demo description for task 1',
            dueDate: sub(new Date(), { minutes: 30 }).toISOString(),
            status: 'active',
            date: sub(new Date(), { minutes: 5 }).toISOString(),
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
            },
        },
        {
            id: nanoid(),
            title: 'Task Title 2',
            description: 'This is task description. Demo description for task 2',
            dueDate: sub(new Date(), { minutes: 10 }).toISOString(),
            date: sub(new Date(), { minutes: 5 }).toISOString(),
            status: 'completed',
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
            },
        },
        {
            id: nanoid(),
            title: 'Task Title 3',
            description: 'This is task description. Demo description for task 3',
            dueDate: sub(new Date(), { minutes: 15 }).toISOString(),
            date: sub(new Date(), { minutes: 45 }).toISOString(),
            status: 'active',
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
            },
        },
    ]
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        taskAdded: {
            reducer(state, action) {
                state.tasks.push(action.payload);
            },
            prepare(title, description, dueDate) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        description,
                        dueDate,
                        status: "active",
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,

                        }
                    }
                }
            }
        },
        taskDeleted: {
            reducer(state, action) {
                const taskId = action.payload;
                state.tasks = state.tasks.filter(task => task.id !== taskId);
            }
        },
        updateStatus: {
            reducer(state, action) {
                const taskId = action.payload;
                const taskToUpdate = state.tasks.find(task => task.id === taskId);
                if (taskToUpdate) {
                    taskToUpdate.status = 'completed'
                }
            }
        },
        reactionToAdded: {
            reducer(state, action) {
                const { taskId, reaction } = action.payload
                const existingPost = state.tasks.find(task => task.id === taskId);
                if (existingPost) {
                    // eslint-disable-next-line no-plusplus
                    existingPost.reactions[reaction]++
                }
            }
        },
        taskModalOpen: {
            reducer(state, action) {
                state.isModalOpen = action.payload; // Toggle isModelOpen property
            },
        },
        taskModalClose: {
            reducer(state, action) {
                state.isModalOpen = action.payload; // Toggle isModelOpen property
            },
        },
        setSelectedTask: {
            reducer(state, action) {
                state.selectedTask = action.payload
            }
        },
        setUpdatedTask: {
            reducer(state, action) {
                const updatedTask = action.payload;

                const index = state.tasks.findIndex(task => task.id === updatedTask.id);
                if (index !== -1) {
                    // Update the task at the found index
                    state.tasks[index] = updatedTask;
                }

            }
        }

    }
})

export const selectAllTasks = (state) => state.task.tasks
export const { taskAdded, taskDeleted, reactionToAdded, updateStatus, taskModalOpen, taskModalClose, setSelectedTask, setUpdatedTask } = taskSlice.actions
export default taskSlice.reducer