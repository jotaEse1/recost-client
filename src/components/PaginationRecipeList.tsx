import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { priceListI } from '../interfaces/interfaces';
import './PaginationRecipeList.css'

interface Props {
    ingredients: priceListI[],
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
}

const PaginationRecipeList: React.FC<Props> = ({ ingredients, currentPage, setCurrentPage }) => {
    const ingredientsXPage = 20
    const totalIngr = ingredients!.length
    const repeat = Math.ceil(totalIngr / ingredientsXPage)
    let minLong = 0
    let maxLong = ingredientsXPage
    const dividedIngr = []

    for (let index = 0; index < repeat; index++) {
        dividedIngr.push(ingredients!.slice(minLong, maxLong))

        minLong += ingredientsXPage
        maxLong += ingredientsXPage
    }

    return (
        <>
            {dividedIngr[0][0].item ? (
                dividedIngr[currentPage - 1].map((obj, i) =>
                    <tr className='row' key={obj['_id']}>
                        <td>{obj.item}</td>
                        <td>{obj.unit}gr</td>
                        <td>$ {obj.price}</td>
                    </tr>
                )
            ) : (
                <tr style={{ height: '10vh', border: '2px solid #041A33' }}>
                    <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                </tr>
            )}
            {dividedIngr[0][0].item ? (
                <tr style={{ height: '6vh', border: '2px solid #041A33'}}>
                    <td colSpan={4} className='td-control-helper'>
                        <button
                            type='button'
                            onClick={currentPage === 1 ? undefined : () => setCurrentPage(prev => prev - 1)}
                        >
                            <AiOutlineLeft />
                        </button>
                        <p>
                            {currentPage === 1
                                ? 1
                                : (currentPage - 1) * ingredientsXPage
                            }
                            -
                            {currentPage === 1
                                ? dividedIngr[0].length
                                : currentPage === repeat
                                    ? totalIngr
                                    : currentPage * ingredientsXPage
                            } de {totalIngr} ingredientes
                        </p>
                        <button
                            type='button'
                            onClick={currentPage === repeat ? undefined : () => setCurrentPage(prev => prev + 1)}
                        >
                            <AiOutlineRight />
                        </button>
                    </td>
                </tr>
            ) : (<></>)
            }
        </>
    );
};

export default PaginationRecipeList;