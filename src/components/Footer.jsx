export default function Footer({ onNavigate }) {
  return (
    <footer>
      <img className="footer-art" src="/assets/63906.png" alt="" />
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/assets/51143.svg" alt="" width="20" height="20" />
            <strong>UNDERTALE ENERGY</strong>
          </div>
          <nav aria-label="Atalhos do rodapé">
            <button onClick={() => onNavigate("sabores")}>Os 7 sabores</button>
            <button onClick={() => onNavigate("como-funciona")}>
              Como funciona
            </button>
            <button onClick={() => onNavigate("avaliacoes")}>Avaliações</button>
            <button onClick={() => onNavigate("faq")}>FAQ</button>
          </nav>
        </div>
        <div className="footer-bottom">
          <div>
            <p>
              Conceito de coleção inspirado em Undertale. Sem alegação de
              vínculo ou licenciamento oficial.
            </p>
            <p>
              Preços ilustrativos e avaliações fictícias. Sabores, composição e
              condições comerciais a confirmar.
            </p>
            <p>Créditos de idealização do produto à Jakub Pawlowski.</p>
          </div>
          <span>STAY DETERMINED_</span>
        </div>
      </div>
    </footer>
  )
}
