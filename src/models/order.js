export function createOrderDetails({ items, form, shipping }) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const createdAt = new Date()
  const estimatedDelivery = new Date(createdAt)
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return {
    orderNumber: "#DEMO-0007",
    items: items.map((item) => ({ ...item })),
    values: {
      subtotal,
      shipping,
      total: subtotal + shipping,
    },
    customer: {
      name: form.name.trim(),
      email: form.email.trim(),
    },
    shippingAddress: {
      street: form.street.trim(),
      number: form.number.trim(),
      complement: form.complement.trim(),
      district: form.district.trim(),
      city: form.city.trim(),
      state: form.state.trim().toUpperCase(),
      cep: form.cep.trim(),
    },
    payment: {
      cardFinal: form.cardNumber.replace(/\D/g, "").slice(-4),
    },
    status: "A caminho",
    createdAt: createdAt.toISOString(),
    estimatedDelivery: estimatedDelivery.toISOString(),
  }
}
