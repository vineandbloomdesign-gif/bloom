import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main id="content" className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-24 md:px-8">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
        404
      </p>
      <h1 className="mt-4 font-heading text-5xl tracking-tight">
        This page is not in the studio.
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        The link may have moved. The work itself is still in Healdsburg.
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/" />}
        className="mt-8 h-12 w-fit rounded-md px-6 text-base"
      >
        Back to Vine&Bloom
      </Button>
    </main>
  )
}
