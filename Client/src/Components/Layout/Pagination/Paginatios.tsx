import './Pagination.css';

type PaginationProps = {
    currentPage : number,
    usersPerPage: number,
    resultsNumber: number,
    paginate: (page:number) => void
}


function Pagination(props : PaginationProps) {

    const pages:number[] = [];
    let numberOfPages = Math.ceil(props.resultsNumber / props.usersPerPage); 
    
    for(let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
    }


    return ( 
        <div>
            <ul className='pagination-list'>
            {
                pages.map((page:number) => {
                    return(
                        <li className='pagination-page' key={page}>
                            <button onClick={() => {props.paginate(page)}}>
                                {page.toString()}
                            </button>
                        </li>
                    )
                })
            }
            </ul>
        </div>
     );
}

export default Pagination;