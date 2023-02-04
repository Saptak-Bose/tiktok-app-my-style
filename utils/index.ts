import axios from "axios";
import jwt_decode from "jwt-decode";

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: {
    given_name: string;
    family_name: string;
    picture: string;
    sub: string;
  } = jwt_decode(response.credential);
  const { given_name, family_name, picture, sub } = decoded;
  const name = given_name + family_name;
  const uname = name.toLowerCase();

  const user = {
    _id: sub,
    _type: "user",
    userName: uname,
    image: picture,
  };

  addUser(user)

  await axios.post(`http://localhost:3000/api/auth`, user);
};
