'use client'

import { useState } from 'react'

export function Subscription() {
  const [email, setEmail] = useState('')

  async function registerUser() {
    if (email.length > 3) {
      const informationsRequests = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/email/create-user`,
        {
          method: 'POST',
          body: JSON.stringify({
            email,
            name,
            html: getHTMLToEmail({ email }),
          }),
        },
      )

      const information = await informationsRequests.json()
      console.log(information)
      setEmail('')
    }
  }

  function getHTMLToEmail({ email }: { email: string }) {
    const emailValidLink = `${process.env.NEXT_PUBLIC_URL}api/email/valid?email=${email}`

    return `
      <div>
        <h1>Confirme seu e-mail clicando no link a baixo</h1>
        <h3>Clique no link para confirmar seu email <a href='${emailValidLink}'>link</a></h3>
        <h3>Parabéns, seu cadastro foi concluído com sucesso.</h3><br /><br />
      </div>
    `
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="text-sm">
        Cadastre seu E-mail para receber todos os dias um versículo da bíblia
      </h2>
      <div className="mb-1 flex h-10 w-full flex-row items-start justify-center gap-4 md:h-10 md:flex-row">
        <input
          type="text"
          placeholder="E-mail"
          className="h-full w-full rounded border border-gray-400 px-3 text-sm text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="h-full cursor-pointer rounded bg-white px-4 text-sm text-gray-700 duration-200 hover:box-shadow-lg md:px-5"
          onClick={registerUser}
        >
          Cadastrar
        </button>
      </div>
    </div>
  )
}
