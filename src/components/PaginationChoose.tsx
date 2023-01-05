import React from 'react';
import './PaginationChoose.css'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { motion } from 'framer-motion';
import OptionRecipe from './OptionRecipe';
import { budgetI, recipeI } from '../interfaces/interfaces';


interface Props {
    recipes: recipeI[] | null,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setRecipeChoosen: React.Dispatch<React.SetStateAction<budgetI | null>>,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
}

const PaginationChoose: React.FC<Props> = ({ recipes, currentPage, setCurrentPage, setRecipeChoosen, selected, setSelected }) => {
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
        <>
            <div className='list-recipes-container'>
                {dividedRecipes.length ? (
                    dividedRecipes[currentPage - 1].map((obj: any, i) =>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, delay: i * 0.09 }}
                            key={obj['_id']}
                        >
                            <OptionRecipe
                                data={obj}
                                id={obj['_id']!}
                                setRecipeChoosen={setRecipeChoosen}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </motion.div>
                    )
                ) : (
                    <p>No hay recetas</p>
                )}
            </div>
            {recipes!.length ? (
                <div className='choose-pagination-control'>
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
        </>
    );
};

export default PaginationChoose;