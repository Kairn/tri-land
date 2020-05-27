import React from 'react';
import './OpinionForm.css';
import { Formik } from 'formik';

export default function OpinionForm() {
  return (
    <div className="OpinionForm">
      <h1>This is the form content</h1>
      <Formik
        initialValues={{
          yourName: '',
          emailAddress: '',
          source: 'GitHub',
          profession: '',
          siteOpinion: '',
          reactOpinion: ''
        }}
        validate={(values) => {
          const errors = {};
          // Validation logic
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
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
