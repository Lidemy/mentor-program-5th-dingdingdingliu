import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { deleteAuthToken } from '../../utils'
import { AuthContext } from '../../context'
import HeaderBackground from '../../img/0613.jpg'

const HeaderDiv = styled.div``

const HeaderImg = styled.div`
  height: 630px;
  background-image: url(${HeaderBackground});
  position: relative;
  top: -110px;
`

const HeaderContainer = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: transparent;
  padding: 10px;

  &.navbarActive {
    background: white;
    transition: 2s all;
  }
`

const HeaderContainerLeft = styled.div`
  display: flex;
  align-items: center;
`

const Brand = styled.h1`
  color: #625b57;
  margin-right: 10px;
`

const NavbarList = styled.div`
  margin-top: 8px;
  display: flex;
`

const Nav = styled(Link)`
  display: flex;
  font-size: 20px;
  padding: 0px 8px;
  padding-bottom: 2px;
  cursor: pointer;
  color: gray;
  text-decoration: none;

  & + & {
    margin-left: 8px;
  }

  ${(props) =>
    props.$active &&
    `
  font-weight: bold;
  color: #625b57;
  `}
`

export default function Header() {
  const { user, setUser } = useContext(AuthContext)
  const [navbar, setNavbar] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  let history = useHistory()

  const changeBackground = () => {
    if (window.scrollY >= 150) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    changeBackground()
    window.addEventListener('scroll', changeBackground)
  }, [])

  const handleLogout = () => {
    deleteAuthToken()
    setUser(null)
    if (pathname !== '/') history.push('/')
  }

  return (
    <HeaderDiv>
      <HeaderImg />
      <HeaderContainer className={navbar ? 'navbarActive' : 'navbar'}>
        <HeaderContainerLeft>
          <Brand>Mice Parade</Brand>
          <NavbarList>
            <Nav to='/' $active={pathname === '/'}>
              Home
            </Nav>
            <Nav to='/about' $active={pathname === '/about'}>
              About
            </Nav>
            {user && (
              <Nav to='/new-post' $active={pathname === '/new-post'}>
                New Post
              </Nav>
            )}
          </NavbarList>
        </HeaderContainerLeft>
        <div>
          <NavbarList>
            <Nav to='/register' $active={pathname === '/register'}>
              Sign Up
            </Nav>
            {!user && (
              <Nav to='/login' $active={pathname === '/login'}>
                Login
              </Nav>
            )}
            {user && (
              <Nav to='/' onClick={handleLogout}>
                Logout
              </Nav>
            )}
          </NavbarList>
        </div>
      </HeaderContainer>
    </HeaderDiv>
  )
}
