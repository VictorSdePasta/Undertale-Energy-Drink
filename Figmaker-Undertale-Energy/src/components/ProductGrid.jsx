import ProductCard from "./ProductCard"

export default function ProductGrid({
  products,
  quantities,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  return (
    <section
      className="section products-section"
      id="sabores"
      aria-labelledby="products-title"
    >
      <div className="section-heading">
        <div>
          <div className="section-label">
            <span>*</span>
            <p>01 / ESCOLHA SUA ALMA</p>
          </div>
          <h2 id="products-title">Sua próxima escolha tem sabor.</h2>
        </div>
        <span className="section-note">COLEÇÃO COMPLETA [07]</span>
      </div>
      <div className="offer-copy">
        <p>
          Preços ilustrativos: R$ 14,90 por unidade. Valores e disponibilidade a
          confirmar.
        </p>
        <small>
          Sabores sugeridos pelas frutas das imagens; não representam
          especificações confirmadas da formulação.
        </small>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] ?? 0}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
          />
        ))}
        <aside className="collection-message">
          <img src="/assets/f1563.svg" alt="" width="44" height="44" />
          <h3>
            Não existe
            <br />a escolha
            <br />
            errada.
          </h3>
          <p>Só a alma que combina com o seu próximo capítulo.</p>
          <small>STAY DETERMINED_</small>
        </aside>
      </div>
    </section>
  )
}
