import React, { Component } from 'react'

import Spinner from '../components/Spinner'
import ItemCard from '../components/ItemCard'
import items from '../libs/caseItems'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Spinner />
        {/* <ItemCard {...items[0]}/> */}
      </div>
    )
  }
}

export default Home

