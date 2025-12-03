// export default function Home() {
//   return (
//     <>Sorry pa inu ethuvum panla</>
//   );
// }

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-neutral-950 text-white">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-bold">Lenis Smooth Scroll Test</h1>
        <p className="text-lg opacity-70">
          Scroll down to check smooth scrolling
        </p>
      </section>

      {/* Section 1 */}
      <section className="h-screen flex items-center justify-center bg-neutral-900">
        <h2 className="text-4xl font-semibold">Section One</h2>
      </section>

      {/* Section 2 */}
      <section className="h-screen flex items-center justify-center bg-neutral-800">
        <h2 className="text-4xl font-semibold">Section Two</h2>
      </section>

      {/* Section 3 */}
      <section className="h-screen flex items-center justify-center bg-neutral-700">
        <h2 className="text-4xl font-semibold">Section Three</h2>
      </section>

      {/* Footer */}
      <footer className="h-[50vh] flex items-center justify-center bg-neutral-600">
        <p className="text-xl opacity-80">End of Page</p>
      </footer>
    </main>
  );
}
