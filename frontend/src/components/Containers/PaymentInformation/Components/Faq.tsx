import { FC } from 'react'

const Faq: FC = () => {
    return (
        <section className="h-50 mb-10">
            <h1 className="text-2xl font-extrabold p-10 uppercase">FAQ</h1>
            <div className="grid grid-cols-2">
                <div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">If I forget my password, what should I do?</p>
                        <p className="text-md px-20">
                            You can contact our customer service team via email or <br />
                            the phone number listed on our website.
                        </p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">Do I need an account to place an order?</p>
                        <p className="text-md px-20">
                            Yes, by creating an account, we can identify your location <br />
                            and contact you if your order is to be shipped.
                        </p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">Does ERIGO have social media?</p>
                        <p className="text-md px-20">Yes, we do. You can find it on our website.</p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">How do I pay for my order?</p>
                        <p className="text-md px-20">You can pay for your order through E-Wallet.</p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">Does the store accept credit card payments?</p>
                        <p className="text-md px-20">Not at the moment, we only accept E-Wallet payments.</p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">Can I exchange the size or model of the item after purchase?</p>
                        <p className="text-md px-20">
                            Yes, we accept exchanges of size or model within 14 days of <br />
                            purchase, provided the item is still in new condition and has not <br />
                            been used.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">Is shopping at ERIGO safe?</p>
                        <p className="text-md px-20">At ERIGO, your security is our top priority.</p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">
                            Is there a customer service that I can contact if I have questions <br />
                            or issues with my order?
                        </p>
                        <p className="text-md px-20">
                            Yes, we have a customer service team ready to assist you with <br />
                            any questions or issues you may have. Please contact us via <br />
                            email or the phone number listed on our website.
                        </p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">
                            How can I get information about new products or the latest <br />
                            collections?
                        </p>
                        <p className="text-md px-20">
                            You can sign up to receive email updates from us to get <br />
                            information about our new products or latest collections. <br />
                            Additionally, you can also visit our website regularly or follow our <br />
                            social media accounts for updates.
                        </p>
                    </div>
                    <div className="pb-3">
                        <p className="text-md font-bold px-20">Does the store offer any special discounts or promotions?</p>
                        <p className="text-md px-20">
                            Yes, we periodically offer discounts and special promotions to <br />
                            our customers. Be sure to join us or follow our social media <br />
                            accounts to get updates about our offers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq