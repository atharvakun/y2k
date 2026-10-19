import { Hero } from "@/components/Hero"
import { Butterfly } from "@/components/Butterfly"
import { Ticker, Intro, Benefits, Fits, Stats, SubscribeTeaser, Closing, Feed } from "@/components/Sections"
import { ProductGrid } from "@/components/Shop"

export default function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <Hero ready={ready} />
      {ready && <Butterfly delay={2} />}
      <Ticker />
      <Intro />
      <Benefits />
      <Fits />
      <Stats />
      <ProductGrid limit={4} />
      <SubscribeTeaser />
      <Closing />
      <Feed />
    </>
  )
}
