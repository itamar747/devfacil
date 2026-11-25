
import { useEffect, useState } from 'react'
import './App.css'

const cursos = [
  {
    id: 1,
    nome: 'HTML5',
    descricao: 'Aprenda a construir a estrutura de páginas e sites modernos.',
    nivel: 'INICIANTE',
    icone: '🌐',
    imagem: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700'
  },
  {
    id: 2,
    nome: 'CSS3',
    descricao: 'Crie layouts incríveis, cores, animações e efeitos visuais.',
    nivel: 'INICIANTE',
    icone: '🎨',
    imagem: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=700'
  },
  {
    id: 3,
    nome: 'JavaScript',
    descricao: 'Aprenda a programar e criar aplicações interativas.',
    nivel: 'INTERMEDIÁRIO',
    icone: '⚡',
    imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700'
  },
  {
    id: 4,
    nome: 'React',
    descricao: 'Desenvolva interfaces modernas com componentes reutilizáveis.',
    nivel: 'INTERMEDIÁRIO',
    icone: '⚛️',
    imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=700'
  }
]

function App() {
  const [pagina, setPagina] = useState('inicio')
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('devfacil-favoritos')) || []
    } catch {
      return []
    }
  })

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    localStorage.setItem('devfacil-favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  function alternarFavorito(id) {
    setFavoritos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    )
  }

  function navegar(destino) {
    setPagina(destino)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function enviarFormulario(e) {
    e.preventDefault()
    setEnviado(true)
    setNome('')
    setEmail('')
    setMensagem('')
  }

  function mostrarCursos(lista) {
    if (lista.length === 0) {
      return <p className="vazio">Você ainda não adicionou cursos aos favoritos.</p>
    }

    return (
      <div className="cursos-grid">
        {lista.map((curso) => (
          <article className="curso-card" key={curso.id}>
            <div className="curso-imagem">
              <img src={curso.imagem} alt={`Imagem ilustrativa do curso ${curso.nome}`} />
              <span className="nivel">{curso.nivel}</span>
            </div>

            <div className="curso-info">
              <span className="curso-icone">{curso.icone}</span>
              <h3>{curso.nome}</h3>
              <p>{curso.descricao}</p>
              <button
                className={favoritos.includes(curso.id) ? 'btn-favorito ativo' : 'btn-favorito'}
                onClick={() => alternarFavorito(curso.id)}
              >
                {favoritos.includes(curso.id) ? '♥ Favoritado' : '♡ Adicionar aos favoritos'}
              </button>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container nav">
          <button className="logo" onClick={() => navegar('inicio')}>
            Dev<span>Fácil.</span>
          </button>

          <nav>
            <button className={pagina === 'inicio' ? 'selecionado' : ''} onClick={() => navegar('inicio')}>Início</button>
            <button className={pagina === 'cursos' ? 'selecionado' : ''} onClick={() => navegar('cursos')}>Cursos</button>
            <button className={pagina === 'favoritos' ? 'selecionado' : ''} onClick={() => navegar('favoritos')}>♥ Favoritos ({favoritos.length})</button>
            <button className={pagina === 'sobre' ? 'selecionado' : ''} onClick={() => navegar('sobre')}>Sobre</button>
            <button className="nav-contato" onClick={() => navegar('contato')}>Contato</button>
          </nav>
        </div>
      </header>

      <main>
        {pagina === 'inicio' && (
          <>
            <section className="hero">
              <div className="container hero-layout">
                <div className="hero-texto">
                  <span className="etiqueta">✦ SUA JORNADA COMEÇA AQUI</span>
                  <h1>Transforme sua curiosidade em <span>conhecimento.</span></h1>
                  <p>
                    Aprenda programação do zero com conteúdos práticos,
                    tecnologias atuais e uma experiência feita para você.
                  </p>
                  <div className="hero-botoes">
                    <button className="btn-principal" onClick={() => navegar('cursos')}>
                      Explorar cursos <span>→</span>
                    </button>
                    <button className="btn-secundario" onClick={() => navegar('sobre')}>
                      Conheça o projeto
                    </button>
                  </div>
                  <div className="hero-dados">
                    <div><strong>04</strong><span>Trilhas de estudo</span></div>
                    <div><strong>100%</strong><span>Aprendizado online</span></div>
                    <div><strong>∞</strong><span>Possibilidades</span></div>
                  </div>
                </div>

                <div className="hero-foto">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000"
                    alt="Pessoa trabalhando em um computador com programação"
                  />
                  <div className="foto-legenda">
                    <span>💻</span>
                    <div><strong>Seu futuro começa agora</strong><small>Aprenda no seu ritmo</small></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="container secao">
              <div className="secao-topo">
                <div>
                  <span className="subtitulo-superior">APRENDA NA PRÁTICA</span>
                  <h2>Explore nossos cursos</h2>
                  <p>Conhecimento para dar os primeiros passos na tecnologia.</p>
                </div>
                <button className="link-cursos" onClick={() => navegar('cursos')}>Ver todos →</button>
              </div>
              {mostrarCursos(cursos)}
            </section>

            <section className="beneficios">
              <div className="container">
                <span className="subtitulo-superior">POR QUE DEVFÁCIL?</span>
                <h2>Aprender programação pode ser mais simples.</h2>
                <div className="beneficios-grid">
                  <div><span>🎯</span><h3>Aprenda no seu ritmo</h3><p>Estude quando e onde quiser.</p></div>
                  <div><span>💡</span><h3>Conteúdo acessível</h3><p>Comece pelos fundamentos da programação.</p></div>
                  <div><span>🚀</span><h3>Prepare seu futuro</h3><p>Desenvolva habilidades para o mundo digital.</p></div>
                </div>
              </div>
            </section>

            <section className="chamada container">
              <div><h2>Pronto para começar?</h2><p>Escolha seu primeiro curso e comece sua jornada.</p></div>
              <button className="btn-principal" onClick={() => navegar('cursos')}>Começar agora →</button>
            </section>
          </>
        )}

        {pagina === 'cursos' && (
          <section className="container secao pagina">
            <span className="subtitulo-superior">TRILHAS DE APRENDIZADO</span>
            <h1>Nossos cursos</h1>
            <p className="descricao-pagina">Escolha uma tecnologia e comece a desenvolver suas habilidades.</p>
            {mostrarCursos(cursos)}
          </section>
        )}

        {pagina === 'favoritos' && (
          <section className="container secao pagina">
            <span className="subtitulo-superior">SUA LISTA PESSOAL</span>
            <h1>Meus favoritos ♥</h1>
            <p className="descricao-pagina">Seus cursos preferidos em um só lugar.</p>
            {mostrarCursos(cursos.filter((curso) => favoritos.includes(curso.id)))}
          </section>
        )}

        {pagina === 'sobre' && (
          <section className="container secao pagina sobre">
            <span className="subtitulo-superior">CONHEÇA NOSSA IDEIA</span>
            <h1>Sobre o DevFácil</h1>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200" alt="Equipe trabalhando em tecnologia" />
            <h2>Tecnologia e conhecimento para todos.</h2>
            <p>
              O DevFácil é uma plataforma educacional criada para ajudar
              pessoas que desejam iniciar seus estudos na programação.
              Nosso objetivo é tornar o aprendizado mais acessível,
              organizado e interessante.
            </p>
            <p>
              Aqui você encontra conteúdos introdutórios de HTML, CSS,
              JavaScript e React para dar os primeiros passos no
              desenvolvimento web.
            </p>
          </section>
        )}

        {pagina === 'contato' && (
          <section className="container secao pagina contato">
            <span className="subtitulo-superior">FALE CONOSCO</span>
            <h1>Vamos conversar?</h1>
            <p className="descricao-pagina">Envie sua mensagem pelo formulário abaixo.</p>

            <form onSubmit={enviarFormulario}>
              <label>Nome</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome" required />

              <label>E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seuemail@exemplo.com" required />

              <label>Mensagem</label>
              <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Como podemos ajudar?" required />

              <button className="btn-principal" type="submit">Enviar mensagem →</button>
              {enviado && <p className="sucesso">✓ Mensagem registrada! Obrigado pelo contato.</p>}
            </form>
            <p className="aviso-form">Demonstração acadêmica: o formulário apresenta confirmação na tela, sem enviar e-mail.</p>
          </section>
        )}
      </main>

      <footer>
        <div className="container rodape">
          <div><h2 className="logo">Dev<span>Fácil.</span></h2><p>Aprenda hoje. Desenvolva seu amanhã.</p></div>
          <p>© 2026 DevFácil. Projeto acadêmico desenvolvido com React.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
