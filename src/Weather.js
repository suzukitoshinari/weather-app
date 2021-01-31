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
    },
    temp: {
        display: 'flex',
        justifyContent: 'center',
        height: 200,
    },
    temp_contents: {
        display: 'flex',
        alignItems: 'center',
        padding: 10
    }
});

const Weather = () => {
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('Tokyo');
    const [weather, setWeather] = useState('');
    const [img, setImg] = useState('')
    const [temperature, setTemperature] = useState('');
    const [loading, setLoading] = useState(false);

    const inputSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchCountry = (e) => {
        e.preventDefault();
        setCountry(search);
    }

    const d = new Date();
    const nowTime = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`.replace(/\n|\r/g, '');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            axios(`http://api.openweathermap.org/data/2.5/weather?q=${country}&lang=ja&units=metric&appid=`
            ).then((res) => {
                setWeather(res.data.weather.description);
                setTemperature(res.data.main);
                setImg(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`);
                setLoading(false);
            });
        },2000)
    }, [country]);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h1 className={classes.head}>Weather Search</h1>
                <form onSubmit={searchCountry}>
                    <TextField value={search} id='standard-basic' label='地名を入力を検索' onChange={inputSearch} />
                    <button type='submit' className={classes.btn}>
                        <SearchIcon />
                    </button>
                </form>
                {loading && <p>Loading...</p>}
                {!loading && (
                    <div className={classes.container}>
                        <p>{nowTime}</p>
                        <p>{country}</p>
                        <img src={img} alt='weather icon' width='140' />
                        <p>{weather}</p>
                        <div className={classes.temp}>
                            <p className={classes.temp_contents}>
                                最低気温 <br />
                                {`${Math.floor(temperature.temp_min)}° C`}
                            </p>
                            <p className={classes.temp_contents}>
                                平均気温 <br />
                                {`${Math.floor(temperature.temp)}° C`}
                            </p>
                            <p className={classes.temp_contents}>
                                最高気温 <br />
                                {`${Math.floor(temperature.temp_max)}° C`}
                            </p>
                        </div>
                    </div>
                 )}
            </Paper>
        </div>
    )
}

export default Weather
