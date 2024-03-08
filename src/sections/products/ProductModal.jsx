import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
// import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
// import { Card, CardHeader, CardContent } from '@mui/material';
import { Button, TextField } from '@mui/material';

// import { fDate } from 'src/utils/format-time';

import { setUpdatedTask, taskModalClose, } from 'src/store/slices/taskSlice';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProductModal() {
    const isModalOpen = useSelector(state => state.task.isModalOpen)
    const selectedTask = useSelector(state => state.task.selectedTask)
    const dispatch = useDispatch()
    const [editedTask, setEditedTask] = React.useState({ ...selectedTask });
    const [isEditable, setIsEditable] = React.useState(false);
    const [unsavedChanges, setUnsavedChanges] = React.useState(false);

    const handleClose = () => {
        console.log("CLicked", unsavedChanges)
        if (unsavedChanges) {

            if (window.confirm('You have unsaved changes. Are you sure you want to close the modal?')) {
                dispatch(taskModalClose(false));
            }
        } else {
            dispatch(taskModalClose(false));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({
            ...editedTask,
            [name]: value,
        });

    };
    React.useEffect(() => {
        // Reset the edited task when the modal is opened
        setEditedTask({ ...selectedTask });
        // Reset unsavedChanges flag
        setUnsavedChanges(false);
    }, [isModalOpen, selectedTask]);

    const handleEdit = () => {
        dispatch(setUpdatedTask(editedTask));
        dispatch(taskModalClose(false));
        // setEditedTask(selectedTask)
    };

    const toggleEditMode = () => {
        setIsEditable(!isEditable);
        setUnsavedChanges(true);
    };
    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Task Details Information
                    </Typography>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        value={isEditable ? editedTask?.title : selectedTask?.title}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        value={isEditable ? editedTask?.description : selectedTask?.description}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                    />
                    <TextField
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        value={isEditable ? editedTask?.dueDate : selectedTask?.dueDate}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={!isEditable}
                    />
                    {isEditable ? (
                        <Button onClick={handleEdit}>Save</Button>
                    ) : (
                        <Button onClick={toggleEditMode}>Edit</Button>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
