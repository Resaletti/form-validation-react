import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./Form.css";

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const spinner = <div className="spinner"></div>;

  // Validação async simulada
  const checkEmail = async (email) => {
    await new Promise((res) => setTimeout(res, 800));

    if (email === "test@test.com") {
      return "Email already in use";
    }

    return true;
  };

  const validate = async () => {
    let newErrors = {};

    if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    } else {
      const emailCheck = await checkEmail(form.email);
      if (emailCheck !== true) {
        newErrors.email = emailCheck;
      }
    }

    if (form.message.length < 10) {
      newErrors.message = "Message too short";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = await validate();

if (!isValid) {
  setLoading(false);
  return;
}

try {
  await emailjs.send(
    "renatosaletti76",
    "template_gvaycdg",
    {
      name: form.name,
      email: form.email,
      message: form.message,
    },
    "DqMiCsxD96SMjdPRU"
  );

  setSuccess(true);
  setForm({ name: "", email: "", message: "" });

  setTimeout(() => setSuccess(false), 3000);

} catch (error) {
  console.error(error);
  setSuccess(false);
}

setLoading(false);

try {
  await emailjs.send(
    "renatosaletti76",
    "template_gvaycdg",
    {
      name: form.name,
      email: form.email,
      message: form.message,
    },
    "DqMiCsxD96SMjdPRU"
  );

  setSuccess(true);
  setForm({ name: "", email: "", message: "" });

  setTimeout(() => setSuccess(false), 3000);

} catch (error) {
  console.error("EMAIL ERROR:", error);
  alert(error.text || "Error sending message");
}

setLoading(false);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <h2 className="title">Let’s Work Together</h2>
      <p className="subtitle">Tell me about your project — I’ll get back to you.</p>

{success && (
  <div className="success">
    Message sent successfully 🚀
  </div>
)}

      {["name", "email", "message"].map((field) => (
        <div key={field} className="form-group">

          <label>{field.toUpperCase()}</label>

          <motion.div
            animate={errors[field] ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
           {field === "message" ? (
  <textarea
    className={errors[field] ? "input error-border" : "input"}
    value={form[field]}
    onChange={(e) =>
      setForm({ ...form, [field]: e.target.value })
    }
  />
) : (
  <input
    type={field}
    className={errors[field] ? "input error-border" : "input"}
    value={form[field]}
    onChange={(e) =>
      setForm({ ...form, [field]: e.target.value })
    }
  />
)}
          </motion.div>

          <span className="error">{errors[field]}</span>

        </div>
      ))}

      <button disabled={loading}>
        {loading ? spinner : "Send Message 🚀"}
      </button>

    </form>
  );
}