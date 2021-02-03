import React, { Component } from 'react';
import { DiscussionEmbed } from 'disqus-react';

export default class Comments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, url, id } = this.props;
        return (
            <DiscussionEmbed
                shortname={process.env.DISQUS_SHORTNAME}
                config={
                    {
                        url: url,
                        identifier: id,
                        title: title,
                    }
                }
            />
        );
    }
}
