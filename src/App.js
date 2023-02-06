import "./App.css";
import Steps from "./Components/Steps";
import PersonalInfo from "./Components/PersonalInfo";
import SelectPlan from "./Components/SelectPlan";
import AddOns from "./Components/AddOns";
import Summary from "./Components/Summary";
import Thanks from "./Components/Thanks";
import { useEffect, useState } from "react";
import * as yup from "yup";

const phoneRegExp = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(phoneRegExp, "Must be valid BD number"),
});

const nameSchema = yup.object({
  name: yup.string().required("Name is required"),
});

const phoneSchema = yup.object({
  phone: yup
    .string()
    .required("Phone is required")
    .matches(phoneRegExp, "Must be valid BD number"),
});

const emailSchema = yup.object({
  email: yup.string().email().required("Email is required"),
});

function App() {
  const [index, setIndex] = useState(0);

  // PERSONAL INFO STATES

  const [formValues, setFormValues] = useState({name: '',
  email: '',
  password: ''});
  const [formErrors, setFormErrors] = useState({});
  // DISPLAY STATES
  const [personalDetails, setPersonalDetails] = useState(true);
  const [plan, setPlan] = useState(false);
  const [addOn, setAddOn] = useState(false);
  const [summary, setSummary] = useState(false);
  const [thanks, setThanks] = useState(false);

  const runValidation = async (e) => {
    if (e.target.name === "name") {
      await nameSchema
        .validate({ [e.target.name]: e.target.value }, { abortEarly: false })
        .then(() => {
          setFormErrors({ ...formErrors, [e.target.name]: "" });
        })
        .catch((err) => {
          setFormErrors({
            ...formErrors,
            [e.target.name]: err.errors[err.errors.indexOf("Name is required")],
          });
        });
    } else if (e.target.name === "email") {
      await emailSchema
        .validate({ [e.target.name]: e.target.value }, { abortEarly: false })
        .then(() => {
          setFormErrors({ ...formErrors, [e.target.name]: "" });
        })
        .catch((err) => {
          setFormErrors({
            ...formErrors,
            [e.target.name]:
              err.errors[err.errors.indexOf("Email is required")] ||
              err.errors[err.errors.indexOf("email must be a valid email")],
          });
        });
    } else if (e.target.name === "phone") {
      await phoneSchema
        .validate({ [e.target.name]: e.target.value }, { abortEarly: false })
        .then(() => {
          setFormErrors({ ...formErrors, [e.target.name]: "" });
        })
        .catch((err) => {
          setFormErrors({
            ...formErrors,
            [e.target.name]:
              err.errors[err.errors.indexOf("Phone is required")] ||
              err.errors[err.errors.indexOf("Must be valid BD number")],
          });
        });
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    if (e.target.name === "name") {
      runValidation(e);
    } else if (e.target.name === "email") {
      runValidation(e);
    } else if (e.target.name === "phone") {
      runValidation(e);
    }
  };

  const validateAll = async () => {
    await validationSchema
      .validate(formValues, { abortEarly: false })

      .then(() => {
        setFormErrors({ ...formErrors, name: "", email: "", phone: "" });
        setIndex(index + 1);
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          name: err.errors[err.errors.indexOf("Name is required")],
          email:
            err.errors[err.errors.indexOf("Email is required")] ||
            err.errors[err.errors.indexOf("email must be a valid email")],
          phone:
            err.errors[err.errors.indexOf("Phone is required")] ||
            err.errors[err.errors.indexOf("Must be valid BD number")],
        });
      });
  };

  const handleSubmit = () => {
    validateAll();
  };

  const swithSteps = () => {
    switch (index) {
      case 1:
        setPersonalDetails(false);
        setPlan(true);
        setAddOn(false);
        setSummary(false);
        setThanks(false);
        break;
      case 2:
        setPersonalDetails(false);
        setPlan(false);
        setAddOn(true);
        setSummary(false);
        setThanks(false);
        break;
      case 3:
        setPersonalDetails(false);
        setPlan(false);
        setAddOn(false);
        setSummary(true);
        setThanks(false);
        break;
      case 4:
        setPersonalDetails(false);
        setPlan(false);
        setAddOn(false);
        setSummary(false);
        setThanks(true);
        break;
      default:
        setPersonalDetails(true);
        setPlan(false);
        setAddOn(false);
        setSummary(false);
        setThanks(false);
        break;
    }
  };

  useEffect(() => {
    swithSteps();
  });

  return (
    <div className="App">
      <Steps currentStep={index} />
      <article className="displays">
        {personalDetails && (
          <PersonalInfo
            validateAll={validateAll}
            runValidation={runValidation}
            handleSubmit={handleSubmit}
            formValues={formValues}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
          />
        )}
        {plan && <SelectPlan />}
        {addOn && <AddOns />}
        {summary && <Summary gotoPlan={() => setIndex(1)} />}
        {thanks && <Thanks />}
      </article>

      <section className={`next-and-back ${index > 3 && "hide-next-and-back"}`}>
        <button
          className={`back-btn ${index === 0 && "hide-back-btn"}`}
          onClick={() => setIndex(index - 1)}
        >
          Go Back
        </button>
        <button
          className={`next-btn ${index > 2 && "change-next-btn"}`}
          onClick={handleSubmit}
        >
          {`${index > 2 ? "Confirm" : "Next Step"}`}
        </button>
      </section>
    </div>
  );
}

export default App;
