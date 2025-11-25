import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>Пупупу</h1>
      <p>Чета тут ничего нет</p>
      <Link to="/" className="link-button">
        Вернуться на главную
      </Link>
    </section>
  )
}

