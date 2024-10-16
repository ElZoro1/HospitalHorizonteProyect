const nodemailer = require('nodemailer');

// Configuración del transportador
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'd14529eb210299', // Cambia esto si es necesario
    pass: '12193313d0e42f', // Cambia esto si es necesario
  },
});

// Opciones del correo
const mailOptions = {
  from: 'from@example.com', // Cambia esto por tu dirección de correo
  to: '353d02c737-e6820d@inbox.mailtrap.io', // Usa la dirección de Mailtrap
  subject: 'Prueba de envío de correo',
  text: 'Este es un mensaje de prueba desde Nodemailer.',
  html: '<h1>Hola</h1><p>Este es un mensaje de prueba desde Nodemailer.</p>',
};

// Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error al enviar el correo: ', error);
  }
  console.log('Correo enviado: ' + info.response);
});
