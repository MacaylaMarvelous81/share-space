import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button";

import styles from "@/styles/navbar.module.css";

export default function Navbar() {
    return (
            <nav className={ styles.bar }>
                <Link href="/">
                    <Image className={ styles.icon } src="/videocam-outline.svg" alt="ShareSpace Icon" width={ 16 } height={ 16 } />
                    <span className={ styles.siteName }>Share Space</span>
                </Link>
                <div className={ styles.right }>
                    <Link href="/upload">
                        <Button text="Upload!" />
                    </Link>
                </div>
            </nav>
    );
}
