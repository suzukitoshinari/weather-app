// import React, { useState, useEffect } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
// import SearchIcon from '@material-ui/icons/Search';
// import axios from 'axios';

// const useStyles = makeStyles({
//     root: {
//         height: '100vh',
//         backgroundColor: 'coral',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     paper: {
//         width: 400,
//         height: 600,
//         textAlign: 'center',
//         boxShadow: '6px 6px 4px 4px gray'
//     },
//     head: {
//         textDecoration: 'underline'
//     },
//     btn: {
//         marginTop: 15,
//         backgroundColor: 'transparent',
//         borderRadius: 5,
//         outline: 'none'
//     },
//     container: {
//         height: 451,
//         marginTop: 20,
//         backgroundColor: 'skyblue'
//     }
// });

// const Weather = () => {
//     const [value, setValue] = useState('');
//     const [search, setSearch] = useState('');
//     const [country, setCountry] = useState('');
//     const [date, setDate] = useState('');
//     const [weather, setWeather] = useState('');
//     const [img, setImg] = useState('')
//     const [temperature, setTemperature] = useState('');

//     const inputSearch = (e) => {
//         setSearch(e.target.value)
//     }

//     const searchCountry = (e) => {
//         e.preventDefault();
//         setCountry(search);
//     }

//     useEffect(() => {
//         axios(`http://api.openweathermap.org/data/2.5/weather?q=${country}&lang=ja&appid='59fc454c304362df4fbe9fcc08090ec3'`).then((res) => {
//             setValue(res.data);
//             setWeather(res.data.weather[0].description);
//             setTemperature(res.data.main);
//             setImg(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`);
//             setDate(res.data.daily[0].dt);
//         });
//     }, [country]);

//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <Paper className={classes.paper}>
//                 <h1 className={classes.head}>Weather Search</h1>
//                 <form onSubmit={searchCountry}>
//                     <TextField value={search} id='standard-basic' label='国や地名を入力を検索' onChange={inputSearch} />
//                     <button type='submit' className={classes.btn}>
//                         <SearchIcon />
//                     </button>
//                 </form>
//                 <div className={classes.container}>
//                     <p>{value}</p>
//                     <p>{country}</p>
//                     <p>{date}</p>
//                     <img src={img} alt='' />
//                     <p>{weather}</p>
//                     <p>{temperature}</p>
//                 </div>
//             </Paper>
//         </div>
//     )
// }

// export default Weather





import { Button, Paper, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";

const Weather = () => {
  const [value, setValue] = useState("");
  const [temp, settemp] = useState("");
  const [typecity, settypecity] = useState("");
  const [city, setcity] = useState("");
  const [img, setimg] = useState("");
  const [disc, setdisc] = useState("");

  const citySelect = (e) => {
    e.preventDefault();
    setcity(typecity);
  };
  useEffect(() => {
    axios(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ja&appid={}`
    ).then((res) => {
      setValue(res.data);
      settemp(res.data.main);
      setimg(
        `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
      );
      setdisc(res.data.weather[0].description);
    });
  }, [city]);

  return (
    <>
      <Paper>
        <form onSubmit={citySelect}>
          <TextField
            placeholder="type city here"
            value={typecity}
            onChange={(e) => settypecity(e.target.value)}
          />
          <Button type="submit">
            <SendIcon />
          </Button>
        </form>
        <h6 >{value.name}</h6>
        <img src={img} alt="weather icon" />
        <h6 >{disc}</h6>
        <div >
          <p>
            Min <br />
            {`${Math.floor(temp.temp_min - 273.15)}° C`}
          </p>
          <h6 >{`${Math.floor(temp.temp - 273.15)}° C`}</h6>
          <p>
            Min <br />
            {`${Math.floor(temp.temp_max - 273.15)}° C`}
          </p>
        </div>
      </Paper>
    </>
  );
};

export default Weather;