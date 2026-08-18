import React from 'react';

export default function Contact() {
    return (
        <section className="container page-wrapper animate-fade-in-up">
            <div className="page-header">
                <h1 className="page-title">Contact Us</h1>
                <p className="text-secondary mt-4" style={{ fontSize: '1.2rem' }}>We'd love to hear from you! Please fill out the form below.</p>
            </div>
            
            <div className="contact-grid">
                <div>
                    <div className="glass-panel content-panel">
                        <h2 className="text-gradient-gold mb-4" style={{ fontSize: '2rem' }}>Send a Message</h2>
                        <form name="contact" method="POST" data-netlify="true">
                            <input type="hidden" name="form-name" value="contact" />

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input type="text" id="name" name="name" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input type="email" id="email" name="email" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input type="text" id="subject" name="subject" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea id="message" name="message" className="form-control" rows="5" required></textarea>
                            </div>

                            <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem', padding: '1rem' }}>Send Message</button>
                        </form>
                    </div>
                </div>
                <div>
                    <div className="glass-panel content-panel">
                        <h2 className="text-gradient-gold mb-4" style={{ fontSize: '2rem' }}>Our Information</h2>
                        <div className="info-block mt-8">
                            <p><i className="bi bi-geo-alt-fill"></i> Bangalore, Karnataka, India</p>
                            <p><i className="bi bi-whatsapp"></i> +91-77954-57322</p>
                            <p><i className="bi bi-envelope-fill"></i> coclashians@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-header mt-8">
                <h2 className="page-title">User Feedback</h2>
            </div>
            
            <div className="reviews-grid mb-8">
                <div className="review-card">
                    <p>"This site changed the way I pick movies. The curation feels personal, and every time I watch something from here, it turns out to be a great choice."</p>
                    <footer>- Sujay V.</footer>
                </div>
                <div className="review-card">
                    <p>"I really appreciate how well-organized everything is. Whether I want a weekend blockbuster or a meaningful indie film, I always find something worth watching."</p>
                    <footer>- Shivakumar R.B.</footer>
                </div>
                <div className="review-card">
                    <p>"The recommendations are refreshingly different from mainstream platforms. I've discovered films I would’ve never come across otherwise. Truly one of a kind."</p>
                    <footer>- Syed Umarsha Khadri</footer>
                </div>
                <div className="review-card">
                    <p>"Every visit feels like a new adventure. The updated lists and thoughtful categories make exploring movies so enjoyable. This platform is a real gem for film lovers."</p>
                    <footer>- Praneet Hegde</footer>
                </div>
            </div>
        </section>
    );
}
