import React, { useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby";

const IndexPage = () => {
  let stripe

  useEffect(()=>{
    stripe = window.Stripe(process.env.STRIPE_PK, {betas: ['checkout_beta_4']})
  }, [])

  const toCheckout = async () => {
    const {error} = await stripe.redirectToCheckout({
      items: [{sku: 'sku_EZEeNKoQH4T5kV', quantity: 1}],
      successUrl: 'http://localhost:8000/success',
      cancelUrl: 'http://localhost:8000/canceled',
    })
    if(error){
      console.log()
    }
  }

  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Link to='products'><h2>Products</h2></Link>
  </Layout>
)}

export default IndexPage
