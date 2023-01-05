import React, { useState } from 'react';
import './RecipeModal.css'
import { motion, AnimatePresence } from 'framer-motion';
import { variantOpacity } from '../animations/variants'
import RecipeInfoModal from './RecipeInfoModal';
import { priceListI, recipeI, recipeIngrI } from '../interfaces/interfaces'
import RecipeItems from './RecipeItems';
import RecipeConfirmation from './RecipeConfirmation'
import AddRecipeItem from './AddRecipeItem';
import DeleteRecipeItem from './DeleteRecipeItem'
import RecipeDetails from './RecipeDetails';
import DeleteRecipe from './DeleteRecipe'
import AddConfirmation from './AddConfirmation';
import RecipeMissingIngr from './RecipeMissingIngr';
import RecipeListHelper from './RecipeListHelper';
import { binarySearch } from '../helpers/binarySearch';

interface Props {
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    showModalRecipeInfo: boolean,
    setShowModalRecipeInfo: React.Dispatch<React.SetStateAction<boolean>>,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    handleRecipe: (action: string, data: recipeIngrI | recipeI) => void,
    ingredientsRecipeArr: recipeIngrI[] | null,
    setIngredientsRecipeArr: React.Dispatch<React.SetStateAction<recipeIngrI[] | null>>,
    recipe: recipeI,
    showRecipeDetails: boolean,
    setShowRecipeDetails: React.Dispatch<React.SetStateAction<boolean>>,
    priceList: priceListI[],
    setShowModalAddItem: React.Dispatch<React.SetStateAction<boolean>>,
    missingIngrRecipe: string[],
    showModalMissingIngrRecipe: boolean,
    setShowModalMissingIngrRecipe: React.Dispatch<React.SetStateAction<boolean>>
}

const initialRow = {
    ingredient: '',
    amount: 0
}

