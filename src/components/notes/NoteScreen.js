import React from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title } = formValues;
    const activeId = useRef(note.id);
    const dispatch = useDispatch()

    useEffect(() => {
        if (activeId.current !== note.id) {
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues}));

    }, [formValues,dispatch])


   const handleDelete = ()=>{
    dispatch(startDeleting(note.id));
    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                ></textarea>


                {
                    note.url &&
                    <div className="notes__image">
                        <img
                            src={note.url}
                            alt="imagen"
                        />
                    </div>


                }


            </div>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
        </div>
    )
}
