import React from 'react';

const Rank = ({name, entries}) =>{
	return (
              <div>
              	<div style= {{fontFamily:'Courier New,Courier,monospace'}} className='f3 white'>
				  {`${name} , your current entry count is...`}
              	</div>
              	<div style= {{fontFamily:'Courier New,Courier,monospace'}} className='f1 white'>
              		{entries}
              	</div>
              </div>
		);
}

export default Rank;