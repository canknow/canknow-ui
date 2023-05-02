// eslint-disable-next-line no-undef
exports.notEmpty = name => {
    return v => {
        if (!v || v.trim === '') {
            return `${name} is required`;
        } else {
            return true;
        }
    };
};
