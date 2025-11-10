# New Component Plan — Email Notifications

Goal: Send a short email when someone borrows or returns a book.

Why: It gives users a confirmation and is quick to add.

What to use: NodeMailer

Steps:
- Install: `npm install nodemailer`
- Make `src/services/mail.service.ts` with one function `sendMail(options)`.
- Put SMTP details in environment variables (don't commit them).
- Use a test SMTP (Ethereal or Mailtrap) during development.
- Call `sendMail` after a successful borrow or return.

Testing notes:
- In unit tests, mock `sendMail` so no real email is sent.
- Manually test with Ethereal to view sample messages.