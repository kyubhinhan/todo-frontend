import React, { useState } from 'react';
import { ListItem, ListItemText, TextField, ListItemSecondaryAction, Checkbox, styled, IconButton } from '@material-ui/core';
import { Edit, Delete, Save, Cancel } from '@material-ui/icons';

function TodoItem({ task, onEditText, onEditCompleted, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.text);

    const handleSave = () => {
        onEditText(task._id, editedTask)
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
                onChange={() => onEditCompleted(task._id)}
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
                            <Save />
                        </IconButton>
                        <IconButton edge="end" aria-label="cancel" onClick={handleCancel}>
                            <Cancel />
                        </IconButton>
                    </>) : <>
                        <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
                            <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task._id)}>
                            <Delete />
                        </IconButton>
                    </>
                }
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default TodoItem;
