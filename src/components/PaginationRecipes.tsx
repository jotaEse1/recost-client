import { motion } from 'framer-motion';
import React from 'react';
import { priceListI, recipeI } from '../interfaces/interfaces';
import Recipe from './Recipe';
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import './PaginationRecipes.css'

interface Props {
    recipes: recipeI[] | null,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setRecipe: React.Dispatch<React.SetStateAction<recipeI>>,
    setShowRecipeDetails: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    priceList: priceListI[],
    setMissingIngrRecipe: React.Dispatch<React.SetStateAction<string[]>>,
    setShowModalMissingIngrRecipe: React.Dispatch<React.SetStateAction<boolean>>
}

const PaginationRecipes: React.FC<Props> = ({ recipes, currentPage, setCurrentPage, setRecipe, setShowModalRecipe, setShowRecipeDetails, priceList, setMissingIngrRecipe, setShowModalMissingIngrRecipe }) => {
    const recipesXPage = 20
    const totalRecipes = recipes!.length
    const repeat = Math.ceil(totalRecipes / recipesXPage)
    let minLong = 0
    let maxLong = recipesXPage
    const dividedRecipes = []

    for (let index = 0; index < repeat; index++) {
        dividedRecipes.push(recipes!.slice(minLong, maxLong))

        minLong += recipesXPage
        maxLong += recipesXPage
    }

    return (
        <div className='all-recipes-container'>
            <div className='all-recipes'>
                {dividedRecipes.length ? (
                    dividedRecipes[currentPage - 1].map((obj, i) =>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, delay: i * 0.09 }}
                            key={obj['_id']}
                        >
                            <Recipe
                                data={obj}
                                setRecipe={setRecipe}
                                setShowRecipeDetails={setShowRecipeDetails}
                                setShowModalRecipe={setShowModalRecipe}
                                priceList={priceList}
                                setMissingIngrRecipe={setMissingIngrRecipe}
                                setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
                            />
                        </motion.div>
                    )
                ) : (
                    <p>No hay recetas</p>
                )}
                </div>
                {recipes!.length ? (
                    <div className='pagination-control'>
                        <button
                            type='button'
                            onClick={currentPage === 1 ? undefined : () => setCurrentPage(prev => prev - 1)}
                        >
                            <AiOutlineLeft />
                        </button>
                        <p>
                            {currentPage === 1
                                ? 1
                                : (currentPage - 1) * recipesXPage
                            }
                            -
                            {currentPage === 1
                                ? dividedRecipes[0].length
                                : currentPage === repeat
                                    ? totalRecipes
                                    : currentPage * recipesXPage
                            } de {totalRecipes} recetas
                        </p>
                        <button
                            type='button'
                            onClick={currentPage === repeat ? undefined : () => setCurrentPage(prev => prev + 1)}
                        >
                            <AiOutlineRight />
                        </button>
                    </div>
                ) : (<></>)
                }
        </div>
    );
};

export default PaginationRecipes;