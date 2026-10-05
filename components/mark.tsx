export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M19.5 35.5c.2-7.2-1.2-11.2-6.4-15.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.6 22.6c-4.4-.3-7.2-3.2-6.5-6.4 2.3 1.2 4.4 3.4 6.5 6.4Z"
        fill="currentColor"
      />
      <path
        d="M14.8 17.8c-1.1-4.6.2-7.8 3.4-8.8-.7 3.4-.2 6.2 1.8 8.8-1.9.2-3.6.2-5.2 0Z"
        fill="currentColor"
      />
      <circle cx="22.2" cy="11.2" r="3.15" fill="currentColor" />
      <circle cx="27.6" cy="14.5" r="2.7" fill="currentColor" />
      <circle cx="18.3" cy="14.8" r="2.45" fill="currentColor" />
      <circle cx="23.8" cy="17.1" r="2.15" fill="currentColor" />
      <circle cx="23.2" cy="13.6" r="1.25" className="fill-background" />
    </svg>
  )
}
