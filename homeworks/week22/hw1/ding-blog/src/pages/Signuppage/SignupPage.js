import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonStyle } from '../../components/Button/Button'
import { register, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading/IsLoading'
import { LoadingContext } from '../../context'

const SignupDivStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

const SignupFormStyle = styled.form`
  border: 2px solid lightgrey;
  border-radius: 5px;
  padding: 80px 60px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TitleStyle = styled.div`
  color: gray;
  font-size: 26px;
  text-align: center;
  margin-bottom: 20px;
`

const InputDivStyle = styled.div`
  margin: 10px 0;
  color: gray;
`

const InputStyle = styled.input`
  margin-left: 10px;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 3px;
`

const SignupButtonStyle = styled(ButtonStyle)`
  margin-top: 20px;
`

const ErrMsgDivStyle = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`

export default function LoginPage() {
  const { setUser } = useContext(AuthContext)
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  let history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading((isLoading) => true)
    setErrorMsg((errorMsg) => null)
    register(nickname, username, password).then((data) => {
      setIsLoading((isLoading) => false)
      if (data.ok === 0) return setErrorMsg((errorMsg) => data.message)
      setAuthToken(data.token)
      getMe().then((res) => {
        if (res.ok !== 1) return setErrorMsg((errorMsg) => res.message)
        setUser(res.data)
        history.push('/')
      })
    })
  }

  return (
    <SignupDivStyle>
      {isLoading && <IsLoadingComponent />}
      <TitleStyle>Sign Up</TitleStyle>
      <SignupFormStyle onSubmit={handleSubmit}>
        <InputDivStyle>
          username:
          <InputStyle
            type='text'
            value={username}
            onChange={(e) => setUsername((username) => e.target.value)}
          />
        </InputDivStyle>
        <InputDivStyle>
          nickname:
          <InputStyle
            type='text'
            value={nickname}
            onChange={(e) => setNickname((nickname) => e.target.value)}
          />
        </InputDivStyle>
        <InputDivStyle>
          password:
          <InputStyle
            type='password'
            value={password}
            onChange={(e) => setPassword((password) => e.target.value)}
          />
        </InputDivStyle>
        <SignupButtonStyle>SignUp</SignupButtonStyle>
        {errorMsg && <ErrMsgDivStyle>{errorMsg}</ErrMsgDivStyle>}
      </SignupFormStyle>
    </SignupDivStyle>
  )
}
