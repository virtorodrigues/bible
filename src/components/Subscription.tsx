'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function Subscription() {
  const emailSchema = z.object({
    email: z
      .string()
      .min(3, { message: 'Insira um e-mail válido' })
      .email('Insira um e-mail válido'),
  })

  type EmailType = z.infer<typeof emailSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
  })

  async function registerUser(data: { email: string }) {
    console.log()
    const informationsRequests = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/email/create-user`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          name,
          html: getHTMLToEmail({ email: data.email }),
        }),
      },
    )

    const information = await informationsRequests.json()
    console.log(information)
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
      <form
        onSubmit={handleSubmit(registerUser)}
        className="mb-1 flex w-full flex-col items-start justify-center gap-2"
      >
        <div className="flex h-10 w-full flex-row items-start justify-center gap-4 md:h-10 md:flex-row">
          <div className="flex h-full w-full flex-col">
            <input
              type="text"
              placeholder="E-mail"
              className="h-full w-full rounded border border-gray-400 px-3 text-sm text-black"
              {...register('email')}
            />
          </div>
          <button
            type="submit"
            className="h-full cursor-pointer rounded bg-white px-4 text-sm text-gray-700 duration-200 hover:box-shadow-lg md:px-5"
          >
            Cadastrar
          </button>
        </div>
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        )}
      </form>
    </div>
  )
}
