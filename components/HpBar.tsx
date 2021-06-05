import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';

type HpBarProps = {
    current:number
    max:number
}

export default function HpBar(props:HpBarProps) {

    const percent = (props.current / props.max) * 100

    return <View style={styles.outer}>
        <View style={styles.label}>{props.current}/{props.max}</View>
        <View style={[styles.inner, {width: percent + '%'}]}></View>
    </View>
    }


const styles = StyleSheet.create({
	outer: {
        height: '30px',
        backgroundColor: '#FFE0E0',
        border: '2px solid #FFE0E0',
        position: 'relative',
    },
    inner: {
        width: '50%',
        height: '100%',
        backgroundColor: 'red',
        position: 'absolute',
    },
    label: {
        position: 'absolute',
        height: '30px',
        lineHeight: '30px',
        zIndex: 10,
    }
});

