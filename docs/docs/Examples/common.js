import React, {Component} from 'react';
import Frame              from 'react-frame-component';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const schema = `{
    title: {
        type: String,
        label: 'Title',
        max: 200
    },
    author: {
        type: String,
        label: 'Author'
    },
    copies: {
        type: Number,
        label: 'Number of copies',
        min: 0
    },
    lastCheckedOut: {
        type: Date,
        label: 'Last date this book was checked out',
        optional: true
    },
    summary: {
        type: String,
        label: 'Brief summary',
        optional: true,
        max: 1000
    },
    addresses: {
        type: [Object],
        minCount: 1,
        maxCount: 4
    },
    'addresses.$.street': {
        type: String
    },
    'addresses.$.city': {
        type: String
    },
    select: {
        type: Number,
        allowedValues: [
            1,
            2,
            3
        ]
    }
}`;

export default class Example extends Component {
    constructor () {
        super(...arguments);

        this.state = {schema};
    }

    componentDidMount () {
        this.example  = document.querySelector('#example');
        this.interval = setInterval(() => {
            this.example.contentWindow.document.body.style.margin = 0;
            this.example.width  = this.example.contentWindow.document.body.children[0].scrollWidth  + 'px';
            this.example.height = this.example.contentWindow.document.body.children[0].scrollHeight + 'px';
        }, 30);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    render () {
        let schema;
        try {
            schema = new SimpleSchema(eval(`(${this.state.schema})`));
        } catch (_) {}

        return (
            <section className="markdown-body">
                <Frame id="example" height="0">
                    {this.props.children}
                    <this.props.component schema={schema} onSubmit={doc => alert(JSON.stringify(doc, null, 2))} />
                </Frame>

                <br />
                <br />

                <label htmlFor="example-schema">Simple Schema</label>
                <br />
                <textarea
                    id="example-schema"
                    onChange={event => this.setState({schema: event.target.value})}
                    style={{ minHeight: '15em', width: '100%' }}
                    value={this.state.schema}
                />
            </section>
        );
    }
}
