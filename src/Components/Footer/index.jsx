import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="Footer">
        <a href="mailto:baotongxuan@gmail.com" target="_blank">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="https://github.com/tongxuanbao" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/baotongxuan/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://www.youtube.com/channel/UCa1KDC4kkpvGFmtCZDMP7EA"
          target="_blank"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://twitter.com/BaoTong99" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
