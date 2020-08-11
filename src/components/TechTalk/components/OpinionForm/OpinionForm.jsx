import React, { Component } from 'react';
import './OpinionForm.css';
import { Formik } from 'formik';
import sha256 from 'crypto-js/sha256';

import suIcon from '../../../../assets/submit.svg';

// Firebase setup
import * as firebase from 'firebase/app';
import 'firebase/database';

const FB_CONFIG = {
  apiKey: process.env.TL_API_KEY,
  authDomain: 'tri-land-tech.firebaseapp.com',
  databaseURL: 'https://tri-land-tech.firebaseio.com',
  storageBucket: 'tri-land-tech.appspot.com'
};

firebase.initializeApp(FB_CONFIG);
const database = firebase.database();

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const requiredError = (field) => `${field} is required`;

// Write operation
const writeToFB = async function(email, name, source, profession, siteOpinion, reactOpinion) {
  // Get hash ID from email
  let encoder = new TextEncoder();
  let data = encoder.encode(email);
  // let hash = await crypto.subtle.digest('SHA-256', data);
  let hash = sha256(data).words;
  let hashArr = Array.from(new Uint8Array(hash)).slice(0, 12);
  const hashId = hashArr.map((byte) => {
    return byte.toString(16).padStart(2, '0');
  }).join('');

  // Send data
  database.ref(`comments/user-${hashId}`).set({
    name,
    email,
    source,
    profession,
    siteOpinion,
    reactOpinion
  });
}

export default class OpinionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  componentDidUpdate() {
    if (this.state.submitted) {
      setTimeout(() => {
        this.setState({
          submitted: false
        });
      }, 3000);
    }
  }

  render() {
    let formik = (
      <Formik
        initialValues={{
          yourName: '',
          emailAddress: '',
          source: 'github',
          profession: '',
          siteOpinion: '',
          reactOpinion: ''
        }}
        validate={(values) => {
          const errors = {};
          // Validation logic
          if (!values.yourName) {
            errors.yourName = requiredError('Your name');
          }
          if (!values.emailAddress) {
            errors.emailAddress = requiredError('Email address');
          } else if (!emailRegex.test(values.emailAddress)) {
            errors.emailAddress = 'Invalid email address';
          }
          if (!values.profession) {
            errors.profession = requiredError('Profession');
          }
          if (!values.siteOpinion) {
            errors.siteOpinion = requiredError('Site opinion');
          }
          if (!values.reactOpinion) {
            errors.reactOpinion = requiredError('React opinion');
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          // Submission logic
          // console.log(JSON.stringify(values, null, 2));
          await writeToFB(values.emailAddress, values.yourName, values.source, values.profession, values.siteOpinion, values.reactOpinion);
          // Reset form
          actions.resetForm({
            values: ''
          });
          this.notifySubmission();
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <form id="tt-form" onSubmit={handleSubmit}>
              <div id="tt-form-sect">
                <div className="input-wrapper">
                  <label htmlFor="yourName"><span>*</span> Your Name</label>
                  <input
                    type="text"
                    name="yourName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.yourName}
                  />
                  <div className="tt-error">
                    {errors.yourName && touched.yourName && errors.yourName}
                  </div>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="emailAddress"><span>*</span> Email Address</label>
                  <input
                    type="text"
                    name="emailAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emailAddress}
                  />
                  <div className="tt-error">
                    {errors.emailAddress && touched.emailAddress && errors.emailAddress}
                  </div>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="profession"><span>*</span> Your Profession</label>
                  <input
                    type="text"
                    name="profession"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profession}
                  />
                  <div className="tt-error">
                    {errors.profession && touched.profession && errors.profession}
                  </div>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="source"><span>*</span> Source of Knowledge</label>
                  <select
                    name="source"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.source}
                  >
                    <option value="github">GitHub</option>
                    <option value="social_media">Social Media</option>
                    <option value="internet_search">Internet Search</option>
                    <option value="friends">Friends</option>
                    <option value="email">Email</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="text-wrapper">
                  <label htmlFor="siteOpinion"><span>*</span> Feedback for This Site</label>
                  <textarea
                    name="siteOpinion"
                    cols="30"
                    rows="8"
                    placeholder="Write here..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.siteOpinion}
                  ></textarea>
                  <div className="tt-error">
                    {errors.siteOpinion && touched.siteOpinion && errors.siteOpinion}
                  </div>
                </div>
                <div className="text-wrapper">
                  <label htmlFor="reactOpinion"><span>*</span> Comments for Using React</label>
                  <textarea
                    name="reactOpinion"
                    cols="30"
                    rows="8"
                    placeholder="Write here..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reactOpinion}
                  ></textarea>
                  <div className="tt-error">
                    {errors.reactOpinion && touched.reactOpinion && errors.reactOpinion}
                  </div>
                </div>
              </div>
              <div id="tt-form-act">
                <button type="submit" disabled={isSubmitting}>Submit</button>
              </div>
            </form>
          );
        }}
      </Formik>
    );
    let msg = this.state.submitted;
    // let msg = true;
    let msgBox = (
      <div id="msg-box" className={msg ? "" : "not-vis"}>
        <div id="inner-msg">
          <img src={suIcon} alt="submit" />
          <span>Feedback Submitted!</span>
        </div>
      </div>
    );

    return (
      <div className="OpinionForm">
        {formik}
        {msgBox}
      </div>
    );
  }

  notifySubmission = () => {
    this.setState({
      submitted: true
    });
  }
};
