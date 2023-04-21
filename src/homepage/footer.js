import './footer.css';

export const Footer = () => {

    const getYear = () => {
        return (new Date()).getFullYear();
    }

    return <footer>
        <p>&copy; {getYear()} dejunqi2008@gmail.com. All rights reserved.</p>
    </footer>
}