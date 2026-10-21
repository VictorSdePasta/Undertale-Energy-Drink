export default function OrderStatusBanner({
  status,
  estimatedDelivery,
  progress,
}) {
  return (
    <section className="order-status-banner">
      <div className="order-status-copy">
        <div className="live-status">
          <span />
          STATUS: {status.toUpperCase()}
        </div>
        <h1>Seu pedido está a caminho.</h1>
        <p>
          Previsão simulada de entrega: <strong>{estimatedDelivery}</strong>
        </p>
      </div>
      <div className="shipping-progress" aria-label="Progresso da entrega">
        {progress.map((step, index) => (
          <div
            className={`shipping-step${step.complete ? " is-complete" : ""}${
              step.current ? " is-current" : ""
            }`}
            key={step.label}
          >
            <div>
              <span>
                {step.complete ? "✓" : String(index + 1).padStart(2, "0")}
              </span>
              {index < progress.length - 1 && <i />}
            </div>
            <p>{step.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
