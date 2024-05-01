import React, { useState } from 'react';
import { ListItem, ListItemText, TextField, ListItemSecondaryAction, Checkbox, styled } from '@material-ui/core';
import { EditIcon, DeleteIcon, SaveIcon, CancelIcon } from '@material-ui/icons';

function TodoItem({ task, onEditText, onEditCompleted, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.text);

    const handleSave = () => {
        onEditText(task.id, editedTask)
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask(task.text);
        setIsEditing(false);
    };

    // ListItemText 컴포넌트를 위한 취소선 스타일 적용
    const StyledListItemText = styled(ListItemText)({
        textDecoration: 'line-through', // 취소선 추가
    });

    return (
        <ListItem>
            <Checkbox
                checked={task.completed}
                onChange={() => onEditCompleted(task.id)}
            />

            {isEditing ? (
                <TextField
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    fullWidth
                />
            ) : (
                task.completed ? <StyledListItemText primary={task.text} />
                    : <ListItemText primary={task.text} />
            )}

            <ListItemSecondaryAction>
                {
                    isEditing ? (<>
                        <IconButton edge="end" aria-label="save" onClick={handleSave}>
                            <SaveIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="cancel" onClick={handleCancel}>
                            <CancelIcon />
                        </IconButton>
                    </>) : <>
                        <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default TodoItem;
