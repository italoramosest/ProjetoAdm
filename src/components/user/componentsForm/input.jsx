import React from 'react'
import { useForm } from 'react-hook-form'




export default (props) => {
    const { register, handleSubmit, errors } = useForm()

    return (
        < div className="col-12 col-md-6" >
            <div className="form-group">
                <label></label>
                <input type="text" className="form-control" name="name"
                    value={props.name}
                    // onChange={e => this.update(e)}
                    placeholder={props.placehoder}
                    ref={register({required: true})}
                />
            </div>
        </div >
    )
}

