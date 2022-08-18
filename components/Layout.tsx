import Navbar from './Navbar'
import {ReactNode} from "react";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props ) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}