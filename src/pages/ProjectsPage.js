import React from "react";
import Project from "../components/Project/Project";
import { connect } from "react-redux";
import { getProjectsInfoFetch } from "../redux/actions/projects";
import { client } from "../Client";

class ProjectsPage extends React.Component {

    componentDidMount() {
        this.props.getProjects();
    }

    handleVote = (id,vote) => {

        client.voteProject(id,vote)
            .then((res) => {
                if (res.ok) {
                    this.props.getProjects();
                }
            })
    };



    render() {

        return (
            <div className='container'>
                <h1>Projects</h1>
                {this.props.projects.length && this.props.projects.map(({ id, title, description, votedByMe, votingsCount }) =>
                    <Project
                        key={id}
                        votedByMe={votedByMe} id={id}
                        title={title}
                        description={description}
                        votingsCount={votingsCount}
                        handleVote={this.handleVote}/>)}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getProjects: () => dispatch(getProjectsInfoFetch())
});

const mapStateToProps = state => ({
    projects: state.projects
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);