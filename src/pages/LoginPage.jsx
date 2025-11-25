import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      login({ username })
      const redirectTo = location.state?.from?.pathname ?? '/'
      navigate(redirectTo, { replace: true })
    } catch (submitError) {
      setError(submitError.message)
    }
  }

  return (
    <section className="auth-section">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <p>Введите ник для авторизации.</p>
        <label>
          Имя пользователя
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Например, Попа_хХ"
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Начать тратить деньги</button>
      </form>
    </section>
  )
}

