import { useMemo } from 'react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const isEmpty = useMemo(() => items.length === 0, [items])

  if (isEmpty) {
    return (
      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Корзина</p>
            <h1>Корзина пуста</h1>
            <p>Нет товаров, на которые можно потратить деньги</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Корзина</p>
          <h1>Ваши товары</h1>
        </div>
        <button type="button" className="ghost" onClick={clearCart}>
          По новой
        </button>
      </div>
      <div className="cart-list">
        {items.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>{item.price} $</p>
              <label>
                Количество
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(
                      item.id,
                      Math.max(1, Number(event.target.value) || 1),
                    )
                  }
                />
              </label>
            </div>
            <p className="cart-item-total">{item.price * item.quantity} $</p>
            <button
              type="button"
              className="ghost"
              onClick={() => removeItem(item.id)}
            >
              Удалить
            </button>
          </article>
        ))}
      </div>
      <div className="cart-footer">
        <p>Итого: {total.toFixed(2)} $</p>
        <button type="button">Потратить деньги</button>
      </div>
    </section>
  )
}

