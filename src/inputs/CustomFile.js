import React from "react";

const CustomFile = ({field, form: {touched, errors, setValues}, ...props}) => (
    <div className="input-group">
        <div className="custom-file">
            <input type="file" className="custom-file-input" id={field.name}
                   aria-describedby="inputGroupFileAddon01" onChange={(e) => {
                let values = {};
                values[field.name] = e.target.files[0];
                setValues(values);
            }}/>
            <label className="custom-file-label"
                   htmlFor="inputGroupFile01">{field.value ? field.value.name : "Selecciona un OPT"}</label>
        </div>
    </div>
);

export default CustomFile