"use strict";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/routing";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import { useState, useImperativeHandle, forwardRef } from "react"; // Modified import

const PriviceConfirm = forwardRef((props, ref) => { // Wrapped with forwardRef
    const [checked, setChecked] = useState(false);
    
    // Expose isCheck method to parent components
    useImperativeHandle(ref, () => ({
        isCheck: () => {
            // When checkbox is visible (props.click=true), return actual state
            if (props.click) return checked;
            // When checkbox hidden (login page), default to true (implied agreement)
            return true;
        }
    }));

    return (
        <>
            <Field orientation="horizontal">
                {props.click && (
                    <Checkbox
                        id="terms-checkbox"
                        name="terms-checkbox"
                        checked={checked}
                        onCheckedChange={() => setChecked(!checked)}
                    />
                )}
                <Label
                    htmlFor="terms-checkbox"
                    className="text-[14px]"
                    style={{ fontWeight: 400 }}
                >
                    {props.click ? "已阅读并同意" : "登录即表示同意"}{" "}
                    <Link className=" underline" href="/user-service">
                        《用户服务协议》
                    </Link>
                    、
                    <Link className=" underline" href="/privacy">
                        {" "}
                        《隐私政策》
                    </Link>
                </Label>
            </Field>
        </>
    );
});

export default PriviceConfirm;