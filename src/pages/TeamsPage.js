import React from "react";
import Team from "../components/Team/Team";
import { connect } from "react-redux";
import { getTeamsInfoFetch } from "../redux/actions/teams";

class TeamsPage extends React.Component {

    componentDidMount() {
        this.props.getTeams()
    }


    render() {

        const { teams } = this.props;
        return (
            <div className='container'>
                <h1>Teams</h1>
                {teams.length &&
                teams.map(({ id, members, name, project, topic }) => <Team key={id} members={members}
                                                                           name={name}
                                                                           topic={topic}
                                                                           project={project}
                />)}
            </div>
        )
    }
}

const mapStateToProps = ({ teams }) => ({ teams })

const mapDispatchToProps = dispatch => ({
    getTeams: () => dispatch(getTeamsInfoFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);