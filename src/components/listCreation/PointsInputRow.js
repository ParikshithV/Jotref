import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./CreateLilist";
import { hex } from "../colors.js";

const PointsInputRow = (props) => {
    const { value, index, updatePointText, removePoint } = props;

    return (
        <View style={[styles.textInputContVue, styles.listPointInput]}>
            <Text style={styles.pointIndexNo}>{index + 1}.</Text>
            <TextInput
                placeholder="Add to list..."
                placeholderTextColor={hex.nineSix}
                style={styles.listCreationPoint}
                value={value}
                onChangeText={(text) => updatePointText(text, index)}
                autoFocus={true}
            />
            {!value.length ?
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => removePoint(index)}
                >
                    <Text>❌</Text>
                </TouchableOpacity> : <View />}
        </View>
    )
};

export default PointsInputRow;