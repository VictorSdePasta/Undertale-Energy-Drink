# Undertale Energy — Seven Souls Collection

## Integrantes

| Nome | Responsabilidade |
|---|---|
| **Daner Gary** | Desenvolvimento com IA |
| **Victor Silva** | Idealização estética |


## Sobre o produto

**Undertale Energy** é um conceito de loja virtual para uma coleção fictícia de bebidas energéticas inspirada nas sete almas e virtudes associadas ao universo do jogo *Undertale*. A experiência permite explorar sete versões da coleção — Determination, Patience, Integrity, Kindness, Justice, Bravery e Perseverance —, escolher quantidades, revisar a sacola e percorrer um fluxo demonstrativo de checkout e resumo do pedido.

O público imaginado inclui fãs de jogos, pessoas interessadas em produtos colecionáveis e consumidores que valorizam identidade visual marcante. A proposta combina uma experiência de compra familiar com referências visuais de jogos retrô, pixel art e interfaces de videogame.

O projeto é um **protótipo demonstrativo**: não processa pagamentos reais nem confirma pedidos ou entregas reais. Preços, sabores, composição e disponibilidade apresentados são ilustrativos e precisam ser validados antes de qualquer uso comercial. O conceito é inspirado em *Undertale* e não possui vínculo ou licenciamento oficial declarado.

## Jornada de construção

### 1. Ideia inicial

A ideia foi transformar referências visuais e temáticas de *Undertale* em uma experiência de e-commerce conceitual. Em vez de apresentar somente uma página de produtos, a proposta organiza a coleção em torno das sete almas, cada uma com nome, cor e personalidade próprios.

A estrutura final sugere três objetivos principais:

- **Apresentar o conceito:** comunicar rapidamente a coleção por meio de uma seção de destaque (*hero*) e de uma chamada para conhecer os sabores.
- **Permitir explorar e selecionar:** exibir os sete produtos em cartões individuais, com controles de quantidade e atualização da sacola.
- **Simular a jornada de compra:** oferecer formulário de checkout, validação de campos, retorno demonstrativo e uma tela de resumo do pedido.

**Alternativas consideradas:** Não tivemos outras alternativas pois o tema em questão é um que ambos gostam muito.

### 2. Pesquisa e referências

As duas principais referências conceituais são o universo de *Undertale*, especialmente a associação entre as sete almas, suas cores e suas virtudes e o trabalho de Jakub Pawlowski que em 2023 fez a produção e idealização visual apenas das bebidas. A interface também usa convenções conhecidas de lojas virtuais — navegação no topo, catálogo em grade, sacola, resumo de valores e formulário de checkout — para que a experiência seja reconhecível sem perder a personalidade temática.

Na implementação visual, é possível identificar estas escolhas:

- **Estética retrô e pixel art:** referências a jogos e interfaces de videogame, reforçadas pelo uso da fonte Pixelify Sans em elementos de marca e títulos.
- **Tipografia complementar:** Inter para leitura de textos e IBM Plex Mono para pequenos rótulos e informações com aparência técnica.
- **Fundo escuro e cores de destaque:** base preta/cinza, textos claros e cores específicas para diferenciar as sete versões da coleção.
- **Microtextos temáticos:** termos como “alma”, “checkpoint”, “SAVE” e “STAY DETERMINED” conectam a linguagem da loja ao universo que a inspirou.
- **Estrutura de e-commerce:** fluxo dividido em apresentação, catálogo, benefícios, etapas de compra, depoimentos, perguntas frequentes e finalização.

**Fontes e referências consultadas pela dupla:** 
- Portfolio de Jakub: https://wearefmcgi.com/
- Idealização do produto e assets: https://www.behance.net/gallery/175165047/Undertale-Energy-Drinks-Product-Video 

### 3. Ferramentas utilizadas

| Ferramenta/tecnologia | Uso no projeto |
|---|---|
| **Figma Make** | Ambiente associado à estrutura inicial do projeto e à geração/iteração da interface. |
| **React 19** | Construção da interface em componentes reutilizáveis e gerenciamento de estado da experiência. |
| **Vite** | Servidor de desenvolvimento e ferramenta de build. |
| **Tailwind CSS 4 e CSS** | Base de estilização e regras visuais personalizadas para a identidade do produto. |
| **VS Code ou outro editor** | Produção Readme e ajustes pontuais |
| **Git/GitHub** | Versionamento do projeto produzido |
| **Pencil.dev e OpenCode** | Para produção teste do codigo com outra abordagem |

#### Organização técnica

O código está organizado para separar responsabilidades:

- `src/App.jsx`: compõe as seções da página e conecta os componentes ao estado da experiência.
- `src/components/`: contém os componentes da interface, como cabeçalho, destaque, cartões de produto, checkout e resumo do pedido.
- `src/models/products.js`: concentra os dados dos sete produtos, como nome, personalidade, sabor sugerido, cor, preço ilustrativo e imagens.
- `src/models/`: contém modelos auxiliares para checkout e pedido.
- `src/viewmodels/`: concentra a lógica de estado e operações da interface, como quantidades, sacola, produtos e resumo do pedido.
- `src/index.css`: reúne tipografia, cores, layout, responsividade e demais estilos globais.

A separação entre componentes, dados e lógica facilita ajustar a identidade visual e o comportamento sem concentrar toda a implementação em um único arquivo.

### 4. Uso de IA

O projeto contém indícios de ter sido estruturado no contexto do Figma Make, e a implementação utiliza componentes React e arquivos de interface gerados/organizados nesse ambiente. Para manter este registro fiel ao processo da dupla, os modelos específicos e as decisões abaixo devem ser preenchidos com base no histórico real das interações.

