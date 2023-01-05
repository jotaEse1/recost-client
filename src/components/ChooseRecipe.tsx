import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { variantButtonPress, variantBudgetModals } from '../animations/variants';
import { binarySearch, filterSearch } from '../helpers/binarySearch';
import { budgetI, budgetListI, ingredientI, priceListI, recipeI } from '../interfaces/interfaces';
import './ChooseRecipe.css'
import PaginationChoose from './PaginationChoose';

interface Props {
    setShowModalChooseRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    budget: budgetI,
    handleBudget: (action: string, data: ingredientI | budgetListI) => void,
    allRecipes: recipeI[] | null,
    setRecipeChoosen: React.Dispatch<React.SetStateAction<budgetI | null>>,
    recipeChoosen: budgetI | null,
    priceList: priceListI[],
    setShowModalBudgetItems: React.Dispatch<React.SetStateAction<boolean>>,
    setMissingIngr: React.Dispatch<React.SetStateAction<string[]>>,
    setShowModalMissingIngr: React.Dispatch<React.SetStateAction<boolean>>
}

const ChooseRecipe: React.FC<Props> = ({ setShowModalChooseRecipe, setShowModalBudget, budget, handleBudget, allRecipes, setRecipeChoosen, recipeChoosen, priceList, setShowModalBudgetItems, setMissingIngr, setShowModalMissingIngr }) => {
    const [selected, setSelected] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [dynamicOptions, setDynamicOptions] = useState<recipeI[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => setDynamicOptions(allRecipes), [])

    const editTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const dynamicSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result,
            term = e.target.value;

        if (!allRecipes) return [];
        if (!term) return setDynamicOptions(allRecipes)

        //result = allRecipes.filter(recipe => recipe.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
        result = filterSearch(allRecipes, term.toLocaleLowerCase(), 'title')

        return setDynamicOptions(result)
    }

    const filterRecipe = (data: recipeI) => {
        const recipeCopy: budgetI = JSON.parse(JSON.stringify(data)),
            { ingredients } = recipeCopy,
            notInPriceList: string[] = [];

        if (!ingredients) {
            setTimeout(() => {
                setShowModalMissingIngr(true)
            }, 500);
            setMissingIngr(['Receta sin ingredientes!'])
            return setShowModalChooseRecipe(false)
        }
        if (!ingredients.length) {
            setTimeout(() => {
                setShowModalMissingIngr(true)
            }, 500);
            setMissingIngr(['Receta sin ingredientes!'])
            return setShowModalChooseRecipe(false)
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
                setShowModalMissingIngr(true)
            }, 500);
            setMissingIngr(notInPriceList)
            return setShowModalChooseRecipe(false)
        }

        setRecipeChoosen(recipeCopy)
        setTimeout(() => {
            setShowModalBudgetItems(true)
        }, 500);
        setShowModalChooseRecipe(false)
    }

    return (
        <motion.div
            className='budget-details-container'
            variants={variantBudgetModals}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <h5 className='choose-title'>Escoge una receta</h5>
            <div className='budget-details'>
                <div className='searcher-container'>
                    <h6>Buscar Receta</h6>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            editTerm(e);
                            dynamicSearch(e)
                        }}
                        placeholder='Nombre receta...'
                        disabled={currentPage > 1 ? true : false}
                        className={currentPage > 1 ? 'input-disabled' : 'input-active'}
                    />
                </div>
                {!dynamicOptions ? (
                    <h6>No hay recetas</h6>
                ) : (
                    (dynamicOptions.length ? (
                        <PaginationChoose
                            recipes={dynamicOptions}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setRecipeChoosen={setRecipeChoosen}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ) : (
                        <h6>No hay recetas</h6>
                    ))
                )}
                {/* <div className='list-recipes-container'>
                    {!dynamicOptions ? (<h6>Sin resultados</h6>) : (
                        dynamicOptions.map((rec: any, i) => 
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.1 }}
                                key={rec['_id']}
                            >
                                <OptionRecipe
                                    data={rec}
                                    id={rec['_id']!}
                                    setRecipeChoosen={setRecipeChoosen}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </motion.div>    
                        )
                    )}
                </div> */}
            </div>
            <div className='budget-modal-buttons'>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => {
                        setTimeout(() => {
                            setShowModalBudget(false);
                            setRecipeChoosen(null)
                        }, 500);
                        setShowModalChooseRecipe(false);
                        handleBudget('delete', budget)
                    }}
                    type='button'
                    name='delete'
                    title='Eliminar presupuesto'
                >
                    Cancelar
                </motion.button>
                <motion.button
                    onClick={() => filterRecipe(recipeChoosen!)}
                    variants={variantButtonPress}
                    whileTap='click'
                    type='submit'
                    disabled={!recipeChoosen ? true : false}
                    style={!recipeChoosen ? { backgroundColor: '#888' } : { backgroundColor: '#5699F6' }}
                >
                    Continuar
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ChooseRecipe;