export default function ShippingAddressCard({ customer, address }) {
  return (
    <section className="order-detail-card shipping-address-card">
      <div className="order-card-heading">
        <span>01</span>
        <h2>Endereço de entrega</h2>
      </div>
      <div className="address-content">
        <small>DESTINATÁRIO</small>
        <strong>{customer.name}</strong>
        <p>
          {address.street}, {address.number}
          {address.complement ? ` — ${address.complement}` : ""}
          <br />
          {address.district}
          <br />
          {address.city}/{address.state} · CEP {address.cep}
        </p>
        <span>{customer.email}</span>
      </div>
    </section>
  )
}
