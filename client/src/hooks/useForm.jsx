import {useState} from 'react';

function useForm(initState) {
    let [fields, setFields] = useState(initState);

    function updateFields(event) {
        let allFields = {...fields};
        allFields[event.target.name] = event.target.value;
        setFields(allFields);
    }

    function resetFields() {
        let allFields = {...fields};
        Object.keys(allFields).forEach(field => allFields[field] = '');
        setFields(allFields);
    }
    return [fields, updateFields, resetFields];
}

export default useForm;