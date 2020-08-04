import React, { Component } from 'react';
import './OpinionForm.css';
import { Formik } from 'formik';

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
  let hash = await crypto.subtle.digest('SHA-256', data);
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="yourName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.yourName}
              />
              {errors.yourName && touched.yourName && errors.yourName}
              <input
                type="text"
                name="emailAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailAddress}
              />
              {errors.emailAddress && touched.emailAddress && errors.emailAddress}
              <input
                type="text"
                name="profession"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.profession}
              />
              {errors.profession && touched.profession && errors.profession}
              <select
                name="source"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.profession}
              >
                <option value="github">GitHub</option>
                <option value="social_media">Social Media</option>
                <option value="internet_search">Internet Search</option>
                <option value="friends">Friends</option>
                <option value="email">Email</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="siteOpinion"
                cols="30"
                rows="10"
                placeholder="Write here..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.siteOpinion}
              ></textarea>
              {errors.siteOpinion && touched.siteOpinion && errors.siteOpinion}
              <textarea
                name="reactOpinion"
                cols="30"
                rows="10"
                placeholder="Write here..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reactOpinion}
              ></textarea>
              {errors.reactOpinion && touched.reactOpinion && errors.reactOpinion}
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
          );
        }}
      </Formik>
    );
    let msg = this.state.submitted ? <h1>Feedback submitted!</h1> : null

    return (
      <div className="OpinionForm">
        <h1>This is the form content</h1>
        {formik}
        {msg}
      </div>
    );
  }

  notifySubmission = () => {
    this.setState({
      submitted: true
    });
  }
};
