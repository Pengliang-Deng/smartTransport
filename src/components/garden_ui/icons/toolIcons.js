import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";
import finger from './finger.svg';
import sun from "./sun-icon.svg";
import fertilizer from './fertilizer.svg';
import water from './water1.svg';


export function WaterCanIcon(props) {
    return (
        <SvgIcon {...props} component={water} viewBox="0 0 50 50"/>
    );
}

export function FertilizerIcon(props) {
        return (
            <SvgIcon {...props} component={fertilizer} viewBox="0 0 50 50"/>
        );
}

export function SunIcon(props) {
        return (
            <SvgIcon {...props} viewBox="0 0 50 50" component={sun}/>
        );
}

export function SelectIcon(props) {
        return (
            <SvgIcon {...props} component={finger} viewBox="0 0 50 50"/>
        )
}