export default function ValidEmail(props: any) {
  const email = props.params.email[0]

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col w-80 gap-5">
        <h2>Parabéns {email}, seu cadastro está enfim completo!</h2>
        <div>Email verificado com sucesso!</div>
      </div>
    </div>
  )
}