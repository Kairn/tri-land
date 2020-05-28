import React from 'react';
import './OpinionForm.css';
import { Formik } from 'formik';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const requiredError = (field) => `${field} is required`;

export default function OpinionForm() {
  return (
    <div className="OpinionForm">
      <h1>This is the form content</h1>
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
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values, null, 2));
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
    </div>
  );
};
