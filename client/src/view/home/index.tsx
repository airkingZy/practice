import React, { useState, useEffect } from 'react';
// import Welcome from '../../components/welcome';
import { fabric } from 'fabric';
import { Button } from 'antd';
// import { atom, useAtom } from 'jotai';
// import { mapSeed } from '../../utils/maps';
function Home() {
    // const [count, setCount] = useState('首页');
    // const [canvasWidth, setCanvasWidth] = useState('600');
    // const [canvasHeight, setCanvasHeight] = useState('400');
    useEffect(() => {
        // console.log('mapSeed', mapSeed());
        // return () => {};
    }, []);
    // const testAtom = atom('test atom');
    // const [testCount, setTestCount] = useAtom(testAtom);
    const handleClick = async () => {
        const canvas = new fabric.Canvas('canvas', { width: 700, height: 900 });
        const rect1 = new fabric.Line([10, 20, 15, 10], {
            fill: 'green',
            stroke: 'green',
        });
        const rect2 = new fabric.Line([15, 25, 15, 10], {
            fill: 'green',
            stroke: 'green',
        });
        canvas.add(rect1, rect2);
    };
    return (
        <div>
            {/* <Welcome name={count}></Welcome> */}
            <canvas id='canvas' style={{ height: '600px', width: '600px' }}></canvas>
            <Button type='primary' onClick={handleClick}>
                click
            </Button>
        </div>
    );
}
export default Home;
