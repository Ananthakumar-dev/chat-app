import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)] shadow-[0_18px_35px_rgba(10,124,255,0.24)]">
            <span className="text-2xl font-black text-white">M</span>
            </div>
            <div>
            <p className="bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)] bg-clip-text text-3xl font-black tracking-[-0.05em] text-transparent">
                Messenger
            </p>
            </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
            <Link
            href="/login"
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
            Log in
            </Link>
            <Link
            href="/signup"
            className="rounded-full bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)] px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(10,124,255,0.24)] transition hover:scale-[1.02]"
            >
            Get started
            </Link>
        </div>
        </header>
  );
};

export default Header;
