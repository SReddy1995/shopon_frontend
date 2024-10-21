import styled from "styled-components";
import BackgroundImage from "../../assets/images/homePageBackground.png";

export const Link = styled.a`
  color: #095aed;
  font-weight: 500;
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 22px;
  cursor: pointer;
`;

export const LoginPageCardContainer = styled.div`
  height: 100vh;
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${BackgroundImage});
  background-size: cover;
  background-position: 50% 50%;
`;

export const FormContainer = styled.div`
  height: 400px;
  width: 30%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid darkgrey;
  border-radius: 25px;
  box-shadow: 0 0 5px #333;
  justify-content: center;
  align-items: start;
  padding: 0px 30px;

  @media only screen and (max-width: 768px){
    width: 70%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px){
    width: 50%;
  }
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
`;

export const FormFieldContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const FormLabel = styled.label`
  color: gray;
  font-weight: bold;
  text-align: left;
  width: 100%;
  margin: 0 0;
  display: inline-block;
  font-size: 0.7rem;
`;

export const SubmitButton = styled.button`
  background-color: ${(props)=>props.disabled ? 'gray':'#008CBA'}; /* Green */
  border: none;
  color: white;
  border-radius: 35px;
  width: 25%;
  height: 35px;
  align-self: end;
  pointer-events:${(props)=>props.disabled?'none':null};
`;

export const AuthButton = styled.button`
  background-color: slategrey;
  border: none;
  color: white;
  border-radius: 35px;
  width: 25%;
  height: 35px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 7px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const ActionLink = styled.a`
   color: #008CBA;
   text-align: right;
   font-size: 0.7rem;
`;