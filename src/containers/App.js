import React from 'react';
import { Link } from 'react-router';
import { CookiesProvider } from 'react-cookie';

//Redux去除了React的Props和State的差别,还有事件,统一都是Props,也就是Provider Store
//Store组件,给下层的App创建映射的属性
class App extends React.Component {

    componentWillMount = () => {

    }

    componentDidMount = () => {
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
