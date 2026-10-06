import Image from "next/image"

import { publicPath } from "@/lib/public-path"

export function Mark({ className }: { className?: string }) {
  return (
    <Image
      src={publicPath("/images/logo.png")}
      alt=""
      width={512}
      height={512}
      className={className}
    />
  )
}
