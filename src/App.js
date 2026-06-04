import "./App.css";
import CountUp from "react-countup";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaHardHat,
  FaTools,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import WhatsAppButton from "./whatsapp";

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !phone || !message) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const response = await fetch(
        "https://constructionbackend-website1.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, message }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Failed to save inquiry");
        return;
      }

      await emailjs.send(
        "service_80luq2z",
        "template_n70v38h",
        { name, email, phone, message },
        "I5sGRL9lxCLIC5f5z"
      );

      alert("Inquiry Submitted Successfully!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const reveal = {
    hidden: { opacity: 0, y: 70 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <nav className="navbar">
        <h2>NMS ENTERPRISES</h2>

        <ul>
          <li><a href="#about">Company</a></li>
          <li><a href="#services">Capabilities</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Inquire</a></li>
        </ul>
      </nav>

      <section className="hero heroVideo">
        <video
          className="heroVideo__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        >
          <source src="/constructiontest.mp4" type="video/mp4" />
        </video>

        <div className="heroShade"></div>

        <div className="overlay">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Construction • Interiors • Site Management
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            Engineering Spaces.
            <br />
            Building Legacies.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
          >
            NMS Enterprises delivers modern construction solutions with precision,
            accountability, and long-term value.
          </motion.p>

          <motion.div
            className="heroActions"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <a href="#contact" className="primaryBtn">
              Start a Project <FaArrowRight />
            </a>
            <a href="#projects" className="secondaryBtn">
              View Work
            </a>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="about"
        className="section splitSection"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <div>
          <span className="sectionTag">Company</span>
          <h2>Built on discipline, delivered with precision.</h2>
        </div>

        <div>
          <p>
            NMS ENTERPRISES specializes in residential, commercial and industrial
            construction. From planning to execution, we manage every stage with
            a focus on quality, safety, timelines and client trust.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="section"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <span className="sectionTag">Capabilities</span>
        <h2>Integrated execution for modern projects.</h2>

        <div className="serviceList">
          <motion.div className="serviceRow" whileHover={{ x: 12 }}>
            <span>01</span>
            <FaBuilding />
            <h3>Building Construction</h3>
            <p>Residential, commercial and industrial project execution.</p>
          </motion.div>

          <motion.div className="serviceRow" whileHover={{ x: 12 }}>
            <span>02</span>
            <FaTools />
            <h3>Interior Work</h3>
            <p>Premium interiors, finishing, renovation and space upgrades.</p>
          </motion.div>

          <motion.div className="serviceRow" whileHover={{ x: 12 }}>
            <span>03</span>
            <FaHardHat />
            <h3>Site Management</h3>
            <p>Planning, supervision, coordination and on-site quality control.</p>
          </motion.div>
        </div>
      </motion.section>

      <section className="stats">
        <div>
          <h2><CountUp end={150} duration={4} />+</h2>
          <p>Projects Delivered</p>
        </div>

        <div>
          <h2><CountUp end={50} duration={4} />+</h2>
          <p>Engineers & Specialists</p>
        </div>

        <div>
          <h2><CountUp end={20} duration={4} />+</h2>
          <p>Years Experience</p>
        </div>
      </section>

      <motion.section
        id="projects"
        className="section"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <span className="sectionTag">Selected Work</span>
        <h2>Projects shaped by function, form and durability.</h2>

        <div className="projectGrid">
          <div className="featureProject largeProject">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" alt="Construction Project" />
            <div>
              <span>Mumbai</span>
              <h3>Luxury Residential Development</h3>
            </div>
          </div>

          <div className="featureProject">
            <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2" alt="Office Project" />
            <div>
              <span>Pune</span>
              <h3>Corporate Office Buildout</h3>
            </div>
          </div>

          <div className="featureProject">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e" alt="Construction Site" />
            <div>
              <span>Navi Mumbai</span>
              <h3>Commercial Site Management</h3>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section statement"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <h2>
          We combine field expertise with structured project control to deliver
          spaces that perform for decades.
        </h2>
      </motion.section>

      <motion.section
        id="contact"
        className="section contactSection"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <div>
          <span className="sectionTag">Project Inquiry</span>
          <h2>Let’s discuss your next build.</h2>
          <p>
            Share your requirement and our team will contact you with the next
            steps for quotation and project planning.
          </p>

          <div className="contactInfo">
            <p><FaPhone /> +91 9876543210</p>
            <p><FaEnvelope /> info@buildmaster.com</p>
            <p><FaMapMarkerAlt /> Mumbai, India</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="phone"
            placeholder="Phone (10 digits)"
            inputMode="numeric"
            maxLength="10"
            required
          />
          <textarea name="message" placeholder="Project / Quotation Details" rows="5" required />
          <button type="submit">
            Send Inquiry <FaArrowRight />
          </button>
        </form>
      </motion.section>

      <section>
        <iframe
          title="map"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Mumbai&z=13&output=embed"
          allowFullScreen
        ></iframe>
      </section>

      <WhatsAppButton />

      <footer className="footer">
        <h3>NMS ENTERPRISES</h3>
        <p>Construction • Interiors • Site Management</p>
        <p><FaMapMarkerAlt /> Mumbai, India</p>
      </footer>
    </div>
  );
}

export default App;