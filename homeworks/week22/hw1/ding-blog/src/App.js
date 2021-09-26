import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent from './components/Header'
import FooterComponent from './components/Footer'
import HomePage from './pages/Homepage'
import AboutPage from './pages/Aboutpage'
import SignupPage from './pages/Signuppage'
import LoginPage from './pages/Loginpage'
import PostPage from './pages/Postpage'
import NewPostPage from './pages/Newpostpage'
import { AuthContext, LoadingContext } from './context'
import { getMe } from './WebAPI'
import { getAuthToken } from './utils'

const Root = styled.div`
  padding-top: 110px;
`

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = getAuthToken()
  useEffect(() => {
    if (!token) return setIsLoading((isLoading) => false)
    getMe().then((res) => {
      if (res.ok !== 1) return
      setUser(res.data)
    })
  }, [token])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Root>
          <Router>
            <HeaderComponent />
            <Switch>
              <Route exact path='/'>
                <HomePage />
              </Route>
              <Route path='/about'>
                <AboutPage />
              </Route>
              <Route path='/login'>
                <LoginPage />
              </Route>
              <Route path='/register'>
                <SignupPage />
              </Route>
              <Route path='/post/:id'>
                <PostPage />
              </Route>
              <Route path='/new-post'>
                <NewPostPage />
              </Route>
              <Route path='/:page'>
                <HomePage />
              </Route>
            </Switch>
            <FooterComponent />
          </Router>
        </Root>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
