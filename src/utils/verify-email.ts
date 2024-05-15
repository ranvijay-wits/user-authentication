import { transporter } from "../services/nodemailer";


const sendVerificationMail = (user: any) => {
  const userEmail: string = user.email;
  const mailOption = {
    from: '"Ranvijay Singh" <titus.nitzsche78@ethereal.email>', // sender address
    to: userEmail, // list of receivers
    subject: "Verify Account", // Subject line
    html: `<p>Verify your account <a href="http://localhost:3000/verify-user/${user.id}">Click Here..</a></p>`, // html body
  }

  transporter.sendMail(mailOption, (error: any, info: any) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Verification mail sent")
    }
  })

}




export { sendVerificationMail };