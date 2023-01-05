import React from 'react';
import { priceListI } from '../interfaces/interfaces';
import ItemPriceList from './ItemPriceList';
import './PaginationPriceList.css'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'

interface Props {
    ingredients: priceListI[] | null,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setRowDetails: React.Dispatch<React.SetStateAction<priceListI>>,
    setShowModalAddItem: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const PaginationPriceList: React.FC<Props> = ({ ingredients, currentPage, setCurrentPage, setRowDetails, setShowModalAddItem, setShowModalDelete }) => {
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
                    <ItemPriceList
                        key={obj['_id']}
                        row={obj}
                        i={i}
                        setRowDetails={setRowDetails}
                        setShowModalAddItem={setShowModalAddItem}
                        setShowModalDelete={setShowModalDelete}
                    />
                )
            ) : (
                <tr style={{ height: '10vh', border: '2px solid #041A33' }}>
                    <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                </tr>
            )}
            {dividedIngr[0][0].item ? (
                <tr style={{ height: '10vh', border: '2px solid #041A33' }}>
                    <td colSpan={4} className='td-control'>
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

export default PaginationPriceList;