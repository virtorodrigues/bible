import { Check } from 'lucide-react'

type ParamsType = {
  params: {
    success: string[]
  }
}

export default function ValidEmail({ params }: ParamsType) {
  const success = params.success[0] === 'true'

  return (
    (success && (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex w-80 flex-col gap-5 text-white">
          <div className="flex flex-row items-center gap-2">
            <Check color="green" size={36} />
            <h2>Email verificado com sucesso!</h2>
          </div>
        </div>
      </div>
    )) || (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex w-80 flex-row items-center gap-3 text-white">
          <Check color="green" size={36} />
          <h2>Seu email já está verificado</h2>
        </div>
      </div>
    )
  )
}
