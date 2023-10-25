import { Link } from "react-router-dom";
import { User } from "../user/User";

import { formatDate } from "./utils/formatDate";

export interface UsersTableProps {
    users: User[];
    usersPerPage: number;
    currentPage: number;
}

const UsersTable = (userTableProps: UsersTableProps) => {
    const slicedUsers = userTableProps.users.slice(userTableProps.currentPage * userTableProps.usersPerPage, (userTableProps.currentPage + 1) * userTableProps.usersPerPage);

    return (
            <ul>
                {slicedUsers.map((user) => {
                    return (
                        <li className="home-container__list-itens" key={user.id}> 
                            <div className="home-container__list-itens__users home-container__list-itens__users__id">
                                {user.id}
                            </div>
                            <div className="home-container__list-itens__users">
                                {user.firstName}
                            </div>
                            <div className="home-container__list-itens__users">
                               {user.lastName}
                            </div>
                            <div className="home-container__list-itens__users">
                                {user.title}
                            </div>
                            <div className="home-container__list-itens__users">
                                { formatDate(user.date)}
                            </div>                                <div className="home-container__list-itens__users">
                                  {user.age}
                            </div>
                            <div className="home-container__list-itens__users">
                                <Link id="link" to={`/profile?id=${user.id}&firstName=${user.firstName}&lastName=${user.lastName}&title=${user.title}&date=${user.date}&age=${user.age}&pictureURL=${user.pictureURL}`}>User Profile</Link>
                            </div>
                        </li>
                    )
                })}
            </ul>
     )
}

export default UsersTable;