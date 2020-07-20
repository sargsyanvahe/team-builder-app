import React from "react";
import { connect } from "react-redux";
import { client } from "../Client";

import Topic from "../components/Topic/Topic";
import InputText from "../components/Inputs/InputText";
import Button from "../components/Button/Button";

import { getTopicsInfoFetch } from "../redux/actions/topics";

class TopicsPage extends React.Component {

    state = {
        topicName: ''
    };

    componentDidMount() {
        this.props.getTopics();
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ topicName: value })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const value = this.state.topicName.trim();
        if (value) {
            client.addTopic(value)
                .then(res => {
                    if (res.ok) {
                        this.setState({ topicName: '' })
                        this.props.getTopics();
                    }
                }).catch(e => {
                throw new Error(e)
            })
        }
    };

    handleDelete = (id) => {
        client.deleteTopic(id)
            .then((res) => {
                if (res.ok) {
                    this.props.getTopics();
                }
            }).catch(e => {
            throw new Error(e)
        })
    };

    handleVote = (id, vote) => {

        client.voteTopic(id, vote)
            .then((res) => {
                if (res.ok) {
                    this.props.getTopics();
                }
            }).catch(e => {
            throw new Error(e)
        })
    };


    render() {

        return (
            <div className='container'>
                <h1>Topics</h1>
                <form onSubmit={this.handleSubmit}>
                    <div style={{
                        margin: 'auto',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <InputText placeholder='Topic name' type='text'
                                   onChange={this.handleChange}
                                   value={this.state.topicName}/>
                        <Button onClick={this.handleSubmit} color='#27ae60'>Add</Button>
                    </div>
                </form>
                {this.props.topics.length && this.props.topics.map(({ id, title, canDelete, votedByMe, votingsCount }) =>
                    <Topic
                        key={id}
                        votedByMe={votedByMe} id={id}
                        title={title}
                        handleDelete={this.handleDelete}
                        canDelete={canDelete}
                        votingsCount={votingsCount}
                        handleVote={this.handleVote}/>)}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getTopics: () => dispatch(getTopicsInfoFetch())
});

const mapStateToProps = state => ({
    topics: state.topics
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);