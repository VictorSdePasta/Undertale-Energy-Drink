export default function OrderActions({ onBack, onDownload }) {
  return (
    <div className="order-actions">
      <button className="checkout-primary" type="button" onClick={onDownload}>
        <span>Baixar comprovante / resumo</span>
        <b>↓</b>
      </button>
      <button className="checkout-secondary" type="button" onClick={onBack}>
        <span>Voltar à loja</span>
        <b>←</b>
      </button>
    </div>
  )
}
