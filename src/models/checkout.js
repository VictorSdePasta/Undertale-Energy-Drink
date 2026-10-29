export const SHIPPING_PRICE = 8

export const createCheckoutForm = () => ({
  name: "",
  email: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  district: "",
  city: "",
  state: "",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
  demoConsent: false,
})

export function createCheckoutState() {
  return {
    isOpen: false,
    items: [],
    form: createCheckoutForm(),
    errors: {},
    result: null,
    completedOrder: null,
    isOrderSummaryOpen: false,
  }
}

const onlyDigits = (value) => value.replace(/\D/g, "")

function passesLuhn(value) {
  const digits = onlyDigits(value)
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index])
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

function hasValidExpiry(value) {
  const match = value.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return false

  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false

  const now = new Date()
  const expiry = new Date(year, month)
  return expiry > new Date(now.getFullYear(), now.getMonth())
}

export function validateCheckoutForm(form) {
  const errors = {}

  if (form.name.trim().length < 3) errors.name = "Informe seu nome completo."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Informe um e-mail válido."
  }
  if (onlyDigits(form.cep).length !== 8)
    errors.cep = "Use um CEP com 8 dígitos."
  if (!form.street.trim()) errors.street = "Informe a rua ou avenida."
  if (!form.number.trim()) errors.number = "Informe o número."
  if (!form.district.trim()) errors.district = "Informe o bairro."
  if (!form.city.trim()) errors.city = "Informe a cidade."
  if (!/^[A-Za-z]{2}$/.test(form.state.trim())) {
    errors.state = "Use a sigla do estado com 2 letras."
  }
  if (!passesLuhn(form.cardNumber)) {
    errors.cardNumber = "Informe um número de cartão válido."
  }
  if (form.cardName.trim().length < 3) {
    errors.cardName = "Informe o nome impresso no cartão."
  }
  if (!hasValidExpiry(form.expiry)) {
    errors.expiry = "Use uma validade futura no formato MM/AA."
  }
  if (!/^\d{3}$/.test(form.cvv)) errors.cvv = "Use um CVV com 3 dígitos."
  if (!form.demoConsent) {
    errors.demoConsent =
      "Confirme que você entende que esta é uma demonstração sem cobrança real."
  }

  return errors
}
