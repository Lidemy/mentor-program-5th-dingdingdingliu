import styled from 'styled-components'
import { SmallButtonStyle } from '../button/Button'
import { setFilter, deleteAllTodos } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import FILTERS from '../../constants/filtersConstant'

const HeaderDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0px 10px 0px;
`
const TitleWrapper = styled.p`
  font-size: 56px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.font};
  text-align: center;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 10px;

  span {
    color: ${(props) => props.theme.colors.span};
  }
`
const SmallTitle = styled(TitleWrapper)`
  color: ${(props) => props.theme.colors.spFont};
  font-size: 20px;
  border: none;
  margin-bottom: 20px;
`

const DeleteAllButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.font};
  border: 2px solid ${(props) => props.theme.colors.border};
  margin-left: 8px;
`
const ShowAllButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.font};
  border: 2px solid ${(props) => props.theme.colors.border};
`

const ShowDoneButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.done};
  border: 2px solid ${(props) => props.theme.colors.done};
  margin-left: 8px;
`

const ShowUndoneButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.undone};
  border: 2px solid ${(props) => props.theme.colors.undone};
  margin-left: 8px;
`

function Title() {
  return (
    <TitleWrapper>
      Hello<span>!</span> Todo
    </TitleWrapper>
  )
}

export default function Header() {
  const dispatch = useDispatch()
  return (
    <HeaderDiv>
      <Title />
      <SmallTitle>So glad to see you here to list your Todo.</SmallTitle>
      <div>
        <ShowAllButtonStyle onClick={() => dispatch(setFilter(FILTERS.ALL))}>
          Show All
        </ShowAllButtonStyle>
        <ShowUndoneButtonStyle
          onClick={() => dispatch(setFilter(FILTERS.UNDONE))}
        >
          Show Undone
        </ShowUndoneButtonStyle>
        <ShowDoneButtonStyle onClick={() => dispatch(setFilter(FILTERS.DONE))}>
          Show Done
        </ShowDoneButtonStyle>
        <DeleteAllButtonStyle
          onClick={() => {
            dispatch(deleteAllTodos())
          }}
        >
          Delete All
        </DeleteAllButtonStyle>
      </div>
    </HeaderDiv>
  )
}
