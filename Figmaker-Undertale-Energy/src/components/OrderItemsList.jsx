export default function OrderItemsList({ items }) {
  return (
    <section className="order-detail-card purchased-items-card">
      <div className="order-card-heading">
        <span>02</span>
        <h2>Produtos</h2>
        <small>
          {items.reduce((sum, item) => sum + item.quantity, 0)} UNIDADES
        </small>
      </div>
      <div className="purchased-items">
        {items.map((item) => (
          <article
            className="purchased-item"
            key={item.productId}
            style={{ "--item-color": item.product.color }}
          >
            <img src={item.product.image} alt={`Lata ${item.product.name}`} />
            <div>
              <span>
                <img src={item.product.soulImage} alt="" />
                {item.product.personality}
              </span>
              <h3>{item.product.name}</h3>
              <p>{item.product.flavor} · sabor sugerido</p>
              <small>{item.unitPriceFormatted} / unidade</small>
            </div>
            <div className="purchased-item-value">
              <span>QTD {String(item.quantity).padStart(2, "0")}</span>
              <strong>{item.totalFormatted}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
