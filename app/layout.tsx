import { Ubuntu } from 'next/font/google';
import './globals.css';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: 'BarberKing',
  description: 'Barbería premium - Reserva tu cita online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={ubuntu.className}>
        {children}
      </body>
    </html>
  );
}