const RecipeModal: React.FC<Props> = ({ setShowModalRecipe, setMsg, setShowModalMsg, user, handleRecipe, showModalRecipeInfo, setShowModalRecipeInfo, ingredientsRecipeArr, setIngredientsRecipeArr, recipe, showRecipeDetails, setShowRecipeDetails, priceList, setShowModalAddItem, missingIngrRecipe, showModalMissingIngrRecipe, setShowModalMissingIngrRecipe }) => {
    //important
    const [recipeRow, setRecipeRow] = useState<recipeIngrI>(initialRow);
    //modals
    const [showModalRecipeItems, setShowModalRecipeItems] = useState(false);
    const [showModalNewRecipeConfirmation, setShowModalNewRecipeConfirmation] = useState(false);
    const [showModalAddRecipeRow, setShowModalAddRecipeRow] = useState(false);
    const [showModalDeleteRecipeRow, setShowModalDeleteRecipeRow] = useState(false);
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const [updateRecipe, setUpdateRecipe] = useState(false);
    const [showDeleteRecipe, setShowDeleteRecipe] = useState(false);
    const [showModalPriceList, setShowModalPriceList] = useState(false)

    const filterRecipe = (data: recipeIngrI, action: string) => {
        const { ingredient, amount } = data;

        if (action === 'add') {
            let inPriceList = false,
                inIngredientArr = false,
                result = binarySearch(priceList, ingredient, 'item');

            if (result.length) inPriceList = true
            if (!inPriceList) {
                return setShowModalConfirmation(true)
            }

            if (ingredientsRecipeArr) {
                //i don't think that one recipe contains more than 100 ingredients... linear search it's fine for now
                for (let i = 0; i < ingredientsRecipeArr.length; i++) {
                    if (ingredientsRecipeArr[i].ingredient === ingredient) {
                        inIngredientArr = true
                        setMsg(`"${ingredient}" ya está en el presupuesto.`)
                        setShowModalMsg(true)
                        return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
                    }
                }

                if (!inIngredientArr) return setIngredientsRecipeArr([...ingredientsRecipeArr, { ingredient, amount }])
            }
            if (ingredientsRecipeArr === null) {
                return setIngredientsRecipeArr([{ ingredient, amount }])
            }
        }
        if (action === 'update') {
            //i don't think that one recipe contains more than 100 ingredients... linear search it's fine for now
            const arrCopy: recipeIngrI[] = JSON.parse(JSON.stringify(ingredientsRecipeArr))

            for (let i = 0; i < arrCopy.length; i++) {
                arrCopy[i].amount = Number(arrCopy[i].amount)

                if (arrCopy[i].ingredient === ingredient) {
                    arrCopy[i].amount = Number(amount)
                    break
                }
            }
            return setIngredientsRecipeArr(arrCopy)
        }
        if (action === 'remove') {
            //i don't think that one recipe contain more than 100 ingredients... linear search it's fine for now
            const arrCopy: recipeIngrI[] = JSON.parse(JSON.stringify(ingredientsRecipeArr))

            for (let i = 0; i < arrCopy.length; i++) {
                if (arrCopy[i].ingredient === ingredient) {
                    arrCopy.splice(i, 1)
                    break
                }
            }

            return setIngredientsRecipeArr(arrCopy)
        }
        if (action === 'save-recipe') {
            let recipeCopy: recipeI = JSON.parse(JSON.stringify(recipe))

            recipeCopy.ingredients = ingredientsRecipeArr
            setIngredientsRecipeArr(null)

            return handleRecipe('update', recipeCopy)
        }
        if (action === 'not-save-recipe') {
            setIngredientsRecipeArr(null)
            return handleRecipe('delete', recipe)
        }
    }

    return (
        <motion.div
            className='recipe-modal-container'
            variants={variantOpacity}
            initial='hide'
            animate='visible'
        >
            <AnimatePresence exitBeforeEnter>
                {showModalRecipeInfo &&
                    <RecipeInfoModal
                        setShowModalRecipeInfo={setShowModalRecipeInfo}
                        setShowModalRecipe={setShowModalRecipe}
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
                        user={user}
                        handleRecipe={handleRecipe}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalRecipeItems &&
                    <RecipeItems
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        ingredientsRecipeArr={ingredientsRecipeArr}
                        setShowModalNewRecipeConfirmation={setShowModalNewRecipeConfirmation}
                        setShowModalRecipe={setShowModalRecipe}
                        handleRecipe={handleRecipe}
                        recipe={recipe}
                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                        setRecipeRow={setRecipeRow}
                        setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        updateRecipe={updateRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowModalPriceList={setShowModalPriceList}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalNewRecipeConfirmation &&
                    <RecipeConfirmation
                        setShowModalNewRecipeConfirmation={setShowModalNewRecipeConfirmation}
                        setShowModalRecipe={setShowModalRecipe}
                        filterRecipe={filterRecipe}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalAddRecipeRow &&
                    <AddRecipeItem
                        recipeRow={recipeRow}
                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                        setRecipeRow={setRecipeRow}
                        filterRecipe={filterRecipe}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
                        recipe={recipe}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalDeleteRecipeRow &&
                    <DeleteRecipeItem
                        setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                        setRecipeRow={setRecipeRow}
                        recipeRow={recipeRow}
                        filterRecipe={filterRecipe}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showRecipeDetails &&
                    <RecipeDetails
                        setShowRecipeDetails={setShowRecipeDetails}
                        recipe={recipe}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        setShowModalRecipe={setShowModalRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowDeleteRecipe={setShowDeleteRecipe}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showDeleteRecipe &&
                    <DeleteRecipe
                        setShowDeleteRecipe={setShowDeleteRecipe}
                        setShowModalRecipe={setShowModalRecipe}
                        setShowRecipeDetails={setShowRecipeDetails}
                        handleRecipe={handleRecipe}
                        recipe={recipe}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalConfirmation &&
                    <AddConfirmation
                        setShowModalConfirmation={setShowModalConfirmation}
                        setShowModalAddItem={setShowModalAddItem}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalMissingIngrRecipe &&
                    <RecipeMissingIngr
                        missingIngrRecipe={missingIngrRecipe}
                        setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalPriceList &&
                    <RecipeListHelper
                        priceList={priceList}
                        setShowModalPriceList={setShowModalPriceList}
                    />
                }
            </AnimatePresence>
        </motion.div>
    );
};

export default RecipeModal;