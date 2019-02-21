import React, {useEffect} from 'react'
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout'

const Product = props => {
  let stripe
  const {id, price, name } = props

  useEffect(()=>{
    stripe = window.Stripe(process.env.STRIPE_PK, {betas: ['checkout_beta_4']})
  }, [])

  const priceFloat = (price/100).toFixed(2)
  const formatedPrice = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(priceFloat)

  const handleSubmit = sku => async e => {
    e.preventDefault()
    const {error} = await stripe.redirectToCheckout({
      items: [{sku, quantity: 1}],
      successUrl: 'http://localhost:8000/success',
      cancelUrl: 'http://localhost:8000/canceled',
    })
    if(error){
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(id)}>
      <h2>{name} ({formatedPrice})</h2>
      <button type='submit'>buy</button>
    </form>
  )
}

export default () => {
  const data = useStaticQuery(graphql`
  {
    allStripeSku{
      edges{
        node{
          id
          currency
          price
          attributes{
            name
          }
        }
      }
    }
  }
`)
console.log(data)
  return (
      <Layout>
        {data.allStripeSku.edges.map(({node: sku}) => (
          <Product
            id={sku.id}
            price={sku.price}
            name={sku.attributes.name}
            key={sku.id}
          />
        ))}
      </Layout>
  )
}