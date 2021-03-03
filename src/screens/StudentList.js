import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Pressable } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from "react-redux"

import { HEIGHT, WIDTH } from "../constants";
import axios from '../components/Axios';
import API from "./../config/api"
import { BASE_URL } from "../config/Constants"

const StudentList = (props) => {
    const { navigation, userData } = props

    const [studentList, setStudentList] = useState([])
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const userToken = auth.token ? auth.token : null;
    const Axios = axios(userToken);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await Axios.get(API.studentList(userData.id)).then(response => {
            if (response.status === 200) {
                const data = response.data;
                if (data) {
                    setStudentList(data)
                    console.log('====================================');
                    console.log("data ==> ", JSON.stringify(data));
                    console.log('====================================');
                }
            }
        }).catch(err => console.log(err));
    };

    return (<>
        <Header
            backgroundColor="#FFF"
            barStyle="dark-content"
            centerComponent={{
                text: "Students",
                style: styles.headercentercomp
            }}
            containerStyle={styles.headercontainer}
            placement="left"
            leftComponent={<TouchableOpacity onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></TouchableOpacity>}
        />
        <View style={{ flex: 1 }}>
            <FlatList
                data={studentList}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 12 }}
                renderItem={({ item, index }) => {
                    return (<Pressable onPress={() => navigation.navigate("StudentDetails", { item })} style={{ height: HEIGHT * 0.11, marginHorizontal: WIDTH * 0.05, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 4, borderRadius: 6 }}>
                        <View style={{ width: HEIGHT * 0.07 }}>
                            <Image defaultSource={require("../../assets/profile-image-placeholder.png")} source={item.photo ? { uri: `${BASE_URL}profilepics/${item.photo}` } : require("../../assets/profile-image-placeholder.png")} style={{ flex: 1, width: HEIGHT * 0.06, }} resizeMode={item.photo ? "cover" : "contain"} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "space-between" }}>
                            <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{item.name}</Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.mobile_no}</Text>
                            <Text numberOfLines={1} style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.email}</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.25, justifyContent: "space-evenly", flexDirection: "row", alignItems: "center" }}>
                            <Pressable>
                                <Icon type="material" name='email' color='#3951B6' size={26} />
                            </Pressable>
                            <View style={{
                                width: WIDTH * 0.06, height: WIDTH * 0.06, borderRadius: WIDTH * 0.03,
                                backgroundColor: item.status == "Active" ? "green" : "gray", justifyContent: "center"
                            }}>
                                <Icon type="material" name={item.status == "Active" ? "done" : "close"} color='#FFF' size={20} />
                            </View>
                        </View>
                    </Pressable>)
                }}
            />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentList)

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
