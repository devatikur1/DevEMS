import React from "react";
import { KeyRound, Mail, User, IdCard } from "lucide-react";
import EmailInput from "../../custom/EmailInput";
import PassInput from "../../custom/PassInput";
import TextInput from "../../custom/TextInput";
import UploadImg from "../../custom/UploadImg";

export default function FormInputStyle({
  IsSignIn,
  username,
  setUsername,
  name,
  setName,
  email,
  setEmail,
  confirmPass,
  setConfirmPass,
  pass,
  setPass,
  showPass,
  setShowPass,
  showConfirmPass,
  setShowConfirmPass,
  signUpPart,
  imgData,
  setImgData
}) {
  // ------------------------------
  // ✅ Input config
  // ------------------------------
  const Inputs_Config = {
    username: {
      id: "username",
      type: "text",
      label: "Username",
      placeholder: "your_username",
      icon: User,
      pattern: "^[a-zA-Z0-9_]{3,20}$",
      title:
        "Username can contain letters, numbers, and underscores (3-20 characters)",
    },
    name: {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      icon: IdCard,
    },
    email: {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "name@company.com",
      icon: Mail,
    },
    pass: {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
      icon: KeyRound,
    },
    confirmPass: {
      id: "confirmPass",
      type: "password",
      label: "Confirm Password",
      placeholder: "••••••••",
      icon: KeyRound,
    },
  };
  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {IsSignIn ? (
        <>
          <EmailInput input={Inputs_Config.email} setEmail={setEmail} email={email} />
          <PassInput input={Inputs_Config.pass} setShowPass={setShowPass} showPass={showPass} setPass={setPass} pass={pass} IsSignIn={IsSignIn} confirmPassIsvalid={confirmPass === pass} />
        </>
      ) : (
        <>
          {signUpPart === 0 ?(
            <>
              <UploadImg img={imgData} setImg={setImgData} />
            </>
          ) : signUpPart === 1 ? (
            <>
              <EmailInput input={Inputs_Config.email} setEmail={setEmail} email={email} />
            </>
          ) : signUpPart === 2 ? (
            <>
              <TextInput input={Inputs_Config.username} setText={setUsername} text={username} />
              <TextInput input={Inputs_Config.name} setText={setName} text={name} />
            </>
          ) : (
            <>
              {" "}
              <PassInput input={Inputs_Config.pass} setShowPass={setShowPass} showPass={showPass} setPass={setPass} pass={pass} IsSignIn={IsSignIn} confirmPassIsvalid={confirmPass === pass}  />
              <PassInput input={Inputs_Config.confirmPass} setShowPass={setShowConfirmPass} showPass={showConfirmPass} setPass={setConfirmPass} pass={confirmPass} IsSignIn={IsSignIn} confirmPassIsvalid={confirmPass === pass}  />
            </>
          )}
        </>
      )}
    </>
  );
}
