import InputComponent from '../input'
import CheckboxComponent from '../checkbox'
import SubmitButton from '../button'
import { useState } from 'react'
import {
  FormIntroDiv,
  FormTitleStyle,
  FormIntroStyle,
  FormIntroSpanStyle,
  FormStyle,
  RemarkStyle,
} from './FormComponentStyle'

function FormTitle({ children }) {
  return <FormTitleStyle>{children}</FormTitleStyle>
}

function FormIntro() {
  return (
    <FormIntroDiv>
      <FormIntroStyle>活動日期：2020/12/10 ~ 2020/12/11</FormIntroStyle>
      <FormIntroStyle>活動地點：台北市大安區新生南路二段1號</FormIntroStyle>
      <FormIntroSpanStyle>* : 必填</FormIntroSpanStyle>
    </FormIntroDiv>
  )
}

export default function FormComponent({ value, onBlur }) {
  const [formData, setFormData] = useState({})
  const [isValid, setIsValid] = useState({
    nickname: false,
    email: false,
    number: false,
    type: false,
    referral: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    for (const key in isValid) {
      if (isValid[key] === false) {
        alert('請依規則填寫必填欄位')
        return
      }
    }
    const dataTemplate = `
      暱稱:  ${formData.nickname}
      電子郵件:  ${formData.email}
      手機號碼:  ${formData.number}
      報名類型:  ${formData.type}
      如何得知:  ${formData.referral}
      其他: ${formData.suggestion || ''} 
    `
    alert(dataTemplate)
  }

  return (
    <FormStyle onSubmit={handleSubmit}>
      <FormTitle>新拖延運動報名表單</FormTitle>
      <FormIntro />
      <InputComponent
        className='require'
        title='暱稱'
        name='nickname'
        span='*'
        placeholder='您的暱稱'
        value={value}
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        setIsValid={setIsValid}
        onBlur={onBlur}
      />
      <InputComponent
        className='require'
        title='電子郵件'
        name='email'
        span='*'
        placeholder='您的電子郵件'
        value={value}
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        setIsValid={setIsValid}
        onBlur={onBlur}
      />
      <InputComponent
        className='require'
        title='手機號碼'
        name='number'
        span='*'
        placeholder='您的手機號碼'
        value={value}
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        setIsValid={setIsValid}
        onBlur={onBlur}
      />
      <CheckboxComponent
        className='require'
        span='*'
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        setIsValid={setIsValid}
      />
      <InputComponent
        className='require'
        title='怎麼知道這個活動的?'
        name='referral'
        span='*'
        placeholder='怎麼知道這個活動的?'
        value={value}
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        setIsValid={setIsValid}
        onBlur={onBlur}
      />
      <InputComponent
        name='suggestion'
        title='其他'
        placeholder='其他'
        content='對活動的一些建議'
        value={value}
        formData={formData}
        setFormData={setFormData}
      ></InputComponent>
      <SubmitButton>提交</SubmitButton>
      <RemarkStyle>請勿透過表單送出你的密碼</RemarkStyle>
    </FormStyle>
  )
}
