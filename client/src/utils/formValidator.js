function validateForm(fields) {
    let errs = {};
    for(let field in fields) {
        if(fields.hasOwnProperty(field)) {
            if(fields[field] === '') {
                errs[field] = `This field can't be empty`;
            }
            
            if(field === "email") {
                let email = fields[field];
                let regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!regex.test(email)) {
                    errs[field] = `Invalid email id`
                }
            }

            if(field === "password" || field === "cnfPassword"){
                if(fields[field].length !== 8) {
                    errs[field] = `Password must be 8 character long`;
                }
                if(field === 'cnfPassword' && fields["password"] !== fields[field]) {
                    errs[field] = `Password doesn't match`;
                }
            }
        }
    }
    return errs;
}

export default validateForm;