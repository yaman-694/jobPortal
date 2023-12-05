
export const Svg: React.FC<{path: string, width?: string, height?: string}> = ({path, height, width}) =>{
  return (
    <div style={{
      width: width || '30px',
      height: height || '30px'
    }}>
      <img src={path} alt="" />
    </div>
  )
}
