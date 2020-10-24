import SvgIcon from "@material-ui/core/SvgIcon";
import water from "./water1.svg";
import React from "react";
import seedIcon from "./shop1.svg";
import fenceIcon from "./shop2.svg";

export function SeedIcon(props) {
    return (
        <SvgIcon {...props} component={seedIcon} viewBox="0 0 50 50"/>
    );
}

export function FenceIcon(props) {
    return (
        <SvgIcon {...props} component={fenceIcon} viewBox="0 0 50 50"/>
    );
}