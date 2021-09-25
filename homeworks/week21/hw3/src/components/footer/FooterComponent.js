import styled from 'styled-components'

const FooterDivStyle = styled.div`
  width: 100%;
  font-size: 16px;
  color: #999999;
  background: black;
  padding: 15px 0px;
  text-align: center;
  margin-top: 30px;
`

function FooterDiv({ children }) {
  return <FooterDivStyle>{children}</FooterDivStyle>
}

export default function FooterComponent() {
  return <FooterDiv>© 2021 © Copyright. All rights Reserved.</FooterDiv>
}
