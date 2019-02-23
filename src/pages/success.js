import React from 'react'
import { Link } from 'gatsby';
import Layout from '../components/layout'

const Success = () => {
  return (
    <Layout>
      <h2> thanks for your purchase </h2>
      <Link to='/products'>Back to products</Link>
    </Layout>
  )
}

export default Success