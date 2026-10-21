const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

const formatDate = (value) =>
  new Date(value).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  })

export default function useOrderSummaryViewModel(order, products) {
  if (!order) return null

  const items = order.items
    .map((item) => {
      const product = products.find(
        (productItem) => productItem.id === item.productId,
      )
      if (!product) return null
      return {
        ...item,
        product,
        unitPriceFormatted: formatCurrency(item.price),
        totalFormatted: formatCurrency(item.price * item.quantity),
      }
    })
    .filter(Boolean)

  const address = order.shippingAddress
  const progress = [
    { label: "Pedido confirmado", complete: true },
    { label: "Em preparação", complete: true },
    { label: "A caminho", complete: true, current: true },
    { label: "Entregue", complete: false },
  ]

  const downloadReceipt = () => {
    const itemLines = items
      .map(
        (item) =>
          `${item.quantity}× ${item.product.name} — ${item.totalFormatted}`,
      )
      .join("\n")
    const content = [
      `UNDERTALE ENERGY COLLECTION — PEDIDO ${order.orderNumber}`,
      `Status: ${order.status}`,
      "",
      `Cliente: ${order.customer.name}`,
      `E-mail: ${order.customer.email}`,
      `Endereço: ${address.street}, ${address.number}${
        address.complement ? ` - ${address.complement}` : ""
      }`,
      `${address.district}, ${address.city}/${address.state} — CEP ${address.cep}`,
      "",
      itemLines,
      "",
      `Subtotal: ${formatCurrency(order.values.subtotal)}`,
      `Frete: ${formatCurrency(order.values.shipping)}`,
      `Total pago: ${formatCurrency(order.values.total)}`,
      "",
      "DEMONSTRAÇÃO FICTÍCIA / SEM TRANSAÇÃO REAL",
    ].join("\n")

    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    )
    const link = document.createElement("a")
    link.href = url
    link.download = `pedido-${order.orderNumber.replace("#", "").toLowerCase()}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    orderNumber: order.orderNumber,
    status: order.status,
    customer: order.customer,
    address,
    items,
    progress,
    estimatedDeliveryFormatted: formatDate(order.estimatedDelivery),
    subtotalFormatted: formatCurrency(order.values.subtotal),
    shippingFormatted: formatCurrency(order.values.shipping),
    totalFormatted: formatCurrency(order.values.total),
    downloadReceipt,
  }
}
