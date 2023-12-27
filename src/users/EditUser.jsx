import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  //유저객체의 속성 구조 분해(원래는 user.name)
  const { name, username, email } = user;
  //PathVariable의 id값 받기
  const { id } = useParams();
  //페이지이동
  const navigate = useNavigate();

  //업데이트 전 유저데이터 가져오기
  const loadUser = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_USER_API}/users/${id}`
    );
    setUser(result.data);
    //console.log(result.data);
  };

  //유저데이터 가져와서 user에 저장
  useEffect(() => {
    loadUser();
  }, []);

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
    await axios.put(`${process.env.REACT_APP_USER_API}/users/${id}`, user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">유저 수정</h2>
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
                수정
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

export default EditUser;
