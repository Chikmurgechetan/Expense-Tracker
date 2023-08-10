import React, {  useState, useEffect } from "react";
import classes from "./ContectDetails.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

import EmailIcon from "@mui/icons-material/Email";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
//import { authActions } from "../../Store/Reduers/Autho-reducers";


const fetchProfile = async (
  idToken,
  setShowname,
  setShowImage,
  setEmail,
  setEmailVerified
) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q",
      {
        method: "POST",
        body: JSON.stringify({ idToken: idToken }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setShowname(data.users[0].displayName);
      setShowImage(data.users[0].photoUrl);
      setEmail(data.users[0].email);
      setEmailVerified(data.users[0].emailVerified);

      console.log(data.users[0].emailVerified);
      console.log(data);
    } else {
      throw new Error("Failed to fetch profile");
    }
  } catch (error) {
    alert(error);
  }
};

const ContectDetails = () => {
  const idToken = useSelector((state) => state.auth.idToken);

  const navigat = useNavigate();
  //const ctx = useContext(AppContext);
  const [name, setName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [showName, setShowname] = useState("chetanKumar");
  const [showImage, setShowImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKo76YVrnnPieB27rFfO4k43aaWCgI0o4Dr3WC8TNVvU4wDS-s7c1vcXk6CpO5S9zOtuA&usqp=CAU"
  );
  //const verifyEmail = useSelector(state => state.auth.isEmailVerified)  
  //const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
 


  useEffect(() => {
    fetchProfile(
      idToken,
      setShowname,
      setShowImage,
      setEmail,
      setVerifyEmail
      //dispatch(authActions.setEmailVerified())

    );
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(name, profileUrl);
    setShowname(name);
    setShowImage(profileUrl);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q",
        {
          method: "POST",
          body: JSON.stringify({
            displayName: name,
            photoUrl: profileUrl,
            idToken: idToken,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Profile Updated");
        console.log(response);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      alert(error);
    }
  };

  async function verifyEmailHandler() {
    const firebaseApiUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q";

    const requestData = {
      idToken: idToken,
      requestType: "VERIFY_EMAIL",
    };

    try {
      const response = await fetch(firebaseApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data); // contains the response data
    } catch (error) {
      console.error(error); // handle error
    }
  }

  const cancelHandler = () => {
    navigat("/home");
  };

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeProfileUrl = (event) => {
    setProfileUrl(event.target.value);
  };

  return (
    <>
      <div className={classes.Contect}>
        <h2 className={classes.h2}>
          Update Details
          <button className={classes.cancle} onClick={cancelHandler}>
            Cancel
          </button>
        </h2>
        <p>{showName}</p>
        <img src={showImage} alt="profileimage" width="100px" height="60px" />
        <p className="profile-email">{email}</p>

        {verifyEmail ? (
          <p>
            Email verified
            <MarkEmailReadIcon />
          </p>
        ) : (
          <button
            className={classes.buttonVerify}
            onClick={() => verifyEmailHandler(idToken)}
          >
            Verify Email Id <EmailIcon />
          </button>
        )}

        <form className={classes.forms} onSubmit={submitHandler}>
          <label className={classes.labels}>
            <GitHubIcon /> Full Name:
            <input
              type="text"
              value={name}
              onChange={changeName}
              className={classes.nameinput}
            />
          </label>
          <label className={classes.labels}>
            <LanguageIcon /> Profile Photo URl:
            <input
              type="text"
              value={profileUrl}
              onChange={changeProfileUrl}
              className={classes.nameinput}
            />
          </label>
          <button type="submit" className={classes.updatebtn}>
            Update
          </button>
        </form>
      </div>
    </>
  );
};
export default ContectDetails;
