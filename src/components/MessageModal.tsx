import React from 'react';
import './MessageModal.css'
import {motion} from 'framer-motion'
import {variantMsgModals} from '../animations/variants'

interface Props {
    msg: string
}

const MessageModal: React.FC<Props> = ({msg}) => {
    return (
        <motion.div 
            className='message'
            variants={variantMsgModals}
            initial='hide'
            animate='visible'
            exit='exit'    
        >
            <p>{msg}</p>
        </motion.div>
    );
};

export default MessageModal;