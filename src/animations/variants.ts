const variantOpacity = {
    hide: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        transition: {
            type: 'tween',
            duration: 0.5
        }
    }
}

const variantPriceListModals = {
    hide: { opacity: 0, y: '100vh' },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        y: '-100vh',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
        }
    }
}

const variantMsgModals = {
    hide: { opacity: 0, y: '-100vh' },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        y: '-100vh',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
        }
    }
}

const variantBudgetModals = {
    hide: { opacity: 0, x: '-100vw' },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        x: '100vw',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
        }
    }
}

const variantButtonPress = {
    click: {
        scale: 0.9
    }
}

const variantButtonHide = {
    click: {
        scale: 0.9,
        opacity: 0
    },
    hide: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0}
}

const variantBudget = {
    click: { scale: 0.9 },
    hide: { opacity: 0, y: '100vh' },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
        }
    }
}

const variantAppearOption = {
    hide: {height: 0},
    visible: {
        height: 'max-content',
        transition: {
            type: 'spring',
            bounce: 0.3
        }
    }
}


export {
    variantOpacity,
    variantPriceListModals,
    variantMsgModals,
    variantBudgetModals,
    variantButtonPress,
    variantBudget,
    variantAppearOption
}