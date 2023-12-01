import loader from '../../assets/svg/loader.svg';

const loaderCss: React.CSSProperties = {
  margin: '0 auto 1em',
  height: '100px',
  width: '20%',
  textAlign: 'center',
  padding: '1em',
  display: 'inline-block',
  verticalAlign: 'top'
}

export default function Loader() {
  return (
    <div className='loader' style={loaderCss}>
      <img src={loader} alt="" />
    </div>
  )
}
