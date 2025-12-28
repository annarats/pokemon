import spinner from './spinner.gif'

const Spinner = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img
            src={spinner}
            alt="Loading"
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

export default Spinner;
