export const validateMandatory = (value, occurrences, translate) => {
    let error;
    if (!value && (occurrences.lower_included && occurrences.lower === 1)) {
        //TODO Replace for translatable key in Medical Heroes
        error = translate('mandatory');
    }
    return error
};