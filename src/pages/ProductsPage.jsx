import { useEffect, useMemo, useState } from 'react'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'

const PAGE_SIZE = 12

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      const skip = (page - 1) * PAGE_SIZE
      const baseUrl = searchTerm
        ? 'https://dummyjson.com/products/search'
        : 'https://dummyjson.com/products'
      const params = new URLSearchParams({
        limit: PAGE_SIZE,
        skip,
      })
      if (searchTerm) {
        params.set('q', searchTerm)
      }
      try {
        const response = await fetch(`${baseUrl}?${params.toString()}`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error('Не робит')
        }
        const data = await response.json()
        setProducts(data.products)
        setTotal(data.total)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [page, searchTerm])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setPage(1)
    setSearchTerm(searchInput.trim())
  }

  const handleReset = () => {
    setSearchInput('')
    setSearchTerm('')
    setPage(1)
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Каталог</p>
          <h1>🛒🛒🛒</h1>
        </div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Товар пиши"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button type="submit">Искать</button>
          {searchTerm && (
            <button type="button" className="ghost" onClick={handleReset}>
              По новой
            </button>
          )}
        </form>
      </div>
      {error && <div className="info-banner error">{error}</div>}
      {!error && searchTerm && (
        <div className="info-banner">
          «{searchTerm}» — найдено {total} товаров
        </div>
      )}
      {loading ? (
        <div className="loader">Загрузка</div>
      ) : products.length === 0 ? (
        <p>Ничо нет</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </section>
  )
}

