import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Pressable, Animated, Easing, Image } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import { HEIGHT, WIDTH } from "../constants";

const { height, width } = Dimensions.get("screen")


const data = [{
    title: "Rank Test",
    type: "test",
    course: "Astro Physics",
    subject: "MATHS",
    lesson: "Problem Solving",
    date: "2021-02-21T14:46:12.387Z",
    duration: 8,
    status: "approved",
    rank: 10,
    rankoutoff: 100,
    mark: 20,
    markoutoff: 30
}, {
    title: "Forensic",
    type: "quizz",
    course: "Malayalam course",
    subject: "Malayalam",
    lesson: "Test",
    date: "2021-02-12T14:46:12.387Z",
    duration: 3,
    status: "rejected",
    rank: 3,
    rankoutoff: 10,
    mark: 25,
    markoutoff: 50
},
{
    title: "NEW TEST FIVE",
    type: "daily quizz",
    course: "Physics course",
    subject: "Physics",
    lesson: "Problem Solving",
    date: "2021-02-02T14:46:12.387Z",
    duration: 4,
    status: "pending",
    rank: 11,
    rankoutoff: 15,
    mark: 27,
    markoutoff: 30
}]

const StudentDetails = (props) => {
    const { navigation, route: { params: { item = {} } = { item: {} } } } = props
    console.log('====================================');
    console.log(item);
    console.log('====================================');
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
                <Image source={require("../../assets/icon-msg-student3.png")} resizeMode="contain" />
                <Text style={{ color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{item.name}</Text>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.phone}</Text>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.email}</Text>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={{ paddingTop: 12 }}
                renderItem={({ item, index }) => {
                    return (<View style={{ marginHorizontal: width * 0.05, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 4, borderRadius: 6 }}>
                        <View style={{ flex: 1, justifyContent: "space-between", }}>
                            <Text style={{ color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{`${item.title} - `}<Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.type}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Rank :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{`${item.rank}/${item.rankoutoff}`}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Mark :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{`${item.mark}/${item.markoutoff}`}</Text></Text>
                        </View>
                    </View>)
                }}
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

