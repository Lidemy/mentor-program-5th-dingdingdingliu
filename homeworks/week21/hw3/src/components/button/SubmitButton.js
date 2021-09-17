import styled from 'styled-components'

const ButtonStyle = styled.button`
  padding: 10px 18px;
  font-size: 14px;
  background: #fad312;
  border-radius: 5px;
  border: none;
  border-radius: 3px;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`

export default function SubmitButton({ children }) {
  return <ButtonStyle>{children}</ButtonStyle>
}
