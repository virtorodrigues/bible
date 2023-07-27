'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function Subscription() {
  const [open, setOpen] = useState(false)
  const [textToast, setTextToast] = useState('')

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
  })

  async function sendEmailToSubscribe(data: { email: string }) {
    const informationsRequests = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/email/subscribe`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          html: getHTMLToEmail({ email: data.email }),
        }),
      },
    )

    const information = await informationsRequests.json()

    const { success } = information

    if (success) {
      setTextToast('Cadastrado com sucesso!')
    } else {
      const errorMessage =
        information.message ||
        'Alguma coisa deu errado, tente novamente por favor!'
      setTextToast(errorMessage)
    }
    setOpen(true)
    reset()
  }

  function getHTMLToEmail({ email }: { email: string }) {
    const emailValidLink = `${process.env.NEXT_PUBLIC_URL}api/email/valid-subscribe?email=${email}`

    return `
      <div>
        <h1>Confirme seu e-mail clicando no link a baixo</h1>
        <h3>Clique no link para confirmar seu email <a href='${emailValidLink}'>link</a></h3>
        <h3>Parabéns, seu cadastro foi concluído com sucesso.</h3><br /><br />
      </div>
    `
  }

  // async function sendVerse() {
  //   await fetch(`${process.env.NEXT_PUBLIC_URL}api/email/send`, {
  //     method: 'POST',
  //   })
  // }

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="text-sm">
        Cadastre seu E-mail para receber todos os dias um versículo da bíblia
      </h2>
      <form
        onSubmit={handleSubmit(sendEmailToSubscribe)}
        className="mb-1 flex w-full flex-col items-start justify-center gap-2"
      >
        <div className="flex h-10 w-full flex-row items-start justify-center gap-4 md:h-10 md:flex-row">
          <div className="flex h-full w-full flex-col">
            <input
              data-success={!!errors.email}
              type="text"
              placeholder="E-mail"
              className={`h-full w-full rounded border border-gray-400 px-3 text-sm text-black data-[success=true]:border-2 data-[success=true]:border-red-500`}
              {...register('email')}
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="enable:hover:box-shadow-lg h-full cursor-pointer rounded bg-white px-4 text-sm text-gray-700 duration-200 disabled:cursor-not-allowed disabled:opacity-60 md:px-5"
          >
            {isSubmitting ? (
              <Loader2 color="black" size={25} className="animate-spin" />
            ) : (
              'Cadastrar'
            )}
          </button>
        </div>
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        )}
      </form>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut right-0 grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="mb-[5px] text-[15px] font-medium text-black [grid-area:_title]">
            {textToast}
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="fixed right-0 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
      </Toast.Provider>
    </div>
  )
}
