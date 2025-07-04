import './T_Nosotro_H.css';
import './../../../Style/fonts.css';
export default function T_Nosostro_H({ imgUrl, Title, description }) {
  return (
    <div className='container' style={{ fontFamily: "Comorant" }}>
      <div className='containerImgServicio'>
        <img src={imgUrl} alt="" />
      </div>
      <div className='containerDescrip'>
        <h3 className='titleEscogerno' style={{ fontWeight: 800, fontStyle: "italic" }}>{Title}</h3>
        <p className='descriptionEscogerno'>{description}</p>


      </div>
    </div>


  )






}
