import './App.css';
import BookList from './components/BookList';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Form1 from './components/Form1';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import LoginPage from './components/LoginPage';
import Cookies from 'js-cookie';
import { AppContext } from './context/Context';
import { useContext } from 'react';
import Bookpage from './components/Bookpage';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import UserPage from './components/UserPage';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import CategoryPage from './pages/CategoryPage';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Updateprofile from './components/Updateprofile';
import { AuthContext } from './context/AuthContext';

function App() {
  const Context = useContext(AuthContext)
  const userContext = useContext(AppContext)
  // const user = userContext.userData

  const userName = "XYZ"

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "green"
          }
        }
      }
    }
  })

  // const email = Cookies.get("email")

  const logoutBtn = () => {
    Cookies.remove("email")
    userContext.logoutData()
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <BrowserRouter>
          <div className='navbar'>
            <div className='navTitle'> <p>Book Store</p> </div>
            <div className='navItems'>
              {userContext.userData ?
                <div >
                  
                  {Context.user.roleId === 1 ? <div className='navItems navBtn1' id='navOne'>
                    <NavLink to="/userpage" className='navLink' ><button>Users</button> </NavLink>
                  <NavLink to="/bookpage" className='navLink' ><button>Books</button> </NavLink>
                  <NavLink to="/books" className='navLink' ><button>BookList</button> </NavLink>
                  <NavLink to="/categorypage" className='navLink' ><button>Category</button> </NavLink>
                  <NavLink to="/profile" className='navLink' ><button>Profile</button> </NavLink>
                  <NavLink to="/" className='navLink' ><button onClick={logoutBtn}>Logout</button></NavLink>
                  </div>  :  <div>
                    {Context.user.roleId === 2 ? <div className='navItems navBtn1' id='navTwo'>
                  <NavLink to="/bookpage" className='navLink' ><button>Books</button> </NavLink>
                  <NavLink to="/books" className='navLink' ><button>BookList</button> </NavLink>
                  <NavLink to="/profile" className='navLink' ><button>Profile</button> </NavLink>
                  <NavLink to="/" className='navLink' ><button onClick={logoutBtn}>Logout</button></NavLink>
                    </div> : <div className='navItems navBtn1' id='navThree'>
                  <NavLink to="/books" className='navLink' ><button>BookList</button> </NavLink>
                  <NavLink to="/Cart" className='navLink' ><button>Cart</button> </NavLink>
                  <NavLink to="/profile" className='navLink' ><button>Profile</button> </NavLink>
                  <NavLink to="/" className='navLink' ><button onClick={logoutBtn}>Logout</button></NavLink>
                      </div>}
                  </div> }
                
                </div> :
                <div className='navItems navBtn2'>
                <NavLink to="/home" className='navLink' ><button>Home</button> </NavLink>
                  <NavLink to="/" className='navLink' ><button>Login</button></NavLink>
                  <NavLink to="/form" className='navLink' ><button>Register</button> </NavLink>
                </div>
              }
            </div>
          </div>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<HomePage userName={userName} />} />
            <Route path='/books' element={<BookList />} />
            <Route path='/bookpage' element={<Bookpage />} />
            <Route path='/form' element={<Form1 />} />
            <Route path='/cart' element={<Cart />} /> 
            <Route path='/add-book' element={<AddBook />} />
            <Route path='/edit-book' element={<EditBook />} />
            <Route path='/userpage' element={<UserPage />} />
            <Route path='/add-user' element={<AddUser />} />
            <Route path='/edit-user' element={<EditUser />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/updateprofile' element={<Updateprofile />} />
            <Route path='/categorypage' element={<CategoryPage/>}/>
            <Route path='/edit-category' element={<EditCategory/>}/>
            <Route path='/add-category' element={<AddCategory/>}/>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
