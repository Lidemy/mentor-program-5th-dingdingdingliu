import styled from 'styled-components'
import { SmallButtonStyle } from '../button/Button'

const HeaderDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`
const ButtonDiv = styled.div``

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

function ShowUndoneButton({ className, children, onClick }) {
  return (
    <ShowUndoneButtonStyle className={className} onClick={onClick}>
      {children}
    </ShowUndoneButtonStyle>
  )
}

function ShowDoneButton({ className, children, onClick }) {
  return (
    <ShowDoneButtonStyle className={className} onClick={onClick}>
      {children}
    </ShowDoneButtonStyle>
  )
}

function ShowAllButton({ className, children, onClick }) {
  return (
    <ShowAllButtonStyle className={className} onClick={onClick}>
      {children}
    </ShowAllButtonStyle>
  )
}

function DeleteAllButton({ className, children, onClick }) {
  return (
    <DeleteAllButtonStyle className={className} onClick={onClick}>
      {children}
    </DeleteAllButtonStyle>
  )
}

function Title() {
  return (
    <TitleWrapper>
      Hello<span>!</span> Todo
    </TitleWrapper>
  )
}

export default function Header({
  handleDeleteAll,
  handleShowAll,
  handleShowDone,
  handleShowUndone,
}) {
  return (
    <HeaderDiv>
      <Title />
      <SmallTitle>So glad to see you here to list your Todo.</SmallTitle>
      <ButtonDiv>
        <ShowAllButton onClick={handleShowAll}>Show All</ShowAllButton>
        <ShowUndoneButton onClick={handleShowUndone}>
          Show Undone
        </ShowUndoneButton>
        <ShowDoneButton onClick={handleShowDone}>Show Done</ShowDoneButton>
        <DeleteAllButton onClick={handleDeleteAll}>Delete All</DeleteAllButton>
      </ButtonDiv>
    </HeaderDiv>
  )
}
