import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  //유저객체의 속성 구조 분해(원래는 user.name)
  const { name, username, email } = user;

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //submit함수
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name == "" || username == "" || email == "") {
      alert("내용을 입력해주세요!");
      return;
    }
    //서버로전송
    await axios.post("http://localhost:8080/users", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">유저 가입</h2>
          {/* 입력폼 */}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                onChange={onInputChange}
                value={name}
                type="text"
                id="name"
                className="form-control"
                placeholder="이름 입력"
                name="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                유저네임
              </label>
              <input
                onChange={onInputChange}
                value={username}
                type="text"
                id="username"
                className="form-control"
                placeholder="유저네임 입력"
                name="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                onChange={onInputChange}
                value={email}
                type="email"
                id="email"
                className="form-control"
                placeholder="이메일 입력"
                name="email"
              />
            </div>
            {/* 버튼 */}
            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 mx-2"
              >
                가입
              </button>
              <Link
                to="/"
                type="submit"
                className="btn btn-outline-danger px-3 mx-2"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
