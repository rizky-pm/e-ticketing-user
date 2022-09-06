import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import 'moment/locale/id';

import FileUploader from './FileUploader';

const initialValues = {
  fullName: '',
  email: '',
  titleReport: '',
  descriptionReport: '',
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("This field can't be empty"),
  email: Yup.string()
    .email('Invalid email format')
    .required("This field can't be empty"),
  titleReport: Yup.string().required("This field can't be empty"),
  descriptionReport: Yup.string().required("This field can't be empty"),
});

const FormReport = () => {
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [file, setFile] = useState([]);
  const [base64, setBase64] = useState(null);

  console.log(attachment);

  const onSubmit = async (values, actions, resetForm) => {
    actions(false);
    setLoading(true);

    console.log(moment().format('dddd, Do MMMM YYYY - HH:mm:ss'));

    axios
      .post('http://localhost:3001/report/', {
        fullName: values.fullName,
        email: values.email,
        titleReport: values.titleReport,
        descriptionReport: values.descriptionReport,
        date: moment().format('dddd, Do MMMM YYYY - HH:mm:ss'),
        status: 'pending',
        attachment: attachment,
        comments: [],
      })
      .then((res) => {
        resetForm();
        setLoading(false);
        console.log(res);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        resetForm();
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className='w-1/2'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <Form
              className='flex flex-col space-y-4'
              method='post'
              encType='multipart/form-data'
            >
              <div className='flex flex-col'>
                <label htmlFor='fullName' className='mb-1'>
                  Full Name
                </label>
                <Field
                  type='text'
                  id='fullName'
                  name='fullName'
                  autoComplete='off'
                  className='input-field basic-transition'
                />
                <ErrorMessage
                  name='fullName'
                  component='span'
                  className='text-error'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='email' className='mb-1'>
                  Email Address
                </label>
                <Field
                  type='text'
                  id='email'
                  name='email'
                  autoComplete='off'
                  className='input-field basic-transition'
                />
                <ErrorMessage
                  name='email'
                  component='span'
                  className='text-error'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='titleReport' className='mb-1'>
                  Title
                </label>
                <Field
                  type='text'
                  id='titleReport'
                  name='titleReport'
                  autoComplete='off'
                  className='input-field basic-transition'
                />
                <ErrorMessage
                  name='titleReport'
                  component='span'
                  className='text-error'
                />
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='descriptionReport'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
                >
                  Describe your problem
                </label>

                <Field
                  name='descriptionReport'
                  as={'textarea'}
                  id='descriptionReport'
                  rows='4'
                  className='input-field basic-transition'
                  placeholder='Your message...'
                />

                <ErrorMessage
                  name='descriptionReport'
                  component='span'
                  className='text-error'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='attachment' className='mb-1'>
                  Attachment
                </label>
                <FileUploader
                  attachment={attachment}
                  setAttachment={setAttachment}
                  type='attachment'
                  setFiles={setFile}
                  setBase64={setBase64}
                />
              </div>

              <button
                type='button'
                className={`h-12 flex justify-center items-center bg-green-800 basic-transition text-white`}
                onClick={() => {
                  onSubmit(
                    formik.values,
                    formik.setSubmitting,
                    formik.resetForm
                  );
                }}
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormReport;
