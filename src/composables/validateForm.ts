import { formatNumberStringToFloat } from "@/composables/formatNumbers";

export function validateForm(formEl: HTMLFormElement | null) {
    // Use original HTML form validation (and browser's original error messages) to highlight form errors.
    if(!formEl) return

    const inputEls = formEl.querySelectorAll('input')
    let hasErrors = false
    inputEls?.forEach((inputEl: HTMLInputElement) => {
        if(!validateSingleInput(inputEl)) {
            hasErrors = true
        }
    })

    return !hasErrors
}
    
export function validateSingleInput(inputEl: HTMLInputElement | null) {
    if(!inputEl) return
        
    let hasErrors = false
    // For a text-type input that should only contain numbers, check manually:
    if(inputEl.dataset.numbersOnly) {
        if(isNaN(formatNumberStringToFloat(inputEl.value))) {
            inputEl.setCustomValidity('Voer een getal in.')
        } else if(inputEl.dataset.minNumber && formatNumberStringToFloat(inputEl.value) < parseFloat(inputEl.dataset.minNumber)) {
            inputEl.setCustomValidity(`Voer een getal in dat hoger is dan ${inputEl.dataset.minNumber}.`)
        } else if(inputEl.dataset.maxNumber && formatNumberStringToFloat(inputEl.value) > parseFloat(inputEl.dataset.maxNumber)) {
            inputEl.setCustomValidity(`Voer een getal in dat lager is dan ${inputEl.dataset.maxNumber}.`)
        } else {
            inputEl.setCustomValidity('')
        }
    }

    if (!inputEl.checkValidity()) {
        hasErrors = true
        inputEl.reportValidity()
        inputEl.classList.add('form-item__input--error')
    } else {
        // Everything is fine.
        inputEl.setCustomValidity('')
        inputEl.classList.remove('form-item__input--error')
    }

    return !hasErrors
}