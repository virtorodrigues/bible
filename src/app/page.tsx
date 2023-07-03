import { Hero } from '@/components/Hero'
import { InformationsFromBible } from '@/components/InformationsFromBible'
import { RandomVerse } from '@/components/RandomVerse'

export default function Home() {
  return (
    <div className="flex flex-col justify-start">
      <Hero />
      <RandomVerse />
      <InformationsFromBible />
    </div>
  )
}
