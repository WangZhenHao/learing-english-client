import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({
  className,
  maxLength,
  ...props
}) {
  const [internalValue, setInternalValue] = React.useState("");
  const currentValue = props.value !== undefined ? props.value : internalValue;
  // console.log(props.value)
  // debugger
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    if (props.onChange) {
      props.onChange(e);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={currentValue}
        onChange={handleInputChange}
        maxLength={maxLength}
        {...props}
      />
      {maxLength && (
        <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
          {currentValue.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

export { Textarea };