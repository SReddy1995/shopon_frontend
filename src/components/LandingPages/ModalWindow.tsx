import React from "react";

const Backdrop = (props: any) => (
    props.show ? <div className="Backdrop" ></div> : null
)

const ModalWindow =(props: any) => {
    return (
        <>
        {
            props.show ?
                    <>
                        <Backdrop show={props.show} onClick={props.modalClosed}>
                        </Backdrop>
                        <div className="Modal">
                            {props.children}
                        </div>
                    </>
            :
            null

        }
        </>
    );
};

export default ModalWindow;