
import React, { useState } from 'react'

function NavbarTool({ setValue }) {
    const [clickedButton, setClickedButton] = useState(1);
    function handleClick(id) {
        setClickedButton(id);
        if(id === 1){
            setValue(false);
        }else{
            setValue(true)
        }
    }
  return (
    <div>
        <div className='tool-navbar'>
            <div className='tool-navbar-items'>
                <div className='tool-navbar-txt'>
                    <h1>EMAIL WRITER (Lead Generation)</h1>
                    <h6>generate engaged emails marketing for your leads compaign.</h6>
                </div>
                <div className="buttons">
                    <button onClick={() => handleClick(1)} className={clickedButton === 1 ? 'clicked' : ''}>Start Using</button>
                    <button onClick={() => handleClick(2)} className={clickedButton === 2 ? 'clicked' : ''}>Example</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavbarTool