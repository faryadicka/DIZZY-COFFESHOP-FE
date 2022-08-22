import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ModalWarning from "../../components/ModalWarning/ModalWarning";

// assets
import "../Profile/Profile.scoped.css";
import Pencil from "../../assets/img/pancil-2.png";
import Avatar from "../../assets/img/avatar.png";

//axios
import { getProfileAxios, updateProfileAxios } from "../../services/users";

//redux
import { getProfileRedux } from "../../redux/actionCreator/users";
import ModalForm from "../../components/ModalForm/ModalForm";

function Profile1() {
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.authData?.token);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    display: "",
    address: "",
    phone: "",
    birthdate: "",
    gender: "female",
    firstName: "",
    lastName: "",
    email: "",
    image: userData?.Image_profile,
  });
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [edit, setEdit] = useState(true);
  const [edit1, setEdit1] = useState(true);
  const [show, setShowModal] = useState(false);

  const getProfilePage = (token) => {
    getProfileAxios(token)
      .then((res) => {
        setForm({
          email: res.data.data.email,
          display: res.data.data.display_name,
          address: res.data.data.address,
          phone: res.data.data.phone,
          birthdate: res.data.data.birthdate,
          gender: res.data.data.gender,
          firstName: res.data.data.first_name,
          lastName: res.data.data.last_name,
          image: res.data.data.image_profile,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfilePage(token);
  }, []);

  useEffect(() => {
    dispatch(getProfileRedux(token));
  }, [dispatch, token]);

  const changeFileHandler = (event) => {
    event.preventDefault();
    event.preventDefault();
    const file = event.target.files[0];
    const data = { ...form };
    if (file) {
      data.image = file;
      setForm(data);
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
        setForm({ ...form, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateForm = () => {
    let body = new FormData();
    if (form.image !== "") {
      body.append("image", form.image);
    }
    if (form.display !== "") {
      body.append("display", form.display);
    }
    if (form.address !== "") {
      body.append("address", form.address);
    }
    if (form.birthdate !== "") {
      body.append("birthdate", form.birthdate);
    }
    if (form.firstName !== "") {
      body.append("firstName", form.firstName);
    }
    if (form.lastName !== "") {
      body.append("lastName", form.lastName);
    }
    if (form.gender !== "") {
      body.append("gender", form.gender);
    }
    if (form.phone !== "") {
      body.append("phone", form.phone);
    }
    return body;
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();
    const body = updateForm();
    updateProfileAxios(body, token)
      .then((res) => {
        setUpdateSuccess(true);
        setMessage({ ...message, success: res.data.message });
      })
      .catch((err) => {
        setMessage({ ...message, error: err.response?.data.message });
      });
  };
  return (
    <>
      <Navbar profile={form.image} />
      <main className="main-user mt-5">
        <div className="main-content">
          <form
            className="container form-input-profile"
            onSubmit={updateProfileHandler}
          >
            <div className="row">
              <div className="col-md-4 col-sm-4 text-white second-row-edit">
                <div className="title-profile-user">
                  <h1 className="header-profile text-white">USER PROFILE</h1>
                </div>
              </div>
            </div>
            <div className="row first-row-edit justify-content-center">
              <div className="col-10 col-lg-4">
                <div className="card p-5 text-center align-items-center edit-column-first">
                  <img
                    src={
                      userData?.image_profile && !imgPreview
                        ? userData?.image_profile
                        : userData?.image_profile && imgPreview
                        ? imgPreview
                        : !userData?.image_profile && imgPreview
                        ? imgPreview
                        : Avatar
                    }
                    className="card-img-top rounded-circle"
                    alt="profile"
                  />
                  <input
                    value=""
                    type="file"
                    name="image"
                    ref={inputFile}
                    id="image"
                    hidden
                    onChange={changeFileHandler}
                  />
                  <button
                    className="btn-edit-logo"
                    onClick={(event) => {
                      inputFile.current.click();
                      event.preventDefault();
                    }}
                  >
                    <div className="logo-circle-first rounded-circle">
                      <img
                        src={Pencil}
                        alt="edit"
                        className="edit-pencil-ava"
                      />
                    </div>
                  </button>{" "}
                  <div className="card-body">
                    <h5 className="display-name fw-bold">{form.display}</h5>
                    <p className="email-profile">{form.email}</p>
                    <p className="delivery-info mt-4">
                      Has been ordered 15 products
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-10 col-lg-8">
                <div className="card edit-column-first">
                  <div className="card-body">
                    <div className="contacts-logo-edit">
                      <div className="header-3">
                        <h3>Contacs</h3>
                      </div>
                      <div className="edit-logo">
                        <button className="btn-edit-logo" type="button">
                          <div className="logo-circle-second text-center rounded-circle">
                            <img
                              src={Pencil}
                              alt="edit"
                              className="edit-pencil-input"
                              onClick={() => {
                                setEdit(!edit);
                              }}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3 mb-lg-5 mt-lg-5">
                          <label htmlFor="email" className="form-label">
                            Email address :
                          </label>
                          <br />
                          <input
                            value={form.email}
                            name="email"
                            type="email"
                            className="form-control-profile"
                            id="email"
                            disabled
                          />
                        </div>
                        <div className="mb-lg-5">
                          <label htmlFor="address" className="form-label">
                            Delivery address :
                          </label>
                          <br />
                          <textarea
                            name="address"
                            type="text"
                            className="form-control-profile"
                            id="address"
                            value={form.address}
                            disabled={edit}
                            onChange={(event) => {
                              setForm({ ...form, address: event.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mt-3 mt-lg-5">
                          <label htmlFor="phone" className="form-label">
                            Phone number :
                          </label>
                          <br />
                          <input
                            name="phone"
                            type="text"
                            className="form-control-profile"
                            id="phone"
                            value={form.phone}
                            disabled={edit}
                            onChange={(event) => {
                              setForm({ ...form, phone: event.target.value });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-between second-row-edit">
              <div className="col-6 col-lg-8">
                <div className="card edit-column-first">
                  <div className="card-body">
                    <div className="contacts-logo-edit">
                      <div className="header-3">
                        <h3>Details</h3>
                      </div>
                      <div className="edit-logo">
                        <button className="btn-edit-logo" type="button">
                          <div className="logo-circle-second text-center rounded-circle">
                            <img
                              src={Pencil}
                              alt="edit"
                              className="edit-pencil-input"
                              onClick={() => {
                                setEdit1(!edit1);
                              }}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="mb-lg-5 mb-2">
                          <label htmlFor="display-name" className="form-label">
                            Display name :
                          </label>
                          <br />
                          <input
                            name="display"
                            type="text"
                            className="form-control-profile"
                            id="display-name"
                            value={form.display}
                            disabled={edit1}
                            onChange={(event) => {
                              setForm({ ...form, display: event.target.value });
                            }}
                          />
                        </div>
                        <div className="mb-lg-5 mb-2">
                          <label htmlFor="first-name" className="form-label">
                            First name :
                          </label>
                          <br />
                          <input
                            name="firstname"
                            type="text"
                            className="form-control-profile"
                            id="first-name"
                            value={form.firstName}
                            disabled={edit1}
                            onChange={(event) => {
                              setForm({
                                ...form,
                                firstName: event.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="mb-lg-5 mb-2">
                          <label htmlFor="last-name" className="form-label">
                            Last name :
                          </label>
                          <br />
                          <input
                            name="lastname"
                            type="text"
                            className="form-control-profile"
                            id="last-name"
                            value={form.lastName}
                            disabled={edit1}
                            onChange={(event) => {
                              setForm({
                                ...form,
                                lastName: event.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4 mb-lg-5 mb-2">
                        <div className="mb-lg-5 mb-2">
                          <label htmlFor="birthdate" className="form-label">
                            DD/MM/YY :
                          </label>
                          <input
                            name="birthdate"
                            type="date"
                            className="form-control-profile"
                            id="birthdate"
                            value={form.birthdate}
                            disabled={edit1}
                            onChange={(event) => {
                              setForm({
                                ...form,
                                birthdate: event.target.value,
                              });
                            }}
                          />
                        </div>
                        <form>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              checked={form.gender === "male"}
                              disabled={edit1}
                              onChange={(event) => {
                                setForm({
                                  ...form,
                                  gender: event.target.value,
                                });
                              }}
                            />
                            <label className="form-check-label" htmlFor="male">
                              Male
                            </label>
                          </div>
                          <div className="form-check mt-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"
                              checked={form.gender === "female"}
                              disabled={edit1}
                              onChange={(event) => {
                                setForm({
                                  ...form,
                                  gender: event.target.value,
                                });
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="female"
                            >
                              Female
                            </label>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-4">
                <p className="question-edit fw-bold text-white text-center">
                  Do you want to save the <br /> changes?
                </p>
                <div className=" d-flex flex-column gap-3">
                  <button type="submit" className="btn-footer btn-choco">
                    Save Changes
                  </button>
                  <button type="button" className="btn-footer btn-yellow">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    type="button"
                    className="btn-footer btn-light text-start text-decoration-none d-flex align-items-center justify-content-between"
                  >
                    {" "}
                    <p className="fw-bold mt-2">Edit Password</p>
                    <FaChevronRight />
                  </button>
                  <button
                    type="button"
                    className="btn-footer btn-light text-start text-decoration-none d-flex align-items-center justify-content-between"
                  >
                    {" "}
                    <p className="fw-bold mt-2">Logout</p>
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <ModalWarning
        success={updateSuccess}
        showModal={updateSuccess}
        message={updateSuccess ? message.success : message.error}
        hideModal={() => {
          setUpdateSuccess(false);
        }}
      />
      <ModalForm
        showModal={show}
        hideModal={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}

export default Profile1;
