import Header from "@/components/app/header";
import SignupForm from "@/components/forms/SignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top_left,_rgba(0,132,255,0.12),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.10),_transparent_40%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_70%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <Header />

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-[#dbeafe] bg-[#eef6ff] px-4 py-1 text-sm font-medium text-[#1769ff]">
              Create your account
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-6xl">
              Start chatting in a space that feels fast, simple, and alive.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Sign up to connect with friends, see live presence, and enjoy a
              smooth modern chat interface built for instant conversations.
            </p>

            <div className="mt-10 space-y-4 max-w-xl">
              <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm">
                <p className="text-base font-semibold text-slate-900">
                  Instant messaging from the first login
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your account is ready for realtime chat, quick partner access,
                  and presence indicators as soon as you join.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm">
                <p className="text-base font-semibold text-slate-900">
                  Clean setup, no noise
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Just create your profile, sign in, and jump straight into the
                  conversation flow without extra friction.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <Card className="rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                <CardHeader className="space-y-2 px-8 pt-8">
                  <CardTitle className="text-2xl font-bold tracking-[-0.03em] text-slate-950">
                    Create an account
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-slate-500">
                    Enter your information below to create your account and start
                    chatting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <SignupForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
