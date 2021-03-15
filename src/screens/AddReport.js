import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Pressable, Keyboard, Alert } from 'react-native'
import { Header, Icon, BottomSheet, ListItem, Input, Button } from "react-native-elements"
import _ from "lodash"
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { connect, useSelector } from 'react-redux';
import API from "../config/api"
import axios from '../components/Axios';
import { Loader } from "../components"
const { height, width } = Dimensions.get("screen")


const AddReport = (props) => {
    const { navigation, route: { params: { item = null } = { item: null } }, userData } = props

    const auth = useSelector(state => state.auth);
    const userToken = auth.token ? auth.token : null;
    const Axios = axios(userToken);

    const [loading, setLoading] = useState(true)
    const [apiloading, setApiLoading] = useState(false)
    const [dateShow, setDateShow] = useState(false)
    const [data, setData] = useState(item)
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        getSubjects()
    }, [])

    const getSubjects = async () => {
        await Axios.get(API.subjects)
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    if (data) {
                        const temp = []
                        data.forEach(({ name, id }) => {
                            temp.push({ label: name, value: id })
                        })
                        setSubjects(temp);
                    }
                }
            }).catch(err => console.log(err));
        setLoading(false)
    };


    const setValues = (type, value) => {
        const temp = data == null ? {} : data
        temp[type] = value
        setData({ ...temp })
    }

    const save = () => {
        setApiLoading(true)
        if (_.isEmpty(data)) {
            Alert.alert("Error", 'Data empty')
        } else if (!_.has(data, "date") || _.isNull(data.date)) {
            Alert.alert("Error", 'date')
        } else if (!_.has(data, "subject_id") || _.isNull(data.subject_id)) {
            Alert.alert("Error", 'subject')
        } else if (!_.has(data, "working_hours") || _.isNull(data.working_hours)) {
            Alert.alert("Error", 'workinghours')
        } else {
            addReport()
        }
    }

    const addReport = async () => {
        let body = data
        body.teacher_id = userData.id
        body.profile = "Jd3kyosci1sCSyeOo9sX1c9P"
        body.working_hours = Number(data.working_hours)
        const date = new Date(data.date)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        body.date = `${year}-${month}-${day}`

        if (item == null) {
            await Axios.post(API.addDailyReport, data).then(response => {
                if (response.status && response.status) {
                    const data = response.data;
                    if (data) {
                        navigation.goBack()
                    }
                }
            }).catch(err => console.log(err))
        } else {
            body.id = data.reportid
            body.status = 1
            await Axios.put(API.updateDailyReport, data).then(response => {
                if (response.status && response.status) {
                    const data = response.data;
                    if (data) {
                        navigation.goBack()
                    }
                }
            }).catch(err => console.log(err));
        }
        setApiLoading(false)
    };

    if (loading) {
        return <Loader />;
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
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: '500', fontFamily: 'System', marginBottom: height * 0.01 }}>{_.has(data, "date") ? new Date(data.date).toDateString() : "Choose date"}</Text>
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
                        onValueChange={(value) => setValues("subject_id", value)}
                        items={subjects}
                        value={_.has(data, "subject_id") ? data.subject_id : ""}
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
                            onChangeText={text => { setValues("working_hours", text) }}
                            value={_.has(data, "working_hours") ? data.working_hours.toString() : ""}
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
                    loading={apiloading}
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

const mapStateToProps = (state /*, ownProps*/) => {
    const { userData } = state.auth
    return {
        userData: userData,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddReport)
