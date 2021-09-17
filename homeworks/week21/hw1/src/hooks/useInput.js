import { useState } from 'react'

export default function useInput() {
  const [value, setValue] = useState('')

  const handleInputChange = (e) => {
    setValue((value) => e.target.value)
  }

  return { value, setValue, handleInputChange }
}
