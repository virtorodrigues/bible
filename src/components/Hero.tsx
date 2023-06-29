export function Hero() {
  return (
    <div className="h-screen w-full bg-[url('../assets/bible1.png')] bg-no-repeat bg-fixed bg-cover bg-center shadow-lg overflow-hidden flex justify-center">
      <div className="text-white w-[1200px] bg-red flex items-center justify-center flex-col gap-16 fixed top-[50%] left-[50%] translate-x-[-50%]
">
        <h1 className="text-center text-6xl mt-[-200px] text-shadow-lg">Leia mais a biblia</h1>
        <button className="bg-white text-black px-5 py-3 rounded box-shadow-lg">Começar agora</button>
      </div>
    </div>
  )
}