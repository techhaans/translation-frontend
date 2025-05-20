import React, { useState } from "react";
import styles from "./ContactUs.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ContactUs = () => {
    const [successMessage, setSuccessMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            description: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required."),
            email: Yup.string()
                .email("Please enter a valid email.")
                .required("Email is required."),
            phone: Yup.string()
                .required("Phone number is required.")
                .matches(/^[0-9]+$/, "Phone number must be digits only.")
                .length(10, "Phone number must be 10 digits."),
            description: Yup.string().required("Please describe your query."),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post("http://localhost/contactus", values);
                if (!response.status === 200) {
                    setSuccessMessage("Thank you for contacting us. Our team will reach out to you shortly.");
                    resetForm();
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setSuccessMessage("Something went wrong. Please try again later.");
            }
        },
    });

    return (
        <div className={styles.ContactUs}>
            <div className={styles.centerContent}>
                <form onSubmit={formik.handleSubmit}>
                    {successMessage && (
                        <div className={styles.successMessage}>{successMessage}</div>
                    )}

                    <div className={styles.heading}>Submit your details for any queries.</div>

                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        id='fullName'
                        name='fullName'
                        type='text'
                        placeholder='Enter Your full Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className={styles.error}>{formik.errors.fullName}</div>
                    )}

                    <label htmlFor='email'>E-mail Address</label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Enter Your Email Address'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.error}>{formik.errors.email}</div>
                    )}

                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        id='phone'
                        name='phone'
                        type='text'
                        placeholder='Enter Your Phone no.'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className={styles.error}>{formik.errors.phone}</div>
                    )}

                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        name='description'
                        placeholder='Write about your query.'
                        rows='4'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className={styles.error}>{formik.errors.description}</div>
                    )}

                    <button type='submit' className={styles.submitBtn}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
