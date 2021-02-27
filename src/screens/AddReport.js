import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Pressable, Keyboard, Alert } from 'react-native'
import { Header, Icon, BottomSheet, ListItem, Input, Button } from "react-native-elements"
import _ from "lodash"
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get("screen")

const subjects = [{ label: 'MATHS', value: 'MATHS' }, { label: 'Malayalam', value: 'Malayalam' }, { label: 'Physics', value: 'Physics' }]

const AddReport = (props) => {
    const { navigation, route: { params: { item = null } = { item: null } } } = props

    const [dateShow, setDateShow] = useState(false)
    const [data, setData] = useState(item)

    const setValues = (type, value) => {
        const temp = data == null ? {} : data
        temp[type] = value
        setData({ ...temp })
    }

    const save = () => {
        if (_.isEmpty(data)) {
            Alert.alert("Error", 'Data empty')
        } else if (!_.has(data, "date") || _.isNull(data.date)) {
            Alert.alert("Error", 'date')
        } else if (!_.has(data, "subject") || _.isNull(data.subject)) {
            Alert.alert("Error", 'subject')
        } else if (!_.has(data, "duration") || _.isNull(data.duration)) {
            Alert.alert("Error", 'duration')
        } else {
            navigation.goBack()
        }
    }

    return (<>
        <Header
            backgroundColor="#FFF"
            barStyle="dark-content"
            centerComponent={{
                text: `${item == null ? "Add new" : "Edit"} report`,
                style: {
                    color: '#3951B6',
                    fontSize: 20,
                    fontWeight: '600',
                    fontFamily: 'System'
                }
            }}
            containerStyle={{
                width: '100%',
                borderBottomWidth: 1.5,
                elevation: 10
            }}
            placement="left"
            leftComponent={<TouchableOpacity onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></TouchableOpacity>}
            rightComponent={<TouchableOpacity onPress={() => navigation.goBack()}><Icon type="material" name="delete" color='#000' /></TouchableOpacity>}
        />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ padding: width * 0.05 }}>
                <Pressable onPress={() => setDateShow(true)} style={{ borderRadius: width * 0.02, padding: width * 0.03, marginBottom: width * 0.05, height: height * 0.11, flexDirection: "row", backgroundColor: "#FFF" }}>
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Date</Text>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: '500', fontFamily: 'System', marginBottom: height * 0.01 }}>{_.has(data, "date") ? new Date(data.date).toDateString() : new Date().toDateString()}</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Icon type="antdesign" name="calendar" color='#3951B6' size={26} />
                    </View>
                    {dateShow && <DateTimePicker
                        testID="dateTimePicker"
                        value={_.has(data, "date") ? new Date(data.date) : new Date()}
                        mode={"date"}
                        display="spinner"
                        onChange={(event, date) => {
                            setDateShow(false)
                            date && setValues("date", date)
                        }}
                    />}
                </Pressable>
                <View style={{ borderRadius: width * 0.02, padding: width * 0.03, marginBottom: width * 0.05, backgroundColor: "#FFF" }}>
                    <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Subject</Text>
                    <RNPickerSelect
                        placeholder={{ label: "Select subject" }}
                        onValueChange={(value) => setValues("subject", value)}
                        items={subjects}
                        value={_.has(data, "subject") ? data.subject : ""}
                        style={{
                            inputIOS: {
                                fontSize: 16,
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: 'gray',
                                borderRadius: 4,
                                color: 'black',
                                paddingRight: 30, // to ensure the text is never behind the icon
                            },
                            inputAndroid: {
                                fontSize: 16,
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: 'red',
                                borderRadius: 8,
                                color: 'black',
                                paddingRight: 30, // to ensure the text is never behind the icon
                            },
                        }}
                    />
                </View>
                <View style={{ borderRadius: width * 0.02, padding: width * 0.03, marginBottom: width * 0.05, height: height * 0.11, flexDirection: "row", backgroundColor: "#FFF" }}>
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>Duration (Hrs)</Text>
                        <TextInput
                            keyboardType="number-pad"
                            placeholder="Enter the duration"
                            onChangeText={text => { setValues("duration", text) }}
                            value={_.has(data, "duration") ? data.duration.toString() : ""}
                        />
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Icon type="material" name="timer" color='#3951B6' size={26} />
                    </View>

                </View>
                <Button
                    containerStyle={{
                        marginTop: 35,
                        width: '100%'
                    }}
                    buttonStyle={{
                        height: 57,
                        color: '#FFF',
                        fontSize: 17,
                        fontFamily: 'System',
                        borderRadius: 5
                    }}
                    //loading={auth.loggingIn}
                    linearGradientProps={{
                        colors: ['#0066D1', '#03C0C7'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 }
                    }}
                    title="SAVE"
                    ViewComponent={LinearGradient}
                    onPress={() => save()} />
            </View>

        </TouchableWithoutFeedback>
    </>
    )
}

export default AddReport
