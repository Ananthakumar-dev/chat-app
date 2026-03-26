import Header from "@/components/app/header";
import LoginForm from "@/components/forms/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top_left,_rgba(0,132,255,0.12),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.10),_transparent_40%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_70%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <Header />

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-[#dbeafe] bg-[#eef6ff] px-4 py-1 text-sm font-medium text-[#1769ff]">
              Welcome back
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-6xl">
              Pick up every conversation right where you left it.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Log in to continue chatting instantly, see who is online, and stay
              synced across all your devices with the same clean Messenger-style
              experience.
            </p>

            <div className="mt-10 grid max-w-lg gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-slate-900">Realtime</p>
                <p className="mt-2 text-sm text-slate-500">
                  Messages appear instantly.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-slate-900">Presence</p>
                <p className="mt-2 text-sm text-slate-500">
                  See who is online right now.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-slate-900">Secure</p>
                <p className="mt-2 text-sm text-slate-500">
                  Your account stays protected.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <Card className="rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                <CardHeader className="space-y-2 px-8 pt-8">
                  <CardTitle className="text-2xl font-bold tracking-[-0.03em] text-slate-950">
                    Login to your account
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-slate-500">
                    Enter your email and password to continue to your chats.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <LoginForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
