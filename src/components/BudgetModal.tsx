import React, { useState } from 'react';
import BudgetConfirmation from './BudgetConfirmation';
import BudgetInfoModal from './BudgetInfoModal';
import BudgetItems from './BudgetItems';
import './BudgetModal.css'
import { ingredientI, budgetListI, budgetI, priceListI, recipeI } from '../interfaces/interfaces'
import AddBudgetItem from './AddBudgetingredient';
import DeleteBudgetItem from './DeleteBudgetItem';
import BudgetDetails from './BudgetDetails';
import DeleteBudget from './DeleteBudget';
import AddConfirmation from './AddConfirmation';
import { motion, AnimatePresence } from 'framer-motion';
import { variantOpacity } from '../animations/variants'
import ChooseRecipe from './ChooseRecipe';
import MissingIngredients from './MissingIngredients';
import { binarySearch } from '../helpers/binarySearch';

interface Props {
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    handleBudget: (action: string, data: ingredientI | budgetListI) => void,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    budget: budgetI,
    priceList: priceListI[],
    ingredientsArr: ingredientI[] | null,
    setIngredientsArr: React.Dispatch<React.SetStateAction<ingredientI[] | null>>,
    showBudgetDetails: boolean,
    setShowBudgetDetails: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalBudgetInfo: React.Dispatch<React.SetStateAction<boolean>>,
    showModalBudgetInfo: boolean,
    setShowModalAddItem: React.Dispatch<React.SetStateAction<boolean>>,
    allRecipes: recipeI[] | null
}

const initialRow = {
    ingredient: '',
    amount: 0,
    cost: 0
}

