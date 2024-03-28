// import Nav from "../components/Nav";
// import React, { Component, useState, useEffect } from "react";
// import axios from "axios";
// import Paginated from "../components/Paginated";
// import { Link } from "react-router-dom";

// const rest_api_key = `a7136d2423bac4c6ee019af8674d9c2c`; 
// const redirect_uri = `http://localhost:3000/Register`;
// const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;
// const auth_access_token_url = `https://kauth.kakao.com/oauth/token`;



// export const getKakaoLoginLink = ()=>{
//   const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${'rest_api_key'}&redirect_uri=${'redirect_uri'}&response_type=code`
//   return kakaoURL
// };
// export const getAccessToken = async(authCode) =>{
//   const header = {
//     headers:{
//       "Content-Type":"application/x-www-form-urlencoded",
//     }
//   }
//   const params={
//     grant_type:"authorization_code",
//     client_id:rest_api_key,
//     redirect_uri:redirect_uri,
//     code:authCode
//   }
//   const res = await axios.post(access_token_url, params, header)
//   const accessToken = res.access_token
//   return accessToken 
// };
  

