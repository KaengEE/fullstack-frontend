import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  //검색어
  const [search, setSearch] = useState("");

  //검색어 입력
  const onInputChange = (e) => {
    setSearch(e.target.value);
    //console.log(search);
  };

  useEffect(() => {
    //시작시 유저 가져오기
    loadUsers();
  }, [search]);

  const loadUsers = async () => {
    let result;
    if (search) {
      // 검색어가 있을 때 검색된 유저 가져오기
      result = await axios.get(
        `${import.meta.env.VITE_USER_API}/searchUser?search=${search}`
      );
    } else {
      // 검색어가 없을 때 모든 유저 가져오기
      result = await axios.get(`${import.meta.env.VITE_USER_API}/users`);
    }
    setUsers(result.data);
  };

  //유저 삭제
  const deleteUser = async (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      await axios.delete(`${import.meta.env.VITE_USER_API}/users/${id}`);
      loadUsers();
    }
  };
  //유저검색
  const onSearchClick = async (e) => {
    e.preventDefault();
    loadUsers();
  };

  return (
    <>
      <div className="text-center mt-3">
        <form onSubmit={onSearchClick}>
          <label htmlFor="">유저검색</label>
          <input
            onChange={onInputChange}
            type="text"
            id="search"
            name="search"
            placeholder="유저검색..."
            value={search}
            className="mx-2"
          />
        </form>
      </div>
      <div className="container">
        <table className="table border shadow my-4 text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">이름</th>
              <th scope="col">유저이름</th>
              <th scope="col">이메일</th>
              <th scope="col">액션</th>
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
                <td>
                  <Link
                    to={`/viewuser/${user.id}`}
                    className="btn btn-outline-secondary mx-2"
                  >
                    보기
                  </Link>
                  <Link
                    to={`/edituser/${user.id}`}
                    className="btn btn-outline-warning mx-2"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-outline-danger mx-2"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
