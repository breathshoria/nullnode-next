import React from 'react';

interface Props {
    className: string;
}

const Loader = ({className}: Props) => {
    return (
        <div
            style={{borderTopColor: 'transparent'}}
            className={`${className} animate-spin inline-block border-2 rounded-full`}
        ></div>
    )
}
export default Loader