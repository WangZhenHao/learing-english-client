// "use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const App = (props) => {
    const list = props.list || [];
    return (
        <Select
            disabled={props.disabled}
            onValueChange={props.onChange}
            value={props.value}
        >
            <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {list.map((item) => (
                        <SelectItem value={item.value} key={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default App;
