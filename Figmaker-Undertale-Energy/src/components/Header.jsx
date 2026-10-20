const links = [
  ["Os 7 sabores", "sabores"],
  ["Como funciona", "como-funciona"],
  ["Avaliações", "avaliacoes"],
  ["FAQ", "faq"],
]

export default function Header({ cartCount, onNavigate, onOpenCart }) {
  return (
    <header className="header">
      <button
        className="brand"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src="/assets/06374.svg" alt="" width="24" height="24" />
        <strong>UNDERTALE</strong>
        <span>
          ENERGY
          <br />
          COLLECTION
        </span>
      </button>
      <nav aria-label="Navegação principal">
        {links.map(([label, id]) => (
          <button type="button" key={id} onClick={() => onNavigate(id)}>
            {label}
          </button>
        ))}
      </nav>
      <button
        className="cart-button"
        type="button"
        onClick={onOpenCart}
        aria-label={`Abrir sacola com ${cartCount} item`}
      >
        <span>Sacola</span>
        <b>{cartCount}</b>
      </button>
    </header>
  )
}
