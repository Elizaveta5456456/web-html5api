import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const controller = new AbortController()
    const loadProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`,
          { signal: controller.signal },
        )
        if (!response.ok) {
          throw new Error('Товар не найден')
        }
        const data = await response.json()
        setProduct(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
    return () => controller.abort()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, quantity)
    setMessage('Товар добавлен в корзину')
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) {
    return (
      <section className="product-detail">
        <div className="loader">Загрузка товара...</div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="product-detail">
        <div className="info-banner error">{error ?? 'Ошибка загрузки'}</div>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <div className="product-gallery">
        <img src={product.thumbnail} alt={product.title} />
        <div className="product-thumbnails">
          {(product.images ?? []).slice(0, 4).map((image) => (
            <img key={image} src={image} alt={product.title} loading="lazy" />
          ))}
        </div>
      </div>
      <div className="product-info">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-specs">
          <p>
            <span>Бренд:</span> {product.brand}
          </p>
          <p>
            <span>Рейтинг:</span> {product.rating}
          </p>
          <p>
            <span>В наличии:</span> {product.stock} шт.
          </p>
        </div>
        <div className="product-purchase">
          <p className="product-price">{product.price} $</p>
          <label className="quantity-control">
            Количество
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(event) => {
                const nextValue = Number(event.target.value) || 1
                setQuantity(Math.min(Math.max(1, nextValue), product.stock))
              }}
            />
          </label>
        </div>
        {!isAuthenticated && (
          <div className="info-banner">
            Авторизуйтесь, чтобы добавлять товары в корзину
          </div>
        )}
        <button
          type="button"
          disabled={!isAuthenticated}
          onClick={handleAddToCart}
        >
          Добавить в корзину
        </button>
        {message && <p className="success-text">{message}</p>}
      </div>
    </section>
  )
}

