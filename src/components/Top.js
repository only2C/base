import React from 'react';
import { Link } from 'react-router';
import Config from '../config';
import $ from 'jquery';
export default class Top extends React.Component {
    constructor(props) {
        super(props);

    }

    toggleClass = () => {
        $("#sidenav").toggleClass("none");
        $(".content").toggleClass("content-left");
    }

    logout = () => {
        window.location = Config.base.loginout;
    }

    render() {
        var _this = this;
        let nav = (
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapse fl in" data-toggle="collapse"
                            onClick={_this.toggleClass.bind(this)}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="navbar-logo"></div>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right navbar-navbar-head-portrait-ul">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
                                <span className="navbar-head-portrait"></span>
                                <span className="navbar-head-portrait-caret"></span>
                            </a>
                            <ul className="dropdown-menu navbar-logout">
                                <li><a onClick={this.logout}>退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )

        return (
            <nav className="navbar navbar-fixed-top">
                {nav}
            </nav>
        );
    }
};
