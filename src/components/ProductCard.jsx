import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const rating = Number(product.rating ?? 0).toFixed(1)

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-thumb">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-category">{product.category}</p>
        <div className="product-meta">
          <span className="product-price">{product.price} $</span>
          <span className="product-rating">★ {rating}</span>
        </div>
      </div>
    </article>
  )
}

