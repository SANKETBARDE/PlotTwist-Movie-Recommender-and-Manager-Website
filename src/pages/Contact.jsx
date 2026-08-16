import React from 'react';

export default function Contact() {
    return (
        <>
            <section className="container my-5">
                <div className="row">
                    <div className="col-12 text-center mb-5">
                        <h1 className="contact-title">Contact Us</h1>
                        <p className="contact-subtitle">We'd love to hear from you! Please fill out the form below.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 mb-4">
                        <div className="glass-panel">
                            <h2 className="form-title text-yellow">Send a Message</h2>
                            <form name="contact" method="POST" data-netlify="true">
                                <input type="hidden" name="form-name" value="contact" />

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input type="text" id="name" name="name" className="form-control" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your Email</label>
                                    <input type="email" id="email" name="email" className="form-control" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input type="text" id="subject" name="subject" className="form-control" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea id="message" name="message" className="form-control" rows="5" required></textarea>
                                </div>

                                <button type="submit" className="btn btn-submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="glass-panel h-100">
                            <h2 className="info-title text-yellow">Our Information</h2>
                            <div className="info-block">
                                <p><i className="fa-solid fa-location-dot"></i> Bangalore, Karnataka, India</p>
                                <p><i className="fa-brands fa-whatsapp"></i> +91-77954-57322</p>
                                <p><i className="fa-solid fa-envelope"></i> coclashians@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container my-5 reviews-section">
                <h2 className="text-center mb-4">User Feedback</h2>
                <div className="reviews-container">
                    <div className="review-card">
                        <p>"This site changed the way I pick movies. The curation feels personal, and every time I watch
                            something from here, it turns out to be a great choice."</p>
                        <footer>- Sujay V.</footer>
                    </div>
                    <div className="review-card">
                        <p>"I really appreciate how well-organized everything is. Whether I want a weekend blockbuster or a
                            meaningful indie film, I always find something worth watching."</p>
                        <footer>- Shivakumar R.B.</footer>
                    </div>
                    <div className="review-card">
                        <p>"The recommendations are refreshingly different from mainstream platforms. I've discovered films I
                            would’ve never come across otherwise. Truly one of a kind."</p>
                        <footer>- Syed Umarsha Khadri</footer>
                    </div>
                    <div className="review-card">
                        <p>"Every visit feels like a new adventure. The updated lists and thoughtful categories make exploring
                            movies so enjoyable. This platform is a real gem for film lovers."</p>
                        <footer>- Praneet Hegde</footer>
                    </div>
                </div>
            </section>
        </>
    );
}
