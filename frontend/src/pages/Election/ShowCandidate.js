const ShowCandidate = ({index,candidate, candidateCount}) =>{
    console.log(candidate);
    return(
        <>
            <tr>
                <td>{candidate.name}</td>
                <td>{candidate.description}</td>
                <td>{candidate.votes}</td> 
            </tr>
        </>
    )
}
export default ShowCandidate;