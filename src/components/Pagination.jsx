export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        ←
      </button>
      <div className="pagination-pages">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`pagination-page ${
              pageNumber === page ? 'is-active' : ''
            }`}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        →
      </button>
    </div>
  )
}

