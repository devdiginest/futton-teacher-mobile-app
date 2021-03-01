import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Pressable, Animated, Easing, Image } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import { HEIGHT, WIDTH } from "../constants";
const lessons = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s standard dummy text ever since the 1500s"]
const TestDetails = (props) => {
    const { navigation, route: { params: { item = {} } = { item: {} } } } = props

    return (<>
        <Header
            backgroundColor="#FFF"
            barStyle="dark-content"
            centerComponent={{
                text: item.title.toUpperCase(),
                style: styles.headercentercomp
            }}
            containerStyle={styles.headercontainer}
            placement="left"
            leftComponent={<TouchableOpacity onPress={() => navigation.goBack()}><Icon type="material" name="arrow-back" color='#3951B6' /></TouchableOpacity>}
        />
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={{ height: HEIGHT * 0.15, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-evenly", }}>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Type :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.type}</Text></Text>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Course :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.course}</Text></Text>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Subject :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.subject}</Text></Text>
                <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System', }}>{`Lesson :- `}<Text style={{ color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System' }}>{item.lesson}</Text></Text>
            </View>
            <View style={{ flex: 1, padding: WIDTH * 0.05 }}>
                <Text style={{ color: '#262626', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>Questions</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={lessons}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <View style={{ borderBottomWidth: 0.5, padding: HEIGHT * 0.01, }}>
                        <View style={{ flex: 1, justifyContent: "center", borderColor: "#3951B6" }}>
                            <Text style={{ fontSize: 12, fontFamily: "System", color: "#3951B6", fontWeight: "bold" }}><Text style={{ color: '#262626', fontSize: 14, fontWeight: 'bold', fontFamily: 'System', }}>{`${index + 1}, `}</Text>{item}</Text>
                        </View>
                    </View>}
                />
            </View>

        </View>

    </>
    )
}

export default TestDetails

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
