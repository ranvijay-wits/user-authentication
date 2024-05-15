import { transporter } from "../services/nodemailer";


const sendForgetPasswordMail = (user: any) => {
  const userEmail: string = user.email;
  console.log(userEmail);
  const mailOption = {
    from: '"Ranvijay Singh" <titus.nitzsche78@ethereal.email>', // sender address
    to: userEmail, // list of receivers
    subject: "Reset Password", // Subject line
    html: `<p>Reset your password <a href="http://localhost:3000/reset-password/${user.id}">Click Here..</a></p>`, // html body
  }

  transporter.sendMail(mailOption, (error: any, info: any) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Verification mail sent")
    }
  })

}




export { sendForgetPasswordMail };