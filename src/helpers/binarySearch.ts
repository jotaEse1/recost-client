
// ------------------------------------ Below Binary Search to FILTER values ----------------------------------------

/* Binary Search with tail recursion
    i have to reduce the space complexity of recursion (stack) and because on every recursion i'm creating a new 
        array with logarithmic time

export const binarySearch = (array: recipeI[], value: string, called: number = 1): [] | recipeI[] => {
    let from = 0,
        to = array.length,
        middle = Math.floor((from + to) / 2),
        executionNumber = called;

        console.log('called ' + executionNumber)

    if (!array.length) return [];

    const title = array[middle].title.toLocaleLowerCase();

    if (title.startsWith(value)) {
        const recipes:  recipeI[] = [];

        for (let i = 0; i < array.length; i++) {
            const recipe = array[i];
            console.log('bucle for')

            if(recipe.title.toLocaleLowerCase().startsWith(value)) recipes.push(recipe)
        }

        return recipes
    }
    if (title > value) {
        let newArr = array.slice(from, middle);
        return binarySearch(newArr, value, executionNumber + 1);
    }
    if (title < value) {
        let newArr = array.slice(middle + 1, to);
        return binarySearch(newArr, value, executionNumber + 1);
    }
    if (title === value) return [array[middle]];
    else return array;
}

*/

/* Binary Search in a while loop 
    space complexity MUCH BETTER! Now at the end there's just one new array created an not multiple on every 
        recursion call

export const binarySearch = (array: recipeI[], value: string): [] | recipeI[] => {
    let from = 0,
        to = array.length,
        arrayFound: recipeI[] = [],
        called = 0;

    while (from <= to) {
        let middle = Math.floor((from + to) / 2);

        //console.log(called++)
        //console.log(`from: ${from}, to: ${to} `)

        if (!array[middle]) {
            arrayFound = []
            break
        }

        let title = array[middle].title.toLocaleLowerCase();
        //console.log(title)

        if (title === value) {
            arrayFound = [array[middle]]
            break
        }
        if (title.startsWith(value)) {
            const recipes: recipeI[] = [];

            for (let i = from; i <= to; i++) {
                const recipe = array[i];
                //console.log('bucle for')

                if (!recipe) continue
                if (recipe.title.toLocaleLowerCase().startsWith(value)) recipes.push(recipe)
            }

            //console.log(array.slice(from, to))
            arrayFound = recipes
            break
        }
        if (title > value) {
            to = middle - 1
        }
        if (title < value) {
            from = middle + 1
        }
        else arrayFound = []
    }

    return arrayFound

}
*/

/* Binary Search much optimized than precedents
    Both precedent binary search algorithms have a room to improve when the middle matches the startWith
        condition. Remember it's linear search O(N), but what if i use a binary search to find the range of words
        that start whit value parameter? That would result in a better time complexity too.

    findRange reduces time complexity from O(N) to O(log N) when looking for multiple words that match the search
        term. Before, let's say you are looking for 'a', when search term === title.startsWith a linear time 
        algorithm start to execute in order to find all words that start whit 'a' and return an array of those 
        recipes that start with 'a'
        So we were on a linear time, but with findRange we move to logarithmic time reducing the time complexity
 
    ¿next step? abstract the algorithm so ANY ARRAY OF OBJECTS can be use it with it

const findRange = (array: recipeI[], value: string, from: number, to: number, middle: number) => {
    let min = from,
        average = middle,
        max = to,
        leftBorder = 0,
        rigthBorder = 0,
        calledLeft = 1,
        calledRigth = 1;

    //left border
    while (true) {
        let leftMiddle = Math.floor((min + average) / 2)

        if (!array[leftMiddle]) break

        let title = array[leftMiddle].title.toLocaleLowerCase(),
            leftTitle = leftMiddle === from
                ? array[leftMiddle].title.toLocaleLowerCase()
                : array[leftMiddle - 1].title.toLocaleLowerCase(),
            rigthTitle = leftMiddle === middle
                ? array[leftMiddle].title.toLocaleLowerCase()
                : array[leftMiddle + 1].title.toLocaleLowerCase();

        if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            //nothing behind and nothing upfront ---> go forward
            min = leftMiddle + 1
        }
        if (title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            leftBorder = leftMiddle
            break
        }
        if (!title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            leftBorder = leftMiddle + 1
            break
        }
        if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            //coincidence behind and coincidence upfront ---> go back
            average = leftMiddle - 1
        }
    }

    //setting variables as the beggining
    average = middle

    //rigth border
    while (average <= max) {
        if (average === max) {
            //if average is equal max it means that it's just one element
            rigthBorder = max
            break
        }
        let rigthMiddle = Math.floor((average + max) / 2)

        if (!array[rigthMiddle]) break

        let title = array[rigthMiddle].title.toLocaleLowerCase(),
            leftTitle = rigthMiddle === middle
                ? array[rigthMiddle].title.toLocaleLowerCase()
                : array[rigthMiddle - 1].title.toLocaleLowerCase(),
            rigthTitle = rigthMiddle === to
                ? array[rigthMiddle].title.toLocaleLowerCase()
                : array[rigthMiddle + 1].title.toLocaleLowerCase();

        if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            //nothing behind and nothing upfront ---> go back
            max = rigthMiddle - 1
        }
        if (title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            rigthBorder = rigthMiddle
            break
        }
        if (!title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            rigthBorder = rigthMiddle - 1
            break
        }
        if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            //coincidence behind and coincidence upfront ---> go forward
            average = rigthMiddle + 1
        }
    }
    return array.slice(leftBorder, rigthBorder + 1) //plus 1 because slice is not inclusive
}

export const binarySearch = (array: recipeI[], value: string): [] | recipeI[] => {
    let from = 0,
        to = array.length - 1,
        arrayFound: recipeI[] = [],
        called = 0;

    while (from <= to) {
        let middle = Math.floor((from + to) / 2);

        if (!array[middle]) {
            arrayFound = []
            break
        }

        let title = array[middle].title.toLocaleLowerCase();

        if (title === value) {
            arrayFound = [array[middle]]
            break
        }
        if (title.startsWith(value)) {
            arrayFound = findRange(array, value, from, to, middle)
            break
        }
        if (title > value) {
            to = middle - 1
        }
        if (title < value) {
            from = middle + 1
        } 
        else arrayFound = []
    }

    return arrayFound

}
*/

