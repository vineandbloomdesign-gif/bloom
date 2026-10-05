import Image from "next/image"

export function Mark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={512}
      height={512}
      className={className}
    />
  )
}
