import './charForm.scss'
import {Field, Formik, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import usePokemonService from '../../services/PokemonService';

const CharForm = (props) => {

    const [foundChar, setFoundChar] = useState('')
    const [searchData, setSearchData] = useState([])
    const {loading, error, getAllCharacters} = usePokemonService()



    const updateForm = async (props) => {
        const charData = await getAllCharacters();
        setSearchData(charData);
        const result = charData.filter(item => item.name.indexOf(props.name) > -1)
        if (result.length > 0) {
            setFoundChar({text: `There is! Visit ${result[0].name} page?`,
                            status: 'success',
                            id: result[0].url.split('/').at(-2)
                        })
            console.log('get')
        } else {
            setFoundChar({text:'The character was not found. Check the name and try again',
                            status: 'error'})
            console.log('didnt get')
        }
    }

    return (
        <div className='form__basic'>
            <div className="form__heading">Or find a character by name::</div>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={ Yup.object ({
                    name: Yup.string()
                    .required('This field is required')
                })}
                onSubmit={values => {
                    updateForm(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form__char">
                            <Field id="name" name="name" type="text" placeholder="Enter name"/>
                            <button className='button button__main' type="submit"><div className="inner">Find</div></button>
                        </div>
                        <ErrorMessage name="name" component="div" className='error'/>
                        {
                            foundChar.status === 'success' ?
                            <div className="form__result">
                                <div className='success'>{foundChar.text}</div>
                                <Link to={`/single/${foundChar.id}?type=char`} className='button button__secondary'><div className="inner">TO PAGE</div></Link>
                            </div>
                            : <div className='error'>{foundChar.text}</div>
                        }
                        
                    </Form>
                    
                )} 
            </Formik>
        </div>
        
    )
}

export default CharForm;