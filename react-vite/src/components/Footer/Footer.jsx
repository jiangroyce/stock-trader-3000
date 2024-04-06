import "./Footer.css"
import { FaGithub, FaLinkedin } from "react-icons/fa"
function Footer() {
    return (
        <div className="footer">
            <div>Royce Jiang</div>
            <a href="https://github.com/jiangroyce" target="_blank"><FaGithub />Github</a>
            <a href="https://www.linkedin.com/in/jiangroyce/" target="_blank"><FaLinkedin />LinkedIn</a>
        </div>
    )
}

export default Footer
