import { Link } from "react-router-dom"
import { Window } from "@/components/Window"
import { Sticker } from "@/components/Sticker"

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center justify-center px-6 pt-32 pb-20">
      <Window title="404.exe — not responding" bar="bg-coral" className="w-full max-w-md" bodyClass="text-center">
        <Sticker kind="smiley" color="#9FC9F0" className="mx-auto w-24 rotate-180" />
        <p className="mt-4 text-2xl font-semibold">This page has stopped responding.</p>
        <p className="mt-2 text-muted-foreground">Reason: it was never here. Possibly a Y2K bug.</p>
        <Link to="/" className="btn-3d mt-6 inline-flex h-12 items-center rounded-full bg-navy px-6 font-medium text-white">Back to the drop</Link>
      </Window>
    </section>
  )
}
