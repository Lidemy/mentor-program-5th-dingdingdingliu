import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonStyle } from '../../components/Button/Button'
import { createNewPost } from '../../WebAPI'
import { AuthContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading/IsLoading'
import { LoadingContext } from '../../context'

const NewPostDivStyle = styled.div`
  display: flex;
  flex-direction: column;
`

const NewPostFormStyle = styled.form`
  margin: 0px auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`

const TitleDivStyle = styled.div`
  margin: 10px 0;
  color: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InputStyle = styled.input`
  width: 100vh;
  border: 2px solid lightgrey;
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
  outline: none;
`

const ContentDivStyle = styled.div`
  margin-top: 30px;
  color: gray;
  width: 110vh;
  display: flex;
  flex-direction: column;
`

const TextAreaStyle = styled.textarea`
  border: 2px solid lightgrey;
  border-radius: 5px;
  margin-top: 10px;
  outline: none;
`

const NewPostButtonStyle = styled(ButtonStyle)`
  margin-top: 20px;
`

const ErrMsgDivStyle = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`

export default function NewPostPage() {
  const { user } = useContext(AuthContext)
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  let history = useHistory()
  const handleSubmit = (e) => {
    setIsLoading((isLoading) => true)
    e.preventDefault()
    setErrorMsg('')
    createNewPost(title, body).then((res) => {
      setIsLoading((isLoading) => false)
      if (res.ok === 0) return setErrorMsg((errorMsg) => res.message)
      history.push('/')
    })
  }

  if (!user) history.push('/')

  return (
    <NewPostDivStyle>
      {isLoading && <IsLoadingComponent />}
      <NewPostFormStyle onSubmit={handleSubmit}>
        <TitleDivStyle>
          Title:
          <InputStyle
            type='text'
            value={title}
            onChange={(e) => setTitle((title) => e.target.value)}
          />
        </TitleDivStyle>
        <ContentDivStyle>
          Content:
          <TextAreaStyle
            rows='30'
            cols='30'
            type='text'
            value={body}
            onChange={(e) => setBody((password) => e.target.value)}
          />
        </ContentDivStyle>
        <NewPostButtonStyle>Submit</NewPostButtonStyle>
        {errorMsg && <ErrMsgDivStyle>{errorMsg}</ErrMsgDivStyle>}
      </NewPostFormStyle>
    </NewPostDivStyle>
  )
}
