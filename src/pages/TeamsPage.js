import React from "react";
import Team from "../components/Team/Team";

class TeamsPage extends React.Component {

    componentDidMount() {

    }


    render() {
        return (
            <div className='container'>
                <h1>Teams</h1>
                <Team/>
            </div>
        )
    }
}


export default TeamsPage;