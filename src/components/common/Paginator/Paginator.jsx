import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

let Paginator = ({ totalUsersCount, pageSise, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSise);
    let pages = [];
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (

        <div className={styles.paginatorWrap}>
            {portionNumber > 1 && <span onClick={() => { setPortionNumber(portionNumber - 1) }}>&#60;</span>
            }

            {
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span className={cn(styles.pages, { [styles.selectedPage]: currentPage === p })}
                            onClick={() => { onPageChanged(p) }}>{p}</span>
                    })
            }
            {portionCount > portionNumber && <span onClick={() => { setPortionNumber(portionNumber + 1) }}>&#62;</span>
            }


        </div>
    )
}

export default Paginator;