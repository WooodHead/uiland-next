import React, { useContext} from 'react';
import styled from "styled-components";
import Header from '../components/Header';
import { UserContext } from "../context/authContext";
import {deleteAccount} from "../firebase"
export default function Profile() {
  const user = useContext(UserContext);
console.log(user)

function handleDelete(){
  deleteAccount(user.uid)
}
  return (
    <>
     <Wrapper>
        <Header />
      </Wrapper>
             <SingleHeader>

    <>
  
     <Title>Profile</Title>
    
   <ProfileContainer>
    {/* gets the displayname */}
    <PhotoWrapper>
      <img src={user?.photoURL} referrerPolicy="no-referrer"/>
    </PhotoWrapper>
<h1>{ user?.displayName}</h1>
<h3>{user?.email}</h3>
<button className='album-card__buttoncopy' onClick={handleDelete}>Delete Account</button>
   </ProfileContainer>
     </>

	  </SingleHeader>
      </>
  );
   
};
const Button=styled.button`

`
const PhotoWrapper=styled.div`
overflow:hidden;
img{
	border-radius: 100%;
	height: 45px;
}
`
const ProfileContainer =styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:12px;
background:white;
border-radius:12px 20px;
`
const Title = styled.h1`
	z-index:99;
	font-size:24px;
	font-weight:600;
	margin:0;
	padding:0;
`;
const SingleHeader = styled.div`
	display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:15px;
  gap:8px;

`;

const Wrapper = styled.div`
  background: var(--primary-color);
`;


const ElementsInCategoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(281px, 1fr));
	margin: 1.5em auto;
	gap: 10px;
	width: 90%;

	@media (min-width: 768px) {
		width: 95%;
		margin: 3em auto;
		gap: 20px;
	}
`;
;

