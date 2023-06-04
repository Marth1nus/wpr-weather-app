import React, { useState } from 'react'

function AddZipcode({ addZip }) {
  const [validated, setValidated] = useState(false)
  const [zipcode, setZipcode] = useState('')

  return (
    <form onSubmit={handleSubmit} className='add-zipcode'>
      <input
        type='text'
        id='zipcode'
        name='zipcode'
        placeholder='Add zipcode'
        value={zipcode}
        onChange={handleChange}
        style={{
          border: validated || !zipcode ? 'none' : '1px solid reds',
        }}
      />
      <input type='submit' value='Add' />
      <button
        onClick={function (event) {
          alert(
            'search for you zipcode online and enter it into the text box. This means you can view you current location. '
          )
        }}
      >
        My Zipcode
      </button>
    </form>
  )

  function handleChange(event) {
    const { value } = event.target
    setValidated(/^\d+$/.test(value))
    setZipcode(value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validated) return
    addZip(zipcode)
  }
}

export default AddZipcode
