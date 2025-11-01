import { formatNumberStringToFloat } from "@/composables/formatPrice";

export function validateForm(formEl: HTMLFormElement | null) {
  // Use original HTML form validation (and browser's original error messages) to highlight form errors.
  if(!formEl) return;

  const inputEls = formEl.querySelectorAll('input');
  let hasErrors = false;

  inputEls?.forEach((input: HTMLInputElement) => {
    // For a text-type input that should only contain numbers, check manually:
    if(input.dataset.numbersOnly) {
      if(isNaN(formatNumberStringToFloat(input.value))) {
        input.setCustomValidity('Voer een getal in. aaaa')
      } else if(input.dataset.minNumber && formatNumberStringToFloat(input.value) < parseFloat(input.dataset.minNumber)) {
        input.setCustomValidity(`Voer een getal in dat hoger is dan ${input.dataset.minNumber}.`)
      } else if(input.dataset.maxNumber && formatNumberStringToFloat(input.value) > parseFloat(input.dataset.maxNumber)) {
        input.setCustomValidity(`Voer een getal in dat lager is dan ${input.dataset.maxNumber}.`)
      } else {
        input.setCustomValidity('')
      }
    }

    if (!input.checkValidity()) {
      hasErrors = true;
      input.reportValidity();
      input.classList.add('form-item__input--error');
    } else {
      // Everything is fine.
      input.setCustomValidity('')
      input.classList.remove('form-item__input--error');
    }
  });

  return !hasErrors
}