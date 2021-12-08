import styled from 'styled-components'

const LargeButtonStyle = styled.button`
  padding: 8px 16px;
  font-size: 20px;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.font};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`

const SmallButtonStyle = styled.button`
  padding: 6px 10px;
  font-size: 14px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 5px;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`

export { LargeButtonStyle, SmallButtonStyle }
