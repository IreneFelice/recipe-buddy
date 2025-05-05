import styles from '../../components/present-single-recipe/PresentSingleRecipe.module.css';
import CustomButton from '../buttons/button/CustomButton.jsx';
import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {SavedRecipesContext} from '../../context/SavedRecipesContext.jsx';


function PresentSingleRecipe({singleRecipe, closeRecipe}) {
    const {updateRecipe, removeRecipe} = useContext(SavedRecipesContext);
    const [editOpen, toggleEditOpen] = useState(false);
    const [title, setTitle] = useState(singleRecipe?.title || '');
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        clearErrors
    } = useForm();

    // Get title after title click in list
    useEffect(() => {
        setTitle(singleRecipe?.title || '');
        setValue('title', singleRecipe?.title || '');
        toggleEditOpen(false);
    }, [singleRecipe, setValue]);

    function handleDeleteRecipe() {
        removeRecipe(singleRecipe.rec.uri);
        closeRecipe();
    }

    // Edit button click
    function handleEditRecipe() {
        clearErrors('title');
        toggleEditOpen(true);
    }

    // save custom title to label-key in backend list
    async function handleEditSave(data) {
        try {
           const updatedRecipe = {...singleRecipe.rec, label: data.title};

        const success = await updateRecipe(updatedRecipe.label, updatedRecipe.uri);
        if (success) {
            setTitle(data.title);
            toggleEditOpen(false);
        } else { //error handling in SavedRecipesContext
            closeRecipe();
        }
    } catch (error) {
       console.error('Error while saving edit: ', error);
           closeRecipe();
       }
    }

    function handleCancelEdit() {
        toggleEditOpen(false);
    }

    function handleCloseRecipe() {
        closeRecipe();
    }


    return (
        <>
            {singleRecipe && <article className={styles['show-recipe-outer-container']}>

                <div className={styles['show-recipe-inner-container']}>
                <h2 className={styles['recipe-title']}>{title.length > 40 ? title.slice(0, 40) + '…' : title}</h2>

                <div className={styles['image-container']}>
                    <img
                        src={singleRecipe.rec.image}
                        alt={singleRecipe.rec.label}
                    />
                </div>

            </div>

                {!editOpen && (
                    <>
                        <div className={styles['conditional-details']}>
                            <p className={styles['recipe-link']}>
                                <a
                                    href={singleRecipe.rec.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Visit Recipe website
                                </a>
                                <span>➡️</span>
                            </p>

                            <h3 className={styles.subtitle}>Ingredients: </h3>
                            <ul className={styles['ingredients-list']}>
                                {singleRecipe.rec.ingredientLines.map((ingredient, index) => (
                                    <li key={index}>
                                        <p>{ingredient}</p>
                                    </li>

                                ))}
                            </ul>
                        </div>
                        <div className={styles['show-recipe-button-container']}>
                            <CustomButton
                                type='button'
                                text='edit'
                                color='blue'
                                onClick={handleEditRecipe}
                            />
                            <CustomButton
                                type='button'
                                text='close'
                                color='blue'
                                onClick={handleCloseRecipe}
                            />
                        </div>
                    </>
                )}


                {editOpen && (
                    <section className={styles['edit-open-container']}>

                        <form className={styles['edit-recipe-form']} onSubmit={handleSubmit(handleEditSave)}>
                                <span>
                                    <label>Edit title: </label>
                                <input
                                    type='text'
                                    className={styles['form-input']}
                                    {...register('title', {
                                        maxLength: {
                                            value: 40,
                                            message: "The title can't be longer than 40 characters."
                                        }
                                    })}

                                />
                                </span>
                            {errors.title && <p className={styles.error}>{errors.title.message}</p>}


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
                                <CustomButton
                                    type='submit'
                                    text='save'
                                    color='mint'
                                />
                            </div>
                        </form>

                    </section>
                )}

            </article>
            }
        </>
    )
        ;
}

export default PresentSingleRecipe;