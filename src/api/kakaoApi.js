import Nav from "../components/Nav";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Paginated from "../components/Paginated";
import { Link } from "react-router-dom";

const rest_api_key = `a7136d2423bac4c6ee019af8674d9c2c` //REST
const redirect_uri = `http://localhost:3000/members/register`
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

export const getKakaoLoginLink = ()=>{
  
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`
  
  return kakaoURL

}
export default kakaoApi;