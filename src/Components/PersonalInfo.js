import React from "react" 

const PersonalInfo = ({
  handleInputChange,
  formErrors,
  runValidation,
  formValues
}) => {

   
  return (
    <div className='personal-info-container'>
      <h2 className='personal-info-header'>Personal info</h2>
      <p className='info'>
        Please provide your name, email address, and phone number
      </p>
      
      <article className='label-and-error'>
        <label htmlFor='name'>Name</label>
        <p style={{ fontSize: "12px", color: "red", marginTop: "2px" }}>
            {formErrors?.name}
          </p>
      </article>
      <input
        type='text'
        name='name'
        id='name'
        placeholder='e.g. Stephen King'
        onChange={handleInputChange}
        onBlur={runValidation}
        value={formValues.name}
      />


      <article className='label-and-error'>
        <label htmlFor='email'>Email Address</label>
        <p style={{ fontSize: "12px", color: "red", marginTop: "2px" }}>
            {formErrors?.email}
          </p>
      </article>
      <input
        type='email'
        name='email'
        id='email'
        placeholder='e.g. stephenking@lorem.com'
        onChange={handleInputChange}
        onBlur={runValidation}
        value={formValues.email}
      />
      <article className='label-and-error'>
        <label htmlFor='tel'>Phone Number</label>
        <p style={{ fontSize: "12px", color: "red", marginTop: "2px" }}>
            {formErrors?.phone}
          </p>
      </article>
      <input
        type='tel'
        name='phone'
        id='tel'
        placeholder='e.g. +1 234 567 890'
        onChange={handleInputChange}
        onBlur={runValidation}
        value={formValues.phone}
      />
    </div>
  )
}

export default PersonalInfo
