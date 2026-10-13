import Footer from "./components/Footer";

export const metadata = {
  title: 'Deheritage Auto',
  description: 'Classic Car Catalogue & Rentals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}