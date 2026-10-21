export default function ProductCard({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const selected = quantity > 0
  const style = { "--soul-color": product.color }

  return (
    <article
      className={`product-card${selected ? " is-selected" : ""}`}
      style={style}
    >
      <div className="product-image">
        <img
          src={product.image}
          alt={`Lata ${product.name}, sabor ${product.flavor}`}
        />
      </div>
      <div className="soul-line" />
      <div className="product-info">
        <div className="personality">
          <img src={product.soulImage} alt="" width="12" height="12" />
          <span>{product.personality}</span>
        </div>
        <div>
          <h3>{product.name}</h3>
          <p>{product.flavor} · sabor sugerido</p>
        </div>
        <div className="price">
          <strong>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
          <small>/ lata</small>
        </div>

        {selected ? (
          <div className="product-selection">
            <div className="quantity-control">
              <button
                type="button"
                onClick={() => onDecrement(product.id)}
                aria-label={`Remover uma unidade de ${product.name}`}
              >
                −
              </button>
              <span>
                <b>{quantity}</b>
                <small>Selecionada ✓</small>
              </span>
              <button
                type="button"
                onClick={() => onIncrement(product.id)}
                aria-label={`Adicionar uma unidade de ${product.name}`}
              >
                +
              </button>
            </div>
            <button
              className="remove-product"
              type="button"
              onClick={() => onRemove(product.id)}
            >
              Remover da seleção
            </button>
          </div>
        ) : (
          <button
            className="select-product"
            type="button"
            onClick={() => onIncrement(product.id)}
            aria-pressed="false"
          >
            <span>Escolher esta alma</span>
            <b>+</b>
          </button>
        )}
      </div>
    </article>
  )
}
