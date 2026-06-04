import { useState } from "react";
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
  FaExternalLinkAlt,
} from "react-icons/fa";
import WhatsAppButton from "./whatsapp";

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => setNotice(null), 4200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !phone || !message) {
      showNotice("error", "Please fill all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotice("error", "Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showNotice("error", "Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

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
        showNotice("error", data.error || "Failed to save inquiry.");
        return;
      }

      emailjs
        .send(
          "service_80luq2z",
          "template_n70v38h",
          { name, email, phone, message },
          "I5sGRL9lxCLIC5f5z"
        )
        .catch((error) => {
          console.error("EmailJS failed:", error);
        });

      showNotice("success", "Inquiry submitted successfully. We will contact you shortly.");
      e.target.reset();
    } catch (error) {
      console.error(error);
      showNotice("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reveal = {
    hidden: { opacity: 0, y: 70 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {notice && (
        <motion.div
          className={`toast notice--${notice.type}`}
          initial={{ opacity: 0, y: -18, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ duration: 0.25 }}
          role="alert"
        >
          <span>{notice.type === "success" ? "Success" : "Action needed"}</span>
          <p>{notice.message}</p>
        </motion.div>
      )}      <nav className="navbar">
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
            Construction - Interiors - Site Management
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

        <motion.div
          className="signatureProject"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="signatureMedia">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=92"
              alt="NMS One 27 elevation"
            />
            <div className="signatureBadge">Featured Residential Tower</div>
          </div>

          <div className="signatureContent">
            <span className="sectionTag">NMS One 27 / Kharghar</span>
            <h3>Vertical living shaped around privacy, amenities and city access.</h3>
            <p>
              A made-for-modern-family residential address in Sector 27, Kharghar,
              imagined with efficient 2 and 3 BHK homes, an elevated amenity deck,
              and a refined arrival experience.
            </p>

            <div className="projectFacts">
              <div><strong>44</strong><span>Residences</span></div>
              <div><strong>1</strong><span>Tower</span></div>
              <div><strong>Dec 2027</strong><span>Possession</span></div>
              <div><strong>2 & 3 BHK</strong><span>Homes</span></div>
            </div>

            <div className="projectNotes">
              <span>RERA: P52000034056</span>
              <span>Rs. 1.08 Cr - Rs. 1.56 Cr</span>
              <span>Infinity pool, clubhouse, security, open spaces</span>
            </div>

            <a
              href="https://www.magicbricks.com/nms-one-27-kharghar-navi-mumbai-pdpid-4d4235333932313431"
              target="_blank"
              rel="noreferrer"
              className="projectLink"
            >
              Open Project <FaExternalLinkAlt />
            </a>
          </div>
        </motion.div>

        <div className="projectGrid">
          <a
            className="featureProject largeProject"
            href="https://www.magicbricks.com/nms-one-27-kharghar-navi-mumbai-pdpid-4d4235333932313431"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2400&q=92" alt="NMS One 27 tower view" />
            <div>
              <span>Kharghar / Residential</span>
              <h3>NMS One 27 Residences</h3>
              <p>2 and 3 BHK homes, 44 residences, possession planned for Dec 2027.</p>
            </div>
          </a>

          <a
            className="featureProject"
            href="https://www.magicbricks.com/shree-ambica-heritage-kharghar-navi-mumbai-pdpid-4d4235313034303339"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=92" alt="Shree Ambica Heritage" />
            <div>
              <span>Kharghar / Ready To Move</span>
              <h3>Shree Ambica Heritage</h3>
              <p>Two-tower residential address with 2 BHK homes near Kharghar station.</p>
            </div>
          </a>

          <a
            className="featureProject"
            href="https://www.magicbricks.com/nms-titanium-cbd-belapur-navi-mumbai-pdpid-4d4235323133363237"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=92" alt="NMS Titanium commercial tower" />
            <div>
              <span>CBD Belapur / Commercial</span>
              <h3>NMS Titanium</h3>
              <p>Ready-to-move commercial tower in the Belapur business district.</p>
            </div>
          </a>
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
          <h2>Let's discuss your next build.</h2>
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Inquiry"} <FaArrowRight />
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
        <p>Construction - Interiors - Site Management</p>
        <p><FaMapMarkerAlt /> Mumbai, India</p>
      </footer>
    </div>
  );
}

export default App;