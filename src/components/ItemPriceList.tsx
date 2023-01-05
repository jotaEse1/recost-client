import React from 'react';
import './ItemPriceList.css'
import { BsPencilSquare } from 'react-icons/bs'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { priceListI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantButtonPress } from '../animations/variants';

interface Props {
    row: priceListI,
    setRowDetails: React.Dispatch<React.SetStateAction<priceListI>>,
    setShowModalAddItem: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
    i: number
}

const ItemPriceList: React.FC<Props> = ({ row, setRowDetails, setShowModalAddItem, setShowModalDelete, i }) => {
    const { item, unit, price } = row

    return (
        <tr className='row'>
            <td>{item}</td>
            <td>{unit}gr</td>
            <td>$ {price}</td>
            <td>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => { setRowDetails(row); setShowModalAddItem(true) }}
                    title='Modificar ingrediente'
                    name='edit'
                    role='edit'
                >
                    <BsPencilSquare />
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => { setRowDetails(row); setShowModalDelete(true) }}
                    title='Eliminar ingrediente'
                    name='delete'
                    role='delete'
                >
                    <RiDeleteBin5Fill />
                </motion.button>
            </td>
        </tr>
    );
};

export default ItemPriceList;