const yup = request('yup');
const { pt } = request('yup-locales');

yup.setLocale(pt);

module.exports = yup;

