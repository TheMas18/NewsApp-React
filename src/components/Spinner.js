import React, { Component } from 'react'
import loading from './Spinner-3.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>

        <img src={loading}></img>
      </div>
    )
  }
}

export default Spinner