import React from 'react';
import './Recipe.css'
import { priceListI, recipeI } from '../interfaces/interfaces';
import { motion } from 'framer-motion';
import { variantBudget } from '../animations/variants';
import { binarySearch } from '../helpers/binarySearch';

interface Props {
    data: recipeI,
    setRecipe: React.Dispatch<React.SetStateAction<recipeI>>,
    setShowRecipeDetails: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    priceList: priceListI[],
    setMissingIngrRecipe: React.Dispatch<React.SetStateAction<string[]>>,
    setShowModalMissingIngrRecipe: React.Dispatch<React.SetStateAction<boolean>>
}

const Recipe: React.FC<Props> = ({ data, setRecipe, setShowRecipeDetails, setShowModalRecipe, priceList, setMissingIngrRecipe, setShowModalMissingIngrRecipe }) => {
    const { title, description } = data;

    const handleSubmit = () => {
        let dataCopy: recipeI = JSON.parse(JSON.stringify(data)),
            { ingredients } = dataCopy,
            notInPriceList: string[] = [];

        if (!ingredients) { //if user create an empty recipe, without any ingredient. ingredients will be null
            setRecipe(dataCopy)
            setShowModalRecipe(true)
            return setShowRecipeDetails(true)
        }
        if (!ingredients.length) { //if user delete all ingredients of a recipe, ingredients will be []
            setRecipe(dataCopy)
            setShowModalRecipe(true)
            return setShowRecipeDetails(true)
        }
        if (!Object.keys(ingredients[0]).includes('ingredient')) { //in case there's an empty ingredient like {_id: 'adad', cost: 0}
            ingredients.splice(0, 1)
            setRecipe(dataCopy)
            setShowModalRecipe(true)
            return setShowRecipeDetails(true)
        }

        ingredients.forEach(obj => {
            const { ingredient, amount } = obj,
                result = binarySearch(priceList, ingredient, 'item');

            notInPriceList.push(ingredient)
            obj.cost = 0

            if (result.length) {
                const { price, unit } = result[0],
                    costCalculation = Number((((amount * Number(price)) / Number(unit))).toFixed(2));

                obj.cost = costCalculation
                notInPriceList.pop()
            }
        })

        if (notInPriceList.length) {
            setTimeout(() => {
                setShowModalMissingIngrRecipe(true)
            }, 700);
            setMissingIngrRecipe(notInPriceList)
            setRecipe(dataCopy)
            setShowModalRecipe(true)
            return setShowRecipeDetails(true)
        }

        setRecipe(dataCopy)
        setShowModalRecipe(true)
        setShowRecipeDetails(true)
    }

    return (
        <motion.div
            className='single-recipe-container'
            title='Haga click para ver la receta'
            onClick={handleSubmit}
            variants={variantBudget}
            whileTap='click'
            role='pressable'
        >
            <div className='recipe-title'>
                <h5>{title}</h5>
            </div>
            <div className='recipe-description'>
                <p>{description}</p>
            </div>
        </motion.div>
    );
};

export default Recipe;