// Binary Search abstraction form
const findRange = (array: any[], value: string, objKey: string, from: number, to: number, middle: number): any[] => {
    let min = from,
        average = middle,
        max = to,
        leftBorder = 0,
        rigthBorder = 0,
        calledLeft = 1,
        calledRigth = 1;

    //left border
    while (true) {
        let leftMiddle = Math.floor((min + average) / 2)

        if (!array[leftMiddle]) break

        let title = array[leftMiddle][`${objKey}`].toLocaleLowerCase(),
            leftTitle = leftMiddle === from
                ? array[leftMiddle][`${objKey}`].toLocaleLowerCase()
                : array[leftMiddle - 1][`${objKey}`].toLocaleLowerCase(),
            rigthTitle = leftMiddle === middle
                ? array[leftMiddle][`${objKey}`].toLocaleLowerCase()
                : array[leftMiddle + 1][`${objKey}`].toLocaleLowerCase();

        if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            //nothing behind and nothing upfront ---> go forward
            min = leftMiddle + 1
        }
        if (title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            leftBorder = leftMiddle
            break
        }
        if (!title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            leftBorder = leftMiddle + 1
            break
        }
        if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            //coincidence behind and coincidence upfront ---> go back
            average = leftMiddle - 1
        }
    }

    //setting variables as the beggining
    average = middle

    //rigth border
    while (average <= max) {
        if (average === max) {
            //if average is equal max it means that it's just one element
            rigthBorder = max
            break
        }
        let rigthMiddle = Math.floor((average + max) / 2)

        if (!array[rigthMiddle]) break

        let title = array[rigthMiddle][`${objKey}`].toLocaleLowerCase(),
            leftTitle = rigthMiddle === middle
                ? array[rigthMiddle][`${objKey}`].toLocaleLowerCase()
                : array[rigthMiddle - 1][`${objKey}`].toLocaleLowerCase(),
            rigthTitle = rigthMiddle === to
                ? array[rigthMiddle][`${objKey}`].toLocaleLowerCase()
                : array[rigthMiddle + 1][`${objKey}`].toLocaleLowerCase();

        if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            //nothing behind and nothing upfront ---> go back
            max = rigthMiddle - 1
        }
        if (title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            rigthBorder = rigthMiddle
            break
        }
        if (!title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
            rigthBorder = rigthMiddle - 1
            break
        }
        if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
            //coincidence behind and coincidence upfront ---> go forward
            average = rigthMiddle + 1
        }
    }
    return array.slice(leftBorder, rigthBorder + 1) //plus 1 because slice is not inclusive
}

export const filterSearch = (array: any[], value: string, objKey: string): [] | any[] => {
    let from = 0,
        to = array.length - 1,
        arrayFound: any[] = [],
        called = 1;

    while (from <= to) {
        let middle = Math.floor((from + to) / 2);

        if (!array[middle]) {
            arrayFound = []
            break
        }

        let title = array[middle][`${objKey}`].toLocaleLowerCase();

        if (title === value) {
            arrayFound = [array[middle]]
            break
        }
        if (title.startsWith(value)) {
            arrayFound = findRange(array, value, objKey, from, to, middle)
            break
        }
        if (title > value) {
            to = middle - 1
        }
        if (title < value) {
            from = middle + 1
        } 
        else arrayFound = []
    }

    return arrayFound
}

// ------------------------------------ Below Binary Search to SEARCH EXACT values -----------------------------------

export const binarySearch = (array: any[], value: string, objKey: string): [] | any[] => {
    let from = 0,
        to = array.length - 1,
        arrayFound: any[] = [],
        called = 1;

    while (from <= to) {
        let middle = Math.floor((from + to) / 2);

        if (!array[middle]) {
            arrayFound = []
            break
        }

        let title = array[middle][`${objKey}`].toLocaleLowerCase();

        if (title === value) {
            arrayFound = [array[middle]]
            break
        }
        if (title > value) {
            to = middle - 1
        }
        if (title < value) {
            from = middle + 1
        } 
        else arrayFound = []
    }

    return arrayFound
}


