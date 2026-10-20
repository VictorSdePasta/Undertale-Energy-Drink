import { useState } from "react"
import CheckoutModal from "./components/CheckoutModal"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import OrderSummaryScreen from "./components/OrderSummaryScreen"
import ProductGrid from "./components/ProductGrid"
import { products } from "./models/products"
import useCartViewModel from "./viewmodels/useCartViewModel"
import useOrderSummaryViewModel from "./viewmodels/useOrderSummaryViewModel"
import useProductsViewModel from "./viewmodels/useProductsViewModel"

const benefits = [
  [
    "[ + ]",
    "Power-Up Instantâneo",
    "Sua barra de energia renovada a cada gole. A fórmula ideal para encarar qualquer rota com foco e determinação.",
  ],
  [
    "[ + ]",
    "Sete Almas, Sete Sabores",
    "Uma coleção única inspirada nas virtudes do Underground. Encontre a essência e o sabor que melhor combinam com você.",
  ],
  [
    "[ + ]",
    "Experiência Colecionável",
    "Do primeiro SELECT ao último SAVE, cada lata pixel-art foi criada para ser um item lendário no seu setup.",
  ],
]

const steps = [
  [
    "01",
    "Encontre sua alma",
    "Explore as sete versões e escolha a personalidade e o sabor sugerido que mais combinam com você.",
  ],
  [
    "02",
    "Monte sua seleção",
    "Escolha a unidade que deseja levar e revise o produto na sua sacola.",
  ],
  [
    "03",
    "Confira e finalize",
    "Confirme preço, disponibilidade e condições antes de concluir sua jornada.",
  ],
]

const testimonials = [
  {
    image: "/assets/c0a33.svg",
    quote:
      "“A lata de Determination virou parte do meu setup. A arte tem exatamente a vibe que eu queria.”",
    initials: "MR",
    name: "Marina R.",
    soul: "PLAYER / DETERMINATION",
    color: "#ff382f",
  },
  {
    image: "/assets/eb45f.svg",
    quote:
      "“Escolhi Patience pelo coração ciano. O mais difícil foi decidir qual seria a próxima da coleção.”",
    initials: "LM",
    name: "Lucas M.",
    soul: "PLAYER / PATIENCE",
    color: "#42e5ed",
  },
  {
    image: "/assets/0b36f.svg",
    quote:
      "“Sou do time Perseverance. O coração roxo e os detalhes da embalagem ganharam meu lado colecionadora.”",
    initials: "BS",
    name: "Bia S.",
    soul: "PLAYER / PERSEVERANCE",
    color: "#d267ef",
  },
]

const faqs = [
  [
    "Quais são os sabores da coleção?",
    "As imagens sugerem cereja, ameixa, mirtilo, kiwi, limão, laranja e uva. Os sabores e a formulação final ainda precisam ser confirmados.",
  ],
  [
    "Qual é o preço de cada bebida?",
    "O valor de R$ 14,90 por lata é ilustrativo. O preço final, as formas de pagamento e a disponibilidade serão definidos antes da venda.",
  ],
  [
    "Posso escolher mais de uma alma?",
    "A proposta é permitir a seleção de diferentes versões. Quantidades disponíveis e eventuais regras de compra ainda estão a confirmar.",
  ],
  [
    "Qual é a composição? Contém cafeína ou açúcar?",
    "Composição, teor de cafeína, açúcares e orientações de consumo ainda não foram informados. Consulte o rótulo antes de comprar.",
  ],
  [
    "Como funcionam entrega, frete e trocas?",
    "Regiões atendidas, prazos, frete e política de trocas estão a confirmar. As condições estarão disponíveis antes da finalização.",
  ],
]

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span>*</span>
      <p>{children}</p>
    </div>
  )
}

