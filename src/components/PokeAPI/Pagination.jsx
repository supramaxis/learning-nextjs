import {
  MdOutlineArrowBack,
  MdOutlineArrowForward,
  MdOutlineLastPage,
  MdOutlineFirstPage
} from 'react-icons/md';
import styles from '../../styles/poke.module.css';

export default function Pagination({
  onLeftClick,
  onRightClick,
  page,
  totalPages,
  onFirstPage
}) {
  return (
    <>
      <div className={styles.paginationContainer}>
        <MdOutlineFirstPage
          className={styles.arrowPointer}
          onClick={onFirstPage}
        />
        <MdOutlineArrowBack
          className={styles.arrowPointer}
          onClick={onLeftClick}
        />
        <div className='paginationText'>
          Page {page} of {totalPages}
        </div>
        <MdOutlineArrowForward
          className={styles.arrowPointer}
          onClick={onRightClick}
        />
        <MdOutlineLastPage className={styles.arrowPointer} />
      </div>
    </>
  );
}

