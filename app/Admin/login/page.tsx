import { login } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center">
      <div className="bg-[#1d1d1d] p-8 rounded-xl w-full max-w-md border border-green-600">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>

        <form action={login} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded bg-[#2a2a2a] text-white border border-gray-600"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded bg-[#2a2a2a] text-white border border-gray-600"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-bold py-3 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}