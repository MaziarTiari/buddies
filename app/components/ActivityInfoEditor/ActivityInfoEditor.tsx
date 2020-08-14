import React, { useContext } from "react";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { View } from "react-native";

const ActivityInfoEditor = () => {

    const { activity } = useContext(SessionContext);

    return (<View></View>);

};

export default ActivityInfoEditor;