import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Pressable, Animated, Easing, Image } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import { HEIGHT, WIDTH } from "../constants";
import { BASE_URL } from "../config/Constants"
const { height, width } = Dimensions.get("screen")
import { useDispatch, useSelector } from 'react-redux';
import axios from '../components/Axios';
import API from "./../config/api"
import { Loader, EmptyList } from "../components"

const StudentDetails = (props) => {
    const { navigation, route: { params: { item = {} } = { item: {} } } } = props
    const [studentMark, setStudentMark] = useState([])
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const userToken = auth.token ? auth.token : null;
    const Axios = axios(userToken, `${BASE_URL}api/v1/student`);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await Axios.get(API.studentTests(item.student_id)).then(response => {
            if (response.status === 200) {
                const data = response.data;
                if (data) {
                    setStudentMark(data)
                }
            }
        }).catch(err => console.log(err));
        setLoading(false)
    };

    if (loading) {
        return <Loader />;
    }

    return (<>
        <Header
            backgroundColor="#FFF"
            barStyle="dark-content"
            centerComponent={{
                text: item.name.toUpperCase(),
                style: styles.headercentercomp
            }}
            containerStyle={styles.headercontainer}
            placement="left"
            leftComponent={<TouchableOpacity onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></TouchableOpacity>}
        />
        <View style={{ flex: 1, }}>
            <View style={{ height: HEIGHT * 0.2, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center" }}>
                <Image defaultSource={require("../../assets/profile-image-placeholder.png")} source={item.photo ? { uri: `${BASE_URL}profilepics/${item.photo}` } : require("../../assets/profile-image-placeholder.png")} style={{ width: HEIGHT * 0.1, height: HEIGHT * 0.05 }} resizeMode={"contain"} />
                <Text style={{ color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{item.name}</Text>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.mobile_no}</Text>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.email}</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={studentMark}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 12 }}
                renderItem={({ item, index }) => {
                    return (<View style={{ marginHorizontal: width * 0.05, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 4, borderRadius: 6 }}>
                        <View style={{ flex: 1, justifyContent: "space-between", }}>
                            <Text style={{ color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{`${item.title} - `}<Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.exam_type == "1" ? "Test" : "Quizz"}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Rank :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{`${item.score}/${item.qus_count}`}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Mark :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{`${item.position[0].position}/${item.position[0].totalparticipants}`}</Text></Text>
                        </View>
                    </View>)
                }}
                ListEmptyComponent={<EmptyList msg="No test results are found !!!" />}
            />
        </View>

    </>
    )
}

export default StudentDetails

const styles = StyleSheet.create({
    headercontainer: {
        width: '100%',
        borderBottomWidth: 1.5,
        elevation: 10
    },
    headercentercomp: {
        color: '#3951B6',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'System'
    },
    container: {
        padding: 24,
        paddingTop: 10,
        backgroundColor: '#FFF'
    },
    separator: {
        height: 1,
        backgroundColor: "#E2E8ED"
    },
    ncontainer: {
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    content: {
        marginLeft: 16,
        marginRight: 0,
        flex: 1,
        alignItems: 'center'
    },
    message: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        color: '#8F9BB3',
        fontSize: 15
    },
    name: {
        width: '100%',
        color: '#222B45',
        fontSize: 15,
        fontWeight: 'bold'
    },
    timeAgo: {
        color: "#C5CEE0",
        fontSize: 13
    }
});

