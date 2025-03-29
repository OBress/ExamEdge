import Link from "next/link";
import Image from "next/image";

export function MainNav() {
  return (
    <div className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/placeholder.svg?height=32&width=32"
          alt="ExamEdge Logo"
          width={32}
          height={32}
          className="rounded"
        />
        <span className="hidden text-xl font-bold text-primary md:inline-block">
          ExamEdge
        </span>
      </Link>
      <nav className="absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/dashboard"
          className="flex items-center text-base font-bold text-black transition-colors hover:text-primary/80"
        >
          Dashboard
        </Link>
      </nav>
      <div className="w-[150px]"></div>
    </div>
  );
}
