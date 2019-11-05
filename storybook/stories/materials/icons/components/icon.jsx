import { CheckmarkIcon } from "@orbit-ui/icons";
import { a, useTransition } from "react-spring";
import { useEffect, useRef, useState } from "react";
import styles from "./icon.module.css";

export function Icon({ icon, name, size }) {
    const IconSvg = icon;
    const textAreaRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const sizeClasses = size === "std" ? "h7 w7" : "h6 w6";

    const animCopy = useTransition(copySuccess, null, {
        from: {
            opacity: 0,
            transform: "translate3d(0,-20px,0)"
        },
        enter: {
            opacity: 1,
            transform: "translate3d(0,0px,0)"
        },
        leave: {
            opacity: 0,
            transform: "translate3d(0,0px,0)"
        }
    });

    useEffect(() => {
        let timer = null;

        if (copySuccess) {
            timer = setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        }

        return () => clearTimeout(timer);
    }, [copySuccess]);

    function copyCodeToClipboard () {
        textAreaRef.current.select();
        document.execCommand("copy");
        setCopySuccess(true);
    }

    return (
        <>
            <div className="absolute flex items-center justify-center h7 w7">
                <IconSvg className={sizeClasses} />
            </div>
            <div className="h7 w7 justify-center items-center pointer bg-marine-500 flex relative child pa1" onClick={copyCodeToClipboard}>{animCopy.map(({ item, key, props }) =>
                <Choose>
                    <When condition={item}>
                        <a.div style={props} className="absolute h7 w7 flex items-center justify-center" key={key}><CheckmarkIcon className="h4 w4 fill-white" /></a.div>
                    </When>
                    <Otherwise>
                        <a.div style={props} className="absolute h7 w7 flex items-center justify-center white f9 fw5" key={key}>Copy</a.div>
                    </Otherwise>
                </Choose>
            )}
            </div>
            <form className={styles.textarea}>
                <textarea readOnly
                    ref={textAreaRef}
                    value={name}
                />
            </form>
        </>
    );
}