export default function App() {
  const { scrollToSection } = useProductsViewModel()
  const {
    cartItems,
    cartCount,
    quantities,
    subtotal,
    shipping,
    total,
    isCheckoutOpen,
    checkoutResult,
    checkoutForm,
    checkoutErrors,
    completedOrder,
    isOrderSummaryOpen,
    incrementItem,
    decrementItem,
    removeItem,
    openCheckout,
    closeCheckout,
    setCheckoutField,
    submitCheckout,
    showOrderSummary,
    closeOrderSummary,
    clearCheckoutResult,
  } = useCartViewModel(products, () => scrollToSection("sabores"))
  const [openFaq, setOpenFaq] = useState(0)
  const orderSummary = useOrderSummaryViewModel(completedOrder, products)

  return (
    <div className="site-shell">
      <Header
        cartCount={cartCount}
        onNavigate={scrollToSection}
        onOpenCart={openCheckout}
      />
      <main>
        <Hero
          products={products}
          onExplore={() => scrollToSection("sabores")}
        />
        <ProductGrid
          products={products}
          quantities={quantities}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
          onRemove={removeItem}
        />

        <section
          className="section section-alt"
          aria-labelledby="benefits-title"
        >
          <div className="section-heading">
            <div>
              <SectionLabel>02 / O QUE TORNA A COLEÇÃO ÚNICA</SectionLabel>
              <h2 id="benefits-title">O próximo power-up é seu.</h2>
            </div>
            <span className="editorial-tag">ENERGIA PARA A SUA JORNADA</span>
          </div>
          <div className="benefit-grid">
            {benefits.map(([number, title, copy]) => (
              <article className="benefit-card" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section"
          id="como-funciona"
          aria-labelledby="steps-title"
        >
          <SectionLabel>03 / DO SELECT AO START</SectionLabel>
          <h2 id="steps-title">Sua jornada começa na escolha.</h2>
          <div className="steps-grid">
            {steps.map(([number, title, copy], index) => (
              <article className="step" key={number}>
                <div>
                  <span>{number}</span>
                  {index < 2 && <b>→</b>}
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section section-alt"
          id="avaliacoes"
          aria-labelledby="reviews-title"
        >
          <div className="section-heading">
            <div>
              <SectionLabel>04 / VOZES DO UNDERGROUND</SectionLabel>
              <h2 id="reviews-title">Quem joga junto, conta.</h2>
            </div>
            <span className="section-note">
              EXEMPLOS FICTÍCIOS DE AVALIAÇÕES
            </span>
          </div>
          <div className="reviews-grid">
            {testimonials.map((testimonial) => (
              <article className="review" key={testimonial.name}>
                <img src={testimonial.image} alt="" width="89" height="13" />
                <blockquote>{testimonial.quote}</blockquote>
                <div className="review-person">
                  <span style={{ color: testimonial.color }}>
                    {testimonial.initials}
                  </span>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <small>{testimonial.soul}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="fine-print">
            Depoimentos criados para demonstrar esta seção. Não representam
            compras ou experiências reais.
          </p>
        </section>

        <section
          className="section faq-section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="faq-intro">
            <SectionLabel>05 / ANTES DO START</SectionLabel>
            <h2 id="faq-title">
              Alguma dúvida
              <br />
              no caminho?
            </h2>
            <p>
              Um checkpoint com o que você precisa saber antes de escolher sua
              alma.
            </p>
            <small>INFORMAÇÕES COMERCIAIS A CONFIRMAR</small>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index
              return (
                <article className="faq-item" key={question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{question}</span>
                    <b>{isOpen ? "−" : "+"}</b>
                  </button>
                  {isOpen && <p>{answer}</p>}
                </article>
              )
            })}
          </div>
        </section>

        <section className="final-cta">
          <img src="/assets/97316.svg" alt="" width="198" height="18" />
          <h2>Toda jornada tem uma escolha.</h2>
          <p>
            A sua começa com um coração. Encontre a versão que é a sua cara.
          </p>
          <button
            className="primary-button"
            type="button"
            onClick={() => scrollToSection("sabores")}
          >
            Escolher minha alma <span>↗</span>
          </button>
        </section>
      </main>
      <Footer onNavigate={scrollToSection} />
      <CheckoutModal
        items={cartItems}
        cartCount={cartCount}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        isOpen={isCheckoutOpen}
        result={checkoutResult}
        form={checkoutForm}
        errors={checkoutErrors}
        onClose={closeCheckout}
        onViewOrder={showOrderSummary}
        onFieldChange={setCheckoutField}
        onSubmit={submitCheckout}
        onClearResult={clearCheckoutResult}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />
      <OrderSummaryScreen
        isOpen={isOrderSummaryOpen}
        summary={orderSummary}
        onClose={closeOrderSummary}
      />
    </div>
  )
}
