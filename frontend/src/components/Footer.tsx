import { Link } from "react-router-dom";
import Logo from "./Logo";
import { COMPANY_EMAIL, COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL } from "../lib/constants";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo variant="light" />
          <p className="footer-tagline">
            Practical society management and education management software for Indian communities and institutions.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Solutions</h4>
          <ul>
            <li><Link to="/solutions/society-management">Society Management Software</Link></li>
            <li><Link to="/solutions/education-management">Education Management Software</Link></li>
            <li><Link to="/solutions">All Solutions</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/industries">Industries We Serve</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact</h4>
          <ul>
            <li><a href={`tel:${COMPANY_PHONE_TEL}`}>{COMPANY_PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Legal</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-use">Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {year} Vedansh Software Services. All rights reserved.</p>
      </div>
    </footer>
  );
}
