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
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [img, setImg] = useState('')
    const [temperature, setTemperature] = useState('');

    const inputSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchCountry = (e) => {
        e.preventDefault();
        setCountry(search);
    }

    useEffect(() => {
        axios(`http://api.openweathermap.org/data/2.5/weather?q=${country}&lang=ja&appid=''`).then((res) => {
            setValue(res.data);
            setWeather(res.data.weather[0].description);
            setTemperature(res.data.main);
            setImg(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`);
            setDate(res.data.daily[0].dt);
        });
    }, [country]);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h1 className={classes.head}>Weather Search</h1>
                <form onSubmit={searchCountry}>
                    <TextField value={search} id='standard-basic' label='国や地名を入力を検索' onChange={inputSearch} />
                    <button type='submit' className={classes.btn}>
                        <SearchIcon />
                    </button>
                </form>
                <div className={classes.container}>
                    <p>{value}</p>
                    <p>{country}</p>
                    <p>{date}</p>
                    <img src={img} alt='' />
                    <p>{weather}</p>
                    <p>{temperature}</p>
                </div>
            </Paper>
        </div>
    )
}

export default Weather

