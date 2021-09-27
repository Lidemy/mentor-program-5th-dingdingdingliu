import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { HashRouter as Router, Link, useParams } from 'react-router-dom'
import { IsLoadingComponent } from '../../components/IsLoading/IsLoading'
import { LoadingContext } from '../../context'
import AboutImg from '../../img/logo.png'

const AboutContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 10px auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  height: 20px;
`

const AboutContentStyle = styled.div`
  color: #808080;
  text-align: center;
  font-weight: bold;
`

function AboutContent() {
  return (
    <AboutContainer>
      <Img src={AboutImg} />
      <AboutContentStyle>
        <h3>Mice Parade</h3>
        <p>聽著 Mice Parade 中長出的部落格</p>
        <p></p>
      </AboutContentStyle>
    </AboutContainer>
  )
}

export default function PostPage() {
  return (
    <AboutContainer>
      <AboutContent></AboutContent>
    </AboutContainer>
  )
}
