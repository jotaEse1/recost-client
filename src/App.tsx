import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Autentication from './components/Autentication';
import SignIn from './components/SignIn';
import Login from './components/Login';
import PriceList from './components/PriceList';
import Budgets from './components/Budgets';
import Recipes from './components/Recipes';
import { Urls } from './constants/constants'
import { AnimatePresence } from 'framer-motion'
import DeleteItemModal from './components/DeleteItemModal';
import MessageModal from './components/MessageModal';
import AddItemModal from './components/AddItemModal';
import Options from './components/Options';
import BudgetModal from './components/BudgetModal';
import { budgetListI, ingredientI, priceListI, budgetI, recipeI, recipeIngrI, registerForm, loginForm } from './interfaces/interfaces'
import RecipeModal from './components/RecipeModal';
import Loader from './components/Loader';

const initialPriceList = [{
  item: '',
  unit: '',
  price: ''
}]

const initialBudget = {
  title: '',
  idUser: '',
  description: '',
  ingredients: [{
    ingredient: '',
    amount: 0,
    cost: 0
  }],
  total: ''
}

const initialRecipe = {
  title: '',
  idUser: '',
  description: ''
}

function App() {
  //important
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  //pricelist
  const [rowDetails, setRowDetails] = useState<priceListI>({ item: '', unit: '', price: '' });
  const [priceList, setPriceList] = useState<priceListI[]>(initialPriceList);
  //budget
  const [allBudgets, setAllBudgets] = useState<budgetI[] | null>(null);
  const [budget, setBudget] = useState<budgetI>(initialBudget);
  const [ingredientsArr, setIngredientsArr] = useState<ingredientI[] | null>(null);
  //recipes
  const [allRecipes, setAllRecipes] = useState<recipeI[] | null>(null);
  const [recipe, setRecipe] = useState<recipeI>(initialRecipe);
  const [ingredientsRecipeArr, setIngredientsRecipeArr] = useState<recipeIngrI[] | null>(null);
  const [missingIngrRecipe, setMissingIngrRecipe] = useState<string[]>([]);
  //update in real-time
  const [updatePriceList, setUpdatePriceList] = useState(0);
  const [updateBudgetItemList, setUpdateBudgetItemList] = useState(0);
  const [updateRecipeItemList, setUpdateRecipeItemList] = useState(0);
  //modals
  //pricelist
  const [showModalAddItem, setShowModalAddItem] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  //budget
  const [showModalBudget, setShowModalBudget] = useState(false);
  const [showBudgetDetails, setShowBudgetDetails] = useState(false);
  const [showModalBudgetInfo, setShowModalBudgetInfo] = useState(false);
  //recipes
  const [showModalRecipe, setShowModalRecipe] = useState(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [showModalRecipeInfo, setShowModalRecipeInfo] = useState(false);
  const [showModalMissingIngrRecipe, setShowModalMissingIngrRecipe] = useState(false);


  //general
  const [showModalMsg, setShowModalMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadOption, setLoadOption] = useState(true);
  const [disable, setDisable] = useState(false);

  //router
  const location = useLocation();
  const navigate = useNavigate();

  //check token
  useEffect(() => {
    const url = Urls.REFRESH,
      options: RequestInit = {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      };

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        const { success, token } = res;

        if (!success) {
          setToken('')
          return setLoading(false)
        }

        setUser(res['_id'])
        setToken(token)
        navigate('main')
        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [])

  //getRecipes
  useEffect(() => {
    if (!user) return;

    fetch(`${Urls.RECIPES}?idUser=${user}`)
      .then(res => res.json())
      .then(data => {
        const { response } = data
        setAllRecipes(response)
      })
      .catch(() => {
        setMsg('Ocurrió un error. Intente mas tarde.')
        setShowModalMsg(true)
        return setTimeout(() => setShowModalMsg(false), 3000)
      })
  }, [user])

  //getPriceList
  useEffect(() => {
    if (!user) return;

    fetch(`${Urls.PRICE_LIST}?idUser=${user}`)
      .then(res => res.json())
      .then(data => {
        const { list } = data.response[0];

        if (list.length) {
          if (list[0].item === undefined && list[0]['_id'] && list.length === 1) {
            list.splice(0, 1)
            return setPriceList(initialPriceList)
          }
          if (list[0].item === undefined && list[0]['_id'] && list.length > 1) {
            list.splice(0, 1)

            return setPriceList(list)
          }

          return setPriceList(list)
        }
        if (!list.length) return setPriceList(initialPriceList)
      })
      .catch(() => {
        setMsg('Ocurrió un error. Intente mas tarde.')
        setShowModalMsg(true)
        return setTimeout(() => setShowModalMsg(false), 3000)
      })
  }, [user])

  //update view
  useEffect(() => {
    if (updatePriceList === 0) return;

    fetch(`${Urls.PRICE_LIST}?idUser=${user}`)
      .then(res => res.json())
      .then(data => {
        const { list } = data.response[0];

        if (list.length) {
          if (list[0].item === undefined && list[0]['_id'] && list.length === 1) {
            list.splice(0, 1)
            return setPriceList(initialPriceList)
          }
          if (list[0].item === undefined && list[0]['_id'] && list.length > 1) {
            list.splice(0, 1)

            return setPriceList(list)
          }

          return setPriceList(list)
        }
        if (!list.length) return setPriceList(initialPriceList)
      })
      .catch(() => {
        setMsg('Ocurrió un error. Intente mas tarde.')
        setShowModalMsg(true)
        return setTimeout(() => setShowModalMsg(false), 3000)
      })
  }, [updatePriceList])

  useEffect(() => {
    if (updateBudgetItemList === 0) return;

    fetch(`${Urls.BUDGET}?idUser=${user}`)
      .then(res => res.json())
      .then(data => {
        const { response } = data
        setAllBudgets(response)
      })
      .catch(() => {
        setMsg('Ocurrió un error. Intente mas tarde.')
        setShowModalMsg(true)
        return setTimeout(() => setShowModalMsg(false), 3000)
      })
  }, [updateBudgetItemList])

  useEffect(() => {
    if (updateRecipeItemList === 0) return;

    fetch(`${Urls.RECIPES}?idUser=${user}`)
      .then(res => res.json())
      .then(data => {
        const { response } = data
        setAllRecipes(response)
      })
      .catch(() => {
        setMsg('Ocurrió un error. Intente mas tarde.')
        setShowModalMsg(true)
        return setTimeout(() => setShowModalMsg(false), 3000)
      })
  }, [updateRecipeItemList])

  //handlers
  const handleAuth = (action: string, data: registerForm | loginForm) => {
    let url: string,
      options: RequestInit = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      };

    if (action === 'register') {
      url = Urls.REGISTER
      options.body = JSON.stringify(data)
    }
    if (action === 'login') {
      url = Urls.LOGIN
      options.body = JSON.stringify(data)
      options.credentials = 'include' // Needed to include the cookie
    }
    if (action === 'logout') {
      url = Urls.LOGOUT
      options.credentials = 'include' // Needed to include the cookie
    }

    fetch(url!, options)
      .then(res => res.json())
      .then(res => {
        const { type, success } = res;

        if (type === 'signin') {
          if (success) {
            setDisable(false)
            setTimeout(() => navigate('main'), 3500);
            setMsg(`${res.response}`)
            setUser(res['_id'])
            setToken('1')
            setShowModalMsg(true)
            return setTimeout(() => setShowModalMsg(false), 3000)
          }
          if (!success) {
            setDisable(false)
            setMsg(`${res.response}`)
            setShowModalMsg(true)
            return setTimeout(() => setShowModalMsg(false), 3000)
          }
        }
        if (type === 'login') {
          if (success) {
            setDisable(false)
            setTimeout(() => navigate('main'), 3500);
            setMsg(`${res.response}`)
            setUser(res['_id'])
            setToken(res.token)
            setShowModalMsg(true)
            return setTimeout(() => setShowModalMsg(false), 3000)
          }
          if (!success) {
            setDisable(false)
            setMsg(`${res.response}`)
            setShowModalMsg(true)
            return setTimeout(() => setShowModalMsg(false), 3000)
          }
        }
        if (type === 'logout') {
          if (success) {
            navigate('login');
            setMsg(`${res.response}`)
            setUser('')
            setToken('')
            setShowModalMsg(true)
            return setTimeout(() => setShowModalMsg(false), 2500)
          }
          if (!success) {
            setMsg(`${res.response}`)
            setShowModalMsg(true)
            return setTimeout(() => setShowModalMsg(false), 3000)
          }
        }
      })
      .catch(err => {
        setMsg('Ocurrió un error. Intente mas tarde')
        setShowModalMsg(true)
        return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
      })
  }

  const handleList = (data: priceListI, type: string): void => {
    let options;

    data.item = data.item.trim().toLowerCase()
    data.price = Number(data.price)
    data.unit = Number(data.unit)
    data.idUser = user

    if (type === 'new') {
      options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
    if (type === 'update') {
      options = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
    if (type === 'delete') {
      options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }

    fetch(Urls.PRICE_LIST, options)
      .then(res => res.json())
      .then(res => {
        const { type, response } = res;

        if (type === 'new') {
          if (response === 1) {
            setMsg('Ingrediende añadido')
            setShowModalMsg(true)
            setUpdatePriceList(prev => prev + 1)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
          if (response !== 1) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
        if (type === 'update') {
          if (response === 1) {
            setMsg('Ingrediende actualizado')
            setShowModalMsg(true)
            setUpdatePriceList(prev => prev + 1)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
          if (response !== 1) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
        if (type === 'delete') {
          if (response === 1) {
            setMsg('Ingrediende eliminado')
            setShowModalMsg(true)
            setUpdatePriceList(prev => prev + 1)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
          if (response !== 1) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
      })
      .catch(err => {
        setMsg('Ocurrió un error. Intente mas tarde')
        setShowModalMsg(true)
        return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
      })
  }

  const handleBudget = (action: string, data: ingredientI | budgetListI) => {
    let url = Urls.BUDGET,
      options;

    data.idUser = user;

    if (action === 'new') {
      options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
    if (action === 'update') {
      options = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
    if (action === 'delete') {
      options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        const { type, success, response } = res;

        if (type === 'new') {
          if (success) {
            return setBudget(response)
          }
          if (!success) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
        if (type === 'update') {
          if (success) {
            setUpdateBudgetItemList(prev => prev + 1)
            setMsg(`${response.title} ha sido guardado`)
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
          if (!success) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
        if (type === 'delete') {
          if (success) {
            setUpdateBudgetItemList(prev => prev + 1)
            setMsg(`Presupuesto "${response.title}" eliminado`)
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
          if (!success) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
      })
      .catch(err => {
        setMsg('Ocurrió un error. Intente mas tarde')
        setShowModalMsg(true)
        return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
      })
  }

  const handleRecipe = (action: string, data: recipeIngrI | recipeI) => {
    let url = Urls.RECIPES,
      options;

    data.idUser = user;

    if (action === 'new') {
      options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
    if (action === 'update') {
      options = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
    if (action === 'delete') {
      options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        const { type, success, response } = res;

        if (type === 'new') {
          if (success) {
            return setRecipe(response)
          }
          if (!success) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
        if (type === 'update') {

          if (success) {
            setUpdateRecipeItemList(prev => prev + 1)
            setMsg(`${response.title} ha sido guardado`)
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
          if (!success) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
        if (type === 'delete') {
          if (success) {
            setUpdateRecipeItemList(prev => prev + 1)
            setMsg(`Receta"${response.title}" eliminada`)
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
          if (!success) {
            setMsg('Ocurrió un error. Intente mas tarde')
            setShowModalMsg(true)
            return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
          }
        }
      })
      .catch(err => {
        setMsg('Ocurrió un error. Intente mas tarde')
        setShowModalMsg(true)
        return setTimeout(() => { setMsg(''); setShowModalMsg(false) }, 3000)
      })
  }

  if (loading) return (
    <div role='loading' className='loader-container'>
      <Loader />
    </div>
  )

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location} >
          <Route path='/' element={<Autentication />} />
          <Route path='/login' element={
            <Login
              setMsg={setMsg}
              setShowModalMsg={setShowModalMsg}
              handleAuth={handleAuth}
              disable={disable}
              setDisable={setDisable}
            />} />
          <Route path='/signin' element={
            <SignIn
              setMsg={setMsg}
              setShowModalMsg={setShowModalMsg}
              handleAuth={handleAuth}
              disable={disable}
              setDisable={setDisable}
            />} />
          <Route path='/main' element={!token ? <Navigate to='/' /> :
            <Options
              setLoadOption={setLoadOption}
              handleAuth={handleAuth}
            />}
          />
          <Route path='/list' element={!token ? <Navigate to='/' /> :
            <PriceList
              setShowModalAddItem={setShowModalAddItem}
              setRowDetails={setRowDetails}
              priceList={priceList}
              setPriceList={setPriceList}
              setShowModalDelete={setShowModalDelete}
              setMsg={setMsg}
              setShowModalMsg={setShowModalMsg}
              user={user}
              handleAuth={handleAuth}
              loadOption={loadOption}
              setLoadOption={setLoadOption}
            />}
          />
          <Route path='/budget' element={!token ? <Navigate to='/' /> :
            <Budgets
              setShowModalBudget={setShowModalBudget}
              allBudgets={allBudgets}
              setShowBudgetDetails={setShowBudgetDetails}
              setBudget={setBudget}
              setShowModalBudgetInfo={setShowModalBudgetInfo}
              setMsg={setMsg}
              setShowModalMsg={setShowModalMsg}
              user={user}
              setAllBudgets={setAllBudgets}
              handleAuth={handleAuth}
              loadOption={loadOption}
              setLoadOption={setLoadOption}
            />}
          />
          <Route path='/recipes' element={!token ? <Navigate to='/' /> :
            <Recipes
              allRecipes={allRecipes}
              setShowModalRecipe={setShowModalRecipe}
              setShowModalRecipeInfo={setShowModalRecipeInfo}
              setRecipe={setRecipe}
              setShowRecipeDetails={setShowRecipeDetails}
              setMsg={setMsg}
              setShowModalMsg={setShowModalMsg}
              user={user}
              setAllRecipes={setAllRecipes}
              handleAuth={handleAuth}
              loadOption={loadOption}
              setLoadOption={setLoadOption}
              priceList={priceList}
              setMissingIngrRecipe={setMissingIngrRecipe}
              setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
            />}
          />
        </Routes>
      </AnimatePresence>

      {/*------------------------------------Modals-------------------------------------*/}

      <AnimatePresence>
        {showModalAddItem &&
          <AddItemModal
            setShowModalAddItem={setShowModalAddItem}
            rowDetails={rowDetails}
            setRowDetails={setRowDetails}
            handleList={handleList}
            setMsg={setMsg}
            setShowModalMsg={setShowModalMsg}
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {showModalMsg &&
          <MessageModal
            msg={msg}
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {showModalDelete &&
          <DeleteItemModal
            handleList={handleList}
            setShowModalDelete={setShowModalDelete}
            rowDetails={rowDetails}
            setRowDetails={setRowDetails}
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {showModalBudget &&
          <BudgetModal
            setShowModalBudget={setShowModalBudget}
            user={user}
            handleBudget={handleBudget}
            setMsg={setMsg}
            setShowModalMsg={setShowModalMsg}
            budget={budget}
            priceList={priceList}
            ingredientsArr={ingredientsArr}
            setIngredientsArr={setIngredientsArr}
            showBudgetDetails={showBudgetDetails}
            setShowBudgetDetails={setShowBudgetDetails}
            setShowModalBudgetInfo={setShowModalBudgetInfo}
            showModalBudgetInfo={showModalBudgetInfo}
            setShowModalAddItem={setShowModalAddItem}
            allRecipes={allRecipes}
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {showModalRecipe &&
          <RecipeModal
            setShowModalRecipe={setShowModalRecipe}
            showModalRecipeInfo={showModalRecipeInfo}
            setShowModalRecipeInfo={setShowModalRecipeInfo}
            setMsg={setMsg}
            setShowModalMsg={setShowModalMsg}
            user={user}
            handleRecipe={handleRecipe}
            ingredientsRecipeArr={ingredientsRecipeArr}
            setIngredientsRecipeArr={setIngredientsRecipeArr}
            recipe={recipe}
            showRecipeDetails={showRecipeDetails}
            setShowRecipeDetails={setShowRecipeDetails}
            priceList={priceList}
            setShowModalAddItem={setShowModalAddItem}
            missingIngrRecipe={missingIngrRecipe}
            showModalMissingIngrRecipe={showModalMissingIngrRecipe}
            setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
          />
        }
      </AnimatePresence>

    </>
  );
}

export default App;
