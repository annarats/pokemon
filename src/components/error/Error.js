import error from './error.gif'

const Error = () => {
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img
            src={error}
            alt="Error"
            style={{
                display: 'block',
                width: '100px',
                height: '100px',
                margin: '0 auto',
                objectFit: 'contain'
            }}/>
        </div>
    )
}

export default Error;