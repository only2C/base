import React from 'react';
import { Link } from 'react-router';

import Top from '../components/Top';
import Left from '../components/Left';
import Footer from '../components/Footer';
import  AlertFixed from '../common/components/AlertFixed';
import  Alert2 from '../common/components/Alerts2';
import  MessageModel from '../common/components/MessageModel';
import  Spinner from '../common/components/spinner/spinner';
import { CookiesProvider } from 'react-cookie';

//Redux去除了React的Props和State的差别,还有事件,统一都是Props,也就是Provider Store
//Store组件,给下层的App创建映射的属性
class App extends React.Component {

    componentWillMount = () => {

    }

    componentDidMount = () => {
        // let h = document.documentElement.clientHeight;
        /*let w = $(window).height();
        var dom = $(".content");
        dom.height( w - $(".top-nav").height() );
        $(window).resize(
            function(){
                let w = $(window).height();
                var dom = $(".content");
                dom.height( w - $(".top-nav").height() );
            }
        );*/
    }

    render() {
        return (
            <div>
                {/*<Top />
                <Left />
                <div className="content content-left">*/}
                    <div>
                        <Spinner />
                        <Alert2 />
                        <AlertFixed />
                        {this.props.children}
                        <MessageModel />
                    </div>
            </div>
        );
    }
}

export default App;
