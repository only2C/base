import React from 'react'
import  { menu , filed , type } from '../stores/data'
import { ListView , Card, WingBlank, WhiteSpace , TabBar , Tabs} from 'antd-mobile';
import _ from 'lodash';
export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            menu:[],
            filed:{},
            type:[],
            tabs:0
        }

    }
    componentWillMount =()=>{
        this.setState({
             menu,
            filed ,
            type,
        })
    }


    getFiled(key){
        return this.state.filed[key];
    }

    getList(obj){
        let sub = obj.sub;
        let menu = this.state.menu;
        menu = _.filter(menu,m =>{
            return m.type ==  sub
        })
        if(_.isEmpty(menu)){
            return (<div>数据更新中...</div>)
        }
        let thumb =  ( obj.sub == 0 ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABcUlEQVQ4T63SPSwEQRwF8PdOolK5XbF7dDQ+EomoJIT2GhqNhEqjQXOhVhCN0+iJSkN1JSFKQuKjEB12L5k9FRLk7slKjtvkLnebmG5mXn7/mfkP0cCwHB2HscDnWL046wXC/X8HGylazrCR6smUshQ+A4+ZWnjZqQtajqZB7IUQE0ibJ+aqoZarMwhfv29oO1owPrcqw3aHulXCfcXaWzPQ5nl8r8wlXc0XPG7/FC1vWI6OQORJbJhnXv00w9UlgIHIiYRc4DMdrqVSSn4IaxC6Ap/jEdB2tSZgGcADhA0QQwDmarxZBsQ5hFUAwwTWjceVCJh0NUHgIEZHg/ASYV7AZMHjYfTKnXJRxHMM8C/ahFTwSC8ChhPb0bWIvjgohRvjs//3H0a66mhHxExMcNf4nK0KWo4WQWzGASEsBT6ztU44IuIkDkhh1Pg8rQ7aalETBmOBRVwYw9eqYGu7ehIJ7APobRC9LZUw9ZLnXTn/DaWRhud9TfVPAAAAAElFTkSuQmCC' :
            ( obj.sub == 1 ?'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABdklEQVQ4T63SP0gCYRjH8d9zSi1BQdFga5J3GQTRFBS1utTSEtTUYpGvBFJb0GAI5XsQ7kVTS02ORdFYFKTn9WctGhorqNQnvNK8OPEOuvHeL5/35X1egouPC+K4kpEqx5vl1CyorP876GbTakNudmdDSIA+SEsnGuE1pxnIeTEDBXsWxEqEtK2sE8qmOAPjs3aHbMZjFErr9TEbS0GQclv37xXtHd0UWHuzd7EoaXrGGlx1gQuxI4CeUEKKwvLKOpApLsEYtJ2IOUuaHvke1kIn0JIEyr2k6hN/wSRAKwDuASUF8DDA8453xpyA4jsHl9cBjAC8Qaq+agdvxCTKOPAw0WcAXVavYIr65KEdNBcDYP+DB/A3pWIPhbYfbeDPA74GEPaI5kiVA7V3aJtWQewAmPUI7pIq55xBQwgQ0p5ARpw0KRuAsVEQnXgDeYw0/dQZzEXb4Gsd8gSW3i8onHlxBu+WNRRL+wD6XaJ5+H3TFNw0qv0X/naJG3ARlIMAAAAASUVORK5CYII=' :''  ) )

        return (
            menu.map((m, n) => (
                    <WingBlank size="lg" key={n}>
                        <WhiteSpace size="lg" />
                        <Card>
                            <Card.Header
                                title={m.title}
                                thumb={thumb}
                            />
                            <Card.Body className="menu-list">
                                <div className='menu-img'> <img src={m.img} /></div>
                                <div>
                                    <label>{this.getFiled('engine')}</label>
                                    <span>{m.engine}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('tyre')}</label>
                                    <span>{m.tyre}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('manned')}</label>
                                    <span>{m.manned}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('setting')}</label>
                                    <span>{m.setting}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('chassis')}</label>
                                    <span>{m.chassis}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('out')}</label>
                                    <span>{m.out}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('inner')}</label>
                                    <span>{m.inner}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('totalKG')}</label>
                                    <span>{m.totalKG}</span>
                                </div>

                                <div>
                                    <label>{this.getFiled('allowKG')}</label>
                                    <span>{m.allowKG}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('preparation')}</label>
                                    <span>{m.preparation}</span>
                                </div>

                                <div>
                                    <label>{this.getFiled('license')}</label>
                                    <span className={m.type == 0 ? 'menu-color-blue': (m.type == 1 ? 'menu-color-yellow':'') }>{m.license}</span>
                                </div>
                                <div>
                                    <label>{this.getFiled('brake')}</label>
                                    <span>{m.brake}</span>
                                </div>
                            </Card.Body>
                            {/* <Card.Footer content="欢迎致电" extra={<div>欢迎致电</div>} /> */}
                        </Card>
                        <WhiteSpace size="lg" />
                    </WingBlank>
                ))

        )
    }

    changeTabs(tab,index){

    }

    render(){
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title=""
                        key="life"
                        icon={<a className="menu-bar-0" href="tel:18888888888">陈经理 18888888888 微信手机同号（点击拨打）</a>
                        }
                      >
                        <Tabs tabs={this.state.type}  initialPage={this.state.tabs}  onChange={this.changeTabs}>
                            {
                                this.state.type.map((a,b)=>{
                                    return this.getList(a);
                                })
                            }

                        </Tabs>

                    </TabBar.Item>
                </TabBar>

            </div>
        );
    }
}
