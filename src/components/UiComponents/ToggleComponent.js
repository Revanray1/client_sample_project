import React from 'react'

const ToggleComponent = ({index,value}) => {
  return (
    <div className='toggle'>
         <input type="checkbox" id={`mode-toggle-${index}`} class="toggle-input" checked = {value} />
         <label for={`mode-toggle-${index}`} className='toggle-label'/>
    </div>
  )
}

export default ToggleComponent