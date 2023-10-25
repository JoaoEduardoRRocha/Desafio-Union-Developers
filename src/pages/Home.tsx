import { useEffect, useState } from "react";
import { User } from "../user/User";
import UsersTable from "../components/UsersTable";

import React from 'react'

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);

  const getUsers = () => {
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => response.json())
      .then((data) => {
        const users: User[] = [];
        data.results.forEach(
          (element: {
            picture: { large: string };
            login: { uuid: string };
            name: { first: string; last: string; title: string };
            dob: { date: string; age: number };
          }) => {
            const user: User = {
              id: element.login.uuid,
              firstName: element.name.first,
              lastName: element.name.last,
              title: element.name.title,
              date: element.dob.date,
              age: element.dob.age,
              pictureURL: element.picture.large,
            };
            users.push(user);
          }
        );
        
        setUsers(users);
        setFilteredUsers(users);
        let currentPages = [];
        for (let i = 0; i < users.length / 10; i++) {
          currentPages.push(i);
        }
        setPages(currentPages);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      getUsers();
      
      return;
    }

    setFilter(event.target.value);
    setCurrentPage(0);
    const currentFilteredUsers = users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
        user.title.toLowerCase().includes(filter.toLowerCase()) ||
        user.age.toString().includes(filter.toLowerCase()) ||
        user.date.toLowerCase().includes(filter.toLowerCase()) ||
        user.id.toLowerCase().includes(filter.toLowerCase())
      );
    });
    setFilteredUsers(currentFilteredUsers);
    const pages = [];
    for (let i = 0; i < currentFilteredUsers.length / 10; i++) {
      pages.push(i);
    }
    setPages(pages);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => {
    setCurrentPage(page);
    console.log(currentPage);
  };

  const previousPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage < filteredUsers.length / 10 -1) {
      setCurrentPage(currentPage + 1);
    }
  };

    return (
      <>
            <div className="home-container">
                <header className="home-container__header">
                    <h2 className="home-container__header__title">List Users</h2>
                    <input
                    className="home-container__header__search"
                    type="search" 
                    placeholder="Search User..."
                    value={filter}
                    onChange={handleFilter}
                    />
                </header>

              <ul>
                    <div className="home-container__header-table">
                        <label className="home-container__header-table__label">ID</label>
                        <label className="home-container__header-table__label">First Name</label>
                        <label className="home-container__header-table__label">Last Name</label>
                        <label className="home-container__header-table__label">Title</label>
                        <label className="home-container__header-table__label">Date</label>
                        <label className="home-container__header-table__label">Age</label>
                        <label className="home-container__header-table__label">Actions</label>
                    </div>
                      <UsersTable
                        users={filteredUsers}
                        usersPerPage={10}
                        currentPage={currentPage}
                    />

                  { pages.length > 1 ? (
                    <div className="home-container__previous-next-buttons">
                        <button onClick={(event) => previousPage(event)}>
                            <svg
                                width="12"
                                height="22"
                                viewBox="0 0 12 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                d="M11.7083 20.2931C11.8012 20.386 11.8749 20.4963 11.9252 20.6177C11.9755 20.7391 12.0013 20.8692 12.0013 21.0006C12.0013 21.132 11.9755 21.2621 11.9252 21.3835C11.8749 21.5048 11.8012 21.6151 11.7083 21.7081C11.6154 21.801 11.5051 21.8747 11.3837 21.9249C11.2623 21.9752 11.1322 22.0011 11.0008 22.0011C10.8694 22.0011 10.7393 21.9752 10.6179 21.9249C10.4965 21.8747 10.3862 21.801 10.2933 21.7081L0.293286 11.7081C0.20031 11.6152 0.126551 11.5049 0.0762272 11.3835C0.0259029 11.2621 0 11.132 0 11.0006C0 10.8691 0.0259029 10.739 0.0762272 10.6176C0.126551 10.4962 0.20031 10.3859 0.293286 10.2931L10.2933 0.293056C10.4809 0.105415 10.7354 -5.23096e-09 11.0008 0C11.2662 5.23096e-09 11.5206 0.105415 11.7083 0.293056C11.8959 0.480697 12.0013 0.735192 12.0013 1.00056C12.0013 1.26592 11.8959 1.52042 11.7083 1.70806L2.41454 11.0006L11.7083 20.2931Z"
                                fill="#979090"
                                />
                            </svg>
                        </button>

                        {
                        pages.map((page) => {
                            return (
                            <button
                                key={page}
                                onClick={(event) => handlePageChange(event, page)}
                            >
                                {page + 1}
                            </button>
                            );
                        })
                        }

                        <button onClick={(event) => nextPage(event)}>
                            <svg
                                width="12"
                                height="22"
                                viewBox="0 0 12 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                d="M11.7074 11.7075L1.70745 21.7075C1.61454 21.8004 1.50424 21.8741 1.38284 21.9244C1.26145 21.9747 1.13134 22.0006 0.999946 22.0006C0.868551 22.0006 0.738442 21.9747 0.617049 21.9244C0.495656 21.8741 0.385355 21.8004 0.292445 21.7075C0.199535 21.6146 0.125835 21.5043 0.075552 21.3829C0.0252693 21.2615 -0.000610352 21.1314 -0.000610352 21C-0.000610352 20.8686 0.0252693 20.7385 0.075552 20.6171C0.125835 20.4957 0.199535 20.3854 0.292445 20.2925L9.5862 11L0.292445 1.70751C0.104805 1.51987 -0.000610354 1.26537 -0.000610352 1.00001C-0.00061035 0.734643 0.104805 0.480147 0.292445 0.292507C0.480086 0.104866 0.734582 -0.000549314 0.999946 -0.000549316C1.26531 -0.000549318 1.51981 0.104866 1.70745 0.292507L11.7074 10.2925C11.8004 10.3854 11.8742 10.4957 11.9245 10.6171C11.9748 10.7385 12.0007 10.8686 12.0007 11C12.0007 11.1314 11.9748 11.2615 11.9245 11.3829C11.8742 11.5043 11.8004 11.6146 11.7074 11.7075Z"
                                fill="#979090"
                                />
                            </svg>
                        </button>
                    </div>
                    ):null}
              </ul>
            </div>
          </>
          );
}

export default Home;