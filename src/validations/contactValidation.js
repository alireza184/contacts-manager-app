import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required('نام و نام خانوادگی الزامی میباشد'),
  photo: Yup.string()
    .url('آدرس معتبر نمیباشد')
    .required('وارد کردن عکس الزامی میباشد'),
  mobile: Yup.number().required('شماره موبایل الزامی میباشد'),
  email: Yup.string()
    .email('ایمیل وارد شده صحیح نمیباشد')
    .required('آدرس ایمیل الزامی میباشد'),
    job: Yup.string().nullable(),
    group: Yup.string().required('وارد کردن گروه الزامی میباشد')
});
