import { useEffect } from "react";
function getSelectedText() {
    return window.getSelection().toString();
}
const useSelectWord = (id, listener) => {
    const fn = () => {
        const val = getSelectedText();
        if(val) {
            listener(val);
        }
    };

    useEffect(() => {
        const areaDom = document.querySelector(id);
        areaDom.addEventListener("mouseup", fn);

        return () => document.removeEventListener("mouseup", fn);
    }, []);
};

export default useSelectWord;
