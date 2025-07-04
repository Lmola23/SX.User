import './T_Servicio_H.css';
import './../../../Style/fonts.css';


export default function T_Servicio_H({ imgUrl, Title, description }) {
  return (
    <div className='containerServicio' style={{ fontFamily: "Comorant" }}>
      <div className='containerImgServicio'>
        <img src={imgUrl} alt="" />
      </div>
      <div className='containerDescripServicio'>
        <h3 className='titleEscogernoServicio' style={{ fontWeight: 800, fontStyle: "italic" }}>{Title}</h3>
        <p className='descriptionEscogernoServicio'>{description}</p>
      </div>
    </div>


  )






}
