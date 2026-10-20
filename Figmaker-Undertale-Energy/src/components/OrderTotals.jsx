export default function OrderTotals({
  subtotal,
  shipping,
  total,
  orderNumber,
}) {
  return (
    <section className="order-detail-card order-totals-card">
      <div className="order-card-heading">
        <span>03</span>
        <h2>Resumo financeiro</h2>
      </div>
      <div className="paid-total-lines">
        <p>
          <span>Subtotal</span>
          <strong>{subtotal}</strong>
        </p>
        <p>
          <span>Frete (simulação)</span>
          <strong>{shipping}</strong>
        </p>
      </div>
      <div className="paid-grand-total">
        <div>
          <span>Total pago</span>
          <small>PEDIDO {orderNumber}</small>
        </div>
        <strong>{total}</strong>
      </div>
      <p className="simulation-note">
        Pagamento simulado aprovado. Nenhuma cobrança real foi processada.
      </p>
    </section>
  )
}
