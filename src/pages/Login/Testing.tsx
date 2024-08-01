import React, {  useState } from "react";
import '../../styles/index.scss';

import { Link } from "react-router-dom";
import Banner from "src/component/Banner/Banner";
import { useAppDispatch } from "src/store/hooks";
import {  setData } from "src/store/files.store";
import { useStudents } from "src/hooks/useStudents";


export function Testing() {

  const dispatch = useAppDispatch();
  


  
  const { studentsArray, removeStudent } = useStudents();

  // Pagination state
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = studentsArray.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(studentsArray.length / rowsPerPage);
  const totalEntries = studentsArray.length;
  const endEntry = indexOfLastRow > totalEntries ? totalEntries : indexOfLastRow;

  // Fetch students when component mounts or when `getAll` function changes

  // Page change handler
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 || pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };



  const removeStud = async (ids: number) => {
    const message = `Are you sure you want to delete this item?`;
    if (window.confirm(message)) {
        try {
            await removeStudent(ids);
            
        } catch (error) {
            console.error('Error removing student:', error);
        }
    }
};

  // Checkbox change handler
  const handleCheckboxChange = (id: number) => {
    setSelectedRows(prev => {
      const updatedSelection = new Set(prev);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return updatedSelection;
    });
    dispatch(setData({id:id}))
  };

  // Determine the range of page numbers to show
  const pageRange = 10;
  const startPage = Math.max(1, Math.floor((currentPage - 1) / pageRange) * pageRange + 1);
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  const showPrevious = startPage > 1;
  const showNext = endPage < totalPages;

  return (
    <div>
      <Banner >
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map(row => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id as number)}
                      onChange={() => handleCheckboxChange(row.id as number)}
                    />
                  </td>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.email}</td>
                  <td>{row.age}</td>
                  <td>{row.grade}</td>
                  <td>
                    <Link onClick={() => {
                      dispatch(setData({
                        first_name: row.first_name,
                        last_name: row.last_name,
                        email: row.email,
                        age: row.age,
                        grade: row.grade
                      }));
                    }} to={`/edit/${row.id}`}> Edit</Link>
                    <Link onClick={() => removeStud(row.id as number)} to={""}> Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <div>
              <h2>Showing {endEntry} of {totalEntries} entries</h2>
            </div>
            <div className="paginationoriginal">
              {showPrevious && (
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              )}

              {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNumber => (
                <button
                  key={pageNumber}
                  className={`page-button ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              {showNext && (
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>


      </Banner>

    </div>
  );
}