import {
  WrapperDivStyle,
  FormTitlesStyle,
  FormInputStyle,
  ErrorMsgStyle,
  RemarkStyle,
  SpanStyle,
} from './InputComponentStyle'
import { useState } from 'react'

function FormTitle({ span, title }) {
  return (
    <FormTitlesStyle>
      {title}
      <SpanStyle>{span}</SpanStyle>
    </FormTitlesStyle>
  )
}

function checkValid(value) {
  let valid
  value.length > 0 ? (valid = true) : (valid = false)
  return valid
}

export default function InputComponent({
  className,
  title,
  name,
  placeholder,
  span,
  content,
  formData,
  setFormData,
  isValid,
  setIsValid,
}) {
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState()

  const handleInputChange = (e) => {
    const targetValue = e.target.value.trim(' ')
    if (e.target.classList.contains('require')) {
      const valid = checkValid(targetValue)
      const newIsValid = {
        ...isValid,
        [e.target.name]: valid,
      }
      setIsValid((isValid) => newIsValid)
    }
    setValue((value) => e.target.value)
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    setFormData((formData) => newFormData)
  }

  function formVerify(e) {
    let msg
    let returnMsg
    const rule1 = /^.{1,20}$/
    const rule2 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
    const rule3 = /^09\d{8}/
    const target = e.target
    if (target.name === 'nickname') {
      msg = '請輸入 20 字以內暱稱'
      returnMsg = inputVerify(rule1, target, msg)
    }
    if (target.name === 'email') {
      msg = '請輸入正確格式電子郵件地址'
      returnMsg = inputVerify(rule2, target, msg)
    }
    if (target.name === 'number') {
      msg = '請輸入10位數手機號碼'
      returnMsg = inputVerify(rule3, target, msg)
    }
    if (target.name === 'referral') {
      msg = '請輸入 20 字以內內容'
      returnMsg = inputVerify(rule1, target, msg)
    }
    return returnMsg
  }

  function inputVerify(rule, target, msg) {
    let returnMsg
    const value = target.value
    if (!rule.test(value)) {
      returnMsg = msg
    } else {
      returnMsg = ''
    }
    return returnMsg
  }

  const handleOnBlur = (e) => {
    if (e.target.classList.contains('require')) {
      let ErrorMsg = formVerify(e)
      if (ErrorMsg) {
        setErrorMsg((errorMsg) => ErrorMsg)
        setIsValid((isValid) => ({
          ...isValid,
          [e.target.name]: false,
        }))
        return
      }
      setErrorMsg((errorMsg) => '')
      setIsValid((isValid) => ({
        ...isValid,
        [e.target.name]: true,
      }))
    }
  }

  return (
    <WrapperDivStyle>
      <FormTitle title={title} span={span}></FormTitle>
      <RemarkStyle>{content}</RemarkStyle>
      <FormInputStyle
        className={className}
        name={name}
        value={value}
        type='text'
        placeholder={placeholder}
        onChange={handleInputChange}
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        setIsValid={setIsValid}
        onBlur={handleOnBlur}
      />
      {errorMsg && <ErrorMsgStyle>{errorMsg}</ErrorMsgStyle>}
    </WrapperDivStyle>
  )
}
