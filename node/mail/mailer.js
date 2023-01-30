import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'juank020505@gmail.com',
        pass: 'rtdxlfeevxzgurty'
    }
})

export const sendMail = prod => {
    transporter.sendMail({
        from: "tienda <tiendafig@gmail.com",
        to: "juan.echeverry1@utp.edu.co",
        subject: "Avisto stock mínimo",
        text: `El stock del producto ${prod.id}. ${prod.name} se esta agotando`
    }).then(console.info)
    .catch(console.catch)
}