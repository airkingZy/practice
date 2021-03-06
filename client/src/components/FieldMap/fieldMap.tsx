import React, { useEffect, useState } from 'react';
import { drawMap, mapSeed } from '../../utils/maps';
import './index.less';
function FieldMap() {
    // const [count, setCount] = useState(100);
    // const mapList: number[] = [];
    useEffect(() => {
        console.log('mapSeed');
        const middle: HTMLElement = document.querySelector('.middle-wrap') as HTMLElement;
        // console.log('middle',middle,document.getElementById('middle-wrap'))
        let mapList: any = [];
        mapSeed().then(res => {
            mapList = res;
            const mapWitdh: number = middle.clientWidth - 120;
            const mapHeight: number = (middle.clientHeight - 10) * 0.4;
            console.log('mapWitdh', mapWitdh);
            console.log('mapHeight', mapHeight);
            const map = new drawMap('canvas');
            map.initBaseMap(mapWitdh, mapHeight, 'white');
            map.initBaseLine({
                width: mapWitdh,
                height: mapHeight,
                xNumber: 100,
                yNumber: 50,
            });
            map.createChildMap(mapList.list);
            console.log('mapList0,', mapList);
        });

        // return () => {};
    }, []);
    return (
        <div className='maps_wrap'>
            <canvas id='canvas'></canvas>
        </div>
    );
}
export default FieldMap;
