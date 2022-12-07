import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ChangePassword = () => {
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const pwdRef = useRef() as any;
  const errRef = useRef() as any;

  const id = location.pathname.split("/")[2];

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    pwdRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [password, matchPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(password);

    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axiosPrivate.patch(
        `/change__password/${id}`,
        JSON.stringify({ password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      setPwd("");
      setMatchPwd("");
      navigate(`/users/${id}`);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.message);
      }
      errRef.current.focus();
    }
  };

  const moveToMyPage = async () => {
    navigate(`/users/${id}`);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <button onClick={moveToMyPage}> My Page </button>
          </p>
        </section>
      ) : (
        <section className="login__section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="login__header"> Change Password </h1>

          <form onSubmit={handleSubmit} className="login__form">
            {/* <label className="form__label" htmlFor="password">
          Password:
          </label>
          
          <input
          type="password"
          id="password"
          name="password"
          ref={passRef}
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={password}
          required
        /> */}

            <label htmlFor="password" className="form__label">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={pwdRef}
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="repeated_password" className="form__label">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="repeated_password"
              name="repeated_password"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={!validPwd || !validMatch ? true : false}
              className="register__button"
            >
              Change
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default ChangePassword;
