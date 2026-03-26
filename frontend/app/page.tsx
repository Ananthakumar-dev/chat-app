import Header from "@/components/app/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,_rgba(0,132,255,0.12),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.1),_transparent_40%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_68%)]" />

        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-between px-6 py-10 sm:px-10 lg:px-12">
         <Header />

          <div className="grid flex-1 items-center gap-16 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-full border border-[#dbeafe] bg-[#eef6ff] px-4 py-1 text-sm font-medium text-[#1769ff]">
                Fast, simple, instant messaging
              </p>

              <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
                Hang out anytime, anywhere
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Messenger makes it easy and fun to stay close to your favorite
                people with real-time chat, voice calls, and rich reactions in a
                clean, familiar interface.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)] px-7 py-4 text-base font-semibold text-white shadow-[0_20px_40px_rgba(10,124,255,0.25)] transition hover:translate-y-[-1px]"
                >
                  Continue to chats
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Create new account
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
                <div>
                  <p className="text-2xl font-black text-slate-950">150M+</p>
                  <p>messages sent daily</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-950">24/7</p>
                  <p>instant sync across devices</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-950">HD</p>
                  <p>voice and video clarity</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute left-6 top-8 hidden h-28 w-28 rounded-full bg-[#dbeafe] blur-3xl lg:block" />
              <div className="absolute bottom-12 right-0 hidden h-36 w-36 rounded-full bg-[#ede9fe] blur-3xl lg:block" />

              <div className="relative mx-auto w-full max-w-[560px]">
                <div className="absolute -left-1 top-14 hidden rounded-3xl bg-white/90 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur md:block">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)]" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Aadhil
                      </p>
                      <p className="text-sm text-slate-500">
                        Typing a reply right now...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-3 bottom-16 hidden rounded-3xl bg-[#0f172a] px-5 py-4 text-white shadow-[0_20px_55px_rgba(15,23,42,0.22)] md:block">
                  <p className="text-sm font-semibold">3 friends online</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Jump back into the conversation
                  </p>
                </div>

                <div className="relative mx-auto w-[320px] rounded-[38px] border border-slate-200 bg-white p-3 shadow-[0_35px_100px_rgba(15,23,42,0.16)] sm:w-[360px]">
                  <div className="rounded-[30px] bg-[linear-gradient(180deg,#f7fbff_0%,#eef4ff_100%)] p-5">
                    <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-slate-300" />

                    <div className="mb-5 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)] text-lg font-bold text-white">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Messenger
                        </p>
                        <p className="text-sm text-slate-500">
                          Keep the conversation going
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="ml-auto max-w-[220px] rounded-[22px] rounded-br-md bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)] px-4 py-3 text-sm font-medium text-white">
                        Hey, are we still on for tonight?
                      </div>

                      <div className="max-w-[220px] rounded-[22px] rounded-bl-md bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                        Yep. I will send the location in a second.
                      </div>

                      <div className="ml-auto max-w-[240px] rounded-[22px] rounded-br-md bg-[linear-gradient(135deg,#0a7cff,#8b5cf6)] px-4 py-3 text-sm font-medium text-white">
                        Perfect. See you there.
                      </div>

                      <div className="flex items-center gap-2 pt-3">
                        <div className="h-10 flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400">
                          Aa
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a7cff] text-lg text-white">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 lg:px-12 border-t-2 border-slate-200">
        <div className="flex justify-between">
            <span> © Meta {new Date().getFullYear()} </span>

            <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-700">
                        Privacy Policy
                    </Link>

                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-700">
                        Terms of Service
                    </Link>

                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-700">
                        Cookie Policy
                    </Link>
                </div>

                <div>

                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
