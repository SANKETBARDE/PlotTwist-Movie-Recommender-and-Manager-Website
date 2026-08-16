import React from 'react';

export default function About() {
    return (
        <section id="about-us" className="container my-5">
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h2 className="about-title">About Us</h2>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col-lg-6 mb-4">
                    <div className="glass-panel h-100 d-flex align-items-center justify-content-center p-3">
                        <img src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1931"
                            className="img-fluid rounded about-image w-100" style={{ border: 'none' }} alt="Cinema seats" />
                    </div>
                </div>
                <div className="col-lg-6 mb-4">
                    <div className="glass-panel h-100">
                        <h3 className="text-yellow mb-3">Our Mission</h3>
                        <p>
                            At PlotTwist, our core mission is simple: to make sure you never forget a movie you wanted to
                            watch.
                            We all know the frustration of scrolling through endless titles, trying to remember that one
                            film
                            you saw a trailer for weeks ago.
                            PlotTwist is built to be your personal cinematic memory—a place where every intriguing discovery
                            is
                            saved instantly to your wishlist, ready for your next movie night.
                        </p>
                        <p>
                            By combining smart discovery with an effortless wishlist system, we ensure that the films which
                            spark your interest today are the ones you enjoy tomorrow.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row mt-5 justify-content-center">
                <div className="col-12 text-center mb-4">
                    <h3>Meet the Creator</h3>
                </div>
                <div className="col-md-8 col-lg-6 mb-4">
                    <div className="team-card">
                        <img src="assets/dev/sanket.png" className="team-photo" alt="Team member photo" />
                        <h5 className="team-name">Sanket Barde</h5>
                        <p className="team-title">Founder</p>
                        <p className="team-bio">
                            Sanket Barde is the Founder and Lead Developer of PlotTwist, architecting the platform from the
                            ground up. Based in Bangalore, he blends technical expertise in web development with a
                            deep love for cinema. Sanket is committed to delivering a fast, smart, and seamless experience
                            that takes the guesswork out of movie discovery. His dedication drives continuous improvements
                            to ensure PlotTwist remains the most efficient and enjoyable way to explore films.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
