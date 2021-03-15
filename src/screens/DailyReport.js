import React, { useState, useEffect } from 'react'
import { Pressable } from 'react-native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import API from "../config/api"
import axios from '../components/Axios';
import { EmptyList, Loader } from "../components"
const { height, width } = Dimensions.get("screen")

const DailyReport = (props) => {
    const { navigation, userData } = props
    const auth = useSelector(state => state.auth);
    const userToken = auth.token ? auth.token : null;
    const Axios = axios(userToken);

    const [reportList, setReportList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDailyReports()
        });
    }, [])

    const getDailyReports = async () => {
        await Axios.get(API.dailyReports(userData.id))
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    if (data) {
                        setReportList(data);
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
                text: "Daily reports",
                style: styles.headercentercomp
            }}
            containerStyle={styles.headercontainer}
            placement="left"
            leftComponent={<TouchableOpacity onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></TouchableOpacity>}
        />
        <View style={{ flex: 1 }}>
            <FlatList
                data={reportList}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 12 }}
                renderItem={({ item, index }) => {
                    return (<TouchableOpacity onPress={() => navigation.navigate("AddReport", { item })} style={{ height: height * 0.08, marginHorizontal: width * 0.05, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 4, borderRadius: 6 }}>
                        <View style={{ flex: 1, justifyContent: "space-between", }}>
                            <Text numberOfLines={1} style={{ color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{item.subjects[0].name}</Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.date && new Date(item.date).toDateString()}</Text>
                        </View>
                        <View style={{ width: width * 0.3, justifyContent: "space-evenly", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', }}>{`${item.working_hours} Hrs`}</Text>
                            <View style={{
                                width: width * 0.06, height: width * 0.06, borderRadius: width * 0.03,
                                backgroundColor: item.reportstatus == 0 ? "green" : item.reportstatus == 1 ? "orange" : "red", justifyContent: "center"
                            }}>
                                <Icon type="material" name={item.reportstatus == 0 ? "done" : item.reportstatus == 1 ? "query-builder" : "priority-high"} color='#FFF' size={20} />
                            </View>

                        </View>
                    </TouchableOpacity>)
                }}
                ListEmptyComponent={<EmptyList />}
            />
            <Pressable onPress={() => navigation.navigate("AddReport",)} style={{ height: height * 0.06, width: height * 0.06, position: "absolute", borderRadius: height * 0.03, bottom: height * 0.03, right: height * 0.03, shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: height * 0.03, elevation: 4, backgroundColor: "#3951B6", justifyContent: "center", alignItems: "center" }}>
                <Icon type="material" name="add" color='#FFF' size={30} />
            </Pressable>
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

export default connect(mapStateToProps, mapDispatchToProps)(DailyReport)

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
