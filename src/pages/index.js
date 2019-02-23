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
