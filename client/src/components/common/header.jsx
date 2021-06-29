import '../../styles/common/header.css';
import {useContext} from 'react';
import { AuthContext } from '../../authContext';

function Header() {
    const {auth, setAuthValue} = useContext(AuthContext);
    function logout() {
        setAuthValue(null);
    }
    return(
        <nav className="navbar">
            <div className="navbar-brand headerItem">Job Finder</div>
            {auth.token   ? <div className="headerItem" onClick={logout}>Logout</div>:null}
        </nav>
    );
}

export default Header;