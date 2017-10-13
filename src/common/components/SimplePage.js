import React from 'react';
import {Pagination} from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            activePage: 1
        };
    },

    handleSelect(event, selectedEvent) {
        console.log(this.state.activePage);
        var page = selectedEvent.eventKey;
        if (page == this.state.activePage) return;

        this.setState({
            activePage: page
        });
        this.props.onSelect(page)
    },

    render() {
        return (
            <Pagination
                prev
                next
                first
                last
                ellipsis
                items={this.props.page.total_page}
                maxButtons={10}
                activePage={this.state.activePage}
                onSelect={this.handleSelect}/>
        );
    }
});