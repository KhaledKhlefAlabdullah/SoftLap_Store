const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined,{
    currency: 'USD',
    style: 'currency'
})

const forma_currency = (number)=>{
    return CURRENCY_FORMATTER.format(number)
}

export default forma_currency ;