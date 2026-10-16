const sectionTerms = {
  'Os 7 sabores': 'ESOLHA SUA ALMA',
  'Como funciona': 'Como sua escolha',
  'Avaliações': 'Avaliacoes',
  'FAQ': 'Perguntas frequentes'
}

export function updateCartCountBadge(count) {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = String(count)
  })
}

export function setupPageInteractions(root, { navigate, addItem }) {
  if (!root) return () => {}

  const findSection = (term) => {
    const normalize = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const target = normalize(term)
    return [...root.querySelectorAll('div,section,header,footer')].find((el) => {
      const text = normalize(el.textContent)
      return text.includes(target) && text.length < 240
    })
  }

  const handler = (event) => {
    const target = event.target.closest('div,span,a,button')
    if (!target || !root.contains(target)) return
    const text = target.textContent?.trim().replace(/\s+/g, ' ')
    if (!text) return

    // Cart
    if (text === 'Escolher esta alma') {
      addItem()
      navigate('/checkout')
      return
    }
    if (text === 'Escolher minha alma') {
      navigate('/checkout')
      return
    }

    // Navigation across pages
    if (text === 'Voltar à sacola' || text === 'Voltar à pagina inicial' || text === 'Voltar para o início' || text === 'Voltar ao site') {
      navigate('/')
      return
    }
    if (text === 'Simular pagamento de R$ 37,80') {
      navigate('/pagamento-aprovado')
      return
    }
    if (text === 'Revisar dados do cartão' || text === 'Tentar novamente') {
      navigate('/checkout')
      return
    }

    // In-page scroll / anchors
    if (text === 'Conhecer os 7 sabores') {
      const collection = findSection('ESCOLHA SUA ALMA') || findSection('Sua próxima escolha')
      collection?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (text === 'Sacola') {
      navigate('/checkout')
      return
    }
    if (Object.keys(sectionTerms).includes(text)) {
      const section = findSection(sectionTerms[text])
      section?.scrollIntoView({ behavior: 'smooth' })
      return
    }
  }

  root.addEventListener('click', handler, true)
  return () => root.removeEventListener('click', handler, true)
}