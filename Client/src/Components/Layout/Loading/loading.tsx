import './loading.css'
import load from './loading.svg'

function Loading()
{
    return(
        <div className='loading-containe'>
            <img src={load} className='loading' alt=''/>
        </div>
    )
}
export default Loading