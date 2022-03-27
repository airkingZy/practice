import React, { useState } from 'react';
import { Button } from 'antd';
import { atom, useAtom } from 'jotai';
function TestViewCopy() {
    const [count, setCount] = useState('首页');
    const testAtom = atom('test atom');
    const [testCount, setTestCount] = useAtom(testAtom);
    const handleClick = () => {
        setCount(`W1,${new Date().getTime()}`);
        // atom;
    };
    return (
        <div>
            testView123
            {count}
            <Button type='primary' onClick={handleClick}>
                click
            </Button>
            <div>{testCount}</div>
        </div>
    );
}
export default TestViewCopy;
