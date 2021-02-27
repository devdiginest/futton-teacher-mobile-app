import React from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { BASE_URL } from "./../config/Constants"

const CourseComponent = (props) => {

    const { item, } = props
    const navigation = useNavigation()

    return (<Pressable style={styles.course} onPress={() => navigation.navigate('Classroom', { item })}>
        <Image style={styles.cimg} defaultSource={require('../../assets/img-course.png')} source={{ uri: `${BASE_URL}/${item.thumbnail}` }} />
        <View style={styles.cdetails}>
            <Text style={{
                color: '#262626', fontSize: 16, fontWeight: "700", fontFamily: 'System',
            }}>{item.name}</Text>
            <Text style={{
                color: '#C7C7C7', fontSize: 14, fontWeight: '400', fontFamily: 'System'
            }}>{item.subjectname}</Text>
            <Text style={{
                color: '#3951B6', fontSize: 12, fontWeight: 'bold', fontFamily: 'System'
            }}>{`${item.start_date} to ${item.end_date}`}</Text>
            {/*  <View style={styles.cratingsnreviews}>
                <Image style={styles.cstar} source={require('../../assets/img-course-star.png')} />
                <Text style={styles.cratings}>{item.ratings != null ? item.ratings.substring(0, 3) : 0}</Text>
                <Text style={styles.creviews}>({item.reviews} Reviews)</Text>
            </View> */}
        </View>
    </Pressable>)
}

export default CourseComponent


const styles = StyleSheet.create({
    classsubject: {
        marginTop: 10,
        color: '#3951B6',
        fontSize: 14,
        fontFamily: 'System'
    },
    classtiming: {
        marginTop: 10,
        color: '#C7C7C7',
        fontSize: 12,
        fontFamily: 'System'
    },
    ongcourses: {
        marginTop: 20
    },
    ongcoursesheader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12
    },
    courses: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 0,
        width: '100%'
    },
    course: {
        marginVertical: 10,
        marginHorizontal: 12,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        shadowColor: '#26000000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.16,
        shadowRadius: 20,
        elevation: 4,
        borderRadius: 6
    },
    cimg: {
        width: 100
    },
    cdetails: {
        marginLeft: 15
    },
    cname: {
        color: '#262626',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'System'
    },
    cprogress: {
        marginTop: 12,
        color: '#3951B6',
        fontSize: 12,
        fontFamily: 'System'
    },
    cprogressbar: {
        marginTop: 5,
        width: '100%',
        borderRadius: 100
    },
    allcourses: {
        marginTop: 30
    },
    allcoursesheader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12
    },
    cprice: {
        marginTop: 5,
        color: '#3951B6',
        fontSize: 12,
        fontFamily: 'System'
    },
    cratingsnreviews: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cstar: {
        width: 14,
        height: 13
    },
    cratings: {
        marginLeft: 5,
        color: '#8F9BB3',
        fontSize: 12,
        fontFamily: 'System'
    },
    creviews: {
        marginLeft: 5,
        color: '#C5CEE0',
        fontSize: 12,
        fontFamily: 'System'
    }
});