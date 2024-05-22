import { FC } from 'react'

import YourPurchase from './components/YourPurchase';
import QrCode from './components/QrCode';



const ContainerQris: FC = () => {
    return (
       <main className="min-h-screen bg-navy flex flex-col justify-center items-center">
        <YourPurchase />
        <QrCode />
       </main>
    )
}

export default ContainerQris;