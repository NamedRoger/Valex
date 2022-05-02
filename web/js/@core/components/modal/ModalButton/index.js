import * as React from "react";

export default function ModalButton({
    buttonRef,
    children,
    type = "button",
    ...rest
}) {
    return (
        <button ref={buttonRef} type={type} {...rest} >
            {children}
        </button>
    );
}