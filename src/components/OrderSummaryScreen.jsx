import OrderActions from "./OrderActions"
import OrderItemsList from "./OrderItemsList"
import OrderStatusBanner from "./OrderStatusBanner"
import OrderTotals from "./OrderTotals"
import ShippingAddressCard from "./ShippingAddressCard"

export default function OrderSummaryScreen({ isOpen, summary, onClose }) {
  if (!isOpen || !summary) return null

  return (
    <div className="order-summary-screen">
      <header className="order-screen-header">
        <div className="checkout-brand">
          <img src="/assets/06374.svg" alt="" width="24" height="24" />
          <strong>UNDERTALE</strong>
          <span>
            ENERGY
            <br />
            COLLECTION
          </span>
        </div>
        <div className="order-number">
          <small>PEDIDO</small>
          <strong>{summary.orderNumber}</strong>
        </div>
      </header>

      <main className="order-screen-content">
        <OrderStatusBanner
          status={summary.status}
          estimatedDelivery={summary.estimatedDeliveryFormatted}
          progress={summary.progress}
        />
        <div className="order-details-layout">
          <div className="order-details-main">
            <ShippingAddressCard
              customer={summary.customer}
              address={summary.address}
            />
            <OrderItemsList items={summary.items} />
          </div>
          <aside>
            <OrderTotals
              subtotal={summary.subtotalFormatted}
              shipping={summary.shippingFormatted}
              total={summary.totalFormatted}
              orderNumber={summary.orderNumber}
            />
            <OrderActions
              onBack={onClose}
              onDownload={summary.downloadReceipt}
            />
          </aside>
        </div>
      </main>
      <footer className="checkout-footer">
        <div>
          <p>
            Conceito inspirado em Undertale. Sem vínculo ou licenciamento
            oficial.
          </p>
          <p>Demonstração visual • Status e entrega simulados.</p>
        </div>
        <span>STAY DETERMINED_</span>
      </footer>
    </div>
  )
}
