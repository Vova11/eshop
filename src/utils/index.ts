export {default as Button} from "./Button";
export {default as Input }from "./Input";
export {default as Form } from "./Form";
export { default as SubmitBtn } from './SubmitBtn'

export const formatPrice = (price: number): string => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2))
  return dollarsAmount
}

export const generateAmountOptions = (number: number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1
    return {
      key: amount,
      value: amount,
      label: `${amount}`,
    }
  })
}