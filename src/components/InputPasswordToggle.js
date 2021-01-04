import React, { useState, useRef }     from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity }            from 'react-native';
import PropTypes                       from 'prop-types';
import Icon                            from 'react-native-vector-icons/MaterialIcons';

export default function InputPasswordToggle({ style, inputStyle, icon, iconColor, iconSize, ...rest }, ref) {
  const [ visible, setVisible ] = useState(true);
  const refContainer            = useRef(ref);

  return (
    <View style={[style, styles.container]}>
      {
        icon &&
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor} />
      }
      <TextInput
        style={[styles.input, inputStyle]}
        secureTextEntry={visible} {...rest}
        placeholder="Password"
        ref={refContainer} />

      <TouchableOpacity onPress={() => { setVisible(!visible) }}>
        <Icon
          name={visible ? 'visibility-off' : 'visibility'}
          size={iconSize}
          color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1
  }
});

InputPasswordToggle.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

InputPasswordToggle.defaultProps = {
  icon: null,
  style: {},
  iconSize: 20,
  iconColor: '#222',
  inputStyle: {}
};
