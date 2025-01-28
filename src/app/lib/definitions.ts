// This file contains type definitions for our data
export type Brother = {
    id: string;
    first_name: string;
    last_name: string;
    personal_email: string;
    password: string;
    school_email: string;
    brother_name: string;
    house: string;
    year: number;
    birthday: string;
    location: string;
    phone: string;
    tagline: string;
    position: string;
    bio: string;
    instagram: string;
};

export type Recruit = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    year: number;
    room: string;
}

export type RecruitComments = {
    id: string;
    recruit_id: string;
    brother_id: string;
    comment: string;
}