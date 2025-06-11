import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"]})

export const metadata = {
  title: "Medical Appointment App",
  description: "Connect with Us Anytimes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <main className="min-h-screen">{children}</main>

          <footer className="bg-muted/50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
              <p>Made for Booking Appointments</p>
            </div>
          </footer>
        </ThemeProvider>
        
        
      </body>
    </html>
  );
}
