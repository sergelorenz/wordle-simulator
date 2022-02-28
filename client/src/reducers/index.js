import { combineReducers } from "redux";
import letterGrid from "./letterGrid";
import gameStatistics from './gameStatistics';

export default combineReducers({
    letterGrid, gameStatistics
});
