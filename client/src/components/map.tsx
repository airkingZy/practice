import React, { useEffect, useState } from 'react';
function Maps() {
    const [count, setCount] = useState(100);
    const mapList: number[] = [];
    useEffect(() => {
        console.log('mapSeed');
        for (let i = 0; i < count; i++) mapList.push(i);
        // return () => {};
    }, []);
    return (
        <div className='maps_wrap'>
            {mapList.map(item => {
                return <p>{item}</p>;
            })}
        </div>
    );
}
export default Maps;
