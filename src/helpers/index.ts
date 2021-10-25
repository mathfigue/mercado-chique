const MoneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatMoney = (value: number) => MoneyFormatter.format(value)
