import { Hero } from "@/components/Hero"
import { Informations } from "@/components/Informations"
import { RandomVerse } from "@/components/RandomVerse"

export default function Home() {
  return (
    <div className='flex flex-col justify-start'>
      <Hero />
      <RandomVerse />
      <Informations />
    </div>
  )
}
