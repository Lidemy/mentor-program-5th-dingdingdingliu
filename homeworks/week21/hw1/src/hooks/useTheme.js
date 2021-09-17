import { useState, useCallback } from 'react'
import { lightTheme, darkTheme } from '../theme/theme'

export default function useTheme() {
  const [theme, setTheme] = useState(darkTheme)

  const handleThemeChange = useCallback(() => {
    const mode = theme === darkTheme ? lightTheme : darkTheme
    setTheme((theme) => mode)
  }, [theme])

  return { theme, setTheme, handleThemeChange }
}
