
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pagina, setPagina] = useState('inicio')
  const [favoritos, setFavoritos] = useState(() => {
  const salvos = localStorage.getItem('devfacil-favoritos')
  return salvos ? JSON.parse(salvos) : []
})

useEffect(() => {
  localStorage.setItem('devfacil-favoritos', JSON.stringify(favoritos))
}, [favoritos])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviado, setEnviado] = useState(false)

  const cursos = [
    { id: 1, nome: 'HTML5', descricao: 'Aprenda a criar a estrutura de páginas web.', icone: '🌐', nivel: 'Iniciante' },
    { id: 2, nome: 'CSS3', descricao: 'Aprenda a estilizar sites modernos e responsivos.', icone: '🎨', nivel: 'Iniciante' },
    { id: 3, nome: 'JavaScript', descricao: 'Dê vida aos seus projetos com programação.', icone: '⚡', nivel: 'Intermediário' },
    { id: 4, nome: 'React', descricao: 'Construa interfaces modernas com componentes.', icone: '⚛️', nivel: 'Intermediário' },
  ]

  function alternarFavorito(id) {
    setFavoritos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    )
  }

  function enviarFormulario(e) {
    e.preventDefault()
    setEnviado(true)
    setNome('')
    setEmail('')
    setMensagem('')
  }

  function mostrarCursos(lista) {
    return (
      <div className="cursos-grid">
        {lista.map((curso) => (
          <article className="curso-card" key={curso.id}>
            <div className="curso-icone">{curso.icone}</div>
            <span className="nivel">{curso.nivel}</span>
            <h3>{curso.nome}</h3>
            <p>{curso.descricao}</p>
            <button
              className="btn-favorito"
              onClick={() => alternarFavorito(curso.id)}
            >
              {favoritos.includes(curso.id) ? '❤️ Favoritado' : '♡ Favoritar'}
            </button>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container nav">
          <h2 className="logo">Dev<span>Fácil.</span></h2>

          <nav>
            <button onClick={() => setPagina('inicio')}>Início</button>
            <button onClick={() => setPagina('cursos')}>Cursos</button>
            <button onClick={() => setPagina('favoritos')}>Favoritos ({favoritos.length})</button>
            <button onClick={() => setPagina('sobre')}>Sobre</button>
            <button onClick={() => setPagina('contato')}>Contato</button>
          </nav>
        </div>
      </header>

      <main>
        {pagina === 'inicio' && (
          <>
            <section className="hero">
              <div className="container hero-content">
                <span className="destaque">APRENDA PROGRAMANDO</span>
                <h1>Seu futuro na programação começa <span>aqui.</span></h1>
                <p>
                  Aprenda programação de forma simples, prática e no seu ritmo.
                  Comece hoje mesmo sua jornada no mundo da tecnologia!
                </p>
                <button className="btn-principal" onClick={() => setPagina('cursos')}>
                  Explorar cursos →
                </button>
              </div>
            </section>

            <section className="container secao">
              <h2>Comece a aprender</h2>
              <p className="subtitulo">Conheça alguns dos nossos cursos.</p>
              {mostrarCursos(cursos)}
            </section>
          </>
        )}

        {pagina === 'cursos' && (
          <section className="container secao">
            <h1>Nossos cursos</h1>
            <p className="subtitulo">Escolha uma tecnologia e comece a estudar.</p>
            {mostrarCursos(cursos)}
          </section>
        )}

        {pagina === 'favoritos' && (
          <section className="container secao">
            <h1>Meus favoritos ❤️</h1>
            <p className="subtitulo">Seus cursos preferidos estão aqui.</p>
            {mostrarCursos(cursos.filter((curso) => favoritos.includes(curso.id)))}
            {favoritos.length === 0 && <p>Você ainda não favoritou nenhum curso.</p>}
          </section>
        )}

        {pagina === 'sobre' && (
          <section className="container secao sobre">
            <h1>Sobre o DevFácil</h1>
            <p>
              O DevFácil é uma plataforma educacional criada para ajudar
              iniciantes a dar os primeiros passos no desenvolvimento web.
            </p>
            <p>
              Nosso objetivo é tornar o aprendizado de programação mais
              acessível, simples e divertido.
            </p>
            <h2>Aprenda. Pratique. Evolua!</h2>
          </section>
        )}

        {pagina === 'contato' && (
          <section className="container secao contato">
            <h1>Entre em contato</h1>
            <p className="subtitulo">Envie sua mensagem para nós.</p>

            <form onSubmit={enviarFormulario}>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Digite sua mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
              />
              <button className="btn-principal" type="submit">Enviar mensagem</button>
              {enviado && <p className="sucesso">Mensagem enviada com sucesso! Obrigado pelo contato.</p>}
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>© 2026 DevFácil. Projeto acadêmico desenvolvido com React.</p>
      </footer>
    </div>
  )
}

export default App
