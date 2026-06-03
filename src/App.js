import "./App.css";
import CountUp from "react-countup";
import {
  FaBuilding,
  FaHardHat,
  FaTools,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const response = await fetch(
        "https://constructionbackend-website1.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        e.target.reset();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Backend Connection Failed");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2>NMS ENTERPRISES</h2>

        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
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

        <div className="overlay">
          <h1>Building Excellence For more than 100 years</h1>
          <p>Modern Construction Solutions Trusted by millions</p>
        </div>
      </section>

      <section id="about" className="section">
        <h2>About Us</h2>
        <p>
          NMS ENTERPRISES specializes in residential, commercial and industrial
          projects with over 20 years of experience.
        </p>
      </section>

      <section id="services" className="section">
        <h2>Our Services</h2>

        <div className="cards">
          <div className="card">
            <FaBuilding size={40} />
            <h3>Building Construction</h3>
          </div>

          <div className="card">
            <FaTools size={40} />
            <h3>Interior Work</h3>
          </div>

          <div className="card">
            <FaHardHat size={40} />
            <h3>Site Management</h3>
          </div>
        </div>
      </section>

      <section className="stats">
        <div>
          <h2><CountUp end={150} duration={4} />+</h2>
          <p>Projects</p>
        </div>

        <div>
          <h2><CountUp end={50} duration={4} />+</h2>
          <p>Engineers</p>
        </div>

        <div>
          <h2><CountUp end={20} duration={4} />+</h2>
          <p>Years Experience</p>
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Project Gallery</h2>

        <div className="gallery">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" alt="Construction Project" />
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2" alt="Office Project" />
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e" alt="Construction Site" />
          <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2" alt="Interior Project" />
          <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858" alt="Interior Work" />
          <img src="https://images.unsplash.com/photo-1460317442991-0ec209397118" alt="Building Project" />
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <input name="name" placeholder="Name" required />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <input
            name="phone"
            placeholder="Phone (10 digits)"
            inputMode="numeric"
            maxLength="10"
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </section>

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

        <p><FaPhone /> +91 9876543210</p>
        <p><FaEnvelope /> info@buildmaster.com</p>
        <p><FaMapMarkerAlt /> Mumbai, India</p>
      </footer>
    </div>
  );
}

export default App;