import React from 'react';

const Navigation = ({onRouteChange}) =>{
	return (
              <nav style = {{display : 'flex' , justifyContent: 'flex-end' }}>
                 <p onClick = { () => onRouteChange('signin')} className='fa3 link dim black pointer pa3 underline'>Sign Out</p>   
              </nav>  
		);
}

export default Navigation;