| Modelo/ferramenta de IA | Em que etapa foi usado | Resultado e avaliação |
|---|---|---|
| **Figma Make** | O Figma foi utilizado para idealizar o protótipo de como seria o site e posteriormente o código do projeto | Desempenho satisfatório e eficaz mas com maior custo (tokens) |
| **ChatGPT / GPT** | Utilizado para pesquisas e produção de prompts para execução | Facilita e agiliza o processo de construção em diversas etapas, principalmente na idealização e ordenação do desenvolvimento
| **OpenCode / "Big Pickle"** | Desenvolvimento inicial do código seguindo protótipo desenvolvido no figma | Baixo custo (modelo free) boa consistencia porém mais lento e requer mais atenção e manutenção |

Ao utilizar cada uma foi claro o papel que tinham, quem ajudava mais na idealização, na organização e na produção, bem como suas especialidades. Tivemos algumas dificuldades ao utilizar o OpenCode e fazer a conexão com o figma, por isso utilizamos o Pencil.dev mas dado o tempo de execução, optamos por tentar tambem com o proprio figma make onde obtivemos resultados mais rápidos.

**Sugestões mantidas:** No figma make tivemos a adição de uma tela não pensada, onde é possivel ver como está a situação do pedido após pagamento, rastrear entrega e ter informações sobre o produto, além de poder baixar um comprovante.

**Sugestões alteradas ou descartadas:** Na idealização foram postas 3 etapas para compra dos produtos, mas como queriamos algo mais simples removemos uma das etapas

**Limitações percebidas:** No OpenCode, utilizando modelo free, percebemos que ele necessita de mais tempo e retrabalho, além de depender de disponibilidade de tokens mais vólatil, principalmente por ser free.

### 5. Evolução da solução

A versão presente no repositório vai além de uma vitrine estática: ela contém a estrutura de uma jornada de compra simulada, com seleção de produtos, quantidades, sacola, formulário de checkout, mensagens de resultado e resumo do pedido.

As decisões que podem ser observadas no código incluem:

1. **Coleção organizada por sete identidades:** cada produto tem nome, virtude, cor e arte próprios, mantendo uma estrutura comum entre os cartões.
2. **Hierarquia visual temática:** o destaque inicial apresenta a ideia central antes de direcionar a pessoa ao catálogo.
3. **Identidade consistente:** fundo escuro, tipografia monoespaçada em rótulos e cores vibrantes ajudam a aproximar a interface de uma estética de videogame.
4. **Fluxo de compra mais completo:** além do catálogo, há componentes dedicados ao checkout, ao retorno da simulação e ao resumo do pedido.
5. **Transparência sobre o protótipo:** textos indicam que o pagamento e o status do pedido são simulados e que os valores e características do produto precisam ser confirmados.

**Mudanças feitas durante o processo:** Fizemos poucos ajustes da primeira versão, inicialmente como descrito anteriormente para compra dos produtos haveriam 3 etapas e reduzimos para 2, além disso outros micros detalhes foram ajustados, como inclusão dos créditos ao Jakub Pawlowski.

**Decisões tomadas pela dupla:** A redução de 3 para 2 etapas na compra do produto para simplificar o projeto e economizar recursos para atividades e alterações posteriores caso necessário.

### 6. Resultado final

O resultado é um protótipo de loja virtual com uma identidade visual reconhecível e um fluxo de interação que permite demonstrar a descoberta dos produtos e as etapas básicas de uma compra. O uso de componentes separados e de um arquivo central para os dados dos produtos também torna a solução mais fácil de manter e expandir.

A avaliação final da dupla deve considerar tanto o visual quanto a experiência: se a proposta fica clara rapidamente, se os sete produtos são fáceis de comparar, se a sacola e o checkout são compreensíveis e se a interface se mantém utilizável em diferentes larguras de tela.

**O que funcionou bem**
- Desenvolver os prompts com auxilio de uma ia ajuda a assertividade de produção dos mesmos
- Desenvolver o código a partir do protótipo utilizando a mesma ferramenta, no caso Figma Make, ajuda na agilidade de produção mas pode ter custo mais elevado.

**O que faríamos diferente com mais tempo**
- Validar a interface com usuários e registrar o feedback recebido.
- Testar acessibilidade, navegação por teclado, contraste, mensagens de erro e comportamento em dispositivos móveis.
- Revisar todos os textos, preços e informações de produto para evitar que conteúdo ilustrativo seja interpretado como informação comercial confirmada.
- Se o projeto evoluir para uma loja real, integrar serviços seguros de pagamento, persistência de pedidos, estoque e cálculo de frete, além de revisar privacidade e segurança dos dados.

### 7. Aprendizados

A IA é uma otima ferramenta para agilizar o trabalho manual e produzir resultados rapidos, ainda requer alguma atenção e revisão, mas pode ser diminuido tendo um bom planejamento e dominio de como utilizar a ferramenta 

## Como executar o projeto

### Requisitos

- Node.js compatível com a versão do Vite utilizada.
- npm (ou pnpm, caso seja o gerenciador adotado pela equipe).

### Instalação e desenvolvimento

Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

### Build de produção

```bash
npm run build
```

Para visualizar localmente a build gerada:

```bash
npm run preview
```

## Observações sobre o protótipo

- O projeto é um conceito inspirado em *Undertale*, sem vínculo ou licenciamento oficial declarado, pois se trata de um projeto acadêmico sem fins lucrativos, apenas com o intuito de aprendizado
- O preço de **R$ 14,90** é ilustrativo.
- Os sabores são sugestões visuais e não especificações confirmadas da fórmula.
