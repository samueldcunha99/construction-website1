import React from "react";

function HeroVideo({ videoSrc, posterSrc, title, subtitle }) {
  return (
    <section className="heroVideo" aria-label="Hero">
      <video
        className="heroVideo__video"
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
      >
        {videoSrc ? <source src={videoSrc} type="video/mp4" /> : null}
      </video>

      <div className="heroVideo__overlay">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default HeroVideo;

