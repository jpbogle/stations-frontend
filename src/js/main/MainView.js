import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../common/Footer';

export default class MainView extends Component {

    static propTypes = {
        children: PropTypes.node,
    };

    constructor(props) {
        super(props);
        this.state = {
            person: '',
        };
    }

    handleAuth(person) {
        this.setState({ person });
    }

    render() {
        const getHelpOptions = {
            subHeading: 'How can the ToDo team help you?',
            subHeadingText: 'Please fill out the form to contact the ToDo team about issues or feature requests.',
            otherResources: (
                <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
                    <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="http://go/wag-docs"
                        >WAG Documentation</a>
                    </li>
                </ul>
            ),
            channelOptions: {
                issue: {
                    type: 'JIRA',
                    value: {
                        issueTypeName: 'Bug',
                        defaultAssignee: 'westeja2',
                        projectCode: 'WAG',
                    },
                },
                request: {
                    type: 'Email',
                    // this will fail, so change it or remove
                    value: 'ENTER_VALID_EMAIL@novartis.com',
                },
                feedback: {
                    type: 'JIRA',
                    value: {
                        issueTypeName: 'Feature',
                        defaultAssignee: 'westeja2',
                        projectCode: 'WAG',
                    },
                },
            },
        };
        return (
            <div>
                <div style={{ paddingBottom: '1em' }}>
                </div>
                { this.props.children }
                <Footer />
            </div>
        );
    }
}
