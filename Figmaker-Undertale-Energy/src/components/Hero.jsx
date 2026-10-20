const selectorSouls = [
  "7356b.svg",
  "8293c.svg",
  "f3d63.svg",
  "7c4f5.svg",
  "7ed39.svg",
  "5c47d.svg",
  "6a696.svg",
]

export default function Hero({ products, onExplore }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">BEBIDAS ENERGÉTICAS INSPIRADAS EM UNDERTALE</p>
        <h1>
          SETE ALMAS.
          <br />
          <span>QUAL É A SUA?</span>
        </h1>
        <p className="hero-description">
          Experimente o sabor da sua alma. Sete personalidades em uma coleção
          feita para entrar no seu universo.
        </p>
        <button className="primary-button" type="button" onClick={onExplore}>
          Conhecer os 7 sabores <span>↗</span>
        </button>
      </div>
      <img
        className="hero-art"
        src="/assets/c5f6c.png"
        alt="Coleção com sete latas Undertale Energy, cada uma com uma alma colorida"
      />
      <div className="soul-selector">
        <div className="selector-label">
          <span>ESCOLHA SUA ALMA</span>
          <span>07 PERSONALIDADES / 01 COLEÇÃO</span>
        </div>
        <div className="selector-items">
          {products.map((product, index) => (
            <span key={product.id}>
              <img
                src={`/assets/${selectorSouls[index]}`}
                alt=""
                width="15"
                height="15"
              />
              {product.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
