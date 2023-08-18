function Validator(options) {

    function Validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value)

            if(errorMessage) {
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('error');
            } else {
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('error');
            }
    }

    var formElement = document.querySelector(options.form); 

    if(formElement){
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
           
            if(inputElement){
                inputElement.onblur = function () {
                    Validate(inputElement, rule)
                }

                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('error');
                }
            }
        });
    }
}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) { 
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) { 
            var regex = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'; 
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    };
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) { 
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    };
}
