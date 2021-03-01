import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Pressable, Animated, Easing } from 'react-native'
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
    status: "approved"
}, {
    title: "Forensic",
    type: "quizz",
    course: "Malayalam course",
    subject: "Malayalam",
    lesson: "Test",
    date: "2021-02-12T14:46:12.387Z",
    duration: 3,
    status: "rejected"
},
{
    title: "NEW TEST FIVE",
    type: "daily quizz",
    course: "Physics course",
    subject: "Physics",
    lesson: "Problem Solving",
    date: "2021-02-02T14:46:12.387Z",
    duration: 4,
    status: "pending"
}]

const MyTestAndQuiz = (props) => {
    const { navigation } = props

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
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 12 }}
                renderItem={({ item, index }) => {
                    return (<TouchableOpacity onPress={() => navigation.navigate("TestDetails", { item })} style={{ marginHorizontal: width * 0.05, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 4, borderRadius: 6 }}>
                        <View style={{ flex: 1, justifyContent: "space-between", }}>
                            <Text style={{ color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{`${item.title} - `}<Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.type}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Course :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.course}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Subject :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.subject}</Text></Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Lesson :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.lesson}</Text></Text>
                        </View>
                        <View style={{ width: width * 0.1, justifyContent: "space-evenly", flexDirection: "row", alignItems: "center", }}>
                            <View style={{
                                width: width * 0.06, height: width * 0.06, borderRadius: width * 0.03,
                                backgroundColor: item.status == "approved" ? "green" : item.status == "pending" ? "orange" : "red", justifyContent: "center"
                            }}>
                                <Icon type="material" name={item.status == "approved" ? "done" : item.status == "pending" ? "query-builder" : "priority-high"} color='#FFF' size={20} />
                            </View>

                        </View>
                    </TouchableOpacity>)
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

