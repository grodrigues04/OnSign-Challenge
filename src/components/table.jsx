import React, { useState } from "react";

export default function Table({ users, loading, setUsers }) {
  console.log("Rendering Table with users:", users);
  const [ascending, setAscending] = useState(true);

  function sortByName() {
    const sortedUsers = [...users].sort((a, b) =>
      ascending
        ? a.name.localeCompare(b.name, "pt-BR")
        : b.name.localeCompare(a.name, "pt-BR"),
    );

    setUsers(sortedUsers);
    setAscending(!ascending);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 w-100 h-150">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Suggested Friends</th>
              <th scope="col">Suggested Interests</th>
            </tr>
          </thead>

          {!loading ? (
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>

                    <td>
                      {user.suggestedFriends
                        ? [...user.suggestedFriends].join(", ")
                        : "-"}
                    </td>

                    <td>
                      {user.suggestedInterests
                        ? [...user.suggestedInterests].join(", ")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Something went wrong. Try again later
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
        </table>

        {!loading && users.length > 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={sortByName}
          >
            Sort by name
          </button>
        )}
      </div>
    </div>
  );
}
