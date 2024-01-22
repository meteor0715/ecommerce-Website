import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

let Register = (props) => {
  let [state, setState] = useState({
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    receiveNewsLetters: "",
  });

  let [countries] = useState([
    { id: 1, countryName: "India" },
    { id: 2, countryName: "USA" },
    { id: 3, countryName: "UK" },
    { id: 4, countryName: "Japan" },
    { id: 5, countryName: "France" },
    { id: 6, countryName: "Brazil" },
    { id: 7, countryName: "Mexico" },
    { id: 8, countryName: "Canada" },
  ]);

  let [errors, setErrors] = useState({
    email: [],
    password: [],
    dateOfBirth: [],
    gender: [],
    country: [],
    receiveNewsLetters: [],
  });

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    dateOfBirth: false,
    gender: false,
    country: false,
    receiveNewsLetters: false,
  });

  let [message, setMessage] = useState("");

  let userContext = useContext(UserContext);

  //validate
  let validate = () => {
    let errorsData = [];

    //email
    errorsData.email = [];

    //email can't blank
    if (!state.email) {
      errorsData.email.push("Email can't be blank");
    }

    //email regex
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Proper email address is expected");
      }
    }

    //password
    errorsData.password = [];

    //password can't blank
    if (!state.password) {
      errorsData.password.push("Password can't be blank");
    }

    //password regex
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push(
          "Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit"
        );
      }
    }

    //fullName
    errorsData.fullName = [];

    //fullName can't blank
    if (!state.fullName) {
      errorsData.fullName.push("Full Name can't be blank");
    }

    //dateOfBirth
    errorsData.dateOfBirth = [];

    //dateOfBirth can't blank
    if (!state.dateOfBirth) {
      errorsData.dateOfBirth.push("Date of Birth can't be blank");
    }

    //gender
    errorsData.gender = [];

    //gender can't blank
    if (!state.gender) {
      errorsData.gender.push("Please select gender either male or female");
    }

    //country
    errorsData.country = [];

    //country can't blank
    if (!state.country) {
      errorsData.country.push("Please select a country");
    }

    errorsData.receiveNewsLetters = [];
    setErrors(errorsData);
  };

  //to execute the validate function when the state value is updated
  useEffect(validate, [state]);

  //executes only once - on initial render = componentDidMount
  useEffect(() => {
    document.title = "Register - eCommerce";
  }, []);

  //executes when the user clicks on Register button
  let onRegisterClick = async () => {
    //set all controls as dirty
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          fullName: state.fullName,
          dateOfBirth: state.dateOfBirth,
          gender: state.gender,
          country: state.country,
          receiveNewsLetters: state.receiveNewsLetters,
          role: "user",
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        let responseBody = await response.json();

        //dispatch calls reducer
        userContext.dispatch({
          type: "login",
          payload: {
            currentUserName: responseBody.fullName,
            currentUserId: responseBody.id,
            currentUserRole: responseBody.role,
          },
        });

        setMessage(
          <span className="text-success">Successfully Registered</span>
        );

        props.history.replace("/dashboard");
      } else {
        setMessage(
          <span className="text-danger">Errors in database connection</span>
        );
      }
    } else {
      setMessage(<span className="text-danger">Errors</span>);
    }
  };

  let isValid = () => {
    let valid = true;

    //reading all controls from 'errors'state
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }

    return valid;
  };

  return (
    <div className="row">
      <div className="col-lg-6 md-7 mx-auto">
        <div className="card border-primary shadow my-2">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "40px" }}
              className="text-primary text-center"
            >
              Register
            </h4>

            <ul className="text-danger">
              {Object.keys(errors).map((control) => {
                if (dirty[control]) {
                  return errors[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                } else {
                  return "";
                }
              })}
            </ul>
          </div>
          <div className="card-body border-bottom">
            {/* email starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="email">
                Email
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  value={state.email}
                  onChange={(event) => {
                    // let state2 = state;
                    // state2.email = event.target.value;
                    // setState(state2);
                    // do above steps or use one line below
                    setState({
                      ...state,
                      //email: event.target.value or
                      [event.target.name]: event.target.value,
                    }); //taking all the state and only updating the email
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </div>
              </div>
            </div>
            {/* email ends */}

            {/* password starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="password">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["password"] && errors["password"][0]
                    ? errors["password"]
                    : ""}
                </div>
              </div>
            </div>
            {/* passsword ends */}

            {/* fullname starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="fullName">
                Full Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  id="fullName"
                  value={state.fullName}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["fullName"] && errors["fullName"][0]
                    ? errors["fullName"]
                    : ""}
                </div>
              </div>
            </div>
            {/* FullName ends */}

            {/* dob starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="dateOfBirth">
                Date Of Birth
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={state.dateOfBirth}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["dateOfBirth"] && errors["dateOfBirth"][0]
                    ? errors["dateOfBirth"]
                    : ""}
                </div>
              </div>
            </div>
            {/* dob ends */}

            {/* gender starts */}
            <div className="form-group form-row">
              <label className="col-lg-4">Gender</label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    className="form-check-input"
                    checked={state.gender === "male" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />

                  <label className="form-check-inline" htmlFor="male">
                    Male
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    className="form-check-input"
                    checked={state.gender === "female" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                  />

                  <label className="form-check-inline" htmlFor="female">
                    Female
                  </label>
                </div>

                <div className="text-danger">
                  {dirty["gender"] && errors["gender"][0]
                    ? errors["gender"]
                    : ""}
                </div>
              </div>
            </div>
            {/* gender ends */}

            {/* country starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="country">
                Country
              </label>
              <div className="col-lg-8">
                <select
                  className="form-control"
                  name="country"
                  id="country"
                  value={state.country}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                >
                  <option value="">Please Select</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.countryName}
                    </option>
                  ))}
                </select>

                <div className="text-danger">
                  {dirty["country"] && errors["country"][0]
                    ? errors["country"]
                    : ""}
                </div>
              </div>
            </div>
            {/* country ends */}

            {/* receiveNewsLetter starts */}
            <div className="form-group form-row">
              <label className="col-lg-4"></label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="receiveNewsLetter"
                    value="true"
                    id="receiveNewsLetter"
                    className="form-check-input"
                    checked={state.receiveNewsLetter === true ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.checked,
                      });
                    }}
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />

                  <label className="form-check-inline" htmlFor="male">
                    receive News Letters
                  </label>
                </div>

                <div className="text-danger">
                  {dirty["receiveNewsLetter"] && errors["receiveNewsLetter"][0]
                    ? errors["receiveNewsLetter"]
                    : ""}
                </div>
              </div>
            </div>
            {/* receiveNewsLetter ends */}
          </div>

          {/* footer starts */}
          <div className="card-footer text-center">
            <div className="m-1">{message}</div>
            <div>
              <button className="btn btn-primary m-2" onClick={onRegisterClick}>
                Register
              </button>
            </div>
          </div>
          {/* footer ends */}
        </div>
      </div>
    </div>
  );
};

export default Register;
