import { combineReducers } from 'redux';
import { companies } from "./companies";
import { user } from "./user";
import { projects } from "./projects";
import { topics } from "./topics";
import { teams } from "./teams";

export default combineReducers({
    companies,
    user,
    projects,
    topics,
    teams
});