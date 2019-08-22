import {PROFILE} from '../actions/index';

export default function(state=[],action)
{
    switch(action.type)
    {
        case PROFILE:
            return action.payload.profile_update;

    }
    return state;
}