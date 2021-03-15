import React from 'react'
import { View, Text } from 'react-native'

const EmptyList = ({ msg = "No records found !!!" }) => {
    return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{
            color: '#C7C7C7', fontSize: 14, fontWeight: '400', fontFamily: 'System'
        }}>{msg}</Text>
    </View>)
}

export default EmptyList
