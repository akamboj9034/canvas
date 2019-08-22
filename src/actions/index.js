import axios from 'axios';

export const AUTH = 'AUTH';
export const SIGNUP = 'SIGNUP';
export const PROFILE = 'PROFILE';




export function authUser(loginuser) {
    return {
        type: AUTH,
        payload: {
            user: [{ username: loginuser.username, usertype: loginuser.user_type }]
        }
    };
}


export function profile(data) {
    return {
        type: PROFILE,
        payload: {
            profile_update: [{
                username: data[0].username, usertype: data[0].user_type, profile_image: data[0].profile_image, email: data[0].email, phone: data[0].phone,
                aboutme: data[0].aboutme, city: data[0].city, country: data[0].country, company: data[0].company, school: data[0].school, hometown: data[0].hometown, languages: data[0].languages, gender: data[0].gender
            }]
        }
    };
}
