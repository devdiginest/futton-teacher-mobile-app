import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Pressable, Animated, Easing, Image } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import { HEIGHT, WIDTH } from "../constants";
import { BASE_URL } from "../config/Constants"
import { useDispatch, useSelector, connect } from 'react-redux';
import { unionBy } from "lodash"
import axios from '../components/Axios';
import API from "./../config/api"
import { Loader, EmptyList, CourseComponent } from "../components"

const ChatInfo = (props) => {
    const { navigation, route: { params: { item = {} } = { item: {} } }, userData } = props
    const [courses, setCourses] = useState([])
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const userToken = auth.token ? auth.token : null;
    const Axios = axios(userToken);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await Axios.get(API.teacherStudentCourse(userData.id, item.id)).then(response => {
            if (response.status === 200) {
                const data = response.data;
                if (data) {
                    setCourses(unionBy(data, "id"))
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
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 12, marginVertical: HEIGHT * 0.015,
                }}>
                    <Text style={{
                        color: '#333',
                        fontSize: 20,
                        fontFamily: 'System',
                        fontWeight: 'bold'
                    }}>Courses</Text>
                </View>

                <FlatList
                    data={courses}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingHorizontal: 0,
                        width: '100%'
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (<CourseComponent item={item} />)
                    }}
                    ListEmptyComponent={<EmptyList />}
                />
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatInfo)

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

