import {AUTH} from '../actions/index';

export default function(state=[],action)
{
    switch(action.type)
    {
        case AUTH:
            return action.payload.user;

    }
    return state;
}