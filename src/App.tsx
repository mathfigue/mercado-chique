import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'

import { Navbar } from './components'

import { GlobalStyles, theme } from 'theme/theme'

import { Dashboard, Cart, ProductDetail } from './routes'

import { StoreProvider } from 'store'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/cart' component={Cart} />
            <Route path='/product-detail/:id' component={ProductDetail} />
            <Route path='*' component={Dashboard} />
          </Switch>
        </StoreProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
