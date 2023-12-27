import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewUser() {
  //id 받기
  const { id } = useParams();

  //유저객체
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  //객체 분리
  const { name, username, email } = user;

  //유저 조회
  const loadUser = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_USER_API}/users/${id}`
    );
    setUser(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">유저 정보</h2>

          <div className="card">
            <div className="card-header">
              유저ID : {id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>이름 : {name}</b>
                </li>
                <li className="list-group-item">
                  <b>유저네임 : {username}</b>
                </li>
                <li className="list-group-item">
                  <b>이메일 : {email}</b>
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            돌아기기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
