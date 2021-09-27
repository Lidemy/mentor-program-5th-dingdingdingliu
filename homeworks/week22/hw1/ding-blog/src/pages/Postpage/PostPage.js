import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { HashRouter as Router, useParams, useHistory } from 'react-router-dom'
import { getPost } from '../../WebAPI'
import { IsLoadingComponent } from '../../components/IsLoading/IsLoading'
import { LoadingContext } from '../../context'
import PostImg from '../../img/bear.png'

const PostContainer = styled.div`
  width: 100%;
  margin: 10px auto;
  padding: 20px 10px;
  display: flex;
`

const PostDiv = styled.div`
  width: 60%;
  margin: 30px auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
`

const PostInfo = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
`

const PostTitle = styled.div`
  font-size: 30px;
  color: gray;
  padding: 10px;
  margin: 10px 0px;
`

const PostDate = styled.div`
  font-size: 14px;
  color: gray;
  padding: 10px;
  margin: 20px 0px 10px 0px;
`

const PostContent = styled.div`
  font-size: 16px;
  color: gray;
  padding: 10px;
  margin: 10px 0px;
  white-space: pre-wrap;
`

const Img = styled.img`
  height: 460px;
`

export default function PostPage() {
  const [post, setPost] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    setIsLoading((isLoading) => true)
    getPost(id).then((post) => {
      setIsLoading((isLoading) => false)
      if (post.length <= 0) return history.push('/')
      post.length > 0 && setPost(post[0])
    })
  }, [id, history, setIsLoading])

  return (
    <PostContainer>
      {isLoading && <IsLoadingComponent />}
      <Img src={PostImg} className='img' />
      <PostDiv>
        <PostInfo>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
        </PostInfo>
        <PostContent>{post.body}</PostContent>
      </PostDiv>
    </PostContainer>
  )
}
