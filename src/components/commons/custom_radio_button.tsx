import React, { useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Octicons from "react-native-vector-icons/Octicons"
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../libs/typography/typography';

const CustomRadioButton = ({ options, selectedValue, onSelect, horizontal, style, itemHorizontal }: any) => {
  return (
    <View style={[styles.container, { flexDirection: horizontal ? "row" : "column" }, style]}>
      {options.map((option: any) => (
        <TouchableOpacity
          key={option.value}
          activeOpacity={0.8}
          style={[
            styles.radioButton, { flexDirection: !itemHorizontal ? 'row' : 'column' },
            selectedValue === option.value && styles.selectedRadioButton,
          ]}
          onPress={() => onSelect(option.value)}
        >
          {selectedValue === option.value ? <FontAwesome name="dot-circle-o" color={"#007bff"} size={24} /> : <Octicons name="dot" size={40} color={colors.auth_icon} />}
          <Text style={styles.radioText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', gap: 10
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedRadioButton: {


  },
  radioText: {
    color: colors.black, textAlign: 'center', marginLeft: 2
  },
});

export default CustomRadioButton;
