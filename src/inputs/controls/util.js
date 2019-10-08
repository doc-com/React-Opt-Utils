export const validateMandatory = (value, occurrences, translate) => {
    let error;
    if (!value && (occurrences.lower_included && occurrences.lower === 1)) {
        error = translate('mandatory');
    }
    return error
};