import React from 'react';
interface propsType {
    name: string;
}
class Welcome extends React.Component<propsType> {
    render() {
        return <div>welcome, {this.props.name}</div>;
    }
}
export default Welcome;
