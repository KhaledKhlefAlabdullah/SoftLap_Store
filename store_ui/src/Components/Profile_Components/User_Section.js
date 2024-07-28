import { Button, Card, Container, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { SERVER_PATH } from "../REGEX_And_APIs";
import Loader from "../Loader";
import Profile_Nave from "./Profile_Nave";
import { Auth_Context } from "../../Context/Auth_Context";
export default function User_Section() {
  
  const auth_context = useContext(Auth_Context)
  const UD={...auth_context.auth.user}
  const roles = auth_context.auth.roles;
  const { name, email, img, join_date } = UD
  ? {
      name: UD.name,
      email: UD.email,
      img: UD.profile_img,
      join_date: UD.created_at,
    }
  : {
      name: 'user',
      email: 'user email',
      img: 'images/profile_images/user.png',
      join_date: 'null',
    };
  return (
    
    <Container className="section-me bg-section-color pt-1 pb-1 mb-3 my-box-shadow">
      <Container className="home-section mt-2 mb-2 dir-rtl my-box-shadow">
        <Row className="pt-2 pb-2 position-relative mt-2 mb-2">
          <Container className="profile_img col-lg-8 col-md-6 col-sm-6 w-20 p-0">
            <img className="imgs" src={SERVER_PATH+img} />
          </Container>
          <Container className="col-lg-4 col-md-6 col-sm-8">
            <Container className="mb-1 d-flex align-items-baseline">
              <span className="d-inline-block person ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </span>
              <span className="d-inline-block ml-2">الاسم:</span>
              <span className="d-inline-block">{name}</span>
            </Container>
            <Container>
                 
            <span className="d-inline-block person ml-2">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/>
                </svg>
              </span>
              <span className="d-inline-block ml-2">الايميل:</span>
              <span className="d-inline-block">{email}</span>
            </Container>
            <Container>
              <span className="d-inline-block person ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                </svg>
              </span>
              <span className="d-inline-block ml-2">الصلاحيات:</span>
              <span className="d-inline-block">
                {
                  roles 
                }
              </span>
            </Container>
            <Container>
              <span className="d-inline-block person ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/>
                </svg>
              </span>
              <span className="d-inline-block ml-2">تاريخ الانضمام:</span>
              <span className="d-inline-block">{join_date}</span>
            </Container>
          </Container>
        </Row>
        <Profile_Nave/>
      </Container>
    </Container>
  );
}