const BudgetModal: React.FC<Props> = ({ setShowModalBudget, user, handleBudget, setMsg, setShowModalMsg, budget, priceList, ingredientsArr, setIngredientsArr, showBudgetDetails, setShowBudgetDetails, setShowModalBudgetInfo, showModalBudgetInfo, setShowModalAddItem, allRecipes }) => {
    //important
    const [budgetRow, setBudgetRow] = useState<ingredientI>(initialRow);
    const [priceListItem, setPriceListItem] = useState<priceListI | null>(null);
    const [recipeChoosen, setRecipeChoosen] = useState<budgetI | null>(null);
    const [manual, setManual] = useState(true);
    const [updateBudget, setUpdateBudget] = useState(false);
    const [missingIngr, setMissingIngr] = useState<string[]>([]);
    //modals
    const [showModalBudgetItems, setShowModalBudgetItems] = useState(false);
    const [showModalNewBudgetConfirmation, setShowModalNewBudgetConfirmation] = useState(false);
    const [showModalAddBudgetRow, setShowModalAddBudgetRow] = useState(false);
    const [showModalDeleteBudgetRow, setShowModalDeleteBudgetRow] = useState(false);
    const [showDeleteBudget, setShowDeleteBudget] = useState(false);
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const [showModalChooseRecipe, setShowModalChooseRecipe] = useState(false);
    const [showModalMissingIngr, setShowModalMissingIngr] = useState(false);

    const filterBudget = (data: ingredientI, action: string, type: string, priceItem?: priceListI) => {
        let { ingredient, amount, cost } = data

        if (type === 'manual') {
            if (action === 'add') {
                let inPriceList = false,
                    inIngredientArr = false,
                    result: priceListI[] = binarySearch(priceList, ingredient, 'item');

                if (result.length) {
                    const { price, unit } = result[0],
                        costCalculation = Number((((amount * Number(price)) / Number(unit))).toFixed(2));

                    inPriceList = true
                    cost = costCalculation
                }

                if (!inPriceList) {
                    return setShowModalConfirmation(true)
                }
                if (ingredientsArr) {
                    for (let i = 0; i < ingredientsArr.length; i++) {
                        if (ingredientsArr[i].ingredient === ingredient) {
                            inIngredientArr = true
                            setMsg(`"${ingredient}" ya está en el presupuesto.`)
                            setShowModalMsg(true)
                            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
                        }
                    }

                    if (!inIngredientArr) return setIngredientsArr([...ingredientsArr, { ingredient, amount, cost }])
                }
                if (ingredientsArr === null) {
                    return setIngredientsArr([{ ingredient, amount, cost }])
                }
            }
            if (action === 'update') {
                let arrCopy: ingredientI[] = JSON.parse(JSON.stringify(ingredientsArr)),
                    index = 0;

                arrCopy.forEach((obj, i) => {
                    let {amount, cost, ingredient: uIngredient} = obj

                    if(ingredient === uIngredient) index = i

                    amount = Number(amount)
                    cost = Number(cost) 
                })

                const result: priceListI[] = binarySearch(priceList, ingredient, 'item')

                if(result.length){
                    let price: number = Number(result[0].price), unit: number = Number(result[0].unit),
                        costCalculation = Number( ( ( ( amount * price ) / unit ) ).toFixed(2));

                    arrCopy[index].amount = amount
                    arrCopy[index].cost = costCalculation
                }

                return setIngredientsArr(arrCopy)
            }
            if (action === 'remove') {
                const arrCopy: ingredientI[] = JSON.parse(JSON.stringify(ingredientsArr))

                for (let i = 0; i < arrCopy.length; i++) {
                    if (arrCopy[i].ingredient === ingredient) {
                        arrCopy.splice(i, 1)
                        break
                    }
                }

                return setIngredientsArr(arrCopy)
            }
            if (action === 'save-budget') {
                let budgetCopy: budgetI = JSON.parse(JSON.stringify(budget)),
                    total = ingredientsArr !== null ? ingredientsArr.reduce((acum, curr) => Number((acum + curr.cost).toFixed(2)), 0) : 0;

                budgetCopy.ingredients = ingredientsArr
                budgetCopy.total = String(total)
                setIngredientsArr(null)

                return handleBudget('update', budgetCopy)
            }
            if (action === 'not-save-budget') {
                setIngredientsArr(null)
                return handleBudget('delete', budget)
            }
        }
        if (type === 'fast') {
            if (action === 'add') {
                let inPriceList = false,
                    inIngredientArr = false,
                    { ingredients } = recipeChoosen!,
                    result: priceListI[] = binarySearch(priceList, ingredient, 'item');

                if (result.length) {
                    const { price, unit } = result[0],
                        costCalculation = Number((((amount * Number(price)) / Number(unit))).toFixed(2));

                    inPriceList = true
                    cost = costCalculation
                }
                if (!inPriceList) {
                    return setShowModalConfirmation(true)
                }
                if (ingredients) {
                    for (let i = 0; i < ingredients.length; i++) {
                        if (ingredients[i].ingredient === ingredient) {
                            inIngredientArr = true
                            setMsg(`"${ingredient}" ya está en el presupuesto.`)
                            setShowModalMsg(true)
                            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
                        }
                    }

                    if (!inIngredientArr) {
                        const recipeCopy: budgetI = JSON.parse(JSON.stringify(recipeChoosen))
                        recipeCopy.ingredients?.push({ ingredient, amount, cost })

                        return setRecipeChoosen(recipeCopy)
                    }
                }
                // if (ingredients === null) {
                //     return setRecipeChoosen([{ ingredient, amount, cost }])
                // }
            }
            if (action === 'update') {
                let recipeCopy: budgetI = JSON.parse(JSON.stringify(recipeChoosen)),
                    ingredients = recipeCopy.ingredients!,
                    index = 0;

                ingredients.forEach((obj, i) => {
                    let {amount, cost, ingredient: uIngredient} = obj;

                    if(ingredient === uIngredient) index = i

                    amount = Number(amount)
                    cost = Number(cost)
                })

                const result: priceListI[] = binarySearch(priceList, ingredient, 'item')

                if(result.length){
                    let price: number = Number(result[0].price), unit: number = Number(result[0].unit),
                        costCalculation = Number( ( ( ( amount * price ) / unit ) ).toFixed(2));

                    ingredients[index].amount = amount
                    ingredients[index].cost = costCalculation
                }

                return setRecipeChoosen(recipeCopy)
            }
            if (action === 'remove') {
                let recipeCopy: budgetI = JSON.parse(JSON.stringify(recipeChoosen)),
                    ingredients = recipeCopy.ingredients!

                for (let i = 0; i < ingredients.length; i++) {
                    let singleIngr = ingredients[i]

                    if (singleIngr.ingredient === ingredient) {
                        ingredients.splice(i, 1)
                        break
                    }
                }

                return setRecipeChoosen(recipeCopy)
            }
            if (action === 'save-budget') {
                let recipeCopy: budgetI = JSON.parse(JSON.stringify(recipeChoosen)),
                    total = recipeCopy.ingredients ? recipeCopy.ingredients.reduce((acum, curr) => Number((acum + curr.cost).toFixed(2)), 0) : 0;

                recipeCopy.title = budget.title
                recipeCopy.description = budget.description
                recipeCopy['_id'] = budget['_id']
                recipeCopy.total = String(total)
                setRecipeChoosen(null)

                return handleBudget('update', recipeCopy)
            }
            if (action === 'not-save-budget') {
                setRecipeChoosen(null)
                return handleBudget('update', budget)
            }
        }
    }

    return (
        <motion.div
            className='budget-modal-container'
            variants={variantOpacity}
            initial='hide'
            animate='visible'
        >
            {/* -------------------------------------- first step manual and fast--------------------------------- */}
            <AnimatePresence exitBeforeEnter>
                {showModalBudgetInfo &&
                    <BudgetInfoModal
                        setShowModalBudgetInfo={setShowModalBudgetInfo}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setShowModalBudget={setShowModalBudget}
                        user={user}
                        handleBudget={handleBudget}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
                        setShowModalChooseRecipe={setShowModalChooseRecipe}
                        setManual={setManual}
                    />
                }
            </AnimatePresence>
            {/* -------------------------------------- second step manual and fast ------------------------------- */}
            <AnimatePresence exitBeforeEnter>
                {showModalBudgetItems &&
                    <BudgetItems
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                        setShowModalBudget={setShowModalBudget}
                        handleBudget={handleBudget}
                        ingredientsArr={ingredientsArr}
                        budget={budget}
                        setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                        setBudgetRow={setBudgetRow}
                        setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                        setIngredientsArr={setIngredientsArr}
                        updateBudget={updateBudget}
                        setUpdateBudget={setUpdateBudget}
                        manual={manual}
                        recipeChoosen={recipeChoosen}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalChooseRecipe &&
                    <ChooseRecipe
                        setShowModalChooseRecipe={setShowModalChooseRecipe}
                        setShowModalBudget={setShowModalBudget}
                        budget={budget}
                        handleBudget={handleBudget}
                        allRecipes={allRecipes}
                        setRecipeChoosen={setRecipeChoosen}
                        recipeChoosen={recipeChoosen}
                        priceList={priceList}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setMissingIngr={setMissingIngr}
                        setShowModalMissingIngr={setShowModalMissingIngr}
                    />
                }
            </AnimatePresence>

            {/* -------------------------------------- third and LAST step manual ---------------------------------------- */}
            <AnimatePresence exitBeforeEnter>
                {showModalNewBudgetConfirmation &&
                    <BudgetConfirmation
                        setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                        setShowModalBudget={setShowModalBudget}
                        filterBudget={filterBudget}
                        manual={manual}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalAddBudgetRow &&
                    <AddBudgetItem
                        budgetRow={budgetRow}
                        setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                        setBudgetRow={setBudgetRow}
                        filterBudget={filterBudget}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
                        budget={budget}
                        setPriceListItem={setPriceListItem}
                        manual={manual}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showModalDeleteBudgetRow &&
                    <DeleteBudgetItem
                        setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                        setBudgetRow={setBudgetRow}
                        budgetRow={budgetRow}
                        filterBudget={filterBudget}
                        manual={manual}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showBudgetDetails &&
                    <BudgetDetails
                        setShowBudgetDetails={setShowBudgetDetails}
                        budget={budget}
                        setBudgetRow={setBudgetRow}
                        setIngredientsArr={setIngredientsArr}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setShowModalBudget={setShowModalBudget}
                        setUpdateBudget={setUpdateBudget}
                        setShowDeleteBudget={setShowDeleteBudget}
                    />
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {showDeleteBudget &&
                    <DeleteBudget
                        setShowDeleteBudget={setShowDeleteBudget}
                        setShowModalBudget={setShowModalBudget}
                        setShowBudgetDetails={setShowBudgetDetails}
                        handleBudget={handleBudget}
                        budget={budget}
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
                {showModalMissingIngr &&
                    <MissingIngredients
                        missingIngr={missingIngr}
                        setShowModalMissingIngr={setShowModalMissingIngr}
                        setShowModalBudget={setShowModalBudget}
                        handleBudget={handleBudget}
                        budget={budget}
                    />
                }
            </AnimatePresence>
        </motion.div>
    );
};

export default BudgetModal;