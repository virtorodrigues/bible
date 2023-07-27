'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as Toast from '@radix-ui/react-toast'
import { Loader2 } from 'lucide-react'

export default function Unsubscribe() {
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

  async function emailUnsubscribe(data: { email: string }) {
    console.log(data.email)
    const informationsRequests = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/email/unsubscribe`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
        }),
      },
    )

    const information = await informationsRequests.json()

    const { success } = information

    if (success) {
      setTextToast('Sua inscrição foi cancelada com sucesso!')
    } else {
      setTextToast(
        'Infelizmente algo deu errado! Tende mais tarde ou mande um email para reactzeiro@gmail.com pedindo o cancelamento da sua inscrição!',
      )
    }
    setOpen(true)
    reset()
  }

  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={handleSubmit(emailUnsubscribe)}
        className="mb-1 mt-40 flex w-96 flex-col items-start justify-center gap-2 p-5 md:w-full md:max-w-lg"
      >
        <h1 className="mb-5 text-white">
          Informe seu e-mail para cancelar sua inscrição
        </h1>
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
            className="enable:hover:box-shadow-lg h-full cursor-pointer rounded bg-white text-sm text-gray-700 duration-200 disabled:cursor-not-allowed disabled:opacity-60 md:px-5"
          >
            {isSubmitting ? (
              <Loader2 color="black" size={25} className="animate-spin" />
            ) : (
              'Continuar'
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
