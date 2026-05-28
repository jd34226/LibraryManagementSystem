import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL+`/api/member`;

class MemberService {
  getMembers() {
    return axios.get(`${BASE_URL}/all`);
  }

  getMemberById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  addMember(member) {
    return axios.post(`${BASE_URL}/register`, member);
  }

  updateMember(id, member) {
    return axios.put(`${BASE_URL}/${id}`, member);
  }

  deleteMember(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`);
  }

  login(credentials) {
    return axios.post(`${BASE_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" }
    });
  }
}

const memberService = new MemberService();
export default memberService;
