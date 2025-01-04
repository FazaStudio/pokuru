export const PAYMENT_METHODS = [
  {
    id: 'qris',
    name: 'QRIS',
    icon: '/qris.png',
  },
  {
    id: 'virtual-account',
    name: 'Virtual Account',
    icon: '/va.png',
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    icon: '/shopeepay.png',
  },
  {
    id: 'gopay',
    name: 'GoPay',
    icon: '/gopay.png',
  },
  {
    id: 'ovo',
    name: 'OVO',
    icon: '/ovo.png',
  },
  {
    id: 'dana',
    name: 'DANA',
    icon: '/dana.png',
  },
] as const;

export type PaymentMethod = typeof PAYMENT_METHODS[number]['id'];