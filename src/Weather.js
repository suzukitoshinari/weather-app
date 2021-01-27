import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        height: '100vh',
        backgroundColor: 'coral',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        width: 400,
        height: 600,
        textAlign: 'center',
        boxShadow: '6px 6px 4px 4px gray'
    },
    head: {
        textDecoration: 'underline'
    },
    btn: {
        marginTop: 15,
        backgroundColor: 'transparent',
        borderRadius: 5,
        outline: 'none'
    },
    container: {
        height: 451,
        marginTop: 20,
        backgroundColor: 'skyblue'
    }
});

const Weather = () => {
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('Tokyo');
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState('');

    const inputSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchCountry = () => {
        setCountry(search);
    }

    useEffect(() => {
        axios(`api.openweathermap.org/data/2.5/weather?q={country}&lang=ja&appid='weather-api'`).then((res) => {
            setSearch(res.data);
            setWeather(res.data);
            setTemperature(res.data.main);
        })
    });

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h1 className={classes.head}>Weather Search</h1>
                <form>
                    <TextField value={search} id='standard-basic' label='国や地名を入力を検索' onChange={inputSearch} />
                    <button type='button' className={classes.btn} onClick={searchCountry}>
                        <SearchIcon />
                    </button>
                </form>
                <div className={classes.container}>
                    <p>{country}</p>
                    <p>{date}</p>
                    <p>{weather}</p>
                    <p>{temperature}</p>
                </div>
            </Paper>
        </div>
    )
}

export default Weather
