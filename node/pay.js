import Stripe from 'stripe';
const striper = Stripe("sk_test_51MXFXqCoW04gSSqlHdQgeAtRnXqjEls4bKsIEdg6MEmTNK7ai3yipNK2cnogJmWLypBeNvSjCHj4cwNwprelCh2U00xZ0eswuL")

export const pay = async (req, res) => {
    let {id, amount, description} = req.body;
    console.log(req.body)
    striper.paymentIntents.create({
        amount: amount *100,
        description: description,
        currency: 'cop',
        payment_method_data: {
            type: 'card',
            card: {
                token: id
            }
        },
        confirm: true
    }).then((pay) => {
        console.log(pay)
        res.sendStatus(204);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
}