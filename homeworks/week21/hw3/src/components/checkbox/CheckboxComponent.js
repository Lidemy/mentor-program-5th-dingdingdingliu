import styled from 'styled-components'

const CheckboxDivStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

const TitleStyle = styled.div`
  font-size: 18px;
  margin: 10px 0px;
`
const SpanStyle = styled.span`
  color: #e74149;
`

function Title({ title, span }) {
  return (
    <TitleStyle>
      {title}
      <SpanStyle>{span}</SpanStyle>
    </TitleStyle>
  )
}

function checkValid(value) {
  let valid
  value.length > 0 ? (valid = true) : (valid = false)
  return valid
}

export default function CheckboxComponent({
  formData,
  setFormData,
  span,
  isValid,
  setIsValid,
}) {
  const handleCheckChange = (e) => {
    const valid = checkValid(e.target.value)
    const newIsValid = {
      ...isValid,
      [e.target.name]: valid,
    }
    setIsValid((isValid) => newIsValid)
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    setFormData((formData) => newFormData)
  }
  return (
    <CheckboxDivStyle>
      <Title
        title='報名類型'
        span={span}
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        setIsValid={setIsValid}
      ></Title>
      <label>
        躺在床上用想像力實作
        <input
          type='radio'
          name='type'
          onClick={handleCheckChange}
          value='躺在床上用想像力實作'
        />
      </label>
      <label>
        趴在地上滑手機找現成的
        <input
          type='radio'
          name='type'
          onClick={handleCheckChange}
          value='趴在地上滑手機找現成的'
        />
      </label>
    </CheckboxDivStyle>
  )
}
