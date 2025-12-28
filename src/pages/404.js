import Error from '../components/error/Error';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <Error/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back home</Link>
        </div>
    )
}

export default Page404;