"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getCatergory } from "@/api/course";
import { useEffect, useState } from "react";

export default function SelectCatergory(props) {
    const [catergory, setCatergory] = useState([]);

    useEffect(() => {
        getCatergory().then((res) => {
            setCatergory(res.data);
        });
    }, []);

    return (
        <Select onValueChange={props.onChange} value={props.value}>
            <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                {catergory.map((item, index) => {
                    return (
                        <SelectGroup key={index}>
                            {item.children && item.children.length ? (
                                <>
                                    <SelectLabel>{item.name}</SelectLabel>
                                    {item.children.map((child) => {
                                        return (
                                            <SelectItem
                                                key={child.id}
                                                value={child.id}
                                            >
                                                {child.name}
                                            </SelectItem>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <SelectLabel>一级分类</SelectLabel>
                                    <SelectItem value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                </>
                            )}
                        </SelectGroup>
                    );
                })}

                {/* <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time (ART)</SelectItem>
          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup> */}
            </SelectContent>
        </Select>
    );
}
