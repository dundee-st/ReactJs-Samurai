import React from 'react';
import Preloader from '../components/common/Preloader/Preloader';



export const withSuspense = (Component) => {

    return (props) => {
        // eslint-disable-next-line no-unused-expressions
        return <React.Suspense fallback={<Preloader />}>
            <Component {...props} />
        </React.Suspense>
    };
}