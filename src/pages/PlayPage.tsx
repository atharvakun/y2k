import { Link } from "react-router-dom"
import { PageHeader } from "@/components/PageHeader"
import { Butterfly } from "@/components/Butterfly"
import { Game } from "@/components/Game"
import { Window } from "@/components/Window"
import { Sticker } from "@/components/Sticker"

export default function PlayPage() {
  return (
    <>
      <PageHeader
        kicker="Bonus level" title="Butterfly run" bg="#BFE3B2"
        lead="Jump over the CDs, flip phones and flowers. Space, ↑ or tap. Your best score stays on this device."
        decos={[
          { kind: "butterfly", cls: "left-[8%] top-[22%] w-20 md:w-32", r: -10, d: 5 },
          { kind: "cd", cls: "right-[8%] top-[20%] w-20 md:w-32", r: 12 },
          { kind: "phone", cls: "left-[24%] bottom-[14%] w-12 md:w-16", r: 8 },
          { kind: "flower", cls: "right-[24%] bottom-[12%] w-20 md:w-32", r: -6 },
          { kind: "cloud", cls: "left-[6%] bottom-[8%] w-32 md:w-48" },
          { kind: "sparkle", cls: "right-[38%] top-[30%] w-8 md:w-12" },
        ]}
      />
      <Butterfly delay={0.8} />
      <Game heading={false} />
      <section className="px-6 pb-24 md:px-10" aria-label="How to play">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Window title="how_to_play.txt" bar="bg-sky">
            <ul className="space-y-2">
              <li>✦ Space, ↑, W or tap to jump</li><li>✦ One jump at a time, no double-jumps (it's 2000)</li><li>✦ It gets faster. So do you.</li>
            </ul>
          </Window>
          <Window title="obstacles.txt" bar="bg-sun" bodyClass="flex items-center gap-4">
            <Sticker kind="cd" className="w-12" /><Sticker kind="phone" className="w-8" /><Sticker kind="flower" className="w-12" />
            <p className="text-sm text-muted-foreground">CDs roll, phones stand, flowers bloom. All of them hurt.</p>
          </Window>
          <Window title="prize.txt" bar="bg-coral">
            <p className="font-semibold">Beat 500 and screenshot it.</p>
            <p className="mt-1 text-sm text-muted-foreground">Send it to hello@rainbow.exe for a butterfly clip. We will know if you cheated. We will not care.</p>
            <Link to="/shop" className="mt-4 inline-block underline">Shop the drop →</Link>
          </Window>
        </div>
      </section>
    </>
  )
}
