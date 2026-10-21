import { useMemo, useState } from "react"
import {
  createCheckoutForm,
  createCheckoutState,
  SHIPPING_PRICE,
  validateCheckoutForm,
} from "../models/checkout"
import { createOrderDetails } from "../models/order"

export default function useCartViewModel(products, onEmptyCart) {
  const [checkout, setCheckout] = useState(createCheckoutState)

  const updateQuantity = (productId, change) => {
    const product = products.find((item) => item.id === productId)
    if (!product) return

    setCheckout((state) => {
      const current = state.items.find((item) => item.productId === productId)
      const quantity = Math.max(0, (current?.quantity ?? 0) + change)
      const items = current
        ? state.items
            .map((item) =>
              item.productId === productId ? { ...item, quantity } : item,
            )
            .filter((item) => item.quantity > 0)
        : [...state.items, { productId, quantity, price: product.price }]

      return { ...state, items, result: null }
    })
  }

  const removeItem = (productId) => {
    setCheckout((state) => ({
      ...state,
      items: state.items.filter((item) => item.productId !== productId),
      result: null,
    }))
  }

  const cartItems = useMemo(
    () =>
      checkout.items
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }))
        .filter((item) => item.product),
    [checkout.items, products],
  )

  const subtotal = checkout.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const cartCount = checkout.items.reduce((sum, item) => sum + item.quantity, 0)
  const shipping = cartCount > 0 ? SHIPPING_PRICE : 0
  const total = subtotal + shipping
  const quantities = Object.fromEntries(
    checkout.items.map((item) => [item.productId, item.quantity]),
  )

  const openCheckout = () => {
    if (cartCount === 0) {
      onEmptyCart()
      return
    }
    setCheckout((state) => ({
      ...state,
      isOpen: true,
      result: null,
    }))
  }

  const setCheckoutField = (field, value) => {
    setCheckout((state) => {
      const errors = { ...state.errors }
      delete errors[field]
      return {
        ...state,
        form: { ...state.form, [field]: value },
        errors,
      }
    })
  }

  const submitCheckout = () => {
    setCheckout((state) => {
      const errors = {
        ...validateCheckoutForm(state.form),
        ...(state.items.length === 0
          ? { cart: "Adicione pelo menos um produto." }
          : {}),
      }
      return {
        ...state,
        errors,
        result: Object.keys(errors).length === 0 ? "success" : "error",
        completedOrder:
          Object.keys(errors).length === 0
            ? createOrderDetails({
                items: state.items,
                form: state.form,
                shipping: SHIPPING_PRICE,
              })
            : state.completedOrder,
      }
    })
  }

  return {
    cartItems,
    cartCount,
    quantities,
    subtotal,
    shipping,
    total,
    isCheckoutOpen: checkout.isOpen,
    checkoutResult: checkout.result,
    checkoutForm: checkout.form,
    checkoutErrors: checkout.errors,
    completedOrder: checkout.completedOrder,
    isOrderSummaryOpen: checkout.isOrderSummaryOpen,
    incrementItem: (productId) => updateQuantity(productId, 1),
    decrementItem: (productId) => updateQuantity(productId, -1),
    removeItem,
    openCheckout,
    closeCheckout: () =>
      setCheckout((state) => ({
        ...state,
        isOpen: false,
        result: null,
        errors: {},
      })),
    setCheckoutField,
    submitCheckout,
    showOrderSummary: () =>
      setCheckout((state) => {
        if (!state.completedOrder) return state
        return {
          ...state,
          isOpen: false,
          isOrderSummaryOpen: true,
          result: null,
          items: [],
          form: createCheckoutForm(),
          errors: {},
        }
      }),
    closeOrderSummary: () =>
      setCheckout((state) => ({ ...state, isOrderSummaryOpen: false })),
    clearCheckoutResult: () =>
      setCheckout((state) => ({ ...state, result: null })),
  }
}
