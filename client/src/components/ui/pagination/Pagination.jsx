import { BiSolidLeftArrow, BiSolidRightArrow  } from "react-icons/bi";

import styles from './Pagination.module.css';

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) {
        return null;
    }
    return (
        <div className={styles.pagination}>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <BiSolidLeftArrow /> Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={currentPage === page ? styles.active : ""}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next <BiSolidRightArrow />
            </button>
        </div>
    );
};
