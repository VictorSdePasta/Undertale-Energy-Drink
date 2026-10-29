import { useEffect } from "react"

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

function Field({
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
  mono = false,
  type = "text",
  inputMode,
  maxLength,
}) {
  return (
    <label className={`checkout-field${error ? " has-error" : ""}`}>
      <span>{label}</span>
      <input
        className={mono ? "mono-input" : ""}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error && (
        <small id={`${name}-error`} className="field-error">
          {error}
        </small>
      )}
    </label>
  )
}

function FormSection({ number, title, note, children }) {
  return (
    <section className="checkout-form-section">
      <div className="checkout-section-title">
        <div>
          <span>{number}</span>
          <h3>{title}</h3>
        </div>
        <small>{note}</small>
      </div>
      {children}
    </section>
  )
}

function ResultDialog({
  result,
  items,
  form,
  total,
  onClose,
  onViewOrder,
  onReview,
  onRetry,
}) {
  const success = result === "success"
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const selection = items
    .map((item) => `${item.quantity} × ${item.product.name}`)
    .join(" · ")
  const cardFinal = form.cardNumber.replace(/\D/g, "").slice(-4) || "----"

  return (
    <div className="checkout-result-backdrop">
      <section
        className={`checkout-result ${
          success ? "result-success" : "result-error"
        }`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="result-title"
      >
        <div className="result-indicator" />
        <div className="result-content">
          <div className="result-topline">
            <span>
              {success
                ? "CHECKPOINT / SIMULAÇÃO CONCLUÍDA"
                : "CHECKPOINT / FALHA NA SIMULAÇÃO"}
            </span>
            <button type="button" onClick={onReview} aria-label="Fechar aviso">
              ×
            </button>
          </div>
          <div className="result-message">
            <img
              src={success ? "/assets/1c46e.svg" : "/assets/c385f.svg"}
              alt=""
              width="60"
              height="60"
            />
            <h2 id="result-title">
              {success ? (
                <>
                  Pagamento simulado
                  <br />
                  aprovado!
                </>
              ) : (
                <>
                  O pagamento não
                  <br />
                  foi concluído.
                </>
              )}
            </h2>
            <p>
              {success
                ? `Tudo certo, ${form.name.split(" ")[0]}! Sua seleção foi confirmada nesta demonstração. Nenhuma cobrança real foi feita.`
                : "Revise os campos destacados. Não houve cobrança e sua seleção continua disponível para correção."}
            </p>
          </div>
          <div className="result-summary">
            <div>
              <span>PEDIDO FICTÍCIO #DEMO-0007</span>
              <b>{success ? "APROVADO" : "NÃO CONCLUÍDO"}</b>
            </div>
            <p>
              {selection || "Nenhum item selecionado"} • Cartão final{" "}
              {cardFinal}
            </p>
            <div>
              <span>
                {success
                  ? `Total simulado · ${quantity} ${
                      quantity === 1 ? "item" : "itens"
                    }`
                  : "Total da tentativa"}
              </span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>
          <div className="result-actions">
            <p>
              {success
                ? "Próximo passo: conferir o resumo do pedido. Como é uma simulação, não há envio de produtos ou e-mail."
                : "Confira os dados obrigatórios, os formatos informados e tente novamente."}
            </p>
            <button
              className="checkout-primary"
              type="button"
              onClick={success ? onViewOrder : onReview}
            >
              <span>
                {success ? "Ver resumo do pedido" : "Revisar dados do cartão"}
              </span>
              <b>→</b>
            </button>
            {success ? (
              <button className="result-link" type="button" onClick={onClose}>
                Voltar à loja
              </button>
            ) : (
              <button
                className="checkout-secondary"
                type="button"
                onClick={onRetry}
              >
                <span>Tentar novamente</span>
                <b>→</b>
              </button>
            )}
          </div>
          <small className="result-disclaimer">
            DEMONSTRAÇÃO ESTÁTICA / SEM TRANSAÇÃO REAL
          </small>
        </div>
      </section>
    </div>
  )
}

export default function CheckoutModal({
  items,
  cartCount,
  subtotal,
  shipping,
  total,
  isOpen,
  result,
  form,
  errors,
  onClose,
  onViewOrder,
  onFieldChange,
  onSubmit,
  onClearResult,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return
      if (result) onClearResult()
      else onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, result, onClose, onClearResult])

  if (!isOpen) return null

  const submitPayment = (event) => {
    event?.preventDefault()
    onSubmit()
  }

  return (
    <div
      className="checkout-screen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <header className="checkout-header">
        <div className="checkout-brand">
          <img src="/assets/06374.svg" alt="" width="24" height="24" />
          <strong>UNDERTALE</strong>
          <span>
            ENERGY
            <br />
            COLLECTION
          </span>
        </div>
        <button type="button" onClick={onClose}>
          <b>←</b>
          <span>Voltar à sacola</span>
          <i>{cartCount}</i>
        </button>
      </header>

      <div className="checkout-intro">
        <div className="checkout-intro-row">
          <div>
            <small>CHECKPOINT / FINALIZAR PEDIDO</small>
            <h2 id="checkout-title">Só mais um passo, alma.</h2>
            <p>
              Confira seus dados e conclua esta experiência de pagamento
              simulado.
            </p>
          </div>
          <div className="checkout-progress">
            <span>01 SACOLA</span>
            <i />
            <b>♥ 02 PAGAMENTO</b>
          </div>
        </div>
        <div className="demo-notice">
          <b>[ DEMO ]</b>
          <span>
            Preencha apenas dados fictícios. Nenhuma cobrança real será feita.
          </span>
        </div>
      </div>

      <form className="checkout-layout" noValidate onSubmit={submitPayment}>
        <div className="checkout-form">
          <FormSection
            number="01"
            title="Seus dados"
            note="IDENTIFICAÇÃO FICTÍCIA"
          >
            <div className="field-grid two-columns">
              <Field
                name="name"
                label="Nome completo"
                value={form.name}
                placeholder="Ex.: Alex Silva"
                error={errors.name}
                onChange={onFieldChange}
                autoComplete="name"
              />
              <Field
                name="email"
                label="E-mail"
                value={form.email}
                placeholder="voce@exemplo.com"
                error={errors.email}
                onChange={onFieldChange}
                type="email"
              />
            </div>
          </FormSection>

          <FormSection
            number="02"
            title="Endereço de entrega"
            note="ENDEREÇO DE EXEMPLO"
          >
            <div className="field-grid address-row">
              <Field
                name="cep"
                label="CEP"
                value={form.cep}
                placeholder="00000-000"
                error={errors.cep}
                onChange={onFieldChange}
                inputMode="numeric"
                maxLength={9}
                mono
              />
              <Field
                name="street"
                label="Rua / Avenida"
                value={form.street}
                placeholder="Nome da rua"
                error={errors.street}
                onChange={onFieldChange}
              />
            </div>
            <div className="field-grid three-columns">
              <Field
                name="number"
                label="Número"
                value={form.number}
                placeholder="123"
                error={errors.number}
                onChange={onFieldChange}
              />
              <Field
                name="complement"
                label="Complemento"
                value={form.complement}
                placeholder="Opcional"
                onChange={onFieldChange}
              />
              <Field
                name="district"
                label="Bairro"
                value={form.district}
                placeholder="Seu bairro"
                error={errors.district}
                onChange={onFieldChange}
              />
            </div>
            <div className="field-grid city-row">
              <Field
                name="city"
                label="Cidade"
                value={form.city}
                placeholder="Sua cidade"
                error={errors.city}
                onChange={onFieldChange}
              />
              <Field
                name="state"
                label="Estado"
                value={form.state}
                placeholder="SP"
                error={errors.state}
                onChange={(name, value) =>
                  onFieldChange(name, value.toUpperCase())
                }
                maxLength={2}
                mono
              />
            </div>
            <p className="checkout-help">
              Frete ilustrativo; condições e prazos de entrega a confirmar.
            </p>
          </FormSection>

          <FormSection
            number="03"
            title="Pagamento"
            note="SOMENTE DADOS DE TESTE"
          >
            <div className="payment-method">
              <i>
                <b />
              </i>
              <span>Cartão de crédito</span>
              <small>MODO TESTE</small>
            </div>
            <div className="field-grid two-columns">
              <Field
                name="cardNumber"
                label="Número do cartão"
                value={form.cardNumber}
                placeholder="4242 4242 4242 4242"
                error={errors.cardNumber}
                onChange={onFieldChange}
                inputMode="numeric"
                maxLength={23}
                mono
              />
              <Field
                name="cardName"
                label="Nome impresso no cartão"
                value={form.cardName}
                placeholder="NOME COMPLETO"
                error={errors.cardName}
                onChange={(name, value) =>
                  onFieldChange(name, value.toUpperCase())
                }
              />
            </div>
            <div className="field-grid payment-row">
              <Field
                name="expiry"
                label="Validade (MM/AA)"
                value={form.expiry}
                placeholder="12/30"
                error={errors.expiry}
                onChange={onFieldChange}
                inputMode="numeric"
                maxLength={5}
                mono
              />
              <Field
                name="cvv"
                label="CVV"
                value={form.cvv}
                placeholder="123"
                error={errors.cvv}
                onChange={onFieldChange}
                inputMode="numeric"
                maxLength={3}
                mono
              />
              <label className="checkout-field">
                <span>Parcelamento simulado</span>
                <input value={`1 × de ${formatCurrency(total)}`} readOnly />
              </label>
            </div>
            <p className="checkout-help">
              Não insira dados reais. Nenhum dado é enviado ou processado.
            </p>
          </FormSection>
        </div>

        <aside className="order-column">
          <section className="order-summary">
            <div className="order-heading">
              <div>
                <h3>Sua seleção</h3>
                <span>
                  [ {String(cartCount).padStart(2, "0")}{" "}
                  {cartCount === 1 ? "LATA" : "LATAS"} ]
                </span>
              </div>
              <small>PEDIDO FICTÍCIO #DEMO-0007</small>
            </div>

            <div className="order-items">
              {items.map(({ product, quantity }) => (
                <article className="order-product-entry" key={product.id}>
                  <div className="order-product">
                    <img src={product.image} alt={`Lata ${product.name}`} />
                    <div>
                      <span
                        className="order-soul"
                        style={{ color: product.color }}
                      >
                        <img
                          src={product.checkoutSoulImage ?? product.soulImage}
                          alt=""
                        />
                        {product.personality}
                      </span>
                      <h4>{product.name}</h4>
                      <p>{product.flavor} • sabor sugerido</p>
                      <p>{formatCurrency(product.price)} / unidade</p>
                      <div className="summary-item-total">
                        {formatCurrency(product.price * quantity)}
                      </div>
                      <div className="summary-quantity-control">
                        <button
                          type="button"
                          onClick={() => onDecrement(product.id)}
                          aria-label={`Remover uma unidade de ${product.name}`}
                        >
                          −
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onIncrement(product.id)}
                          aria-label={`Adicionar uma unidade de ${product.name}`}
                        >
                          +
                        </button>
                        <button
                          className="summary-remove"
                          type="button"
                          onClick={() => onRemove(product.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="order-color"
                    style={{ background: product.color }}
                  />
                </article>
              ))}
              {items.length === 0 && (
                <p className="empty-order">Sua sacola está vazia.</p>
              )}
            </div>

            <div className="order-totals">
              <div className="total-lines">
                <p>
                  <span>Subtotal ({cartCount} itens)</span>
                  <b>{formatCurrency(subtotal)}</b>
                </p>
                <p>
                  <span>Frete (simulação)</span>
                  <b>{formatCurrency(shipping)}</b>
                </p>
              </div>
              <div className="grand-total">
                <div>
                  <span>Total simulado</span>
                  <small>1 × NO CARTÃO DE TESTE</small>
                </div>
                <strong>{formatCurrency(total)}</strong>
              </div>
              <p className="order-note">
                Valores atualizados automaticamente conforme sua seleção.
              </p>
              <label className="demo-confirm">
                <input
                  type="checkbox"
                  checked={Boolean(form.demoConsent)}
                  onChange={(event) =>
                    onFieldChange("demoConsent", event.target.checked)
                  }
                  aria-invalid={Boolean(errors.demoConsent)}
                  aria-describedby={
                    errors.demoConsent ? "demo-consent-error" : undefined
                  }
                />
                <span>
                  Entendo que esta é uma demonstração sem cobrança real.
                </span>
              </label>
              {errors.demoConsent && (
                <small id="demo-consent-error" className="field-error">
                  {errors.demoConsent}
                </small>
              )}
              <button
                className="checkout-primary"
                type="submit"
                disabled={cartCount === 0}
              >
                <span>Simular pagamento de {formatCurrency(total)}</span>
                <b>→</b>
              </button>
              <small className="no-charge">SEM COBRANÇA / SEM ENVIO REAL</small>
            </div>
          </section>
        </aside>
      </form>

      <footer className="checkout-footer">
        <div>
          <p>
            Conceito inspirado em Undertale. Sem vínculo ou licenciamento
            oficial.
          </p>
          <p>
            Demonstração visual • Sem processamento, cobrança ou envio real.
          </p>
        </div>
        <span>STAY DETERMINED_</span>
      </footer>

      {result && (
        <ResultDialog
          result={result}
          items={items}
          form={form}
          total={total}
          onClose={onClose}
          onViewOrder={onViewOrder}
          onReview={onClearResult}
          onRetry={onSubmit}
        />
      )}
    </div>
  )
}
