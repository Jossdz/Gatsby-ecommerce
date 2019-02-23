import React, { useEffect } from "react"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby";

const IndexPage = () => {
  let stripe

  useEffect(()=>{
    stripe = window.Stripe( process.env.STRIPE_PK, {betas: ['checkout_beta_4']})
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
    <Hero>
      <Link to='products'><p>Products</p></Link>
    </Hero>
  </Layout>
)}

const Hero = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`

export default IndexPage
