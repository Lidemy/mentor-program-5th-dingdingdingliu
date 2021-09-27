import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { HashRouter as Router, Link, useParams } from 'react-router-dom'
import PaginatorComponent from '../../components/Paginator'
import { getPostsPerPage } from '../../WebAPI'
import { IsLoadingComponent } from '../../components/IsLoading/IsLoading'
import { LoadingContext } from '../../context'
import PostImg from '../../img/bear.png'

const HomepageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  margin-top: 40px;
`
const Posts = styled.div``

const PostContainer = styled.div`
  width: 60%;
  height: 150px;
  margin: 10px auto;
  border-bottom: 1px solid silver;
  padding: 20px 10px;
  display: flex;
  align-item: center;
  justify-content: flex-start;
`

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
`

const PostTitle = styled(Link)`
  font-size: 32px;
  color: gray;
  text-decoration: none;
`

const PostDate = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: gray;
`

const Img = styled.img``

function Post({ post }) {
  return (
    <PostContainer>
      <Img src={PostImg} />
      <PostDiv>
        <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
      </PostDiv>
    </PostContainer>
  )
}

Post.propTypes = {
  post: PropTypes.object,
}

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { page } = useParams()
  useEffect(() => {
    setIsLoading((isLoading) => true)
    if (!page) {
      getPostsPerPage(1).then((posts) => {
        setIsLoading((isLoading) => false)
        setPosts(posts)
      })
    }
    getPostsPerPage(page).then((posts) => {
      setIsLoading((isLoading) => false)
      setPosts(posts)
    })
  }, [page, setIsLoading])

  return (
    <HomepageDiv>
      {isLoading && <IsLoadingComponent />}
      <Posts>
        {posts.map((post) => {
          return <Post key={post.id} post={post}></Post>
        })}
      </Posts>
      <PaginatorComponent />
    </HomepageDiv>
  )
}
