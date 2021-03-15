import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable } from 'react-native'
import { Header } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import _ from "lodash"

import { HEIGHT, WIDTH } from "../constants";
import axios from '../components/Axios';
import API from "./../config/api"
import { Loader } from "../components"

const colors = [['#0066D1', '#03C0C7'], ['#FF5733', '#FCB301'], ['#BA0000', '#FC0000']]

const MyTestAndQuiz = (props) => {
    const { navigation } = props
    const [testList, setTestList] = useState([])
    const [loading, setLoading] = useState(true)
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const userToken = auth.token ? auth.token : null;
    const Axios = axios(userToken);


    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await Axios.get(API.testQuizz).then(response => {
            if (response.status === 200) {
                const data = response.data;
                if (data) {
                    setTestList(data)
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
                text: "My Tests and Quizzes",
                style: styles.headercentercomp
            }}
            containerStyle={styles.headercontainer}
            placement="left"
        />
        <View style={{ flex: 1, }}>
            <FlatList
                data={testList}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 12 }}
                renderItem={({ item, index }) => {
                    return (<Pressable onPress={() => navigation.navigate("TestDetails", { item })} style={{ marginHorizontal: WIDTH * 0.05, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 4, borderRadius: 6, }}>
                        <View style={{ position: "absolute", width: WIDTH * 0.25, height: HEIGHT * 0.03, right: 0, borderTopRightRadius: 6, overflow: "hidden" }}>
                            <LinearGradient style={{ flex: 1, justifyContent: "center", alignItems: "center" }} colors={colors[item.status]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}>
                                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.status == 0 ? "Approved" : item.status == 1 ? "Pending" : "Rejected"}</Text>
                            </LinearGradient>

                        </View>
                        <View style={{ flex: 1, justifyContent: "space-between", }}>
                            <Text numberOfLines={1} style={{ width: WIDTH * 0.6, color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{`${item.title} - `}<Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.exam_type == "1" ? "Test" : "Quizz"}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Course :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.courses[0].name}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Subject :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.subject}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Lesson :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.lesson}</Text></Text>
                        </View>
                        {/*  <View style={{ width: width * 0.1, justifyContent: "space-evenly", flexDirection: "row", alignItems: "center", }}>
                            <View style={{
                                width: width * 0.06, height: width * 0.06, borderRadius: width * 0.03,
                                backgroundColor: item.status == 0 ? "green" : item.status == 1 ? "orange" : "red", justifyContent: "center"
                            }}>
                                <Icon type="material" name={item.status == 0 ? "done" : item.status == 1 ? "query-builder" : "priority-high"} color='#FFF' size={20} />
                            </View>

                        </View> */}
                    </Pressable>)
                }}
            />
        </View>

    </>
    )
}

export default MyTestAndQuiz

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

