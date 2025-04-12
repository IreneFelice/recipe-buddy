import styles from '../../components/present-single-recipe/PresentSingleRecipe.module.css';
import CustomButton from '../buttons/button/CustomButton.jsx';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';


function PresentSingleRecipe({singleRecipe, closeRecipe, deleteRecipe, editRecipe}) {
    const [editOpen, toggleEditOpen] = useState(false);
    const [title, setTitle] = useState(singleRecipe?.title || '');
    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {title: ''},
    });

    useEffect(() => {
        setTitle(singleRecipe?.title || '');
        setValue('title', singleRecipe?.title || '');
        toggleEditOpen(false);
    }, [singleRecipe, setValue]);

    console.log("single recipe ingredients:", singleRecipe.rec.ingredientLines);

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
            {singleRecipe && <div className={styles['show-recipe-outer-container']}>

                    <>
                        <h5>{title}</h5>
                        <div className={styles['image-container']}>
                            <img
                                src={singleRecipe.rec.image}
                                alt={singleRecipe.rec.label}
                            />
                        </div>
                        {!editOpen && (
                            <>
                                <p>
                                    <a
                                        href={singleRecipe.rec.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Visit Recipe website
                                    </a>
                                </p>
                                <ul className={styles['ingredients-list']}>
                                    {singleRecipe.rec.ingredientLines.map((ingredient, index) => (

                                        <li key={index}>
                                            {ingredient}
                                        </li>

                                    ))}
                                </ul>
                            </>)}

                        <section className={styles['show-recipe-button-container']}>
                            {!editOpen && (
                                <div className={styles['show-recipe-button-container']}>
                                    <CustomButton
                                        type='button'
                                        text='close'
                                        color='blue'
                                        onClick={handleCloseRecipe}
                                    />
                                    <CustomButton
                                        type='button'
                                        text='edit'
                                        color='blue'
                                        onClick={handleEditRecipe}
                                    />
                                </div>)}
                        </section>

                        {editOpen && (
                            <section className={styles['edit-open-container']}>

                                <form className={styles['edit-recipe-form']} onSubmit={handleSubmit(handleEditSave)}>
                                <span>
                                    <label>Edit title: </label>
                                <input
                                    type='text'
                                    {...register('title')}
                                />
                                </span>

                                    <CustomButton
                                        type='button'
                                        text='cancel'
                                        color='blue'
                                        onClick={handleCancelEdit}
                                    />

                                    <div className={styles['edit-button-container']}>
                                        <CustomButton
                                            type='button'
                                            text='delete recipe'
                                            color='red'
                                            onClick={handleDeleteRecipe}
                                        />

                                        <CustomButton type='submit' text='save' color='mint'/>


                                    </div>
                                </form>



                            </section>
                        )}
                    </>

            </div> }
        </>
    );
}

export default PresentSingleRecipe;