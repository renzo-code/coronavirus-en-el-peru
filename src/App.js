import React from 'react'
import Axios from 'axios'

import Bandera from './components/Bandera/Bandera'
// import Grafico from './components/Grafico/Grafico'

// import { Sparklines, SparklinesLine } from 'react-sparklines';

import './App.css'
import './style.scss'

class App extends React.Component{
  state = {
    casosTotales : [],
    fallecidos : [],
    recuperados : [],
    ultimosCasos : {},
    ultimosFallecidos: {},
    url: {},
    imgCasos: {},
    imgFallecidos: {},

    estadisticaCasos : [],
    estadisticaFallecidos : []
  }
  
  componentDidMount(){
    this.obtenerDatosCoronavirus()
    // this.obtenerDatosCasos()
    // this.obtenerDatosFallecidos()
  }

  obtenerDatosCoronavirus = async () => {
    try{
      const options = {
        method : 'GET',
        headers: {'token_id' : '0D93FB225g7592Dh3gG1D5G61f35H69Ga728C3DE7F'},
        url: 'https://cronosservices.glr.pe/api/spotlight?site_id=larepublica&_id=5fb7ebafd9b52b705b260634&no-api-cache=1&no-cache=1&status=1'
      }
      const dataCoronavirus = await Axios(options)
      // console.log('dataCoronavirus',dataCoronavirus.data.data.spotlight.data)
      const { data } = dataCoronavirus.data.data.spotlight
      console.log('data', data[6].data[0].value)
      
      this.setState({
        casosTotales : data[0].data[0]?.value.split('_'),
        fallecidos : data[1].data[0]?.value.split('_'),
        recuperados : data[2].data[0]?.value.split('_'),
        ultimosCasos : data[3].data,
        ultimosFallecidos : data[4].data,
        url : data[6].data,
        imgCasos: data[5].data[0].value,
        imgFallecidos: data[5].data[1].value
      })
    }
    catch(e){
      console.error(e)
    }
  }

  // obtenerDatosCasos = async () => {
  //   try{
  //     const datosCasosObtenidos = await Axios.get("https://content-sheets.googleapis.com/v4/spreadsheets/12FXPCaqwtGVNmgKKmlttkXbxk0wF3vfkQwQQqkoKlv8/values/'Nuevo'!B20:NZ20?access_token=AIzaSyAhFukVLxOrfZBH2uHDUajuxRbeql189nk&key=AIzaSyAhFukVLxOrfZBH2uHDUajuxRbeql189nk")
  //     // console.log('datosCasosObtenidos',datosCasosObtenidos.data.values)
  //     this.setState({
  //       estadisticaCasos : datosCasosObtenidos.data.values[0]
  //     })
  //   }
  //   catch(e){
  //     console.error(e)
  //   }
  // }

  // obtenerDatosFallecidos = async () => {
  //   try{
  //     const datosCasosFallecidos = await Axios.get("https://content-sheets.googleapis.com/v4/spreadsheets/12FXPCaqwtGVNmgKKmlttkXbxk0wF3vfkQwQQqkoKlv8/values/'Nuevo'!B21:NZ21?access_token=AIzaSyAhFukVLxOrfZBH2uHDUajuxRbeql189nk&key=AIzaSyAhFukVLxOrfZBH2uHDUajuxRbeql189nk")
      // console.log('dattt',datosCasosFallecidos.data.values)
  //     this.setState({
  //       estadisticaFallecidos : datosCasosFallecidos.data.values[0]
  //     })
  //   }
  //   catch(e){
  //     console.error(e)
  //   }
  // }


  render(){
    console.log('sadsad', this.state.url[0]?.value)
    const { 
      casosTotales, 
      ultimosCasos, 
      ultimosFallecidos , 
      fallecidos, recuperados, 
      url, 
      // estadisticaCasos, 
      // estadisticaFallecidos, 
      imgCasos, 
      imgFallecidos
    } = this.state

    return (
      <>
      <div className="container">
      
        <a target="_blank" href={url[0]?.value}>
          <div className="contenedor-titulo">
            <Bandera/>
              <h3 className="titulo-covid">CORONAVIRUS</h3><div><h3 className="subtitulo-covid">EN PERÚ</h3></div>
          </div>
          <div className="status-covid">
            <div className="status-casos-totales">
              <h6 className="text-recuperados">CASOS TOTALES</h6>
              <h3 className="numero-status-casos">{casosTotales[0]}</h3>
              <h5 className="numero-parentesis">{casosTotales[1]}</h5>
            </div>
            <div className="status-fallecidos">
              <h6 className="text-recuperados">FALLECIDOS</h6>
              <h3 className="numero-status-fallecidos">{fallecidos[0]}</h3>
              <h5 className="numero-parentesis-fallecidos">{fallecidos[1]}</h5>
            </div>
            <div className="status-recuperados">
              <h6 className="text-recuperados">RECUPERADOS</h6>
              <h3 className="numero-status-recuperados">{recuperados[0]}</h3>
              <h5 className="numero-parentesis-recuperados">{recuperados[1]}</h5>
            </div>
          </div>

          <div className="status-15dias">
            <div className="titulo-15dias">ÚLTIMOS 15 DÍAS</div>
            <div className="status-casos-totales"><h6 className="text-recuperados">CASOS</h6> <h5 className="numero-casos-totales">{ultimosCasos[0]?.value}</h5></div>
            <div className="status-casos"><h6 className="text-recuperados">FALLECIDOS</h6><h5 className="numero-ultimos-fallecidos">{ultimosFallecidos[0]?.value}</h5></div>
          </div>

          <div className="evolucion-diaria">
            <div className="titulo-evolucion-diaria">
              EVOLUCIÓN DIARIA
            </div>
            <div className="cont-titulos-barra">
              <div className="titulo-casos">
              <img className="grafico-casos" src={imgCasos} alt=""/>
                {/* <Sparklines data={estadisticaCasos} limit={300} width={100} height={25} margin={0}>
                  <SparklinesLine color="red" />
                </Sparklines> */}
                <h6 className="titulo-1grafico">CASOS</h6>
              </div>
              <div className="titulo-fallecidos">
                {/* <Sparklines data={estadisticaFallecidos} limit={300} width={100} height={25} margin={0}>
                  <SparklinesLine/>
                </Sparklines> */}
                <img className="grafico-casos" src={imgFallecidos} alt=""/>
                <h6 className="titulo-2grafico">FALLECIDOS</h6>
              </div>
            </div>
          </div>
        </a>
        <div className="cont-botones">
          <div className="cont-btn1">
            <a target="_blank" href={url[1]?.value}>
              <button className="btn-sudamerica">EN SUDAMÉRICA</button>
            </a>
          </div>
          <div className="cont-btn2">
            <a target="_blank" href={url[2]?.value}>
              <button className="btn-mundo">EN EL MUNDO</button>
            </a>
          </div>
        </div>
      </div>
      </>
    )
  }
} 

export default App