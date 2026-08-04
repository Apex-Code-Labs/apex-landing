import Image from 'next/image'

export default function Logo({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/brand/isotipo.svg"
        alt=""
        width={22}
        height={40}
        className="h-9 w-auto md:h-10"
        unoptimized
      />
      <span
        className={`text-lg md:text-xl font-bold leading-none tracking-tight ${
          variant === 'dark' ? 'text-white' : 'text-primary dark:text-white'
        }`}
      >
        apex code labs
      </span>
    </span>
  )
}
