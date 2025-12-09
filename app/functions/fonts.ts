import { Poppins, Spectral } from 'next/font/google'

export const type_second = Spectral({
   weight: '700',
   subsets: ['latin'],
   variable: '--font-spectral',
   display: 'swap'
})

export const type_third = Poppins({
   weight: '700',
   subsets: ['latin'],
   variable: '--font-poppins',
   display: 'swap'
})
