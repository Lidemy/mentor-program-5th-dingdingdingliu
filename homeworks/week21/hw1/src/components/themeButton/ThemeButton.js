import styled from 'styled-components'
import { SmallButtonStyle } from '../button/Button'

const ThemeButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.font};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  margin-left: 8px;
`

export default function ThemeButton({ children, handleThemeChange }) {
  return (
    <ThemeButtonStyle onClick={handleThemeChange}>{children}</ThemeButtonStyle>
  )
}
