  import React from 'react';

  const Facts = () => {
    return (
      <div className='factContainer'>
        <div className='factsTitle'>
          <h1>Do You <span>Know</span> That</h1>
        </div>
        <div className='factsContainer1'>
          <div className='fact'>
            <p><h3>50%</h3> of small businesses fail within their first five years, often due to ineffective marketing.<br /><br /><p className='factSource'>"SBA"</p></p>
          </div>
          <div className='fact'>
            <p><h3>80%</h3> of small businesses that fail cite cash flow problems, which can result from a lack of effective marketing strategies.<br /><br /><p className='factSource'>"Intuit"</p></p>
          </div>
          <div className='fact'>
            <p><h3>36%</h3> of SMBs fail due to marketing budget constraints, inhibiting their growth and success.<br /><br /><p className='factSource'>"Small Business Trends"</p></p>
          </div>
        </div>
      </div>
    );
  }

  export default Facts;
