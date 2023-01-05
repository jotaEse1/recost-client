import React from 'react';
import { budgetI } from '../interfaces/interfaces';
import './PaginationBudgets.css'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { motion } from 'framer-motion';
import Budget from './Budget';


interface Props {
    budgets: budgetI[] | null,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setShowBudgetDetails: React.Dispatch<React.SetStateAction<boolean>>,
    setBudget: React.Dispatch<React.SetStateAction<budgetI>>,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>
}

const PaginationBudgets: React.FC<Props> = ({ budgets, currentPage, setCurrentPage, setShowBudgetDetails, setBudget, setShowModalBudget }) => {
    const budgetsXPage = 20
    const totalBudgets = budgets!.length
    const repeat = Math.ceil(totalBudgets / budgetsXPage)
    let minLong = 0
    let maxLong = budgetsXPage
    const dividedBudgets = []

    for (let index = 0; index < repeat; index++) {
        dividedBudgets.push(budgets!.slice(minLong, maxLong))

        minLong += budgetsXPage
        maxLong += budgetsXPage
    }

    return (
        <div className='all-budgets-container'>
            <div className='all-budgets'>
                {dividedBudgets.length ? (
                    dividedBudgets[currentPage - 1].map((obj, i) =>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, delay: i * 0.09 }}
                            key={obj['_id']}
                        >
                            <Budget
                                data={obj}
                                setShowBudgetDetails={setShowBudgetDetails}
                                setBudget={setBudget}
                                setShowModalBudget={setShowModalBudget}
                            />
                        </motion.div>
                    )
                ) : (
                    <p>No hay presupuestos</p>
                )}
            </div>
            {budgets!.length ? (
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
                            : (currentPage - 1) * budgetsXPage
                        }
                        -
                        {currentPage === 1
                            ? dividedBudgets[0].length
                            : currentPage === repeat
                                ? totalBudgets
                                : currentPage * budgetsXPage
                        } de {totalBudgets} presupuestos
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

export default PaginationBudgets;