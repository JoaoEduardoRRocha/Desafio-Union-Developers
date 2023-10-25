import { useEffect, useState } from "react";
import { User } from "../user/User";
import { Link, useSearchParams } from "react-router-dom"
import React from 'react';


const Profile = () => {
    const [user, setUser] = useState<User>();
    const [queryParameters] = useSearchParams()

    useEffect(() => {
        console.log(queryParameters.get("id"));
        const user: User = {
            id: queryParameters.get("id") as string,
            firstName: queryParameters.get("firstName") as string,
            lastName: queryParameters.get("lastName") as string,
            title: queryParameters.get("title") as string,
            date: queryParameters.get("date") as string,
            age: queryParameters.get("age") as unknown as number,
            pictureURL: queryParameters.get("pictureURL") as string,
        }

        setUser(user);
    } ,[])

    return (
            <div className="profile-container">
                <header className="profile-container__header">
                    <Link to="/"className="profile-container__header__button-back-home">Back</Link>
                    <img className="profile-container__header__img-profile" src={user?.pictureURL} />
                    <h1 className="profile-container__header__name-h1">{user?.firstName} {user?.lastName}</h1>
                    <p className="profile-container__header__status">{user?.title}</p>
                </header>

                <div className="profile-container__content">
                    <nav className="profile-container__content__nav-bar">
                        <label className="profile-container__content__nav-bar__labels">Info</label>
                        <label className="profile-container__content__nav-bar__labels">Location</label>
                        <label className="profile-container__content__nav-bar__labels">Login</label>
                    </nav>

                    <div className="profile-container__users-info">
                        <label className="profile-container__users-info__label">First Name</label>
                        <p className="profile-container__users-info__p">{user?.firstName}</p>

                        <label className="profile-container__users-info__label">Last Name</label>
                        <p className="profile-container__users-info__p">{user?.lastName}</p>

                        <label className="profile-container__users-info__label">Title</label>
                        <p className="profile-container__users-info__p">{user?.title}</p>

                        <label className="profile-container__users-info__label">Date</label>
                        <p className="profile-container__users-info__p">{user?.date}</p>

                        <label className="profile-container__users-info__label">Age</label>
                        <p className="profile-container__users-info__p">{user?.age}</p>
                    </div>
                </div>
            </div>
          );
}

export default Profile;