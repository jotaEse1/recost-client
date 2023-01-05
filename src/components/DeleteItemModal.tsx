import React from 'react';
import './DeleteItemModal.css'
import {MdCheck} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import { priceListI } from '../interfaces/interfaces';
import { motion } from 'framer-motion'
import { variantOpacity, variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    handleList: (data: priceListI, type: string) => void,
    setShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
    rowDetails:  priceListI,
    setRowDetails: React.Dispatch<React.SetStateAction<priceListI>>
}

const DeleteItemModal: React.FC<Props> = ({handleList, setShowModalDelete, rowDetails, setRowDetails}) => {
    return (
        <motion.div 
            className='modal-delete'
            variants={variantOpacity}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <motion.div variants={variantPriceListModals}>
                <h4>¿Quieres eliminarlo?</h4>
                <div className='modal-delete-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setTimeout(() => {
                                handleList(rowDetails, 'delete'); 
                            }, 500);
                            setShowModalDelete(false)
                            setRowDetails({item: '', unit: '', price: ''})
                        }}
                        role='delete'
                    >
                        <MdCheck />
                    </motion.button>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {setShowModalDelete(false); setRowDetails({item: '', unit: '', price: ''})}}
                        role='cancel'
                    >
                        <IoMdClose />
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DeleteItemModal;