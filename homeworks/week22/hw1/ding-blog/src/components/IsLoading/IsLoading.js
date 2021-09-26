import styled from 'styled-components'
import { css } from '@emotion/react'
import DotLoader from 'react-spinners/DotLoader'

const IsLoadingDiv = styled.div`
  background: rgba(255, 255, 255, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IsLoadingStyle = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
`

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

export function IsLoadingComponent() {
  return (
    <IsLoadingDiv>
      <IsLoadingStyle>
        <DotLoader color='gray' css={override} size={60} />
      </IsLoadingStyle>
    </IsLoadingDiv>
  )
}
