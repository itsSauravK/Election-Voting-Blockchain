const ShowResult = ({candidate, isDraw, id}) => {
    return(
       
    <tr>
        <td>{candidate.name}</td>
        <td>{candidate.description}</td>
        <td>{candidate.votes}</td>
        {id === 0 && !isDraw && candidate.votes>0 &&
            <td><b>Winner</b></td>  
        }
        {isDraw && <td><b>Draw</b></td>}
            
    </tr>
    )
}  
export default ShowResult;