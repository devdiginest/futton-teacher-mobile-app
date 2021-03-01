import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, Pressable } from 'react-native'
import { Header, Icon } from 'react-native-elements';

const { height, width } = Dimensions.get("screen")


const data = [{
    name: "Test",
    phone: "9999345364",
    email: "test@test.com",
    date: "2021-02-21T14:46:12.387Z",
    duration: 8,
    status: "active"
}, {
    name: "test 2",
    phone: "9999345364",
    email: "test@test.com",
    date: "2021-02-12T14:46:12.387Z",
    duration: 3,
    status: "offline"
},
{
    name: "test 3",
    phone: "9999345364",
    email: "test@test.com",
    date: "2021-02-02T14:46:12.387Z",
    duration: 4,
    status: "active"
}]
const StudentList = (props) => {
    const { navigation } = props
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
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 12 }}
                renderItem={({ item, index }) => {
                    return (<Pressable onPress={() => navigation.navigate("StudentDetails", { item })} style={{ height: height * 0.11, marginHorizontal: width * 0.05, marginBottom: 10, padding: 15, flexDirection: 'row', backgroundColor: '#FFF', shadowColor: '#26000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 4, borderRadius: 6 }}>
                        <View style={{ width: height * 0.07 }}>
                            <Image source={require("../../assets/profile-image-placeholder.png")} style={{ flex: 1, width: height * 0.06, }} resizeMode="contain" />
                        </View>
                        <View style={{ flex: 1, justifyContent: "space-between", }}>
                            <Text style={{ color: '#3951B6', fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textTransform: "uppercase" }}>{item.name}</Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.phone}</Text>
                            <Text style={{ color: '#00000040', fontSize: 14, fontWeight: '400', fontFamily: 'System' }}>{item.email}</Text>
                        </View>
                        <View style={{ width: width * 0.3, justifyContent: "space-evenly", flexDirection: "row", alignItems: "center" }}>
                            <Pressable>
                                <Icon type="material" name='email' color='#3951B6' size={26} />
                            </Pressable>
                            <View style={{
                                width: width * 0.06, height: width * 0.06, borderRadius: width * 0.03,
                                backgroundColor: item.status == "active" ? "green" : "gray", justifyContent: "center"
                            }}>
                                <Icon type="material" name={item.status == "active" ? "done" : "close"} color='#FFF' size={20} />
                            </View>
                        </View>
                    </Pressable>)
                }}
            />
        </View>
    </>
    )
}

export default StudentList

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
