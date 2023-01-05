import React from 'react';
import { motion } from 'framer-motion';
import { variantOpacity } from './variants';

const AnimatePages = ({children}: any) => {
    return (
        <motion.div
            variants={variantOpacity}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            {children}
        </motion.div>
    );
};

export default AnimatePages;