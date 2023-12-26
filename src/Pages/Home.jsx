import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //시작시 유저 가져오기
    loadUsers();
  }, []);

  //유저가져오기
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    //console.log(result);
    setUsers(result.data);
  };

  return (
    <div className="container">
      <table className="table border shadow my-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">이름</th>
            <th scope="col">유저이름</th>
            <th scope="col">이메일</th>
          </tr>
        </thead>
        <tbody>
          {/* 반복문 */}
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
