import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import Button from "@/components/Button";

import styles from "@/styles/NavigationBar.module.css";

export default function NavigationBar() {
    const router = useRouter();

    const toUpload = useCallback((event) => {
        router.push("/upload");
    }, [ router ]);

    return (
            <nav className={ styles.bar }>
                <Link href="/">
                    <Image className={ styles.icon } src="/videocam-outline.svg" alt="ShareSpace Icon" width={ 16 } height={ 16 } />
                    <span className={ styles.siteName }>Share Space</span>
                </Link>
                <div className={ styles.right }>
                    <Button text="Upload!" callback={ toUpload } />
                </div>
            </nav>
    );
}