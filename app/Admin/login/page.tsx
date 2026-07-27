export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="bg-neutral-800 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-neutral-700"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-neutral-700"
        />

        <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded">
          Login
        </button>
      </div>
    </main>
  );
}