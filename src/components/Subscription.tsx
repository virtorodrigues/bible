'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import React from 'react'

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

  const [open, setOpen] = React.useState(false)
  // const eventDateRef = React.useRef(new Date())
  const timerRef = React.useRef(0)

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <>
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
            <span className="text-sm text-red-500">
              {errors.email?.message}
            </span>
          )}
        </form>
      </div>

      <button
        className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded bg-white px-[15px] text-[15px] font-medium leading-[35px] shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        onClick={() => {
          setOpen(false)
          window.clearTimeout(timerRef.current)
          timerRef.current = window.setTimeout(() => {
            // eventDateRef.current = oneWeekAway()
            setOpen(true)
          }, 100)
        }}
      >
        Add to calendar
      </button>

      <Toast.Root
        className="data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="text-slate12 mb-[5px] text-[15px] font-medium [grid-area:_title]">
          Scheduled: Catch up
        </Toast.Title>
        <Toast.Description asChild>
          asdasd
          {/* <time
              className="text-slate11 m-0 text-[13px] leading-[1.3] [grid-area:_description]"
              dateTime={eventDateRef.current.toISOString()}
            > */}
          {/* {prettyDate(eventDateRef.current)} */}
          {/* </time> */}
        </Toast.Description>
        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="bg-green2 text-green11 shadow-green7 hover:shadow-green8 focus:shadow-green8 inline-flex h-[25px] items-center justify-center rounded px-[10px] text-xs font-medium leading-[25px] shadow-[inset_0_0_0_1px] hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]">
            Undo
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </>
  )
}
