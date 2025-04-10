import styles from '../../components/present-single-recipe/PresentSingleRecipe.module.css';
import CustomButton from '../buttons/button/CustomButton.jsx';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';


function PresentSingleRecipe({singleRecipe, closeRecipe, deleteRecipe, editRecipe}) {
    const [editOpen, toggleEditOpen] = useState(false);
    const [title, setTitle] = useState(singleRecipe?.title || "");
    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {title: ""},
    });

    useEffect(() => {
        setTitle(singleRecipe?.title || "");
        setValue("title", singleRecipe?.title || "");
        toggleEditOpen(false);
    }, [singleRecipe, setValue]);

    function handleDeleteRecipe() {
        deleteRecipe(singleRecipe.rec.uri);
        closeRecipe();
    }

    function handleEditRecipe() {
        toggleEditOpen(true);
    }

    function handleEditSave(data) {
        const updatedRecipe = {...singleRecipe.rec, label: data.title};
        editRecipe(updatedRecipe.label, updatedRecipe.uri);
        setTitle(data.title);
        toggleEditOpen(false);
    }

    function handleCancelEdit() {
        toggleEditOpen(false);

    }


    function handleCloseRecipe() {
        closeRecipe();
    }


    return (
        <>
            <div className={styles['show-recipe']}>
                {singleRecipe && (
                    <>
                        <h5>{title}</h5>
                        <img
                            src={singleRecipe.rec.image}
                            alt={singleRecipe.rec.label}
                        />
                        <p>
                            <a
                                href={singleRecipe.rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Recipe website
                            </a>
                        </p>

                        <section className={styles['show-recipe-button-container']}>
                            {!editOpen && (
                                <>
                                    <CustomButton
                                        type="button"
                                        text="close"
                                        color="blue"
                                        onClick={handleCloseRecipe}
                                    />
                                    <CustomButton
                                        type="button"
                                        text="Edit"
                                        color="blue"
                                        onClick={handleEditRecipe}
                                    />
                                </>)}

                            {editOpen && (
                                <>
                                    <CustomButton
                                        type="button"
                                        text="cancel"
                                        color="blue"
                                        onClick={handleCancelEdit}
                                    />
                                    <CustomButton
                                        type="button"
                                        text="Erase from book"
                                        color="red"
                                        onClick={handleDeleteRecipe}
                                    />
                                </>)}
                        </section>

                        {editOpen &&
                            <form onSubmit={handleSubmit(handleEditSave)}>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    {...register("title")}
                                />
                                <CustomButton type="submit" text="Save" color="mint"/>
                            </form>
                        }
                    </>
                )}</div>
        </>
    );
}

    export default PresentSingleRecipe;