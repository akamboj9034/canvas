import {SIGNUP} from '../actions/index';

export default function(state=[],action)
{
    switch(action.type)
    {
        case SIGNUP:
            return action.payload;

    }
    return state;
}