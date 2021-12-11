import styled from 'styled-components'
import { SmallButtonStyle } from '../button/Button'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/actions'

const ThemeButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.font};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  margin-left: 8px;
`

export default function ThemeButton() {
  const dispatch = useDispatch()
  return (
    <ThemeButtonStyle
      onClick={() => {
        dispatch(toggleTheme())
      }}
    >
      Color Mode
    </ThemeButtonStyle>
  )
}
