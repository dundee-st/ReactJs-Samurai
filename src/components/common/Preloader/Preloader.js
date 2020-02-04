import preload from '../../../img/Spinner-1s-200px.svg'
import React from 'react';

let Preloader = (props) => {
    return <div>
        <img src={preload} alt="load" />
    </div>

}
export default Preloader;