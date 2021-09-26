import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getAllPosts, limitPerPage } from '../../WebAPI'
import { Link } from 'react-router-dom'

const ButtonStyle = styled(Link)`
  background: white;
  padding: 8px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  color: gray;

  &:hover {
    border: 1px solid gray;
  }
`
const PaginatorDiv = styled.div`
  margin: 20px auto;
`

function PaginatorButton({ value, page }) {
  return <ButtonStyle to={`/${page}`}>{value}</ButtonStyle>
}

export default function PaginatorComponent({ value }) {
  const [pages, setPages] = useState([])

  useEffect(() => {
    getAllPosts().then((posts) => {
      const postsLength = posts.length
      const totalPage = Math.ceil(postsLength / limitPerPage)
      const pagesArray = []
      for (let i = 1; i <= totalPage; i++) {
        pagesArray.push(i)
      }
      setPages((pages) => pagesArray)
    })
  }, [])

  return (
    <PaginatorDiv>
      {pages.map((page) => {
        return <PaginatorButton key={page} value={page} page={page} />
      })}
    </PaginatorDiv>
  )
}
