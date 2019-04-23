import React, {useEffect} from 'react'
import Layout from '../components/layout'

export default () => {
  let stripe

  useEffect(()=>{
    stripe = window.Stripe(process.env.STRIPE_PK, {betas: ['checkout_beta_4']})
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const {error} = await stripe.redirectToCheckout({
      items: [{sku: 'sku_Ew8GH2Akoe6lvE', quantity: 1}, {sku: 'sku_EZHtu9rqgzMz51',quantity: 1}],
      successUrl: 'http://localhost:8000/success',
      cancelUrl: 'http://localhost:8000/products',
    })
    if(error){
      console.error(error)
    }
  }
  return (
    <Layout>
      <button onClick={handleSubmit}>Buy multiple products</button>
    </Layout>
  )
}