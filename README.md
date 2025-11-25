# Eli-market


## Файлы
- `src/main.jsx` — точка входа, подключение роутера и контекстов.
- `src/App.jsx` — определяет корневой роутинг приложения.
- `src/pages/ProductsPage.jsx` — список товаров, фильтры и пагинация.
- `src/pages/ProductDetailPage.jsx` — карточка товара.
- `src/pages/CartPage.jsx` — корзина с расчётом итоговой стоимости.
- `src/pages/LoginPage.jsx` — форма логина и переход к защищённым страницам.
- `src/components/Pagination.jsx` и `src/components/ProductCard.jsx` — UI-компоненты для листинга товаров.
- `src/context/AuthContext.jsx` и `src/context/CartContext.jsx` — глобальные состояния авторизации и корзины.

## Запуск локально
```bash
npm install      # установка зависимостей
npm run dev      # запуск локалхост
npm run build    # сборка production-бандла в dist/
npm run preview  # предпросмотр собранной версии
```

## Краткое описание функционала
- Каталог товаров с пагинацией и поиском.
- Страница детализации товара с описанием и ценой.
- Корзина с подсчётом итоговой суммы.
- Простая авторизация и защищённые маршруты.

